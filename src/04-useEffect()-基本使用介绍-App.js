import React, { useState, useEffect } from "react";
// 导入ReactDOM是为了使用 ReactDOM里卸载组件的方法
import root from "./index";

function App(props) {
  const [count, setCount] = useState(0);

  useEffect(() => () => {
    // 返回的函数 会在组件更新阶段和卸载阶段被执行（挂载阶段不会被执行）
    // 一般在这里清除副作用 （比如解决网络请求竞态问题）
    console.log(`被卸载了`);
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
          setCount(count + 1);
          // root.unmount(document.getElementById("root"));
        }}
      >
        卸载组件
      </button>
    </div>
  );
}

export default App;
