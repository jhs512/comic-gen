import { parseDocument } from "yaml";
import {
  characters,
  expressions,
  gestures,
  props,
  escapeXml,
  assetVersion,
} from "./assets";
import { PanelCache } from "./cache";

export interface RenderOptions {
  width?: number;
  font?: string;
  fontVersion?: string;
}
export interface RenderResult {
  svg: string;
  width: number;
  height: number;
  diagnostics: string[];
  cache?: { hits: number; misses: number; bytes: number };
}
interface CastMember {
  asset: string;
  label: string;
}
interface Placement {
  x?: number;
  y?: number;
}
interface Actor extends Placement {
  id: string;
  expression: string;
  gesture?: string;
  holding?: string;
  scale: number;
}
interface Dialogue extends Placement {
  from: string;
  to?: string;
  text: string;
  fontSize: number;
}
interface Transfer {
  from: string;
  to: string;
  prop: string;
}
interface Panel {
  actors: Actor[];
  dialogue: Dialogue[];
  transfer: Transfer[];
}
interface Comic {
  title: string;
  cast: Record<string, CastMember>;
  panels: Panel[];
}

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
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
function readComic(source: string): Comic {
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

function wrapText(
  value: string,
  maxWidth: number,
  fontSize: number,
  font: string,
): string[] {
  const context = document.createElement("canvas").getContext("2d")!;
  context.font = `${fontSize}px ${font}`;
  const lines: string[] = [];
  for (const paragraph of value.split("\n")) {
    let line = "";
    for (const char of Array.from(paragraph)) {
      if (line && context.measureText(line + char).width > maxWidth) {
        lines.push(line);
        line = "";
      }
      line += char;
    }
    lines.push(line);
  }
  return lines;
}

function renderPanel(
  panel: Panel,
  cast: Comic["cast"],
  width: number,
  font: string,
): { markup: string; height: number } {
  const bubbleWidth = Math.min(width - 80, 390);
  const bubbles = panel.dialogue.map((line) => ({
    line,
    lines: wrapText(line.text, bubbleWidth - 36, line.fontSize, font),
    lineHeight: Math.ceil(line.fontSize * 1.45),
  }));
  const dialogueHeight = bubbles.reduce(
    (sum, bubble) => sum + 60 + bubble.lines.length * bubble.lineHeight,
    20,
  );
  const height = dialogueHeight + 254 + panel.transfer.length * 38;
  const centers = panel.actors.map((actor, index) =>
    clamp(
      36 + (width - 72) * (actor.x ?? (index + 0.5) / panel.actors.length),
      26 + 92 * actor.scale,
      width - 26 - 92 * actor.scale,
    ),
  );
  const actorYs = panel.actors.map((actor) =>
    clamp(
      actor.y === undefined ? height - 126 : actor.y * height,
      dialogueHeight + 70 * actor.scale,
      height - 126 * actor.scale,
    ),
  );
  const markup = [
    `<rect x="20" y="0" width="${width - 40}" height="${height}" rx="18" fill="white" stroke="#303341" stroke-width="2.5"/>`,
  ];
  let y = 20;
  bubbles.forEach(({ line, lines, lineHeight }) => {
    const center =
      centers[panel.actors.findIndex((actor) => actor.id === line.from)];
    const x = clamp(
      (line.x === undefined ? center : line.x * width) - bubbleWidth / 2,
      40,
      width - bubbleWidth - 40,
    );
    const bubbleHeight = 28 + lines.length * lineHeight;
    const bubbleY =
      line.y === undefined
        ? y
        : clamp(line.y * height, 20, dialogueHeight - bubbleHeight);
    const tailX = Math.max(x + 20, Math.min(x + bubbleWidth - 20, center));
    markup.push(
      `<g data-dialogue="${escapeXml(line.from)}" data-to="${escapeXml(line.to ?? "")}"><path d="M${tailX - 9} ${bubbleY + bubbleHeight - 1}L${center} ${actorYs[panel.actors.findIndex((actor) => actor.id === line.from)] - 65} ${tailX + 9} ${bubbleY + bubbleHeight - 1}" fill="#fffaf0" stroke="#303341" stroke-width="1.5"/><rect x="${x}" y="${bubbleY}" width="${bubbleWidth}" height="${bubbleHeight}" rx="14" fill="#fffaf0" stroke="#303341" stroke-width="2"/><text x="${x + 18}" y="${bubbleY + 18 + line.fontSize}" font-size="${line.fontSize}">${lines.map((part, index) => `<tspan x="${x + 18}" dy="${index ? lineHeight : 0}">${escapeXml(part)}</tspan>`).join("")}</text></g>`,
    );
    y += bubbleHeight + 32;
  });
  panel.actors.forEach((actor, index) => {
    const member = cast[actor.id];
    const asset = characters[member.asset];
    const other = panel.dialogue.find(
      (line) => line.from === actor.id && line.to,
    )?.to;
    const targetIndex = panel.actors.findIndex((item) => item.id === other);
    const faceX = targetIndex < 0 ? 0 : targetIndex < index ? -4 : 4;
    const labelLines = wrapText(
      member.label,
      (width - 72) / panel.actors.length - 12,
      16,
      font,
    );
    if (labelLines.length > 2)
      throw new Error(`캐릭터 '${actor.id}'의 이름표가 너무 깁니다.`);
    const gesture = actor.gesture
      ? `<g data-gesture="${actor.gesture}">${gestures[actor.gesture]}</g>`
      : "";
    const holding = actor.holding
      ? `<g data-holding="${actor.holding}"><circle data-hand="holding" cx="58" cy="20" r="11" fill="white"/><g data-prop="${actor.holding}" transform="translate(73 6)">${props[actor.holding]}</g></g>`
      : "";
    markup.push(
      `<g data-character="${escapeXml(actor.id)}" transform="translate(${centers[index]} ${actorYs[index]}) scale(${actor.scale})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${asset.body}<g transform="translate(${faceX} ${asset.faceY})" fill="#303341">${expressions[actor.expression]}</g>${gesture}${holding}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${labelLines.map((part, row) => `<tspan x="0" dy="${row ? 18 : 0}">${escapeXml(part)}</tspan>`).join("")}</text></g>`,
    );
  });
  panel.transfer.forEach((relation, index) => {
    const from =
      centers[panel.actors.findIndex((actor) => actor.id === relation.from)];
    const to =
      centers[panel.actors.findIndex((actor) => actor.id === relation.to)];
    const direction = Math.sign(to - from);
    const start = from + 66 * direction,
      end = to - 66 * direction;
    const row = dialogueHeight + 28 + index * 38;
    markup.push(
      `<g data-transfer="${escapeXml(relation.from)}" data-to="${escapeXml(relation.to)}" stroke="#586c8c" stroke-width="2.5"><path d="M${start} ${row}H${end}m${-direction * 8} -5 ${direction * 8} 5 ${-direction * 8} 5" fill="none"/><circle data-hand="transfer" cx="${start}" cy="${row}" r="9" fill="white"/><g data-prop="${relation.prop}" transform="translate(${(from + to) / 2} ${row - 16})">${props[relation.prop]}</g></g>`,
    );
  });
  return { markup: markup.join(""), height };
}

let fontEpoch = 0;
document.fonts.addEventListener("loadingdone", (event) => {
  if (event.fontfaces.length) fontEpoch++;
});

function render(
  source: string,
  options: RenderOptions,
  cache: PanelCache,
): RenderResult {
  try {
    const comic = readComic(source);
    const width = options.width ?? 720;
    if (!Number.isFinite(width) || width < 480 || width > 2400)
      throw new Error("너비는 480~2400 사이여야 합니다.");
    const font =
      options.font ?? "Malgun Gothic, Apple SD Gothic Neo, sans-serif";
    if (typeof font !== "string" || font.length > 300 || /[<>]/.test(font))
      throw new Error("올바른 글꼴 이름이 필요합니다.");
    const fragments: string[] = [];
    let hits = 0,
      misses = 0;
    let y = 68;
    for (const [index, panel] of comic.panels.entries()) {
      const members = panel.actors.map((actor) => [
        actor.id,
        comic.cast[actor.id],
      ]);
      const key = JSON.stringify({
        panel,
        members,
        width,
        font,
        fontEpoch,
        fontVersion: options.fontVersion,
        assetVersion,
        layoutVersion: 1,
      });
      const existing = cache.get(key);
      const { markup, height } =
        existing ?? renderPanel(panel, comic.cast, width, font);
      if (existing) hits++;
      else {
        misses++;
        cache.set(key, { markup, height });
      }
      fragments.push(
        `<g data-panel="${index}" transform="translate(0 ${y})">${markup}</g>`,
      );
      y += height + 24;
    }
    const height = y;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(comic.title)}"><title>${escapeXml(comic.title)}</title><rect width="100%" height="100%" fill="#f5f7fb"/><g font-family="${escapeXml(font)}" fill="#303341"><text x="24" y="42" font-size="24" font-weight="700">${escapeXml(comic.title)}</text>${fragments.join("")}</g></svg>`;
    return {
      svg,
      width,
      height,
      diagnostics: [],
      cache: { hits, misses, bytes: cache.bytes },
    };
  } catch (error) {
    return {
      svg: "",
      width: 0,
      height: 0,
      diagnostics: [error instanceof Error ? error.message : "렌더링 실패"],
    };
  }
}

export function createRenderer(maxCacheBytes = 2_000_000) {
  const cache = new PanelCache(maxCacheBytes);
  return {
    render: (source: string, options: RenderOptions = {}) =>
      render(source, options, cache),
    clearCache: () => cache.clear(),
  };
}
export const renderComic = createRenderer().render;
