import { BaseNS } from '@/config/type'
import { Toast } from 'vant'
import { regWeChat } from '@/plugins/regexp'
import { BrowserName, ImplicitParseFalseExcludes } from '@/config/const'
import axios from 'axios'
import { WeChatJsApiList as jsApiList } from '@/config/const'
// @ts-ignore
import WxJssdk from 'weixin-js-sdk'

class Utils {
  public wx: any

  constructor() {
    this.wx = WxJssdk
  }
  /**
   * 数组根据数组对象中的某个属性值进行排序的方法
   * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
   * @method sortBy
   * @param { attr: string, rev: boolean } { 排序属性,排序方式: true ↑ false ↓ }
   * @retunrs function
   */
  public sortBy({ attr, rev = 1 }: any) {
    rev = rev ? 1 : -1
    return function(a: any, b: any) {
      a = a[attr]
      b = b[attr]
      if (a < b) {
        return rev * -1
      }
      if (a > b) {
        return rev * 1
      }
      return 0
    }
  }

  /**
   * 设置本地缓存
   * @param { key: str , val: any }
   * @retunrs true: bool
   */
  public setSto({ key, val }: any) {
    localStorage.setItem(key, JSON.stringify(val))
    return true
  }

  /**
   * 读取本地缓存
   * @param key
   * @retunrs *: any
   */
  public getSto(key: string = '') {
    return JSON.parse(localStorage.getItem(key) || '')
  }

  /**
   * 删除本地缓存
   * @param key
   * @returns {}
   */
  public deleteSto(key: string = '') {
    localStorage.removeItem(key)
    return this
  }

  /**
   * 格式化数据
   * @param { val : string }
   * @returns str
   */
  // 将数字过滤为每三位逗号隔开
  public tostr3(val: BaseNS) {
    return parseFloat(val as string).toLocaleString()
  }

  // 将数字保留两位小数
  public tostr2(val: BaseNS) {
    let tempVal = Number(val)
    return tempVal.toFixed(2)
  }

  // 将数字过滤为每三位逗号间隔并保留两位小数
  public tostr32(val: BaseNS) {
    let tempVal = Number(val)
    return tempVal.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }

  /**
   * 隐藏手机中间/后四位
   */
  public phoneHide(tel: BaseNS, type: string) {
    var tempTel = String(tel)
    let phone
    if (type == 'mid') {
      phone = tempTel.replace(tempTel.substring(3, 7), '****')
    } else if (type == 'end') {
      phone = tempTel.replace(tempTel.substring(7, 11), '****')
    }
    return phone
  }

  public setCookie(
    name: string,
    value: string,
    expires: number,
    domain: string,
    path: string,
    secure: string
  ) {
    var cookieText = ''
    cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (expires) {
      var exp = new Date()
      exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000)
      cookieText += '; expires=' + exp.toUTCString()
    }
    if (domain) {
      cookieText += '; domain=' + domain
    }
    if (path) {
      cookieText += '; path=' + path
    }
    if (secure) {
      cookieText += '; secure'
    }
    document.cookie = cookieText
  }
  public toast(type: any, message: any, duration: any): void {
    Toast({
      type: type || 'text',
      message: message,
      duration: duration || 1500,
    })
  }
  /**
   * @method catchNull:.?实现
   * @param { json | js } root
   * @param { string } next
   * @param { any } defaultParam
   * @returns { json | js }
   */
  public catchNull(root: any, next: string, defaultParam: any): any {
    var val: any = null
    var keys: Array<any> = []
    keys = next.split('.')
    // 根部判断
    if (root) {
      // 键 List 循环
      for (var i = 0; i < keys.length; i++) {
        var current: any = null
        // 键判断是否包含[index]
        if (keys[i].indexOf('[') > -1) {
          // 处理键中有[index]的情况
          var specialKey: BaseNS = keys[i].split('[')[0]
          var strArr: Array<string> = keys[i].split('[')
          strArr.shift()
          var tempCurrent: any = root[specialKey]

          for (var g = 0; g < strArr.length; g++) {
            var index = strArr[g].split(']')[0]
            if (tempCurrent) {
              tempCurrent = tempCurrent[index]
            } else {
              break
            }
          }
          current = tempCurrent
        } else {
          current = root[keys[i]]
        }
        // 判断当前键值是否为空
        if (current) {
          root = val = current
        } else {
          ImplicitParseFalseExcludes.includes(current) ? (root = val = current) : (val = defaultParam)
        }
      }
    } else {
      val = defaultParam
    }
    return val
  }

  public clearSuffix(str: string): string {
    let newStr: string = ''
    if (
      str
        .split('')
        .reverse()
        .join('')
        .indexOf('.') !== -1
    ) {
      newStr = str
        .split('')
        .reverse()
        .join('')
        .split('.')[1]
        .split('')
        .reverse()
        .join('')
    } else {
      newStr = str
    }
    return newStr
  }

  public recursion(data: any, val: BaseNS, key: string = 'value', sonKey: string = 'children'): any {
    let Deep: any, T: any, F: number
    for (F = data.length; F; ) {
      T = data[--F]
      if (val == T[key]) return T
      if (T[sonKey]) {
        Deep = this.recursion(T[sonKey], val)
        if (Deep) return Deep
      }
    }
  }

  // 页面平滑滚动
  public scrollTop(number = 0, time: number = 0) {
    if (!time) {
      document.body.scrollTop = document.documentElement.scrollTop = number
      return number
    }
    const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime // 计算循环的次数
    let nowTop = document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
    let everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
    let scrollTimer = setInterval(() => {
      if (spacingInex > 0) {
        spacingInex--
        this.scrollTop((nowTop += everTop))
      } else {
        clearInterval(scrollTimer) // 清除计时器
      }
    }, spacingTime)
  }

  /**
   *
   * @method throttle:节流构造函数
   * @param func
   * @param time
   * @param option
   * @returns {_throttle}
   */
  public throttle(
    func: () => any,
    time = 20,
    option = {
      leading: true, // 首次是否执行
      trailing: false, // 计时结束是否执行最后一次
      context: null, // this
    }
  ) {
    let timer: number | undefined
    let previous = new Date(0).getTime()
    const _throttle = (...args: []) => {
      let now = new Date().getTime()
      if (!option.leading) {
        if (timer) return
        timer = setTimeout(() => {
          timer = undefined
          func.apply(option.context, args)
        }, time)
      } else if (now - previous > time) {
        func.apply(option.context, args)
        previous = now
      } else if (option.trailing) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(option.context, args)
        }, time)
      }
    }
    _throttle.cancel = () => {
      previous = 0
      clearTimeout(timer)
      timer = undefined
    }
    return _throttle
  }

  /**
   * @method debounce:防抖构造函数
   * @param func
   * @param time
   * @param option
   * @returns {_debounce}
   */
  public debounce(
    func: () => any,
    time: number | undefined,
    option = {
      leading: true,
      context: null,
    }
  ) {
    let timer: any = null
    const _debounce = (...arg: []) => {
      if (timer) {
        clearTimeout(timer)
      }
      if (option.leading && !timer) {
        timer = setTimeout(() => {
          timer = null
        }, time)
        func.apply(option.context, arg)
      } else {
        timer = setTimeout(() => {
          func.apply(option.context, arg)
          timer = null
        }, time)
      }
    }
    _debounce.cancel = () => {
      clearTimeout(timer)
      timer = null
    }
    return _debounce
  }

  public browserMode(key: string): boolean {
    const userAgent = navigator.userAgent.toLocaleLowerCase()
    if (key === BrowserName.weChat) {
      return regWeChat.test(userAgent)
    }
    return false
  }
  public async initWeChatConfig() {
    let weChatConfig: any
    let res = await axios.get('http://test.51jiaoxi.com/wx/signature', {
      params: {
        signUrl: location.href,
      },
    })
    console.log(this.wx)
    weChatConfig = res.data
    console.log(res.data)
    var { appId, timestamp, nonceStr, signature } = weChatConfig
    // timestamp = '' + timestamp
    // console.log(timestamp);

    this.wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature, // 必填，签名
      jsApiList, // 必填，需要使用的JS接口列表
    })

    return this.wx

    // wx.checkJsApi({
    //   jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //   success: function(res) {
    //     console.log(res);

    //   // 以键值对的形式返回，可用的api值true，不可用为false
    //   // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //   },
    //   error: function (error) {
    //     console.log(error);

    //   }
    // });
  }
}

export default {
  install(Vue: any) {
    Vue.prototype.$utils = new Utils()
  },
}
