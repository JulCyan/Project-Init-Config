import Vue from 'vue'
import { Toast } from 'vant'
import Cookies from 'js-cookie'

/**
 * num : Number
 * str: String
 * bool: Boolean
 * arr: Array
 * obj: Object
 */
class Utils {
  constructor() {}

  /**
   * 数组根据数组对象中的某个属性值进行排序的方法
   * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
   * @method sortBy
   * @param { attr: str, rev: bool } { 排序属性,排序方式: true ↑ false ↓ }
   * @retunrs function
   */
  sortBy({ attr, rev = 1 }) {
    rev = rev ? 1 : -1
    return function(a, b) {
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
  setSto({ key, val }) {
    localStorage.setItem(key, JSON.stringify(val))
    return true
  }

  /**
   * 读取本地缓存
   * @param key: str
   * @retunrs *: any
   */
  getSto(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  /**
   * 删除本地缓存
   * @param key: str
   * @returns {}
   */
  deleteSto(key) {
    localStorage.removeItem(key)
    return this
  }

  /**
   * 格式化数据
   * @param val:num
   * @returns str
   */
  // 将数字过滤为每三位逗号隔开
  tostr3(val) {
    return parseFloat(val).toLocaleString()
  }

  // 将数字保留两位小数
  tostr2(val) {
    return val.toFixed(2)
  }

  // 将数字过滤为每三位逗号间隔并保留两位小数
  tostr32(val) {
    return val.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }

  /**
   * vant-ui Toast提示封装
   * @param type 类型
   * @param message 内容
   * @param duration 时长
   */
  toast(type, message, duration) {
    Toast({
      type: type || 'text',
      message: message,
      duration: duration || 1500,
    })
  }

  /**
   * 隐藏手机中间/后四位
   */
  phoneHide(tel, type) {
    tel = '' + tel
    let phone
    if (type == 'mid') {
      phone = tel.replace(tel.substring(3, 7), '****')
    } else if (type == 'end') {
      phone = tel.replace(tel.substring(7, 11), '****')
    }
    return phone
  }

  // 获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
  getNowFormatDate() {
    var date = new Date()
    var seperator1 = '-'
    var seperator2 = ':'
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate =
      date.getFullYear() +
      seperator1 +
      month +
      seperator1 +
      strDate +
      ' ' +
      date.getHours() +
      seperator2 +
      date.getMinutes() +
      seperator2 +
      date.getSeconds()
    return currentdate
  }

  // 获取cookie
  setCookie(name, value, expires, domain, path, secure) {
    var cookieText = ''
    cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (expires) {
      var exp = new Date()
      exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000)
      cookieText += '; expires=' + exp.toGMTString()
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

  // 清除cookie
  reomoveCookie(access_token) {
    if (Cookies.get(access_token)) {
      Cookies.remove('access_token')
      Cookies.remove('uid')
      Cookies.remove('access_token', { domain: '.51jiaoxi.com' })
      Cookies.remove('uid', { domain: '.51jiaoxi.com' })
    }
  }

  // 日期转字符串
  dateToString(date) {
    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString()
    var day = date.getDate().toString()
    if (month.length == 1) {
      month = '0' + month
    }
    if (day.length == 1) {
      day = '0' + day
    }
    var dateTime = year + '-' + month + '-' + day
    return dateTime
  }

  // 字符串转日期
  stringToDate(dateStr, separator) {
    if (!separator) {
      separator = '-'
    }
    var dateArr = dateStr.split(separator)
    var year = parseInt(dateArr[0])
    var month
    //处理月份为04这样的情况
    if (dateArr[1].indexOf('0') == 0) {
      month = parseInt(dateArr[1].substring(1))
    } else {
      month = parseInt(dateArr[1])
    }
    var day = parseInt(dateArr[2])
    var date = new Date(year, month - 1, day)
    return date
  }

  //  .? 实现
  /**
   * @method catchNull
   * @param { json | js } root
   * @param { string } next
   * @param { any } defaultParam
   * @returns { json | js }
   */
  catchNull(root, next, defaultParam) {
    var val = null
    var keys = []
    keys = next.split('.')
    // 根部判断
    if (root) {
      // 键 List 循环
      for (var i = 0; i < keys.length; i++) {
        var current = null
        // 键判断是否包含[index]
        if (keys[i].indexOf('[') > -1) {
          // 处理键中有[index]的情况
          var specialKey = keys[i].split('[')[0]
          var strArr = keys[i].split('[')
          strArr.shift()
          var tempCurrent = root[specialKey]

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
          val = defaultParam
        }
      }
    } else {
      val = defaultParam
    }
    return val
  }

  clearSuffix(str) {
    let newStr = null
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

  async parseUrl(routerPath, app) {
    let url = routerPath,
      beforeParseParams = [],
      // 获取列表的参数
      alreadyParseParams = {},
      // 根据 url 解析出来的所有参数
      allParseParams = {},
      IParamsInterface = {
        z: 'zone_type',
        s: 'stage',
        v: 'version',
        b: 'book',
        c: 'chapter',
        t: 'document_type',
        o: 'document_sort',
        a: 'area',
        p: 'page',
      }

    if (url.includes('.html')) {
      url = url.split('.html')[0]
    }
    beforeParseParams = url.split('/').filter(item => {
      return item != ''
    })

    let paramSubject = beforeParseParams[0],
      paramsFilters = beforeParseParams[1],
      paramsPage = beforeParseParams[2]
    let readyParseParams = paramsFilters.split('_'),
      pageFlag = readyParseParams.shift()
    // 接口参数

    alreadyParseParams = createParams(readyParseParams)

    function createParams(arr) {
      let tempReturnParams = {}
      arr.forEach(item => {
        for (let key in IParamsInterface) {
          item.includes(key) ? (tempReturnParams[IParamsInterface[key]] = item.replace(key, '')) : null
        }
      })
      return tempReturnParams
    }

    !alreadyParseParams.zone_type && (alreadyParseParams.zone_type = 0)
    paramsPage && (alreadyParseParams[IParamsInterface.p] = paramsPage.replace('p', ''))
    alreadyParseParams.subject = paramSubject
    let sort = alreadyParseParams.document_sort

    // 排序 document_sort num => str
    if (sort == '1') {
      alreadyParseParams.document_sort = 'updated'
    } else if (sort == '3') {
      alreadyParseParams.document_sort = 'download'
    } else {
      alreadyParseParams.document_sort = 'updated'
    }

    // 接口参数加额外参数
    allParseParams = { ...alreadyParseParams }
    allParseParams.pageFlag = pageFlag
    return {
      alreadyParseParams,
      allParseParams,
    }
  }

  getById(Data, id) {
    var Deep, T, F
    for (F = Data.length; F; ) {
      T = Data[--F]
      if (id == T.value) return T
      if (T.children) {
        Deep = this.getById(T.children, id)
        if (Deep) return Deep
      }
    }
  }

  // 获取地址栏参数
  getUrlKey(url, name) {
    return (
      decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')
      ) || null
    )
  }

  // 页面平滑滚动
  scrollTop(number = 0, time) {
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
   * 节流构造函数
   * @method throttle
   * @param func
   * @param time
   * @param option
   * @returns {_throttle}
   */
  throttle = (
    func,
    time = 20,
    option = {
      leading: true, // 首次是否执行
      trailing: false, // 计时结束是否执行最后一次
      context: null, // this
    }
  ) => {
    let timer
    let previous = new Date(0).getTime()
    const _throttle = (...args) => {
      let now = new Date().getTime()
      if (!option.leading) {
        if (timer) return
        timer = setTimeout(() => {
          timer = null
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
      timer = null
    }
    return _throttle
  }

  /**
   * @method 防抖构造函数
   * @param func
   * @param time
   * @param option
   * @returns {_debounce}
   */
  debounce = (
    func,
    time,
    option = {
      leading: true,
      context: null,
    }
  ) => {
    let timer = null
    const _debounce = (...arg) => {
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
}

export default ({ app }) => {
  Vue.prototype.$utils = app.$utils = new Utils()
}
