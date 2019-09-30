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

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      console.log({msg})
    });
  }
  // Create a user

  const user = "Erka" + Math.random(100).toFixed(2);

  const [allChats] = React.useReducer(reducer, initState);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
