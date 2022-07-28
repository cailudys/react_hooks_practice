import React, { useState, useEffect } from "react";
// 导入ReactDOM是为了使用 ReactDOM里卸载组件的方法
import root from "./index";

function App(props) {
  function onScroll() {
    console.log("页面发生滚动了");
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const timmerId = setInterval(() => {
      setCount(
        // count + 1 如果这样写的话 定时器每次都是 执行 0 + 1 达不到预取效果
        // 回调函数的count 代表最新的count值
        (count) => {
          document.title = count + 1;
          return count + 1;
        }
      );
    }, 1000);
    return () => {
      clearInterval(timmerId);
    };
  }, []);

  return (
    <div>
      <span>{count}</span>
      <button
        onClick={() => {
          root.unmount(document.getElementById("root"));
        }}
      >
        移除组件
      </button>
    </div>
  );
}

export default App;
