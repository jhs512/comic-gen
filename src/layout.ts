import { getCharacterAsset, expressions, props, escapeXml } from "./assets";
import {
  drawGesture,
  drawGrip,
  drawTransferHand,
  type HandDrawing,
} from "./hands";
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
  const centers = panel.actors.map((actor, index) =>
    clamp(
      36 + (width - 72) * (actor.x ?? (index + 0.5) / panel.actors.length),
      26 + radius * scales[index],
      width - 26 - radius * scales[index],
    ),
  );
  const crossesActor = panel.transfer.some((relation) => {
    const from =
      centers[panel.actors.findIndex((actor) => actor.id === relation.from)];
    const to =
      centers[panel.actors.findIndex((actor) => actor.id === relation.to)];
    return panel.actors.some(
      (actor, index) =>
        actor.id !== relation.from &&
        actor.id !== relation.to &&
        centers[index] >= Math.min(from, to) &&
        centers[index] <= Math.max(from, to),
    );
  });
  const height =
    dialogueHeight +
    Math.max(204, Math.ceil(196 * Math.max(...scales))) +
    (crossesActor ? 40 : 0) +
    Math.max(0, panel.transfer.length - 1) * 24;
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
  const handRests: Array<
    Partial<Record<"left" | "right", NonNullable<HandDrawing["rest"]>>>
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
    const other = panel.dialogue.find(
      (line) => line.from === actor.id && line.to,
    )?.to;
    const targetIndex = panel.actors.findIndex((item) => item.id === other);
    // An authored 손방향 wins; otherwise a point faces its first dialogue target.
    const gestureSide =
      actor.gestureDirection ??
      (actor.gesture === "point" &&
      targetIndex >= 0 &&
      centers[targetIndex] > centers[index]
        ? "right"
        : "left");
    const holdingSide =
      actor.gesture && gestureSide === "right" ? "left" : "right";
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
    const rests: Partial<
      Record<"left" | "right", NonNullable<HandDrawing["rest"]>>
    > = {};
    if (actor.gesture) {
      const drawing = drawGesture(actor.gesture, style, gestureSide);
      drawings.push(drawing);
      ports[gestureSide] = drawing.port;
    }
    if (actor.holding) {
      const drawing = drawGrip(
        holdingSide,
        style,
        "holding",
        `<g data-prop="${actor.holding}">${props[actor.holding]}</g>`,
      );
      drawings.push({
        ...drawing,
        front: `<g data-holding="${actor.holding}">${drawing.front}</g>`,
      });
      ports[holdingSide] = drawing.port;
    }
    for (const side of transferredSides) {
      if (ports[side]) continue;
      // Icons pass items as a plain flow: the link leaves a small gap at the body edge.
      if (!human) {
        ports[side] = { x: side === "left" ? -60 : 60, y: 20 };
        continue;
      }
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
      const drawing = drawTransferHand(
        side,
        style,
        relation.from === actor.id ? "transfer" : "receive",
      );
      drawings.push(drawing);
      ports[side] = drawing.port;
      if (drawing.rest) rests[side] = drawing.rest;
    }
    handPorts.push(ports);
    handRests.push(rests);
    const restingHands = asset.restingHands
      ? (ports.left ? "" : asset.restingHands.left) +
        (ports.right ? "" : asset.restingHands.right)
      : "";
    markup.push(
      `<g data-character="${escapeXml(actor.id)}" transform="translate(${centers[index]} ${actorYs[index]}) scale(${scales[index]})" stroke="#303341" stroke-width="2.8" stroke-linecap="round"><ellipse cy="69" rx="51" ry="7" fill="#e8edf3" stroke="none"/>${drawings.map((drawing) => drawing.back).join("")}${asset.body}<g data-face="${actor.expression}" transform="translate(${faceX} ${asset.faceY})" fill="#303341">${expressions[actor.expression]}</g>${restingHands}${drawings.map((drawing) => drawing.front).join("")}<text y="94" text-anchor="middle" stroke="none" fill="#303341" font-size="16">${labelLines.map((part, row) => `<tspan x="0" dy="${row ? 18 : 0}">${escapeXml(part)}</tspan>`).join("")}</text></g>`,
    );
  });
  const links: string[] = [];
  // Items ride on their link. Relations between the same pair share one segment,
  // so their items are spread along it.
  const pairOf = (relation: (typeof panel.transfer)[number]) =>
    JSON.stringify([relation.from, relation.to].sort());
  const pairTotals = new Map<string, number>();
  for (const relation of panel.transfer)
    pairTotals.set(
      pairOf(relation),
      (pairTotals.get(pairOf(relation)) ?? 0) + 1,
    );
  const pairSeen = new Map<string, number>();
  const usedRests = new Set<string>();
  panel.transfer.forEach((relation) => {
    const fromIndex = panel.actors.findIndex(
      (actor) => actor.id === relation.from,
    );
    const toIndex = panel.actors.findIndex((actor) => actor.id === relation.to);
    const from = centers[fromIndex];
    const to = centers[toIndex];
    const direction = Math.sign(to - from) || Math.sign(toIndex - fromIndex);
    const fromSide = direction > 0 ? "right" : "left";
    const fromPort = handPorts[fromIndex][fromSide]!;
    const rest = handRests[fromIndex][fromSide];
    const toPort = handPorts[toIndex][direction > 0 ? "left" : "right"]!;
    // Links are drawn over the characters, so they must not cover a hand: a
    // link leaves a gripping or gesturing hand from its edge and its arrowhead
    // stops just short of the receiving side. An offering palm's port is
    // already at its fingertips.
    const startGap = rest ? 0 : 10 * scales[fromIndex];
    const endGap = 6;
    const horizontal = Math.abs(to - from) >= 1;
    const start =
      from +
      fromPort.x * scales[fromIndex] +
      (horizontal ? direction * startGap : 0);
    const end =
      to + toPort.x * scales[toIndex] - (horizontal ? direction * endGap : 0);
    const vertical = Math.sign(actorYs[toIndex] - actorYs[fromIndex]) || 1;
    const startY =
      actorYs[fromIndex] +
      fromPort.y * scales[fromIndex] +
      (horizontal ? 0 : vertical * startGap);
    const endY =
      actorYs[toIndex] +
      toPort.y * scales[toIndex] -
      (horizontal ? 0 : vertical * endGap);
    let path = `M${start} ${startY}L${end} ${endY}`;
    let pointAt = (t: number) => ({
      x: start + (end - start) * t,
      y: startY + (endY - startY) * t,
    });
    let approachX = end - start;
    let approachY = endY - startY;
    const blockers = panel.actors.flatMap((actor, actorIndex) =>
      actor.id !== relation.from &&
      actor.id !== relation.to &&
      centers[actorIndex] >= Math.min(start, end) &&
      centers[actorIndex] <= Math.max(start, end)
        ? [actorIndex]
        : [],
    );
    if (blockers.length) {
      // Route over an intervening character so both the link and its item stay
      // visible. The extra scene space keeps this route below the dialogue.
      const bendY = Math.min(
        startY,
        endY,
        ...blockers.map(
          (actorIndex) => actorYs[actorIndex] - 70 * scales[actorIndex] - 30,
        ),
      );
      const controlY = (4 * bendY - (startY + endY) / 2) / 3;
      const step = (end - start) / 3;
      path = `M${start} ${startY}C${start + step} ${controlY} ${end - step} ${controlY} ${end} ${endY}`;
      pointAt = (t: number) => {
        const u = 1 - t;
        return {
          x:
            u ** 3 * start +
            3 * u * u * t * (start + step) +
            3 * u * t * t * (end - step) +
            t ** 3 * end,
          y: u ** 3 * startY + 3 * u * t * (u + t) * controlY + t ** 3 * endY,
        };
      };
      approachX = step;
      approachY = endY - controlY;
    }
    const pair = pairOf(relation);
    const total = pairTotals.get(pair)!;
    const order = pairSeen.get(pair) ?? 0;
    pairSeen.set(pair, order + 1);
    // A person's offering palm carries the first item it hands over. Other
    // items ride on their link, spread when several share it; a link too short
    // to carry an item clear of both ends lifts it just above its middle.
    const restKey = `${fromIndex}:${fromSide}`;
    const onPalm = !!rest && !usedRests.has(restKey);
    if (onPalm) usedRests.add(restKey);
    const length = Math.hypot(end - start, endY - startY);
    const spread = length / (total + 1) >= 34;
    const point = pointAt(spread ? (order + 1) / (total + 1) : 0.5);
    const lift = spread ? 0 : 26 + 30 * order;
    const propX = onPalm ? from + rest.x * scales[fromIndex] : point.x;
    const propY = onPalm
      ? actorYs[fromIndex] + (rest.y - 12) * scales[fromIndex]
      : Math.max(24, point.y - lift);
    const angle = (Math.atan2(approachY, approachX) * 180) / Math.PI;
    links.push(
      `<g data-transfer="${escapeXml(relation.from)}" data-to="${escapeXml(relation.to)}" stroke="#586c8c" stroke-width="2.5" stroke-linejoin="round"><path data-transfer-link="true" d="${path}" fill="none"/><path transform="translate(${end} ${endY}) rotate(${angle})" d="M-9 -5L0 0L-9 5" fill="none"/><g data-prop="${relation.prop}" transform="translate(${propX} ${propY})${onPalm ? ` scale(${scales[fromIndex]})` : ""}">${props[relation.prop]}</g></g>`,
    );
  });
  // Links follow the characters so an item resting on a palm stays in front of the hand.
  markup.push(...links);
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
