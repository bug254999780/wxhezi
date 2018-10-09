//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '心心心, 难可寻\r\n'+
    '宽时遍法界, 窄时不容针',
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

  onLoad: function () {
    // console.log(app.globalData.xId )
  }
})
