import React, { useEffect, useState } from "react";

function getData() {
  return new Promise((resolve) => {
    resolve({ msg: "Hello" });
  });
}

function App(props) {
  useEffect(() => {
    // 要在异步函数里面使用 async await 不能直接把async加载第一个回调函数上
    // 原因时async 函数返回的是一个promise对象， 与effect要求返回函数冲突。
    // 那么在useEffect中要像如下写异步函数(自执行函数)
    (async function () {
      let response = await getData();
      console.log(response);
    })();
  }, []);

  return <div>app working</div>;
}

export default App;
