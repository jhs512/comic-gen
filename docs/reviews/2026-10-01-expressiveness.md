# 표현력·범용성 독립 설계 리뷰

검토일: 2026-10-01. 검토 대상은 `C:/Users/jangk/.codex/worktrees/9576/comic-gen`, HEAD `3aa169f5c6975263aa0594242df40831560a1999`의 v0.2.1 core와 검토 시작 시점의 미커밋 embed viewer다. 별도 `C:/works/comic-gen`, HEAD `04eff00ef7a4a91585f80c91dd478519f070d448`의 미커밋 actions/뷰어는 미배포 확장 사례로만 다룬다. 이후 진행하는 한글 문법 변경은 이 리뷰의 사실 판단에 포함하지 않는다. 별도 표시 없는 파일·행 참조는 주 작업 트리의 검토 시작 시점 기준이며, 핵심 core 근거는 위 HEAD와 동일하다.

`AGENTS.md`, `docs/agents/domain.md`, `CONTEXT.md`와 codebase-design skill을 읽었다. `docs/adr/`는 없었다. 에셋·에셋 라이브러리·대화 상대·손 제스처·소품은 도메인 문서의 용어를 사용한다. **사실**은 코드나 실행에서 확인한 내용, **추론**은 그 내용이 사용 사례에 미치는 영향, **제안**은 아직 구현하지 않은 선택이다.

## 판단

**추론:** 현재 renderer module은 작은 역할극과 요청·응답 교육 만화를 만들 때 깊이가 있다. 적은 YAML로 인물 재사용, 표정, 대사, 소품 전달, 상태 상속, 줄바꿈, 독립 SVG를 얻는다. 그러나 범용 장면이나 교육 도식을 정의하는 interface는 아니다. 인물·소품·관계 종류와 컷 배치가 닫혀 있고, 수동 좌표도 정해진 대사/인물 영역을 벗어나지 않는다. 이름표를 바꾸면 역할의 의미는 달라지지만 그림의 종류는 그대로다. 근거: `src/model.ts:1-36`, `src/parse.ts:59-66`, `src/parse.ts:79-83`, `src/layout.ts:36-70`, `src/assets.ts:7-45`, `llm-guide.md:46`.

**사실:** 총 등장인물 수가 3명으로 제한되는 것은 아니다. `cast` 전체 개수 제한은 없고 **한 컷의 인물 수**가 1~3명이다. 여러 컷에 인물을 교대하여 등장시키는 것은 가능하다. 컷 수는 1~30개다. 근거: `src/parse.ts:61-74`, `src/parse.ts:181-184`, `src/parse.ts:238-239`.

| 요구 | 현재 가능한 표현 | 구체적 장벽 |
| --- | --- | --- |
| 대화 만화 | 1~3명의 대사·표정·역할 이름표, 여러 컷 | 화면 밖 화자, 독립 캡션, 생각/속삭임 종류, 군중 수신자, 장면·포즈 전환 없음 |
| 요청·응답 교육 | 인물 에셋을 역할로 재사용하고 요청/데이터/열쇠 전달 | 전달선의 장애물 회피·edge label·임의 relation 종류 없음 |
| 여러 컷 이야기 | 30컷까지 세로 순서, 이전 인물 상태 변경 | 2×2 페이지, 컷 span, per-panel 크기, 임의 높이 없음 |
| 교육 도식 | 의인화한 1~3개 역할 사이 설명 | 독립 도형·소품·배경·수학 기호 배치·차트·연결선 라벨 없음 |
| 다양한 인물 관계 | 단일 화자→단일 대화 상대, 두 인물 사이 소품 전달 | group 대상, 화면 밖 대상, 손의 대상 지정, 동작의 시간·물체 identity 없음 |

표의 제한 근거는 아래 재현별로 제시한다. 제한 자체가 모두 결함인 것은 아니다. 이 제품을 범용 만화/도식 생성기로 설명한다면 요구와 구현이 충돌한다는 판단이다.

## 강점: 작은 interface가 실질적으로 숨기는 복잡성

**사실:** `readComic`은 허용 필드·참조·값을 검증하고, `before`를 전체 인물 상태로 정규화한다. 이전 컷 객체를 복사하고 현재 patch만 합치므로 renderer는 full/before를 분기할 필요가 없다. 문자열 ID shorthand와 부분 변경·`null` 초기화를 모두 지원한다. 근거: `src/parse.ts:90-141`, `src/parse.ts:142-179`. `tests/panels.spec.ts:4-79`는 상속과 전체 정의의 SVG 일치, 앞 컷 불변성, 독립 PNG 크기, 캐시 재사용을 검증한다.

**추론:** normalization seam의 locality가 좋다. 호출자에게 이전 컷 상태 병합을 반복 구현하게 하지 않으며, deletion test에서 이 module을 없애면 그 복잡성이 여러 호출자에게 다시 나타난다. 유지할 가치가 있는 depth다.

**사실:** `renderPanels`는 컷별 독립 SVG와 전체 SVG를 동시에 반환한다. 에셋을 SVG markup에 인라인하므로 컷별 export가 별도 에셋 경로를 필요로 하지 않는다. 캐시 조건에는 normalized panel, 해당 cast member, width/font/format/버전이 들어간다. 근거: `src/comic.ts:49-97`, `src/comic.ts:120-136`, `src/layout.ts:113-139`. 긴 한국어와 공백 없는 식별자를 문자 단위로 줄바꿈한다. 근거: `src/layout.ts:6-26`, `tests/authoring.spec.ts:20-53`.

다음 같은 짧은 역할극은 제품의 실제 강점 안에 있다.

```yaml
cast:
  student: {asset: client, label: 학생}
  teacher: {asset: server, label: 선생님}
panels:
  - actors: [{id: student, expression: confused}, teacher]
    dialogue: [{from: student, to: teacher, text: "함수는 무엇인가요?"}]
  - mode: before
    actors: [{id: teacher, expression: happy}]
    dialogue: [{from: teacher, to: student, text: "입력을 규칙에 따라 출력으로 바꿔요."}]
```

**검증 구분:** 이 예제는 파서/배치 코드에 대한 정적 검토 예제다. 기존 guide의 3개 예제는 `tests/llm-guide.spec.ts:9-36`에서 compact/phone의 parse/render 검증 대상이지만, 이번 리뷰에서 그 테스트 전체를 다시 실행하지 않았다.

## E1. 인물 없이 시간을 넘기거나 네 명이 동시에 말하는 컷을 정의할 수 없다

**사실:** `actors` 결과가 0명 또는 4명이면 파서에서 실패한다. 컷에 `caption`도 허용되지 않는다. 근거: `src/parse.ts:79-83`, `src/parse.ts:181-182`; 모델에도 narration/text-only layer가 없다: `src/model.ts:27-31`.

```yaml
cast: {}
panels: [{actors: []}]
```

실행 결과: `컷 1: 캐릭터는 1~3명이어야 합니다.`

```yaml
cast: {a: {asset: server}}
panels: [{actors: [a], caption: "다음 날"}]
```

실행 결과: `컷 1: 알 수 없는 항목 'caption'.`

```yaml
cast:
  a: {asset: client}
  b: {asset: client}
  c: {asset: client}
  d: {asset: client}
panels: [{actors: [a, b, c, d]}]
```

실행 결과: 같은 인물 수 진단.

**추론:** 빈 establishing shot, 장소 전환, 해설 전용 컷, 네 사람 회의는 직접 표현할 수 없다. 해설을 가짜 인물의 대사로 쓰거나 네 사람을 두 컷으로 나누면 설명 정보는 전달할 수 있지만 요청된 장면의 동시성·구성을 잃는다.

**제안 / P2 범위 선택:** 목표가 일반 이야기 만화라면 독립 캡션과 인물 없는 컷을 먼저 지원하는 편이 임의 좌표 필드 추가보다 표현력을 넓힌다. 4명 이상은 단순 숫자 상한 변경으로 끝내지 말고 아래 E2의 공간/배치 전략과 같이 검증해야 한다.

## E2. 좌표는 자유로운 장면 배치가 아니라 제한된 위치 보정이다

**사실:** 인물 y는 `[dialogueHeight + 70·scale, height - 126·scale]`로 clamp한다. `height = dialogueHeight + 254`이므로 scale 1 인물의 세로 이동 범위는 항상 **58px**다. 말풍선은 상단 대사 영역에 clamp되고 인물은 그 아래에 놓인다. `phone`은 이 내용 그룹을 확대하지 않고 여백 안으로 평행 이동한다. 근거: `src/layout.ts:42-46`, `src/layout.ts:64-70`, `src/layout.ts:95-99`, `src/layout.ts:160-165`.

```yaml
cast: {a: {asset: server}, b: {asset: server}}
panels: [{actors: [{id: a, y: 0}, {id: b, y: 1}]}]
```

실행 조건: `renderComic(source, {width: 720, panelFormat: "compact"})`. 실행 결과: 인물 transform은 `translate(198 90) scale(1)` / `translate(522 148) scale(1)`. `0~1` 전체를 지정해도 컷 높이를 마음대로 사용하는 것은 아니다.

**사실:** 인물끼리의 overlap은 error다. 모두에게 컷 전체의 최대 `radius`를 사용하며, 한 인물의 `gesture`나 `holding`이 radius를 60→92로 늘리면 다른 인물들의 자동 배율/안전 영역에도 영향을 준다. 근거: `src/layout.ts:47-78`.

**추론:** 좌우로 늘어선 인물의 크기/높이를 약간 조정하는 작업에는 유용하다. 위·아래 층 구조, 접촉 포즈, 앞뒤 겹침, 카메라 구도, 말풍선이 없는 화면 중앙의 큰 장면 같은 요구에는 장벽이다. scale을 줄이면 사용 가능한 세로 범위가 늘어나는 예외가 있으므로 모든 수직 배치가 불가능하다고 일반화해서는 안 된다.

**제안 / P2:** 다음 layout module은 에셋의 실제 footprint와 relation 경로를 함께 계산하는 internal seam을 가질 수 있다. caller에게 개별 손/소품 좌표·여백 상수를 나열하게 하면 interface가 얕아진다. scene layout 확장이 실제 목표일 때 먼저 모드/정책을 선택하고, 임의 좌표만 추가하는 접근은 피한다.

## E3. 허용된 세 인물 관계도 전달선/소품이 다른 인물을 덮는다

**사실:** 전달선은 두 인물의 손 높이를 직접 잇는 직선이다. 소품은 그 중간에 놓고, 전달 group은 인물 group 다음에 그리므로 그 위에 표시한다. 중간 인물·다른 소품·말풍선에 대한 회피/진단은 없다. 근거: `src/layout.ts:142-157`. guide도 모든 교차를 자동 회피하지 않는다고 명시한다: `llm-guide.md:118`.

```yaml
cast:
  a: {asset: server}
  b: {asset: server}
  c: {asset: server}
panels:
  - actors: [a, b, c]
    transfer: [{from: a, to: c, prop: data}]
```

실행 조건: compact, width 720. 실행 결과는 diagnostics가 빈 목록이고 전체 높이 366px이다. 인물 중심은 `(144,148)`, `(360,148)`, `(576,148)`, 전달선은 `M206 168L514 168`, 소품 transform은 `translate(360 152)`다. 중간 `b`의 몸은 local rect `(-52,-54,104,108)`이므로 panel 좌표 `(308..412,94..202)`이며 **전달선과 소품이 그 몸 가운데를 덮는다**. 몸 근거: `src/assets.ts:16`.

**추론:** 분기·우회·broadcast 교육에서 관계가 잘못 읽히기 쉽다. 현재 오류는 YAML 파싱 실패가 아니라 diagnostics 없이 의미/가독성이 손상되는 그림이다. 양 끝 인물에 대한 참조 검증만으로 의미적으로 읽을 수 있는 관계를 보장하지 않는다.

**제안 / P1 현재 지원 기능의 품질:** 먼저 outer→outer 전달의 중간 인물 회피와 다중 전달의 소품 분리를 layout implementation에서 처리한다. renderer public interface를 그대로 두고 이 3인 관계를 표준 acceptance fixture로 쓰는 것이 depth를 높인다. 자동 우회가 범위 밖이라면 교차 진단과 최소한의 authored routing 정책을 제공해야 한다. 선별 모든 픽셀 waypoint를 강제하면 독자/LLM가 routing implementation을 떠안는다.

## E4. 대화 상대와 손 제스처는 서로 다른 의미이며, group 대화를 직접 지정할 수 없다

**사실:** `from`과 `to`는 현재 컷 인물 ID여야 한다. `to`는 단일 문자열이다. `to` 시각 효과는 화자의 첫 번째 `to`를 찾아 얼굴 전체를 x 방향 ±4px 옮기는 것이다. 화자의 여러 대사를 따라 시선이 바뀌지 않고 몸이나 손의 방향도 바뀌지 않는다. 근거: `src/model.ts:16-20`, `src/parse.ts:193-201`, `src/layout.ts:116-123`.

```yaml
cast: {a: {asset: server}, b: {asset: server}}
panels: [{actors: [a], dialogue: [{from: b, text: "화면 밖에서 부르는 소리"}]}]
```

실행 결과: `컷 1: 화자 'b'가 컷에 없습니다.`

```yaml
cast: {a: {asset: server}, b: {asset: server}, c: {asset: server}}
panels: [{actors: [a, b, c], dialogue: [{from: a, to: [b, c], text: "모두 들어 주세요"}]}]
```

실행 결과: `컷 1.dialogue.to: 비어 있지 않은 문자열이 필요합니다.`

**추론:** `to`를 생략하고 “모두”라고 대사를 쓰면 group 대화의 텍스트를 전달할 수 있다. 그러나 누구에게 말하는지 structured 관계로 남지 않는다. 같은 화자가 두 대화 상대에게 연속 말하는 것은 YAML로 가능하지만 한 정적 얼굴에는 첫 상대만 반영된다. 두 컷으로 나누면 순차 시선 변화는 표현할 수 있다.

**제안 / P2:** 의미적 relation과 정적 pose를 별개로 정의하는 편이 낫다. 실제 요구가 생기면 group/offscreen/narrator 대상을 model에서 표현하고, 시선과 손의 방향은 layout policy 또는 명시적 pose로 정한다. 하나의 `to`가 대사·몸·손·시간 동작을 모두 암묵적으로 정하게 만들면 interface의 숨은 제약이 커진다.

## E5. wave를 정적 포즈·시간 동작·방향 축·대상 의미로 구분해야 한다

**사실:** 현재 `gesture: wave`는 **정적 인사 손 그림**이다. 에셋 markup은 local 왼쪽 손 `cx=-65, cy=-22`와 손 주변의 작은 선 세 개뿐이다. `point`도 local 왼쪽 방향 손/선을 고정으로 그린다. `Actor`에는 반복/지속시간/좌우/대상 ID가 없다. 근거: `src/assets.ts:35-38`, `src/model.ts:9-15`, `src/parse.ts:145-148`, `src/layout.ts:132-139`.

```yaml
cast: {a: {asset: server}, b: {asset: server}}
panels:
  - actors: [{id: a, gesture: wave}, b]
    dialogue: [{from: a, to: b, text: "안녕"}]
```

실행 결과: diagnostics 없음, SVG에 `animate`, `animateTransform`, `animateMotion` element 없음. 오른쪽의 `b`에게 말해도 `a`의 인사 손은 local 왼쪽이다. 이 예제에서 `to: b`는 앞 항목처럼 얼굴만 이동시킨다.

| 축 | 현재 사실 | 의미의 한계 |
| --- | --- | --- |
| 정적 포즈 | wave glyph 하나 | 인사를 상징하는 그림으로 충분할 수 있음 |
| 시간 동작 | 시간·반복·프레임 없음 | 실제 손을 흔드는 애니메이션/사건을 뜻하지 않음 |
| 방향 축 | 에셋 좌표 왼쪽으로 고정 | 왼손/오른손·좌우 인사 방향 선택 불가 |
| 대상 의미 | gesture 대상 필드 없음 | 누가 누구에게 인사했는지는 gesture로 지정 불가 |

**추론:** 작은 motion mark가 있어 독자가 “손을 흔든다”고 해석할 수 있다. 그것은 이미지의 표현 효과이며 시간 model이나 인사 관계가 구현된 증거는 아니다. 이름만 wave에서 더 강한 동사로 바꿔도 기능은 바뀌지 않는다.

**제안 / P2 문법·가이드:** 한글 canonical 값은 `인사손`처럼 정적 그림/손모양을 드러내는 명칭이 현재 구현과 맞는다. `손흔들기`처럼 동작으로 읽히는 명칭을 쓰더라도 “정적인 손 그림, 반복/방향/상대 지정 없음”을 함께 명시한다. future animation이 목표라면 시간 동작을 pose enum에 섞지 않고 별도 scene/time model 요구로 검토한다. 방향과 대상은 서로 독립된 선택이다.

## E6. 소품 전달은 정적 상징이며 물체·관계의 범용 model이 아니다

**사실:** 소품은 `request`, `data`, `key` 세 종류다. `holding`은 오른쪽 고정 손에 한 종류를 표시한다. standalone 소품 위치, 임의 글자/색, 같은 물체의 instance ID는 없다. `transfer`는 `from`, `to`, `prop`뿐이고 전달 후 `holding`을 자동 바꾸지 않는다. 근거: `src/assets.ts:40-45`, `src/model.ts:9-26`, `src/layout.ts:135-157`, `src/parse.ts:215-236`, `llm-guide.md:78`.

```yaml
cast: {a: {asset: client}, b: {asset: client}}
panels:
  - actors: [{id: a, holding: key}, b]
    transfer: [{from: a, to: b, prop: key}]
  - mode: before
```

**정적 사실:** 두 번째 컷은 여전히 `a`가 key를 들고 있으며 `b`는 들지 않는다. 이전 컷의 transfer는 상속되지 않는다. 소유권 변경을 표현하려면 a의 `holding: null`, b의 `holding: key`를 명시해야 한다. 이것은 현재 의도된 authoring semantics다.

```yaml
cast: {a: {asset: server}, b: {asset: server}}
panels: [{actors: [a, b], transfer: [{from: a, to: b, prop: "의존한다"}]}]
```

**정적 사실:** `없는 소품 '의존한다'` 진단 대상이다: `src/parse.ts:228-229`. 따라서 소품 전달을 일반 edge label로 재사용할 수 없다.

**추론:** key를 인증 정보에 비유하는 설명에는 간단해서 좋다. 상속된 상태를 사건의 결과라고 오해하기 쉬우며, 물체 수량/동일성/소유자/자유 배치가 중요한 실험 도식이나 물리 만화에는 맞지 않는다. 임의 relation label/종류가 필요한 교육 도식은 별도 요구다.

**제안 / P2 범위 선택:** 정적 사건 표현을 계속 유지할 경우 상태 변경을 저자 책임으로 분명히 문서화한다. 실제 상태 simulation이 필요할 때만 소품 instance와 사건 결과를 도입한다. 자동 상태 변경을 뒤늦게 기본 동작에 넣으면 기존 before 문법 의미가 달라진다.

## E7. 여러 컷 지원과 페이지 composition 지원은 다르다

**사실:** 전체 SVG는 각 panel group을 y축에 누적하고 `height + 24`만큼 다음 컷을 옮긴다. 모든 컷은 동일 `width`와 `format`을 받는다. options에는 width/font/fontVersion/panelFormat만 있다. 근거: `src/comic.ts:6-11`, `src/comic.ts:53-98`. `panelFormat: phone`은 내용 유지+위아래 여백이다: `src/layout.ts:160-165`, `llm-guide.md:151`.

```yaml
layout: {columns: 2}
cast: {a: {asset: client}}
panels: [{actors: [a]}, {actors: [a]}, {actors: [a]}, {actors: [a]}]
```

**정적 사실:** root allowed key 검증에서 `알 수 없는 항목 'layout'` 실패: `src/parse.ts:59`.

**추론:** 네 컷 이야기 자체는 가능하지만 정사각형 2×2 네 컷 페이지 문법은 없다. host가 `result.panels` 독립 SVG를 CSS grid에 넣는 것은 가능하므로 “SDK로 2×2를 전혀 만들 수 없다”는 주장은 틀리다. 다만 page layout이 YAML에 없어서 코드를 복사한 다른 host에서도 같은 page composition이 자동 재현되지는 않는다. 검토 시작 시점의 미커밋 viewer는 전체 SVG를 유지하면서 확대/축소하므로 읽기 surface 개선이지 composition 문법 확장은 아니다: `src/embed.ts:19-22`, `src/embed.ts:70-91`; 유지 검증: `tests/embed.spec.ts:44-116`.

**제안 / P2:** page composition이 실제 목표라면 독립 panel renderer를 유지하면서 별도 page layout module을 둔다. 의도한 columns/rows/span을 작게 정의하고 상세 offset은 implementation에서 계산한다. host마다 CSS 조합을 반복하게 두는 현재 방식과 portable document composition 중 어떤 요구를 지원할지 명시해야 한다.

## E8. 준비된 에셋 라이브러리를 넘는 시각적 역할은 저자가 이름표로만 흉내 낸다

**사실:** 캐릭터는 원형 client, 둥근 사각 server, 원통 database뿐이다. asset은 고정 Record의 own key를 검사한다. cast는 asset/label만 받고 actor는 컷별 asset/label override를 받지 않는다. background, image, custom SVG 필드는 root/panel/actor에서 허용되지 않는다. 근거: `src/assets.ts:7-23`, `src/parse.ts:59-66`, `src/parse.ts:81`, `src/parse.ts:147`; guide도 명시한다: `llm-guide.md:43-46`.

```yaml
cast: {student: {asset: human, label: 학생}}
panels: [{actors: [student]}]
```

**정적 사실:** `cast.student: 없는 에셋 'human'.` 대상이다. `asset: client`로 바꾸면 학생 역할 이름표가 붙은 원형 캐릭터가 되며 사람 그림이 새로 생성되지 않는다.

**추론:** 역할 중심의 도식적 이야기는 여러 주제로 바꿀 수 있다. 그러나 사람/동물/공간/장치 등 시각 자체가 교육 내용인 요구를 범용적으로 충족하지 못한다. 같은 에셋과 서로 다른 ID를 쓰면 인물 identity는 구분되지만 외형은 같으므로 이름표 의존이 높다.

**제안 / P3 범위 확장:** 실제 사용자 에셋이나 추가 built-in 팩을 요구할 때 자산 입력 seam을 정한다. built-in Record와 실제 custom 에셋이라는 두 adapter가 생기는 요구를 먼저 확보한다. hypothetical plugin interface를 지금 늘려서 depth를 해치기보다, footprint·face anchor·손/소품 anchor 같은 layout 계약을 안정시키는 것이 선행 조건이다. 에셋 교체만 추가해도 현재 global radius와 고정 손 좌표가 맞지 않을 수 있다.

## 미배포 actions 확장에 대한 별도 관찰

**사실 / 보조 트리 전용:** `C:/works/comic-gen/src/model.ts:27-37`은 actions와 `receive/discard/drop/throw`, 좌우 side를 추가한다. 파서는 인물당 하나, 최대 3개로 제한하며 그 인물의 holding/gesture/transfer와 동시에 쓰지 못하게 한다: `C:/works/comic-gen/src/parse.ts:236-252`. layout은 점선 trajectory·ground·impact markup을 그린다: `C:/works/comic-gen/src/layout.ts:160-180`. 이 확장은 주 작업 트리 core v0.2.1의 지원 기능이 아니다. 보조 트리에는 검토 시점 `llm-guide.md`가 없었다.

```yaml
cast: {a: {asset: client}}
panels:
  - actors: [a]
    actions: [{actor: a, type: drop, prop: key, side: left}]
```

**정적 사실:** 보조 파서에서는 지원하는 확장 형태다. 주 파서에서는 `actions`가 unknown panel key다: 주 트리 `src/parse.ts:81`.

**추론:** 원래 holding/transfer로 표현할 수 없던 한 인물의 받기/놓기/버리기/던지기를 정적으로 보여주는 실질적 범위 확장이다. 동시에 새 action enum과 조합 금지 규칙을 저자가 배워야 하므로 interface 비용도 늘었다. gesture·holding·transfer를 하나의 손 점유 자원으로 취급하는 의도가 있지만 그 모델은 금지 규칙으로 노출되어 있다. 좌우 side가 있다고 시간 동작이나 의미적 받는 상대까지 생긴 것은 아니다.

**제안:** 사건을 무작정 enum으로 늘리기 전에 “손의 정적 포즈”, “물체의 상태”, “관계/사건 glyph”, “시간”을 구분해 어디에 depth를 둘지 결정한다. 지금 필요한 동작을 implementation에 숨기면서 semantic relation을 작게 유지하는 편이 caller에게 좌표/금지 조합을 계속 늘어놓는 것보다 낫다.

## 우선순위와 검증 한계

1. **P1 / 현재 약속의 품질:** E3의 outer→outer 전달이 중간 인물을 덮는 경우를 회피/진단하고 다중 관계를 검증한다. 현재 표현 가능한 YAML의 의미를 보존하는 개선이다.
2. **P2 / 문법 의미 명확화:** E5의 정적 인사 손·시간·방향·대상을 구분한다. 좌표/배율은 보정값이며 free canvas가 아니라는 E2의 계약과, transfer가 소유권을 바꾸지 않는 E6의 계약을 가이드에서 유지한다. 문법의 한글화만으로 표현 범위가 넓어지지는 않는다.
3. **P2 / 목표에 따른 기능:** 이야기 만화가 목표면 caption/empty panel, document composition이면 page layout, 관계 도식이면 관계 종류/라벨/라우팅을 먼저 검토한다. 세 방향을 모두 한번에 구현해야 한다는 제안은 아니다.
4. **P3 / 시각 범위:** built-in 외 에셋과 실제 layout footprint/anchor 계약을 함께 설계한다.

**이번 실행 검증:** Node v24.13.1에서 설치된 Playwright Chromium을 headless 실행하고 검토 시작 시점 `cdn/comic-gen.js`를 memory data URL로 로드했다. compact width720에서 E1의 empty/four/caption, E4의 offscreen/group target, E3의 전달 path/인물 transform/소품 transform, E2의 y clamp, E5의 animation element 부재를 확인했다. 코드·테스트 파일·배포는 변경하지 않았다. E3는 실제 SVG DOM geometry로 확인한 겹침이며 screenshot을 수동 판독했다는 주장은 하지 않는다.

**정적 검토 범위:** parser/model/layout/renderer/assets, examples, LLM guide, authoring/actions/layout/visual-connections/panels/cache/export/LLM guide/production/embed tests를 읽었다. 기존 tests는 정상적인 1~3인 사례, 한 번의 좌표 교환, 두 인물 전달 손 높이, 말풍선 꼬리 입구, guide 예제와 상속 equivalence에 유효한 검증을 둔다. 하지만 3인 outer transfer의 obstruction, group/offscreen 관계, 정적 손과 대상 방향의 일치, page composition과 다양한 에셋은 그 검증으로 보장되지 않는다. 대표 근거: `tests/layout.spec.ts:27-60`, `tests/visual-connections.spec.ts:37-65`, `tests/actions.spec.ts:3-31`, `tests/panels.spec.ts:4-79`, `tests/llm-guide.spec.ts:9-36`.

**한계:** 전체 테스트 suite 재실행, 다른 브라우저/글꼴, 모든 수동 말풍선 겹침의 시각 판독, 보조 actions의 실제 render 실행, remote/CDN 배포 상태 확인은 하지 않았다. 지원하지 않는 구조에 대한 판단은 closed parser fields와 model/renderer의 구현을 근거로 한다. 한글 canonical 구현 이후 행 번호나 문법이 변하면 이 문서는 해당 변경 전 snapshot의 리뷰로 읽어야 한다.
