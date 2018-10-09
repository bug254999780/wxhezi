// pages/weather/weather.js

const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    daily_forecast:'-',
    calendar:'-',
    week: '-',
    lunar_calendar:'-',
    local_adderrs:'',
    province: '',
    city: '',
    hourly_forecast:'',
    now:'',
    resv:'',
    aqi:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        var local = res.longitude + "," + res.latitude
        that.initValues(that, local);
        that.setData({ resv:res})
      }
    })
  },
  initValues: function(t,r){
    var date=new Date()
    //日期
    var datestr = (date.getMonth() + 1) + '月' + date.getDate()+'日'
    var weekstr = '星期' + app.globalData.weekItem[date.getDay()]
    this.setData({
      calendar: datestr,
      week: weekstr,
    })
    //天气
    var url = 'weather/getWeather'
    wx.request({
      url: util.reqUrl(url),
      data: { local: r},
      method: "GET",
      success: function (res) {
         var datas = res.data.result.HeWeather5[0];
        for (var i = 0; i < datas.hourly_forecast.length;i++){
          datas.hourly_forecast[i].date = datas.hourly_forecast[i].date.substring(11)
          datas.hourly_forecast[i].imgsrc = "/images/weather/icos/"+datas.hourly_forecast[i].cond.code+".png"
        }
        for (var i = 0; i < datas.daily_forecast.length; i++) {
          datas.daily_forecast[i].date = util.formatDay(datas.daily_forecast[i].date)
          datas.daily_forecast[i].weatherChanage = util.formatWeather(datas.daily_forecast[i].cond);
          datas.daily_forecast[i].imgsrc = "/images/weather/icos/" + datas.daily_forecast[i].cond.code_d + ".png"
        }
        t.setData({
          daily_forecast: datas.daily_forecast,
          hourly_forecast: datas.hourly_forecast,
          now: datas.now,
          aqi:datas.aqi,
          local_adderrs: res.data.city
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
     
  }
,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

})

