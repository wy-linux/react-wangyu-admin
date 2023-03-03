import {findSideBarRoutes} from '../router'
//返回持有权限的页面
export function returnPagePermission () {
    const [routes] = findSideBarRoutes()
    window.location.href = routes.children![0].path!
    return null
}
//递归获取展开的table row id
export function getExpandedRowKeys (list: any, lv?: number){
    lv = lv ??  2
    const expandedRowKeys: Array<string> = []
    function getRowKeys (list: any, lv: number) {
        for(let i = 0; i < list.length; i++) {
            if(lv == 0) {
                return 
            }
            expandedRowKeys.push(list[0]._id)
            getRowKeys(list, --lv)
        }
    }
    getRowKeys(list, lv)  
    return expandedRowKeys
}