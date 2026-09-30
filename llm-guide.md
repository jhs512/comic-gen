# Comic Gen LLM 작성 가이드

Canonical URL: https://jhs512.github.io/comic-gen/llm-guide.md

이 문서는 LLM이 현재 공개 Comic Gen YAML 문법으로 만화를 작성하거나 수정할 때 읽는 참조입니다. 기준은 v0.2.1의 파서와 에셋 라이브러리입니다. 만화는 준비된 캐릭터 에셋에 이름표, 표정, 손 제스처, 소품, 대사를 조합한 정적인 그림입니다.

## 작성 절차와 출력 형식

1. 설명할 상황을 컷 순서로 나누고 각 컷에 등장할 인물 ID를 정합니다. 인물은 컷마다 1~3명, 전체 컷은 1~30개입니다.
2. `cast`에 사용할 인물을 선언합니다. 같은 에셋을 여러 ID로 재사용하고 `label`로 역할을 표현합니다.
3. 첫 컷은 완전한 `actors` 목록으로 작성합니다. 이후 컷은 완전한 정의 또는 아래 `mode: before` 규칙을 사용합니다. 대사와 전달 관계의 모든 ID가 해당 컷의 인물 목록에 있는지 확인합니다.
4. 아래 허용 필드와 값만 사용합니다. 대사는 YAML 문자열로 인용하고 들여쓰기는 공백 두 칸으로 통일합니다. 숫자는 숫자로, 빈 목록은 `[]`로 작성합니다.
5. 브라우저 SDK를 사용할 수 있으면 코드 펜스 안의 YAML만 `renderComic(source)` 또는 `renderPanels(source)`에 전달합니다. `diagnostics`가 빈 목록이고 SVG가 생성되면 검증 완료입니다. 도구 없이 작성했다면 실행 검증을 했다고 주장하지 않습니다.
6. 채팅 출력은 만화 하나당 **삼중 백틱 `comic-gen` 코드 블록 하나**로 감쌉니다. 블록 안에는 YAML만 넣습니다. 블록 밖에 전체 YAML이나 모든 대사를 반복하지 않습니다.

최소 예제:

```comic-gen
title: 요청과 응답
cast:
  web: {asset: server, label: 웹 서버}
  db: {asset: database, label: DB}
panels:
  - actors: [web, db]
    dialogue:
      - {from: web, to: db, text: "데이터를 부탁해!"}
      - {from: db, to: web, text: "좋아, 바로 찾아볼게!"}
```

`comic-gen`은 Markdown 코드 펜스의 언어 이름입니다. YAML의 필드가 아닙니다. 호스트는 `pre > code.language-comic-gen`으로 변환한 블록을 SDK의 `renderCodeBlocks()`에 연결해야 합니다. 일반 Markdown 뷰어는 코드로 표시할 수 있습니다. SDK의 카드·뷰어 표시 여부는 호스트가 배포한 SDK 버전과 통합에 달려 있습니다.

## 필드와 기본값

파서는 아래 객체별 필드만 허용합니다. 모든 문자열 값은 공백만 있는 값을 제외한 문자열이며 최대 10,000자입니다. ID는 같은 문자열로 일관되게 참조합니다.

### 만화와 인물 사전

| 위치        | 필드     | 규칙 / 기본값                                  |
| ----------- | -------- | ---------------------------------------------- |
| 최상위      | `title`  | 선택 문자열. 생략하면 `Comic Gen`              |
| 최상위      | `cast`   | 필수 객체. 키는 인물 ID, 값은 `{asset, label}` |
| 최상위      | `panels` | 필수 목록. 1~30컷, 목록 순서로 세로 배치       |
| `cast.<id>` | `asset`  | 필수. `client`, `server`, `database`           |
| `cast.<id>` | `label`  | 선택 문자열. 생략하면 인물 ID                  |

`client`는 원형, `server`는 둥근 사각형, `database`는 원통형 에셋입니다. 이야기의 학생·선생님·사용자 같은 역할은 `label`로 표현할 수 있습니다. 현재 문법에는 임의 그림·배경·외부 이미지·에셋 업로드·격자/페이지 배치 필드가 없습니다.

### 컷과 인물 설정

| 위치      | 필드           | 규칙 / 기본값                                                                                  |
| --------- | -------------- | ---------------------------------------------------------------------------------------------- |
| 컷        | `mode`         | `full`(기본) 또는 `before`                                                                     |
| 컷        | `actors`       | `full`에서는 필수. ID 문자열 또는 인물 설정 객체의 목록. 결과 인물 수 1~3명, 같은 ID 중복 불가 |
| 컷        | `removeActors` | `before`에서만 허용. 이전 컷에 있는 제거 ID의 목록                                             |
| 컷        | `dialogue`     | 대사 객체 목록. 생략/`null`이면 빈 목록, 최대 20개                                             |
| 컷        | `transfer`     | 소품 전달 객체 목록. 생략/`null`이면 빈 목록, 최대 6개                                         |
| 인물 설정 | `id`           | 필수. `cast`에 선언한 ID                                                                       |
| 인물 설정 | `expression`   | `neutral`(기본), `happy`, `confused`, `sad`, `angry`                                           |
| 인물 설정 | `gesture`      | 선택. `wave`, `point`. 기본 손 제스처 없음                                                     |
| 인물 설정 | `holding`      | 선택. `request`, `data`, `key`. 기본 들고 있는 소품 없음                                       |
| 인물 설정 | `x`, `y`       | 선택 숫자, 0~1. 기본 자동 배치                                                                 |
| 인물 설정 | `scale`        | 숫자, 0.5~1.25. 기본 1                                                                         |

`actors: [web, db]`는 기본 설정의 두 인물을 뜻합니다. 객체를 쓰면 `{id: web, expression: happy, holding: request}`처럼 설정합니다. 인물 `x`는 컷의 내부 여백을 제외한 영역, `y`는 내용 영역의 비율입니다. 캐릭터 크기와 안전 여백에 따라 좌표가 제한되고 좁은 컷에서는 자동 축소됩니다.

### 대사와 소품 전달

| 위치 | 필드         | 규칙 / 기본값                                                      |
| ---- | ------------ | ------------------------------------------------------------------ |
| 대사 | `from`       | 필수. 해당 컷에 있는 화자 ID                                       |
| 대사 | `to`         | 선택. 해당 컷에 있는 대화 상대 ID                                  |
| 대사 | `text`       | 필수 문자열                                                        |
| 대사 | `x`, `y`     | 선택 숫자, 0~1. 기본 자동 배치. `x`는 말풍선 중심, `y`는 상단 위치 |
| 대사 | `fontSize`   | 숫자, 12~32. 기본 18                                               |
| 전달 | `from`, `to` | 필수. 해당 컷에 있는 서로 다른 두 인물 ID                          |
| 전달 | `prop`       | 필수. `request`, `data`, `key`                                     |

`to`는 대화 상대를 지정합니다. `transfer`는 두 인물 사이에 소품과 전달선을 그리는 정적 표현입니다. 다음 컷의 `holding` 상태를 자동 변경하지 않으므로 직접 작성합니다. 대사 텍스트는 실행되지 않고 그림에 표시됩니다.

## 이전 컷 상속

`mode: before`는 바로 이전 컷의 인물 상태를 복사한 뒤 ID별 변경을 적용합니다. 첫 컷은 `full`로 작성하거나 `mode`를 생략합니다.

- `actors`를 생략하면 이전 인물의 순서·표정·손 제스처·소품·좌표·배율을 유지합니다.
- 기존 ID의 객체는 명시한 필드만 바꿉니다. ID 문자열은 그 인물을 기본 상태로 초기화하지 않고 기존 상태를 유지합니다.
- 새 ID는 목록 뒤에 추가하고 생략한 설정은 기본값을 적용합니다. 새 ID도 `cast`에 선언해야 합니다.
- `removeActors`를 먼저 적용합니다. 이전 컷에 없는 ID를 제거하면 오류입니다.
- 선택 인물 설정의 `null`은 초기화입니다: `expression` → `neutral`, `scale` → 1, `x`/`y` → 자동, `gesture`/`holding` → 없음. 이 초기화 문법은 `before`의 인물 변경 객체에서 사용합니다. `id`는 항상 문자열입니다.
- `actors: []`는 인물을 비우므로 오류입니다. 변화가 없으면 `actors` 자체를 생략합니다.
- 대사와 소품 전달은 상속하지 않습니다. 매 컷 작성하거나 생략해 빈 목록으로 둡니다.
- `cast`는 만화 전체에서 공유합니다. 뒤 컷을 수정해도 앞 컷의 상태는 변하지 않습니다.

검증 가능한 네 컷 예제:

```comic-gen
title: 데이터가 도착하기까지
cast:
  web: {asset: server, label: 웹 서버}
  db: {asset: database, label: DB}
panels:
  - actors: [{id: web, expression: confused}, db]
    dialogue: [{from: web, to: db, text: "데이터가 있니?"}]
  - mode: before
    actors: [{id: db, expression: happy, holding: data}]
    dialogue: [{from: db, to: web, text: "찾았어!"}]
  - mode: before
    actors: [{id: db, holding: null}, {id: web, expression: happy}]
    transfer: [{from: db, to: web, prop: data}]
    dialogue: [{from: web, to: db, text: "고마워!"}]
  - mode: before
    removeActors: [db]
    actors: [{id: web, holding: data, gesture: wave}]
    dialogue: [{from: web, text: "응답을 보낼게."}]
```

## 여러 줄과 수동 배치

자동 배치로 먼저 작성하고 필요할 때만 좌표를 조절합니다. 말풍선과 전달 선의 모든 교차를 자동 회피하지는 않습니다. 긴 이름표는 두 줄 이내로 줄입니다. 여러 줄 대사는 `|-`로 표현할 수 있습니다.

```comic-gen
title: 질문하기
cast:
  student: {asset: client, label: 학생}
  teacher: {asset: server, label: 선생님}
panels:
  - actors:
      - {id: student, x: 0.25, scale: 0.8}
      - {id: teacher, x: 0.75, expression: happy}
    dialogue:
      - from: student
        to: teacher
        x: 0.35
        fontSize: 16
        text: |-
          첫 번째 질문이에요.
          답은 어디서 찾나요?
      - {from: teacher, to: student, text: "예제부터 함께 읽어보자."}
```

## 표시 크기와 레이아웃

`width`, `panelFormat`, `font`, `fontVersion`은 **SDK 호출 옵션**입니다. YAML의 필드로 넣으면 오류입니다.

| 옵션          | 허용 값 / 기본값                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `width`       | 480~2400 숫자, 기본 720                                                                                                     |
| `panelFormat` | `compact` 또는 `phone`. `renderComic`/`renderer.render` 기본 `compact`, `renderPanels`/`renderer.renderPanels` 기본 `phone` |
| `font`        | 글꼴 CSS 문자열. 기본 `Malgun Gothic, Apple SD Gothic Neo, sans-serif`                                                      |
| `fontVersion` | 외부 글꼴이 바뀔 때 캐시 조건을 갱신하는 값                                                                                 |

넓은 컷은 `renderComic(source, {width: 1600, panelFormat: "compact"})`, 모바일 비율은 `renderPanels(source, {panelFormat: "phone"})`처럼 호출합니다. `phone`은 컷의 내용 배치를 유지하면서 위아래 여백을 늘립니다. 컷을 좌우로 재배열하는 문법이나 임의 `height` 옵션은 없습니다. `renderPanels`는 컷별 독립 SVG를 반환하고 전체 SVG도 함께 반환합니다. 가로로 넓은 그림을 좁은 화면에서 읽을 때는 호스트 뷰어에서 원래 배치를 유지한 채 축소·확대·스크롤합니다.

## 오류 수정과 완료 기준

| 진단 / 상황                                  | 수정                                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| 없는 캐릭터 / 에셋 / 표정 / 손 제스처 / 소품 | `cast`의 ID와 위 허용 값으로 맞춤                                               |
| 화자 / 대화 상대 / 전달 대상이 컷에 없음     | 해당 인물을 `actors`에 포함하거나 관계를 제거                                   |
| 중복 캐릭터 ID                               | 같은 컷에 ID당 한 인물만 유지. 같은 에셋의 다른 인물은 다른 ID로 선언           |
| 첫 컷 `before` / `full`의 `removeActors`     | 첫 컷에 완전한 `actors`를 쓰고 제거는 이후 `before`에서 수행                    |
| `actors: []` / 캐릭터 수 범위 오류           | 변화가 없으면 `before`의 `actors`를 생략. 최종 인물 수를 1~3명으로 유지         |
| 캐릭터 겹침                                  | `x`/`y`를 벌리거나 `scale`을 줄이거나 자동 배치로 복원                          |
| 이름표가 너무 김                             | `label`을 두 줄 안에 들어가게 축약                                              |
| 알 수 없는 항목 / YAML 구문 오류             | 객체별 필드 표에 맞추고 들여쓰기·인용부호·중복 키 수정                          |
| 입력 제한                                    | 전체 YAML 100,000자 이하, 문자열마다 10,000자 이하, 컷·대사·전달 개수 제한 준수 |

완료 전에 모든 ID 참조, 허용 필드/값, 상속 후 인물 수, 컷 순서, 출력 펜스를 확인합니다. 검증 도구가 있다면 모든 만화 블록의 `diagnostics`가 비어 있고 필요한 컷 수만큼 SVG가 반환되는지 확인합니다. 그림을 볼 수 있다면 대사와 소품의 가독성도 확인합니다.

구현 근거: [파서](https://github.com/jhs512/comic-gen/blob/main/src/parse.ts), [모델](https://github.com/jhs512/comic-gen/blob/main/src/model.ts), [에셋 라이브러리](https://github.com/jhs512/comic-gen/blob/main/src/assets.ts), [렌더러](https://github.com/jhs512/comic-gen/blob/main/src/comic.ts). 문법이 변경되면 이 가이드와 예제 검증을 함께 갱신합니다.
