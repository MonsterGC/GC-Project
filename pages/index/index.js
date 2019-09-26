Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    start: "海域位置",
    max: 60,
    value: "",
    files: [],
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }]
  },
  /**
   *字数限制
   */
  inputs: function(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    var reg1 = /\s+/g;
    var reg2 = /[\r\n]/g;
    if (reg1.test(value)) {
      value = value.replace(/^ +| +$/g, '');
      this.setData({
        value: value
      })
    };
    if (reg2.test(value)) {
      value = value.replace(/[\r\n]/g, '');
      this.setData({
        value: value
      })
    };
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  /**
   * 选择图片
   */
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      count: 3 - this.data.files.length,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  /**
   * 长按删除照片
   */
  deleteImage: function(e) {
    var that = this;
    var files = that.data.files;
    var index = e.currentTarget.dataset.id; //获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('点击确定,删除照片');
          files.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消，不做操作');
          return false;
        }
        that.setData({
          files: files
        });
      }
    })
  },
  /**
   * 点击预览图片
   */
  previewImage: function(e) {
    var index = e.currentTarget.dataset.id; //获取当前长按图片下标
    var that = this;
    wx.previewImage({
      current: that.data.files[index],
      urls: that.data.files,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    /**
     * 查看是否授权
     */
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              // 用户已经授权过,不改变 isHide 的值
              // 用户授权成功后，调用微信的 wx.login 接口，从而获取code
              // wx.login({
              //   success: res => {
              // 获取到用户的 code 之后：res.code
              // console.log("用户的code:" + res.code);
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              // console.log("用户名为:" + nickName);
              wx.setStorageSync('name', nickName);
              wx.setStorageSync('avatar', avatarUrl);
              // }
              // });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
          wx.hideTabBar({});
        }
      }
    });
    /**
     * 获取当前的地理位置
     */
    wx.getLocation({
      type: "wgs84",
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        //console.log(res.latitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude
          }]
        })
      }
    });
  },
  /**
   * 授权登录
   */
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      wx.showTabBar({});
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})