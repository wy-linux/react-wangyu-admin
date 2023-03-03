import  request  from "@/utils/request"
import type { Key } from "react";
import { GetRoleListParams, GetUserListResponse, RoleTypes } from "./model/roleTypes";
const api_name = '/permission/role'

/**获取角色信息
 * @description
 * @param 
 * @returns {*}
 */
export const getRoleList = ({page, limit, roleName}: GetRoleListParams) => {
  return request.get<any, GetUserListResponse>(`${api_name}/info`);
}

/**
 * @description: 添加用户
 * @param {UserTypes} user
 * @returns {*}
 */
export const adduser = (user: RoleTypes) => {
  return request.post(`${api_name}/add`, {...user})
}

/**
 * @description: 修改用户
 * @param {UserTypes} user
 * @returns {*}
 */
export const updateUser = (user: RoleTypes) => {
  return request.post(`${api_name}/update`, {...user})
}

/**
 * @description: 删除用户
 * @param {UserTypes} user
 * @returns {*}
 */
export const delUser = (id: number) => {
  return request.get(`${api_name}/delete/${id}`)
}

/**
 * @description: 批量删除用户
 * @param {UserTypes} user
 * @returns {*}
 */
 export const batchDelUser = (idList: Key[]) => {
  return request.delete(`${api_name}/batchRemove`, {data: idList})
}

