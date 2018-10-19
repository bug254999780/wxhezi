
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this
    var x_token = wx.getStorageSync('x_token')
    if(!x_token){
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId 
          var url = this.globalData.baseUrl + "/login/login"
          wx.request({
            url: url,
            data: {
              resCode: res.code
            },
            success: function (rr) {
              if (rr.data){
               wx.setStorageSync('x_token', rr.data)
             }
            }
          })
        }
      })
    }


    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId 
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/sns/jscode2session',
    //       data:{
    //         appid:'wx6149deaa64985c80',
    //         secret:'dafba2297c07e1eb2fce10e16f6cae15',
    //         js_code: res.code,
    //         grant_type:'authorization_code'
    //       },
    //       success:function(rr){
    //         that.globalData.xId= rr.data.openid
    //       }
    //     })
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    isPay:false,
    weekItem:['日', '一', '二', '三', '四', '五', '六'],
    baseUrl: 'http://localhost:8080/open-api',
    //  baseUrl: 'https://www.gofbox.com/open-api',

  }
})