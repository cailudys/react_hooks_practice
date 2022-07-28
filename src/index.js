import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 把 <React.StrictMode> 去掉，组件挂载的时候就不会先卸载再挂载。
  // <React.StrictMode>
  <Router>
    <App />
  </Router>

  // </React.StrictMode>
);

export default root;
