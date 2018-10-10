const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('myAudio')
    // var res = wx.getSystemInfoSync()
    // if (res.platform == 'ios') {
    //   this.audio = wx.getBackgroundAudioManager()
    // } else {
    //   this.audio = wx.createInnerAudioContext();
    // }

    // this.audio.title = "音乐文件";
    // this.audio.src = "本地文件地址";
    // this.audio.play();
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
    name: '此时此刻',
    author: '许巍',
    src: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/images/imgloc/output.mp3'
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
            var data = res.data;
            //关闭加载动画
            that.setData({
              dplay: 'none',
              dataValue: data.result,
              // src: data.mp3url,
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