# 표현 품질 점검과 레퍼런스 분석

2026-10-04. 사용자 선택은 A(자연스러운 다섯 손가락)이며, 이후 캐릭터·표정·소품·말풍선·갤러리 전체의 표현 품질을 개선하도록 범위가 확대되었다.

공식 손 이미지 8개를 직접 표시해 큰 크기와 32·24·16px에서 비교했다. 레퍼런스의 원본 SVG 경로를 제품에 복사하지 않고 직접 작성한 벡터로 적용했다. 아래의 비례와 선 굵기는 관찰을 바탕으로 한 프로젝트의 디자인 판단이며 공식 요구사항이 아니다.

## 손과 팔

- [Fluent Waving hand](https://github.com/microsoft/fluentui-emoji/blob/main/assets/Waving%20hand/Default/Flat/waving_hand_flat_default.svg): 넓고 둥근 손바닥, 짧은 내부선, 외곽의 곡선 쌍.
- [OpenMoji Waving hand](https://github.com/hfg-gmuend/openmoji/blob/master/color/svg/1F44B.svg): 부채꼴 배열과 엄지·검지 사이의 공간.
- [Noto Waving hand](https://github.com/googlefonts/noto-emoji/blob/main/2D/svg/emoji_u1f44b.svg): 완만한 손가락 길이 차이와 좁아지는 손목.
- [Twemoji Waving hand](https://github.com/jdecked/twemoji/blob/main/assets/svg/1f44b.svg): 단일 손과 서로 반대쪽의 이동 곡선.
- [Twemoji Pointing left](https://github.com/jdecked/twemoji/blob/main/assets/svg/1f448.svg): 검지 하나, 접힌 손가락 덩어리, 짧은 사선 엄지.
- [OpenMoji Person raising hand](https://github.com/hfg-gmuend/openmoji/blob/master/color/svg/1F64B.svg): 손목·전완·팔꿈치·소매가 이어지는 구조.

결정: A의 배열을 유지하되 손바닥 아래를 넓히고 손가락 틈을 줄인다. 겹친 완성 손 잔상은 제거한다. 닫힌 팔을 몸 뒤에 배치하고 손과 엄지는 앞에 둔다. 같은 쪽의 동작은 손을 공유하고 전달 선은 실제 손 위치에 연결한다.

## 본체·표정·소품

- [Fluent Confused face](https://github.com/microsoft/fluentui-emoji/blob/main/assets/Confused%20face/Flat/confused_face_flat.svg), [Phosphor 표정군](https://phosphoricons.com/?q=smiley&size=64&weight=duotone): 눈썹과 입의 방향으로 감정 차이를 만든다.
- [Lucide key-round](https://lucide.dev/icons/key-round), [server](https://lucide.dev/icons/server), [database](https://lucide.dev/icons/database): 구멍·톱니·슬롯·원통 면처럼 의미를 전달하는 형태를 우선한다.
- [Fluent iconography](https://fluent2.microsoft.design/iconography/), [Lucide icon guide](https://github.com/lucide-icons/lucide/blob/main/docs/how-to/icon-guide.md): 요소 간 윤곽과 디테일의 일관성을 참고한다.

결정: 눈의 상속 stroke를 제거하고 표정별 눈썹과 입을 구분한다. 불분명한 윗막대는 없애고 본체에는 제한된 두톤만 더한다. 열쇠의 구멍과 톱니, 봉투 접힘, 원통 상면을 명확히 한다. 소품은 문맥과 무관하게 같은 선 굵기를 쓴다. 사람의 귀·코·안경은 작은 크기에서 겹치지 않게 단순화한다.

## 말풍선과 갤러리

- [IBM Line style](https://www.ibm.com/design/language/illustration/line-style/design/), [Flat style](https://www.ibm.com/design/language/illustration/flat-style/design/), [People](https://www.ibm.com/design/language/illustration/people/): 선의 역할과 단순한 인물 표현을 참고한다.
- [Atlassian Typography](https://atlassian.design/foundations/typography/), [Iconography](https://atlassian.design/foundations/iconography), [Fluent Color](https://fluent2.microsoft.design/color): 실제 표시 크기의 읽기와 역할별 시각 위계를 참고한다.

확인한 문제: 기존 갤러리는 720px SVG를 최대320px로 줄여 기본 대사를 약8px로 표시했다. 긴 말풍선 꼬리는 아래 말풍선 뒤를 지나 화자가 혼동됐다. 손의 유무에 따라 480px 3인 컷 전체의 인물 배율도 달라졌다.

결정: 갤러리는480px 기본 비율의 실제 컷을 영역 전체 너비로 표시하고, 한 컷씩 이동하며 모든 컷은 확대 뷰어에서 읽는다. 말풍선은 내용에 맞춘 폭과 짧은 꼬리를 사용한다. 모든 컷은 동일한 팔·소품 공간을 예약해 포즈 때문에 인물 전체가 줄어들지 않게 한다.

## 시안 기록

3가지 비교 시안은 `codex/hand-prototypes` 브랜치의 `9e1f4f5edef049ae7326c892a8cd44aba7124b70`에 보존했다. `npm run prototype:hands` 후 `gallery.html?variant=A/B/C#gestures`에서 비교할 수 있다. 프로토타입과 선택 바는 공개 코드에 포함하지 않는다.
