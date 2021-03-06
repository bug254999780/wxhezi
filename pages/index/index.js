//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    motto: '心心心, 难可寻\r\n'+
    '宽时遍法界, 窄时不容针',
    mottoFrom:'达摩祖师',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../weather/weather'
    })
  },

  clickWeather: function () {
    wx.navigateTo({
      url: '../weather/weather'
    })
  },
  clickKd: function () {
    wx.navigateTo({
      url: '../kd/kuaidi'
    })
  },

  clickNews: function () {
    wx.navigateTo({
      url: '../news/news'
    })
  },
  clickimgocr: function () {
    wx.navigateTo({
      url: '../imgocr/imgocr'
    })
  },
  clickdistinguish: function () {
    wx.navigateTo({
      url: '../distinguish/distinguish'
    })
  },
  clickDis: function () {
    wx.navigateTo({
      url: '../dis/dis'
    })
  },

  onReady: function(){
    var that = this
    var url = 'yiyangtang/get'
    wx.request({
      url: util.reqUrl(url),
      method: "GET",
      success: function (res) {
        if (res) {
          that.setData({
            motto: res.data.hitokoto,
            mottoFrom:res.data.from
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  onLoad: function () {
    // console.log(app.globalData.xId )
    // queryIndexTitle();
    
  },
  onShareAppMessage:function(ops){
    return {
      title: '黑科技',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }

})
