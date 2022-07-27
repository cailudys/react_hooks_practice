import React, { useReducer } from "react";

function App(props) {
  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return state + 1;
      default:
        return state;
    }
  }

  const [count, dispacth] = useReducer(reducer, 0);

  return (
    <div>
      <span>{count}</span>
      <button
        onClick={() => {
          dispacth({ type: "increment" });
        }}
      >
        +1
      </button>
    </div>
  );
}

export default App;
