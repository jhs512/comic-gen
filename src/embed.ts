import { createRenderer, type PanelsResult, type RenderOptions } from "./comic";
import { embedStyles } from "./embed-styles";
import { createComicViewer } from "./viewer";

interface ComicCard {
  figure: HTMLElement;
  button: HTMLButtonElement;
  thumbnail: HTMLElement;
  title: HTMLElement;
  caption: HTMLElement;
  result?: PanelsResult;
}
const cards = new WeakMap<HTMLElement, ComicCard>();
const documentRenderer = createRenderer();
const revisions = new WeakMap<HTMLElement, number>();
const viewer = createComicViewer();
let activeCard: ComicCard | undefined;

function openViewer(card: ComicCard) {
  if (!card.result?.svg) return;
  activeCard = card;
  viewer.open(card.result, { trigger: card.button });
}

function getBlocks(root: ParentNode) {
  if (!document.getElementById("comic-gen-embed-styles")) {
    const style = document.createElement("style");
    style.id = "comic-gen-embed-styles";
    style.textContent = embedStyles;
    document.head.append(style);
  }
  const selector =
    'pre[language="comic-gen"], pre[data-comic], pre:has(code.language-comic), pre:has(code.language-comic-gen)';
  const blocks = [...root.querySelectorAll<HTMLElement>(selector)];
  if (root instanceof HTMLElement && root.matches(selector))
    blocks.unshift(root);
  return blocks;
}

function blockSource(block: HTMLElement) {
  return (block.querySelector("code") ?? block).textContent ?? "";
}

function getCard(block: HTMLElement) {
  let card = cards.get(block);
  if (!card) {
    const figure = document.createElement("figure");
    figure.className = "comic-figure";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "comic-card";
    button.setAttribute("aria-haspopup", "dialog");
    const thumbnail = document.createElement("span");
    thumbnail.className = "comic-card-thumbnail";
    thumbnail.setAttribute("aria-hidden", "true");
    const copy = document.createElement("span");
    copy.className = "comic-card-copy";
    const title = document.createElement("strong");
    const caption = document.createElement("span");
    copy.append(title, caption);
    button.append(thumbnail, copy);
    card = { figure, button, thumbnail, title, caption };
    const entry = card;
    button.addEventListener("click", () => openViewer(entry));
    cards.set(block, card);
  }
  block.after(card.figure);
  block.hidden = true;
  return card;
}

function showResult(card: ComicCard, result: PanelsResult) {
  card.result = result;
  card.figure.removeAttribute("aria-busy");
  card.button.disabled = false;
  if (result.svg) {
    const svg = new DOMParser().parseFromString(result.svg, "image/svg+xml");
    card.title.textContent = svg.documentElement.getAttribute("aria-label");
    card.caption.textContent = `${result.panels.length}컷 · 만화 읽기 ↗`;
    card.button.setAttribute(
      "aria-label",
      `${card.title.textContent} · 만화 읽기`,
    );
    card.thumbnail.innerHTML = result.panels[0].svg;
    card.figure.replaceChildren(card.button);
    if (activeCard === card && viewer.isOpen) openViewer(card);
  } else {
    if (activeCard === card) viewer.close();
    const message = document.createElement("p");
    message.setAttribute("role", "alert");
    message.textContent = result.diagnostics.join("\n");
    card.figure.replaceChildren(message);
  }
}

function nextRevision(block: HTMLElement) {
  const revision = (revisions.get(block) ?? 0) + 1;
  revisions.set(block, revision);
  return revision;
}

/** Synchronously render ordinary comics. Diagrams require renderCodeBlocksAsync. */
export function renderCodeBlocks(
  root: ParentNode = document,
  options: RenderOptions = {},
) {
  return getBlocks(root).map((block) => {
    nextRevision(block);
    const result = documentRenderer.render(blockSource(block), options);
    showResult(getCard(block), result);
    return result;
  });
}

/** Render cards after optional Mermaid diagrams finish loading and drawing. */
export async function renderCodeBlocksAsync(
  root: ParentNode = document,
  options: RenderOptions = {},
) {
  return Promise.all(
    getBlocks(root).map(async (block) => {
      const source = blockSource(block);
      const revision = nextRevision(block);
      const wasConnected = block.isConnected;
      const card = getCard(block);
      card.figure.setAttribute("aria-busy", "true");
      card.button.disabled = true;
      if (!card.result) {
        const status = document.createElement("p");
        status.setAttribute("role", "status");
        status.textContent = "만화를 그리는 중…";
        card.figure.replaceChildren(status);
      }
      const result = await documentRenderer.renderAsync(source, options);
      if (revisions.get(block) !== revision) return result;
      if (wasConnected && !block.isConnected) {
        card.figure.remove();
        if (activeCard === card) viewer.close();
        return result;
      }
      if (blockSource(block) !== source) {
        card.figure.removeAttribute("aria-busy");
        card.result = undefined;
        if (activeCard === card) viewer.close();
        const status = document.createElement("p");
        status.setAttribute("role", "status");
        status.textContent = "코드가 바뀌었어요. 다시 그리기를 호출하세요.";
        card.figure.replaceChildren(status);
        return result;
      }
      showResult(card, result);
      return result;
    }),
  );
}
