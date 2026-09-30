# ComicForge 구조와 문서 삽입 적합성 조사

Type: research
Status: resolved

## Question

ComicForge의 실제 문법, SVG 조합, 에셋 변형, 자동 배치, 의존성과 라이선스를 1차 자료로 조사하라. 사용자가 원하는 직접 그림 정의와 선택적 재사용, SVG/PNG 출력, 브라우저 문서 삽입을 기준으로 그대로 활용할 부분과 별도 설계할 부분을 구분하라. 구현을 포크할지 여부는 결정하지 않고 근거와 선택지를 보고한다.

조사 보고서는 `../research/comicforge-fit.md`에 보관한다. Git 저장소가 없으므로 연구 브랜치 대신 로컬 보고서를 사용한다.

## Answer

[ComicForge 구조와 Comic Gen 적합성](../research/comicforge-fit.md): 준비된 SVG의 포즈·표정 합성과 SVG/PNG 출력은 설계 참고가 된다. 인라인 벡터 그림 정의, 대사 중심 컷·인물 자동 배치, 브라우저 문서 블록 연동은 추가 설계가 필요하다. 라이선스 파일/선언이 확인되지 않아 코드와 예제 그림 재사용은 허가 확인이 선행되어야 한다. 포크 여부는 결정하지 않았다.
