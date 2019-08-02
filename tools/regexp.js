// 正则
export const regPhone = /^1[3456789][0-9]\d{8}$/
export const regName = /^[\u2E80-\u9FFF]+$/
export const regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
export const regQQ = /^[1-9]\d{5,11}$/
export const regDetailRoute = /^\/[a-z]{3}-\d{1,}.html$/
export const regLatestTopicsRoute = /^\/latest-topics(?:\/(?=$))?$/i
export const regSiteMapRoute = /^\/sitemap(?:\/((?:[^\/]+?)))?(?:\/(?=$))?$/i

// 常量
export const COOKIE_DOMAIN = '.51jiaoxi.com'
export const COOKIE_EXPIRES = 7
