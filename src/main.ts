import { renderPanels, type PanelsResult } from "./comic";
import { characters, expressions, gestures, props } from "./assets";
import { examples, findExample } from "./examples";
import { navigation } from "./navigation";
import { escapeXml } from "./assets";
import { downloadBlob, exportPng } from "./export";
import "./style.css";

document.querySelector("#app")!.innerHTML = `
  ${navigation}
  <main><section class="intro"><span class="eyebrow">CODE → COMIC</span><h1>복잡한 개념을,<br>작은 대화로.</h1><p>준비된 캐릭터에 표정과 대사를 더하세요.<br>브라우저에서 그리고 이미지로 저장합니다.</p></section>
  <div class="workspace"><section class="editor"><div class="panel-heading"><h2>01 / 작성</h2><button id="reset">예제 복원</button></div><label for="source">만화 코드</label><textarea id="source" spellcheck="false"></textarea><details><summary>문법과 에셋 보기</summary><p>cast에서 인물을 정의하고 panels에 등장인물과 대사를 적습니다. from은 화자, to는 대화 상대입니다.</p><p>캐릭터: ${Object.keys(characters).join(", ")}</p><p>표정: ${Object.keys(expressions).join(", ")}</p></details><div id="diagnostics" role="alert"></div></section>
    <section class="output"><div class="panel-heading"><h2>02 / 미리보기</h2><div class="export-controls"><button id="svg">SVG 저장</button><button id="png">PNG 저장</button></div></div><div class="options"><label>만화 너비 <select id="width"><option value="720">720 px</option><option value="960">960 px</option><option value="480">480 px</option></select></label><label>PNG 배율 <select id="scale"><option value="1">1×</option><option value="2">2×</option><option value="3">3×</option></select></label></div><div id="preview" aria-live="polite"></div><p class="caption">서버 렌더링 없이 · SVG 원본 · 반복 사용하는 캐릭터</p></section></div></main>`;
const source = document.querySelector<HTMLTextAreaElement>("#source")!;
document.querySelector(".workspace")!.id = "workspace";
document
  .querySelector(".workspace")!
  .insertAdjacentHTML(
    "beforebegin",
    '<ol class="steps"><li>예제를 고르세요.</li><li>대사나 표정을 수정하세요.</li><li>그림을 확인하고 SVG·PNG로 저장하세요.</li></ol><p><a class="text-link" href="./gallery.html">13가지 활용 예제 둘러보기 →</a> · <a class="text-link" href="./guide.html">처음부터 배우는 작성 문법 →</a></p>',
  );
source.setAttribute("aria-describedby", "example-description");
source.insertAdjacentHTML(
  "beforebegin",
  `<label>시작 예제 <select id="example">${examples.map((example) => `<option value="${example.id}">${escapeXml(example.title)}</option>`).join("")}</select></label><p id="example-description" class="help"></p>`,
);
const preview = document.querySelector<HTMLDivElement>("#preview")!;
preview.insertAdjacentHTML(
  "afterend",
  '<p id="cache-status" class="caption" role="status"></p>',
);
const diagnostics = document.querySelector<HTMLDivElement>("#diagnostics")!;
const svgButton = document.querySelector<HTMLButtonElement>("#svg")!;
const pngButton = document.querySelector<HTMLButtonElement>("#png")!;
const widthInput = document.querySelector<HTMLSelectElement>("#width")!;
document
  .querySelector(".options")!
  .insertAdjacentHTML(
    "beforeend",
    '<label>컷 비율 <select id="format"><option value="phone">스마트폰 · 세로 2배</option><option value="compact">기존 비율</option></select></label>',
  );
document.querySelector("#format")!.addEventListener("change", update);
document.querySelector(".output .caption")!.textContent =
  "컷 아래에서 각각 저장하세요. 상단 저장 버튼은 전체 만화를 한 파일로 저장합니다.";
let current: PanelsResult;
function update() {
  current = renderPanels(source.value, {
    width: Number(widthInput.value),
    panelFormat:
      document.querySelector<HTMLSelectElement>("#format")!.value === "compact"
        ? "compact"
        : "phone",
  });
  preview.innerHTML = current.panels
    .map(
      (panel) =>
        `<section class="panel-preview">${panel.svg}<div class="panel-downloads"><span>${panel.index + 1}컷</span><button data-download="svg" data-index="${panel.index}">이 컷 SVG 받기</button><button data-download="png" data-index="${panel.index}">이 컷 PNG 받기</button></div></section>`,
    )
    .join("");
  diagnostics.textContent = current.diagnostics.join("\n");
  document.querySelector("#cache-status")!.textContent = current.cache
    ? `재사용 ${current.cache.hits} · 새로 그린 컷 ${current.cache.misses}`
    : "";
  svgButton.disabled = !current.svg;
  pngButton.disabled = !current.svg;
}
const exampleInput = document.querySelector<HTMLSelectElement>("#example")!;
let selectedExample = findExample(
  new URLSearchParams(location.search).get("example"),
);
function loadExample() {
  exampleInput.value = selectedExample.id;
  source.value = selectedExample.source;
  document.querySelector("#example-description")!.textContent =
    selectedExample.description;
}
loadExample();
let editTimer: ReturnType<typeof setTimeout>;
source.addEventListener("input", () => {
  clearTimeout(editTimer);
  svgButton.disabled = true;
  pngButton.disabled = true;
  preview.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
    button.disabled = true;
  });
  editTimer = setTimeout(update, 120);
});
widthInput.addEventListener("change", update);
preview.addEventListener("click", async (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>(
    "button[data-download]",
  );
  if (!button) return;
  const panel = current.panels[Number(button.dataset.index)];
  if (!panel) return;
  button.disabled = true;
  try {
    const format = button.dataset.download;
    const blob =
      format === "svg"
        ? new Blob([panel.svg], { type: "image/svg+xml;charset=utf-8" })
        : await exportPng(
            panel,
            Number(document.querySelector<HTMLSelectElement>("#scale")!.value),
          );
    downloadBlob(blob, `comic-panel-${panel.index + 1}.${format}`);
  } catch (error) {
    diagnostics.textContent =
      error instanceof Error ? error.message : "컷 저장 실패";
  } finally {
    button.disabled = false;
  }
});
document.querySelector("#reset")!.addEventListener("click", () => {
  clearTimeout(editTimer);
  loadExample();
  update();
});
document
  .querySelector<HTMLSelectElement>("#example")!
  .addEventListener("change", (event) => {
    clearTimeout(editTimer);
    selectedExample = findExample((event.target as HTMLSelectElement).value);
    loadExample();
    update();
  });
const details = document.querySelector("details")!;
const extraHelp = document.createElement("p");
extraHelp.textContent = `손 제스처: ${Object.keys(gestures).join(", ")} · 소품: ${Object.keys(props).join(", ")}. holding은 들고 있는 물건, transfer는 from/to/prop으로 전달합니다. 인물 x/y와 대사 x/y는 0~1 비율이며, scale과 fontSize로 크기를 조정합니다.`;
details.append(extraHelp);
details.insertAdjacentHTML(
  "beforeend",
  '<p><a class="text-link" href="./guide.html">전체 문법과 기본값 보기 →</a></p>',
);
svgButton.addEventListener("click", () => {
  downloadBlob(
    new Blob([current.svg], { type: "image/svg+xml;charset=utf-8" }),
    "comic.svg",
  );
});
pngButton.addEventListener("click", async () => {
  pngButton.disabled = true;
  try {
    await document.fonts.ready;
    update();
    pngButton.disabled = true;
    downloadBlob(
      await exportPng(
        current,
        Number(document.querySelector<HTMLSelectElement>("#scale")!.value),
      ),
      "comic.png",
    );
  } catch (error) {
    diagnostics.textContent =
      error instanceof Error ? error.message : "PNG 내보내기 실패";
  } finally {
    pngButton.disabled = !current.svg;
  }
});
update();
document.fonts.addEventListener("loadingdone", (event) => {
  if (event.fontfaces.length) update();
});
