import React, { useEffect, useState, useMemo } from "react";

// useMemo
// 调用useMemo钩子函数的时候，需要传递两个参数。第一个参数是一个回调函数，第二个参数是要检测的那个数组。
// 当你要检测的数组里面的元素发生变化的时候，这个回调函数就会被重新执行了。同理，不变的话，即使组件重新渲染也不重新计算。
// useMeno的特点是会缓存计算结果。useMemo钩子函数的返回值，就是它的回调函数被调用后返回的值。

function App(props) {
  const [count, setCount] = useState(0);
  const [bool, setBool] = useState(true);
  // 当需要根据一个状态，来计算一个新值的时候使用？
  // 优势目前不明显啊
  const result = useMemo(() => {
    console.log("useMemo执行了");
    return count * 2;
  }, [count]);

  // 在函数组件里创建一个变量

  return (
    <div>
      <span>
        {count} {result}
      </span>
      <span>{bool ? "真" : "假"}</span>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          setBool(!bool);
        }}
      >
        setBool
      </button>
    </div>
  );
}

export default App;
