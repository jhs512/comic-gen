export { renderComic, renderPanels, createRenderer } from "./comic";
export type {
  RenderOptions,
  RenderResult,
  PanelResult,
  PanelsResult,
} from "./comic";
export { renderCodeBlocks } from "./embed";
export { exportPng, downloadBlob } from "./export";
export { assetVersion } from "./assets";
// Korean authoring names; existing English developer imports remain compatible.
export {
  renderComic as 만화그리기,
  renderPanels as 컷그리기,
  createRenderer as 렌더러만들기,
} from "./comic";
export { renderCodeBlocks as 코드블록그리기 } from "./embed";
export { syntaxFields as 문법항목, syntaxValues as 문법값 } from "./syntax";
