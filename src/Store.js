import React from "react";

const CTX = React.createContext();

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
            state;
    }
}
export default reducer;

export default function store(props) {

  const reducerHook = React.useReducer(reducer, initState)
  return (
    <CTX.Provider value={}>
      {props.children}
    </CTX.Provider>
  )
}