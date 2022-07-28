import React, { useEffect, useState } from "react";
import axios from "axios";

// 实现这个需求：
// 1.在组件挂载完成之后，向服务器端发送一个请求，获取文章的信息。然后我们把文章的信息显示在页面当中。
// 现在我们假定，向服务器端发送请求文章的事情，也是其他组件需要做的事情。那么这个逻辑就属于共享逻辑。我们就需要把它写在自定义hook函数当中。

function useGetPost() {
  const [post, setPost] = useState({});
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => setPost(res.data));
  }, []);

  // 这里返回啥都行，按需返回
  return [post, setPost];
}

function App(props) {
  const [post, setPost] = useGetPost();
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  );
}

export default App;
