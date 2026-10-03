// Compatibility entry keeps every existing renderer and document-embedding export.
export * from "./renderer";
export { renderCodeBlocks, renderCodeBlocksAsync } from "./embed";
export { renderCodeBlocks as 코드블록그리기 } from "./embed";
export { renderCodeBlocksAsync as 코드블록그리기비동기 } from "./embed";
export { createComicViewer, mountComicCard } from "./viewer";
export type {
  ComicViewer,
  ComicViewerOptions,
  ComicViewerState,
  ComicViewerResult,
  ComicViewerPanel,
} from "./viewer";
export {
  createComicViewer as 만화뷰어만들기,
  mountComicCard as 만화카드붙이기,
} from "./viewer";
