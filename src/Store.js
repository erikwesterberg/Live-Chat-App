import React from "react";

const CTX = React.createContext();

const initState = {
  general: [
      {from: "Pedro", msg: "yoo"},
      {from: "Seth", msg: "Hollywood"},
      {from: "Erka", msg: "Life"}
  ],
  topic2 : [
  {from: "Code", msg: "Yeeees"},
  {from: "ContextApi", msg: "yiiiihaaa"},
  {from: "Christmas", msg: "Maybe"}
  ]
}
const reducer = (state, action) => {
  const { from, msg, topic } = action.payload
    switch(action.type) {
       case "RECIVE_MESSAGE":
         return {
            ...state, 
            [topic] : [
              ...state[topic],
                {
                  from,
                  msg
                }
            ]
         }
         default:
            return state
    }
}


export default function Store(props) {

  const reducerHook = React.useReducer(reducer, initState)

  return (
    <CTX.Provider value={reducerHook}>
      {props.children}
    </CTX.Provider>
  )
}