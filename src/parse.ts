import { parseDocument } from "yaml";
import { normalizeComic, syntaxFields } from "./syntax";
import { characters, expressions, gestures, props } from "./assets";
import type {
  Actor,
  Dialogue,
  Transfer,
  Panel,
  Comic,
  CastMember,
} from "./model";

function record(value: unknown, context: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${context}: 객체가 필요합니다.`);
  return value as Record<string, unknown>;
}
function text(value: unknown, context: string): string {
  if (typeof value !== "string" || !value.trim())
    throw new Error(`${context}: 비어 있지 않은 문자열이 필요합니다.`);
  if (value.length > 10000)
    throw new Error(`${context}: 텍스트가 너무 깁니다.`);
  return value;
}
function list(value: unknown, context: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${context}: 목록이 필요합니다.`);
  return value;
}
function known(
  value: Record<string, unknown>,
  keys: string[],
  context: string,
) {
  for (const key of Object.keys(value))
    if (!keys.includes(key))
      throw new Error(`${context}: 알 수 없는 항목 '${key}'.`);
}
function number(
  value: unknown,
  min: number,
  max: number,
  context: string,
): number | undefined {
  if (value === undefined) return undefined;
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < min ||
    value > max
  )
    throw new Error(`${context}: ${min}~${max} 사이 숫자가 필요합니다.`);
  return value;
}
export function readComic(source: string): Comic {
  if (source.length > 100000)
    throw new Error("코드가 너무 깁니다. 100KB 이내로 작성하세요.");
  const doc = parseDocument(source, { uniqueKeys: true });
  if (doc.errors.length) throw new Error(doc.errors[0].message);
  const root = record(normalizeComic(doc.toJS({ maxAliasCount: 20 })), "만화");
  known(root, Object.keys(syntaxFields.comic), "만화");
  const cast: Record<string, CastMember> = Object.create(null);
  for (const [id, raw] of Object.entries(record(root.cast, "등장인물"))) {
    const member = record(raw, `등장인물.${id}`);
    known(member, Object.keys(syntaxFields.cast), `등장인물.${id}`);
    const asset = text(member.asset, `등장인물.${id}.그림`);
    if (!Object.hasOwn(characters, asset))
      throw new Error(`등장인물.${id}: 없는 에셋 '${asset}'.`);
    cast[id] = {
      asset,
      label:
        member.label === undefined
          ? id
          : text(member.label, `등장인물.${id}.이름표`),
    };
  }
  let previous: Panel | undefined;
  const panels = list(root.panels, "컷").map((raw, index): Panel => {
    const ctx = `컷 ${index + 1}`;
    const panel = { ...record(raw, ctx) };
    known(panel, Object.keys(syntaxFields.panel), ctx);
    if (
      panel.mode !== undefined &&
      panel.mode !== "before" &&
      panel.mode !== "full"
    )
      throw new Error(`${ctx}: 구성은 전체 또는 이전이어야 합니다.`);
    if (panel.mode === "before") {
      if (!previous)
        throw new Error(`${ctx}: 첫 컷에서는 이전 구성을 사용할 수 없습니다.`);
      const inherited: Record<string, unknown>[] = previous.actors.map(
        (actor) => ({ ...actor }),
      );
      const removed = list(panel.removeActors ?? [], `${ctx}.제외인물`).map(
        (id) => text(id, `${ctx}.제외인물`),
      );
      for (const id of removed) {
        if (!inherited.some((actor) => actor.id === id))
          throw new Error(`${ctx}: 제거할 인물 '${id}'가 이전 컷에 없습니다.`);
      }
      const next = inherited.filter(
        (actor) => !removed.some((id) => id === actor.id),
      );
      const patches = list(panel.actors ?? [], `${ctx}.인물`);
      const changed = new Set<string>();
      for (const item of patches) {
        const patch =
          typeof item === "string" ? { id: item } : record(item, `${ctx}.인물`);
        known(patch, Object.keys(syntaxFields.actor), `${ctx}.인물`);
        const id = text(patch.id, `${ctx}.인물.식별자`);
        if (changed.has(id))
          throw new Error(`${ctx}: 캐릭터 식별자가 중복됩니다.`);
        changed.add(id);
        const slot = next.findIndex((actor) => actor.id === id);
        const merged: Record<string, unknown> = {
          ...(slot < 0 ? {} : next[slot]),
          ...patch,
        };
        // null clears optional state; no object belonging to the previous panel is mutated.
        for (const [key, value] of Object.entries(patch))
          if (key !== "id" && value === null) delete merged[key];
        if (slot < 0) next.push(merged);
        else next[slot] = merged;
      }
      panel.actors =
        panel.actors !== undefined && patches.length === 0 ? [] : next;
    } else if (panel.removeActors !== undefined) {
      throw new Error(`${ctx}: 제외인물은 이전 구성에서만 사용할 수 있습니다.`);
    }
    const actors = list(panel.actors, `${ctx}.인물`).map((item): Actor => {
      const actor =
        typeof item === "string" ? { id: item } : record(item, `${ctx}.인물`);
      known(actor, Object.keys(syntaxFields.actor), `${ctx}.인물`);
      const id = text(actor.id, `${ctx}.인물.식별자`);
      const expression =
        actor.expression === undefined
          ? "neutral"
          : text(actor.expression, `${ctx}.${id}.표정`);
      if (!Object.hasOwn(cast, id))
        throw new Error(`${ctx}: 없는 캐릭터 '${id}'.`);
      if (!Object.hasOwn(expressions, expression))
        throw new Error(`${ctx}.${id}: 없는 표정 '${expression}'.`);
      const gesture =
        actor.gesture === undefined
          ? undefined
          : text(actor.gesture, `${ctx}.${id}.손모양`);
      const holding =
        actor.holding === undefined
          ? undefined
          : text(actor.holding, `${ctx}.${id}.든소품`);
      if (gesture && !Object.hasOwn(gestures, gesture))
        throw new Error(`${ctx}.${id}: 없는 손 제스처 '${gesture}'.`);
      if (holding && !Object.hasOwn(props, holding))
        throw new Error(`${ctx}.${id}: 없는 소품 '${holding}'.`);
      return {
        id,
        expression,
        gesture,
        holding,
        x: number(actor.x, 0, 1, `${ctx}.${id}.가로위치`),
        y: number(actor.y, 0, 1, `${ctx}.${id}.세로위치`),
        scale: number(actor.scale, 0.5, 1.25, `${ctx}.${id}.배율`) ?? 1,
      };
    });
    if (actors.length < 1 || actors.length > 3)
      throw new Error(`${ctx}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(actors.map((actor) => actor.id)).size !== actors.length)
      throw new Error(`${ctx}: 캐릭터 식별자가 중복됩니다.`);
    const dialogue = list(panel.dialogue ?? [], `${ctx}.대사`).map(
      (item): Dialogue => {
        const line = record(item, `${ctx}.대사`);
        known(line, Object.keys(syntaxFields.dialogue), `${ctx}.대사`);
        const from = text(line.from, `${ctx}.대사.화자`);
        const to =
          line.to === undefined ? undefined : text(line.to, `${ctx}.대사.상대`);
        if (!actors.some((actor) => actor.id === from))
          throw new Error(`${ctx}: 화자 '${from}'가 컷에 없습니다.`);
        if (to && !actors.some((actor) => actor.id === to))
          throw new Error(`${ctx}: 대화 상대 '${to}'가 컷에 없습니다.`);
        return {
          from,
          to,
          text: text(line.text, `${ctx}.대사.내용`),
          x: number(line.x, 0, 1, `${ctx}.대사.가로위치`),
          y: number(line.y, 0, 1, `${ctx}.대사.세로위치`),
          fontSize: number(line.fontSize, 12, 32, `${ctx}.대사.글자크기`) ?? 18,
        };
      },
    );
    if (dialogue.length > 20)
      throw new Error(`${ctx}: 대사는 20개 이내로 작성하세요.`);
    const transfer = list(panel.transfer ?? [], `${ctx}.전달`).map(
      (item): Transfer => {
        const relation = record(item, `${ctx}.전달`);
        known(relation, Object.keys(syntaxFields.transfer), `${ctx}.전달`);
        const from = text(relation.from, `${ctx}.전달.주는인물`);
        const to = text(relation.to, `${ctx}.전달.받는인물`);
        const prop = text(relation.prop, `${ctx}.전달.소품`);
        if (!actors.some((actor) => actor.id === from))
          throw new Error(`${ctx}: 전달 주체 '${from}'가 컷에 없습니다.`);
        if (!actors.some((actor) => actor.id === to))
          throw new Error(`${ctx}: 전달 대상 '${to}'가 컷에 없습니다.`);
        if (from === to)
          throw new Error(`${ctx}: 전달 주체와 대상은 달라야 합니다.`);
        if (!Object.hasOwn(props, prop))
          throw new Error(`${ctx}: 없는 소품 '${prop}'.`);
        return { from, to, prop };
      },
    );
    if (transfer.length > 6)
      throw new Error(`${ctx}: 소품 전달은 6개 이내로 작성하세요.`);
    previous = { actors, dialogue, transfer };
    return previous;
  });
  if (panels.length < 1 || panels.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: root.title === undefined ? "Comic Gen" : text(root.title, "제목"),
    cast,
    panels,
  };
}
