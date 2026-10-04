import { renderComic, renderPanelsAsync, type PanelsResult } from "./comic";
import { syntaxValues } from "./syntax";
import { examples, findExample } from "./examples";
import { navigation } from "./navigation";
import { escapeXml } from "./assets";
import { downloadBlob, exportPng } from "./export";
import "./style.css";

document.querySelector("#app")!.innerHTML = `
  ${navigation}
  <main><section class="intro"><span class="eyebrow">CODE → COMIC</span><h1>복잡한 개념을,<br>작은 대화로.</h1><p>준비된 캐릭터에 표정과 대사를 더하세요.<br>브라우저에서 그리고 이미지로 저장합니다.</p></section>
  <div class="workspace"><section class="editor"><div class="panel-heading"><h2>01 / 작성</h2><button id="reset">예제 복원</button></div><label for="source">만화 코드</label><textarea id="source" spellcheck="false"></textarea><details><summary>문법과 에셋 보기</summary><p>등장인물에서 인물을 정의하고 컷에 인물과 대사를 적습니다. 화자는 말하는 인물, 상대는 대화 상대입니다.</p><p>캐릭터: ${Object.values(syntaxValues.asset).join(", ")}</p><p>표정: ${Object.values(syntaxValues.expression).join(", ")}</p></details><div id="diagnostics" role="alert"></div></section>
    <section class="output"><div class="panel-heading"><h2>02 / 미리보기</h2><div class="export-controls"><button id="svg">SVG 저장</button><button id="png">PNG 저장</button></div></div><div class="options"><label>만화 너비 <select id="width"><option value="720">720 px</option><option value="960">960 px</option><option value="480">480 px</option></select></label><label>PNG 배율 <select id="scale"><option value="1">1×</option><option value="2">2×</option><option value="3">3×</option></select></label></div><div id="preview" aria-live="polite"></div><p class="caption">서버 렌더링 없이 · SVG 원본 · 반복 사용하는 캐릭터</p></section></div></main>`;
const source = document.querySelector<HTMLTextAreaElement>("#source")!;
const hero = renderComic(findExample("basic").source);
document.querySelector(".intro")!.innerHTML =
  `<span class="eyebrow">CODE → COMIC · 브라우저에서 바로</span><div class="intro-copy"><h1>한 줄의 설명을,<br>네 컷의 대화로.</h1><p>서버와 DB가 대화하면 요청과 응답이 쉬워집니다.<br>준비된 캐릭터에 대사·표정·소품을 더해<br>교육 자료와 기술 문서에 넣을 작은 만화를 만드세요.</p><div class="hero-actions"><a class="primary-link" href="#workspace">지금 만들어 보기 ↓</a><a class="text-link" href="./guide.html">처음부터 배우기 →</a></div><p class="help">설치 없이 · 컷마다 SVG · PNG 저장 · 내 문서에 삽입</p></div><figure class="hero-comic">${hero.svg}<figcaption>같은 렌더러로 만든 실제 대화예요. 아래에서 직접 바꿔보세요.</figcaption></figure>`;
document
  .querySelector(".workspace")!
  .insertAdjacentHTML(
    "beforebegin",
    `<section class="start-section" aria-labelledby="start-heading"><h2 id="start-heading">어떤 설명을 만들까요?</h2><div class="start-grid"><a href="./?example=actions#workspace"><span>IT 개념 설명</span><strong>요청 → 서버 → 데이터</strong><small>소품을 주고받으며 흐름을 설명해요.</small></a><a href="./?example=lesson#workspace"><span>교육·수업 자료</span><strong>학생의 질문, 선생님의 답</strong><small>세 인물로 개념과 예제를 함께 보여줘요.</small></a><a href="./?example=before#workspace"><span>짧은 네 컷 이야기</span><strong>변화만 적고 다음 컷으로</strong><small>이전 상태를 이어받아 표정과 대사를 바꿔요.</small></a></div></section>`,
  );
document
  .querySelector("main")!
  .insertAdjacentHTML(
    "beforeend",
    `<section class="learning-section" id="learn"><span class="eyebrow">NEXT STEPS</span><h2>하나씩 익히면, 더 잘 만들 수 있어요.</h2><p>짧게 시작해서 표현을 늘려보세요. 완성된 예제에서 직접 바꾸는 것이 가장 빠릅니다.</p><div class="learning-grid"><article><span class="lesson-number">01</span><h3>누가 누구에게 말하나요?</h3><p>등장인물은 전체 인물 사전, 인물은 이 컷에 나온 인물, 화자와 상대는 대사가 향하는 인물이에요. 내용의 대사만 바꿔 첫 만화를 만드세요.</p><a class="text-link" href="./?example=basic#workspace">첫 대화 수정하기 →</a></article><article><span class="lesson-number">02</span><h3>표정과 손으로 의미를 더해요.</h3><p>기쁨·어리둥절처럼 표정을 고르고 인사손·가리키는손으로 정적인 손 모양을 넣으세요. 든소품은 들고 있는 물건, 전달은 주고받는 관계예요.</p><a class="text-link" href="./gallery.html#gestures">몸짓과 소품 예제 →</a></article><article><span class="lesson-number">03</span><h3>다음 컷은 바뀐 부분만.</h3><p>컷에 항목을 추가하면 다음 컷이에요. 구성: 이전으로 인물 상태를 이어받고 표정만 바꾸세요. 대사는 매 컷 새로 적습니다.</p><a class="text-link" href="./guide.html#before">네 컷 상속 문법 →</a></article><article><span class="lesson-number">04</span><h3>스마트폰에서도 읽기 좋게.</h3><p>편집기의 기본 선택은 모바일 비율로, 컷 높이를 두 배로 늘려요. 각 컷은 독립 SVG라서 따로 저장할 수 있어요. PNG로 저장하면 글꼴 모양도 그대로 담깁니다.</p><a class="text-link" href="./guide.html#sdk">컷별 저장·SDK 사용법 →</a></article><article><span class="lesson-number">05</span><h3>완성한 만화를 문서로.</h3><p>CDN 한 파일을 불러오면 HTML이나 Markdown 코드 블록을 만화로 보여줄 수 있어요. 설치 없이 CodePen에서도 실험해보세요.</p><a class="text-link" href="./embed.html">문서에 들어간 실제 예제 →</a></article><article><span class="lesson-number">06</span><h3>오류를 만나도 고칠 수 있어요.</h3><p>없는 식별자는 등장인물을 확인하고, 겹친 인물은 위치를 벌려보세요. 막히면 예제를 복원한 뒤 한 항목씩 바꾸면 원인을 찾기 쉬워요.</p><a class="text-link" href="./guide.html#errors">자주 만나는 오류 해결 →</a></article></div><div class="learn-footer"><p>더 많은 장면이 필요하다면? 인증, 캐시, 재시도, 한영 대사와 짧은 이야기까지 준비했어요.</p><a class="primary-link" href="./gallery.html">${examples.length}개 예제와 코드 둘러보기 →</a><a class="text-link" href="https://github.com/jhs512/comic-gen">README·소스 보기 ↗</a></div></section>`,
  );
document.querySelector(".workspace")!.id = "workspace";
document
  .querySelector(".workspace")!
  .insertAdjacentHTML(
    "beforebegin",
    `<ol class="steps"><li>예제를 고르세요.</li><li>대사나 표정을 수정하세요.</li><li>그림을 확인하고 SVG·PNG로 저장하세요.</li></ol><p><a class="text-link" href="./gallery.html">${examples.length}가지 활용 예제 둘러보기 →</a> · <a class="text-link" href="./guide.html">처음부터 배우는 작성 문법 →</a></p>`,
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
diagnostics.insertAdjacentHTML(
  "afterend",
  '<p id="error-help" class="help" hidden>인물 ID와 들여쓰기를 확인하세요. <a class="text-link" href="./guide.html#errors">오류 해결 안내 →</a> 또는 예제 복원으로 다시 시작할 수 있어요.</p>',
);
document
  .querySelector(".editor .panel-heading")!
  .insertAdjacentHTML("beforeend", '<button id="copy-code">코드 복사</button>');
source.insertAdjacentHTML(
  "afterend",
  '<p id="copy-status" class="help" role="status"></p>',
);
document.querySelector("#copy-code")!.addEventListener("click", async () => {
  const status = document.querySelector("#copy-status")!;
  try {
    await navigator.clipboard.writeText(source.value);
    status.textContent =
      "만화 코드를 복사했어요. 다른 문서나 편집기에 붙여 넣으세요.";
  } catch {
    source.focus();
    source.select();
    status.textContent = "코드를 선택했어요. 브라우저 복사 기능을 사용하세요.";
  }
});
const svgButton = document.querySelector<HTMLButtonElement>("#svg")!;
const pngButton = document.querySelector<HTMLButtonElement>("#png")!;
const widthInput = document.querySelector<HTMLSelectElement>("#width")!;
document
  .querySelector(".options")!
  .insertAdjacentHTML(
    "beforeend",
    '<label>컷 비율 <select id="format"><option value="phone">스마트폰 · 세로 2배</option><option value="compact">기본 비율</option></select></label>',
  );
document.querySelector("#format")!.addEventListener("change", update);
document.querySelector(".output .caption")!.textContent =
  "컷 아래에서 각각 저장하세요. 상단 저장 버튼은 전체 만화를 한 파일로 저장합니다.";
let current: PanelsResult | undefined;
let revision = 0;
function invalidate() {
  revision++;
  current = undefined;
  svgButton.disabled = true;
  pngButton.disabled = true;
  preview.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
    button.disabled = true;
  });
}
async function update() {
  invalidate();
  const request = revision;
  preview.setAttribute("aria-busy", "true");
  document.querySelector("#cache-status")!.textContent = "만화를 그리는 중…";
  const result = await renderPanelsAsync(source.value, {
    width: Number(widthInput.value),
    panelFormat:
      document.querySelector<HTMLSelectElement>("#format")!.value === "compact"
        ? "compact"
        : "phone",
  });
  if (request !== revision || !preview.isConnected) return;
  current = result;
  preview.removeAttribute("aria-busy");
  preview.innerHTML = result.panels
    .map(
      (panel) =>
        `<section class="panel-preview">${panel.svg}<div class="panel-downloads"><span>${panel.index + 1}컷</span><button data-download="svg" data-index="${panel.index}">이 컷 SVG 받기</button><button data-download="png" data-index="${panel.index}">이 컷 PNG 받기</button></div></section>`,
    )
    .join("");
  diagnostics.textContent = result.diagnostics.join("\n");
  document.querySelector<HTMLElement>("#error-help")!.hidden =
    !result.diagnostics.length;
  document.querySelector("#cache-status")!.textContent = result.cache
    ? `재사용 ${result.cache.hits} · 새로 그린 컷 ${result.cache.misses}`
    : "";
  svgButton.disabled = !result.svg;
  pngButton.disabled = !result.svg;
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
  invalidate();
  editTimer = setTimeout(update, 120);
});
widthInput.addEventListener("change", update);
preview.addEventListener("click", async (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>(
    "button[data-download]",
  );
  if (!button) return;
  const panel = current?.panels[Number(button.dataset.index)];
  if (!panel) return;
  const request = revision;
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
    if (request === revision)
      diagnostics.textContent =
        error instanceof Error ? error.message : "컷 저장 실패";
  } finally {
    if (request === revision && button.isConnected) button.disabled = false;
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
extraHelp.textContent = `손모양: ${Object.values(syntaxValues.gesture).join(", ")} · 손방향: ${Object.values(syntaxValues.gestureDirection).join(", ")} · 소품: ${Object.values(syntaxValues.prop).join(", ")}. 손모양은 고정된 SVG이며 애니메이션이 아닙니다. 든소품은 들고 있는 물건, 전달은 주는인물/받는인물/소품으로 표현합니다. 가로위치·세로위치는 0~1, 배율·글자크기로 크기를 조정합니다.`;
details.append(extraHelp);
const diagramHelp = document.createElement("p");
diagramHelp.textContent =
  "컷의 다이어그램에 종류: 머메이드와 원문을 넣으면 칠판 영역에 그림을 그립니다. 원문은 Mermaid 문법이며 클래스·시퀀스 예제로 시작할 수 있어요.";
details.append(diagramHelp);
details.insertAdjacentHTML(
  "beforeend",
  '<p><a class="text-link" href="./guide.html">전체 문법과 기본값 보기 →</a></p>',
);
svgButton.addEventListener("click", () => {
  if (!current?.svg) return;
  downloadBlob(
    new Blob([current.svg], { type: "image/svg+xml;charset=utf-8" }),
    "comic.svg",
  );
});
pngButton.addEventListener("click", async () => {
  const result = current;
  if (!result?.svg) return;
  const request = revision;
  const scale = Number(document.querySelector<HTMLSelectElement>("#scale")!.value);
  pngButton.disabled = true;
  try {
    downloadBlob(await exportPng(result, scale), "comic.png");
  } catch (error) {
    if (request === revision)
      diagnostics.textContent =
        error instanceof Error ? error.message : "PNG 내보내기 실패";
  } finally {
    if (request === revision) pngButton.disabled = !current?.svg;
  }
});
update();
document.fonts.addEventListener("loadingdone", (event) => {
  if (event.fontfaces.length) update();
});
