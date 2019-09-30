import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initState = {
  general: [
    { from: "Pedro", msg: "yoo" },
    { from: "Seth", msg: "Hollywood" },
    { from: "Erka", msg: "Life" }
  ],
  topic2: [
    { from: "Code", msg: "Yeeees" },
    { from: "ContextApi", msg: "yiiiihaaa" },
    { from: "Christmas", msg: "Maybe" }
  ]
};
const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
};

let socket;

function sendChatAction(socket, value) {
  socket.emit("chat message", value)
}

export default function Store(props) {
  if (!socket) {
    socket = io(":3001");
  }
  const [allChats, dispatch] = React.useReducer(reducer, initState);

  return <CTX.Provider value={allChats}>{props.children}</CTX.Provider>;
}
