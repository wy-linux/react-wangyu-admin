// 控制router的业务逻辑
import { FilterRouter, TreeRouterFilter } from "./types";
import cloneDeep from 'lodash/cloneDeep'
// 递归处理
const treeRouterFilter: TreeRouterFilter = ({
  routeHash,
  allAsyncRoutes,
  lv = 0
}) => {
  // TODO
  const routes = cloneDeep(allAsyncRoutes);
  return routes.filter(router => {
    const { children = [] } = router;
    router.children = treeRouterFilter({
      routeHash,
      allAsyncRoutes: children,
      lv: lv+1
    })
    return (lv === 0) || routeHash[router.name] 
  })
}

// 处理权限控制的函数
export const filterRouter: FilterRouter = ({
  allAsyncRoutes,
  routes
}) => {  
  // hash表结构化， 以优化时间复杂度
  const routeHash = (()=>{
    const hash: Record<string, any> = {};
    routes.forEach((route)=>{hash[route] = true});
    return hash
  })()
  return treeRouterFilter({
    routeHash,
    allAsyncRoutes,
  })
}
