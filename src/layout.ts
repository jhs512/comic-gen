import { characters, expressions, gestures, props, escapeXml } from "./assets";
import type { Panel, Comic } from "./model";
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

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

export function renderPanel(
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
  const radius = Math.max(
    ...panel.actors.map((actor) => (actor.holding || actor.gesture ? 92 : 60)),
  );
  const slotWidth = (width - 72) / panel.actors.length;
  const automaticScale = Math.min(
    1,
    (slotWidth - 12) /
      (2 * radius * Math.max(...panel.actors.map((actor) => actor.scale))),
  );
  const scales = panel.actors.map((actor) => actor.scale * automaticScale);
  const centers = panel.actors.map((actor, index) =>
    clamp(
      36 + (width - 72) * (actor.x ?? (index + 0.5) / panel.actors.length),
      26 + radius * scales[index],
      width - 26 - radius * scales[index],
    ),
  );
  const actorYs = panel.actors.map((actor, index) =>
    clamp(
      actor.y === undefined ? height - 126 : actor.y * height,
      dialogueHeight + 70 * scales[index],
      height - 126 * scales[index],
    ),
  );
  for (let i = 0; i < panel.actors.length; i++) {
    for (let j = i + 1; j < panel.actors.length; j++) {
      if (
        Math.abs(centers[i] - centers[j]) < radius * (scales[i] + scales[j]) &&
        Math.abs(actorYs[i] - actorYs[j]) < 120 * Math.max(scales[i], scales[j])
      ) {
        throw new Error(
          `캐릭터 '${panel.actors[i].id}'와 '${panel.actors[j].id}'가 겹칩니다. x/y 또는 scale을 조정하세요.`,
        );
      }
    }
  }
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
    const faceX =
      targetIndex < 0
        ? 0
        : Math.sign(centers[targetIndex] - centers[index]) * 4;
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
      `<g data-character="${escapeXml(actor.id)}" transform="translate(${centers[index]} ${actorYs[index]}) scale(${scales[index]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${asset.body}<g transform="translate(${faceX} ${asset.faceY})" fill="#303341">${expressions[actor.expression]}</g>${gesture}${holding}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${labelLines.map((part, row) => `<tspan x="0" dy="${row ? 18 : 0}">${escapeXml(part)}</tspan>`).join("")}</text></g>`,
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
