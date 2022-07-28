import React, { useEffect, useState, memo, useCallback } from "react";

// 有一个需求：
// 1. 在App组件里创建一个方法，这个方法用来清除数值。
// 2. 然后把这个方法传递给Foo组件，并且在Foo组件里添加一个按钮，点击时使App数值清零

// 实现需求后发现，虽然Foo组件使用了memo，但是因为App组件传递了方法给Foo，每次渲染都是一个新的同功能的方法传递过去的。
// 所以导致Foo组件，在不需要更新的情况下更新了n多次

// 原因是，当改变count状态的时候，组件重新渲染了，重新渲染时会生成一个新的resertCount实例，并传递给了Foo函数。
// Foo函数检测到resertCount改变了就会更新组件。（其实resertCount功能还是一样的，最好缓存这个实例，使这个函数实例保持不变）
// useCallback()就是解决这个问题的。
function App(props) {
  const [count, setCount] = useState(0);

  const resertCount = useCallback(() => {
    setCount(0);
  }, [setCount]);

  // const resertCount = () => {
  //   setCount(0);
  // };

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Foo resertCount={resertCount} />
    </div>
  );
}

const Foo = memo(function Foo(props) {
  console.log("Foo组件重新渲染了");
  return (
    <div>
      我是Foo组件
      <button onClick={props.resertCount}>resetCount</button>
    </div>
  );
});

export default App;
