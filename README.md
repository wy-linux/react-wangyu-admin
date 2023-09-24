### React Hook + Redux + Typescript + Antd 后台管理系统模板
```shell
1. npm install  下载相关依赖
2. npm run start 启动项目
3. npm run build 打包项目，线上部署
4. 后端接口：https://github.com/wy-linux/React-wangyu-admin-server
```
##### 权限校验模块

```javascript
export const useAppRoutes = () => {
    //获取后端权限列表 
    const { routes } = useAppSelector(selectUser);
    //动态生成路由
    resultRoutes = filterRouter({
        allAsyncRoutes: cloneDeep(allAsyncRoutes),
        routes
    }) 
    return useRoutes([...resultRoutes, ...constantRoutes]);
};

export const filterRouter: FilterRouter = ({
    allAsyncRoutes,
    routes
}) => {
    //hash表结构化， 以优化时间复杂度
    const routeHash = (() => {
        const hash: Record<string, any> = {};
        routes.forEach((route) => { hash[route] = true });
        return hash
    })()
    return treeRouterFilter({
        routeHash,
        allAsyncRoutes,
    })
}

//递归处理
const treeRouterFilter: TreeRouterFilter = ({
    routeHash,
    allAsyncRoutes,
    lv = 0
}) => {
    return allAsyncRoutes.filter(router => {
        router.children = treeRouterFilter({
            routeHash,
            allAsyncRoutes: router.children || [],
            lv: lv + 1
        })
        return (lv === 0) || routeHash[router.name]
    })
}

```