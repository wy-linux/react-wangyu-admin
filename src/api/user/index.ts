import  request  from "@/utils/request";
import { ReqGetUserInfoResponse, ReqLoginResponse } from "./model/userTypes";

// 登录
export const reqLogin = (email: string, password: string) => {
  return request.post<any, ReqLoginResponse>("/permission/user/login", {
    email,
    password,
  });
};

// 登出
export const reqLogout = () => {
  return request.get<any, null>("/permission/user/logout");
};

// 获取用户信息
export const reqGetUserInfo = () => {
  return request.get<any, ReqGetUserInfoResponse>("/permission/info");
};

// 恢复数据库
export const reqRestore = () => {
  return request.get<any, any>("/mongorestore");
};

