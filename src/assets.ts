import { renderHuman } from "./human";
import type { CastMember } from "./model";

export interface CharacterAsset {
  body: string;
  faceY: number;
  color: string;
  restingHands?: { left: string; right: string };
  pointGesture?: string;
}
export const assetVersion = "5";
export const characters: Record<string, CharacterAsset> = {
  client: {
    color: "#9fcdfa",
    faceY: 0,
    body: '<circle r="56" fill="#badcff"/><path d="M-24 -58h48" fill="none"/>',
  },
  server: {
    color: "#efb970",
    faceY: 0,
    body: '<rect x="-52" y="-54" width="104" height="108" rx="22" fill="#ffe0a8"/><path d="M-34 -36h42M-34 -27h26"/><circle cx="30" cy="-33" r="3" fill="#7bb79b"/>',
  },
  database: {
    color: "#b4a0ed",
    faceY: 5,
    body: '<path d="M-52 -39v79c0 23 104 23 104 0v-79" fill="#daccff"/><ellipse cy="-39" rx="52" ry="18" fill="#ece4ff"/><path d="M-52 24c0 23 104 23 104 0" fill="none"/>',
  },
  human: renderHuman(),
};

/** Resolve per-person appearance while preserving the original icon assets. */
export function getCharacterAsset(member: CastMember): CharacterAsset {
  return member.asset === "human"
    ? renderHuman(member.appearance)
    : characters[member.asset];
}
export const expressions: Record<string, string> = {
  neutral:
    '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-10 17q10 7 20 0" fill="none"/>',
  happy:
    '<path d="M-25 -2q8 -12 16 0m18 0q8 -12 16 0M-13 16q13 18 26 0" fill="none"/>',
  confused:
    '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-24 -17l13 -5m21 1 14 4M-8 18q8 -6 16 0" fill="none"/>',
  sad: '<circle cx="-17" cy="-4" r="3.5"/><circle cx="17" cy="-4" r="3.5"/><path d="M-12 23q12 -14 24 0" fill="none"/>',
  angry:
    '<path d="M-25 -16l15 6m20 0 15 -6M-10 20h20" fill="none"/><circle cx="-17" cy="-1" r="3"/><circle cx="17" cy="-1" r="3"/>',
};
export const gestures: Record<string, string> = {
  wave: '<g data-hand="wave"><circle cx="-65" cy="-22" r="12" fill="white"/><path d="M-77 -42l-4 -8m15 2v-10m13 17 5 -7" fill="none"/></g>',
  point:
    '<g data-hand="point"><circle cx="-65" cy="0" r="11" fill="white"/><path d="M-77 0h-13" fill="none"/></g>',
};
/** Filled cartoon hands for icons; human gestures retain their own appearance. */
const openIconHand =
  "M-65 -9Q-76 -9 -79 -18L-85 -22Q-89 -25 -86 -28Q-83 -31 -80 -28L-83.5 -31V-46Q-83.5 -50 -79.75 -50Q-76 -50 -76 -46V-31Q-76 -28 -71.5 -31V-47Q-71.5 -51 -67.75 -51Q-64 -51 -64 -47V-31Q-64 -28 -59.5 -31V-47Q-59.5 -51 -55.75 -51Q-52 -51 -52 -47V-31Q-52 -28 -47.5 -31V-46Q-47.5 -50 -43.75 -50Q-40 -50 -40 -46V-22Q-40 -11 -57 -9Z";
export const iconGestures: Record<string, string> = {
  wave: `<g data-hand="wave" stroke-linejoin="round"><g data-wave-trail="left" transform="translate(-64 -20) rotate(-8) scale(.92) translate(64 14)" opacity=".2"><path d="${openIconHand}" fill="none" stroke="#586c8c" stroke-width="2.2"/></g><g data-wave-trail="right" transform="translate(-64 -20) rotate(8) scale(.92) translate(64 14)" opacity=".2"><path d="${openIconHand}" fill="none" stroke="#586c8c" stroke-width="2.2"/></g><path d="M-88 -33q-4 -7 0 -14M-35 -33q4 -7 0 -14" fill="none" stroke="#586c8c" stroke-width="1.8" opacity=".4"/><path d="${openIconHand}" fill="white"/></g>`,
  point:
    '<g data-hand="point" stroke-linejoin="round"><path d="M-72 -4H-85a4 4 0 0 0 0 8H-74l3 5q3 4 9 2l5 -3q4 -2 3 -7l-1 -6q-1 -5 -6 -6h-4q-5 -1 -7 3Z" fill="white"/><path d="M-68 -7q3 5 8 4" fill="none" stroke-width="2"/></g>',
};
export const props: Record<string, string> = {
  request:
    '<rect x="-18" y="-13" width="36" height="26" rx="4" fill="#f9f0cd"/><path d="M-18 -13L0 1l18 -14" fill="none"/>',
  data: '<path d="M-16 -12v23c0 10 32 10 32 0v-23" fill="#daccff"/><ellipse cy="-12" rx="16" ry="6" fill="#ece4ff"/>',
  key: '<circle cx="-10" r="9" fill="#ffe0a8"/><path d="M0 0h21m-5 0v8m-8 -8v6" fill="none"/>',
};

export function escapeXml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
}
