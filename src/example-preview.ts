import { renderPanelsAsync } from "./comic";
import { createComicViewer } from "./viewer";
import type { Example } from "./examples";

/** One reader per page; the guide and gallery share the same cut controls. */
export function createExampleReader() {
  const viewer = createComicViewer();
  const cleanups: (() => void)[] = [];
  let destroyed = false;
  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    cleanups.forEach((cleanup) => cleanup());
    viewer.destroy();
    window.removeEventListener("pagehide", onPageHide);
  };
  const onPageHide = (event: PageTransitionEvent) => {
    if (!event.persisted) destroy();
  };
  window.addEventListener("pagehide", onPageHide);

  return {
    destroy,
    async mount(
      container: HTMLElement,
      trigger: HTMLButtonElement,
      example: Pick<Example, "title" | "source">,
    ) {
      container.textContent = "만화를 그리는 중…";
      const result = await renderPanelsAsync(example.source, {
        width: 480,
        panelFormat: "compact",
      });
      if (destroyed || !container.isConnected) return;
      if (result.diagnostics.length) {
        container.setAttribute("role", "alert");
        container.textContent = result.diagnostics.join("\n");
        return;
      }
      container.innerHTML = result.panels.map((panel) => panel.svg).join("");
      const cuts = [
        ...container.querySelectorAll<SVGSVGElement>(":scope > svg"),
      ];
      let current = 0;
      const show = () =>
        cuts.forEach((cut, index) =>
          cut.toggleAttribute("hidden", index !== current),
        );
      show();
      if (cuts.length > 1) {
        const controls = document.createElement("nav");
        controls.className = "gallery-cut-nav example-cut-nav";
        controls.setAttribute("aria-label", `${example.title} 컷 이동`);
        controls.innerHTML =
          '<button type="button" aria-label="이전 컷">←</button><span aria-live="polite"></span><button type="button" aria-label="다음 컷">→</button>';
        const [previous, next] = [...controls.querySelectorAll("button")];
        const update = () => {
          show();
          controls.querySelector("span")!.textContent =
            `${current + 1} / ${cuts.length}`;
          previous.disabled = current === 0;
          next.disabled = current === cuts.length - 1;
        };
        previous.onclick = () => {
          current--;
          update();
        };
        next.onclick = () => {
          current++;
          update();
        };
        container.after(controls);
        update();
        cleanups.push(() => {
          previous.onclick = null;
          next.onclick = null;
        });
      }
      trigger.disabled = false;
      trigger.textContent = `크게 보기 · ${cuts.length}컷`;
      trigger.onclick = () => viewer.open(result, { trigger });
      cleanups.push(() => {
        trigger.onclick = null;
      });
    },
  };
}
