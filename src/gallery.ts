import { examples } from "./examples";
import { renderPanelsAsync } from "./comic";
import { escapeXml } from "./assets";
import { navigation } from "./navigation";
import { createComicViewer } from "./viewer";
import "./style.css";

document.querySelector("#app")!.innerHTML =
  `${navigation}<main><section class="intro"><span class="eyebrow">LEARN BY EXAMPLE</span><h1>작은 대화로 보는<br>${examples.length}가지 가능성.</h1><p>실제 렌더러로 만든 만화입니다.<br>크게 보거나 플레이그라운드에서 직접 바꿔보세요.</p></section><div class="gallery-grid">${examples.map((example) => `<article class="gallery-card" id="${example.id}"><span class="eyebrow">${escapeXml(example.category)}</span><h2>${escapeXml(example.title)}</h2><p>${escapeXml(example.description)}</p><ul class="tags">${example.features.map((feature) => `<li>${escapeXml(feature)}</li>`).join("")}</ul><div class="gallery-preview" role="region" aria-label="${escapeXml(example.title)} 만화" tabindex="0"></div><div class="gallery-actions"><button type="button" data-gallery-open="${example.id}" disabled>크게 보기</button><a class="primary-link" href="./?example=${example.id}#workspace">플레이그라운드에서 수정 →</a></div><details><summary>작성 코드 열기</summary><pre><code>${escapeXml(example.source)}</code></pre></details>${example.id === "long-text" ? '<p><a class="text-link" href="./embed.html">문서 안에 넣은 실제 예제 보기 →</a></p>' : ""}</article>`).join("")}</div></main>`;

const viewer = createComicViewer();
window.addEventListener("pagehide", (event) => {
  if (!event.persisted) viewer.destroy();
});

await document.fonts.ready;
await Promise.all(
  examples.map(async (example) => {
    const container = document.querySelector(
      `#${example.id} .gallery-preview`,
    )!;
    container.textContent = "만화를 그리는 중…";
    const result = await renderPanelsAsync(example.source, {
      width: 480,
      panelFormat: "compact",
    });
    if (!container.isConnected) return;
    if (result.diagnostics.length) {
      container.setAttribute("role", "alert");
      container.textContent = result.diagnostics.join("\n");
    } else {
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
        controls.className = "gallery-cut-nav";
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
      }
      const trigger = document.querySelector<HTMLButtonElement>(
        `[data-gallery-open="${example.id}"]`,
      )!;
      trigger.disabled = false;
      trigger.textContent = `크게 보기 · ${cuts.length}컷`;
      trigger.onclick = () => viewer.open(result, { trigger });
    }
  }),
);
