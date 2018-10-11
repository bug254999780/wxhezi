const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatSub = (date,n) => {
  if (date.indexOf("-") >= 0){
    return date.substring(n.length+1, date.length)
  }
  return date.substring(n.length,date.length)
}


const wxReq = (url, data,method,fun,comp) => {
  wx.request({
    url: util.reqUrl(url),
    data: data,
    method: method,
    header:{
      // 'x-token': app.globalData.xId
    },
    success: function (res) {
      fun(res)
    },
    fail: function (err) { fun(err) },//请求失败
    complete: function (r) {
      comp(r)
    }//请求完成后执行的函数
  })
}

const formatTimeKey = (date1,key) => {
  var date=new Date(date1)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  if(key=="MMDD"){
    return month+"-"+day
  }
  if (key == "YYYYMMDD") {
    return year+"-"+ month + "-" + day
  }
  if (key == "TIME") {
    if(hour<10){
      hour="0"+hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    return hour + ":" + minute + ":" + second
  }
  return date1;

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const reqUrl = n => {
  // var baseUrl = "https://www.gofbox.com/open-api"
  return app.globalData.baseUrl+"/"+n;
}
const reqShortUrl = n => {
  return "http://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long=" + n;
}
// const weekItem = ['日', '一', '二', '三', '四', '五', '六']
const formatDay = d => {
  var date = new Date(d)
  return '星期' + app.globalData.weekItem[date.getDay()]
}

const formatWeather = cond => {
  var wc="";
  if (cond.txt_d == cond.txt_n) {
    wc = cond.txt_d
  } else {
    wc = cond.txt_d + "转" + cond.txt_n
  } 
  return wc
}
module.exports = {
  formatTime: formatTime,
  reqUrl: reqUrl,
  formatDay: formatDay,
  formatWeather: formatWeather,
  formatSub: formatSub,
  formatTimeKey: formatTimeKey,
  wxReq: wxReq,
  reqShortUrl: reqShortUrl,
}

