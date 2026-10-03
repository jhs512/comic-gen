// This entry executes only in the private diagram-rendering iframe. Its own
// global realm keeps bundled UMD dependencies away from a host AMD loader.
const moduleUrl =
  "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs";
try {
  const module = await import(
    /* @vite-ignore */ /* webpackIgnore: true */ moduleUrl
  );
  const api = module.default;
  if (
    typeof api?.initialize !== "function" ||
    typeof api?.render !== "function"
  )
    throw new Error("Mermaid 모듈을 불러오지 못했습니다.");
  Object.defineProperty(window, "__comicGenMermaid", { value: api });
  window.dispatchEvent(new Event("comic-gen-mermaid-ready"));
} catch {
  window.dispatchEvent(new Event("comic-gen-mermaid-error"));
}

export {};
