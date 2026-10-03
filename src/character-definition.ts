import { characters } from "./assets";
import { defaultHumanAppearance } from "./human";
import { syntaxFields, syntaxValues } from "./syntax";
import type { CastMember, HumanAppearance, Persona } from "./model";

function record(value: unknown, context: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${context}: 객체가 필요합니다.`);
  return value as Record<string, unknown>;
}
function text(value: unknown, context: string, max = 10000): string {
  if (typeof value !== "string" || !value.trim())
    throw new Error(`${context}: 비어 있지 않은 문자열이 필요합니다.`);
  if (value.length > max)
    throw new Error(
      `${context}: 텍스트가 너무 깁니다. ${max}자 이내로 작성하세요.`,
    );
  return value;
}
function known(
  value: Record<string, unknown>,
  fields: Record<string, string>,
  context: string,
) {
  for (const key of Object.keys(value))
    if (!Object.hasOwn(fields, key))
      throw new Error(`${context}: 알 수 없는 항목 '${key}'.`);
}
function readPersona(value: unknown, context: string): Persona {
  const raw = record(value, context);
  known(raw, syntaxFields.persona, context);
  const persona: Persona = {};
  if (raw.role !== undefined)
    persona.role = text(raw.role, `${context}.직무`, 100);
  if (raw.personality !== undefined)
    persona.personality = text(raw.personality, `${context}.성격`, 300);
  if (raw.speechStyle !== undefined)
    persona.speechStyle = text(raw.speechStyle, `${context}.말투`, 300);
  if (!Object.keys(persona).length)
    throw new Error(`${context}: 직무·성격·말투 중 하나 이상 작성하세요.`);
  return persona;
}
function color(value: unknown, fallback: string, context: string): string {
  if (value === undefined) return fallback;
  const hex = text(value, context, 7);
  if (
    (hex.length !== 4 && hex.length !== 7) ||
    !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)
  )
    throw new Error(`${context}: #RGB 또는 #RRGGBB 색상을 작성하세요.`);
  return hex;
}
function choice<T extends string>(
  value: unknown,
  values: Readonly<Record<T, string>>,
  fallback: T,
  context: string,
): T {
  if (value === undefined) return fallback;
  const selected = text(value, context);
  if (!Object.hasOwn(values, selected))
    throw new Error(
      `${context}: ${Object.values(values).join(", ")} 중 하나를 선택하세요.`,
    );
  return selected as T;
}
function readAppearance(value: unknown, context: string): HumanAppearance {
  const raw = value === undefined ? {} : record(value, context);
  known(raw, syntaxFields.appearance, context);
  if (raw.glasses !== undefined && typeof raw.glasses !== "boolean")
    throw new Error(`${context}.안경: true 또는 false가 필요합니다.`);
  return {
    skinColor: color(
      raw.skinColor,
      defaultHumanAppearance.skinColor,
      `${context}.피부색`,
    ),
    hairStyle: choice(
      raw.hairStyle,
      syntaxValues.hairStyle,
      defaultHumanAppearance.hairStyle,
      `${context}.머리모양`,
    ),
    hairColor: color(
      raw.hairColor,
      defaultHumanAppearance.hairColor,
      `${context}.머리색`,
    ),
    outfit: choice(
      raw.outfit,
      syntaxValues.outfit,
      defaultHumanAppearance.outfit,
      `${context}.옷`,
    ),
    outfitColor: color(
      raw.outfitColor,
      defaultHumanAppearance.outfitColor,
      `${context}.옷색`,
    ),
    glasses:
      raw.glasses === undefined ? defaultHumanAppearance.glasses : raw.glasses,
  };
}

/** Resolve cast definitions once, keeping persona guidance separate from paint. */
export function readCharacterDefinitions(
  castValue: unknown,
  personasValue?: unknown,
): { cast: Record<string, CastMember>; personas?: Record<string, Persona> } {
  const personas: Record<string, Persona> = Object.create(null);
  if (personasValue !== undefined) {
    for (const [id, value] of Object.entries(
      record(personasValue, "페르소나"),
    )) {
      text(id, "페르소나 식별자");
      personas[id] = readPersona(value, `페르소나.${id}`);
    }
  }
  const cast: Record<string, CastMember> = Object.create(null);
  for (const [id, value] of Object.entries(record(castValue, "등장인물"))) {
    const context = `등장인물.${id}`;
    const raw = record(value, context);
    known(raw, syntaxFields.cast, context);
    const asset = text(raw.asset, `${context}.그림`);
    if (!Object.hasOwn(characters, asset))
      throw new Error(`${context}: 없는 에셋 '${asset}'.`);
    let persona: Persona | undefined;
    if (raw.persona !== undefined) {
      if (typeof raw.persona === "string") {
        const name = text(raw.persona, `${context}.페르소나`);
        if (!Object.hasOwn(personas, name))
          throw new Error(`${context}.페르소나: 없는 페르소나 '${name}'.`);
        persona = { ...personas[name] };
      } else persona = readPersona(raw.persona, `${context}.페르소나`);
    }
    if (asset !== "human" && raw.appearance !== undefined)
      throw new Error(`${context}.외형: 사람 그림에서만 사용할 수 있습니다.`);
    cast[id] = {
      asset,
      label:
        raw.label === undefined ? id : text(raw.label, `${context}.이름표`),
      ...(asset === "human"
        ? { appearance: readAppearance(raw.appearance, `${context}.외형`) }
        : {}),
      ...(persona ? { persona } : {}),
    };
  }
  return { cast, ...(personasValue !== undefined ? { personas } : {}) };
}
