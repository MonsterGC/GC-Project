Page({
  data: {
    username: '',
    useravatar: '',
    lovecount: '',
    cardList: [{
        id: 1,
        title: "兑换车",
        type: "publishgoods_fill",
        url: "../commoditycar/commoditycar"

      },
      {
        id: 2,
        title: "兑换订单",
        type: "document",
        url: "../exchangeorder/exchangeorder"
      },
      {
        id: 3,
        title: "我的社区记录",
        type: "interactive",
        url: "../record/record"
      },
      {
        id: 4,
        title: "意见反馈",
        type: "service",
        url: "../feedback/feedback"
      },
      {
        id: 5,
        title: "关于我们",
        type: "more",
        url: "../about/about"
      }
    ]
  },
  onLoad: function() {
    var name = wx.getStorageSync('name')
    this.setData({
      username: name
    });
    var avatar = wx.getStorageSync('avatar')
    this.setData({
      useravatar: avatar
    });
  },
  myinfojump: function() {
    wx.navigateTo({
      url: '../myinfo/myinfo',
      success: function(res) {}
    })
  }
})