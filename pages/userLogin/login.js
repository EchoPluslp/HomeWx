const app = getApp()

Page({
  data: {
    valueUsername:' '
  },

  onLoad: function (params) {
    var me = this;
    var redirectUrl = params.redirectUrl;
    // debugger;
    if (redirectUrl != null && redirectUrl != undefined && redirectUrl != '') {
      redirectUrl = redirectUrl.replace(/#/g, "?");
      redirectUrl = redirectUrl.replace(/@/g, "=");
      me.redirectUrl = redirectUrl;
    }
  },

  // 登录  
  doLogin: function (data) {
     var me = this;
     var formObject = data.detail.value;
     var username   = formObject.username;
     var password   = formObject.password;
     console.log(username);

     if(username == null || password == null){
       wx.showToast({
         title    : '用户名和密码不能为空',
         duration : 3000,
         icon     : "none"
       })
     }else{
       wx.showLoading({
         title: '请稍等...',
         mask : true
       });
       var serverUrl = app.serverUrl;
       var currentUser = app.getGlobalUserInfo();
      wx.request({
        url    : serverUrl+'/login',
        method : "POST",
        data   : {
          username : username,
          password : password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success : function(res){
          //console.log(res.data);
          var currentData = res.data;
          wx.hideLoading();
          if(currentData.status == 200){
            //登录成功
            wx.showToast({
              title: '登录成功',
              duration: 1500,
              icon: "success"
            }),
            //用户信息存入全局的userInfo中
//             app.userInfo = res.data.data;
//fixme 使用本地缓存在设置app的userInfo
              app.setGlobalUserInfo(res.data.data);
            //console.log(res.data);
            console.log(app.userInfo);
            var redirectUrl = me.redirectUrl;
            if (redirectUrl != null && redirectUrl != undefined && redirectUrl != '') {
              wx.redirectTo({
                url: redirectUrl,
              })
            } else {
              wx.redirectTo({
                url: '../mine/mine',
              })
            }
          }else if(currentData.status == 500){
            //登录失败
            wx.showToast({
              title: currentData.msg,
              duration: 1500,
              icon: "none"
            })
          }
        }
      })
     }
  },

  goRegistPage:function() {
    wx.redirectTo({
      url: '../userRegist/regist',
    })
  },
  forgetPass: function (){
    var me = this;
    wx.navigateTo({
      url: '../forgetPass/forgetPass?username=' + me.data.valueUsername
    })
  },
  inputvalue:function(e){
    var me = this;
    me.setData({
      valueUsername:e.detail.value
    });
  }
})