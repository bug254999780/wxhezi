const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     dataValue:'',
     animationData:{},
     imgsrcUrl:'',
     face_s:'',
     flag:false,
     dplay:'none'
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
        var upLoadUrl = util.reqUrl("facechanage/uploadface")
        wx.uploadFile({
          url: upLoadUrl,
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data).result[0]
            data.age = parseFloat(data.age).toFixed(2)
            data.beauty = parseFloat(data.beauty).toFixed(2)
            data.gender = data.gender =='male'?'男':'女'
            if (data.expression==0){
              data.expression='不笑'
            } else if (data.expression == 1){
              data.expression = '微笑'
            } else if (data.expression == 2) {
              data.expression = '大笑'
            }
            //关闭加载动画
            that.setData({
              dplay: 'none',
              dataValue: data,
              flag:true,
              face_s: that.face_sq(data.landmark)
            })
          }
        })
      }
    })
  },

  face_sq: function (landmark){
    var a = Math.sqrt((Math.pow(landmark[1].x - landmark[0].x, 2) + Math.pow(landmark[1].y - landmark[0].y,2)))
    var b = Math.sqrt((Math.pow(landmark[1].x - landmark[3].x, 2) + Math.pow(landmark[1].y - landmark[3].y, 2)))
    var c = Math.sqrt((Math.pow(landmark[0].x - landmark[3].x, 2) + Math.pow(landmark[0].y - landmark[3].y, 2)))
    var p=(a+b+c)/2;
    var s = Math.sqrt(p * (p - a) * (p - b) * (p - c));  

    //  var s = (landmark[0].x * landmark[1].y + landmark[1].x * landmark[2].y + landmark[2].x * landmark[0].y - landmark[1].x * landmark[0].y - landmark[2].x * landmark[1].y)/2
    return parseFloat(s).toFixed(0);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
  },

  canvasFace: function(d) {
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