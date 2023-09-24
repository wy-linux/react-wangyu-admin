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
    devServer: {
        proxy: {
            "/dev-api": {
                target: 'https://www.wangyu.cloud:7000',
                // target: 'http://localhost:7000',
                changeOrigin: true, // 为true时代理在转发时, 会将请求头的host改为target的值
                pathRewrite: {
                    "^/dev-api": "",
                },
            },
        },
    },
};
