import type { HumanAppearance } from "./model";

export const defaultHumanAppearance: Readonly<HumanAppearance> = Object.freeze({
  skinColor: "#f0c8a6",
  hairStyle: "short",
  hairColor: "#47362f",
  outfit: "shirt",
  outfitColor: "#647bd6",
  glasses: false,
});
const color = (value: string) => {
  if (
    (value.length !== 4 && value.length !== 7) ||
    !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)
  )
    throw new Error("사람의 외형 색상은 #RGB 또는 #RRGGBB로 작성하세요.");
  return value;
};

/** Compose a person with the same expression and hand ports as the icon assets. */
export function renderHuman(
  appearance: HumanAppearance = defaultHumanAppearance,
) {
  const skin = color(appearance.skinColor);
  const hair = color(appearance.hairColor);
  const clothing = color(appearance.outfitColor);
  const backs: Record<HumanAppearance["hairStyle"], string> = {
    short: "",
    bob: `<path d="M-37 -24Q-42 -56 0 -58Q42 -56 37 -24L41 17Q29 26 20 15H-20Q-29 26 -41 17Z" fill="${hair}"/>`,
    long: `<path d="M-37 -24Q-43 -56 0 -58Q43 -56 37 -24L43 46Q30 53 23 40H-23Q-30 53 -43 46Z" fill="${hair}"/>`,
    bald: "",
  };
  const fronts: Record<HumanAppearance["hairStyle"], string> = {
    short: `<path d="M-36 -24Q-40 -52 -11 -57Q21 -63 36 -37L37 -23L29 -32L26 -43Q13 -43 3 -48Q-9 -42 -25 -43L-30 -31Z" fill="${hair}"/>`,
    bob: `<path d="M-37 -23Q-42 -55 0 -58Q42 -55 37 -23L32 8L28 -13L27 -41Q7 -47 -8 -43Q-18 -46 -27 -41L-28 -13L-32 8Z" fill="${hair}"/>`,
    long: `<path d="M-37 -24Q-41 -55 0 -58Q41 -55 37 -24L32 16L28 -9L27 -41Q12 -46 2 -50Q-9 -43 -27 -39L-28 -9L-32 16Z" fill="${hair}"/>`,
    bald: "",
  };
  const outfits: Record<HumanAppearance["outfit"], string> = {
    shirt: `<path d="M-16 21L-34 25Q-43 29 -45 38L-49 44L-37 49L-34 56H34L37 49L49 44L45 38Q43 29 34 25L16 21Z" fill="${clothing}"/><path d="M-15 23Q0 38 15 23M-45 39L-36 43M36 43L45 39" fill="none"/>`,
    jacket: `<path d="M-16 21L-34 25Q-43 29 -45 39L-49 47L-36 51L-33 56H33L36 51L49 47L45 39Q43 29 34 25L16 21Z" fill="${clothing}"/><path d="M-12 23L0 31L12 23L16 56H-16Z" fill="#f4f5f9"/><path d="M-16 22L-23 32L-12 36L-17 55M16 22L23 32L12 36L17 55M-31 41H-21M21 41H31" fill="none"/>`,
    hoodie: `<path d="M-17 21L-33 25Q-43 29 -45 39L-49 47L-36 52L-33 56H33L36 52L49 47L45 39Q43 29 33 25L17 21Z" fill="${clothing}"/><path d="M-21 20Q-29 23 -25 32Q0 45 25 32Q29 23 21 20L12 22Q0 32 -12 22Z" fill="${clothing}"/><path d="M-17 43H17L21 54H-21ZM-10 32V40M10 32V40" fill="none"/>`,
  };
  if (
    !Object.hasOwn(fronts, appearance.hairStyle) ||
    !Object.hasOwn(outfits, appearance.outfit)
  )
    throw new Error("지원하는 머리 모양과 옷을 선택하세요.");
  const part = (name: string, content: string) =>
    content ? `<g data-human-part="${name}">${content}</g>` : "";
  const glasses = appearance.glasses
    ? `<g data-human-part="glasses" fill="none" stroke-width="2.2"><circle cx="-17" cy="-20" r="11"/><circle cx="17" cy="-20" r="11"/><path d="M-6 -20Q0 -24 6 -20M-28 -22L-34 -25M28 -22L34 -25"/></g>`
    : "";
  const body = `<g data-human="true" data-hair-style="${appearance.hairStyle}" data-outfit="${appearance.outfit}">${part("hair-back", backs[appearance.hairStyle])}${part("outfit", outfits[appearance.outfit])}${part("neck", `<path d="M-10 11V24Q0 33 10 24V11Z" fill="${skin}"/>`)}${part("ears", `<ellipse cx="-36" cy="-17" rx="7" ry="9" fill="${skin}"/><ellipse cx="36" cy="-17" rx="7" ry="9" fill="${skin}"/><path d="M-37 -21Q-41 -17 -37 -13M37 -21Q41 -17 37 -13" fill="none" stroke-width="1.8"/>`)}${part("face", `<path d="M-34 -25Q-36 -54 0 -55Q36 -54 34 -25L32 -5Q29 18 0 21Q-29 18 -32 -5Z" fill="${skin}"/><g stroke="none" fill="#df8e8b" fill-opacity=".28"><ellipse cx="-24" cy="-8" rx="5" ry="3"/><ellipse cx="24" cy="-8" rx="5" ry="3"/></g>`)}${part("hair-front", fronts[appearance.hairStyle])}${part("nose", '<path d="M0 -13V-7H3" fill="none" stroke-width="1.8"/>')}${glasses}</g>`;
  const palm = `<path d="M-49 43Q-54 46 -51 51L-48 55Q-44 59 -40 55L-36 50Q-34 46 -38 43L-40 42Z" fill="${skin}"/><path d="M-46 48L-43 51M-42 46L-39 49" fill="none" stroke-width="1.5"/>`;
  return {
    body,
    faceY: -16,
    color: skin,
    restingHands: {
      left: `<g data-human-part="resting-hand-left">${palm}</g>`,
      right: `<g data-human-part="resting-hand-right" transform="scale(-1 1)">${palm}</g>`,
    },
  };
}
