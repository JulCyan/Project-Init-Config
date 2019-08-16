export enum Mode {
  development = 'development',
  production = 'production',
  testing = 'testing',
}

export enum CookieDomain {
  development = '',
  production = '.51jiaoxi.com',
  testing = '',
}

export enum Route {
  index = '/',
  login = '/login/',
  client = '/client/',
  clientDetail = '/client/detail/',
  earnings = '/earnings/',
  earningsDetail = '/earnings/detail/',
  password = '/password/',
}

export enum BrowserName {
  weChat = 'weChat',
}

export enum FooterInfo {
  copy = 'Copyright © 2018 51jiaoxi.com 深圳智学帮科技有限公司',
}

export enum RouterRedirectType {
  back = 'back',
  push = 'push',
  forward = 'forward',
}

export enum UserType {
  school = 'schools',
  teacher = 'users',
}

export enum EarningsType {
  group,
  user,
}

export enum SubNavTitle {
  clientSchool = '机构/学校',
  clientTeacher = '教师会员',
  detailSchool = '学校详情',
  detailTeacher = '教师详情',
  earnings = '我的收益',
  earningsDetail = '收益详情',
  password = '修改密码',
}

export enum useTypeIndex {
  All,
  Warning,
  Limit,
  WillExpiration,
  Expiration,
}

export enum useTypeText {
  All = '全部',
  Warning = '额度预警',
  Limit = '额度不足',
  WillExpiration = '即将到期',
  Expiration = '已过期',
}

export enum BalanceStatus {
  Enough,
  Warning,
  Empty,
}
export enum BalanceText {
  Enough = '余额充足',
  Warning = '额度预警',
  Empty = '额度不足',
}

export enum ExpireStatus {
  Not,
  Will,
  Already,
}
export enum ExpireText {
  Not = '未过期',
  Will = '即将到期',
  Already = '已过期',
}

export enum WeChatShareClient {
  Title = '推荐一个在微信中找资料的工具，5分钟配齐一堂课的课件教案试题',
  Dscription = '赠送你30元备课卡！戳进来领取！',
  Icon = 'share-icon.png',
}

export const _isDev: boolean = process.env.NODE_ENV === Mode.development
export const _isProd: boolean = process.env.NODE_ENV === Mode.production
export const _isTest: boolean = process.env.NODE_ENV === Mode.testing

export const COOKIE_DOMAIN: string = CookieDomain[process.env.NODE_ENV]
export const AuthorizeCookie: string = '51_session'
export const WeChatJsApiList: Array<string> = ['updateAppMessageShareData', 'updateTimelineShareData']

export const SuccessStatus: Array<number> = [200, 201]
export const ErrorStatus: Array<number> = [400, 404]
export const UnauthorizedStatus: Array<number> = [401, 403]
export const RedirectStatus: Array<number> = [302, 304]

export const InviteBaseUrl = `//www.51jiaoxi.com/act/fission/invite.html?inviteId=`
export const ImplicitParseFalse = [0, -0, NaN, undefined, null, '', false, document.all]
export const ImplicitParseFalseExcludes = [0, -0, NaN, '', document.all]
