import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import store from "./store/index";
import { Provider } from "react-redux";
import App from "./App";
import "./assets/locales/i18n"; // 国际化
import "antd/dist/antd.less";
import "./index.less";

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>
);