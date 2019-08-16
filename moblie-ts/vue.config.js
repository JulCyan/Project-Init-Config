let NODE_ENV = process.env.NODE_ENV
let isPro = NODE_ENV === 'production'
let isDev = NODE_ENV === 'development'
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  // 代理
  devServer: {
    proxy: {
      '/agents': {
        target: 'http://agents.jx.test',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  // webpack
  configureWebpack: {
    // 生产环境下 去除运行依赖包
    externals: isPro
      ? {
          // 前者是导入名, 后者是导出名
          // vue
          vue: 'Vue',
          // vueroter
          'vue-router': 'VueRouter',
          // axios
          axios: 'axios',
          // vuex
          vuex: 'Vuex',
          // element-ui
          'element-ui': 'ElementUI',
        }
      : {},
  },
  chainWebpack: config => {
    /* 添加分析工具*/
    if (isPro) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin)
        .end()
      config.plugins.delete('prefetch')
    }
  },
  // 生产环境去除 map 文件
  productionSourceMap: isDev,
  // 开发环境引入 public/dev.html
  pages: isDev
    ? {
        index: {
          // page 的入口
          entry: 'src/dev.ts',
          // 模板来源
          template: 'public/dev.html',
        },
      }
    : undefined,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer'],
          }),
        ],
      },
      less: {
        modifyVars: {
          red: '#e6321a',
          blue: '#23b8ff',
          green: '#3aa60d',
          orange: '#ff6600',
          'text-color': '#333',
        },
      },
    },
  },
}
