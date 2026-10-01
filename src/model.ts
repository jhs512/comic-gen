export interface CastMember {
  asset: string;
  label: string;
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
}
