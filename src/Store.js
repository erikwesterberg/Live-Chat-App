import React from "react";

const CTX = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
       case "RECIVE_MESSAGE":
         return {
            ...state, 
            [action.payload.topic] : [
              ...state[action.payload.topic],
                {
                  from: action.payload.from,
                  msg: action.payload.msg
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