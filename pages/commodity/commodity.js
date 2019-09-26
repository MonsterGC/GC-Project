Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: [],
    array: [{
        id: 1,
        picture: 'https://img14.360buyimg.com/n7/jfs/t21550/330/336338953/117027/87c88d00/5b0a5fccN149584c2.jpg',
        name: '美美的手工风车',
        content: '很厉害我是世界上最漂亮的风车啊啊啊啊啊啊啊啊',
        price: '190',
        num: 1,
        selected: false
      }, {
        id: 2,
        picture: 'https://img10.360buyimg.com/n7/jfs/t20758/268/753668474/319656/33aa3e3d/5b17abddNd88fe38f.jpg',
        name: '会跑的木飞机',
        content: '我跑的很快，我是飞机噢噢噢噢噢噢噢噢',
        price: '400',
        num: 1,
        selected: false
      },
      {
        id: 3,
        picture: 'https://img13.360buyimg.com/n7/jfs/t1/63148/3/6606/130165/5d4bb285E6702eef6/6c12bb7c39fb41c8.jpg',
        name: '笨笨的滑翔机',
        content: '滑翔机可以开，开高了可以看大片大片的海',
        price: '360',
        num: 1,
        selected: false
      },
      {
        id: 4,
        picture: 'https://img12.360buyimg.com/n7/jfs/t1/42506/12/7949/153406/5d1763d2E5f81f16f/6132bb460c475dea.jpg',
        name: '贝壳风铃',
        content: '我是用海边的贝壳做的，你睡不着的时候我可以给你唱歌',
        price: '145',
        num: 1,
        selected: false
      },
      {
        id: 5,
        picture: 'https://img13.360buyimg.com/n7/jfs/t1/43381/34/11872/66185/5d53cf3dEe9500cc8/a2db95d997d5f5c4.jpg',
        name: '天然贝壳手链',
        content: '戴上我，你就是这片海最美的人',
        price: '147852',
        num: 1,
        selected: false
      }
    ]
  },
  tap: function(res) {
    // this.data.array[res.currentTarget.dataset.id]
    let storeTemp = this.data.store
    //向数组的末尾添加一个或多个元素，并返回新的长度
    storeTemp.push(this.data.array[res.currentTarget.dataset.id])
    this.setData({
      store: storeTemp
    })
    wx.setStorage({
      key: 'store',
      data: JSON.stringify(storeTemp)
    })
    wx.showModal({
      title: '提示',
      content: '兑换物品已成功加入兑换车'
    })
  }
})