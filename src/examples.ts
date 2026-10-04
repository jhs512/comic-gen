import { parse, stringify } from "yaml";
import { koreanComic } from "./syntax";
const koreanSource = (source: string) =>
  stringify(koreanComic(parse(source)), { lineWidth: 0 });

export const starter = koreanSource(`title: 요청과 응답
cast:
  web: {asset: server, label: 웹 서버}
  db: {asset: database, label: DB}
panels:
  - actors:
      - {id: web, expression: confused}
      - {id: db, expression: happy}
    dialogue:
      - {from: web, to: db, text: "데이터를 부탁해!"}
      - {from: db, to: web, text: "좋아, 바로 찾아볼게!"}
`);

export interface Example {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  source: string;
}

function sourceFor(
  title: string,
  cast: Record<string, unknown>,
  panels: unknown[],
  personas?: Record<string, unknown>,
): string {
  return stringify(
    koreanComic({ title, cast, panels, ...(personas ? { personas } : {}) }),
    { lineWidth: 0 },
  );
}

const meetingPersonas = {
  analyst: {
    role: "빅데이터 전문가",
    personality: "차분하고 근거를 확인한다",
    speechStyle: "짧은 질문으로 지표를 구분하고 이유를 설명한다",
  },
  leader: {
    role: "마케팅 팀장",
    personality: "결과를 빠르게 얻고 싶지만 반론을 듣는다",
    speechStyle: "목표와 다음 행동을 묻는 간결한 존댓말",
  },
  newcomer: {
    role: "신입 마케터",
    personality: "솔직하고 호기심이 많다",
    speechStyle: "모르는 점을 구체적으로 질문하고 배운 것을 자기 말로 정리한다",
  },
};
const meetingCast = {
  kim: {
    asset: "human",
    label: "김대리 · 데이터 전문가",
    persona: "analyst",
    appearance: {
      hairStyle: "short",
      glasses: true,
      outfit: "jacket",
      outfitColor: "#5379a7",
    },
  },
  leader: {
    asset: "human",
    label: "마케팅 팀장",
    persona: "leader",
    appearance: {
      hairStyle: "bob",
      hairColor: "#573d36",
      outfit: "shirt",
      outfitColor: "#b88646",
      skinColor: "#d6a279",
    },
  },
  oh: {
    asset: "human",
    label: "오사원",
    persona: "newcomer",
    appearance: {
      hairStyle: "short",
      hairColor: "#303746",
      outfit: "hoodie",
      outfitColor: "#609b87",
    },
  },
};

const conversationCast = {
  sora: {
    asset: "human",
    label: "소라",
    appearance: {
      hairStyle: "bob",
      outfit: "shirt",
      outfitColor: "#7b8fca",
    },
  },
  jun: {
    asset: "human",
    label: "준",
    appearance: {
      hairStyle: "short",
      outfit: "jacket",
      outfitColor: "#5f9285",
      skinColor: "#d6a279",
      glasses: true,
    },
  },
};

// Keep every example as ordinary authoring code, using the same public renderer as the editor.
function getExamples(): Example[] {
  return [
    {
      id: "persona-meeting",
      title: "김대리·팀장·오사원의 캠페인 회의",
      category: "사람·페르소나",
      description:
        "같은 세 사람이 네 컷에 등장해 클릭과 구매 전환을 구분합니다. 직무·성격·말투는 작성 참고이고 외형은 일관되게 유지합니다.",
      features: ["사람 외형", "페르소나 참조", "3인 티키타카", "이전 컷 상속"],
      source: sourceFor(
        "캠페인 회의: 숫자의 함정",
        meetingCast,
        [
          {
            actors: [
              "kim",
              { id: "leader", expression: "happy" },
              { id: "oh", expression: "confused" },
            ],
            dialogue: [
              {
                from: "leader",
                to: "kim",
                text: "클릭이 늘었으니 광고비를 더 쓰죠?",
              },
              {
                from: "oh",
                to: "kim",
                text: "방문자는 늘었는데 주문은 그대로예요.",
              },
            ],
          },
          {
            mode: "before",
            actors: [{ id: "kim", gesture: "point" }],
            dialogue: [
              {
                from: "kim",
                to: "oh",
                text: "클릭과 구매 전환을 나눠서 보죠.",
              },
              {
                from: "oh",
                to: "kim",
                text: "많이 누른다고 많이 사는 건 아니네요?",
              },
            ],
          },
          {
            mode: "before",
            actors: [
              { id: "leader", expression: "neutral" },
              { id: "oh", expression: "neutral" },
            ],
            dialogue: [
              {
                from: "leader",
                to: "kim",
                text: "그럼 어디서 고객이 떠나는지 봐야겠군요.",
              },
              {
                from: "kim",
                to: "leader",
                text: "맞아요. 장바구니와 결제까지 비교하죠.",
              },
            ],
          },
          {
            mode: "before",
            actors: [
              { id: "kim", gesture: null, expression: "happy" },
              { id: "oh", expression: "happy" },
            ],
            dialogue: [
              {
                from: "oh",
                to: "leader",
                text: "다음 주에는 전환율도 함께 보고할게요!",
              },
              {
                from: "leader",
                to: "oh",
                text: "좋아요. 같은 기준으로 실험을 확인하죠.",
              },
            ],
          },
        ],
        meetingPersonas,
      ),
    },
    {
      id: "persona-diagram",
      title: "같은 세 사람의 데이터 흐름 설명",
      category: "사람·페르소나",
      description:
        "회의의 등장인물과 프로필을 그대로 재사용하고, Mermaid 칠판으로 분석 흐름을 설명하는 새 이야기를 만듭니다.",
      features: ["다른 만화에서 재사용", "Mermaid 칠판", "표정·손·소품"],
      source: sourceFor(
        "캠페인 분석의 다음 질문",
        meetingCast,
        [
          {
            actors: [
              { id: "kim", gesture: "point-up" },
              "leader",
              { id: "oh", expression: "confused" },
            ],
            dialogue: [
              {
                from: "oh",
                to: "kim",
                text: "전환율은 어떤 순서로 확인하나요?",
              },
              {
                from: "kim",
                to: "oh",
                text: "방문에서 주문까지 단계를 나눠 비교해요.",
              },
            ],
            diagram: {
              type: "mermaid",
              title: "방문에서 주문까지",
              height: 240,
              source:
                "flowchart LR\n  방문 --> 클릭\n  클릭 --> 장바구니\n  장바구니 --> 주문",
            },
          },
          {
            mode: "before",
            actors: [
              { id: "kim", gesture: null },
              { id: "oh", expression: "happy" },
            ],
            dialogue: [
              {
                from: "leader",
                to: "oh",
                text: "어느 단계가 달라졌는지 함께 보고해주세요.",
              },
              {
                from: "oh",
                to: "leader",
                text: "네, 같은 기간과 기준으로 비교할게요!",
              },
            ],
            transfer: [{ from: "kim", to: "oh", prop: "data" }],
          },
        ],
        meetingPersonas,
      ),
    },
    {
      id: "uml-class",
      title: "칠판으로 설명하는 클래스 관계",
      category: "UML·다이어그램",
      description:
        "한 컷의 칠판에 Mermaid 클래스 다이어그램을 그리고, 아래에서 인물이 관계를 설명합니다.",
      features: ["클래스 다이어그램", "한글 라벨", "인물과 대사"],
      source: sourceFor(
        "회원과 주문의 관계",
        {
          teacher: { asset: "server", label: "선생님" },
          student: { asset: "client", label: "학생" },
        },
        [
          {
            actors: ["teacher", "student"],
            dialogue: [
              {
                from: "teacher",
                to: "student",
                text: "회원 한 명이 여러 주문을 만들 수 있어요.",
              },
            ],
            diagram: {
              type: "mermaid",
              title: "회원과 주문 클래스",
              height: 260,
              source: `classDiagram
  direction LR
  class 회원 {
    +String 이름
    +주문하기()
  }
  class 주문 {
    +String 번호
    +결제하기()
  }
  회원 "1" --> "*" 주문 : 생성`,
            },
          },
        ],
      ),
    },
    {
      id: "uml-sequence",
      title: "화면으로 읽는 요청 순서",
      category: "UML·다이어그램",
      description:
        "Mermaid 시퀀스 다이어그램과 두 인물의 대사로 요청·조회·응답의 순서를 설명합니다.",
      features: ["시퀀스 다이어그램", "요청·응답", "컷 안 화면"],
      source: sourceFor(
        "요청은 어떤 순서로 흐를까?",
        {
          client: { asset: "client", label: "방문자" },
          server: { asset: "server", label: "웹 서버" },
        },
        [
          {
            actors: ["client", "server"],
            dialogue: [
              {
                from: "server",
                to: "client",
                text: "조회가 끝나면 결과를 응답으로 돌려줘요.",
              },
            ],
            diagram: {
              type: "mermaid",
              title: "요청에서 응답까지",
              height: 440,
              source: `sequenceDiagram
  participant 방문자
  participant 서버 as 웹 서버
  participant 저장소 as 데이터베이스
  방문자->>서버: 데이터 요청
  서버->>저장소: 데이터 조회
  저장소-->>서버: 조회 결과
  서버-->>방문자: 응답`,
            },
          },
        ],
      ),
    },
    {
      id: "before",
      title: "변화만 적는 네 컷 이야기",
      category: "여러 컷·상속",
      description:
        "첫 컷을 정의하고 이전 구성로 표정·소품만 바꿉니다. 대사는 매 컷 새로 작성합니다.",
      features: ["4컷", "구성: 이전", "상태 초기화"],
      source: `title: 데이터가 도착하기까지
cast:
  web: {asset: server, label: 웹 서버}
  db: {asset: database, label: DB}
panels:
  - actors: [{id: web, expression: confused}, db]
    dialogue: [{from: web, to: db, text: "내가 요청한 데이터가 있니?"}]
  - mode: before
    actors: [{id: db, expression: happy, holding: data}]
    dialogue: [{from: db, to: web, text: "찾았어! 이 데이터를 가져가."}]
  - mode: before
    actors: [{id: db, holding: null}, {id: web, expression: happy}]
    dialogue: [{from: web, to: db, text: "고마워, 이제 응답할 수 있어!"}]
    transfer: [{from: db, to: web, prop: data}]
  - mode: before
    actors: [{id: web, holding: data, gesture: wave}]
    dialogue: [{from: web, to: db, text: "다음 요청에서도 함께하자!"}]
`,
    },
    {
      id: "basic",
      title: "처음 만드는 두 캐릭터 대화",
      category: "빠른 시작",
      description:
        "등장인물에 이름을 붙이고 두 캐릭터가 서로 이야기하게 합니다. 대사만 바꾸며 시작하세요.",
      features: ["역할 이름표", "대화 상대", "자동 배치"],
      source: starter,
    },
    {
      id: "actions",
      title: "요청에서 데이터 응답까지",
      category: "IT 설명",
      description:
        "클라이언트의 요청을 서버가 받고, 다음 컷에서 DB의 데이터를 받습니다.",
      features: ["여러 컷", "손 제스처", "소품 전달"],
      source: actionExample,
    },
    {
      id: "cache",
      title: "캐시 적중과 캐시 미스",
      category: "IT 설명",
      description:
        "같은 질문을 다시 받으면 저장한 데이터를 재사용하는 캐시의 원리를 설명합니다.",
      features: ["3컷", "같은 인물 재사용", "소품"],
      source: sourceFor(
        "캐시는 어떻게 도와줄까?",
        {
          user: { asset: "client", label: "방문자" },
          cache: { asset: "server", label: "캐시" },
        },
        [
          {
            actors: ["user", "cache"],
            dialogue: [
              {
                from: "user",
                to: "cache",
                text: "처음 요청한 데이터가 있나요?",
              },
              {
                from: "cache",
                to: "user",
                text: "아직 없어. 원본에서 가져와 저장할게!",
              },
            ],
          },
          {
            actors: [
              "user",
              { id: "cache", expression: "happy", holding: "data" },
            ],
            dialogue: [
              { from: "cache", to: "user", text: "이제 결과를 기억해 뒀어." },
            ],
          },
          {
            actors: [
              { id: "user", expression: "happy" },
              { id: "cache", expression: "happy" },
            ],
            dialogue: [
              { from: "user", to: "cache", text: "같은 데이터를 다시 부탁해!" },
              { from: "cache", to: "user", text: "저장한 결과를 바로 줄게." },
            ],
            transfer: [{ from: "cache", to: "user", prop: "data" }],
          },
        ],
      ),
    },
    {
      id: "auth",
      title: "열쇠로 이해하는 인증",
      category: "IT 설명",
      description:
        "열쇠 소품을 인증 정보에 비유합니다. 이름표는 주제에 맞게 바꿀 수 있습니다.",
      features: ["열쇠", "든소품", "전달 방향"],
      source: sourceFor(
        "인증 정보 확인하기",
        {
          visitor: { asset: "client", label: "방문자" },
          gate: { asset: "server", label: "인증 서버" },
        },
        [
          {
            actors: [
              { id: "visitor", holding: "key" },
              { id: "gate", gesture: "point" },
            ],
            dialogue: [
              {
                from: "gate",
                to: "visitor",
                text: "누구인지 확인할 열쇠를 보여줘.",
              },
              {
                from: "visitor",
                to: "gate",
                text: "여기 내 인증 정보가 있어!",
              },
            ],
            transfer: [{ from: "visitor", to: "gate", prop: "key" }],
          },
          {
            actors: [
              { id: "visitor", expression: "happy" },
              { id: "gate", expression: "happy" },
            ],
            dialogue: [
              {
                from: "gate",
                to: "visitor",
                text: "확인했어. 이제 들어와도 좋아.",
              },
            ],
          },
        ],
      ),
    },
    {
      id: "retry",
      title: "실패를 만났을 때",
      category: "IT 설명",
      description:
        "실패와 재시도를 표정 변화로 설명합니다. 한 인물의 표정은 컷마다 달라질 수 있습니다.",
      features: ["슬픔 → 기쁨", "3컷", "상태 변화"],
      source: sourceFor(
        "실패 후 다시 시도하기",
        {
          client: { asset: "client", label: "클라이언트" },
          server: { asset: "server", label: "서버" },
        },
        [
          {
            actors: ["client", { id: "server", expression: "sad" }],
            dialogue: [
              {
                from: "server",
                to: "client",
                text: "잠시 요청을 처리할 수 없어.",
              },
            ],
          },
          {
            actors: [{ id: "client", expression: "confused" }, "server"],
            dialogue: [
              {
                from: "client",
                to: "server",
                text: "조금 기다렸다가 다시 물어볼게.",
              },
            ],
          },
          {
            actors: [
              { id: "client", expression: "happy" },
              { id: "server", expression: "happy" },
            ],
            dialogue: [
              {
                from: "server",
                to: "client",
                text: "이번에는 성공! 결과를 가져왔어.",
              },
            ],
            transfer: [{ from: "server", to: "client", prop: "data" }],
          },
        ],
      ),
    },
    {
      id: "lesson",
      title: "질문으로 배우는 함수",
      category: "교육",
      description:
        "학생·선생님·예제로 이름을 붙여 입력과 출력의 차이를 질문으로 배웁니다.",
      features: ["3명", "교육 문답", "역할 재사용"],
      source: sourceFor(
        "함수는 무엇을 할까?",
        {
          student: { asset: "client", label: "학생" },
          teacher: { asset: "server", label: "선생님" },
          example: { asset: "database", label: "예제" },
        },
        [
          {
            actors: [
              { id: "student", expression: "confused" },
              { id: "teacher", gesture: "point" },
              "example",
            ],
            dialogue: [
              {
                from: "student",
                to: "teacher",
                text: "숫자 3을 넣으면 어떻게 돼요?",
              },
              {
                from: "teacher",
                to: "student",
                text: "규칙이 두 배로 만들기라면 6이 나와요.",
              },
              {
                from: "example",
                to: "student",
                text: "입력은 3, 출력은 6. 규칙은 같아요!",
              },
            ],
          },
        ],
      ),
    },
    {
      id: "story",
      title: "잃어버린 열쇠",
      category: "대화·스토리",
      description:
        "같은 클라이언트 에셋을 서로 다른 두 인물로 사용해 작은 이야기를 만듭니다.",
      features: ["동일 에셋의 두 인물", "감정 변화", "열쇠 전달"],
      source: sourceFor(
        "잃어버린 열쇠",
        {
          mina: { asset: "client", label: "미나" },
          june: { asset: "client", label: "준" },
        },
        [
          {
            actors: [
              { id: "mina", expression: "sad" },
              { id: "june", expression: "confused" },
            ],
            dialogue: [
              { from: "mina", to: "june", text: "열쇠를 잃어버렸어…" },
            ],
          },
          {
            actors: [
              { id: "mina", expression: "happy" },
              { id: "june", expression: "happy" },
            ],
            dialogue: [
              {
                from: "june",
                to: "mina",
                text: "여기 있었어! 다음에는 주머니를 확인하자.",
              },
            ],
            transfer: [{ from: "june", to: "mina", prop: "key" }],
          },
        ],
      ),
    },
    {
      id: "expressions",
      title: "다섯 표정으로 말하기",
      category: "표현",
      description: "같은 캐릭터에 다섯 가지 표정을 차례로 적용합니다.",
      features: ["5가지 표정", "1인 대사", "컷 반복"],
      source: sourceFor(
        "같은 얼굴, 다른 마음",
        { me: { asset: "client", label: "나" } },
        [
          {
            actors: ["me"],
            dialogue: [{ from: "me", text: "오늘도 차근차근 시작해요." }],
          },
          {
            actors: [{ id: "me", expression: "happy" }],
            dialogue: [{ from: "me", text: "드디어 이해했어!" }],
          },
          {
            actors: [{ id: "me", expression: "confused" }],
            dialogue: [{ from: "me", text: "그런데 왜 이런 결과가 나왔지?" }],
          },
          {
            actors: [{ id: "me", expression: "sad" }],
            dialogue: [{ from: "me", text: "아직 해결하지 못했어." }],
          },
          {
            actors: [{ id: "me", expression: "angry" }],
            dialogue: [{ from: "me", text: "같은 오류가 또 났어. 답답해!" }],
          },
        ],
      ),
    },
    {
      id: "gestures",
      title: "인사와 가리키기",
      category: "표현",
      description:
        "인사손과 가리키는손은 고정된 손 모양입니다. 시간에 따라 움직이지 않으며 지정하지 않은 인물에는 손이 없습니다.",
      features: ["인사손", "가리키는손", "손 생략"],
      source: sourceFor(
        "손으로도 이야기해요",
        {
          hello: { asset: "client", label: "안내자" },
          guide: { asset: "server", label: "설명자" },
          listener: { asset: "database", label: "청중" },
        },
        [
          {
            actors: [
              { id: "hello", gesture: "wave", expression: "happy" },
              { id: "guide", gesture: "point" },
              "listener",
            ],
            dialogue: [
              {
                from: "hello",
                to: "listener",
                text: "반가워요! 같이 시작해요.",
              },
              {
                from: "guide",
                to: "listener",
                text: "중요한 부분을 짚어볼게요.",
              },
            ],
          },
        ],
      ),
    },
    {
      id: "languages",
      title: "한국어와 영어 함께",
      category: "다국어",
      description:
        "번역 대사를 같은 컷에 넣고 명시적인 줄바꿈을 사용합니다. 글꼴은 보는 환경에 따라 달라집니다.",
      features: ["한국어·영어", "YAML 여러 줄", "줄바꿈"],
      source: sourceFor(
        "Hello, 안녕하세요",
        {
          ko: { asset: "client", label: "한국어" },
          en: { asset: "server", label: "English" },
        },
        [
          {
            actors: [
              { id: "ko", expression: "happy" },
              { id: "en", expression: "happy" },
            ],
            dialogue: [
              {
                from: "ko",
                to: "en",
                text: "요청을 보내요.\n응답을 기다려요.",
              },
              {
                from: "en",
                to: "ko",
                text: "Send a request.\nWait for the response.",
              },
            ],
          },
        ],
      ),
    },
    {
      id: "manual",
      title: "위치와 글자 크기 조절",
      category: "배치",
      description:
        "인물의 좌우·크기, 말풍선 위치와 글자 크기를 직접 조절합니다.",
      features: ["가로·세로위치", "배율", "글자크기"],
      source: sourceFor(
        "직접 배치해 보기",
        {
          a: { asset: "client", label: "작은 화자" },
          b: { asset: "server", label: "큰 화자" },
        },
        [
          {
            actors: [
              { id: "a", x: 0.25, y: 0.85, scale: 0.8 },
              { id: "b", x: 0.75, scale: 1.1 },
            ],
            dialogue: [
              {
                from: "a",
                to: "b",
                text: "위치와 크기를 바꿀 수 있어요.",
                x: 0.35,
                y: 0.05,
                fontSize: 16,
              },
              {
                from: "b",
                to: "a",
                text: "나는 조금 더 크게 말할게!",
                x: 0.65,
                y: 0.25,
                fontSize: 22,
              },
            ],
          },
        ],
      ),
    },
    {
      id: "long-text",
      title: "긴 설명의 자동 줄바꿈",
      category: "문서",
      description:
        "긴 한국어 설명과 공백 없는 영어 식별자를 자동으로 여러 줄에 배치합니다.",
      features: ["자동 줄바꿈", "긴 식별자", "문서 삽입"],
      source: sourceFor(
        "긴 내용도 읽기 쉽게",
        { guide: { asset: "server", label: "설명자" } },
        [
          {
            actors: [{ id: "guide", gesture: "point" }],
            dialogue: [
              {
                from: "guide",
                text: "요청과 응답을 구분하면 웹의 동작을 이해하기 쉬워요. 요청은 원하는 작업을 알려주고, 응답은 그 결과를 돌려줍니다. 긴 설명도 말풍선 너비에 맞춰 줄바꿈해요.",
              },
              {
                from: "guide",
                text: "VeryLongUnbrokenIdentifierThatStillNeedsToFitInsideTheSpeechBubble",
              },
            ],
          },
        ],
      ),
    },
    {
      id: "welcome",
      title: "인사한 뒤 서로 소개하기",
      category: "몸짓·대화",
      description:
        "펼친 손으로 인사한 뒤 대화 상대를 가리킵니다. 같은 두 사람을 유지해 손 모양과 손이 향하는 상대를 비교합니다.",
      features: ["인사 → 소개", "좌우 가리키기", "같은 외형"],
      source: sourceFor("반가워요, 함께 시작해요", conversationCast, [
        {
          actors: [
            { id: "sora", expression: "happy", gesture: "wave" },
            { id: "jun", expression: "happy" },
          ],
          dialogue: [
            { from: "sora", to: "jun", text: "안녕하세요! 저는 소라예요." },
          ],
        },
        {
          actors: [
            { id: "sora", gesture: "point" },
            { id: "jun", gesture: "point" },
          ],
          dialogue: [
            { from: "sora", to: "jun", text: "준 씨가 오늘 설명을 맡았어요." },
            { from: "jun", to: "sora", text: "소라 씨와 함께 준비했어요." },
          ],
        },
      ]),
    },
    {
      id: "question-answer",
      title: "질문하고 자기 말로 이해하기",
      category: "교육·대화",
      description:
        "질문, 설명, 이해한 결과를 세 컷으로 나눕니다. 마지막 컷에서 질문한 사람의 표정과 대사를 함께 바꿉니다.",
      features: ["어리둥절 → 기쁨", "한 컷 한 단계", "3컷 문답"],
      source: sourceFor("같은 숫자, 다른 뜻", conversationCast, [
        {
          actors: [{ id: "sora", expression: "confused" }, "jun"],
          dialogue: [
            {
              from: "sora",
              to: "jun",
              text: "클릭이 늘면 주문도 늘지 않나요?",
            },
          ],
        },
        {
          actors: ["sora", { id: "jun", gesture: "point" }],
          dialogue: [
            {
              from: "jun",
              to: "sora",
              text: "클릭은 관심, 주문은 실제 구매예요.",
            },
          ],
        },
        {
          actors: [
            { id: "sora", expression: "happy" },
            { id: "jun", expression: "happy" },
          ],
          dialogue: [
            {
              from: "sora",
              to: "jun",
              text: "아하! 주문까지 이어졌는지도 봐야겠네요.",
            },
          ],
        },
      ]),
    },
    {
      id: "handoff",
      title: "건네기 전·중·후를 구분하기",
      category: "소품·이야기",
      description:
        "첫 컷에서는 소라가 열쇠를 들고, 둘째 컷에서 건네고, 마지막 컷에서는 준이 듭니다. 소품의 주인이 바뀐 결과까지 보여줍니다.",
      features: ["든소품 → 전달 → 든소품", "소유권 변화", "3컷"],
      source: sourceFor("회의실 열쇠를 건네요", conversationCast, [
        {
          actors: [{ id: "sora", holding: "key" }, "jun"],
          dialogue: [
            { from: "sora", to: "jun", text: "회의실 열쇠는 내가 갖고 있어." },
          ],
        },
        {
          actors: ["sora", "jun"],
          dialogue: [
            { from: "sora", to: "jun", text: "먼저 도착하니까 네게 건넬게." },
          ],
          transfer: [{ from: "sora", to: "jun", prop: "key" }],
        },
        {
          actors: ["sora", { id: "jun", holding: "key", expression: "happy" }],
          dialogue: [
            { from: "jun", to: "sora", text: "받았어! 내가 문을 열어 둘게." },
          ],
        },
      ]),
    },
    {
      id: "listening",
      title: "감정을 듣고 다음 행동을 정하기",
      category: "감정·이야기",
      description:
        "불만에 바로 웃거나 손가락질하지 않고 차분하게 답합니다. 이유를 듣고 표정이 풀리는 과정을 대사와 함께 보여줍니다.",
      features: ["화남 → 보통 → 기쁨", "경청", "3컷 대화"],
      source: sourceFor("먼저 듣고 함께 해결해요", conversationCast, [
        {
          actors: [{ id: "sora", expression: "angry" }, "jun"],
          dialogue: [
            {
              from: "sora",
              to: "jun",
              text: "변경된 일정을 왜 알려주지 않았어?",
            },
          ],
        },
        {
          actors: ["sora", { id: "jun", expression: "sad" }],
          dialogue: [
            {
              from: "jun",
              to: "sora",
              text: "미안해. 다음부터 바로 공유할게.",
            },
          ],
        },
        {
          actors: [{ id: "sora", expression: "happy" }, "jun"],
          dialogue: [
            {
              from: "sora",
              to: "jun",
              text: "좋아. 이번 일정부터 같이 정리하자.",
            },
          ],
        },
      ]),
    },
    {
      id: "reading-order",
      title: "자리를 바꿔도 누가 말하는지",
      category: "배치·읽기",
      description:
        "짧은 질문과 답을 위에서 아래로 배치합니다. 다음 컷에서 좌우 자리를 바꿔도 이름표와 말풍선이 화자를 구분합니다.",
      features: ["발화 순서", "좌우 자리 교환", "수동 배치"],
      source: sourceFor("누가 묻고 누가 답할까요?", conversationCast, [
        {
          actors: [
            { id: "sora", x: 0.22 },
            { id: "jun", x: 0.78 },
          ],
          dialogue: [
            { from: "sora", to: "jun", text: "준비됐어요?", x: 0.26, y: 0.05 },
            {
              from: "jun",
              to: "sora",
              text: "네, 시작하죠!",
              x: 0.74,
              y: 0.28,
            },
          ],
        },
        {
          actors: [
            { id: "sora", x: 0.78 },
            { id: "jun", x: 0.22 },
          ],
          dialogue: [
            {
              from: "jun",
              to: "sora",
              text: "다음은 소라 씨 차례예요.",
              x: 0.3,
              y: 0.05,
            },
            {
              from: "sora",
              to: "jun",
              text: "좋아요. 제가 이어갈게요.",
              x: 0.7,
              y: 0.28,
            },
          ],
        },
      ]),
    },
  ];
}

export function findExample(id: string | null): Example {
  return (
    examples.find((example) => example.id === id) ??
    examples.find((example) => example.id === "before")!
  );
}

export const actionExample = koreanSource(`title: 데이터를 전달해요
cast:
  browser: {asset: client, label: 클라이언트}
  web: {asset: server, label: 웹 서버}
  db: {asset: database, label: DB}
panels:
  - actors:
      - {id: browser, expression: confused, holding: request}
      - {id: web, expression: happy, gesture: wave}
      - {id: db, expression: neutral}
    dialogue:
      - {from: browser, to: web, text: "이 요청을 처리해 줄래?"}
      - {from: web, to: db, text: "DB, 필요한 데이터를 찾아줘!"}
    transfer:
      - {from: browser, to: web, prop: request}
  - actors:
      - {id: web, expression: happy}
      - {id: db, expression: happy, holding: data}
    dialogue:
      - {from: db, to: web, text: "여기 데이터야. 응답에 사용해!"}
    transfer:
      - {from: db, to: web, prop: data}
`);

export const examples = getExamples().map((example) => ({
  ...example,
  source: koreanSource(example.source),
}));
