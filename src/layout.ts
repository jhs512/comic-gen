import { getCharacterAsset, expressions, props, escapeXml } from "./assets";
import { drawGesture, drawGrip, type HandDrawing } from "./hands";
import type { Panel, Comic } from "./model";
import type { DiagramSvg } from "./diagram";
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
  format: "compact" | "phone" = "compact",
  diagram?: DiagramSvg,
): { markup: string; height: number } {
  const bubbleWidth = Math.min(width - 80, 390);
  const measure = document.createElement("canvas").getContext("2d")!;
  const bubbles = panel.dialogue.map((line) => {
    const lines = wrapText(line.text, bubbleWidth - 36, line.fontSize, font);
    measure.font = `${line.fontSize}px ${font}`;
    return {
      line,
      lines,
      width: clamp(
        Math.max(...lines.map((text) => measure.measureText(text).width)) + 36,
        110,
        bubbleWidth,
      ),
      lineHeight: Math.ceil(line.fontSize * 1.45),
    };
  });
  const dialogueHeight = bubbles.reduce(
    (sum, bubble) => sum + 60 + bubble.lines.length * bubble.lineHeight,
    20,
  );
  // Reserve the same pose space in every cut so a changed hand never shrinks
  // the whole cast. This also covers transfer-only hands and held keys.
  const radius = 92;
  const slotWidth = (width - 72) / panel.actors.length;
  const automaticScale = Math.min(
    1,
    (slotWidth - 12) /
      (2 * radius * Math.max(...panel.actors.map((actor) => actor.scale))),
  );
  const scales = panel.actors.map((actor) => actor.scale * automaticScale);
  const height =
    dialogueHeight + Math.max(204, Math.ceil(196 * Math.max(...scales)));
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
          `캐릭터 '${panel.actors[i].id}'와 '${panel.actors[j].id}'가 겹칩니다. 가로위치·세로위치 또는 배율을 조정하세요.`,
        );
      }
    }
  }
  const markup = [
    `<rect x="20" y="0" width="${width - 40}" height="${height}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/>`,
  ];
  let y = 20;
  bubbles.forEach(({ line, lines, lineHeight, width: lineWidth }) => {
    const center =
      centers[panel.actors.findIndex((actor) => actor.id === line.from)];
    const x = clamp(
      (line.x === undefined ? center : line.x * width) - lineWidth / 2,
      40,
      width - lineWidth - 40,
    );
    const bubbleHeight = 28 + lines.length * lineHeight;
    const bubbleY =
      line.y === undefined
        ? y
        : clamp(line.y * height, 20, dialogueHeight - bubbleHeight);
    const tailX = Math.max(x + 24, Math.min(x + lineWidth - 24, center));
    const right = x + lineWidth;
    const bottom = bubbleY + bubbleHeight;
    const actorIndex = panel.actors.findIndex(
      (actor) => actor.id === line.from,
    );
    const tipY = Math.min(
      bottom + 24,
      actorYs[actorIndex] - 65 * scales[actorIndex],
    );
    const tipX = clamp(center, tailX - 18, tailX + 18);
    const outline = `M${x + 14} ${bubbleY}H${right - 14}Q${right} ${bubbleY} ${right} ${bubbleY + 14}V${bottom - 14}Q${right} ${bottom} ${right - 14} ${bottom}H${tailX + 9}L${tipX} ${tipY}L${tailX - 9} ${bottom}H${x + 14}Q${x} ${bottom} ${x} ${bottom - 14}V${bubbleY + 14}Q${x} ${bubbleY} ${x + 14} ${bubbleY}Z`;
    markup.push(
      `<g data-dialogue="${escapeXml(line.from)}" data-to="${escapeXml(line.to ?? "")}"><path d="${outline}" fill="#fffaf0" stroke="#303341" stroke-width="2" stroke-linejoin="round"/><text x="${x + 18}" y="${bubbleY + 18 + line.fontSize}" font-size="${line.fontSize}">${lines.map((part, index) => `<tspan x="${x + 18}" dy="${index ? lineHeight : 0}">${escapeXml(part)}</tspan>`).join("")}</text></g>`,
    );
    y += bubbleHeight + 32;
  });
  const handPorts: Array<
    Partial<Record<"left" | "right", HandDrawing["port"]>>
  > = [];
  panel.actors.forEach((actor, index) => {
    const member = cast[actor.id];
    const asset = getCharacterAsset(member);
    const human = member.asset === "human";
    const skin = human ? asset.color : "white";
    const transferredSides = new Set(
      panel.transfer.flatMap<"left" | "right">((relation) => {
        const partner =
          relation.from === actor.id
            ? relation.to
            : relation.to === actor.id
              ? relation.from
              : undefined;
        if (!partner) return [];
        const partnerIndex = panel.actors.findIndex(
          (item) => item.id === partner,
        );
        return [
          centers[partnerIndex] < centers[index] ||
          (centers[partnerIndex] === centers[index] && partnerIndex < index)
            ? "left"
            : "right",
        ];
      }),
    );
    const restingHands = asset.restingHands
      ? (actor.gesture || transferredSides.has("left")
          ? ""
          : asset.restingHands.left) +
        (actor.holding || transferredSides.has("right")
          ? ""
          : asset.restingHands.right)
      : "";
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
    const style = {
      skin,
      sleeve: asset.sleeveColor,
      longSleeve: asset.longSleeve,
    };
    const drawings: HandDrawing[] = [];
    const ports: Partial<Record<"left" | "right", HandDrawing["port"]>> = {};
    if (actor.gesture) {
      const drawing = drawGesture(actor.gesture, style);
      drawings.push(drawing);
      ports.left = drawing.port;
    }
    if (actor.holding) {
      const drawing = drawGrip(
        "right",
        style,
        "holding",
        `<g data-prop="${actor.holding}">${props[actor.holding]}</g>`,
      );
      drawings.push({
        ...drawing,
        front: `<g data-holding="${actor.holding}">${drawing.front}</g>`,
      });
      ports.right = drawing.port;
    }
    for (const side of transferredSides) {
      if (ports[side]) continue;
      const relation = panel.transfer.find((relation) => {
        const partner =
          relation.from === actor.id
            ? relation.to
            : relation.to === actor.id
              ? relation.from
              : undefined;
        if (!partner) return false;
        const partnerIndex = panel.actors.findIndex(
          (item) => item.id === partner,
        );
        return (
          side ===
          (centers[partnerIndex] < centers[index] ||
          (centers[partnerIndex] === centers[index] && partnerIndex < index)
            ? "left"
            : "right")
        );
      })!;
      const drawing = drawGrip(
        side,
        style,
        relation.from === actor.id ? "transfer" : "receive",
      );
      drawings.push(drawing);
      ports[side] = drawing.port;
    }
    handPorts.push(ports);
    markup.push(
      `<g data-character="${escapeXml(actor.id)}" transform="translate(${centers[index]} ${actorYs[index]}) scale(${scales[index]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${drawings.map((drawing) => drawing.back).join("")}${asset.body}<g data-face="${actor.expression}" transform="translate(${faceX} ${asset.faceY})" fill="#303341">${expressions[actor.expression]}</g>${restingHands}${drawings.map((drawing) => drawing.front).join("")}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${labelLines.map((part, row) => `<tspan x="0" dy="${row ? 18 : 0}">${escapeXml(part)}</tspan>`).join("")}</text></g>`,
    );
  });
  const links: string[] = [];
  panel.transfer.forEach((relation, index) => {
    const fromIndex = panel.actors.findIndex(
      (actor) => actor.id === relation.from,
    );
    const toIndex = panel.actors.findIndex((actor) => actor.id === relation.to);
    const from = centers[fromIndex];
    const to = centers[toIndex];
    const direction = Math.sign(to - from) || Math.sign(toIndex - fromIndex);
    const fromPort = handPorts[fromIndex][direction > 0 ? "right" : "left"]!;
    const toPort = handPorts[toIndex][direction > 0 ? "left" : "right"]!;
    const start = from + fromPort.x * scales[fromIndex];
    const end = to + toPort.x * scales[toIndex];
    const startY = actorYs[fromIndex] + fromPort.y * scales[fromIndex];
    const endY = actorYs[toIndex] + toPort.y * scales[toIndex];
    const angle = (Math.atan2(endY - startY, end - start) * 180) / Math.PI;
    links.push(
      `<g data-transfer="${escapeXml(relation.from)}" data-to="${escapeXml(relation.to)}" stroke="#586c8c" stroke-width="2.5"><path data-transfer-link="true" d="M${start} ${startY}L${end} ${endY}" fill="none"/><path transform="translate(${end} ${endY}) rotate(${angle})" d="M-16 -5L-8 0L-16 5" fill="none"/><g data-prop="${relation.prop}" transform="translate(${(start + end) / 2} ${(startY + endY) / 2 - 16 - index * 12})">${props[relation.prop]}</g></g>`,
    );
  });
  markup.splice(1, 0, ...links);
  let content = markup.slice(1).join("");
  let panelHeight = height;
  if (diagram && panel.diagram) {
    const boardWidth = width - 80;
    const contentWidth = boardWidth - 32;
    const boardHeight =
      panel.diagram.height ??
      clamp((contentWidth * diagram.height) / diagram.width + 58, 180, 1200);
    const contentHeight = boardHeight - 58;
    const scale = Math.min(
      contentWidth / diagram.width,
      contentHeight / diagram.height,
    );
    const diagramX = 56 + (contentWidth - diagram.width * scale) / 2;
    const diagramY = 66 + (contentHeight - diagram.height * scale) / 2;
    const titleLines = wrapText(panel.diagram.title, contentWidth, 16, font);
    if (titleLines.length > 1)
      throw new Error(
        "다이어그램 제목이 너무 깁니다. 제목이나 너비를 조정하세요.",
      );
    content = `<g data-diagram="mermaid"><rect x="40" y="20" width="${boardWidth}" height="${boardHeight}" rx="10" fill="#f3f7fc" stroke="#8093ab" stroke-width="2"/><text x="56" y="48" font-size="16" font-weight="700">${escapeXml(panel.diagram.title)}</text><g data-diagram-content="mermaid" transform="translate(${diagramX} ${diagramY}) scale(${scale})">${diagram.svg}</g></g><g data-scene="true" transform="translate(0 ${boardHeight + 40})">${content}</g>`;
    panelHeight += boardHeight + 40;
  }
  if (format === "phone") {
    const phoneHeight = panelHeight * 2 + 92;
    return {
      markup: `<rect x="20" y="0" width="${width - 40}" height="${phoneHeight}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/><g transform="translate(0 ${(phoneHeight - panelHeight) / 2})">${content}</g>`,
      height: phoneHeight,
    };
  }
  if (diagram)
    return {
      markup: `<rect x="20" y="0" width="${width - 40}" height="${panelHeight}" rx="18" fill="white" stroke="#c8d2df" stroke-width="1.6"/>${content}`,
      height: panelHeight,
    };
  return { markup: markup.join(""), height };
}
