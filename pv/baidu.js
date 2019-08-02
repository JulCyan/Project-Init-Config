;(function() {
  if (location.host.includes('localhost')) {
    return
  }

  let scripList = document.getElementsByTagName('script')
  let linkOne = 'https://zz.bdstatic.com/linksubmit/push.js',
    linkTwo = 'http://push.zhanzhang.baidu.com/push.js',
    linkThree = 'https://hm.baidu.com/hm.js?bb00649777fe283898f7f36b6e473faa'
  for (let i = 0; i < scripList.length; i++) {
    let item = scripList[i]
    if ([linkOne, linkTwo].includes(item.src)) {
      item.parentNode.removeChild(item)
    }
  }

  let bp = document.createElement('script')
  let curProtocol = window.location.protocol.split(':')[0]
  if (curProtocol === 'https') {
    bp.src = linkOne
  } else {
    bp.src = linkTwo
  }
  let s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(bp, s)

  var hm = document.createElement('script')
  hm.src = linkThree
  for (let i = 0; i < scripList.length; i++) {
    let item = scripList[i]
    if ([linkThree].includes(item.src)) {
      item.parentNode.removeChild(item)
    }
  }
  var s1 = document.getElementsByTagName('script')[0]
  s1.parentNode.insertBefore(hm, s1)
})()
