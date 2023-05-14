import { reqGetUserInfo, reqLogin, reqLogout, reqRestore } from "@/api/user";
import { RootState } from "../index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 登陆参数的类型
export interface LoginParams {
  email: string;
  password: string;
}

// State的类型
interface UserState {
  token: string;
  name: string;
  avatar: string;
  routes: string[];
  buttons?: string[];
}

// 初始状态
const initialState: UserState = {
  token: localStorage.getItem('token') || '',
  name: '',
  avatar: '',
  routes: [],
  buttons: []
}

// 登陆 
export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  ({email, password}: LoginParams) => reqLogin(email, password)
)

// 获取用户信息
export const getUserInfoAsync = createAsyncThunk(
  'user/getUserInfoAsync',
  () => reqGetUserInfo()
)

// 退出
export const logoutAsync = createAsyncThunk(
  'user/LogoutAsync',
  () => reqLogout()
)
// 恢复数据库
export const restoreAsync = createAsyncThunk(
  'user/RestoreAsync',
  () => reqRestore()
)

// 创建当前redux模块的管理对象slice
const userSlice = createSlice({
  name: 'user', // 标识名称
  initialState, // 初始状态
  // 配置同步action对应的reducer => 同步action会自动生成
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.token = token
      localStorage.setItem('token',token)
    },
    removeToken(state) {
      state.token = ''
      state.name = ''
      localStorage.removeItem('token')
    }
  },
  // 为前面定义的异步action, 定义对应的reducer
  extraReducers(builder) {
    builder
      // 登陆请求成功后的reducer处理
      .addCase(loginAsync.fulfilled, (state, action) => {  
        // 将token保存localStorage / redux
        const token:any = action.payload
        localStorage.setItem('token',token)
        state.token = token
      })
      // 获取用户信息请求成功后的reducer处理
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        const {name, avatar, routes, buttons} = action.payload
        state.name = name
        state.avatar = avatar
        state.routes = routes;
        state.buttons = buttons;
      })
      // 退出请求成功后的reducer处理
      .addCase(logoutAsync.fulfilled, (state, action) => {
        // 清除state和local中的token
        state.name = ''
        state.avatar = ''
        state.token = ''
        state.routes = []
        state.buttons = []
        localStorage.removeItem('token')
      })
      // 恢复数据库后的reducer处理
      .addCase(restoreAsync.fulfilled, (state, action) => {
        state.name = ''
        state.avatar = ''
        state.token = ''
        state.routes = []
        state.buttons = []
        localStorage.removeItem('token')
      })
  },
})

// 暴露reducer
export const userReducer = userSlice.reducer

export const { setToken, removeToken } = userSlice.actions;

// 暴露用于读取当前状态数据的select函数
export const selectUser = (state: RootState) => state.user
