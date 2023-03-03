### React Hook + Redux + Typescript + Antd 后台管理系统模板
```shell
1. npm install  下载相关依赖
2. npm run start 启动项目
3. npm run build 打包项目，线上部署
4. 后端接口：https://github.com/wy-linux/React-wangyu-admin-server
```
##### 权限校验模块

```javascript
const App: React.FC = () => {  
  const lang = useAppSelector(selectLang);
  return <ConfigProvider locale={lang === "zh_CN" ? zhCN : enUS}>{useAppRoutes()}</ConfigProvider>;
}
export default withAuthorization(App); 
// HOC 封装 App-->WrappedComponent
const withAuthorization = (WrappedComponent: FC)
// 获取后端路由 动态生成路由
export const useAppRoutes = () => {
  const {routes} = useAppSelector(selectUser);  
  resultRouter = routes?.length ? filterRouter({
    allAsyncRoutes,
    routes
  }) : constantRoutes  
  return useRoutes([...resultRouter, ...anyRoute]);
};
```