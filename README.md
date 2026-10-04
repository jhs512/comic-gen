# Comic Gen

준비된 SVG 에셋을 YAML로 조합하는 브라우저 전용 만화 렌더러입니다. IT 교육, 기술 문서, 짧은 이야기에서 역할을 맡은 작은 캐릭터가 질문하고 대답하도록 만듭니다. 사람·클라이언트·웹 서버·DB에 이름표, 표정, 손과 소품을 더하고 SVG 또는 PNG로 저장하세요.

설치 없이 웹에서 시작하거나 단일 ES 모듈을 내 문서에 넣을 수 있습니다. 렌더링·줄바꿈·이미지 변환은 브라우저에서 처리하며 AI 생성이나 렌더링 서버는 사용하지 않습니다. 같은 에셋도 다른 ID로 여러 인물에 재사용할 수 있습니다.

## 바로 시작하기

1. [플레이그라운드](https://jhs512.github.io/comic-gen/)를 엽니다. 기본 예제는 네 컷 이야기입니다.
2. 시작 예제를 고르거나 `내용`의 대사, `표정`의 표정을 바꿉니다.
3. 컷마다 생성되는 SVG를 확인합니다. 잘못된 입력은 작성 영역 아래에 표시됩니다.
4. 각 컷 아래 **이 컷 SVG 받기 / 이 컷 PNG 받기**로 저장합니다. 상단 버튼은 전체 만화를 하나로 저장합니다.

처음 배우려면 문법 안내, 무엇을 만들지 고민된다면 갤러리부터 보세요. 갤러리에는 실제 만화, 용도와 핵심 기능, 전체 코드, 편집기에서 수정하는 링크가 함께 있습니다. 편집 내용을 서버에 저장하는 기능은 없으므로 작업한 코드는 별도로 보관하세요.

| 용도                | 링크                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| 플레이그라운드      | [예제 선택 → 코드 수정 → 실시간 결과 → 저장](https://jhs512.github.io/comic-gen/)                              |
| 문법 안내           | [튜토리얼·필드·기본값·오류 해결](https://jhs512.github.io/comic-gen/guide.html)                                |
| 갤러리              | [22개 렌더링 예제와 코드](https://jhs512.github.io/comic-gen/gallery.html)                                     |
| 문서 삽입           | [여러 코드 블록을 렌더링하는 문서](https://jhs512.github.io/comic-gen/embed.html)                              |
| CDN 실험            | [외부 CDN에서 SDK를 불러오는 화면](https://jhs512.github.io/comic-gen/cdn.html)                                |
| 소스                | [GitHub 저장소](https://github.com/jhs512/comic-gen)                                                           |
| 최신 SDK            | [main 브랜치 CDN](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@main/cdn/comic-gen.js)                          |
| 영어 문법 고정 버전 | [v0.2.1 CDN](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.2.1/cdn/comic-gen.js)                             |
| 이전 고정 버전      | [v0.1.0 CDN](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.1.0/cdn/comic-gen.js)                             |
| 자체 호스팅 SDK     | [GitHub Pages SDK](https://jhs512.github.io/comic-gen/sdk/comic-gen.js)                                        |
| CodePen             | [검증한 코드](https://codepen.io/jangka44/pen/PwpKdPz) · [그림 보기](https://codepen.io/jangka44/full/PwpKdPz) |

## 최신 CDN과 버전 고정

```js
import { 컷그리기 } from "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.8.1/cdn/comic-gen.render.js";
```

`@main`은 주소 변경 없이 main에 게시한 최신 SDK를 사용합니다. `@latest`는 최신 정식 버전 태그를 의미하며 이 프로젝트의 기본 최신 주소는 `@main`으로 통일합니다. [jsDelivr 캐시 정책](https://github.com/jsdelivr/jsdelivr#caching)에 따라 브랜치 URL은 최대 12시간 캐시될 수 있어 모든 사용자에게 즉시 갱신되는 것은 아닙니다. 즉시 특정 수정 버전을 받아야 한다면 새 태그의 고정 URL을 사용하세요.

렌더링 파일에는 YAML 파서와 기본 SVG 에셋이 포함되어 npm 설치가 필요 없습니다. 다이어그램 없는 만화는 이 한 파일로 그립니다. Mermaid 다이어그램을 그릴 때만 Mermaid 11.17.2와 고정 버전의 렌더링 모듈을 추가로 불러옵니다. npm에는 아직 게시하지 않았습니다. 한글 문법은 v0.3.0부터, 컷 안 다이어그램은 v0.4.0부터, 선택형 공용 뷰어는 v0.5.0부터, 사람·외형·페르소나는 v0.6.0부터, 독립적인 뷰어 옵션과 외부 상태 제어는 v0.7.0부터 지원합니다. 재현 가능한 문서에는 `@v0.8.1` 고정 주소를 사용하세요. 기존 태그는 덮어쓰지 않습니다.

| 사용할 기능                  | v0.8.1 파일                                                                                        | 포함하는 API                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 렌더링·SVG·PNG 저장          | [comic-gen.render.js](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.8.1/cdn/comic-gen.render.js) | `renderComic`, `renderPanels`, 비동기 함수, `createRenderer`, 저장 함수 |
| 완성한 결과에 카드·뷰어 추가 | [comic-gen.viewer.js](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.8.1/cdn/comic-gen.viewer.js) | `mountComicCard`, `createComicViewer`                                   |
| 기존 문서 삽입을 함께 사용   | [comic-gen.js](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.8.1/cdn/comic-gen.js)               | 위 API와 `renderCodeBlocks`, `renderCodeBlocksAsync`                    |

렌더링과 뷰어 모듈은 각각 사용할 수 있습니다. 렌더링 모듈은 카드·대화상자·뷰어 스타일을 설치하지 않습니다. 뷰어 모듈은 렌더러나 YAML·Mermaid를 불러오지 않고 이미 완성된 결과만 받습니다. 기존 `comic-gen.js` 주소와 동기·비동기 API, 한글 별칭과 반환 구조는 유지합니다.

`만화카드붙이기`와 `만화뷰어만들기`는 각각 `mountComicCard`, `createComicViewer`와 같은 함수입니다.

각 JavaScript와 같은 경로에 `comic-gen.render.d.ts`, `comic-gen.viewer.d.ts`, `comic-gen.d.ts` 타입 선언이 있습니다. vendor 방식으로 복사할 때 JavaScript와 같은 버전의 선언 파일을 함께 사용하세요.

v0.2.1은 영어 문법 전용입니다. 컷별 SVG, 스마트폰용 세로 비율, 이전 컷 상속, 갤러리와 문법 안내를 지원하며 기존 영어 예제를 계속 사용할 수 있습니다. v0.1.0 URL도 기존 결과를 유지합니다.

## 첫 만화 작성하기

YAML의 `등장인물`은 인물 사전, `컷`은 순서가 있는 컷 목록입니다. 탭 대신 공백 두 칸으로 들여쓰기하세요. 인물 ID는 `web`, `db`처럼 정하는 이름이며 한글도 사용할 수 있습니다. ID와 이름표·대사 내용은 번역하거나 자동 변경하지 않습니다.

```yaml
제목: 요청과 응답
등장인물:
  web: { 그림: 서버, 이름표: 웹 서버 }
  db: { 그림: 데이터베이스, 이름표: DB }
컷:
  - 인물: [web, db]
    대사:
      - { 화자: web, 상대: db, 내용: "데이터를 부탁해!" }
      - { 화자: db, 상대: web, 내용: "좋아, 바로 찾아볼게!" }
```

[이 예제를 바로 수정하기](https://jhs512.github.io/comic-gen/?example=basic#workspace)

| 위치            | 항목                                 | 값과 기본값                                                                   |
| --------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| 최상위          | `제목`                               | 선택 문자열, 기본 Comic Gen                                                   |
| 최상위          | `등장인물`                           | 필수 객체, 키가 인물 ID                                                       |
| 최상위          | `컷`                                 | 필수 목록, 1~30컷, 적은 순서대로 세로 배치                                    |
| 등장인물의 인물 | `그림` / `이름표`                    | 그림 필수: 사람, 클라이언트, 서버, 데이터베이스. 이름표 선택, 기본 ID         |
| 최상위          | `페르소나`                           | 선택 프로필 사전. 직무·성격·말투를 선언                                       |
| 등장인물의 인물 | `페르소나` / `외형`                  | 선택 프로필 객체/ID, 사람 전용 외형 객체                                      |
| 컷              | `인물`                               | 필수 1~3명. ID 문자열 또는 설정 객체. 같은 ID 중복 불가. 이전에서는 생략 가능 |
| 컷              | `대사` / `전달`                      | 선택 목록, 기본 빈 목록. 최대 20대사, 6개 전달 관계                           |
| 컷              | `다이어그램`                         | 선택 객체. 종류: 머메이드, 원문 필수. 제목·높이 선택                          |
| 컷              | `구성`                               | 전체(기본) 또는 이전                                                          |
| 컷              | `제외인물`                           | 이전에서만 사용하는 제거 ID 목록                                              |
| 인물 설정       | `식별자`                             | 필수, 등장인물에 선언한 인물 ID                                               |
| 인물 설정       | `표정`                               | 보통(기본), 기쁨, 어리둥절, 슬픔, 화남                                        |
| 인물 설정       | `손모양`                             | 선택: 인사손, 가리키는손, 위가리키는손. 생략하면 제스처 없음                  |
| 인물 설정       | `손방향`                             | 선택(v0.8.0): 왼쪽, 오른쪽. 인사손·가리키는손의 자동 방향을 바꿀 때만 작성    |
| 인물 설정       | `든소품`                             | 선택: 요청, 데이터, 열쇠                                                      |
| 인물 설정       | `가로위치` / `세로위치` / `배율`     | 가로위치/세로위치는 0~1, 기본 자동. 배율은 0.5~1.25, 기본 1                   |
| 대사            | `화자` / `상대` / `내용`             | 화자와 내용 필수, 상대 선택. 화자·상대 모두 해당 컷에 있어야 함               |
| 대사            | `가로위치` / `세로위치` / `글자크기` | 가로위치/세로위치는 0~1, 기본 자동. 글자크기는 12~32, 기본 18                 |
| 전달            | `주는인물` / `받는인물` / `소품`     | 모두 필수. 서로 다른 인물과 요청, 데이터, 열쇠 중 소품                        |

같은 에셋도 서로 다른 ID와 이름표로 여러 인물을 만들 수 있습니다. 역할을 학생·선생님으로 바꾸는 것은 이름표를 바꾸는 것이며 새 그림 에셋을 생성하지 않습니다. 배경·임의 에셋 업로드는 현재 지원하지 않습니다.

### 같은 사람이 여러 컷에서 설명하기

v0.6.0의 `그림: 사람`은 피부·머리·옷·안경을 조합합니다. `페르소나`는 직무·성격·말투를 유지하며 대사를 작성하는 참고 정보입니다. 외형과 페르소나는 만화 전체에서 공유하며, 컷에서는 같은 인물 ID를 참조하고 표정·손·소품을 바꿉니다. 페르소나가 대사나 표정을 자동 생성하지는 않습니다.

```yaml
페르소나:
  분석가:
    {
      직무: 빅데이터 전문가,
      성격: 차분하게 근거를 확인한다,
      말투: 짧은 질문으로 설명한다,
    }
등장인물:
  김대리:
    그림: 사람
    이름표: 김대리
    페르소나: 분석가
    외형: { 옷: 재킷, 옷색: "#5379a7", 안경: true }
컷:
  - 인물: [김대리]
    대사: [{ 화자: 김대리, 내용: "클릭과 구매 전환을 나눠서 보죠." }]
```

인물 안에 `페르소나: {직무: 마케팅 팀장, 말투: 결론부터 질문한다}`처럼 직접 적을 수도 있습니다. 프로필은 직무(1~100자), 성격·말투(각 1~300자) 중 하나 이상이 필요합니다. 프로필에 외형·이름표를 넣거나 다른 프로필을 상속하는 문법은 없습니다.

| 외형 항목 | 값 / 기본값                             |
| --------- | --------------------------------------- |
| 피부색    | `#RGB` 또는 `#RRGGBB`, 기본 `"#f0c8a6"` |
| 머리모양  | 짧은머리(기본), 단발, 긴머리, 민머리    |
| 머리색    | 같은 색상 형식, 기본 `"#47362f"`        |
| 옷        | 셔츠(기본), 재킷, 후드                  |
| 옷색      | 같은 색상 형식, 기본 `"#647bd6"`        |
| 안경      | `true` 또는 `false`(기본)               |

색상은 YAML 주석으로 읽히지 않도록 따옴표로 감싸세요. [김대리·마케팅 팀장·오사원의 네 컷 회의](https://jhs512.github.io/comic-gen/?example=persona-meeting#workspace)와 [같은 세 사람의 Mermaid 설명](https://jhs512.github.io/comic-gen/?example=persona-diagram#workspace)을 시작 예제로 제공합니다. [LLM 가이드](https://jhs512.github.io/comic-gen/llm-guide.md)에는 페르소나에 맞춘 질문·반론·설명 작성 순서와 완전한 회의 코드가 있습니다.

여러 이야기에서 같은 인물을 쓰려면 `등장인물`과 `페르소나` 선언을 함께 재사용합니다. JavaScript에서는 공유하는 `cast`·`personas` 객체에 이야기별 `panels`를 붙인 `JSON.stringify({title, cast, personas, panels})` 문자열을 기존 렌더링 함수에 전달합니다. 사람도 한 컷에 최대 3명이며 기존 SDK 호출·반환 구조는 같습니다. 외형을 수정하면 해당 인물이 등장하는 컷을 다시 그리고, 작성용 페르소나만 수정하면 같은 SVG와 캐시를 유지합니다.

### 표정·손·소품

v0.7.2부터 사람의 `가리키는손`은 옷색 팔·손바닥·손가락을 연결해 그립니다.

v0.7.3부터 도형 캐릭터도 흰색 손바닥·엄지·두께 있는 손가락을 연결해 그립니다. `인사손`은 펼친 손, `가리키는손`은 왼쪽으로 뻗은 손가락으로 구분합니다. 단순한 그림체와 기존 문법·동작 방향은 유지합니다.

v0.7.6에서 손·팔·표정·소품과 말풍선을 다시 그렸습니다. `인사손`은 넓은 손바닥, 길이와 각도가 다른 다섯 손가락, 연결된 팔과 손목, 손 바깥의 곡선으로 인사를 표현합니다. 사람은 피부색과 소매색을 반영합니다. 든소품과 전달이 같은 쪽 손을 사용하면 손 하나를 공유합니다. 그림은 SVG·PNG에 동일하게 저장되는 정적인 표현입니다. 갤러리는 읽기 쉬운 기본 비율로 컷을 표시하며 컷 이동과 크게 보기를 제공합니다.

v0.7.7에서는 좁은 컷에서도 든 소품과 전달 소품을 떨어뜨려 표시합니다. 전달 경로에 다른 인물이 있으면 선과 소품을 그 인물 위로 배치해 전달 물건이 가려지지 않게 합니다.

v0.7.8의 `가리키는손`은 대사에 지정한 상대의 실제 좌우 위치를 향합니다. 같은 컷에 여러 상대를 적으면 화자가 처음 지정한 상대를 향하고, 상대를 생략하면 기존처럼 왼쪽을 가리킵니다. `위가리키는손`은 팔과 검지를 들어 위의 칠판·그림을 가리킵니다. 오른손으로 상대를 가리키면서 소품도 들면 소품은 반대 손에 그립니다. v0.8.0의 `손방향: 왼쪽`/`손방향: 오른쪽`은 이 자동 방향을 바꿉니다. 상대가 없는 쪽의 칠판·물건을 가리키거나 오른쪽 인물에게 인사할 때 씁니다. 손방향은 손모양과 함께 쓰고, `위가리키는손`에는 쓰지 않습니다. 안내 페이지는 실제 그림과 같은 작성 코드를 함께 보여줍니다.

```yaml
인물:
  - { 식별자: web, 표정: 기쁨, 손모양: 인사손, 든소품: 요청 }
  - { 식별자: db, 표정: 어리둥절 }
전달:
  - { 주는인물: db, 받는인물: web, 소품: 데이터 }
```

`든소품`은 인물이 들고 있는 물건, `전달`은 두 인물 사이의 정적인 전달 표현입니다. `인사손`은 왼쪽에 펼친 손, `가리키는손`은 대화 상대 방향의 검지, `위가리키는손`은 왼쪽 팔을 들어 위를 가리키는 검지로 표현합니다. 사람은 생략한 쪽에 기본 손을 그리며 기존 아이콘은 손모양·든소품이 있을 때 손을 표시합니다. v0.8.1의 `전달`은 사람이면 주는 사람이 펼친 손바닥에 소품을 올려 내밀고 받는 사람은 손을 펼쳐 받습니다. 아이콘은 손 없이 소품을 화살표 위에 얹습니다. 같은 두 인물 사이의 여러 전달은 소품을 화살표를 따라 나누어 놓고, 화살표가 짧으면 바로 위로 올립니다. 사람의 인사손·가리키는손은 얼굴 크기에 맞게 작아졌고 `위가리키는손`은 머리 쪽 가장자리에서 검지를 세웁니다. SVG·PNG는 정적인 그림입니다.

### 네 컷과 이전 컷 상속

`컷`에 항목을 추가하면 다음 컷입니다. 매번 인물을 전부 정의할 수도 있습니다. `구성: 이전`을 지정하면 바로 이전 컷의 인물 상태를 이어받고 ID별 변화만 적습니다.

```yaml
제목: 데이터가 도착하기까지
등장인물:
  web: { 그림: 서버, 이름표: 웹 서버 }
  db: { 그림: 데이터베이스, 이름표: DB }
컷:
  - 인물: [{ 식별자: web, 표정: 어리둥절 }, db]
    대사: [{ 화자: web, 상대: db, 내용: "내가 요청한 데이터가 있니?" }]
  - 구성: 이전
    인물: [{ 식별자: db, 표정: 기쁨, 든소품: 데이터 }]
    대사: [{ 화자: db, 상대: web, 내용: "찾았어! 이 데이터를 가져가." }]
  - 구성: 이전
    인물: [{ 식별자: db, 든소품: null }, { 식별자: web, 표정: 기쁨 }]
    전달: [{ 주는인물: db, 받는인물: web, 소품: 데이터 }]
    대사: [{ 화자: web, 상대: db, 내용: "고마워, 이제 응답할 수 있어!" }]
  - 구성: 이전
    인물: [{ 식별자: web, 든소품: 데이터, 손모양: 인사손 }]
    대사: [{ 화자: web, 상대: db, 내용: "다음 요청에서도 함께하자!" }]
```

[네 컷 예제를 바로 수정하기](https://jhs512.github.io/comic-gen/?example=before#workspace)

| 이전 모드에서          | 규칙                                                                  |
| ---------------------- | --------------------------------------------------------------------- |
| 인물 생략              | 이전 인물의 순서·표정·손·든소품·좌표·배율 유지                        |
| 인물의 기존 ID         | 지정한 필드만 덮어쓰기                                                |
| 인물의 새 ID           | 등장인물의 인물을 뒤에 추가, 생략한 설정은 기본값                     |
| 선택 필드의 null       | 초기화. 표정 보통, 배율 1, 좌표 자동, 손/든소품 없음                  |
| 제외인물: [db]         | 이전 인물 제거 후 변경 적용. 없는 ID는 오류                           |
| 인물: []               | 인물 비우기. 현재 최소 1명이 필요하므로 오류. 변화가 없으면 인물 생략 |
| 대사, 전달             | 상속하지 않음. 생략/빈 목록이면 없음, 제공하면 그 컷의 목록으로 대체  |
| 등장인물, 에셋, 이름표 | 만화 전체에서 공유. 컷별로 변경하지 않음                              |
| 첫 컷의 이전           | 이전 컷이 없으므로 오류                                               |
| 구성 생략 또는 전체    | 상속 없이 전체 정의. 제외인물 사용 불가                               |

배경은 현재 지원하지 않으므로 상속 대상도 아닙니다. 뒤 컷을 바꿔도 앞 컷은 변하지 않습니다. 앞 컷의 상속 상태를 변경하면 영향을 받는 이후 컷의 캐시도 갱신됩니다. 대사와 전달은 자동 반복하지 않으므로 각 컷에 다시 적으세요.

### 한 컷에서 다이어그램 설명하기

`다이어그램`은 인물·말풍선과 구분되는 칠판 영역에 표시됩니다. Mermaid의 첫 줄에서 클래스, 시퀀스, 흐름도 등의 종류를 고르고 `원문`에는 Mermaid 문법을 그대로 넣습니다. Comic Gen의 한글 문법 변환은 원문 안의 식별자·명령·라벨을 바꾸지 않습니다.

```yaml
제목: 요청의 순서
등장인물:
  안내자: { 그림: 서버, 이름표: 안내자 }
컷:
  - 인물: [안내자]
    대사: [{ 화자: 안내자, 내용: "조회가 끝나면 응답을 돌려줘요." }]
    다이어그램:
      종류: 머메이드
      제목: 요청에서 응답까지
      높이: 300
      원문: |
        sequenceDiagram
          participant 방문자
          participant 서버
          방문자->>서버: 데이터 요청
          서버-->>방문자: 응답
```

`종류`와 `원문`은 필수입니다. `제목`은 기본 `다이어그램`, `높이`는 160~1200px이며 생략하면 그림의 비율에 맞춰 정합니다. 이 높이는 칠판 영역의 높이입니다. 인물·대사 영역은 별도로 유지하고 컷 높이를 늘려 두 영역이 겹치지 않게 합니다. `구성: 이전`에서도 다이어그램은 상속하지 않으므로 필요한 컷에 다시 작성하세요. 복잡한 그림은 영역을 크게 잡거나 여러 컷으로 나누세요.

다이어그램이 들어간 코드는 `await 컷그리기비동기(source)` 또는 `await 만화그리기비동기(source)`로 그립니다. 기존 동기 함수는 일반 만화를 같은 방식으로 처리하며, 다이어그램 입력에는 비동기 함수 사용을 안내하는 진단을 반환합니다. [클래스](https://jhs512.github.io/comic-gen/gallery.html#uml-class)와 [시퀀스](https://jhs512.github.io/comic-gen/gallery.html#uml-sequence) 예제를 편집기에서 확인할 수 있습니다.

Mermaid 원문은 최대 20,000자입니다. 구조와 일반 텍스트 라벨을 지원하며 링크·외부 이미지·HTML·사용자 CSS·노드/간선 메타데이터(`@{}`)·테마 설정과 init 지시문/frontmatter는 지원하지 않습니다. 외부 참조와 실행 콘텐츠가 포함된 입력은 진단합니다. 출력은 내부 참조만 사용하는 SVG이며 전체 SVG, 개별 컷 SVG, PNG 모두 다이어그램을 포함합니다. SDK 로딩 후에도 Mermaid CDN에 접근할 수 있어야 첫 다이어그램을 그릴 수 있습니다.

Mermaid는 임시 iframe에서 [v0.6.0 렌더링 모듈](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.6.0/cdn/comic-gen.mermaid.js)을 실행하고 `https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs`와 하위 청크를 불러옵니다. 호스트의 AMD 로더(`define`)를 바꾸지 않으므로 Monaco를 사용하는 페이지에서도 함께 사용할 수 있습니다. SDK를 vendor 파일로 포함해도 이 고정 CDN 주소는 유지됩니다. 렌더링이 끝나면 임시 iframe을 제거하며 반환된 SVG·PNG에는 외부 이미지나 Mermaid 모듈 참조가 없습니다.

### 여러 줄과 수동 배치

```yaml
인물:
  - { 식별자: web, 가로위치: 0.25, 세로위치: 0.85, 배율: 0.8 }
  - { 식별자: db, 가로위치: 0.75 }
대사:
  - 화자: web
    상대: db
    가로위치: 0.35
    글자크기: 16
    내용: |-
      첫 번째 줄이에요.
      두 번째 줄은 직접 나눴어요.
```

인물 가로위치는 내부 여백을 제외한 영역, 세로위치는 기본 내용 영역의 비율입니다. 대사 가로위치는 말풍선 중심, 세로위치는 상단입니다. 안전한 범위로 제한되어 최종 좌표는 요청값과 다를 수 있습니다. 좁은 폭에서는 캐릭터를 자동 축소하며 배율은 그 기본 크기에 대한 배율입니다.

스마트폰 비율은 각 컷 SVG의 실제 높이를 기본 비율 대비 2배로 만듭니다. 내용 그룹의 배치는 유지하고 위아래 여백을 더해 그림을 찌그러뜨리거나 말풍선 꼬리를 과도하게 늘리지 않습니다. 너비 명시값은 유지합니다. 플레이그라운드의 컷 비율에서 기본 비율을 선택할 수 있습니다. 전체 컷 높이를 직접 지정하는 SDK 옵션은 현재 없습니다. 다이어그램의 높이는 칠판 영역만 조절합니다.

인물끼리 겹치면 진단합니다. 수동 말풍선과 전달 선의 모든 교차를 자동 회피하지는 않습니다. 자동 배치로 시작한 뒤 조금씩 조절하세요. 긴 한국어와 공백 없는 영어 식별자도 자동 줄바꿈합니다. 자동 번역은 하지 않습니다.

## 활용 예제 지도

| 갤러리 예제                                                                           | 배울 수 있는 것                        |
| ------------------------------------------------------------------------------------- | -------------------------------------- |
| [네 컷 상속](https://jhs512.github.io/comic-gen/gallery.html#before)                  | 이전 상태 유지, 부분 변경, null 초기화 |
| [첫 대화](https://jhs512.github.io/comic-gen/gallery.html#basic)                      | 이름표, 화자와 상대                    |
| [페르소나 회의](https://jhs512.github.io/comic-gen/gallery.html#persona-meeting)      | 외형 유지, 질문·설명·이해의 역할       |
| [페르소나 칠판 설명](https://jhs512.github.io/comic-gen/gallery.html#persona-diagram) | 칠판을 가리키기, 다이어그램과 대화     |
| [인사와 소개](https://jhs512.github.io/comic-gen/gallery.html#welcome)                | 손 흔들기, 상대 위치에 따른 가리키기   |
| [질문과 이해](https://jhs512.github.io/comic-gen/gallery.html#question-answer)        | 의문 → 설명 → 이해의 표정 변화         |
| [열쇠 건네기](https://jhs512.github.io/comic-gen/gallery.html#handoff)                | 보유 → 전달 중 → 상대의 보유           |
| [경청과 감정 변화](https://jhs512.github.io/comic-gen/gallery.html#listening)         | 불만을 듣고 답하기, 불필요한 손 생략   |
| [대화 읽는 순서](https://jhs512.github.io/comic-gen/gallery.html#reading-order)       | 발화 순서와 실제 인물 위치             |
| [요청·응답](https://jhs512.github.io/comic-gen/gallery.html#actions)                  | 3명, 여러 컷, 요청/데이터 전달         |
| [캐시](https://jhs512.github.io/comic-gen/gallery.html#cache)                         | 3컷으로 설명하는 상태 변화             |
| [인증](https://jhs512.github.io/comic-gen/gallery.html#auth)                          | 열쇠, 든소품과 전달                    |
| [재시도](https://jhs512.github.io/comic-gen/gallery.html#retry)                       | 실패와 성공의 표정                     |
| [교육 문답](https://jhs512.github.io/comic-gen/gallery.html#lesson)                   | 학생·선생님·예제의 역할                |
| [짧은 이야기](https://jhs512.github.io/comic-gen/gallery.html#story)                  | 같은 에셋으로 다른 인물                |
| [다섯 표정](https://jhs512.github.io/comic-gen/gallery.html#expressions)              | 5컷의 다섯 표정                        |
| [손 제스처](https://jhs512.github.io/comic-gen/gallery.html#gestures)                 | 인사손, 가리키는손과 손 생략           |
| [한국어·영어](https://jhs512.github.io/comic-gen/gallery.html#languages)              | 여러 줄과 다국어                       |
| [수동 배치](https://jhs512.github.io/comic-gen/gallery.html#manual)                   | 가로위치/세로위치, 배율, 글자크기      |
| [긴 설명](https://jhs512.github.io/comic-gen/gallery.html#long-text)                  | 줄바꿈, 문서 삽입                      |
| [클래스 관계](https://jhs512.github.io/comic-gen/gallery.html#uml-class)              | 한 컷의 칠판, 한글 클래스 라벨         |
| [요청 순서](https://jhs512.github.io/comic-gen/gallery.html#uml-sequence)             | 시퀀스 다이어그램과 인물 대사          |

## 브라우저 SDK: 컷별 SVG가 기본

페이지에 `<div id="preview"></div>`를 만든 뒤 module 스크립트에서 실행하세요. source는 위 예제 같은 YAML 문자열입니다.

```js
import {
  컷그리기비동기,
  렌더러만들기,
  exportPng,
  downloadBlob,
} from "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.8.1/cdn/comic-gen.render.js";
await document.fonts.ready;
const result = await 컷그리기비동기(source, { 너비: 720, 컷비율: "모바일" });
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

| API / 옵션                        | 설명                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| 컷그리기(source, options)         | 일반 만화의 동기 출력. result.panels에 독립 SVG 반환. 기본 컷비율은 모바일                 |
| 컷그리기비동기(source, options)   | 일반 만화와 다이어그램을 처리하는 Promise. 완료 뒤 같은 PanelsResult 반환                  |
| 만화그리기비동기(source, options) | 전체 SVG의 비동기 출력. 기본 컷비율은 기본                                                 |
| result.panels[n]                  | index(0부터), svg, width, height, diagnostics, cache                                       |
| result.diagnostics                | 실패 설명. 실패 시 panels는 빈 배열                                                        |
| result.svg / width / height       | 선택적인 전체 통합 출력. 기본 화면에는 panels 사용                                         |
| 만화그리기(source, options)       | 전체 통합 SVG 반환. 기본 컷비율은 기본                                                     |
| 렌더러만들기(maxCacheBytes)       | 독립 캐시. render(), renderPanels(), renderAsync(), renderPanelsAsync(), clearCache() 제공 |
| 너비                              | 480~2400, 기본 720                                                                         |
| 컷비율                            | 모바일 또는 기본. SVG·PNG에 같은 실제 크기 적용                                            |
| 글꼴                              | 기본 Malgun Gothic, Apple SD Gothic Neo, sans-serif                                        |
| 글꼴버전                          | 외부 글꼴 환경 변경 시 캐시 조건 갱신에 사용                                               |
| exportPng(panelOrComic, scale)    | PNG Blob 반환. 배율 0.5~4, 기본 1                                                          |
| downloadBlob(blob, filename)      | 브라우저 다운로드                                                                          |

`너비`, `컷비율`, `글꼴`, `글꼴버전`은 SDK 호출 옵션이며 YAML 필드가 아닙니다. 반환값의 `result.panels`, `svg`, `width`, `height`, `diagnostics`, `cache`와 PNG 저장 함수 이름은 그대로 사용합니다.

각 컷 SVG는 필요한 에셋을 인라인으로 포함해 단독 파일로 열 수 있습니다. 기본 캐시는 2MB 문자열 예산의 메모리 LRU이며 영구 저장되지 않습니다. 내용·인물·에셋/배치 버전·너비·비율·글꼴 조건이 캐시 키입니다. 변경한 컷만 다시 그리며 이전 컷 상태 변화는 관련 이후 컷도 갱신합니다. 글꼴 로딩 완료 이벤트가 캐시 조건을 갱신합니다. 외부 글꼴 변경 시 `글꼴버전`을 바꾸거나 캐시를 비우세요.

## 완성한 결과에 카드·뷰어 붙이기

렌더링 결과만 사용할 수도 있고, 필요할 때 별도 뷰어를 불러올 수도 있습니다. 페이지에 `<div id="comic-card"></div>`를 준비하세요.

```js
import { renderPanelsAsync } from "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.8.1/cdn/comic-gen.render.js";
import { mountComicCard } from "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.8.1/cdn/comic-gen.viewer.js";

const result = await renderPanelsAsync(source, { panelFormat: "compact" });
if (result.diagnostics.length) throw new Error(result.diagnostics.join("\n"));
const cleanup = mountComicCard(document.querySelector("#comic-card"), result);
// 내용을 교체하거나 페이지 컴포넌트를 제거할 때 호출합니다.
// cleanup();
```

`mountComicCard(container, result)`는 컨테이너에 제목·첫 컷 썸네일·실제 컷 수가 있는 카드를 넣고 정리 함수를 반환합니다. 미리보기를 클릭하거나 키보드로 열면 PC·모바일에 맞는 몰입 화면에서 읽습니다. Mermaid가 있다면 비동기 렌더링을 먼저 완료하고 그 결과를 그대로 전달하세요. 카드를 다시 만들기 전에 이전 정리 함수를 호출합니다.

자체 미리보기나 버튼에 연결하려면 뷰어 컨트롤러를 사용하세요.

```js
import { createComicViewer } from "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.8.1/cdn/comic-gen.viewer.js";

const viewer = createComicViewer();
const trigger = document.querySelector("#read-comic");
const open = () => viewer.open(result, { trigger });
trigger.addEventListener("click", open);
// viewer.isOpen으로 열림 상태를 확인하고 viewer.close()로 닫습니다.
// 컴포넌트 정리 시 trigger.removeEventListener("click", open); viewer.destroy();
```

`open(result, {trigger?})`은 새 결과로 열거나 현재 결과를 교체하고, `close()`는 닫으며, `destroy()`는 뷰어를 폐기합니다. 생성하거나 import하는 것만으로 대화상자나 스타일을 설치하지 않습니다. `cleanup()`과 `destroy()`는 여러 번 호출해도 안전하며 Blob URL, 이벤트, 관찰자, 대화상자와 스크롤 잠금을 정리합니다.

### 독립적인 뷰어 설정 (v0.7.0)

아래 API는 v0.7.0부터 지원합니다. 렌더러와 프레임워크에 종속되지 않습니다. 생성 시 기본값을 지정하고 `open`에서 해당 읽기 세션만 덮어쓸 수 있습니다.

```js
const viewer = createComicViewer({
  closeOnBackdrop: true, // 바깥 배경 클릭으로 닫기
  closeOnEmptyArea: true, // 읽기 영역에서 그림 밖 빈공간 클릭으로 닫기 (v0.7.1)
  closeOnEscape: false, // Escape로 닫기와 독립적
  showCloseButton: true,
  zoom: 1.25,
  preventOverflow: true,
  panelIndex: 0, // result.panels의 0부터 시작하는 인덱스
  onChange(state) {
    // 열기, 사용자 조작, setView 변경 시 읽기 상태; 닫으면 null
    console.log(state);
  },
});
viewer.open(result, { trigger, closeOnEscape: true });
viewer.setView({ zoom: 2, preventOverflow: false, panelIndex: 1 });
console.log(viewer.state); // { zoom: 2, preventOverflow: false, panelIndex: 1 }
viewer.close(); // state는 null
viewer.destroy();

// 기존 두 인자 호출과 cleanup 반환값도 유지됩니다.
const cleanup = mountComicCard(container, result, { closeOnBackdrop: true });
```

| 설정              | 기존과 동일한 기본값 | 의미                                                 |
| ----------------- | -------------------- | ---------------------------------------------------- |
| `closeOnBackdrop` | `false`              | 대화상자 밖 배경에서 시작하고 끝난 클릭으로만 닫기   |
| `closeOnEscape`   | `true`               | Escape로 닫기; `close()`에는 영향 없음               |
| `showCloseButton` | `true`               | 닫기 버튼 표시; 배경·Escape 설정과 독립적            |
| `zoom`            | `1`                  | 원본 너비 대비 배율, `0 < zoom <= 10`                |
| `preventOverflow` | `true`               | 가장 큰 한 컷이 화면 안에 맞도록 실제 표시 크기 제한 |
| `panelIndex`      | `0`                  | 처음 표시할 컷의 인덱스                              |

`zoom`과 화면 맞춤은 독립적입니다. 예를 들어 배율 2를 지정해도 화면 맞춤이 켜져 있으면 화면 안에 들어가도록 크기가 제한됩니다. 크게 확대하고 스크롤해서 읽으려면 `preventOverflow: false`로 설정하세요. `state`와 알림에는 지정한 배율이 들어갑니다.

`setView`는 열린 뷰어의 배율·화면 맞춤·현재 컷을 바꾸며, 한 번의 호출은 한 번의 상태 변경 알림으로 전달됩니다. 잘못된 배율이나 컷 인덱스는 상태를 바꾸기 전에 오류를 냅니다. 닫힌 뷰어에서 호출하면 오류가 납니다. `state`는 읽기 전용 스냅샷입니다. 새로 열 때는 생성 기본값과 그 `open` 옵션으로 다시 시작하므로 이전 읽기 세션의 설정이 다른 만화에 새어 들어가지 않습니다. 콜백 안에서 뷰어를 제어할 때는 같은 상태를 계속 다시 설정하는 루프를 피하세요.

기존 `createComicViewer()`, `open(result, { trigger })`, `mountComicCard(container, result)`의 호출·기본 동작은 유지합니다. 추가 API는 새 버전으로 배포하며 기존 태그와 고정 CDN 파일을 덮어쓰지 않습니다. 메이저 버전만 올려도 `latest` 소비자는 새 코드를 받으므로, 향후 호환성 변경 시에는 버전 고정 안내와 별도 마이그레이션이 필요합니다.

입력 타입 `ComicViewerResult`는 전체 `svg`, `width`, `height`와 읽기 전용 `panels` 목록입니다. 각 컷은 `index`, `svg`, `width`, `height`를 가지며 `diagnostics`는 선택입니다. SDK의 `PanelsResult`를 그대로 전달할 수 있습니다. 실패 결과, 외부 리소스나 실행 콘텐츠가 포함된 SVG는 받지 않습니다. 그림은 Blob 이미지로 표시해 SVG 스타일과 식별자가 호스트 문서에 섞이지 않습니다.

화면 넘침 방지는 **한 컷의 제목·여백까지 포함한 가장 큰 컷**을 읽기 영역의 가로·세로에 맞춥니다. 전체 만화는 원래 배치와 순서를 유지하며 스크롤해서 읽습니다. 체크박스 옆의 100%·150%·200% 보기 크기는 별도로 유지되고, 넘침 방지를 끄면 선택한 크기로 양축 스크롤할 수 있습니다. 컷 왼쪽은 이전, 오른쪽은 다음 컷이며 버튼과 읽기 영역의 ←/→ 키로도 이동합니다. 현재/전체 표시는 실제 1~30컷을 사용하며 30컷을 채우지 않습니다. 닫기·Escape는 호출한 카드나 버튼으로 초점을 돌려줍니다.

CSP를 적용한 호스트는 SDK와 jsDelivr 모듈을 실행하도록 `script-src`에 `'self' https://cdn.jsdelivr.net`을 허용하고, 뷰어를 사용할 때 `img-src`에 `'self' blob:`을 허용하세요. 다이어그램의 임시 iframe에도 호스트의 스크립트 정책이 적용되며, SDK가 삽입하는 UI·측정용 스타일도 사이트의 `style-src` 정책에서 허용되어야 합니다. [CDN 예제](https://jhs512.github.io/comic-gen/cdn.html#optional-viewer)에서 분리 모듈과 완성된 비동기 결과를 연결합니다.

## 문서·Markdown·CodePen 삽입

CodePen의 HTML 영역에 아래 내용을 그대로 넣을 수 있습니다. JavaScript 전처리기나 외부 패키지 설정은 필요 없습니다.

```html
<pre data-comic hidden><code>등장인물:
  web: { 그림: 서버, 이름표: 웹 서버 }
  db: { 그림: 데이터베이스, 이름표: DB }
컷:
  - 인물: [ web, db ]
    대사: [ { 화자: web, 상대: db, 내용: "데이터를 부탁해!" } ]
  - 구성: 이전
    인물: [ { 식별자: db, 표정: 기쁨 } ]
    대사: [ { 화자: db, 상대: web, 내용: "여기 데이터가 있어!" } ]
    전달: [ { 주는인물: db, 받는인물: web, 소품: 데이터 } ]
</code></pre>
<script type="module">
  import { 코드블록그리기비동기 } from "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.8.1/cdn/comic-gen.js";
  await document.fonts.ready;
  await 코드블록그리기비동기();
</script>
```

코드블록그리기비동기(root = document, options = {})는 각 만화를 제목과 첫 컷 썸네일이 있는 카드로 묶습니다. 카드를 클릭하거나 키보드로 열면 전용 뷰어에서 전체 만화를 읽을 수 있습니다. 원문은 오류가 있어도 숨기며 진단만 해당 블록에 표시합니다. `pre > code.language-comic`과 `code.language-comic-gen`을 지원하므로 Markdown의 삼중 백틱 comic-gen 블록을 해당 HTML로 변환하면 연결할 수 있습니다. 필요한 카드·뷰어 스타일은 SDK에 포함되어 있습니다. 내용을 수정한 뒤 다시 호출하면 카드와 열린 뷰어가 갱신됩니다. 비동기 함수는 Mermaid 완료까지 기다리며 이전 요청이 최신 코드를 덮지 않습니다. 기존 코드블록그리기/renderCodeBlocks는 일반 만화에 대한 동기 API로 유지합니다.

문서 삽입도 같은 공용 뷰어를 사용합니다. 기본 컷비율은 `기본`이며 `{ 너비: 1600, 컷비율: "기본" }`처럼 넓은 컷이나 `{ 컷비율: "모바일" }`처럼 모바일 비율을 지정할 수 있습니다. 화면 넘침 방지는 전체를 한 화면에 줄이는 대신 가장 큰 한 컷을 가로·세로에 맞추며, 나머지 컷은 스크롤해서 읽습니다. 현재 데이터 모델은 컷을 세로 순서로 배치하며 임의의 격자·페이지 배치를 정의하는 문법은 없습니다.

HTML에 넣을 때 대사의 &, <, >는 이스케이프하거나 textContent로 설정하세요. 대사는 실행하지 않는 텍스트로 표시합니다. 사이트에서 모듈 스크립트를 허용해야 합니다. slog.gg의 `$$` 문법은 해당 서비스 파서에 별도로 통합해야 하며 호스트가 새 기능을 사용할 때 SDK 버전과 비동기 연결을 함께 갱신해야 합니다.

[기존 CodePen 검증 링크](https://codepen.io/jangka44/pen/PwpKdPz)는 영어 문법의 v0.1.0 실험을 보존합니다. 위 삽입 예제와 공용 뷰어에는 v0.5.0 이상 SDK를 사용하세요.

## 영어 문법 호환

v0.3.0은 기존 영어 YAML 키와 값도 받습니다. 예를 들어 `cast`/`actors`/`dialogue`/`transfer`, `server`, `happy`, `mode: before`를 쓴 이전 코드도 유지할 수 있습니다. 한글과 영어를 섞을 수 있지만 같은 객체에 `표정`과 `expression`처럼 같은 뜻의 키를 둘 다 쓰면 값이 같아도 오류입니다. 한 항목에는 한 이름만 쓰세요. `null`은 한글 문법에서도 표준 YAML 값 그대로 씁니다.

한글 함수 이름 `만화그리기`, `컷그리기`, `코드블록그리기`, `렌더러만들기`는 각각 기존 `renderComic`, `renderPanels`, `renderCodeBlocks`, `createRenderer`와 같은 함수입니다. 기존 영어 옵션 `width`, `panelFormat`, `font`, `fontVersion`과 값 `compact`, `phone`도 호환됩니다. 반환값과 렌더러 객체의 `render`, `renderPanels`, `clearCache` 메서드 이름은 기존 이름을 유지합니다. v0.2.1 고정 SDK에서는 영어 문법과 영어 함수만 사용하세요.

v0.4.0의 `만화그리기비동기`, `컷그리기비동기`, `코드블록그리기비동기`는 `renderComicAsync`, `renderPanelsAsync`, `renderCodeBlocksAsync`와 같은 함수입니다. `렌더러만들기()`의 객체에는 `renderAsync`와 `renderPanelsAsync`도 제공합니다. 새 다이어그램의 영어 호환 문법은 `diagram: { type: mermaid, source: "...", title: "...", height: 300 }`입니다. 같은 객체에 `diagram`과 `다이어그램`처럼 같은 뜻의 두 키를 쓰면 오류입니다.

사람 문법의 영어 항목은 `asset: human`, 최상위 `personas`, 인물의 `persona`·`appearance`입니다. 프로필은 `role`·`personality`·`speechStyle`, 외형은 `skinColor`·`hairStyle`·`hairColor`·`outfit`·`outfitColor`·`glasses`를 사용합니다. 머리 값 `short/bob/long/bald`는 짧은머리/단발/긴머리/민머리, 옷 값 `shirt/jacket/hoodie`는 셔츠/재킷/후드에 대응합니다. [LLM 가이드](https://jhs512.github.io/comic-gen/llm-guide.md)의 영어 문법 호환 표에 전체 대응을 정리했습니다.

## 오류 해결과 한계

- 없는 인물: 등장인물 사전과 컷의 인물 목록에 쓴 ID가 같은지 확인하세요.
- 화자·상대가 컷에 없음: 화자/상대에 쓴 인물을 해당 컷의 인물 목록에 넣으세요.
- 알 수 없는 항목: 키의 철자와 대소문자를 확인하세요.
- 인물 겹침: 가로위치/세로위치를 벌리거나 배율을 줄이고, 자동 배치로 돌아가 보세요.
- 이름표가 너무 김: 현재 두 줄 이내로 줄이세요.
- 첫 컷에 구성: 이전: 첫 컷은 완전히 정의하세요.
- SVG에서 글꼴이 다름: 글꼴을 경로/파일로 포함하지 않습니다. 같은 픽셀이 필요하면 PNG로 저장하세요.

입력은 100,000 문자, 일반 텍스트는 10,000 문자, 다이어그램 원문은 20,000 문자 이내입니다. PNG 최대 크기는 한 변 16,384픽셀, 총 3,200만 픽셀입니다. 많은 컷은 전체 PNG보다 컷별로 저장하세요. 한계 초과 시 설명을 반환합니다.

현재 자동 검증은 Chromium입니다. 모든 브라우저·글꼴에서 동일한 그림을 보장하지 않습니다. 임의 에셋 업로드, 배경, 직접 그림 정의, AI 생성, 계정 저장, 애니메이션, 자동 경로 회피, CLI는 지원하지 않습니다. 원본 SVG는 독립적으로 작성했으며 ComicForge의 코드나 그림을 복사하지 않았습니다.

소품의 받기·버리기·떨어뜨리기·던지기 동작은 별도로 개발 중이며 아직 공개 문법에서 지원하지 않습니다. 현재는 손모양·든소품·전달만 사용하세요.

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

다이어그램 테스트는 고정 Mermaid 배포 파일을 로컬에서 제공해 CI의 외부 네트워크 의존을 없앱니다. 실제 클래스·시퀀스 렌더링, 한글 라벨 픽셀, SVG 식별자·내부 참조, 입력 차단, 비동기 요청 경쟁, 양축 화면 맞춤, 배포 SDK의 지연 로딩과 PNG 저장을 검증합니다.

`dist` 전체와 그 assets 폴더를 정적 서버에 배포하세요. `cdn/`과 `dist/sdk/`에는 호환 SDK, 렌더링 모듈, 뷰어 모듈, Mermaid 렌더링 모듈과 타입 선언이 생성됩니다. main 푸시는 GitHub Actions에서 테스트 후 Pages에 배포합니다. 새 SDK를 배포할 때 package 버전을 올리고 빌드한 CDN 파일을 커밋한 다음 새 태그를 게시합니다. 호환 API는 `src/index.ts`, 분리 API는 `src/renderer.ts`와 `src/viewer-entry.ts`, 입력 검증은 `src/parse.ts`, 배치는 `src/layout.ts`에서 관리합니다.
