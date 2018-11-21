const app = getApp()

Page({
    data: {
       valueUsername : '',
       serverUrl     : '',
        ifInputVar   : true,
      verification   : ' ',
    },
onLoad : function(res){
  var me = this;
  // console.log(res);
  me.setData({
    valueUsername : res.username
  });
},
  goLoginPage : function(data){
    wx.navigateTo({
      url: '../userLogin/login'
    })
  },

  sendVer : function(res){
    var me = this;
    var account = me.data.valueUsername;
    // console.log(account);
    if (account === null || account === '' || account === ' ' || account === undefined){
        wx.showToast({
          title: '账号不能为空',
          duration:1000,
          icon:"none",
          mask : true
        })
        return;
     };
    var serverUrl = app.serverUrl;
    //  wx.request({
    //    url: serverUrl + '/user/sendVar/?username=' + me.data.valueUsername,
    //    method : 'POST',
    //    success : function(res){
    //     //todo验证码发送成功接受
    //    }
    //  });
     //开启输入验证码权限
     wx.showToast({
       title: '验证码已发送，请在5分钟之内输入',
       icon:'none',
       duration : 3000, 
     }),
     me.setData({
       ifInputVar : false
     });
  },
  doReset: function(param){
    var me = this;
    var password = param.detail.value.password;
    var passwordAgain = param.detail.value.passwordAgain;
    var verification = param.detail.value.verification;
    var username = param.detail.value.username;
    console.log(param);
    if(password!=passwordAgain){
        wx.showToast({
          title: '两次输入的密码不一致，请重新输入',
          duration: 2000,
          icon : "none"
        });
    };
    //重置密码函数调用函数
    wx.request({
      url: '',
    })
  },
  
  //todo ，待做.....动态验证验证码~ 
  //也可以直接submit后来验证
  
  //获取账号
  valueUsername : function(param){
      var me =this;
      me.setData({
        valueUsername: param.detail.value,
      });
  },
})