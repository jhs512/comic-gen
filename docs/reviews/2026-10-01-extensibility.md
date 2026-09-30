# 확장성·인터페이스 독립 설계 리뷰

검토일: 2026-10-01. 관점: 새 기능의 locality, 문법과 그림 구현의 coupling, 검증·스키마·호환성·LLM 작성 경험, deep module의 seam.

## 검토 범위와 근거 구분

- **주 기준 A**: `C:/Users/jangk/.codex/worktrees/9576/comic-gen`, HEAD `3aa169f5c6975263aa0594242df40831560a1999`, package `0.2.1`. 검토를 시작할 때 parser/model/layout/comic/assets는 HEAD와 같았으며 embed 카드·뷰어 변경은 미커밋 상태였다. 아래 A의 줄 번호는 한글 문법 구현 **이전** 스냅샷이다.
- **보조 기준 B**: `C:/works/comic-gen`, HEAD `04eff00ef7a4a91585f80c91dd478519f070d448`. 미커밋 actions·뷰어 변경은 다른 작업 트리의 진행 중 실험이다. A의 구현·배포 상태로 간주하지 않는다. B의 `package.json:3`에는 `0.3.0` 변경이 있으나 배포 여부는 검증하지 않았다.
- `AGENTS.md`, `docs/agents/domain.md`, `CONTEXT.md`, `codebase-design/SKILL.md`를 읽었다. `docs/adr/`는 검색 결과에 없었다. 도메인 용어는 에셋, 에셋 라이브러리, 대화 상대, 손 제스처, 소품으로 유지한다.
- **사실**은 파일·diff에서 직접 확인한 내용, **추론**은 그 내용이 이후 변경에 미치는 영향, **제안**은 아직 구현되지 않은 설계다. 이 문서는 코드 수정이나 배포를 수행하지 않는다.

## 판단

**현재 외부 렌더링 interface는 깊고 유용하다. 다음 확장 비용의 중심은 공개 메서드 수가 아니라 문법 지식·그림 치수·작성 안내가 여러 곳에서 중복되는 데 있다.** 한글 canonical 문법은 이 구조를 전부 바꾸지 않고 입력 normalization의 internal seam을 마련해 넣을 수 있다. 다른 크기·형태의 에셋이나 소품 동작이 늘어날 때는 별도로 geometry 지식을 모을 필요가 있다.

우선순위는 다음과 같다. 이는 현재 기능의 장애 등급이 아니라 설계 작업 순서다.

1. **P1 / 한글 변경과 함께**: 컨테이너별 alias normalization, 충돌 규칙, 기존 영어 입력과 임의 ID·대사의 보존을 하나의 검증 가능한 interface로 정한다. 허용 키와 enum의 작은 typed descriptor를 공유한다.
2. **P1 / 작성 경험**: 기존 문자열 diagnostics를 유지하면서 위치·코드가 있는 진단 정보를 더한다. 실패 위치가 사라지는 layout 오류가 특히 먼저다.
3. **P2 / 에셋·동작 확장 전**: body bounds와 손·표정·이름표 anchor를 에셋·동작 정의 가까이 둔다. 자동 배치와 SVG 문자열이 같은 치수 가정을 따로 가지지 않게 한다.
4. **P2 / 공개 버전 계약**: SDK 버전, 문법 능력, 에셋 revision, 캐시 revision의 역할을 명확히 한다. 가이드가 어느 SDK를 대상으로 하는지도 함께 알려준다.

## 1. 유지할 만한 깊은 interface

**사실.** 공개 진입점은 `renderComic`, `renderPanels`, `createRenderer`이며 normalized `Comic`나 `renderPanel`은 배포 entry에서 export하지 않는다(A `src/index.ts:1–10`). 호출자는 YAML 문자열과 몇 가지 출력 옵션만 전달한다. `render` 안에서 YAML 읽기, width/font 검증, 컷별 캐시, 컷별·전체 SVG 합성, 오류 결과 변환을 처리한다(A `src/comic.ts:30–117`).

**사실.** `mode: before`의 patch, 제거, null 초기화는 parser에서 해결한다(A `src/parse.ts:90–141`). 반환하는 `Panel`에는 actors/dialogue/transfer만 있고 mode/removeActors는 없다(A `src/model.ts:27–36`, `src/parse.ts:235–244`). layout은 컷이 어떻게 작성되었는지 몰라도 된다.

**추론.** 이 seam은 depth와 leverage가 있다. 삭제하면 각 편집기·갤러리·문서 호스트가 상속·기본값·캐시·SVG wrapper의 지식을 다시 가져야 한다. 한글 입력을 추가한다고 renderer에 한글/영어 분기나 source 문법 union을 퍼뜨릴 이유가 없다. resolved English IR은 적절한 내부 표현이다.

**사실.** 캐시 키에는 normalized panel과 그 컷에 사용한 cast member만 들어간다(A `src/comic.ts:55–69`). full와 before를 같은 결과로 작성한 테스트는 컷 그림 동등성과 앞 컷 불변성, 수정 시 세 컷의 재사용을 확인한다(A `tests/panels.spec.ts:4–78`).

**추론.** alias normalization을 상속·검증 전 단계에서 끝내면, 같은 뜻의 영어·한글 코드가 같은 normalized IR과 같은 캐시 키를 얻을 수 있다. 이것은 언어를 바꾸어 작성한 결과의 동등성을 검사할 자연스러운 관찰점이다.

## 2. 새 기능의 locality: 전부 나쁜 coupling은 아니다

| 변경 | A에서 직접 보이는 수정 지점 | 판단 |
| --- | --- | --- |
| 같은 좌표 convention의 표정·소품 하나 추가 | `src/assets.ts:24–45`, 작성 안내·예제 | parser와 layout은 사전 lookup을 하므로 구현 locality가 좋다. |
| 다른 모양·크기의 캐릭터 추가 | `src/assets.ts:1–23`, `src/layout.ts:46–81/113–157` | 이름 등록은 한 곳이지만 geometry contract가 암묵적이다. |
| 인물 설정 필드 추가 | `src/model.ts:9–15`, `src/parse.ts:115–119/145–179`, layout, 가이드 | before patch와 full actor의 허용 키가 별도 배열이어서 한 곳을 놓칠 수 있다. |
| 소품 동작 추가 | B의 model, parse, layout, cache revision, examples | 실제 실험이 의미 검증·공간 확보·SVG 표시까지 퍼지는 모습을 보여준다. |
| 새 입력 언어 | 현재 A에는 영어 문법만 있음 | normalized IR 앞의 internal seam이면 layout/model의 언어 의존을 피할 수 있다. |

**사실.** A의 `parse.ts:2`와 `layout.ts:1`은 동일한 built-in 에셋 사전을 읽는다. parser는 이름의 유효성을 검사하고(A `65–66`, `157–170`, `228–229`), layout은 해당 SVG를 선택한다(A `115`, `133–139`, `157`).

**추론.** 준비된 에셋 라이브러리만 사용하는 현재 제품에서 이것은 자연스러운 지식 공유다. 사전 이름 하나 추가를 위해 generic asset provider나 외부 plugin interface를 만드는 것은 depth를 늘리지 않을 수 있다. 에셋 사전과 문법 정책이 달라질 실제 요구가 생기기 전에는 public extension interface를 늘릴 필요가 없다.

**사실.** 반면 `CharacterAsset`의 명시적 정보는 body/faceY/color뿐이다(A `src/assets.ts:1–5`). layout은 모든 캐릭터의 기본 반경 60, 손·소품 있을 때 92, 몸·이름표 공간 254, 꼬리 끝 65, 전달 손 62 같은 치수를 직접 알고 있다(A `src/layout.ts:46–55`, `65–78`, `106`, `136`, `139`, `150–154`).

**최소 예시 / 추론.** 몸 SVG의 폭을 104에서 220으로 바꿔도 `CharacterAsset`의 타입이나 parser는 알려주지 않는다. 기존 radius 60과 같은 축소·겹침 검사로 그림을 배치하므로 넓은 body가 이웃과 겹칠 수 있다. 이는 재현 완료한 버그가 아니라, metadata가 그 계약을 표현하지 못한다는 변경 위험이다.

**제안.** 기본 에셋 라이브러리 안에서 `bounds`, `faceAnchor`, `handAnchors`, `labelAnchor`를 묶어 제공한다. SVG 문자열과 치수의 두 벌 정의를 만들지 않는다. 기존 세 캐릭터가 공통 convention을 쓰면 그 공통값을 기본 정의로 둘 수 있다. 사용자 에셋 업로드나 generic renderer plugin은 이 제안의 전제가 아니다.

## 3. B의 actions 실험이 보여주는 실제 확장 경로

**사실.** 다음 변경은 B의 진행 중 diff에만 있다.

| 파일·줄 | 변경 사실 | 그 파일이 알아야 하는 지식 |
| --- | --- | --- |
| B `src/model.ts:27–37` | Panel.actions와 receive/discard/drop/throw union 추가 | normalized 동작의 표현 |
| B `src/parse.ts:79–83/236–252` | 허용 키, actor/prop/type/side 검증, holding/gesture/transfer와 배타, actor당 한 동작·최대 세 동작 | source 문법과 의미 제약 |
| B `src/layout.ts:47–54` | 동작 있는 인물 때문에 전 컷의 공통 radius를 130으로 확대 | 동작의 공간 요구 |
| B `src/layout.ts:160–180` | 동작 type별 궤적·소품·바닥·충돌 표시 분기 | 동작별 그림 구현 |
| B `src/comic.ts:67` | layoutVersion 2→3 | 캐시 revision |
| B `src/examples.ts:36–46` | 네 동작을 쓰는 예제 추가 | 사용자에게 설명할 동작 의미 |
| B `tests/panels.spec.ts:85` | 갤러리 수 13→17 | smoke coverage |

**추론.** model/parser/layout의 변경 자체는 문법 기능이 결과 그림까지 이어지는 데 필요한 일이다. 단순히 여러 파일을 바꿨다는 이유로 구조 실패라 할 수 없다. 더 중요한 지점은 **같은 동작 종류와 공간 요구가 서로 다른 표현으로 반복된다**는 점이다. 타입 union, parser enum 목록, layout의 type 분기, radius 분기, 예제가 동기화되어야 한다.

**최소 예시 / 추론.** B에서 `catch` 동작을 추가하면 union과 parser 목록만 바꿔서는 그림이 새 의미를 갖지 않는다. layout은 기존 receive/drop/throw 분기의 잔여 경로로 동작한다. parser가 받아들이는 값과 그림 implementation을 함께 완성해야 한다. 동작 정의가 `parse rules + geometry + render`를 소유하는 작은 internal module이면 locality가 개선된다.

**사실.** B의 반경 130은 동작 당사자뿐 아니라 같은 컷의 모든 인물에 대한 공통 반경으로 사용된다(B `layout.ts:47–54`). 너비 720에 세 인물, 기본 scale 1이라면 동작 없는 경우 automaticScale=1, 한 인물의 동작을 넣으면 `(216−12)/(2×130)=약 0.785`로 전 인물이 축소된다.

**추론.** 이런 보수적 축소가 현재 제품의 의도일 수는 있다. 다만 동작 type·방향별 실제 bounds가 없는 구조에서는 다른 인물의 크기까지 간접적으로 바꾸는 것이 새 표현을 추가할 때의 기본 경로다. bounds 기반 배치는 그 영향 범위를 명확히 할 수 있다.

**검증 한계.** B에는 `llm-guide.md`가 없었다. 변경된 파일 목록에는 README/guide.html이나 새 동작 전용 tests가 없다. `tests/actions.spec.ts:3–32`는 기존 손 제스처·holding·transfer만 검증한다. 갤러리 smoke test가 동작 예제를 정상 그림으로 받아들이는지는 검사할 수 있지만 receive와 throw의 의미 차이, left/right, 상속된 holding 초기화, 충돌·잘못된 값은 그 테스트가 보장하지 않는다. 아직 진행 중 변경이므로 이를 배포된 회귀라고 부르지 않는다.

## 4. 검증과 LLM 작성 interface

**사실.** parser는 unknown key, 타입, 숫자 범위, 에셋 이름, 컷에 있는 ID 참조, 수량 제한을 명시적으로 검사한다(A `src/parse.ts:12–51`, `59–74`, `142–234`, `238–239`). duplicate YAML key도 거부한다(A `56–57`). 엄격한 문법은 오타를 조용히 무시하는 대신 수정을 요구한다.

**사실.** LLM 가이드는 허용 필드/enum, before의 null와 문자열 ID 규칙, SDK 옵션이 YAML 필드와 다르다는 점, 실제 실행 검증을 못 했으면 주장하지 말라는 절차를 제공한다(A `llm-guide.md:9–14`, `34–90`, `142–167`). 세 개 코드 블록을 실제 parser와 compact/phone renderer에 통과시키는 테스트도 있다(A `tests/llm-guide.spec.ts:4–36`).

**추론.** 현재 LLM에게는 작은 허용 어휘와 자기 완결 예제, 명시적인 완료 조건이 큰 leverage를 준다. schema 라이브러리 도입보다 먼저 이 장점을 보존해야 한다.

**사실.** `RenderResult.diagnostics`는 `string[]`이며(A `src/comic.ts:12–17`), 첫 thrown 오류 하나를 잡아 SVG와 panels를 비운 결과로 변환한다(A `109–116`). parser의 의미 오류는 대체로 컷 번호가 있지만 dialogue 항목 index는 없다(A `185–210`). layout의 겹침·긴 이름표 오류에는 컷 번호가 없다(A `src/layout.ts:77–79`, `130–131`).

**최소 예시 / 코드상 결과, 별도 실행 미확인.** 다음 코드는 source 검증을 통과하지만 둘째 컷의 geometry 검사에서 실패한다.

```yaml
cast: {a: {asset: server}, b: {asset: database}}
panels:
  - actors: [a]
  - actors: [{id: a, x: 0.5}, {id: b, x: 0.5}]
```

오류는 `캐릭터 'a'와 'b'가 겹칩니다. x/y 또는 scale을 조정하세요.`이며 `컷 2`나 `panels[1].actors` 위치 정보가 없다. 같은 pair가 여러 컷에 있으면 LLM과 사람이 수정 위치를 다시 찾아야 한다.

**제안.** all-or-nothing 렌더링 계약은 유지할 수 있다. 우선 `code`, `path`, `panelIndex`, `message`를 가진 진단을 내부에서 만들고 기존 `diagnostics: string[]`를 그 message의 compatibility projection으로 유지한다. 한글 alias 입력에서 원래 사용한 키 이름까지 알려주려면 normalization 단계에서 original path를 별도 보존한다. 자동 수정 시스템이 한국어 문장을 regex로 분류하지 않게 하는 것이 목적이다.

**주의 / 제안.** validation/schema를 source shape, 의미 검증, geometry feasibility의 세 단계로 구분한다. 단순 descriptor는 객체별 allowed keys·enum·기본값·숫자 범위에 맞는다. before의 sequential patch, cast reference, actor 존재, 동작 배타성은 custom semantic resolver가 맡고, 폰트별 이름표 줄 수와 겹침은 layout 단계가 맡는다. 모든 조건을 JSON Schema 하나로 표현하려 하면 interface와 implementation 양쪽이 복잡해질 수 있다.

## 5. 버전과 호환성 계약

**사실.** A에는 package version `0.2.1`(A `package.json:3`), 공개 assetVersion `1`(A `assets.ts:6`, `index.ts:10`), 캐시 키 layoutVersion `2`(A `comic.ts:67`)가 있다. source 최상위에서 version/schemaVersion은 허용되지 않는다(A `parse.ts:59`). 가이드는 canonical URL 하나에서 현재 공개 v0.2.1을 기준으로 설명한다(A `llm-guide.md:3–5`).

**사실.** README는 고정 태그 사용과 이전 태그 보존을 안내하고 기존 통합 SVG 호출을 유지한다고 설명한다(A `README.md:25–38`, `205–210`). build는 package version을 bundle banner에 쓰고 가이드를 배포 위치로 복사한다(A `scripts/build.mjs:5–15`).

**추론.** 배포 버전 고정은 이미 실용적인 compatibility 수단이다. 지금 모든 YAML에 version을 강제할 필요는 없다. 그러나 최신 가이드로 작성한 새 키를 이전 SDK에 주면 unsupported syntax version이라는 설명 대신 unknown-key 오류가 난다. LLM이 어떤 문법 능력의 renderer를 대상으로 작성하는지 source 문자열만으로는 알 수 없다.

**제안.** alias addition처럼 기존 문법을 보존하는 변경은 기존 영어 YAML을 계속 수용하고 SDK/가이드의 target version을 함께 갱신한다. 장래 breaking syntax 변경에는 source의 선택 version 또는 명시 migration을 검토한다. 당장은 SDK capabilities나 문법 revision을 guide target과 대응시키는 편이 더 작다. asset/layout revision은 결과·캐시 조건이고 source 문법 revision과 역할을 섞지 않는다.

## 6. 한글 canonical 문법의 normalization seam

이 항목은 추가 사용자 요구에 대한 **제안**이며 A/B의 구현 사실이 아니다. root가 계획한 `src/syntax.ts`에서 한글·영어 입력을 동일한 English IR로 정규화하는 방향을 검토했다.

**권장 순서.** `YAML parseDocument → raw unknown tree → 컨테이너별 alias normalization → source shape/의미 검증과 before resolve → resolved Comic → layout/SVG`. 외부 호출자의 interface는 기존 `renderComic(source, options)`/`renderPanels(source, options)`를 유지한다. normalization과 resolver는 외부에 노출할 필요가 없는 internal seams다.

**반드시 interface에 포함할 invariant.**

- 키 alias는 최상위·cast member·panel·actor·dialogue·transfer 등 해당 schema 컨테이너에서만 적용한다. cast의 임의 ID 키는 번역하지 않는다.
- 값 alias는 expression/gesture/asset/prop/mode처럼 enum이 정의된 필드에서만 적용한다. ID/from/to/label/text를 번역하거나 trim/치환하지 않는다.
- 한 객체에 canonical과 legacy alias가 함께 있으면 **값이 같아도** 실패한다. 비교·병합하기 전에 raw own keys를 보고 충돌을 검사한다. YAML key 순서에 따라 앞의 값을 채택하지 않는다.
- before의 null 초기화·omitted actors·문자열 ID 유지·removeActors 순서를 그대로 보존한다.
- 알 수 없는 키를 제거하지 않는다. 이후 strict validation에서 오류로 드러나야 한다.
- 오류 path의 키 언어를 deterministic하게 정한다. original source path를 반환하거나 canonical path를 일관되게 반환한다. 혼합 입력의 traversal 순서에 따라 진단 언어가 바뀌지 않는다.

**최소 검증 예시.** `cast`에 `표정`이라는 ID가 있어도 그 ID는 바뀌지 않아야 한다. `text: "happy neutral before"`도 그대로 출력되어야 한다. `{expression: happy, 표정: 행복}`처럼 한 의미의 키 둘이 있는 객체는 두 값이 같은 뜻이어도 실패해야 한다. 한글 full/before/null 입력과 영어 대응 입력은 동일한 SVG·panel 수·캐시 결과를 가져야 한다.

**장점 / 추론.** 작성 언어가 바뀌어도 기존 geometry·에셋·캐시·viewer 코드가 같은 IR을 소비한다. 영어 legacy를 유지하는 두 번째 입력 adapter가 실제로 존재하므로 이 seam은 가상의 확장 슬롯이 아니다. 테스트도 공개 render interface를 통과시킬 수 있다.

**비용 / 추론.** normalization을 별도 거대한 switch로 쓰면 allowed key, alias, validator, guide가 다시 여러 군데로 퍼진다. JSON tree를 YAML 문자열로 재직렬화해 parser에 다시 주면 원래 위치·코멘트·키 spelling을 잃고 parse 작업도 반복한다. 단순 문자열 replace는 ID·대사까지 바꾸므로 적절하지 않다.

**typed descriptor 제안.** `Actor`라는 resolved model 타입으로 작성 문법을 생성하지 않는다. 그 타입에는 full/before의 차이, optional default, null reset 규칙이 없다. 작은 authoring descriptor에서 `canonicalKey`, `legacyKeys`, allowed enum/value aliases, scalar range/default, nested shape를 소유한다. 그 descriptor로 normalization과 allowed-key 목록을 공유하고, 에셋 enum은 에셋 사전의 key에서 얻는다. guide의 필드/enum 표를 생성하거나 해당 표가 descriptor와 맞는지 검사한다. 이야기 예제와 설명 prose는 사람이 유지한다. 이는 AI 설명을 자동 생성하는 제안이 아니다.

## 7. 실질적으로 다른 두 설계 대안

### 대안 A: 현재 resolved Comic을 보존하는 작은 compiler module

**interface.** 외부 render interface를 유지한다. 내부 `compileSource(source)`가 normalized resolved `Comic` 또는 위치가 있는 diagnostics를 반환한다. schema descriptor는 alias·허용 키·enum·기본값을 소유하고 custom resolver가 before·ID 참조·의미 제약을 소유한다. layout은 지금처럼 Comic을 받아 SVG를 만든다.

**숨기는 implementation.** 영어 legacy와 한글 canonical, source shape, null reset, reference check, error-path mapping. caller는 언어별 호출을 고르거나 normalization helper를 연쇄 호출하지 않는다.

**dependency 전략.** YAML 처리와 에셋 이름 사전은 in-process computation이다. 브라우저 폰트 측정은 compiler에서 제외하고 기존 layout에 둔다. plugin provider port를 추가하지 않는다.

**장점.** 지금 사용자 요구에 가장 작은 변경으로 대응한다. 기존 영어 source tests와 renderer/model을 보존하고 같은 결과를 쉽게 검증한다. LLM 가이드 어휘가 schema descriptor와 함께 바뀐다.

**트레이드오프.** source 언어의 locality는 좋아지지만 SVG와 geometry의 coupling은 여전히 layout에 남는다. 새 동작의 그림·공간 요구가 증가하면 별도 후속 작업이 필요하다. descriptor를 너무 범용화하면 작은 문법보다 더 큰 metamodel을 배우게 되므로 현재 쓰는 shape만 표현해야 한다.

### 대안 B: layout 앞에 renderer 독립적인 ScenePlan을 두는 compiler

**interface.** 외부 render interface는 동일하다. 내부에는 `compileSource → Comic`, `planPanel(Comic panel, metrics) → ScenePlan`, `emitSvg(ScenePlan)`이 있다. ScenePlan은 확정된 bounds, actor anchors, bubble outline/text lines, transfer/action paths 같은 결과 그림의 정보를 담는다. 이 단계는 scene coordinates와 authoring syntax를 분리한다.

**숨기는 implementation.** 각 에셋의 크기·손 위치·동작 궤적과 공간 확보, 실제 좌표 계산, SVG 표현. 새 action module은 `bounds + geometry`를 함께 소유하며 layout은 그 결과를 배치한다.

**dependency 전략.** metrics(text, font)는 브라우저 canvas 측정을 제공하는 실제 adapter다. 순수 geometry 사례는 deterministic metrics adapter로 검사할 수 있고 최종 browser tests는 실제 폰트와 SVG를 검사한다. 다른 출력 renderer가 실제로 필요하기 전에는 Canvas/PDF renderer용 public port를 미리 만들지 않는다.

**장점.** 다른 geometry의 에셋·동작이 늘어날수록 locality와 진단 가시성이 좋아진다. 기능마다 반경 플래그와 SVG 분기를 서로 따로 바꾸는 위험을 줄인다. geometry 검증이 마크업 문자열 내부 지식에 덜 의존한다.

**트레이드오프.** 현재 작고 단일 SVG renderer인 코드에 ScenePlan 타입·단계·테스트를 더한다. canvas metrics adapter 자체가 브라우저 시각 테스트를 대체하지 못한다. 한글 alias만을 위해 도입할 만큼의 leverage는 아직 입증되지 않았다. scene을 지나치게 generic command 목록으로 만들면 소품 전달·대화 상대 같은 도메인 의미가 너무 일찍 사라질 수 있다.

**추천.** 한글 canonical 문법에는 A를 선택한다. B는 다른 형태의 에셋 또는 여러 동작 추가가 반복될 때 적용한다. 먼저 assets/actions 가까이 bounds·anchor를 모으는 작은 변경으로 수요를 확인할 수 있다. 공개 plugin registry로 parser와 renderer를 확장하는 세 번째 접근은 현재의 strict authoring contract를 host 설정과 registry 순서에 의존하게 하므로 추천하지 않는다.

## 8. 검증 상태와 다음 확인

이 리뷰는 읽기와 diff 분석으로 작성했다. browser 실행, 전체 test run, 외부 CDN/공개 사이트의 실제 배포 상태 확인은 수행하지 않았다. 따라서 실제 glyph overflow, 시각적 action 의미, 캐시 런타임 동작을 새로 검증했다고 주장하지 않는다. 기존 tests가 무엇을 관찰하는지와 implementation 경로만 확인했다.

변경 후 의미 있는 확인은 공개 render interface를 통해 영어 legacy / 한글 / 혼합 source의 결과 동등성, 동일 alias 충돌, ID·label·text 보존, full와 before/null equivalence, semantic/layout 진단의 위치를 확인하는 것이다. 기존 guide examples compact/phone 검증과 geometry·export·production SDK 테스트는 계속 중요하다. 추가 tests는 같은 enum 목록을 implementation과 복사해 비교하는 대신 잘못된 입력의 실패와 실제 관찰 결과를 검사해야 한다.
