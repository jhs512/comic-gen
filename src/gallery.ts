import { examples } from "./examples";
import { escapeXml } from "./assets";
import { navigation } from "./navigation";
import { createExampleReader } from "./example-preview";
import "./style.css";

const storyLinks = [
  "welcome",
  "question-answer",
  "handoff",
  "listening",
  "reading-order",
]
  .map((id) => examples.find((example) => example.id === id)!)
  .map(
    (example) => `<a href="#${example.id}">${escapeXml(example.title)} →</a>`,
  )
  .join("");

document.querySelector("#app")!.innerHTML =
  `${navigation}<main><section class="intro"><span class="eyebrow">LEARN BY EXAMPLE</span><h1>작은 대화로 보는<br>${examples.length}가지 가능성.</h1><p>실제 렌더러로 만든 만화입니다.<br>크게 보거나 플레이그라운드에서 직접 바꿔보세요.</p></section><nav class="gallery-story-links" aria-label="상황별 대화 예제">${storyLinks}</nav><div class="gallery-grid">${examples.map((example) => `<article class="gallery-card" id="${example.id}"><span class="eyebrow">${escapeXml(example.category)}</span><h2>${escapeXml(example.title)}</h2><p>${escapeXml(example.description)}</p><ul class="tags">${example.features.map((feature) => `<li>${escapeXml(feature)}</li>`).join("")}</ul><div class="gallery-preview" role="region" aria-label="${escapeXml(example.title)} 만화" tabindex="0"></div><div class="gallery-actions"><button type="button" data-gallery-open="${example.id}" disabled>크게 보기</button><a class="primary-link" href="./?example=${example.id}#workspace">플레이그라운드에서 수정 →</a></div><details><summary>작성 코드 열기</summary><pre><code>${escapeXml(example.source)}</code></pre></details>${example.id === "long-text" ? '<p><a class="text-link" href="./embed.html">문서 안에 넣은 실제 예제 보기 →</a></p>' : ""}</article>`).join("")}</div></main>`;

const reader = createExampleReader();

await document.fonts.ready;
await Promise.all(
  examples.map(async (example) => {
    const container = document.querySelector<HTMLElement>(
      `#${example.id} .gallery-preview`,
    )!;
    const trigger = document.querySelector<HTMLButtonElement>(
      `[data-gallery-open="${example.id}"]`,
    )!;
    await reader.mount(container, trigger, example);
  }),
);
