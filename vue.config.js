let NODE_ENV = process.env.NODE_ENV;
let isPro = NODE_ENV === "production";
let isDev = NODE_ENV === "development";
module.exports = {
  // 代理
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://yxt.51jiaoxi.com/',
  //       ws: true,
  //       changeOrigin: true
  //     },
  //   }
  // },
  // webpack
  configureWebpack: {
    // 生产环境下 去除运行依赖包
    externals: isPro
      ? {
          // 前者是导入名, 后者是导出名
          // vue
          vue: "Vue",
          // vueroter
          "vue-router": "VueRouter",
          // axios
          axios: "axios",
          // vuex
          vuex: "Vuex",
          // element-ui
          "element-ui": "ElementUI"
        }
      : {}
  },
  chainWebpack: config => {
    /* 添加分析工具*/
    // if (isPro) {
    //   if (process.env.npm_config_report) {
    //     config
    //       .plugin("webpack-bundle-analyzer")
    //       .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
    //       .end();
    //     config.plugins.delete("prefetch");
    //   }
    // }
  },
  // 生产环境去除 map 文件
  productionSourceMap: isDev,
  // 开发环境引入 public/dev.html
  pages: isDev
    ? {
        index: {
          // page 的入口
          entry: "src/dev.js",
          // 模板来源
          template: "public/dev.html"
        }
      }
    : undefined
};
