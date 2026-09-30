# Comic Gen 문법 설계 종합 리뷰와 한글화 결과

검토일: 2026-10-01. 이 문서는 요청한 GPT 6.1 Sol / ultra 설정으로 진행한 표현력·범용성, 직교성·일관성, 확장성·인터페이스의 세 독립 검토와 실제 재현을 종합한다. **사실**은 소스 또는 실행으로 확인한 내용, **추론**은 사용 사례와 변경 비용에 대한 판단, **제안**은 현재 SDK가 지원하지 않는 후속 설계다.

## 결론

**현재 문법은 준비된 에셋으로 작은 정적 역할극과 기술 설명 만화를 만드는 데 적합하다. 범용 장면·교육 도식·시간 동작을 정의하는 문법으로 보기는 어렵다.** 한글화는 작성 어휘와 접근성을 바꿨으며, 좌표·관계·시간 표현의 범위를 넓힌 변경은 아니다.

| 질문               | 종합 판단                                                                                                                       | 핵심 근거                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 충분히 범용적인가? | 역할 이름표를 바꾸어 여러 주제를 설명할 수 있다. 장면 자체의 범용성은 낮다.                                                     | 컷당 1~3명, 세 캐릭터 그림, 두 손모양, 세 소품, 단일 대화 상대, 인물 없는 컷·캡션·자유 소품·페이지 구성 부재. |
| 직교적인가?        | 표정·손모양·든소품·대사·전달은 문법상 분리되어 있다. 결과 그림에는 숨은 결합이 있다.                                            | 한 명의 손모양이 다른 인물의 배율과 겹침 판정을 바꾸고, 좌표는 대사 높이·자동 축소에 의존한다.                |
| 확장하기 좋은가?   | 작은 외부 interface와 상속을 해소한 내부 모델은 좋은 출발점이다. 반복 확장에는 geometry와 문법 지식의 locality 개선이 필요하다. | normalization은 렌더 구현과 분리되어 있으나 손·소품 치수와 새 동작의 종류·공간 요구가 여러 곳에 퍼진다.       |

권장 방향은 **현재 DSL을 보존하며 진단·geometry·명세의 숨은 규칙을 줄이는 것**이다. 자유 장면이나 시간 재생이 실제 목표라면 별도 scene model을 설계한다. 동사 enum과 좌표 필드만 계속 추가해서 두 제품 범위를 한 문법에 섞는 접근은 피하는 편이 좋다.

## 검토 기준과 결과의 범위

| 구분                    | 기준                                                                                                             | 이 보고서에서의 의미                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 변경 전 주 기준         | `C:/Users/jangk/.codex/worktrees/9576/comic-gen`, commit `3aa169f5c6975263aa0594242df40831560a1999`, core v0.2.1 | parser/model/layout/comic/assets는 해당 commit과 같았다. embed 카드·뷰어 변경은 이미 미커밋 상태였다. |
| 변경 전 보조 기준       | `C:/works/comic-gen`, commit `04eff00ef7a4a91585f80c91dd478519f070d448` + 미커밋 actions·뷰어                    | 주 release의 기능으로 간주하지 않는다.                                                                |
| 이번 주 구현            | 주 작업 트리의 v0.3.0 한글 canonical 문법                                                                        | 키·값·에셋 이름·SDK 옵션·함수 별칭, 작성 예제·가이드·갤러리를 한글 기본으로 바꿨다.                   |
| 보조에 넣은 추가 변경   | 새 `src/syntax.ts`, `src/parse.ts`의 입력 normalization, `src/comic.ts`의 한글 옵션·기본 형식 normalization      | 기존 개발 중 actions·layoutVersion 3·뷰어 구현을 보존한 additive adapter 변경이다. 미배포 상태다.     |
| 최초 검토의 Slog 호스트 | `C:/works/slog-app`의 당시 정적 vendor v0.2.1                                                                    | 아래 실패 재현의 기준이다. 이후 별도 담당이 운영 v0.3.0 적용·검증 완료를 보고했다.                    |

변경 전 파일 상태·hash는 [baseline 기록](C:/Users/jangk/Documents/Codex/2026-10-01/realtime-voice-chat/outputs/comic-gen-review-baseline.json)에 있다. 재현 결과는 [실행 관찰 기록](C:/Users/jangk/Documents/Codex/2026-10-01/realtime-voice-chat/outputs/comic-gen-review-reproductions.json)에 보관했다. 다음 core 근거 링크는 행 번호가 이후 한글화로 바뀌지 않도록 고정 commit을 가리킨다.

세 독립 초안은 [표현력·범용성](2026-10-01-expressiveness.md), [직교성·일관성](2026-10-01-orthogonality.md), [확장성·인터페이스](2026-10-01-extensibility.md)다. 초안은 변경 전 snapshot의 판단을 보존한다. 특히 초안의 “한글 normalization 제안”은 이번 구현 전의 제안이며, 아래 구현 결과와 구분해서 읽어야 한다.

## 현재 문법이 잘하는 일과 범위의 끝

**사실.** 같은 그림을 서로 다른 식별자와 이름표로 재사용할 수 있고, 각 컷의 표정·손모양·든소품을 바꿀 수 있다. `구성: 이전`은 이전 인물 상태를 복사하고 제거·식별자별 patch·`null` 초기화를 적용한 뒤 완전한 컷으로 정규화한다. layout은 상속 문법을 몰라도 된다. [상속 resolver](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/parse.ts#L90-L141), [resolved model](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/model.ts#L27-L36).

**추론.** 이 module은 depth가 있다. 저자는 ID와 소수의 상태·관계를 작성하고, 상속·기본값·참조 검증·줄바꿈·배치·컷별 SVG·캐시를 얻는다. module을 삭제하면 그 implementation 지식이 편집기·갤러리·문서 호스트에 다시 퍼진다. 외부 `만화그리기(원문, 옵션)`/`컷그리기(원문, 옵션)` interface와 normalized 내부 모델은 유지할 가치가 있다.

**사실.** 컷당 인물 수는 1~3명이고 컷은 1~30개다. 만화 전체의 등장인물 사전이 세 명으로 제한되는 것은 아니다. 빈 컷·네 명이 동시에 있는 컷·독립 캡션은 현재 문법에 없다. [인물·컷 제한](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/parse.ts#L181-L184), [컷 허용 항목](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/parse.ts#L79-L83).

| 요구                | 현재 가능한 것                                           | 직접 표현하지 못하는 것                              |
| ------------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| 기술 설명·교육 문답 | 클라이언트·서버·데이터베이스를 학생·선생님·역할로 재사용 | 그림 자체가 사람·동물·장소·수학 도형으로 바뀌는 것   |
| 대화 만화           | 단일 화자와 선택한 단일 대화 상대                        | 화면 밖 화자, 군중 상대, 해설·생각·속삭임 종류       |
| 정적 사건 설명      | 든소품과 두 인물 사이 전달선                             | 물체 instance·수량·소유권 simulation, 임의 관계 라벨 |
| 여러 컷 이야기      | 세로 순서의 최대 30컷, 이전 인물 상태 변경               | portable 2×2 페이지, 컷별 span·크기·임의 높이        |
| 수동 배치           | 자동 영역 안의 위치·배율 보정                            | 자유 canvas, 겹침을 의도한 접촉 포즈, 카메라·앞뒤 층 |

**사실.** 독립 컷 SVG를 호스트 CSS grid에 넣어 2×2로 보여줄 수는 있다. 따라서 SDK로 그런 화면을 전혀 만들 수 없다는 뜻은 아니다. 그 페이지 구성이 YAML에 없어서 source만 다른 호스트로 옮겨도 자동 재현되는 계약이 없다는 뜻이다. 전체 SVG는 y축에 컷을 누적한다. [SVG 합성](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/comic.ts#L53-L98).

**사실.** `전달`은 다음 컷의 `든소품`을 바꾸지 않는다. 이전 컷에 전달을 그린 뒤 다음 컷을 이전 구성으로 만들면 인물의 소품 상태는 그대로이고 전달선은 상속되지 않는다. 이는 정적 그림 조합이라는 현재 계약이다. 자동 소유권 변경을 나중에 기본값으로 넣으면 기존 source의 뜻이 바뀐다. [전달 parsing과 컷 결과](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/parse.ts#L215-L236).

## 문법의 직교성과 결과 그림의 직교성이 다른 사례

### 한 손모양이 다른 인물의 성공·크기를 바꾼다

**사실.** layout은 인물별 footprint 대신 컷 전체의 최대 반경을 사용한다. 한 명에게 손모양·든소품을 넣으면 반경 60 대신 92를 모든 인물의 자동 배율·클램프·충돌 판정에 적용한다. [공통 radius와 scale](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/layout.ts#L46-L81).

다음은 **현재 한글 문법으로 유효한 재현 source**다. SDK 옵션은 `{너비: 480, 컷비율: "기본"}`이다.

```yaml
등장인물: { 가: { 그림: 서버 }, 나: { 그림: 데이터베이스 } }
컷:
  - 인물:
      - { 식별자: 가, 가로위치: 0.25 }
      - { 식별자: 나, 가로위치: 0.55 }
```

**실행 사실.** 손모양이 없을 때는 parsing·rendering이 성공하고 중심은 138, 260.4, 배율은 둘 다 1이다. 가에 `손모양: 인사손`만 추가하면 parsing은 성공하지만 인물 겹침 diagnostics와 빈 SVG를 반환한다. 실제 인사손은 가의 왼쪽에 있지만 나도 같은 대칭 보호 반경을 받는다. 기록의 `observations.plain`과 `observations.wave`가 이 차이를 확인한다.

**추론.** 안전한 자동 축소는 필요하지만 이 정책은 인사 하나를 추가하는 저자에게 다른 인물의 위치·크기 재조정을 요구한다. 이름표·표정·손모양이 독립 필드라는 사실만으로 결과가 독립적으로 바뀌지는 않는다.

### 좌표는 최종 기하가 아니라 제한된 배치 선호다

**사실.** 인물 가로 좌표와 대사 가로 좌표는 같은 0~1 형태지만 서로 다른 영역에 적용된다. 인물 세로 위치는 대사 높이와 배율에 따라 제한된다. scale 1에서는 세로 이동 범위가 58px이고 `모바일` 형식도 그 장면을 늘리는 대신 상하 여백을 추가한다. [좌표·세로 제한](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/layout.ts#L36-L70), [말풍선 좌표](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/layout.ts#L87-L107), [모바일 여백](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/layout.ts#L160-L167).

**추론.** 현재 `가로위치`·`세로위치`를 자유 장면 좌표로 이해하면 실패한다. 가이드가 제한·자동 축소를 설명하는 것은 맞지만, source validation 성공과 layout 가능성을 구분해야 한다.

### 성공 결과도 겹침과 관계 오독을 포함할 수 있다

**실행 사실.** 세 인물 가·나·다를 자동 배치하고 가→다 전달을 그리면 diagnostics는 비어 있다. 중심은 144/360/576, 전달선은 `M206 168L514 168`이고 중간 나의 body 범위는 x 308~412, y 94~202다. 선과 중앙 소품은 나의 몸을 덮는다. 기록의 `observations.cross`와 독립 표현력 리뷰의 DOM geometry 확인이 근거다. [직선 전달과 중앙 소품](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/layout.ts#L142-L157), [서버 body](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/assets.ts#L13-L17).

**실행 사실.** 같은 화자의 대사 둘에 `세로위치: 0`을 지정하면 두 말풍선 outline이 정확히 같아도 diagnostics는 비어 있다. 기록의 `observations.overlappingBubbles`에 동일한 두 path가 있다. 뒤의 불투명 말풍선이 앞 대사를 덮는 것은 해당 합성 순서의 결과다.

**제안.** 현재 지원 범위 안의 품질 개선을 우선한다. 실제 인물별 extent를 사용하고 전달선 장애물 회피 또는 교차 경고를 제공한다. bubble 중첩은 의도일 수 있으므로 일률 금지보다 경고와 시각 검증이 적절할 수 있다. 저자가 모든 경로의 픽셀 waypoint를 작성하게 만드는 방식은 routing implementation을 caller에게 넘겨 interface를 얕게 만든다.

### 진단에는 수정할 컷 위치가 필요하다

**실행 사실.** 첫 컷이 정상이고 둘째 컷에서 같은 좌표의 두 인물이 겹치면 source는 두 컷으로 parsing되지만 결과 SVG는 비며, diagnostics에는 인물 이름만 있고 “컷 2”가 없다. 기록의 `observations.unknownCutFailure`가 확인한다. [layout 오류](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/layout.ts#L71-L79), [오류를 문자열 하나로 반환](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/comic.ts#L109-L116).

**제안.** 기존 `diagnostics: string[]`와 전체 실패 계약은 유지하되 `code`, `path`, `panelIndex`, `message`를 가진 진단 정보를 더한다. LLM이 언어별 오류 문장을 regex로 해석하거나 여러 컷에서 같은 pair를 다시 찾지 않도록 하는 것이 목적이다.

## wave: 포즈·시간·행동 의미·방향/축·대상을 나누어야 한다

**사실.** 기존 `wave`, 현재 `인사손`은 왼쪽 손 원과 짧은 강조선의 SVG를 한 번 합성하는 값이다. 시간·주기·반복·보간·시작/끝 상태는 없으며 실제 애니메이션 요소도 없다. `point`/`가리키는손`도 왼쪽 손과 왼쪽 지시선이다. [손 에셋](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/assets.ts#L35-L39), [한 번의 합성](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/layout.ts#L132-L139).

| 차원          | 현재 구현 사실                       | 후속 설계에서 따로 정할 것                                    |
| ------------- | ------------------------------------ | ------------------------------------------------------------- |
| 정적 포즈     | 인사손·가리키는손이라는 glyph        | 손의 형태, 사용하는 손, body/hand anchor                      |
| 시간          | 없음. 이전 컷 상속도 정적 상태 복사  | duration·repeat·timeline·sampling이 실제로 필요한가           |
| 행동 의미     | 그림을 독자가 인사·가리킴으로 해석   | 인사·건네기 같은 semantic 관계를 별도로 선언할 것인가         |
| 방향과 운동축 | 손은 왼쪽 고정. 선택 항목 없음       | 왼쪽/오른쪽으로 향하는 방향과 좌우/상하 운동축은 서로 다른 값 |
| 대상          | 손모양 대상 없음. 대사의 상대만 있음 | 손짓·소품 동작의 대상 ID, 화면 밖/집단 대상, 방향 유도 정책   |

**사실.** `상대`는 대화 상대이며 손의 대상이 아니다. 얼굴은 그 화자의 첫 번째 상대 지정 대사가 향하는 좌우 방향으로 4px 이동하지만 손·몸은 회전하지 않는다. 대사 순서를 바꾸면 얼굴 방향이 바뀔 수 있다. [첫 상대와 얼굴 이동](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/layout.ts#L116-L123).

**추론.** 강조선을 보고 “손을 흔든다”고 읽는 것은 이미지의 표현 효과다. 이것이 time model이나 인사 관계가 구현되었다는 증거는 아니다. `손흔들기`처럼 더 강한 동사로 이름을 바꾸어도 기능은 늘지 않는다. 이번 canonical 값 `인사손`은 정적인 그림이라는 현재 구현에 맞는다.

**제안.** 향후 방향·대상을 지원한다면 대화 상대, 시선, 손 포즈, 행동 관계를 따로 정의한다. 대상에서 방향을 자동 유도하는 경우 explicit 방향이 우선하는지, 모순을 경고하는지 정해야 한다. 좌우 방향이 생겼다고 시간 재생이나 운동축이 생긴 것으로 설명해서는 안 된다.

## 확장 locality와 deep module의 seam

**사실.** 같은 convention의 표정·소품을 에셋 사전에 추가하면 parser의 이름 검증과 layout lookup을 재사용할 수 있다. 현재 built-in 사전을 둘이 읽는 것 자체는 제품 목적과 맞는다. [에셋 사전](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/assets.ts#L7-L45).

**사실.** `CharacterAsset`에는 body/faceY/color만 있고 bounds·손 anchor는 없다. 반경, 손·소품 좌표, 이름표·body 여백은 layout이 직접 안다. 다른 크기의 body 또는 동작을 넣을 때 그림과 공간 계산의 계약을 함께 바꿔야 한다. [에셋 형태](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/assets.ts#L1-L5), [손·소품 기하](https://github.com/jhs512/comic-gen/blob/3aa169f5c6975263aa0594242df40831560a1999/src/layout.ts#L132-L157).

**사실 / 보조 전용.** actions 실험은 model union, parser의 enum·참조·배타 규칙, layout의 반경 130과 type별 궤적, cache layoutVersion, 예제로 퍼진다. 이것은 문법 기능이 그림까지 이어지는 데 필요한 변경도 포함하므로 파일 수만으로 구조 실패라고 할 수는 없다. 중요한 점은 같은 동작의 종류·공간 요구가 다른 표현으로 여러 곳에서 동기화되어야 한다는 것이다.

**제안.** 에셋·동작 module이 bounds와 anchor, geometry를 함께 소유하게 하고 layout은 그 결과를 배치한다. alias·허용 키·enum의 사전은 작게 공유하며 custom 의미 resolver를 유지한다. `이전` patch·ID 참조·동작 배타성을 모두 일반 schema 하나로 밀어 넣지는 않는다. source shape, 의미 검증, 폰트별 geometry feasibility는 서로 다른 단계다.

## 실질적으로 다른 두 설계 대안

아래 예시는 **미구현 설계안**이다. 현재 v0.3.0 SDK에서 받아들이는 YAML로 제시하는 것이 아니다. 현재 `손모양` scalar나 `구성: 이전`의 의미를 즉시 바꾸자는 제안도 아니다.

### 대안 A: 현재 DSL을 개선하고 정적 포즈와 행동 관계를 추가한다

**제안 interface.** 외부 render 호출과 resolved Comic을 유지한다. 내부 compiler module이 여러 입력 어휘·상속·의미 검증·위치 진단을 숨긴다. 기존 손모양 shorthand는 그대로 지원하고 새 포즈·관계는 명시적인 새 항목으로 추가한다.

```yaml
# 제안: 현재 SDK에서는 미지원
등장인물:
  설명자: { 그림: 서버 }
  청중: { 그림: 클라이언트 }
컷:
  - 인물:
      - 식별자: 설명자
        표정: 기쁨
        손포즈: { 모양: 인사손, 사용하는손: 왼손, 방향: 오른쪽 }
      - 청중
    행동관계:
      - { 종류: 인사, 주체: 설명자, 대상: 청중 }
    동작표식:
      - { 인물: 설명자, 종류: 흔들림, 운동축: 좌우, 표현: 정적강조선 }
    대사: [{ 화자: 설명자, 상대: 청중, 내용: "안녕하세요." }]
```

**의미 제안.** 손포즈는 정적인 상태, 행동관계는 누가 누구에게 무엇을 뜻하는지, 동작표식은 한 그림에 그리는 표현 효과다. `방향: 오른쪽`과 `운동축: 좌우`는 다르다. 위 예시에 시간 재생은 없다. 실제 애니메이션이 필요하다는 별도 요구가 생길 때만 다음 같은 시간 module을 더한다.

```yaml
# 별도 미래 제안: 정적 강조선과 구분되는 시간 재생 요구
시간동작:
  - 종류: 손흔들기
    인물: 설명자
    대상: 청중
    운동축: 좌우
    시작초: 0
    지속초: 1.2
    반복: 3
```

**숨기는 implementation.** 각 glyph의 실제 footprint·손 anchor·충돌·관계 경로는 renderer가 계산한다. caller에게 손/소품별 픽셀 좌표와 금지 조합을 계속 늘리지 않는다. 소품 상태와 정적 전달은 자동 simulation 없이 기존 뜻을 유지한다.

**장점 / 추론.** 기존 작성 코드·호스트·상속 계약을 보존하고 요청한 한글 문법과 자연스럽게 이어진다. 기본 작성은 여전히 짧다. 관찰 가능한 입력·SVG·diagnostics를 같은 외부 seam에서 검증할 수 있다.

**비용 / 추론.** 포즈·행동관계·동작표식이 정말 서로 다른 사용자 요구인지 확인해야 한다. 단순 인사 그림에 세 객체를 매번 요구하면 interface가 더 얕아진다. 기존 shorthand를 default case로 유지하고 정밀 제어가 필요한 때만 새 형태를 쓰게 하는 것이 중요하다. 범용 페이지·차트·자유 에셋의 한계는 이 대안만으로 해결되지 않는다.

### 대안 B: 별도 scene model에서 장면을 계획하고 SVG로 출력한다

**제안 interface.** 현재 만화 DSL은 유지하고, 별도 문법판의 장면 source를 `compileScene → ScenePlan → emitSvg`로 처리한다. ScenePlan에는 확정된 bounds·anchor·텍스트 줄·관계 경로가 들어간다. 현재 DSL은 이 장면 compiler의 간단한 입력 adapter가 될 수 있다.

```yaml
# 제안: 현재 SDK에서는 미지원인 별도 장면 문법
문법판: 장면-1
페이지: { 열: 2 }
장면:
  - 표시영역: { 너비: 720, 높이: 420 }
    인물:
      설명자:
        그림: 서버
        위치: { 가로: 0.25, 세로: 0.6 }
        포즈: { 손: 인사손, 방향: 오른쪽 }
      청중:
        그림: 클라이언트
        위치: { 가로: 0.75, 세로: 0.6 }
    소품:
      열쇠하나: { 그림: 열쇠, 위치: { 가로: 0.5, 세로: 0.8 } }
    캡션: [{ 내용: "다음 날" }]
    관계:
      - { 종류: 인사, 주체: 설명자, 대상: 청중 }
    말풍선:
      - { 화자: 설명자, 상대: 청중, 내용: "다시 만났네요." }
```

**의미 제안.** 인물·독립 소품·캡션·관계·페이지 구성은 별도 층이다. instance ID를 가진 소품이 있어도 소유권 변경을 자동 simulation한다는 뜻은 아니다. 시간 요구는 정적인 ScenePlan과 별도 timeline에서 정의하고 특정 시점의 ScenePlan을 sample하는 방식으로 분리할 수 있다.

**dependency 제안.** text metrics는 실제 브라우저 canvas adapter와 deterministic 테스트 adapter로 공급한다. 실제 glyph 폭·SVG·PNG는 브라우저에서 계속 검증한다. 다른 output implementation이 실제로 필요하기 전에는 Canvas/PDF 등 공개 renderer port를 미리 늘리지 않는다.

**장점 / 추론.** 다양한 크기의 에셋, 독립 소품, 장애물 회피, page composition, 캡션·빈 장면 등 범용 요구를 같은 기하 계획에서 다룰 수 있다. 새 동작의 그림과 공간 요구를 함께 소유하므로 locality가 좋아진다.

**비용 / 추론.** 작은 역할극보다 source와 내부 타입·검증이 커진다. 현재 텍스트·인물 영역을 보존한 자동 layout과 자유 장면의 규칙을 함께 정의해야 한다. 큰 scene graph를 공개하면 저자가 renderer의 배치 implementation까지 배워야 할 수 있다. 한글 alias addition만을 위해 도입할 규모는 아니다.

| 비교            | 대안 A: 개선형 DSL                           | 대안 B: scene model                      |
| --------------- | -------------------------------------------- | ---------------------------------------- |
| 기본 작성 depth | 짧은 기존 문법 유지에 유리                   | 잘 설계한 자동값이 없으면 복잡해짐       |
| 호환성          | 기존 source·render interface 직접 유지       | 기존 DSL 입력 adapter와 별도 문법판 필요 |
| 주요 locality   | 입력 normalization·의미 관계·제한된 geometry | 장면 기하·레이어·관계·페이지 계획        |
| 표현 범위       | 현재 역할극의 정밀도·품질 개선               | 자유 장면·도식·캡션·독립 소품에 유리     |
| 초기 비용       | 작음~중간                                    | 큼                                       |

**추천.** 현재 제품의 다음 단계는 A다. 실제 요청이 빈 컷·캡션인지, portable 페이지인지, 교육 도식인지 먼저 선택하고 작은 기능을 추가한다. 다른 크기의 에셋과 동작이 반복될 때 bounds·anchor와 ScenePlan을 점진적으로 도입한다. 범용 scene이나 시간 재생이 제품 목표로 확정되면 B를 별도 문법판으로 검토한다.

## 이번에 구현한 한글 canonical 문법

**구현 사실.** [현재 `src/syntax.ts`](../../src/syntax.ts)는 객체 위치별 키 사전과 enum 사전을 정의한다. parser는 YAML→unknown tree 이후 이를 English internal representation으로 정규화하고 기존 의미 검증·상속을 수행한다. renderer의 출력 옵션도 같은 방식으로 정규화한다. 언어를 layout 분기로 퍼뜨리지 않았다.

| 위치          | 한글 기본 이름                                         |
| ------------- | ------------------------------------------------------ |
| 만화          | 제목, 등장인물, 컷                                     |
| 등장인물 설정 | 그림, 이름표                                           |
| 컷            | 구성, 인물, 대사, 전달, 제외인물                       |
| 인물          | 식별자, 표정, 손모양, 든소품, 가로위치, 세로위치, 배율 |
| 대사          | 화자, 상대, 내용, 가로위치, 세로위치, 글자크기         |
| 전달          | 주는인물, 받는인물, 소품                               |
| SDK 호출 옵션 | 너비, 글꼴, 글꼴버전, 컷비율                           |

**구현 사실.** 그림 값은 클라이언트/서버/데이터베이스, 표정은 보통/기쁨/어리둥절/슬픔/화남, 손모양은 인사손/가리키는손, 소품은 요청/데이터/열쇠, 구성은 전체/이전, 컷비율은 기본/모바일이다. [한국어 함수 export](../../src/index.ts)는 만화그리기/컷그리기/코드블록그리기/렌더러만들기를 기존 함수의 별칭으로 제공한다. 반환값의 `svg`, `panels`, `diagnostics`, `width`, `height`, `cache`와 렌더러 객체의 `render`, `renderPanels`, `clearCache`, 저장 함수는 실제 개발자용 이름을 유지한다.

현재 주 SDK에서 유효한 최소 예제는 다음과 같다.

```yaml
제목: 요청과 응답
등장인물:
  웹서버: { 그림: 서버, 이름표: 웹 서버 }
  저장소: { 그림: 데이터베이스, 이름표: DB }
컷:
  - 인물: [웹서버, 저장소]
    대사: [{ 화자: 웹서버, 상대: 저장소, 내용: "데이터를 부탁해!" }]
```

**구현 사실.** 영어 legacy도 계속 수용한다. 항목과 값의 언어는 따로 선택할 수 있지만 같은 객체의 한글·영어 alias 두 개는 값이 같아도 오류다. 같은 YAML 키 중복도 오류다. 임의 식별자·cast의 ID 키·이름표·대사 내용은 번역하지 않고 표준 YAML `null`을 그대로 유지한다. alias 충돌의 path는 컨테이너별 한글 이름을 사용한다. 이는 위치가 있는 모든 진단을 구현했다는 뜻은 아니며, 앞서 지적한 geometry 진단의 컷 위치 개선은 후속 과제다.

**구현 사실.** [LLM 가이드](../../llm-guide.md), [README](../../README.md), [작성 안내](../../guide.html), 시작·갤러리 예제가 한글 기본 어휘를 사용한다. 손모양의 정적 의미·왼쪽 고정 방향, 상대와 손의 의미 차이, 전달의 비자동 상태 변경, host 버전 확인, 개발 중 actions의 미지원 범위를 안내한다. 키·enum 사전 공유는 일부 중복을 줄였지만, 범위·기본값·semantic 규칙·guide 표까지 하나의 완전한 typed schema에서 생성하는 구조를 구현한 것은 아니다.

## 보조 actions와 공개 주 SDK를 혼동하지 않기

**구현·실행 사실 / 보조 전용.** C:/works/comic-gen에는 기존 actions 확장을 유지하고 `syntax.ts`·`parse.ts`·`comic.ts`에 입력·옵션 normalization adapter를 추가했다. 한글 RenderOptions와 기본 형식 선택도 주 트리와 같은 내부 정규화를 거친다. 기존 layoutVersion 3·actions 검증·뷰어 구현은 보존했다. `소품동작`의 `인물`, `종류`, `소품`, `방향`과 받기/버리기/떨어뜨리기/던지기, 왼쪽/오른쪽을 해당 영어 actions representation으로 변환한다. 네 종류 모두 한글·영어 source가 같은 SVG를 얻었고 diagnostics가 비었다. 기록의 `development` 결과가 이를 확인하며 보조 typecheck도 통과했다. 이는 공개 배포 검증이 아니다.

```yaml
# 보조 개발 SDK 전용: 현재 공개 주 SDK에는 미지원
등장인물: { 가: { 그림: 서버 } }
컷:
  - 인물: [가]
    소품동작:
      - { 인물: 가, 종류: 받기, 소품: 열쇠, 방향: 왼쪽 }
```

**실행 사실.** 주 SDK는 위 `소품동작`을 unknown panel 항목으로 거부한다. 보조는 동작 인물이 든소품·손모양·전달에 동시에 참여하면 기존 배타 규칙으로 거부한다. 기록의 `developmentConflict`가 이를 확인한다. 한글 adapter는 이 규칙을 완화하거나 시간 동작·대상 필드를 만든 변경이 아니다. `방향`이 있는 보조 소품동작과 방향 필드가 없는 주 손모양도 구분해야 한다.

**추론.** 네 동작은 실제 표현 범위를 넓히지만 포즈·상태·동작 표식과 손 점유를 금지 규칙으로 노출한다. 공개하기 전에 한 손의 anchor 공유와 semantic 배타성 중 어떤 정책을 택할지 검토하는 편이 좋다. 기존 모든 조합을 일괄 금지하는 변경은 작성 자유도를 줄인다.

## Slog 통합: 공개 SDK 게시와 별도의 변경

**최초 검토 시점의 사실.** Slog는 [`C:/works/slog-app/front/src/lib/business/comicGen.ts:34`](C:/works/slog-app/front/src/lib/business/comicGen.ts:34)에서 `./vendor/comic-gen`을 가져온다. 당시 [`vendor/comic-gen.js`](C:/works/slog-app/front/src/lib/business/vendor/comic-gen.js)의 banner는 v0.2.1이고 [`vendor/comic-gen.d.ts:8`](C:/works/slog-app/front/src/lib/business/vendor/comic-gen.d.ts:8)와 [`docs/comic-gen.md`](C:/works/slog-app/docs/comic-gen.md)도 v0.2.1을 기준으로 했다. 보고서 마감 시 다시 확인한 로컬 vendor banner는 별도 담당의 갱신으로 v0.3.0이다. 이는 운영 배포 확인과는 별개다.

**최초 검토 시점의 실행 사실.** 당시 v0.2.1 vendor SDK는 한글 source에 `만화: 알 수 없는 항목 '제목'.`을 반환했다. 영어 source는 성공하고 새 주 renderer의 영어 결과와 동일했다. 기록의 `compatibility.oldKorean`, `oldEnglish`, `newMatchesOldEnglish`, `static`이 근거다. 공개 가이드나 CDN을 갱신해도 정적으로 번들된 vendor는 바뀌지 않는다. 이 실패 기록은 이후 갱신된 v0.3.0 vendor의 결과가 아니다.

**별도 담당의 적용 결과.** Slog 담당은 commit `bbe5351`로 운영 SDK v0.3.0 적용을 완료했다고 보고했다. 한글·영어 입력의 동일 SVG, 기존 공개 글 PC/모바일 카드·뷰어, 운영 기본/VS CODE 미리보기의 저장 없는 브라우저 fixture를 확인했고, 9개 테스트·타입 검사·린트·빌드·Docker 검증이 통과했다고 전달했다. 이는 Slog 담당의 완료 보고이며 이 보고서 작성자가 같은 검증을 다시 실행한 결과는 아니다. `comicGen.ts`가 기존 `renderComic`을 계속 호출해도 새 SDK는 한글 입력을 받으므로 host가 반드시 한국어 함수명으로 바뀌어야 하는 것은 아니다. 이 보고서 작업에서 해당 저장소에 쓰기는 수행하지 않았다.

**호스트 회귀 검증 범위.** 실제 vendored artifact에서 한글 source 성공과 영어 기존 결과 보존, 한글·영어 혼합 및 alias 충돌, 임의 ID/대사 보존을 확인한다. Slog의 게시물·PPT·편집기 미리보기, 다중 블록과 오류 격리, 중첩 펜스·HTML 이스케이프·접이식 영역, PC/모바일 카드·뷰어, 확대·스크롤·키보드·초점 복원, 변경·삭제·unmount cleanup이 검증 대상이다. 별도 저장소의 `front/`에서 사용하는 명령은 `pnpm exec playwright test --config playwright.rendering.config.ts`이며 Slog의 [검증 안내](C:/works/slog-app/docs/comic-gen.md)가 범위를 설명한다. 위 완료 보고의 통과 항목과 더 넓은 검증 대상 목록을 같은 의미로 간주하지 않는다.

## 우선순위와 호환성을 유지하는 단계

| 순서               | 작업                                                                                | 기존 계약을 지키는 방법                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 0 / 이번 release   | 한글 canonical·영어 호환·같은 alias 오류·가이드·실제 host 버전 안내                 | 기존 영어 source와 SVG를 보존하고 새 어휘를 normalization adapter로 수용. host vendor는 별도 갱신.        |
| 1 / 현재 품질      | 인물별 bounds·손 anchor, 전달 obstruction/수동 bubble 경고, 위치가 있는 diagnostics | 공개 render interface 유지. 기존 문자열 diagnostics를 보존한 추가 정보. baseline acceptance cases로 검증. |
| 2 / 의미 명확화    | 포즈·행동관계·방향·운동축·시간을 분리하고 actions 손 점유 정책 결정                 | 현재 인사손·이전 상속·전달의 정적 의미 유지. 새 syntax는 additive 또는 별도 문법판.                       |
| 3 / 실제 요구 선택 | 이야기면 캡션·빈 컷, 문서면 portable page, 도식이면 관계 종류·라벨·라우팅           | 모든 방향을 한 번에 만들지 않음. 새 field/feature가 실제로 요구하는 seam만 추가.                          |
| 4 / 범용 장면·시간 | 별도 scene/timeline model, 다양한 에셋·instance·layer                               | 기존 DSL을 입력 adapter로 보존. breaking grammar에는 명시 version/migration.                              |

캐시용 에셋/배치 revision, package release version, source 문법 능력은 역할이 다르다. 두 작업 트리의 package 숫자가 같더라도 actions 지원 여부가 같다는 뜻은 아니다. LLM의 완료 조건도 parsing 성공·SVG 생성·시각적 가독성·실제 host 실행을 각각 확인해야 한다.

## 검증 상태와 한계

**확인된 근거.** 세 독립 리뷰의 소스·기존 테스트 검토, Chromium의 parser/renderer 및 DOM geometry 관찰, root 재현 JSON의 geometry·host compatibility·보조 네 동작 동등성, 문서 YAML 11개 parsing과 JS snippet 5개 문법 검사가 있다. guide의 실제 script 태그는 보존했고 문서 formatting·diff 검사도 통과했다. 이 증거는 모든 브라우저·글꼴의 시각 품질이나 모든 조합의 성공을 보장하지 않는다. 진단 없음과 읽을 수 있는 그림은 다르다.

**최종 로컬 검증 사실.** 주 v0.3.0의 build와 typecheck가 통과했고 `npx playwright test` 전체 28개가 5.8초에 통과했다. normalization의 optional undefined와 prototype에 걸친 unknown 항목 처리를 보정한 뒤 회귀 검증을 포함해 다시 실행한 결과다. 새 normalization 회귀 테스트 여섯 개는 alias 동등성·같은 항목 중복·데이터 보존 등의 subcase를 다룬다. 보조 typecheck도 통과했고 네 동작의 한글·영어 SVG 동등성과 주 SDK의 `소품동작` 거부는 예상대로 확인했다. 이 변경은 layout의 한국어 진단 문구를 제외하면 geometry를 바꾸지 않았으므로, 앞서 재현한 구조적 겹침·배치·방향 문제는 여전히 후속 개선 대상이다.

**공개 배포 검증 사실.** release commit `290d54fbbd1b44a9c0c3e691f64d5bf1428d40d1`, tag `v0.3.0`을 origin에 게시했다. [GitHub Pages workflow](https://github.com/jhs512/comic-gen/actions/runs/36791897621)의 build·deploy가 성공했고 CI에서 28개 테스트가 통과했다. [공개 LLM 가이드](https://jhs512.github.io/comic-gen/llm-guide.md)와 [자체 호스팅 SDK](https://jhs512.github.io/comic-gen/sdk/comic-gen.js)는 HTTP 200이고 검증한 로컬 파일과 정확히 일치했다.

[고정 v0.3.0 SDK](https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.3.0/cdn/comic-gen.js)도 HTTP 200이며 banner가 v0.3.0이다. 실제 Chromium에서 해당 원격 모듈을 import하여 한글 입력·한국어 함수·너비960/기본 비율의 성공과 영어 입력의 SVG 일치를 확인했다. SHA-256은 `ebe81ba4771ae843dd6bef196f6eed3a5eecd78f66ca22dd3b143bbad3b8874d`다. [원격 SDK 검증 기록](C:/Users/jangk/Documents/Codex/2026-10-01/realtime-voice-chat/outputs/comic-gen-public-sdk-check.json)에 응답·version·exports·동등성 결과가 있다. 브랜치 CDN의 캐시 지연을 피하도록 작성 예제와 CDN 실험 페이지는 고정 v0.3.0 URL을 사용한다. SDK 내용이 달라지는 tag 덮어쓰기는 하지 않았다.

**보조 개발 트리 추가 검증.** 네 소품동작×좌/우 총 여덟 조합의 AST·SVG 동등성, 동작 이름과 같은 ID/대사 문자열의 보존, 방향 생략의 기존 right 기본값을 확인했다. 한국어 옵션 `{너비:960, 컷비율:"모바일"}`과 영어 width/phone의 SVG도 같고, `컷비율:undefined`가 모바일 기본값을 방해하지 않는 것을 [추가 옵션 검증 기록](C:/Users/jangk/Documents/Codex/2026-10-01/realtime-voice-chat/outputs/comic-gen-development-options-check.json)으로 남겼다. 이 트리의 사용자 미커밋 actions/뷰어·17개 개발 예제는 주 release에 합치거나 배포하지 않았다. 정규화 adapter 외 기존 기능 코드는 유지했다. 두 트리가 같은 package 숫자를 쓰더라도 기능 집합은 다르며, 개발 확장 통합 시 사전·허용 항목과 release version을 다시 맞춰야 한다.

**Slog 적용 상태.** 별도 담당의 완료 보고에 따라 운영 v0.3.0 적용과 검증이 완료되었다. Slog commit은 `bbe5351`이며 9개 테스트·타입 검사·린트·빌드·Docker, 한글/영어 SVG 동등성과 PC/모바일 카드·뷰어·운영 미리보기 검증의 통과가 보고되었다. 이 보고서 작성자는 로컬 vendor의 v0.3.0 banner를 별도로 확인했고, Slog 운영 코드·게시물을 직접 수정하거나 이미 통과한 운영 검증을 반복하지 않았다.
