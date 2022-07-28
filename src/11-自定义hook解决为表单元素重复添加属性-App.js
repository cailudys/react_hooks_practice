import React, { useEffect, useState } from "react";

// 问题：表单里面要重复绑定 value 和 onchange事件
// 目标：使用自定义hook 把这个过程抽象出来，之后直接调用hook函数生成这两个对象的集合。

// 这就是自定义hook ，实质就是一个函数。
function useUpdateInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (event) => setValue(event.target.value),
  };
}

function App(props) {
  const usernameInput = useUpdateInput("");
  const passwordInput = useUpdateInput("");
  const submitFrom = (event) => {
    event.preventDefault();
    console.log(usernameInput.value);
    console.log(passwordInput.value);
  };

  return (
    <form onSubmit={submitFrom}>
      <input type="text" name="username" {...usernameInput}></input>
      <input type="password" name="password" {...passwordInput}></input>
      <input type="submit" />
    </form>
  );
}

export default App;
