import { navigation } from "./navigation";
import { examples } from "./examples";
import { escapeXml } from "./assets";
import { createExampleReader } from "./example-preview";
import "./style.css";

document.querySelector("#navigation")!.innerHTML = navigation;

const readingNotes: Record<string, string> = {
  basic:
    "위에서 아래로 요청과 답을 읽어 보세요. 말풍선 꼬리와 이름표가 누가 말하는지 알려 줍니다.",
  "persona-meeting":
    "다음 컷으로 넘겨도 세 사람의 외형은 유지됩니다. 질문한 사람이 배운 내용을 마지막 컷에서 자기 말로 정리합니다.",
  handoff:
    "첫 컷은 소라의 손, 마지막 컷은 준의 손을 보세요. 건네는 중인 둘째 컷에는 같은 열쇠를 든소품으로 중복해서 넣지 않습니다.",
  "reading-order":
    "질문은 위, 답은 아래에 둡니다. 다음 컷에서 자리를 바꿔도 화자와 상대를 같은 ID로 지정하면 대화가 이어집니다.",
  before:
    "같은 인물이 네 컷에 이어집니다. 찾기 → 건네기 → 받은 결과처럼 바뀌는 상태를 컷마다 확인해 보세요.",
  "persona-diagram":
    "첫 컷에서 위가리키는손으로 칠판을 짚습니다. 두 번째 컷에는 새 다이어그램을 넣지 않아 칠판이 이어지지 않습니다.",
};
const mounts = [
  ...document.querySelectorAll<HTMLElement>("[data-guide-example]"),
].map((container) => {
  const example = examples.find(
    (item) => item.id === container.dataset.guideExample,
  )!;
  container.setAttribute("aria-label", `${example.title} 예제`);
  container.innerHTML = `<h4>${escapeXml(example.title)}</h4><div class="gallery-preview" role="region" aria-label="${escapeXml(example.title)} 만화" tabindex="0"></div><p class="guide-reading-note">${escapeXml(readingNotes[example.id])}</p><div class="gallery-actions"><button type="button" data-guide-open disabled>크게 보기</button><a class="primary-link" href="./?example=${example.id}#workspace">플레이그라운드에서 수정 →</a></div><details${example.id === "basic" ? " open" : ""}><summary>이 그림의 작성 코드</summary><pre><code>${escapeXml(example.source)}</code></pre></details>`;
  return { container, example };
});

const reader = createExampleReader();
await document.fonts.ready;
await Promise.all(
  mounts.map(({ container, example }) =>
    reader.mount(
      container.querySelector<HTMLElement>(".gallery-preview")!,
      container.querySelector<HTMLButtonElement>("[data-guide-open]")!,
      example,
    ),
  ),
);
