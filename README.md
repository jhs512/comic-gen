# Comic Gen

준비된 SVG 에셋을 YAML로 조합하는 브라우저 전용 교육 만화 렌더러입니다. 웹 서버·DB·클라이언트, 다섯 표정, 손 제스처와 소품을 제공하며 SVG와 PNG로 저장합니다.

## 실행

Node.js 22.12 이상이 필요합니다.

```sh
npm install
npm run dev
```

표시되는 로컬 주소를 열면 코드 편집기와 미리보기가 나옵니다. 문서 삽입 예제는 `/embed.html`입니다.

```sh
npm run typecheck
npx playwright install chromium
npm test
npm run build
npm run preview
```

빌드 결과 전체를 정적 웹 서버에 배포할 수 있습니다. 렌더링 계산용 서버는 필요하지 않습니다. SDK가 참조하는 `assets` 폴더도 함께 배포하세요. 아직 npm이나 외부 사이트에 게시하지 않았습니다.

## 작성 예제

```yaml
title: 요청과 응답
cast:
  web: { asset: server, label: 웹 서버 }
  db: { asset: database, label: DB }
panels:
  - actors:
      - { id: web, expression: confused, holding: request }
      - { id: db, expression: happy, gesture: wave }
    dialogue:
      - { from: web, to: db, text: "데이터를 부탁해!" }
      - { from: db, to: web, text: "좋아, 바로 보낼게!" }
    transfer:
      - { from: db, to: web, prop: data }
```

| 항목            | 지원 값 / 의미                                          |
| --------------- | ------------------------------------------------------- |
| 캐릭터 에셋     | `client`, `server`, `database`                          |
| 표정            | `neutral` (기본), `happy`, `confused`, `sad`, `angry`   |
| 손 제스처       | `wave`, `point`; 생략하면 손 없음                       |
| 소품            | `request`, `data`, `key`                                |
| `holding`       | 해당 인물이 들고 있는 소품                              |
| `dialogue.from` | 화자; 말풍선 꼬리가 연결되는 인물                       |
| `dialogue.to`   | 대화 상대; 첫 대화 상대를 향해 표정 위치를 조정         |
| `transfer`      | 물건을 주는 인물·받는 인물·소품의 정적인 관계           |
| 인물 `x`, `y`   | 0~1 비율 좌표. 컷과 대사 영역 안에서 안전한 범위로 제한 |
| 인물 `scale`    | 0.5~1.25, 기본 1                                        |
| 대사 `x`, `y`   | 0~1 비율 좌표. 말풍선 중심의 x, 상단의 y                |
| 대사 `fontSize` | 12~32, 기본 18                                          |

`cast`의 키는 등장인물 식별자입니다. 같은 에셋을 서로 다른 키로 선언해 여러 인물을 만들 수 있습니다. `actors: [web, db]`처럼 짧게 쓰면 기본 표정과 자동 배치를 적용합니다. 좁은 너비에서는 손과 소품까지 고려해 캐릭터를 함께 축소하며, `scale`은 이 기본 크기에 대한 배율입니다. 수동 위치가 인물끼리 겹치게 하면 진단합니다. 등장하는 모든 인물과 대화 상대는 해당 컷의 `actors`에 있어야 합니다.

첫 버전은 컷과 대사 순서를 작성자가 명시합니다. 세로 컷 배치, 캐릭터 위치, 말풍선 크기와 줄바꿈은 자동 계산합니다. 최대 30컷, 컷당 1~3인과 20대사, 6개 전달 관계를 지원합니다. 처리할 수 없는 입력은 진단을 반환합니다.

## 브라우저 SDK

```js
import {
  renderComic,
  createRenderer,
  exportPng,
  renderCodeBlocks,
} from "./comic-gen.js";

await document.fonts.ready;
const renderer = createRenderer();
const result = renderer.render(source, { width: 720 });
if (result.diagnostics.length) console.error(result.diagnostics);
else document.querySelector("#preview").innerHTML = result.svg;
const png = await exportPng(result, 2);
```

`renderComic`는 기본 캐시를 사용하는 바로가기입니다. `createRenderer(maxCacheBytes)`로 독립 캐시를 만들고 `clearCache()`로 비울 수 있습니다. 결과는 `svg`, `width`, `height`, `diagnostics`와 성공 시 `cache` 통계를 포함합니다. 캐시는 기본 2MB의 문자열 예산을 갖는 메모리 LRU입니다. 준비된 에셋은 모듈에서 한 번 로드해 재사용합니다.

컷 캐시는 해당 컷 내용과 사용한 인물, 에셋·배치 버전, 출력 너비와 글꼴 조건을 기준으로 합니다. 한 컷이나 이름표를 수정하면 영향받는 컷만 다시 그립니다. 글꼴 로딩 완료 이벤트는 캐시 조건을 갱신합니다. 외부에서 글꼴 환경을 바꿨다면 `fontVersion` 옵션을 변경하거나 캐시를 비우고 다시 렌더링하세요.

## 문서 삽입

```html
<pre data-comic><code>여기에 만화 YAML 코드</code></pre>
<script type="module">
  import { renderCodeBlocks } from "./comic-gen.js";
  await document.fonts.ready;
  renderCodeBlocks();
</script>
```

`pre > code.language-comic`도 지원합니다. Markdown 파서가 `comic` 코드 블록을 해당 HTML로 출력하면 연결할 수 있습니다. 실제 코드 내용에 HTML 특수문자가 있으면 HTML로 삽입할 때 이스케이프하거나 `textContent`로 설정하세요. 렌더러는 대사를 실행하지 않는 텍스트로 표시합니다.

여러 블록을 독립적으로 렌더링하고 오류는 해당 블록에만 표시합니다. 코드 블록을 수정한 뒤 다시 호출해도 그림이 중복되지 않습니다. slog.gg의 `$$` 블록 연결은 그 서비스의 파서에 별도로 통합해야 하며 현재 구현하거나 검증하지 않았습니다.

## 범위와 검증

PNG는 브라우저에서 생성하며 최대 한 변 16,384픽셀, 총 3,200만 픽셀로 제한합니다. SVG는 글꼴을 경로로 변환하거나 글꼴 파일을 포함하지 않으므로 보는 환경의 글꼴에 따라 텍스트 모양이 달라질 수 있습니다. 한국어와 영어는 실제 브라우저 글꼴 폭으로 줄바꿈합니다.

현재 브라우저 테스트는 Chromium에서 코드 편집, 참조 진단, 긴 대사, 역할 재사용, 제스처·소품, 수동 배치, PNG 디코딩, 캐시 갱신과 문서 삽입을 검증합니다. 모든 브라우저 및 글꼴의 동일한 그림을 보장하는 검증은 아닙니다.

직접 그림 정의, AI 생성, 임의 에셋 업로드, 계정·백엔드, 애니메이션과 CLI는 첫 버전 범위에 포함하지 않습니다. 원본 SVG 에셋은 이 프로젝트에서 독립적으로 작성했으며 ComicForge의 코드나 그림을 복사하지 않았습니다.
