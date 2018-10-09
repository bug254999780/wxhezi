// pages/kd/kuaidi.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      kddNo:'',
      kdresult:'',
      flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  kddNoInput:function(e){
    this.setData({ kddNo: e.detail.value})
  },
  bindViewTap: function () {
    wx.scanCode({
      success: (res) => {
        this.setData({ kddNo: res.result })
      }
    })
  },
  queryClick:function(){
    var that=this
    var url = 'express/getkd'
    console.log(wx.getStorageSync('x_token'))
    wx.request({
      url: util.reqUrl(url),
      data: { expNo: this.data.kddNo}, 
      method: "GET",
      header: { "x_token": wx.getStorageSync('x_token')},
      success: function (res) {
        for (var i = 0; i < res.data.Traces.length; i++) {
          res.data.Traces[i].AcceptTimeMMDD = util.formatTimeKey(res.data.Traces[i].AcceptTime,"MMDD")
          res.data.Traces[i].AcceptTimeTIME = util.formatTimeKey(res.data.Traces[i].AcceptTime, "TIME")
         }
        if (res && res.data.State!=0){
          that.setData({
            kdresult: res.data.Traces
          })
        }else{
          that.setData({
            kdresult: res.data.Reason,
            flag:false
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  }
,
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
  
  }
})