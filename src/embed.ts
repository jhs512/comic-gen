import { createRenderer, type PanelsResult, type RenderOptions } from "./comic";
import { embedStyles } from "./embed-styles";

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
let viewer: HTMLDialogElement | undefined;
let artwork: HTMLElement;
let viewerTitle: HTMLElement;
let zoom: HTMLSelectElement;
let preventOverflow: HTMLInputElement;
let viewport: HTMLElement;
let activeCard: ComicCard | undefined;
let previousOverflow = "";

function updateViewerSize() {
  if (!activeCard?.result || !viewer?.open) return;
  let width = activeCard.result.width * Number(zoom.value);
  viewport.dataset.preventOverflow = String(preventOverflow.checked);
  if (preventOverflow.checked) {
    const style = getComputedStyle(viewport);
    const availableWidth = Math.max(
      0,
      viewport.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight),
    );
    const availableHeight = Math.max(
      0,
      viewport.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom),
    );
    width = Math.min(
      width,
      availableWidth,
      (availableHeight * activeCard.result.width) / activeCard.result.height,
    );
    viewport.scrollTo(0, 0);
  }
  artwork.style.width = `${width}px`;
}

function updateViewer(card: ComicCard) {
  if (!card.result) return;
  viewerTitle.textContent = card.title.textContent;
  artwork.innerHTML = card.result.svg;
  zoom.value = "1";
  preventOverflow.checked = true;
  viewport.scrollTo(0, 0);
  updateViewerSize();
}

function openViewer(card: ComicCard) {
  if (!card.result?.svg) return;
  if (!viewer) {
    viewer = document.createElement("dialog");
    viewer.className = "comic-viewer";
    viewer.setAttribute("aria-labelledby", "comic-viewer-title");
    viewer.setAttribute("aria-describedby", "comic-viewer-help");
    viewer.innerHTML = `<div class="comic-viewer-toolbar"><h2 class="comic-viewer-title" id="comic-viewer-title"></h2><button type="button" autofocus>닫기</button><div class="comic-viewer-controls"><label class="comic-viewer-checkbox"><input type="checkbox" checked>화면 넘침 방지</label><label>보기 크기 <select><option value="1">100%</option><option value="1.5">150%</option><option value="2">200%</option></select></label></div></div><p class="comic-viewer-help" id="comic-viewer-help">화면 넘침 방지를 켜면 만화를 가로·세로 화면 안에 맞춥니다. 끄면 선택한 보기 크기로 스크롤해 읽을 수 있습니다.</p><div class="comic-viewer-viewport" tabindex="0" role="region" aria-label="만화 읽기 영역"><div class="comic-viewer-artwork"></div></div>`;
    viewerTitle = viewer.querySelector("h2")!;
    artwork = viewer.querySelector(".comic-viewer-artwork")!;
    viewport = viewer.querySelector(".comic-viewer-viewport")!;
    zoom = viewer.querySelector("select")!;
    preventOverflow = viewer.querySelector('input[type="checkbox"]')!;
    zoom.addEventListener("change", updateViewerSize);
    preventOverflow.addEventListener("change", updateViewerSize);
    viewer
      .querySelector("button")!
      .addEventListener("click", () => viewer!.close());
    viewer.addEventListener("close", () => {
      document.body.style.overflow = previousOverflow;
      artwork.replaceChildren();
      activeCard?.button.focus();
      activeCard = undefined;
    });
    document.body.append(viewer);
    new ResizeObserver(updateViewerSize).observe(viewport);
  }
  activeCard = card;
  updateViewer(card);
  if (!viewer.open) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    viewer.showModal();
  }
  updateViewerSize();
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
    if (activeCard === card) updateViewer(card);
  } else {
    if (activeCard === card) viewer?.close();
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
        if (activeCard === card) viewer?.close();
        return result;
      }
      if (blockSource(block) !== source) {
        card.figure.removeAttribute("aria-busy");
        card.result = undefined;
        if (activeCard === card) viewer?.close();
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
