# 독립 설계 리뷰: 직교성·일관성

검토 날짜: 2026-10-01. 주 작업 트리 `C:/Users/jangk/.codex/worktrees/9576/comic-gen`, HEAD `3aa169f`, 공개 핵심 문법 v0.2.1을 기준으로 삼았다. 보조 작업 트리 `C:/works/comic-gen`, HEAD `04eff00`의 미커밋 `actions` 확장은 미배포 사례로 따로 평가한다. 파일 위치는 아래에서 주 작업 트리 기준이며 보조는 별도 표시한다. 소스 코드·문법·배포를 수정하지 않았다.

`AGENTS.md`, `docs/agents/domain.md`, `CONTEXT.md`, `codebase-design/SKILL.md`를 읽었다. 두 트리 모두 `docs/adr/`가 없었다. 현재 도메인의 **손 제스처**, **소품**, **대화 상대**, **에셋 라이브러리** 용어를 따른다. 새 한글 이름은 확정된 도메인 용어가 아니라 제안으로 표시한다.

## 판단

**사실:** 문법은 표정·손 제스처·들고 있는 소품·대사·전달 관계를 독립 필드로 표현한다. `readComic()`는 이전 컷 상속을 완전히 해소한 `Comic`으로 정규화한다. 반면 렌더 구현은 배율·좌표·손 모양·대화 상대 사이에 추가 결합을 만든다. 따라서 **파서가 받아들이는 조합의 자유도와 그림에서 보이는 자유도는 다르다.**

**추론:** 이 설계는 준비된 에셋을 조합하는 정적인 기술 설명 만화에 유용한 depth를 가진다. 사용자는 캐릭터 ID, 소수의 상태, 관계만으로 자동 줄바꿈·배치·독립 SVG·상속을 얻는다. 다만 자동 배치의 결합 규칙까지 알아야 문제를 피할 수 있어 interface가 필드 표보다 커진다. 다음 확장은 문법 항목 추가보다 이 숨은 규칙을 줄이는 쪽에서 더 큰 leverage를 얻는다.

## 강점과 의도적인 독립성

| 조합 축 | 실제 구현 | 평가 |
| --- | --- | --- |
| 역할과 에셋 | `cast`의 ID/label과 asset이 분리됨. `src/model.ts:1–4`, `src/parse.ts:60–74` | 같은 에셋으로 여러 인물 역할을 만들 수 있다. |
| 표정과 캐릭터 모양 | `src/assets.ts:7–34`, `src/layout.ts:114–139` | 세 캐릭터가 동일 표정 에셋을 공유하며 database만 faceY를 달리한다. |
| 손 제스처와 holding | `src/parse.ts:159–175`, `src/layout.ts:132–139` | 파서가 서로 배타적으로 취급하지 않고 SVG를 각각 합성한다. |
| 상태와 전달 관계 | `src/parse.ts:215–232`, `llm-guide.md:78` | transfer는 holding을 요구하거나 다음 컷 상태를 바꾸지 않는다. 정적인 장면 관계임을 가이드도 명시한다. |
| 상속과 렌더 | `src/parse.ts:75–180`, `src/model.ts:27–36` | mode/removeActors가 렌더용 모델에 남지 않아 렌더 구현은 상속 순서를 몰라도 된다. 정규화 seam이 명확하다. |
| full과 before | `tests/panels.spec.ts:4–79` | 4컷의 완전 정의와 부분 정의에서 독립 그림이 같고 앞 컷이 변하지 않는지를 검증한다. |
| 형식과 내용 | `src/layout.ts:160–167`, `llm-guide.md:151` | phone은 내용 배치 이후 여백만 늘린다. 현재 문서 설명과 일치한다. |

최소 조합 예:

```yaml
cast: {a: {asset: server}, b: {asset: database}}
panels:
  - actors: [{id: a, expression: happy, gesture: point, holding: request}, b]
    transfer: [{from: a, to: b, prop: data}]
    dialogue: [{from: a, to: b, text: 받아줘}]
```

**사실:** 이 예의 형태는 `tests/actions.spec.ts:12–25`가 의도적으로 다루는 성공 조합이다. holding의 소품과 transfer의 소품이 달라도 파서가 거부하지 않는다. 이는 물리적 소유권 시뮬레이터가 아니라 그림 조합기라는 현재 모델과 일치한다.

## 높은 우선순위: 한 인물의 손 제스처가 다른 인물의 크기와 렌더 성공 여부를 바꾼다

**사실:** `src/layout.ts:47–55`는 인물별 radius가 아닌 컷 전체의 최대 radius를 계산한다. 손 제스처 또는 holding이 한 명에게만 있어도 모든 인물의 radius가 60에서 92가 된다. 모든 배율에 동일 automaticScale을 곱하고(`:56`), 좌표 클램프(`:57–69`)와 겹침 판정(`:71–79`)에도 이 최대 radius를 쓴다.

최소 재현, SDK 옵션 `{width: 480}`:

```yaml
cast: {a: {asset: server}, b: {asset: database}}
panels:
  - actors: [{id: a, x: 0.25}, {id: b, x: 0.55}]
```

**실행 사실:** 파서 성공, 렌더 diagnostics `[]`. a/b의 transform은 각각 `translate(138 148) scale(1)`, `translate(260.4 148) scale(1)`이다.

```yaml
cast: {a: {asset: server}, b: {asset: database}}
panels:
  - actors: [{id: a, x: 0.25, gesture: wave}, {id: b, x: 0.55}]
```

**실행 사실:** 파서는 성공하지만 렌더는 `캐릭터 'a'와 'b'가 겹칩니다. x/y 또는 scale을 조정하세요.`를 반환하고 SVG를 전부 비운다. wave의 실제 손은 a의 왼쪽에 있는데도 b까지 대칭 최대 radius를 받는다. 이것은 실제 손 그림이 b와 겹쳤다는 판정이 아니라 전역 보호 원의 판정이다.

또 다른 최소 사례는 width 480에서 `actors: [a, b, c]`에 a의 `gesture: wave`만 추가하는 것이다. **실행 사실:** 기본은 전원 scale 1, 변경 후에는 전원 `0.6739130434782609`다. b/c는 상태를 바꾸지 않았는데 작아진다. `tests/layout.spec.ts:27–45`는 3인+held prop이 좁은 폭에서 이웃을 침범하지 않는지 다루지만, 무관한 인물의 크기 변화나 수동 위치+gesture 추가에 따른 성공→실패는 검사하지 않는다.

**추론:** 안전 자동 축소 자체는 필요하지만 현재 최대 radius는 에셋 조합의 locality를 깨뜨린다. 사용자가 인사만 추가해도 위치를 재조정해야 하는 interface다. `before`에서 손 제스처 하나만 바꿔도 같은 문제가 이어진다.

**제안:** 인물별 좌우 extent를 에셋 합성 결과에서 계산하고 충돌을 실제 extent로 판정한다. 전역 자동 축소를 유지한다면 그 정책을 명시적 결과로 드러내고, 무관한 인물 크기가 바뀌는 최소 사례를 공용 렌더 interface를 통해 검증한다. 아직 새 배치 구현을 설계하거나 변경하지 않았다.

## 중간 우선순위: 위치와 크기는 독립 값이 아니라 자동 배치의 제안 값이다

**사실:** 배우 x는 `36 + (width - 72) * x`지만 대사 x는 `width * x`다(`src/layout.ts:59`, `:91`). 같은 `Placement` 형태(`src/model.ts:5–20`)이지만 좌표계는 다르다. 가이드는 차이를 설명한다(`llm-guide.md:64`, `:73`). 이것을 문서 모순으로 분류해서는 안 된다.

**사실:** 인물 y의 원점과 허용 영역은 전체 대사 높이에 의존한다(`src/layout.ts:42–69`). 동일한 `x: 0.25, y: 0.8, scale: 1`에 한 줄 대사를 추가하면 width480에서 인물 y가 148→235로 바뀐다. y 0과 1을 두 인물에게 주어도 기본 scale 1에서 하단 무대의 실제 허용 간격은 겹침 판정의 120보다 작다.

```yaml
cast: {a: {asset: server}, b: {asset: database}}
panels:
  - actors: [{id: a, x: 0.5, y: 0}, {id: b, x: 0.5, y: 1}]
```

**실행 사실:** 파서는 성공, 렌더는 인물 겹침 오류. 위/아래로 떨어진 입력만 보고 수직으로 분리될 것이라고 기대하면 틀린다.

**사실:** automaticScale의 분모에 모든 인물 scale의 최대값을 사용한다(`src/layout.ts:51–56`). width480/3인에서 a만 scale1.25로 바꾸면 최종 배율은 a `1.0333333333333332`, b/c `0.8266666666666667`다.

**추론:** 이 결합은 자동 문서 레이아웃이라는 목적에서 정당화할 수 있다. 그러나 0~1 좌표와 배율이라는 표면만으로는 예측하기 어렵다. 파서 허용 범위는 렌더 가능한 영역을 뜻하지 않는다. 현재 가이드의 클램프·축소 주의(`llm-guide.md:64`, `:162`)는 정확하지만, 수동 위치를 사용해도 자동 영역에서 벗어날 수 없다는 실례가 있으면 interface가 더 명확하다.

**제안:** 좌표가 최종 기하인지 배치 선호인지 명확히 이름/문서에 표현한다. 미래에 자유 배치를 지원할 경우 자동 배치와 수동 배치의 정책 seam을 정하되, 현재처럼 실제 변화가 없는 가상 adapter를 먼저 만들 필요는 없다.

## 중간 우선순위: 대화 상대·얼굴 방향·가리키는 손의 방향은 서로 다르다

최소 예:

```yaml
cast: {a: {asset: server}, b: {asset: database}}
panels:
  - actors: [{id: a, gesture: point}, b]
    dialogue: [{from: a, to: b, text: 너에게 설명해}]
```

**사실:** point 손은 `src/assets.ts:37–38`에서 항상 x=-65, 지시선은 `M-77 0h-13`으로 더 왼쪽을 향한다. renderer가 손을 뒤집지 않는다(`src/layout.ts:132–139`). 반면 얼굴 표정 전체는 오른쪽 대화 상대를 따라 4px 이동한다(`:116–123`). **실행 사실:** a 얼굴 transform `translate(4 0)`, point는 왼쪽 고정이다.

**사실:** 얼굴은 그 인물이 말하는 첫 번째 `to` 지정 대사만 따른다(`src/layout.ts:116–118`). 인물이 `[c, a, b]` 순서로 있을 때 a의 `to:b` 대사를 먼저 두면 +4, `to:c` 대사를 먼저 두면 -4다. 대사 관계의 집합은 같은데 순서 변경으로 얼굴 방향이 바뀐다. 가이드는 `to`를 대화 상대로 설명하나 첫 대사 선택 규칙은 적지 않는다(`llm-guide.md:71`, `:78`).

**추론:** `to`는 대화 상대이며 손 제스처 대상 필드가 아니다. 그러므로 위 예를 파서 결함이라고 부를 수는 없다. 다만 사용자가 point와 to를 같은 대상으로 이해할 때는 맞지 않는 그림이 나온다. 방향 및 대상이 손 제스처와 독립 축으로 모델링되지 않았다는 기능 한계다.

**제안:** 표정, 시선 방향, 손 포즈, 손 포즈의 대상 관계를 분리하여 의미를 정의한다. 대상 기반 자동 방향을 둘 경우 explicit 방향이 대상을 따르는 자동값을 덮는지 결정한다. 대사 순서에서 시선을 유도할 경우 첫 대사를 따르는 현재 정책을 문서화한다.

## 중간 우선순위: 손·소품은 합성되지만 같은 손 자리의 소유권은 없다

**사실:** 앞의 성공 조합에서 holding 손은 actor 로컬 `(58, 20)`이고(`src/layout.ts:135–136`), 오른쪽 transfer의 출발 손은 `(62, 20)`이다(`:149–157`). scale1이면 반지름 11과 9인 손 원의 중심이 4px밖에 떨어지지 않아 겹친다. transfer는 배우/holding 뒤에 그려 덮는다(`:113–159`). gesture까지 있으면 한 인물에 손 그림 세 개가 합성된다.

**추론:** 현재 모델이 추상 아이콘의 합성기라면 이것은 허용할 수 있는 표현이다. 다만 한 사람이 든 물건을 바로 건네는 자연스러운 장면을 일관되게 만들려면 renderer가 같은 손을 공유할지, 동시 행동을 금지할지, 여러 소품을 표현할지 정책이 필요하다. 단순히 파서에서 모든 조합을 금지하면 기존 expressive 조합을 잃는다.

**제안:** 손 anchor와 소품 anchor에 관한 규칙을 한 implementation에 모아 locality를 높인다. semantic 상태 `holding`과 정적인 관계 `transfer`를 유지하되 같은 손 자리의 중복 그림만 해소하는 방식을 먼저 검토한다.

## 중간 우선순위: 대사 수동 배치는 성공 판정과 가독성이 다르다

```yaml
cast: {a: {asset: server}}
panels:
  - actors: [a]
    dialogue: [{from: a, text: first, y: 0}, {from: a, text: second, y: 0}]
```

**실행 사실:** 파서와 렌더 모두 성공, diagnostics `[]`. 두 말풍선 outline의 `d`가 완전히 같다. 뒤 말풍선의 opaque 배경이 앞 대사를 덮는다. `src/layout.ts:87–111`는 말풍선별 좌표를 클램프하지만 서로의 겹침은 검사하지 않는다.

**사실:** `llm-guide.md:118`은 모든 교차를 회피하지 않는다고 알리고, `:167`은 그림을 볼 수 있으면 가독성도 확인하라고 한다. 하지만 `:13`의 diagnostics+SVG 생성 검증은 시각 완성을 보장하지 않는다. `tests/authoring.spec.ts:20–49`는 자동 배치의 텍스트가 자신의 bubble 내부인지 검증하며 bubble 상호 겹침은 검증하지 않는다.

**제안:** 문법/렌더 성공과 시각 품질 검증을 별도로 표현한다. 수동 bubble 겹침은 금지보다 경고가 적절할 수 있다. 사용자 의도상 중첩이 허용될 수 있기 때문이다.

## before·기본값·null의 정확한 의미

**사실:** before는 바로 이전 정규화된 인물 상태를 복사하고, 제거를 적용한 다음 ID별 patch를 합친다(`src/parse.ts:90–134`). 전체 이전 Panel을 복사하지 않는다. 대사와 transfer는 항상 해당 컷에서 새로 읽는다(`:185`, `:215`).

| 입력 위치 | 생략 | null | 빈 목록/문자열 | 근거 |
| --- | --- | --- | --- | --- |
| full actors | 필수이므로 오류 | 목록 타입 오류 | `[]`는 최종 인물 수 오류 | `src/parse.ts:142`, `:181–182` |
| before actors | 인물 상태/순서 유지 | 명시된 빈 patch로 취급되어 인물 전체를 비우고 오류 | `[]`도 인물 전체를 비우고 오류 | `:108`, `:135–136` |
| before removeActors | 제거 없음 | 제거 없음 | `[]` 제거 없음 | `:98–99` |
| full의 인물 선택 필드 | 기본값/없음 | 타입 오류 | 빈 문자열은 오류 | `:151–178` |
| before의 인물 선택 필드 | 기존 상태 유지 | 해당 key를 삭제한 뒤 기본값/없음으로 정규화 | 문자열 필드는 빈 문자열 오류 | `:125–131`, `:151–178` |
| dialogue/transfer 목록 | 빈 목록 | 빈 목록 | `[]` 빈 목록 | `:185`, `:215` |
| dialogue.to/x/y/fontSize | 기본/없음 | 타입 오류 | 문자열 필드는 빈 문자열 오류 | `:194–209` |

**실행 사실:** before `expression:null`은 neutral, full `expression:null`은 문자열 오류다. before `actors:null`은 `[]`와 같은 인물 수 오류다. **가이드 사실:** `llm-guide.md:88`은 null 초기화를 before의 인물 변경 객체에 한정한다. 즉 full/null 차이는 현재 문서와 모순되지 않는다. `actors:null`과 `removeActors:null`의 차이는 가이드에 없고 사용자가 배우는 예외다.

**사실:** before의 ID 문자열은 기본 상태 초기화가 아니라 기존 상태 유지다. `actors:[b,a]`는 기존 `[a,b]`를 재배열하지 않는다. patch는 기존 slot에 합쳐지고 신규 ID만 끝에 추가한다(`src/parse.ts:112–133`; `llm-guide.md:84–87`). 제거한 ID를 같은 컷에서 다시 추가하면 신규 인물로 취급하여 끝에 붙고 기본 상태로 돌아간다.

```yaml
cast: {a: {asset: server}, b: {asset: database}}
panels:
  - actors: [{id: a, expression: happy}, b]
  - mode: before
    removeActors: [a]
    actors: [a]
```

**실행 사실:** 둘째 컷은 `[b, a]`, a는 neutral이다. `removeActors`가 시간상 퇴장/재입장 이벤트가 아니라 snapshot을 만들기 위한 편집 연산이라는 점을 드러낸다.

**추론:** before를 인물 snapshot patch로 이해하면 대부분 일관되며 정규화 module의 좋은 depth다. 다만 똑같은 `actors` 목록이 full에서는 순서 있는 선언, before에서는 ID patch 목록, `[]`일 때는 전체 비우기라는 세 의미를 가져 interface 비용이 늘어난다.

**제안:** 현재 동작은 유지해도 좋지만 한글 canonical 설계에서는 전체 인물 선언과 인물 변경을 이름으로 분리하는 대안을 검토한다. null이 어느 객체에서 초기화인지 명세 표를 유지한다. `actors:null`은 명시적 타입 오류로 만들면 빈 목록 오류와의 암묵 변환을 없앨 수 있다. 변경 제안이며 현 문법 결함을 단정하지 않는다.

## wave의 포즈·동작·방향·대상 의미와 한글 용어 제안

**사실:** `wave`는 `src/assets.ts:35–36`의 왼쪽 손 원 `(−65, −22)`과 세 짧은 선으로 만든 SVG 문자열이다. `src/layout.ts:132–139`는 문자열을 한 번 삽입한다. 이 코드에는 animation, 시간, 주기, 시작/끝 상태, 움직임 보간이 없다. 따라서 그림상 인사/손 흔들기 의미를 담은 **정적인 손 제스처 표식**이다. `before`에서 계속 wave를 상속해도 애니메이션이 진행되는 것이 아니라 같은 표식이 다음 정적인 컷에 존재한다.

| 차원 | 현재 wave/point | 한글 canonical 후보/설명 |
| --- | --- | --- |
| 정적 손 형태 | wave: 왼손을 올린 원+강조선, point: 왼손+왼쪽 지시선 | 기존 도메인 `손 제스처`를 유지하고 내부 설명은 `손 포즈`로 구별. wave 후보 `손들기` 또는 의미 중심 `인사`; point 후보 `가리키기`. |
| 시간 변화 | 없음 | 실제 시계에 따라 바뀌는 기능은 `애니메이션`으로 별도 명명. `손흔들기`라는 이름만으로 시간 재생을 약속하지 않음. |
| 방향/축 | 손 모양이 왼쪽으로 고정 | `방향: 왼쪽/오른쪽`은 독립 축으로 두는 제안. 현재 gesture에는 이 필드가 없음. |
| 대상 | 없음. dialogue.to는 대화 상대 | `대상`은 손짓이나 소품 동작이 향하는 인물 ID로 정의하는 제안. 대화 상대와 같다고 암묵 가정하지 않음. |
| 소품 동작 표식 | 공개 v0.2.1엔 transfer만 있음 | 보조 확장의 `받기`, `버리기`, `내려놓기`, `던지기`는 시간 재생이 없는 동작 표현. 포즈와 구별함. |

**제안:** `손들기`는 관찰 가능한 형태를, `인사`는 장면의 의미를 이름으로 삼는다. 어느 쪽을 canonical로 택할지는 포즈 사전이 형태 중심인지 의미 중심인지 결정한 뒤 통일해야 한다. 현재 wave를 실제 반복 운동이라고 설명하거나 point가 `to`의 인물을 가리킨다고 설명하면 구현과 어긋난다. `내려놓기`는 보조 트리의 예제 표현(`C:/works/comic-gen/src/examples.ts:36–44`)을 따르는 후보이며, 물리적 낙하 의미의 `떨어뜨리기`와 의도 차이가 있어 별도 결정이 필요하다.

## 보조 작업 트리: 미배포 actions 확장의 직교성 비용

**사실:** 보조 `src/model.ts:31–38`은 Panel.actions와 `{actor, type, prop, side}`를 추가한다. type은 receive/discard/drop/throw, side는 left/right다. parser는 side 생략 또는 null을 right로 해석한다(`C:/works/comic-gen/src/parse.ts:236–249`). actions는 이전 컷으로 상속되지 않는다(`:252`; 이전 복사 대상은 여전히 actors).

```yaml
cast: {a: {asset: server}}
panels:
  - actors: [{id: a, gesture: wave}]
    actions: [{actor: a, type: receive, prop: data}]
```

**코드 사실, 보조에서 실행 미검증:** `C:/works/comic-gen/src/parse.ts:248`은 동작 인물에게 holding 또는 gesture가 있거나 어느 transfer의 출발/도착 인물이면 오류를 던진다. 위 입력은 거부된다. before에 기존 wave/holding이 남으면 null patch를 반드시 함께 적어야 한다. 공개 v0.2.1의 `actions`는 알 수 없는 필드이므로 이 확장 예를 공개 사용자에게 유효한 문법으로 안내하면 안 된다.

**사실:** 보조 renderer는 action마다 별도 손·소품·점선 궤적·끝 화살표를 정적으로 추가한다(`C:/works/comic-gen/src/layout.ts:160–180`). `side`는 x 방향 부호를 바꾸지만 drop/throw의 세로 흐름은 type 분기에 박혀 있다. throw는 포물선 제어점과 충격선, drop은 바닥선을 가진다. 실제 시간 변화나 holding 상태 변경은 없다.

**추론:** 손 그림 중복을 막는 목적은 이해되지만 `wave+받기` 같은 자연스러운 조합까지 한꺼번에 금지한다. 공개 조합 규칙과 다른 예외가 생기며 사용자는 새로운 actions를 쓰려면 상속된 상태까지 알아야 한다. action 한 명만 있어도 최대 radius 130이 모든 인물에 적용된다(`보조 src/layout.ts:47–56`)는 기존 전역 결합도 더 커진다.

**제안:** 배포 전에 actions가 '한 손을 점유하는 동작 표식'인지 '인물의 전체 포즈를 대체하는 동작'인지 명확히 결정한다. 앞 경우에는 손별 점유/anchor 정책으로 충돌을 좁힐 수 있고, 뒤 경우에는 대체 규칙을 사용자 언어로 명확히 표현해야 한다. 무조건적인 gesture/holding/transfer 배타성과 null을 통한 제거는 설계 대안 중 하나이지 직교적인 기본값은 아니다. 한글 canonical 전환은 이 의미 결정을 대신할 수 없다.

## 테스트와 검증 한계

**읽은 테스트:** `tests/authoring.spec.ts`, `actions.spec.ts`, `layout.spec.ts`, `panels.spec.ts`, `visual-connections.spec.ts`, `llm-guide.spec.ts`. 기존 테스트는 자동 줄바꿈의 내부 포함, 기본 조합, 좁은 폭 소품, 실제 좌표에 따른 얼굴 이동, before/full 동등성, 독립 export, 가이드의 세 예제 성공을 다룬다. 이들은 사용자가 호출하는 interface를 가로지르는 유의미한 검증이다.

**이번 실행:** 주 트리의 현재 `src/comic.ts`와 `src/parse.ts`를 esbuild `write:false`로 메모리 번들하고 Playwright Chromium의 실제 DOM/canvas에서 입력별 parser 및 renderer 결과를 확인했다. 위에 '실행 사실'로 표기한 진단/transform/null/순서/말풍선 경로는 이 실행에서 얻었다. SDK 기준 width480 또는 명시된 기본 width720, compact 형식이었다. 파일·테스트·빌드 산출물을 새로 만들지 않았다.

**한계:** 전체 테스트 스위트를 다시 실행하지 않았다. browser 숫자/DOM 결과를 검증했고 픽셀 스크린샷의 미학·가독성 전체를 검수하지 않았다. 보조 actions는 소스 읽기로 검토했으며 실행하지 않았다. 실제 공개 호스팅의 현재 HEAD나 캐시를 확인하지 않았다. 예제 통과는 모든 독립 조합의 성공을 증명하지 않는다.

## 권장 순서

1. 공개 핵심의 전역 최대 radius가 만든 과도한 겹침 오류와 무관한 인물 축소를 먼저 해결한다. 배치 입력 일부 변경이 전체 출력 실패로 확장되는 실제 재현이 있다.
2. 한글 canonical을 정하기 전에 정적 포즈, 방향, 대상, 동작 표식, 실제 시간 변화의 뜻을 분리한다. wave/point의 현재 구현을 기준으로 이름을 결정한다.
3. actions 확장의 전면 배타성을 한 손 충돌 정책과 비교 검토한다. 공개 조합을 줄이는 결정을 미배포 확장에서 해결한다.
4. before의 선언/patch/빈 목록 예외와 null 적용 위치를 명시적으로 유지한다. 기존 정규화 seam과 full/before 동등성 검증은 보존한다.
5. diagnostics가 비어 있는 것과 그림이 읽을 수 있는 것은 별개라는 계약을 분명히 하고 수동 bubble 중첩·다중 대화 상대·무관한 인물 크기의 검증을 보강한다.
