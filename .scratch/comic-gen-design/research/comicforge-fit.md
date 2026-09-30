# ComicForge 구조와 Comic Gen 적합성

조사일: 2026년 9월 30일. 공식 저장소의 main 커밋 `e7256c9a42705339a305f4c9df7cb69e5907cc79`를 기준으로 원본 Python, 문서, 패키지 메타데이터를 정적으로 확인했다. 공식 문서 사이트는 이 조사에서 웹 도구로 접근되지 않아 같은 저장소의 문서 원본을 읽었다. 엔진을 설치하거나 렌더링을 실행하지 않았으며 아래의 출력·배치 판단은 구현을 읽은 결과다. 참조 원본은 이 보고서 옆 `upstream/`에 보관했다.

## 결론

ComicForge는 **준비한 SVG 그림을 YAML로 선택하고 합성하는 엔진**이다. SVG 중심 렌더링, 표정·포즈 변형, 말풍선 배치, 레이아웃 계산과 실제 그리기의 분리는 Comic Gen의 좋은 설계 참고가 된다. 그러나 사용자가 원하는 **에셋 라이브러리 없이 문서 코드에서 그림 정의를 만들고 이름 붙여 재사용하는 흐름**과 **대사 중심으로 컷·인물을 자동 배치하는 흐름**은 그대로 제공하지 않는다. 브라우저용 엔진·문서 플러그인도 별도로 설계해야 한다. [그림 제작 문서](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/docs/art/characters.md), [Python API](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/docs/reference/python-api.md)

## 문법과 그림 정의

- 페이지는 YAML의 `rows → panels`로 컷을 선언한다. 컷에는 `actors`, `bubbles`, `scene`, `image`, `pixel`, `caption` 등이 들어간다. 인물은 `char` 이름, `pose`, 슬롯별 변형(예: `face`, `arms`)과 위치·크기·반전을 지정한다. [문법 원본](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/docs/reference/spec.md)
- 캐릭터는 디렉터리에 둔 `character.yaml`, `base.svg`, `<slot>-<variant>.svg` 파일로 정의한다. 복수 포즈는 각 포즈의 몸체와 메타데이터 파일을 추가한다. 임의의 벡터 도형이나 캐릭터를 페이지 YAML 안에서 직접 정의하는 공개 문법은 확인되지 않았다. 단, SVG 자체는 손으로 코드 작성할 수 있으므로 **별도 파일에서 직접 그리기**는 가능하다. “코드로 그림 생성이 불가능하다”로 일반화하면 안 된다. [캐릭터 문서](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/docs/art/characters.md), [캐릭터 로더](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/library.py)
- 예외적으로 픽셀 그림은 YAML 안의 `grid + palette`로 즉석 정의하거나 `art`로 저장한 그림을 참조할 수 있다. 이 부분은 “인라인 정의와 이름 참조를 같은 사용 위치에서 허용”하는 선례다. 캐릭터·배경에 보편적으로 적용되는 기능은 아니다. [픽셀 구현](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/pixelart.py)
- 페이지 생성 함수는 인물이 없는 페이지에도 `library` 경로 또는 명시적으로 전달한 Library 객체를 요구한다. 인라인 픽셀에는 `pixel_dir`가 필요 없다는 설명과 “전체 페이지에 어떤 에셋 라이브러리도 필요 없다”는 의미를 구분해야 한다. [라이브러리 초기화](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/render.py#L264)

## SVG 합성과 에셋 변형

캐릭터 몸체와 오버레이의 외곽 SVG 태그를 벗겨 내부 마크업을 순서대로 붙이고, 그룹 변환으로 위치·크기·좌우 반전을 적용한다. 포즈별 오버레이 뒤에 공통 표정 오버레이를 더한다. 공통 표정은 `pose.anchor − character.anchor`만큼 평행 이동하므로 포즈 간 회전·확대가 아니라 같은 크기의 얼굴 위치를 맞추는 방식이다. 각 포즈의 머리 크기를 통일해야 한다. 선언한 슬롯과 변형만 선택 가능하며 없는 변형은 오류다. 실행 중 새로운 포즈를 만들어 주는 리깅/절차적 그림 생성기는 아니다. [합성 구현](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/library.py), [포즈 규칙](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/docs/art/characters.md)

배경도 몸체+슬롯 오버레이를 합성하고 컷을 덮도록 확대하며 넘치는 부분을 자른다. PNG/JPEG/GIF/WebP 배경은 base64 data URI로 SVG 안에 넣는다. 따라서 출력 확장자가 SVG라고 항상 순수 벡터인 것은 아니다. 텍스트도 폰트 경로로 변환하지 않고 SVG text로 남으므로 환경별 폰트 재현성은 별도 문제다. [배경 구현](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/scene.py), [래스터 구현](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/raster.py), [글자 구현](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/bubbles.py)

## 자동 배치의 실제 범위

| 대상 | 확인된 동작 | Comic Gen에서 필요한 추가 설계 |
|---|---|---|
| 컷 | 작성자가 행과 컷 수를 지정하면 너비·높이 가중치와 간격을 계산 | 대사/장면에서 컷 수와 행 구성을 만드는 상위 규칙 |
| 자동 행 높이 | `height: auto`는 래스터 이미지 비율과 캡션을 기준으로 계산, 페이지에 맞게 축소 | 벡터 인물·대사량을 기준으로 한 컷 높이 |
| 인물 | x=.5, y=.6, scale=.8 기본값을 각 인물에 독립 적용 | 다인물 좌우 분배·충돌 회피·장면별 기본 구도 |
| 말풍선 | 화자에 연결하거나 모서리/좌표로 지정, 세로 쌓기와 컷 내부 제한 | 긴 대사/다인물에서 실패를 진단하는 정책 |
| 읽기 순서 | `speakers`가 있는 컷에서 후보 위치를 평가해 화자점·기존 꼬리와 충돌을 줄임 | 일반 actor 장면에도 같은 품질을 보장하는 기본 모드 |

표 근거: [컷/인물 구현](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/render.py), [말풍선 배치](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/layout.py), [배치 검사](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/validate.py)

구현을 읽으면 좌표를 생략한 인물 두 명은 같은 중앙 위치에 놓이고 나중 인물이 앞의 인물을 가린다. 말풍선 배치는 최종 위치를 컷 안으로 제한하므로 내용이 넘치는 경우 충돌 없는 결과를 항상 보장하지 않는다. 검사 함수는 읽기 순서·꼬리 교차·화자점 가림을 경고한다. 화자 연결은 actor 인스턴스 ID가 아니라 `char` 이름이며 동일 캐릭터가 여러 번 등장하면 첫 번째 인물을 사용한다. 새 문법은 **그림 정의의 이름**과 **컷에서 등장한 인물의 ID**를 구분하는 편이 적합하다. [인물 위치](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/render.py#L805), [화자와 배치 경고](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/layout.py)

글자 폭은 실제 폰트 측정이 아니라 문자를 대문자/소문자/숫자/공백/기타로 분류해 추정한다. 줄바꿈은 공백 사이 단어와 글자 수를 기준으로 한다. 한국어·CJK 실제 폭과 공백 없는 긴 문자열의 줄바꿈 품질은 이 구현만으로 보장할 수 없다. 글로벌 사용을 위해 언어별 줄바꿈, 폰트 측정/고정 정책을 따로 정하고 대표 한국어·영어·CJK 예제로 검증해야 한다. [폭·줄바꿈 구현](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/bubbles.py#L112)

## 출력·의존성·브라우저 삽입

패키지 메타데이터는 버전 0.2.3, Python 3.13 이상, CairoSVG·PyYAML·Rich 의존성을 선언한다. Replicate와 python-dotenv는 참고 이미지 생성용 선택 의존성이다. 출력은 합성 SVG 문자열을 파일로 저장하거나 CairoSVG로 PNG/PDF를 만든다. `build_*` 함수는 파일 저장 없이 SVG 문자열을 반환하지만 에셋 로더는 여전히 파일 시스템에서 그림을 읽는다. [패키지 설정](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/pyproject.toml), [출력 구현](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/render.py#L838), [Python API](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/docs/reference/python-api.md)

**적합성 판단(조사에서의 추론):** 사전 빌드한 SVG/PNG를 문서에 삽입하거나 서버에서 YAML을 렌더링해 반환하는 방식에는 활용 여지가 있다. 현재 저장소는 Python/CLI 엔진으로, 브라우저 네이티브 JS 엔진이나 Markdown 블록 플러그인은 확인되지 않았다. 브라우저에서 즉시 코드 블록을 렌더링하려면 별도 JS 구현, Python 실행 환경, 또는 서버 API 중 하나가 필요하다. 현재 slog.gg가 사용자 정의 블록을 어떻게 연동하는지는 조사 범위 밖이며 지원을 단정하지 않는다. [공식 진입점과 구성](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/README.md), [전체 파일 트리](https://api.github.com/repos/mojzis/comicforge/git/trees/e7256c9a42705339a305f4c9df7cb69e5907cc79?recursive=1)

**문서 렌더링에서 추가 확인할 경계:** SVG 내부 마크업을 그대로 합치며 로더가 스크립트·외부 참조를 정화하지 않는다. 제목/대사는 XML escape를 적용하지만 스타일 속성값은 별도 직렬화·정화 계약이 아니다. 라이브러리/이미지 경로에는 절대 경로·상위 경로가 허용된다. 여러 SVG를 같은 DOM에 인라인 삽입하면 좌표 기반 `clipPath` ID나 에셋 내부 ID가 충돌할 수 있다. 따라서 공개 문서 서비스에는 허용 도형 기반 직렬화, 에셋 해석 범위, ID 네임스페이스, 입력/출력 크기 제한을 별도 설계해야 한다. 이는 해당 코드 경로를 읽은 위험 분석이며 공격 실행이나 브라우저 검증은 하지 않았다. [SVG 내부 추출](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/library.py#L39), [컷 ID](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/render.py#L734), [경로 해석](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/raster.py#L68), [속성·대사 출력](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/comicforge/bubbles.py#L177)

## 라이선스 확인과 선택지

조사 시점 전체 저장소 트리에 LICENSE/COPYING 파일이 없고 pyproject에도 라이선스 필드가 없으며 GitHub API의 `license` 값은 null이다. 공개 열람 가능한 저장소라는 사실로 복제·배포 허가를 추정하지 않는다. 원본 코드나 예제 SVG를 제품에 포함하는 선택은 저자의 명시적인 사용 허가 또는 라이선스 확인이 먼저 필요하다. 여기서는 법률 판단이나 저자 연락을 수행하지 않았다. [저장소 메타데이터](https://api.github.com/repos/mojzis/comicforge), [커밋 파일 트리](https://api.github.com/repos/mojzis/comicforge/git/trees/e7256c9a42705339a305f4c9df7cb69e5907cc79?recursive=1), [패키지 설정](https://github.com/mojzis/comicforge/blob/e7256c9a42705339a305f4c9df7cb69e5907cc79/pyproject.toml)

| 선택지 | 가져올 점 | 남는 작업/조건 |
|---|---|---|
| 설계 참고 후 독립 구현 | SVG 중심 모델, 슬롯·오버레이, 레이아웃과 렌더러 분리, 경고 API | 새 문법·인라인 정의·자동 구도·브라우저·글꼴 설계; 원본 코드/그림 복사 없이 구현 |
| 허가 확인 후 Python 엔진 위 래퍼 | 기존 SVG/PNG 출력, 파일 기반 에셋, 배치 계산 | 별도 직접 그림 정의 컴파일러, 서버/API 및 경로 격리, 자동 인물·컷 배치 |
| 허가 확인 후 포크/이식 | 내부 합성·배치 알고리즘을 수정할 여지 | 라이선스, Python/브라우저 간 유지보수와 출력 일관성, 문법/에셋 호환성 |

어느 선택지를 채택할지는 이 티켓에서 결정하지 않는다. 다음 명세에서는 먼저 **선택적 에셋 라이브러리**, **문서 내부 그림 정의와 등장 인물 참조**, **자동 구도와 수동 오버라이드**, **SVG 코어와 PNG 변환 책임**을 분리해 정하는 것이 조사 결과에 부합한다.
