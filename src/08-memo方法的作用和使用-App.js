import React, { useEffect, useState, memo } from "react";

// 我们创建一个新的组件，然后用App组件包裹这个组件。
// 然我们点击按钮，更改count状态，这时App组件会重新渲染。
// 当App组件渲染的时候，它包裹的组件也会重新渲染。

function App(props) {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Foo />
    </div>
  );
}

const Foo = memo(function Foo(props) {
  console.log("Foo组件重新渲染了");
  return <div>我是Foo组件</div>;
});

export default App;
