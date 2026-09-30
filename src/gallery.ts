import { examples } from "./examples";
import { renderPanels } from "./comic";
import { escapeXml } from "./assets";
import { navigation } from "./navigation";
import "./style.css";

document.querySelector("#app")!.innerHTML =
  `${navigation}<main><section class="intro"><span class="eyebrow">LEARN BY EXAMPLE</span><h1>작은 대화로 보는<br>열세 가지 가능성.</h1><p>실제 렌더러로 만든 만화입니다.<br>코드를 열거나 플레이그라운드에서 직접 바꿔보세요.</p></section><div class="gallery-grid">${examples.map((example) => `<article class="gallery-card" id="${example.id}"><span class="eyebrow">${escapeXml(example.category)}</span><h2>${escapeXml(example.title)}</h2><p>${escapeXml(example.description)}</p><ul class="tags">${example.features.map((feature) => `<li>${escapeXml(feature)}</li>`).join("")}</ul><div class="gallery-preview" role="region" aria-label="${escapeXml(example.title)} 만화" tabindex="0"></div><a class="primary-link" href="./?example=${example.id}#workspace">플레이그라운드에서 수정 →</a><details><summary>작성 코드 열기</summary><pre><code>${escapeXml(example.source)}</code></pre></details>${example.id === "long-text" ? '<p><a class="text-link" href="./embed.html">문서 안에 넣은 실제 예제 보기 →</a></p>' : ""}</article>`).join("")}</div></main>`;

await document.fonts.ready;
for (const example of examples) {
  const container = document.querySelector(`#${example.id} .gallery-preview`)!;
  const result = renderPanels(example.source);
  if (result.diagnostics.length) {
    container.setAttribute("role", "alert");
    container.textContent = result.diagnostics.join("\n");
  } else container.innerHTML = result.panels.map((panel) => panel.svg).join("");
}
