/*! Comic Gen browser SDK v0.7.1
*/
const i = "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs";
try {
  const e = (await import(/* webpackIgnore: true */
    /* @vite-ignore */
    /* webpackIgnore: true */
    i
  )).default;
  if (typeof e?.initialize != "function" || typeof e?.render != "function")
    throw new Error("Mermaid 모듈을 불러오지 못했습니다.");
  Object.defineProperty(window, "__comicGenMermaid", { value: e }), window.dispatchEvent(new Event("comic-gen-mermaid-ready"));
} catch {
  window.dispatchEvent(new Event("comic-gen-mermaid-error"));
}
