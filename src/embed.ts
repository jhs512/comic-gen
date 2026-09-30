import { createRenderer, type RenderOptions } from "./comic";

const figures = new WeakMap<HTMLElement, HTMLElement>();
const documentRenderer = createRenderer();

/** Connect code blocks marked data-comic to the browser renderer. Safe to call again after edits. */
export function renderCodeBlocks(
  root: ParentNode = document,
  options: RenderOptions = {},
) {
  const results = [];
  for (const block of root.querySelectorAll<HTMLElement>(
    "pre[data-comic], pre:has(code.language-comic)",
  )) {
    const source = (block.querySelector("code") ?? block).textContent ?? "";
    const result = documentRenderer.render(source, options);
    let figure = figures.get(block);
    if (!figure) {
      figure = document.createElement("figure");
      figure.className = "comic-figure";
      block.after(figure);
      figures.set(block, figure);
    }
    if (result.svg) {
      figure.innerHTML = result.svg;
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
