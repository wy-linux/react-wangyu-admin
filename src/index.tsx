import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index";
import { Provider } from "react-redux";
import App from "./App";
import "./assets/locales/i18n"; // 国际化
import "antd/dist/antd.less";
import "./assets/styles/index.css";

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
  // React.StrictMode会导致组件渲染两次
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);