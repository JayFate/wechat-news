Page({
  data: {
    hotList: []
  },

  onLoad() {
    this.getHotList()
  },

  getHotList() {
    // 获取热门新闻列表
    const hotList = [
      {
        id: '005',
        title: 'Climate Summit Reaches Historic Carbon Agreement',
        image: '/images/news/005.jpg',
        source: '环境报道',
        readCount: '19.2万',
        time: '4小时前',
        tag: '重要'
      },
      {
        id: '008',
        title: 'Space Tourism: Private Sector Leads New Era',
        image: '/images/news/008.jpg',
        source: '科学探索',
        readCount: '16.9万',
        time: '2小时前',
        tag: '科技创新'
      }
      // ... 可以添加更多热门新闻
    ]
    
    this.setData({ hotList })
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
}) 