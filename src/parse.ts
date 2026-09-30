import { parseDocument } from "yaml";
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
  const root = record(doc.toJS({ maxAliasCount: 20 }), "만화");
  known(root, ["title", "cast", "panels"], "만화");
  const cast: Record<string, CastMember> = Object.create(null);
  for (const [id, raw] of Object.entries(record(root.cast, "cast"))) {
    const member = record(raw, `cast.${id}`);
    known(member, ["asset", "label"], `cast.${id}`);
    const asset = text(member.asset, `cast.${id}.asset`);
    if (!Object.hasOwn(characters, asset))
      throw new Error(`cast.${id}: 없는 에셋 '${asset}'.`);
    cast[id] = {
      asset,
      label:
        member.label === undefined
          ? id
          : text(member.label, `cast.${id}.label`),
    };
  }
  const panels = list(root.panels, "panels").map((raw, index): Panel => {
    const ctx = `컷 ${index + 1}`;
    const panel = record(raw, ctx);
    known(panel, ["actors", "dialogue", "transfer"], ctx);
    const actors = list(panel.actors, `${ctx}.actors`).map((item): Actor => {
      const actor =
        typeof item === "string" ? { id: item } : record(item, `${ctx}.actors`);
      known(
        actor,
        ["id", "expression", "gesture", "holding", "x", "y", "scale"],
        `${ctx}.actors`,
      );
      const id = text(actor.id, `${ctx}.actor.id`);
      const expression =
        actor.expression === undefined
          ? "neutral"
          : text(actor.expression, `${ctx}.${id}.expression`);
      if (!Object.hasOwn(cast, id))
        throw new Error(`${ctx}: 없는 캐릭터 '${id}'.`);
      if (!Object.hasOwn(expressions, expression))
        throw new Error(`${ctx}.${id}: 없는 표정 '${expression}'.`);
      const gesture =
        actor.gesture === undefined
          ? undefined
          : text(actor.gesture, `${ctx}.${id}.gesture`);
      const holding =
        actor.holding === undefined
          ? undefined
          : text(actor.holding, `${ctx}.${id}.holding`);
      if (gesture && !Object.hasOwn(gestures, gesture))
        throw new Error(`${ctx}.${id}: 없는 손 제스처 '${gesture}'.`);
      if (holding && !Object.hasOwn(props, holding))
        throw new Error(`${ctx}.${id}: 없는 소품 '${holding}'.`);
      return {
        id,
        expression,
        gesture,
        holding,
        x: number(actor.x, 0, 1, `${ctx}.${id}.x`),
        y: number(actor.y, 0, 1, `${ctx}.${id}.y`),
        scale: number(actor.scale, 0.5, 1.25, `${ctx}.${id}.scale`) ?? 1,
      };
    });
    if (actors.length < 1 || actors.length > 3)
      throw new Error(`${ctx}: 캐릭터는 1~3명이어야 합니다.`);
    if (new Set(actors.map((actor) => actor.id)).size !== actors.length)
      throw new Error(`${ctx}: 캐릭터 식별자가 중복됩니다.`);
    const dialogue = list(panel.dialogue ?? [], `${ctx}.dialogue`).map(
      (item): Dialogue => {
        const line = record(item, `${ctx}.dialogue`);
        known(
          line,
          ["from", "to", "text", "x", "y", "fontSize"],
          `${ctx}.dialogue`,
        );
        const from = text(line.from, `${ctx}.dialogue.from`);
        const to =
          line.to === undefined
            ? undefined
            : text(line.to, `${ctx}.dialogue.to`);
        if (!actors.some((actor) => actor.id === from))
          throw new Error(`${ctx}: 화자 '${from}'가 컷에 없습니다.`);
        if (to && !actors.some((actor) => actor.id === to))
          throw new Error(`${ctx}: 대화 상대 '${to}'가 컷에 없습니다.`);
        return {
          from,
          to,
          text: text(line.text, `${ctx}.dialogue.text`),
          x: number(line.x, 0, 1, `${ctx}.dialogue.x`),
          y: number(line.y, 0, 1, `${ctx}.dialogue.y`),
          fontSize:
            number(line.fontSize, 12, 32, `${ctx}.dialogue.fontSize`) ?? 18,
        };
      },
    );
    if (dialogue.length > 20)
      throw new Error(`${ctx}: 대사는 20개 이내로 작성하세요.`);
    const transfer = list(panel.transfer ?? [], `${ctx}.transfer`).map(
      (item): Transfer => {
        const relation = record(item, `${ctx}.transfer`);
        known(relation, ["from", "to", "prop"], `${ctx}.transfer`);
        const from = text(relation.from, `${ctx}.transfer.from`);
        const to = text(relation.to, `${ctx}.transfer.to`);
        const prop = text(relation.prop, `${ctx}.transfer.prop`);
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
    return { actors, dialogue, transfer };
  });
  if (panels.length < 1 || panels.length > 30)
    throw new Error("컷은 1~30개여야 합니다.");
  return {
    title: root.title === undefined ? "Comic Gen" : text(root.title, "title"),
    cast,
    panels,
  };
}
