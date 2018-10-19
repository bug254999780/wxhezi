const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataValue: '',
    imgsrcUrl: '',
    flag: false,
    dplay: 'none',
    playPasue: '播放',
    playPasueEvent: 'play',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    innerAudioContext.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46";
  },

  startTakePhoto: function () {
    var that = this
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgsrcUrl: tempFilePaths[0],
          dplay: 'inline-block'
        })
        var upLoadUrl = util.reqUrl("distinguish/general")
        wx.uploadFile({
          url: upLoadUrl,
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data)
            var voiceValue = data.result[0].keyword;
            if (voiceValue.length > 512) {
              voiceValue = voiceValue.substring(0, 512)
            }
            voiceValue = encodeURI(voiceValue)
            innerAudioContext.src = util.reqUrl("imageocr/getMp3?txtValue=" + voiceValue)
            //关闭加载动画
            that.setData({
              dplay: 'none',
              dataValue: data.result[0].keyword,
              flag: true
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
  play: function () {
    innerAudioContext.play();
    var that = this;
    that.setData({
      playPasue: '暂停',
      playPasueEvent: 'pause',
    })
  },
  pause: function () {
    innerAudioContext.pause();
    var that = this;
    that.setData({
      playPasue: '播放',
      playPasueEvent: 'play',
    })
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