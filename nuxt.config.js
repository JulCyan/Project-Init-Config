const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  // 模式: 服务器端渲染
  mode: 'universal',
  env: {
    baseUrl: isDev ? 'http://mobile.feat.51jiaoxi.com/' : 'http://www.51jiaoxi.com/',
  },
  // 默认 head
  head: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0',
      },
      { name: 'author', content: 'BlackCyan&Sam' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/scss/base.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/scss/norem.css' },
    ],
    script: [
      { src: '/js/flexible.js', type: 'text/javascript', charset: 'utf-8' },
      // { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-137517687-1' },
      { src: `https://hm.baidu.com/hm.js?bb00649777fe283898f7f36b6e473faa` },
    ],
  },
  // 自定义 router
  router: {
    extendRoutes(routes) {
      const routersArr = ['topic', 'sitemap']
      routersArr.forEach((item, i) => {
        routes.forEach(route => {
          if (route.path.includes(item)) {
            let reg = new RegExp(item + '/')
            let path = route.path
            path = path.replace(reg, item + '-')
            route.path = path
          }
        })
      })
    },
  },
  // 自定义 loading
  loading: {
    css: false,
  },
  // 全局样式
  // css: ['vant/lib/index.css', '~/assets/scss/base.scss'],
  // 插件
  plugins: [
    { src: '@/plugins/vant-ui' },
    { src: '@/plugins/axios' },
    { src: '@/plugins/axios-req.config' },
    { src: '@/plugins/head.config' },
    { src: '@/plugins/utils' },
    { src: '@/plugins/filters' },
    { src: '@/plugins/ga', ssr: false },
  ],
  modules: ['@nuxtjs/axios'],
  // nuxt.axios
  axios: {
    proxy: isDev,
    // host: isDev ? 'localhost' : 'test.51jiaoxi.com',
    host: isDev ? 'localhost' : 'www.51jiaoxi.com',
    port: isDev ? '3000' : '80',
    prefix: '/api/',
  },
  // axios 代理
  proxy: {
    '/api/': {
      // target: 'http://test.51jiaoxi.com', // 代理地址
      target: 'http://www.51jiaoxi.com', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': 'api',
      },
    },
  },
  build: {
    loaders: {
      imgUrl: { limit: 970 },
    },
    transpile: [/^vant-ui/],
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 37.5,
          propList: ['*'],
        },
        autoprefixer: {
          browsers: ['Android >= 4.0', 'iOS >= 7'],
        },
      },
    },
    extend(config, ctx) {},
  },
  // vue.config
  vue: {
    config: {
      devtools: isDev,
      // 生产环境去除 map 文件
      productionSourceMap: true,
      // 生产环境提示
      productionTip: false,
    },
  },
}
