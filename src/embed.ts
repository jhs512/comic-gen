import { createRenderer, type RenderOptions } from "./comic";
import { disposeViewer, mountViewer, styles } from "./viewer";

const figures = new WeakMap<HTMLElement, HTMLElement>();
const documentRenderer = createRenderer();

/** Connect code blocks marked data-comic to the browser renderer. Safe to call again after edits. */
export function renderCodeBlocks(
  root: ParentNode = document,
  options: RenderOptions = {},
) {
  styles();
  const results = [];
  for (const block of root.querySelectorAll<HTMLElement>(
    'pre[language="comic-gen"], pre[data-comic], pre:has(code.language-comic), pre:has(code.language-comic-gen)',
  )) {
    const source = (block.querySelector("code") ?? block).textContent ?? "";
    const result = documentRenderer.renderPanels(source, options);
    let figure = figures.get(block);
    if (!figure) {
      figure = document.createElement("figure");
      figure.className = "comic-figure";
      block.after(figure);
      figures.set(block, figure);
    }
    disposeViewer(figure);
    if (result.svg && block.hasAttribute("viewer")) {
      mountViewer(figure, result, source);
      block.hidden = true;
    } else if (result.svg) {
      figure.innerHTML = result.panels.map((panel) => panel.svg).join("");
      block.hidden = true;
    } else {
      figure.replaceChildren();
      const message = document.createElement("p");
      message.setAttribute("role", "alert");
      message.textContent = result.diagnostics.join("\n");
      figure.append(message);
      block.hidden = false;
    }
    results.push(result);
  }
  return results;
}
