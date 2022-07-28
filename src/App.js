import React, { useState, useEffect } from "react";
// 导入ReactDOM是为了使用 ReactDOM里卸载组件的方法
import root from "./index";

function App(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let a = "副作用1";
    console.log(a);
    return () => {
      console.log(`${a}，被卸载了`);
    };
  });

  return (
    <div>
      <span>{count}</span>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          root.unmount(document.getElementById("root"));
        }}
      >
        卸载组件
      </button>
    </div>
  );
}

export default App;
