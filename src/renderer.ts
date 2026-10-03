// Renderer-only entry: no cards, viewer UI, or stylesheet dependencies.
export {
  renderComic,
  renderPanels,
  renderComicAsync,
  renderPanelsAsync,
  createRenderer,
  renderComic as 만화그리기,
  renderPanels as 컷그리기,
  createRenderer as 렌더러만들기,
  renderComicAsync as 만화그리기비동기,
  renderPanelsAsync as 컷그리기비동기,
} from "./comic";
export type {
  RenderOptions,
  RenderResult,
  PanelResult,
  PanelsResult,
} from "./comic";
export { exportPng, downloadBlob } from "./export";
export { assetVersion } from "./assets";
export { syntaxFields as 문법항목, syntaxValues as 문법값 } from "./syntax";
