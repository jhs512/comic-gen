import type { PanelsResult } from "./comic";

const disposers = new WeakMap<HTMLElement, () => void>();
let closeActive: (() => void) | undefined;
export function styles() {
  if (document.getElementById("comic-gen-viewer-style")) return;
  const style = document.createElement("style");
  style.id = "comic-gen-viewer-style";
  style.textContent = `.comic-figure{margin:1rem 0;max-width:100%;color:#303341}.comic-figure svg{display:block;width:100%;height:auto}.cg-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px;overscroll-behavior-x:contain}.cg-slide{flex:0 0 min(85%,480px);scroll-snap-align:center;padding:0;border:0;background:transparent;cursor:pointer}.cg-controls{display:flex;align-items:center;justify-content:center;gap:12px;padding:12px}.cg-controls button,.cg-overlay button{padding:10px 16px;min-height:44px;border-radius:8px;border:1px solid #aab1bf;background:white;color:#303341;cursor:pointer}.cg-overlay{position:fixed;inset:0;z-index:2147483647;background:#161b26;color:white;display:grid;grid-template-rows:auto minmax(0,1fr) auto;padding:env(safe-area-inset-top) 8px env(safe-area-inset-bottom);box-sizing:border-box}.cg-overlay header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:8px}.cg-overlay .cg-stage{display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden}.cg-overlay .cg-stage svg{width:100%;height:100%;max-height:100%;object-fit:contain}.cg-code{white-space:pre-wrap;overflow-wrap:anywhere}.cg-slide:focus-visible{outline:3px solid #7562d4;outline-offset:-3px}`;
  document.head.append(style);
}

export function disposeViewer(figure: HTMLElement) {
  disposers.get(figure)?.();
  disposers.delete(figure);
}

export function mountViewer(figure: HTMLElement, result: PanelsResult, source: string) {
  styles();
  figure.replaceChildren();
  const track = document.createElement("div");
  track.className = "cg-track";
  track.setAttribute("aria-label", "만화 컷 목록");
  const slides = result.panels.map((panel, index) => {
    const slide = document.createElement("button");
    slide.type = "button";
    slide.className = "cg-slide";
    slide.setAttribute("aria-label", `${index + 1}번 컷 크게 보기`);
    slide.innerHTML = panel.svg;
    track.append(slide);
    return slide;
  });
  let current = 0;
  let overlay: HTMLDivElement | undefined;
  let oldFocus: HTMLElement | null = null;
  let oldOverflow = "";
  let oldPadding = "";
  let background: [HTMLElement, boolean][] = [];
  const count = document.createElement("span");
  count.setAttribute("aria-live", "polite");
  const controls = document.createElement("div");
  controls.className = "cg-controls";
  const button = (label: string, click: () => void) => {
    const node = document.createElement("button");
    node.type = "button"; node.textContent = label; node.addEventListener("click", click); return node;
  };
  const show = (index: number, scroll = true) => {
    current = Math.max(0, Math.min(slides.length - 1, index));
    count.textContent = `${current + 1} / ${slides.length}`;
    previous.disabled = current === 0; next.disabled = current === slides.length - 1;
    if (overlay) {
      overlay.querySelector(".cg-stage")!.innerHTML = result.panels[current].svg;
      overlay.querySelector(".cg-position")!.textContent = count.textContent;
      (overlay.querySelector("[data-prev]") as HTMLButtonElement).disabled = current === 0;
      (overlay.querySelector("[data-next]") as HTMLButtonElement).disabled = current === slides.length - 1;
    } else if (scroll) track.scrollTo({left: slides[current].offsetLeft - track.offsetLeft, behavior: "smooth"});
  };
  const close = () => {
    if (!overlay) return;
    overlay.remove(); overlay = undefined;
    document.removeEventListener("keydown", keydown);
    document.body.style.overflow = oldOverflow;
    document.body.style.paddingRight = oldPadding;
    background.forEach(([element, inert]) => element.inert = inert);
    background = [];
    if (closeActive === close) closeActive = undefined;
    oldFocus?.focus({preventScroll: true});
  };
  const keydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") { event.preventDefault(); close(); }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {event.preventDefault();show(current + (event.key === "ArrowLeft" ? -1 : 1));}
    if (event.key === "Tab" && overlay) {
      const buttons = Array.from(overlay.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    }
  };
  const open = (index: number) => {
    closeActive?.();
    oldFocus = document.activeElement as HTMLElement;
    oldOverflow = document.body.style.overflow; oldPadding = document.body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    overlay = document.createElement("div");
    overlay.className = "cg-overlay"; overlay.setAttribute("role", "dialog"); overlay.setAttribute("aria-modal", "true"); overlay.setAttribute("aria-label", "만화 전체 화면 보기"); overlay.tabIndex = -1;
    const header = document.createElement("header");
    const position = document.createElement("span"); position.className = "cg-position";
    const exit = button("닫기", close); header.append(position, exit);
    const stage = document.createElement("div"); stage.className = "cg-stage";
    const footer = document.createElement("div"); footer.className = "cg-controls";
    const prev = button("이전 컷", () => show(current - 1)); prev.dataset.prev = "";
    const next = button("다음 컷", () => show(current + 1)); next.dataset.next = "";
    footer.append(prev, next); overlay.append(header, stage, footer);
    let startX = 0, startY = 0;
    stage.addEventListener("touchstart", (event) => {startX = event.changedTouches[0].clientX;startY = event.changedTouches[0].clientY;}, {passive: true});
    stage.addEventListener("touchend", (event) => {const dx = event.changedTouches[0].clientX-startX, dy = event.changedTouches[0].clientY-startY;if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)) show(current + (dx<0?1:-1));}, {passive: true});
    background = Array.from(document.body.children).filter((node): node is HTMLElement => node instanceof HTMLElement).map((node) => [node, node.inert]);
    background.forEach(([node]) => node.inert = true);
    document.body.append(overlay); closeActive = close;
    document.addEventListener("keydown", keydown);
    show(index); exit.focus();
  };
  const previous = button("이전 컷", () => show(current - 1));
  const next = button("다음 컷", () => show(current + 1));
  const expand = button("크게 보기", () => open(current));
  controls.append(previous, count, next, expand);
  slides.forEach((slide, index) => slide.addEventListener("click", () => {if(window.matchMedia("(max-width: 700px)").matches) open(index);else show(index);}));
  track.addEventListener("scroll", () => {if(overlay)return;const middle = track.scrollLeft + track.clientWidth/2;let nearest=0, distance=Infinity;slides.forEach((slide,index)=>{const delta=Math.abs(slide.offsetLeft-track.offsetLeft+slide.clientWidth/2-middle);if(delta<distance){nearest=index;distance=delta;}});show(nearest,false);}, {passive:true});
  track.addEventListener("keydown", (event) => {if(event.key==="ArrowRight"||event.key==="ArrowLeft"){event.preventDefault();show(current+(event.key==="ArrowRight"?1:-1));slides[current].focus({preventScroll:true});}});
  const details = document.createElement("details");
  const summary = document.createElement("summary"); summary.textContent = "원문 코드 보기";
  const code = document.createElement("pre"); code.className = "cg-code"; code.textContent = source;
  details.append(summary, code); figure.append(track, controls, details); show(0,false);
  disposers.set(figure, close);
}
