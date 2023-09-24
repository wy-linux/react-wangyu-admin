import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
// 状态数据接口
interface AppState {
    lang: string;
}

// 初始化状态
let initialState: AppState = {
    lang: localStorage.getItem("lang") || "zh_CN"
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLang(state, action) {
            const lang = action.payload;
            localStorage.setItem("lang", lang);
            state.lang = lang;
        },
    },
});

// 暴露同步action
export const { setLang } = appSlice.actions;

// 暴露reducer函数
export const appReducer = appSlice.reducer;

// 暴露用来获取数据的select函数
export const selectLang = (state: RootState) => state.app.lang;
