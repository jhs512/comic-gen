export const starter = `title: 요청과 응답
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
`;

export const actionExample = `title: 데이터를 전달해요
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
`;
