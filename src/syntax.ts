/** The authored Korean surface normalizes into the existing resolved English model. */
export const syntaxFields = {
  comic: { title: "제목", cast: "등장인물", panels: "컷" },
  cast: { asset: "그림", label: "이름표" },
  panel: {
    mode: "구성",
    actors: "인물",
    dialogue: "대사",
    transfer: "전달",
    removeActors: "제외인물",
    diagram: "다이어그램",
  },
  actor: {
    id: "식별자",
    expression: "표정",
    gesture: "손모양",
    holding: "든소품",
    x: "가로위치",
    y: "세로위치",
    scale: "배율",
  },
  dialogue: {
    from: "화자",
    to: "상대",
    text: "내용",
    x: "가로위치",
    y: "세로위치",
    fontSize: "글자크기",
  },
  transfer: { from: "주는인물", to: "받는인물", prop: "소품" },
  diagram: {
    type: "종류",
    source: "원문",
    title: "제목",
    height: "높이",
  },
  options: {
    width: "너비",
    font: "글꼴",
    fontVersion: "글꼴버전",
    panelFormat: "컷비율",
  },
} as const;

export const syntaxValues = {
  asset: { client: "클라이언트", server: "서버", database: "데이터베이스" },
  expression: {
    neutral: "보통",
    happy: "기쁨",
    confused: "어리둥절",
    sad: "슬픔",
    angry: "화남",
  },
  gesture: { wave: "인사손", point: "가리키는손" },
  prop: { request: "요청", data: "데이터", key: "열쇠" },
  mode: { full: "전체", before: "이전" },
  panelFormat: { compact: "기본", phone: "모바일" },
  diagramType: { mermaid: "머메이드" },
} as const;

type Context = keyof typeof syntaxFields;
const enumFields: Partial<
  Record<Context, Record<string, keyof typeof syntaxValues>>
> = {
  cast: { asset: "asset" },
  actor: { expression: "expression", gesture: "gesture", holding: "prop" },
  panel: { mode: "mode" },
  transfer: { prop: "prop" },
  diagram: { type: "diagramType" },
  options: { panelFormat: "panelFormat" },
};

function object(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function translate(
  value: unknown,
  context: Context,
  korean: boolean,
  path: string,
): unknown {
  if (!object(value)) return value;
  const fields: Record<string, string> = syntaxFields[context];
  const result: Record<string, unknown> = Object.create(null);
  for (const [key, raw] of Object.entries(value)) {
    const field =
      Object.keys(fields).find(
        (name) => key === name || key === fields[name],
      ) ?? key;
    const canonical = Object.hasOwn(fields, field) ? fields[field] : undefined;
    const outputKey = korean ? (canonical ?? field) : field;
    if (Object.hasOwn(result, outputKey)) {
      throw new Error(
        `${path}: '${fields[field]}'와 '${field}'은 같은 항목입니다. 하나만 작성하세요.`,
      );
    }
    let next: unknown = raw;
    const enumRow = enumFields[context];
    const valuesName =
      enumRow && Object.hasOwn(enumRow, field) ? enumRow[field] : undefined;
    if (valuesName && typeof raw === "string") {
      const values: Record<string, string> = syntaxValues[valuesName];
      const english = Object.keys(values).find(
        (name) => raw === name || raw === values[name],
      );
      if (english) next = korean ? values[english] : english;
    }
    if (context === "comic" && field === "cast" && object(raw)) {
      const cast: Record<string, unknown> = Object.create(null);
      for (const [id, member] of Object.entries(raw))
        cast[id] = translate(member, "cast", korean, `${path}.등장인물.${id}`);
      next = cast;
    } else if (context === "panel" && field === "diagram") {
      next = translate(raw, "diagram", korean, `${path}.다이어그램`);
    } else if (Array.isArray(raw)) {
      const child =
        context === "comic" && field === "panels"
          ? "panel"
          : context === "panel" && field === "actors"
            ? "actor"
            : context === "panel" && field === "dialogue"
              ? "dialogue"
              : context === "panel" && field === "transfer"
                ? "transfer"
                : undefined;
      if (child)
        next = raw.map((item, index) =>
          translate(
            item,
            child,
            korean,
            `${path}.${fields[field]}[${index + 1}]`,
          ),
        );
    }
    result[outputKey] = next;
  }
  return result;
}

export const normalizeComic = (value: unknown) =>
  translate(value, "comic", false, "만화");
export const koreanComic = (value: unknown) =>
  translate(value, "comic", true, "만화");
export function normalizeOptions(value: unknown) {
  const result = translate(value, "options", false, "표시 설정");
  if (!object(result)) throw new Error("표시 설정: 객체가 필요합니다.");
  for (const key of Object.keys(result))
    if (!Object.hasOwn(syntaxFields.options, key))
      throw new Error(`표시 설정: 알 수 없는 항목 '${key}'.`);
  return result;
}
