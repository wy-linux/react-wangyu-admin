const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    // 自定义主题
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#9e4b35" },
            javascriptEnabled: true,
          },
        },
      },
    },
    // 路径别名
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "./tsconfig.extend.json",
      },
    },
  ],
  // 开发服务器配置
  devServer: {
    // 激活代理服务器
    proxy: {
      // 将来以/dev-api开头的请求，就会被开发服务器转发到目标服务器去。
      "/dev-api": {
        // 需要转发的请求前缀
        target: 'https://www.wangyu.cloud:7000',
        changeOrigin: true, // 为true时代理在转发时, 会将请求头的host改为target的值
        pathRewrite: { // 路径重写
          "^/dev-api": "", // 在转发请求时去掉多的/dev-api部分
        },
      },
    },
  },
};
