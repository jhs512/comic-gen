export interface CharacterAsset {
  body: string;
  faceY: number;
  color: string;
}
export const assetVersion = "1";
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
};
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
