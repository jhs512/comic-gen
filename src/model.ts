/** Authoring guidance for a character; the renderer never generates dialogue. */
export interface Persona {
  role?: string;
  personality?: string;
  speechStyle?: string;
}
export interface HumanAppearance {
  skinColor: string;
  hairStyle: "short" | "bob" | "long" | "bald";
  hairColor: string;
  outfit: "shirt" | "jacket" | "hoodie";
  outfitColor: string;
  glasses: boolean;
}
export interface CastMember {
  asset: string;
  label: string;
  appearance?: HumanAppearance;
  persona?: Persona;
}
export interface Placement {
  x?: number;
  y?: number;
}
export interface Actor extends Placement {
  id: string;
  expression: string;
  gesture?: string;
  holding?: string;
  scale: number;
}
export interface Dialogue extends Placement {
  from: string;
  to?: string;
  text: string;
  fontSize: number;
}
export interface Transfer {
  from: string;
  to: string;
  prop: string;
}
export interface Diagram {
  type: "mermaid";
  source: string;
  title: string;
  height?: number;
}
export interface Panel {
  actors: Actor[];
  dialogue: Dialogue[];
  transfer: Transfer[];
  diagram?: Diagram;
}
export interface Comic {
  title: string;
  cast: Record<string, CastMember>;
  panels: Panel[];
  personas?: Record<string, Persona>;
}
