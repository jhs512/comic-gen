# Comic Gen

준비된 SVG 에셋을 YAML로 조합하는 브라우저 전용 만화 렌더러입니다. IT 교육, 기술 문서, 짧은 이야기에서 역할을 맡은 작은 캐릭터가 질문하고 대답하도록 만듭니다. 클라이언트·웹 서버·DB에 이름표, 표정, 손과 소품을 더하고 SVG 또는 PNG로 저장하세요.

설치 없이 웹에서 시작하거나 단일 ES 모듈을 내 문서에 넣을 수 있습니다. 렌더링·줄바꿈·이미지 변환은 브라우저에서 처리하며 AI 생성이나 렌더링 서버는 사용하지 않습니다. 같은 에셋도 다른 ID로 여러 인물에 재사용할 수 있습니다.

## 바로 시작하기

1. [플레이그라운드](https://jhs512.github.io/comic-gen/)를 엽니다. 기본 예제는 네 컷 이야기입니다.
2. 시작 예제를 고르거나 `text`의 대사, `expression`의 표정을 바꿉니다.
3. 컷마다 생성되는 SVG를 확인합니다. 잘못된 입력은 작성 영역 아래에 표시됩니다.
4. 각 컷 아래 **이 컷 SVG 받기 / 이 컷 PNG 받기**로 저장합니다. 상단 버튼은 전체 만화를 하나로 저장합니다.

처음 배우려면 문법 안내, 무엇을 만들지 고민된다면 갤러리부터 보세요. 갤러리에는 실제 만화, 용도와 핵심 기능, 전체 코드, 편집기에서 수정하는 링크가 함께 있습니다. 편집 내용을 서버에 저장하는 기능은 없으므로 작업한 코드는 별도로 보관하세요.

| 용도            | 링크                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| 플레이그라운드  | [예제 선택 → 코드 수정 → 실시간 결과 → 저장](https://jhs512.github.io/comic-gen/)                              |
| 문법 안내       | [튜토리얼·필드·기본값·오류 해결](https://jhs512.github.io/comic-gen/guide.html)                                |
| 갤러리          | [13개 렌더링 예제와 코드](https://jhs512.github.io/comic-gen/gallery.html)                                     |
| 문서 삽입       | [여러 코드 블록을 렌더링하는 문서](https://jhs512.github.io/comic-gen/embed.html)                              |
| CDN 실험        | [외부 CDN에서 SDK를 불러오는 화면](https://jhs512.github.io/comic-gen/cdn.html)                                |
| 소스            | [GitHub 저장소](https://github.com/jhs512/comic-gen)                                                           |
| 최신 SDK        | [main 브랜치 CDN](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@main/cdn/comic-gen.js)                          |
| 현재 고정 버전  | [v0.2.0 CDN](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.2.0/cdn/comic-gen.js)                             |
| 이전 고정 버전  | [v0.1.0 CDN](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.1.0/cdn/comic-gen.js)                             |
| 자체 호스팅 SDK | [GitHub Pages SDK](https://jhs512.github.io/comic-gen/sdk/comic-gen.js)                                        |
| CodePen         | [검증한 코드](https://codepen.io/jangka44/pen/PwpKdPz) · [그림 보기](https://codepen.io/jangka44/full/PwpKdPz) |

## 최신 CDN과 버전 고정

```js
import { renderPanels } from "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@main/cdn/comic-gen.js";
```

`@main`은 주소 변경 없이 main에 게시한 최신 SDK를 사용합니다. `@latest`는 최신 정식 버전 태그를 의미하며 이 프로젝트의 기본 최신 주소는 `@main`으로 통일합니다. [jsDelivr 캐시 정책](https://github.com/jsdelivr/jsdelivr#caching)에 따라 브랜치 URL은 최대 12시간 캐시될 수 있어 모든 사용자에게 즉시 갱신되는 것은 아닙니다. 즉시 특정 수정 버전을 받아야 한다면 새 태그의 고정 URL을 사용하세요.

CDN 파일에는 YAML 파서와 기본 SVG 에셋이 포함되어 상대 경로의 추가 파일이나 npm 설치가 필요 없습니다. npm에는 아직 게시하지 않았습니다. 재현 가능한 문서에는 `@v0.2.0`을 사용하세요. 기존 태그는 덮어쓰지 않습니다.

v0.2.0은 컷별 SVG, 스마트폰용 세로 비율, 이전 컷 상속, 갤러리와 문법 안내를 추가합니다. 말풍선 몸통과 꼬리의 내부 경계선을 없애고 전달 화살표를 캐릭터의 손 높이에 연결합니다. v0.1.0 URL은 기존 결과를 유지합니다.

## 첫 만화 작성하기

YAML의 `cast`는 인물 사전, `panels`는 순서가 있는 컷 목록입니다. 탭 대신 공백 두 칸으로 들여쓰기하세요.

```yaml
title: 요청과 응답
cast:
  web: { asset: server, label: 웹 서버 }
  db: { asset: database, label: DB }
panels:
  - actors: [web, db]
    dialogue:
      - { from: web, to: db, text: "데이터를 부탁해!" }
      - { from: db, to: web, text: "좋아, 바로 찾아볼게!" }
```

[이 예제를 바로 수정하기](https://jhs512.github.io/comic-gen/?example=basic#workspace)

| 위치        | 항목                    | 값과 기본값                                                                     |
| ----------- | ----------------------- | ------------------------------------------------------------------------------- |
| 최상위      | `title`                 | 선택 문자열, 기본 Comic Gen                                                     |
| 최상위      | `cast`                  | 필수 객체, 키가 인물 ID                                                         |
| 최상위      | `panels`                | 필수 목록, 1~30컷, 적은 순서대로 세로 배치                                      |
| cast의 인물 | `asset` / `label`       | asset 필수: client, server, database. label 선택, 기본 ID                       |
| 컷          | `actors`                | 필수 1~3명. ID 문자열 또는 설정 객체. 같은 ID 중복 불가. before에서는 생략 가능 |
| 컷          | `dialogue` / `transfer` | 선택 목록, 기본 빈 목록. 최대 20대사, 6개 전달 관계                             |
| 컷          | `mode`                  | full(기본) 또는 before                                                          |
| 컷          | `removeActors`          | before에서만 사용하는 제거 ID 목록                                              |
| 인물 설정   | `id`                    | 필수, cast에 선언한 인물 ID                                                     |
| 인물 설정   | `expression`            | neutral(기본), happy, confused, sad, angry                                      |
| 인물 설정   | `gesture`               | 선택: wave, point. 생략하면 제스처 없음                                         |
| 인물 설정   | `holding`               | 선택: request, data, key                                                        |
| 인물 설정   | `x` / `y` / `scale`     | x/y는 0~1, 기본 자동. scale은 0.5~1.25, 기본 1                                  |
| 대사        | `from` / `to` / `text`  | from과 text 필수, to 선택. 화자·상대 모두 해당 컷에 있어야 함                   |
| 대사        | `x` / `y` / `fontSize`  | x/y는 0~1, 기본 자동. fontSize는 12~32, 기본 18                                 |
| 전달        | `from` / `to` / `prop`  | 모두 필수. 서로 다른 인물과 request, data, key 중 소품                          |

같은 에셋도 서로 다른 ID와 이름표로 여러 인물을 만들 수 있습니다. 역할을 학생·선생님으로 바꾸는 것은 이름표를 바꾸는 것이며 새 그림 에셋을 생성하지 않습니다. 배경·임의 에셋 업로드는 현재 지원하지 않습니다.

### 표정·손·소품

```yaml
actors:
  - { id: web, expression: happy, gesture: wave, holding: request }
  - { id: db, expression: confused }
transfer:
  - { from: db, to: web, prop: data }
```

`holding`은 인물이 들고 있는 물건, `transfer`는 두 인물 사이의 정적인 전달 표현입니다. 애니메이션이나 실제 네트워크 동작은 없습니다. gesture와 holding을 생략하면 기본 손은 없으며, transfer를 쓰면 전달용 손이 표시됩니다.

### 네 컷과 이전 컷 상속

`panels`에 항목을 추가하면 다음 컷입니다. 매번 actors를 전부 쓰는 기존 문법도 계속 지원합니다. `mode: before`를 지정하면 바로 이전 컷의 인물 상태를 이어받고 ID별 변화만 적습니다.

```yaml
title: 데이터가 도착하기까지
cast:
  web: { asset: server, label: 웹 서버 }
  db: { asset: database, label: DB }
panels:
  - actors: [{ id: web, expression: confused }, db]
    dialogue: [{ from: web, to: db, text: "내가 요청한 데이터가 있니?" }]
  - mode: before
    actors: [{ id: db, expression: happy, holding: data }]
    dialogue: [{ from: db, to: web, text: "찾았어! 이 데이터를 가져가." }]
  - mode: before
    actors: [{ id: db, holding: null }, { id: web, expression: happy }]
    transfer: [{ from: db, to: web, prop: data }]
    dialogue: [{ from: web, to: db, text: "고마워, 이제 응답할 수 있어!" }]
  - mode: before
    actors: [{ id: web, holding: data, gesture: wave }]
    dialogue: [{ from: web, to: db, text: "다음 요청에서도 함께하자!" }]
```

[네 컷 예제를 바로 수정하기](https://jhs512.github.io/comic-gen/?example=before#workspace)

| before 모드에서     | 규칙                                                                    |
| ------------------- | ----------------------------------------------------------------------- |
| actors 생략         | 이전 인물의 순서·표정·손·holding·좌표·배율 유지                         |
| actors의 기존 ID    | 지정한 필드만 덮어쓰기                                                  |
| actors의 새 ID      | cast의 인물을 뒤에 추가, 생략한 설정은 기본값                           |
| 선택 필드의 null    | 초기화. 표정 neutral, 배율 1, 좌표 자동, 손/holding 없음                |
| removeActors: [db]  | 이전 인물 제거 후 변경 적용. 없는 ID는 오류                             |
| actors: []          | 인물 비우기. 현재 최소 1명이 필요하므로 오류. 변화가 없으면 actors 생략 |
| dialogue, transfer  | 상속하지 않음. 생략/빈 목록이면 없음, 제공하면 그 컷의 목록으로 대체    |
| cast, 에셋, 이름표  | 만화 전체에서 공유. 컷별로 변경하지 않음                                |
| 첫 컷의 before      | 이전 컷이 없으므로 오류                                                 |
| mode 생략 또는 full | 상속 없이 전체 정의. removeActors 사용 불가                             |

배경은 현재 지원하지 않으므로 상속 대상도 아닙니다. 뒤 컷을 바꿔도 앞 컷은 변하지 않습니다. 앞 컷의 상속 상태를 변경하면 영향을 받는 이후 컷의 캐시도 갱신됩니다. 대사와 전달은 자동 반복하지 않으므로 각 컷에 다시 적으세요.

### 여러 줄과 수동 배치

```yaml
actors:
  - { id: web, x: 0.25, y: 0.85, scale: 0.8 }
  - { id: db, x: 0.75 }
dialogue:
  - from: web
    to: db
    x: 0.35
    fontSize: 16
    text: |-
      첫 번째 줄이에요.
      두 번째 줄은 직접 나눴어요.
```

인물 x는 내부 여백을 제외한 영역, y는 기본 내용 영역의 비율입니다. 대사 x는 말풍선 중심, y는 상단입니다. 안전한 범위로 제한되어 최종 좌표는 요청값과 다를 수 있습니다. 좁은 폭에서는 캐릭터를 자동 축소하며 scale은 그 기본 크기에 대한 배율입니다.

스마트폰 비율은 각 컷 SVG의 실제 높이를 기존 비율 대비 2배로 만듭니다. 내용 그룹의 배치는 유지하고 위아래 여백을 더해 그림을 찌그러뜨리거나 말풍선 꼬리를 과도하게 늘리지 않습니다. width 명시값은 유지합니다. 플레이그라운드의 컷 비율에서 기존 비율로 돌아갈 수 있습니다. height 옵션은 현재 없습니다.

인물끼리 겹치면 진단합니다. 수동 말풍선과 전달 선의 모든 교차를 자동 회피하지는 않습니다. 자동 배치로 시작한 뒤 조금씩 조절하세요. 긴 한국어와 공백 없는 영어 식별자도 자동 줄바꿈합니다. 자동 번역은 하지 않습니다.

## 활용 예제 지도

| 갤러리 예제                                                              | 배울 수 있는 것                        |
| ------------------------------------------------------------------------ | -------------------------------------- |
| [네 컷 상속](https://jhs512.github.io/comic-gen/gallery.html#before)     | 이전 상태 유지, 부분 변경, null 초기화 |
| [첫 대화](https://jhs512.github.io/comic-gen/gallery.html#basic)         | 이름표, 화자와 상대                    |
| [요청·응답](https://jhs512.github.io/comic-gen/gallery.html#actions)     | 3명, 여러 컷, 요청/데이터 전달         |
| [캐시](https://jhs512.github.io/comic-gen/gallery.html#cache)            | 3컷으로 설명하는 상태 변화             |
| [인증](https://jhs512.github.io/comic-gen/gallery.html#auth)             | key, holding과 transfer                |
| [재시도](https://jhs512.github.io/comic-gen/gallery.html#retry)          | 실패와 성공의 표정                     |
| [교육 문답](https://jhs512.github.io/comic-gen/gallery.html#lesson)      | 학생·선생님·예제의 역할                |
| [짧은 이야기](https://jhs512.github.io/comic-gen/gallery.html#story)     | 같은 에셋으로 다른 인물                |
| [다섯 표정](https://jhs512.github.io/comic-gen/gallery.html#expressions) | 5컷의 다섯 표정                        |
| [손 제스처](https://jhs512.github.io/comic-gen/gallery.html#gestures)    | wave, point와 손 생략                  |
| [한국어·영어](https://jhs512.github.io/comic-gen/gallery.html#languages) | 여러 줄과 다국어                       |
| [수동 배치](https://jhs512.github.io/comic-gen/gallery.html#manual)      | x/y, scale, fontSize                   |
| [긴 설명](https://jhs512.github.io/comic-gen/gallery.html#long-text)     | 줄바꿈, 문서 삽입                      |

## 브라우저 SDK: 컷별 SVG가 기본

페이지에 `<div id="preview"></div>`를 만든 뒤 module 스크립트에서 실행하세요. source는 위 예제 같은 YAML 문자열입니다.

```js
import {
  renderPanels,
  createRenderer,
  exportPng,
  downloadBlob,
} from "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@main/cdn/comic-gen.js";
await document.fonts.ready;
const result = renderPanels(source, { width: 720, panelFormat: "phone" });
if (result.diagnostics.length) {
  console.error(result.diagnostics);
} else {
  document.querySelector("#preview").innerHTML = result.panels
    .map((panel) => panel.svg)
    .join("");
}
// 버튼 클릭 이벤트에서 원하는 컷을 저장합니다.
async function saveFirstPanel() {
  if (result.diagnostics.length) return;
  const panel = result.panels[0];
  downloadBlob(new Blob([panel.svg], { type: "image/svg+xml" }), "panel-1.svg");
  downloadBlob(await exportPng(panel, 2), "panel-1.png");
}
```

| API / 옵션                     | 설명                                                   |
| ------------------------------ | ------------------------------------------------------ |
| renderPanels(source, options)  | 권장. panels 배열에 컷별 독립 SVG 반환. 기본 phone     |
| result.panels[n]               | index(0부터), svg, width, height, diagnostics, cache   |
| result.diagnostics             | 실패 설명. 실패 시 panels는 빈 배열                    |
| result.svg / width / height    | 선택적인 전체 통합 출력. 기본 화면에는 panels 사용     |
| renderComic(source, options)   | 기존 통합 SVG API 유지. 기본 compact                   |
| createRenderer(maxCacheBytes)  | 독립 캐시. render(), renderPanels(), clearCache() 제공 |
| width                          | 480~2400, 기본 720                                     |
| panelFormat                    | phone 또는 compact. SVG·PNG에 같은 실제 크기 적용      |
| font                           | 기본 Malgun Gothic, Apple SD Gothic Neo, sans-serif    |
| fontVersion                    | 외부 글꼴 환경 변경 시 캐시 조건 갱신에 사용           |
| exportPng(panelOrComic, scale) | PNG Blob 반환. 배율 0.5~4, 기본 1                      |
| downloadBlob(blob, filename)   | 브라우저 다운로드                                      |

각 컷 SVG는 필요한 에셋을 인라인으로 포함해 단독 파일로 열 수 있습니다. 기본 캐시는 2MB 문자열 예산의 메모리 LRU이며 영구 저장되지 않습니다. 내용·인물·에셋/배치 버전·너비·비율·글꼴 조건이 캐시 키입니다. 변경한 컷만 다시 그리며 before 상태 변화는 관련 이후 컷도 갱신합니다. 글꼴 로딩 완료 이벤트가 캐시 조건을 갱신합니다. 외부 글꼴 변경 시 fontVersion을 바꾸거나 캐시를 비우세요.

## 문서·Markdown·CodePen 삽입

CodePen의 HTML 영역에 아래 내용을 그대로 넣을 수 있습니다. JavaScript 전처리기나 외부 패키지 설정은 필요 없습니다.

```html
<style>
  .comic-figure {
    margin: 24px 0;
  }
  .comic-figure svg {
    display: block;
    max-width: 100%;
    height: auto;
    margin-bottom: 24px;
  }
</style>
<pre data-comic><code>cast:
  web: {asset: server, label: 웹 서버}
  db: {asset: database, label: DB}
panels:
  - actors: [web, db]
    dialogue: [{from: web, to: db, text: "데이터를 부탁해!"}]
  - mode: before
    actors: [{id: db, expression: happy}]
    dialogue: [{from: db, to: web, text: "여기 데이터가 있어!"}]
    transfer: [{from: db, to: web, prop: data}]
</code></pre>
<script type="module">
  import { renderCodeBlocks } from "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@main/cdn/comic-gen.js";
  await document.fonts.ready;
  renderCodeBlocks();
</script>
```

renderCodeBlocks(root = document, options = {})는 여러 블록을 컷별 SVG로 렌더링합니다. `pre > code.language-comic` 또는 `code.language-comic-gen`도 지원하므로 Markdown의 comic 코드 블록을 해당 HTML로 변환하면 연결할 수 있습니다. 오류는 해당 블록에만 표시됩니다. 내용을 수정한 뒤 다시 호출해도 그림이 중복되지 않습니다.

HTML에 넣을 때 대사의 &, <, >는 이스케이프하거나 textContent로 설정하세요. 대사는 실행하지 않는 텍스트로 표시합니다. 사이트에서 모듈 스크립트를 허용해야 합니다. slog.gg의 `$$` 문법은 해당 서비스 파서에 별도로 통합해야 하며 아직 연결하지 않았습니다.

[기존 CodePen 검증 링크](https://codepen.io/jangka44/pen/PwpKdPz)는 v0.1.0 실험을 보존합니다. 최신 컷별 문법은 위 코드와 공개 CDN 예제에서 확인할 수 있습니다.

## 오류 해결과 한계

- 없는 인물: cast와 actors의 ID가 같은지 확인하세요.
- 화자·상대가 컷에 없음: from/to에 쓴 인물을 해당 컷 actors에 넣으세요.
- 알 수 없는 항목: 키의 철자와 대소문자를 확인하세요.
- 인물 겹침: x/y를 벌리거나 scale을 줄이고, 자동 배치로 돌아가 보세요.
- 이름표가 너무 김: 현재 두 줄 이내로 줄이세요.
- 첫 컷 before: 첫 컷은 완전히 정의하세요.
- SVG에서 글꼴이 다름: 글꼴을 경로/파일로 포함하지 않습니다. 같은 픽셀이 필요하면 PNG로 저장하세요.

입력은 100,000 문자, 각 텍스트는 10,000 문자 이내입니다. PNG 최대 크기는 한 변 16,384픽셀, 총 3,200만 픽셀입니다. 많은 컷은 전체 PNG보다 컷별로 저장하세요. 한계 초과 시 설명을 반환합니다.

현재 자동 검증은 Chromium입니다. 모든 브라우저·글꼴에서 동일한 그림을 보장하지 않습니다. 임의 에셋 업로드, 배경, 직접 그림 정의, AI 생성, 계정 저장, 애니메이션, 자동 경로 회피, CLI는 지원하지 않습니다. 원본 SVG는 독립적으로 작성했으며 ComicForge의 코드나 그림을 복사하지 않았습니다.

## 로컬 개발·자체 배포

Node.js 22.12 이상이 필요합니다.

```sh
npm install
npm run dev
npm run typecheck
npx playwright install chromium
npm test
npm run build
npm run preview
```

npm test는 빌드 후 브라우저 검증을 실행합니다. 편집·저장, PNG 디코딩, 캐시 갱신, 말풍선 접점 픽셀, 전달 높이, 상속과 전체 정의의 출력 일치, 이전 컷 불변성, 네 컷 독립 SVG, 갤러리 연결과 모바일 너비를 검증합니다.

`dist` 전체와 그 assets 폴더를 정적 서버에 배포하세요. 단일 파일 SDK는 `cdn/comic-gen.js`와 `dist/sdk/comic-gen.js`에 생성됩니다. main 푸시는 GitHub Actions에서 테스트 후 Pages에 배포합니다. 새 SDK를 배포할 때 package 버전을 올리고 빌드한 CDN 파일을 커밋한 다음 새 태그를 게시합니다. 공개 API는 `src/index.ts`, 입력 검증은 `src/parse.ts`, 배치는 `src/layout.ts`에서 관리합니다.
