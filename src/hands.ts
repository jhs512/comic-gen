type Side = "left" | "right";
export interface HandStyle {
  skin: string;
  sleeve?: string;
  longSleeve?: boolean;
}
export interface HandDrawing {
  back: string;
  front: string;
  port: { x: number; y: number };
  /** Where a handed-over item sits in the giving hand, when the hand offers one. */
  rest?: { x: number; y: number };
  /** Thumb drawn in front of the handed-over item, in character coordinates. */
  overlay?: string;
}

// One original silhouette: a broad palm, four fanned fingers and an inward thumb.
const openPalm =
  "M-10 4Q-12 -3 -17 -9L-23 -22Q-26 -27 -22 -30Q-18 -33 -15 -28L-10 -21L-15 -35Q-16 -40 -12 -42Q-8 -44 -6 -38L-2 -28L-4 -43Q-4 -48 0 -48Q4 -48 4 -43L6 -28L8 -38Q9 -43 13 -42Q17 -41 16 -37L14 -22Q14 -16 18 -19L22 -24Q25 -27 28 -24Q31 -21 27 -17L19 -5Q15 2 8 4L7 7Z";
const pointingPalm =
  "M-5 -7H-20Q-24 -7 -24 -3Q-24 1 -20 1H-8Q-11 4 -8 7L-5 10Q-2 13 3 11L9 8Q12 6 11 1L10 -6Q9 -11 5 -12L0 -14Q-4 -15 -6 -12Q-8 -9 -5 -7Z";
// A person's index finger is shorter so it reads as a finger, not a stick.
const humanPointingPalm = pointingPalm.replace(
  "H-20Q-24 -7 -24 -3Q-24 1 -20 1H",
  "H-15Q-19 -7 -19 -3Q-19 1 -15 1H",
);
// An upright ☝ for a person's screen-left hand: the index rises from the fist's
// head-side edge and the thumb crosses the front, so it never reads as another finger.
const humanRaisedIndex =
  "M-9 -3Q-9 -7 -5 -7H2V-21Q2 -24 5 -24Q8 -24 8 -21V-6Q10 -4 10 0V5Q10 11 3 11H-3Q-9 11 -9 5Z";
const closedPalm =
  "M-8 -5Q-8 -10 -2 -10H5Q10 -9 10 -4V4Q10 9 4 10H-3Q-9 9 -10 3Z";

function arm(
  style: HandStyle,
  side: Side,
  pose: "wave" | "point" | "point-up" | "grip",
) {
  const human = !!style.sleeve;
  const paths = human
    ? {
        wave: "M-47 42Q-61 45 -65 34Q-72 19 -70 -8L-63 -9Q-64 17 -58 28Q-55 35 -42 36Z",
        point: "M-47 43Q-60 39 -68 25L-62 20Q-55 31 -40 35Z",
        // Elbow out, forearm upright: the raised hand stays near head height.
        "point-up":
          "M-47 42Q-66 43 -70 26L-68 -8L-60 -8L-62 24Q-60 34 -42 36Z",
        grip: "M42 36Q56 36 61 17L67 20Q63 44 47 44Z",
      }
    : {
        wave: "M-48 20Q-62 24 -66 13Q-71 2 -70 -8L-63 -9Q-63 4 -60 11Q-57 18 -47 15Z",
        point: "M-47 17Q-57 16 -68 17L-68 24Q-55 24 -47 23Z",
        "point-up":
          "M-48 20Q-65 24 -68 7Q-73 -13 -68 -38L-61 -38Q-65 -13 -61 5Q-58 18 -47 15Z",
        grip: "M46 17Q54 13 62 16L63 23Q54 20 47 23Z",
      };
  const mirror = (pose === "grip" ? side === "left" : side === "right")
    ? ' transform="scale(-1 1)"'
    : "";
  const fill = style.longSleeve ? style.sleeve! : style.skin;
  return `<g data-arm="${side}"${human ? ` data-human-part="arm-${side}"` : ""}${mirror} stroke-linejoin="round"><path d="${paths[pose]}" fill="${fill}" stroke-width="2.6"/></g>`;
}

export function drawGesture(
  gesture: string,
  style: HandStyle,
  side: Side = "left",
): HandDrawing {
  if (gesture === "wave") {
    // A person's hand stays smaller than half the face; icon bodies are larger.
    // Its motion lines sit outside and above the hand, clear of the head.
    const human = !!style.sleeve;
    const motion = human
      ? "M-86 -30Q-88 -42 -80 -48M-72 -48Q-64 -53 -56 -50"
      : "M-90 -46Q-90 -59 -81 -64M-40 -41Q-36 -32 -41 -25";
    // A right wave mirrors the whole left drawing, motion lines included.
    return {
      back: arm(style, side, "wave"),
      front: `<g data-gesture="wave"${side === "right" ? ' transform="scale(-1 1)"' : ""}><g data-hand="wave" data-side="${side}" stroke-linejoin="round"><path data-wave-motion="true" d="${motion}" fill="none" stroke="#586c8c" stroke-width="2.5"/><g data-palm="wave" transform="translate(-66 -8) rotate(-8) scale(${human ? 0.6 : 0.82})"><path d="${openPalm}" fill="${style.skin}" stroke-width="2.6"/><path d="M10 -12Q5 -15 1 -9" fill="none" stroke-width="1.6"/></g></g></g>`,
      port: { x: side === "left" ? -66 : 66, y: -22 },
    };
  }
  // People get a smaller pointing hand than the large icon bodies.
  const human = !!style.sleeve;
  const palm = human ? humanPointingPalm : pointingPalm;
  const size = human ? " scale(.72)" : "";
  if (gesture === "point-up" && human)
    return {
      back: arm(style, "left", "point-up"),
      front: `<g data-gesture="point-up"><g data-hand="point-up" data-side="left" transform="translate(-64 -16) scale(.8)" stroke-linejoin="round"><path data-palm="point-up" d="${humanRaisedIndex}" fill="${style.skin}" stroke-width="2.8"/><path d="M-9 1Q-3 -1 3 2Q5 4 2 6H-6" fill="${style.skin}" stroke-width="2.2"/><path d="M-5 -7Q-6 -3 -2 -3" fill="none" stroke-width="1.6"/></g></g>`,
      port: { x: -64, y: -35 },
    };
  if (gesture === "point-up")
    return {
      back: arm(style, "left", "point-up"),
      front: `<g data-gesture="point-up"><g data-hand="point-up" data-side="left" transform="translate(-64 -39) rotate(90)${size}" stroke-linejoin="round"><path data-palm="point-up" d="${palm}" fill="${style.skin}" stroke-width="2.6"/><path d="M-3 -6Q1 -3 6 -4M1 5L7 3" fill="none" stroke-width="1.6"/></g></g>`,
      port: { x: -64, y: -39 },
    };
  const x = side === "left" ? -64 : 64;
  return {
    back: arm(style, side, "point"),
    front: `<g data-gesture="point"><g data-hand="point" data-side="${side}" transform="translate(${x} 20)${side === "right" ? " scale(-1 1)" : ""}${size}" stroke-linejoin="round"><path data-palm="point" d="${palm}" fill="${style.skin}" stroke-width="2.6"/><path d="M-3 -6Q1 -3 6 -4M1 5L7 3" fill="none" stroke-width="1.6"/></g></g>`,
    port: { x: side === "left" ? -66 : 66, y: 20 },
  };
}

export function drawGrip(
  side: Side,
  style: HandStyle,
  kind: "holding",
  prop = "",
): HandDrawing {
  const x = side === "left" ? -62 : 62;
  const mirrored = side === "left" ? ' transform="scale(-1 1)"' : "";
  return {
    back: arm(style, side, "grip"),
    front: `<g data-hand="${kind}" data-side="${side}" transform="translate(${x} 20)" stroke-linejoin="round"><g${mirrored}><path data-palm="grip" d="${closedPalm}" fill="${style.skin}" stroke-width="2.6"/>${prop ? `<g transform="translate(7.5 -14)">${prop}</g>` : ""}<path d="M-7 -4Q-4 -8 0 -5L5 -1Q6 2 2 3L-4 1Q-8 0 -7 -4Z" fill="${style.skin}" stroke-width="2"/><path d="M1 6H6" fill="none" stroke-width="1.5"/></g></g>`,
    port: { x, y: 20 },
  };
}

const gripThumb =
  '<path d="M-7 -4Q-4 -8 0 -5L5 -1Q6 2 2 3L-4 1Q-8 0 -7 -4Z" stroke-width="2"/><path d="M1 6H6" fill="none" stroke-width="1.5"/>';

// The giver grips the item and holds it out, like a held prop; the receiver
// reaches toward it with an open five-finger hand. Both read at small sizes,
// unlike a flat palm or a cupped hook.
export function drawTransferHand(
  side: Side,
  style: HandStyle,
  kind: "transfer" | "receive",
): HandDrawing {
  const inward = side === "left" ? -1 : 1;
  const mirrored = side === "left" ? ' transform="scale(-1 1)"' : "";
  if (kind === "transfer") {
    const x = 62 * inward;
    return {
      back: arm(style, side, "grip"),
      front: `<g data-hand="transfer" data-side="${side}" transform="translate(${x} 20)" stroke-linejoin="round"><g${mirrored}><path data-palm="grip" d="${closedPalm}" fill="${style.skin}" stroke-width="2.6"/></g></g>`,
      // The link starts past the far edge of the item, so it never shows
      // through a thin or hollow prop such as the key.
      port: { x: x + 28 * inward, y: 12 },
      rest: { x: x + 7.5 * inward, y: 6 },
      overlay: `<g transform="translate(${x} 20)" stroke="#303341" stroke-linejoin="round" stroke-linecap="round" fill="${style.skin}"><g${mirrored}>${gripThumb}</g></g>`,
    };
  }
  const x = 58 * inward;
  return {
    back: arm(style, side, "grip"),
    front: `<g data-hand="receive" data-side="${side}" transform="translate(${x} 18)" stroke-linejoin="round"><g${mirrored}><g data-palm="open" transform="rotate(62) scale(.5)"><path d="${openPalm}" fill="${style.skin}" stroke-width="5"/><path d="M10 -12Q5 -15 1 -9" fill="none" stroke-width="3.2"/></g></g></g>`,
    // The arrow arrives just in front of the open palm.
    port: { x: x + 26 * inward, y: 12 },
  };
}
