import React, { createContext, useContext } from "react";

// 实例化一个context对象
const countContext = createContext();

function App(props) {
  return (
    <countContext.Provider value={100}>
      <Foo></Foo>
    </countContext.Provider>
  );
}

// Foo子组件 获取context中的内容
function Foo(props) {
  const value = useContext(countContext);
  return <div>{value}</div>;
}

export default App;
