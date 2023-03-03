import  request  from "@/utils/request"
import type { Key } from "react";
import { GetUserListParams, GetUserListResponse, UserTypes, RoleTypes } from "./model/userTypes";
const api_name = '/permission/user'
/**
 * 获取用户信息
 * @param 
 * @returns 
 */
export const getUserList = ({page, limit, username}: GetUserListParams) => {
  return request.get<any, GetUserListResponse>(`${api_name}/info`);
}

/**
 * @description: 添加用户
 * @param {UserTypes} user
 * @returns {*}
 */
export const adduser = (user: UserTypes) => {
  return request.post(`${api_name}/add`, {...user})
}

/**
 * @description: 修改用户
 * @param {UserTypes} user
 * @returns {*}
 */
export const updateUser = (user: UserTypes) => {
  return request.post(`${api_name}/update`, {...user})
}

/**
 * @description: 删除用户
 * @param {UserTypes} user
 * @returns {*}
 */
export const delUser = (id: number) => {
  return request.get(`${api_name}/delete/${id}`,)
}

/**
 * @description: 批量删除用户
 * @param {UserTypes} user
 * @returns {*}
 */
 export const batchDelUser = (idList: Key[]) => {
  return request.delete(`${api_name}/batchRemove`, {data: idList})
}

/**
 * @description: 获取所有角色
 * @param {number} userId
 * @returns {*}
 */
export const getRoles = (userId: number | undefined) => {
  return request.get(`${api_name}/roleInfo/${userId}`);
}


/**
 * @description: 给用户分配角色
 * @returns {*}
 */
 export const assignRoles = (userId: string, roleIds: string) => {
  return request.post<any, null>(`${api_name}/roleInfo/update`,{userId, roleIds})
}


