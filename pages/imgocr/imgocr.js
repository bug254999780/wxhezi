const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  onReady: function (e) {
  },
  /**
   * 页面的初始数据
   */
  data: {
     dataValue:'',
     imgsrcUrl:'',
     flag:false,
     dplay:'none',
     poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
     voiceName: '此时此刻',
     author: '说人话',
     src: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  startTakePhoto: function () {
    var that=this
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({ imgsrcUrl: tempFilePaths[0],
          dplay:'inline-block'
        })
        var upLoadUrl = util.reqUrl("imageocr/upload")
        wx.uploadFile({
          url: upLoadUrl,
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data)
            var voiceValue = data.result;
            if (voiceValue.length>512){
              voiceValue = voiceValue.substring(0,512)
            }
            voiceValue=encodeURI(voiceValue)
            //关闭加载动画
            that.setData({
              dplay: 'none',
              dataValue: data.result,
              voiceName: data.result.substring(0,6),
              src: util.reqUrl("imageocr/getMp3?txtValue=" + voiceValue),
              flag:true
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
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
  
  }
})