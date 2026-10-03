export * from "./index";
import { renderCodeBlocks } from "./embed";
const key = Symbol.for("comic-gen.auto-init");
const registry = window as unknown as Record<symbol, unknown>;
if (!registry[key]) {
  registry[key] = true;
  const seen = new WeakSet<Element>();
  const scan = () => {
    for (const block of document.querySelectorAll('pre[language="comic-gen"]')) {
      if (seen.has(block)) continue;
      seen.add(block);
      // ParentNode API includes only descendants; this wrapper selects exactly one block.
      renderCodeBlocks({querySelectorAll: () => [block]} as unknown as ParentNode);
    }
  };
  const start = async () => {
    await document.fonts.ready;
    scan();
    new MutationObserver(scan).observe(document.body, {childList: true, subtree: true});
  };
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else void start();
}
