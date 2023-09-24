import  request  from "@/utils/request"
import { Menu } from "./model/permisionTypes"
const api_name = '/permission/menu'
/**
 * 获取权限(菜单/功能)列表
 * @returns 
 */
export const getPermissionList = () => { 
  return request.get(`${api_name}/info`) as Promise<Menu>
}

/**
 * 删除一个权限项
 * @param id 
 * @returns 
 */
export const removePermission = (id: string) => {
  return request.get(`${api_name}/delete/${id}`)
}
  
/**
 * 保存一个权限项
 */
export const addPermission = (permission: any) => {
  return request.post(`${api_name}/add`, {...permission})
}

/**
 * 更新一个权限项
 */
export const updatePermission = (permission: any) => {
  return request.post(`${api_name}/update`, { ...permission })
}

/**
 * 查看某个角色的权限列表
 */
export const toAssign = (roleId: string | undefined) => {  
  return request.get(`/permission/role/menuInfo/${roleId}`) as Promise<Menu>
}

/**
 * 给某个角色授权
 */
export const doAssign = (roleId: string | undefined, permissionId: string[]) => {
  return request.post(`/permission/role/menuInfo/update`, {roleId, permissionId})
}