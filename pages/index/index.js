Page({
  data: {
    newsList: [
      {
        id: '001',
        title: 'China Skips Politburo Readout as Investors Await Stimulus',
        titleFile: 'China-Skips-Politburo-Readout-as-Investors-Await-Stimulus',
        image: '/images/news/001.jpg',
        source: '环球网',
        readCount: '29.6万',
        time: '3小时前',
        tag: '主编精选'
      },
      {
        id: '002',
        title: "Japan's Exports Rise as World Waits for Trump Tariffs Impact",
        titleFile: 'Japan\'s-Exports-Rise-as-World-Waits-for-Trump-Tariffs-Impact',
        image: '/images/news/002.jpg',
        source: '财经日报',
        readCount: '15.8万',
        time: '1小时前'
      },
      {
        id: '003',
        title: 'Tech Giants Face New AI Regulations in Europe',
        titleFile: 'Tech-Giants-Face-New-AI-Regulations-in-Europe',
        image: '/images/news/003.jpg',
        source: '科技前沿',
        readCount: '12.3万',
        time: '45分钟前',
        tag: '科技热点'
      },
      {
        id: '004',
        title: 'Electric Vehicle Sales Surge in Asian Markets',
        titleFile: 'Electric-Vehicle-Sales-Surge-in-Asian-Markets',
        image: '/images/news/004.jpg',
        source: '汽车周刊',
        readCount: '8.7万',
        time: '2小时前'
      },
      {
        id: '005',
        title: 'Climate Summit Reaches Historic Carbon Agreement',
        titleFile: 'Climate-Summit-Reaches-Historic-Carbon-Agreement',
        image: '/images/news/005.jpg',
        source: '环境报道',
        readCount: '19.2万',
        time: '4小时前',
        tag: '重要'
      },
      {
        id: '006',
        title: 'Semiconductor Industry Faces Supply Chain Challenges',
        titleFile: 'Semiconductor-Industry-Faces-Supply-Chain-Challenges',
        image: '/images/news/006.jpg',
        source: '产业观察',
        readCount: '6.5万',
        time: '1小时前'
      },
      {
        id: '007',
        title: 'Healthcare Innovation: AI Breakthrough in Drug Discovery',
        titleFile: 'Healthcare-Innovation:-AI-Breakthrough-in-Drug-Discovery',
        image: '/images/news/007.jpg',
        source: '医疗科技',
        readCount: '11.4万',
        time: '5小时前'
      },
      {
        id: '008',
        title: 'Space Tourism: Private Sector Leads New Era',
        titleFile: 'Space-Tourism:-Private-Sector-Leads-New-Era',
        image: '/images/news/008.jpg',
        source: '科学探索',
        readCount: '16.9万',
        time: '2小时前',
        tag: '科技创新'
      },
      {
        id: '009',
        title: 'Oil Extends Drop With Focus on Rising Stockpiles Trump Actions',
        titleFile: 'Oil-Extends-Drop-With-Focus-on-Rising-Stockpiles-Trump-Actions',
        image: '/images/news/009.jpg',
        source: '能源资讯',
        readCount: '7.8万',
        time: '30分钟前'
      },
      {
        id: '010',
        title: "Japan's Exports Rise as World Waits for Trump Tariffs Impact",
        titleFile: 'Japan\'s-Exports-Rise-as-World-Waits-for-Trump-Tariffs-Impact',
        image: '/images/news/010.jpg',
        source: '腾讯新闻深网',
        readCount: '8.3万',
        time: '2小时前'
      },
      {
        id: '011',
        title: 'China Skips Politburo Readout as Investors Await Stimulus',
        titleFile: 'China-Skips-Politburo-Readout-as-Investors-Await-Stimulus',
        image: '/images/news/011.jpg',
        source: '中国军号',
        readCount: '51评',
        time: '26分钟前'
      },
      {
        id: '012',
        title: 'Oil Extends Drop With Focus on Rising Stockpiles Trump Actions',
        titleFile: 'Oil-Extends-Drop-With-Focus-on-Rising-Stockpiles-Trump-Actions',
        image: '/images/news/012.jpg',
        source: '腾讯科技',
        readCount: '8评',
        time: '59分钟前'
      }
    ]
  },

  onLoad() {
    // 获取新闻列表
    this.getNewsList()
  },

  getNewsList() {
    const newsList = this.data.newsList.map(news => {
      // news.image = `https://via.placeholder.com/300x200/e0e0e0/666666?text=News+${news.id}`
      return news
    })
    this.setData({ newsList })
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.getNewsList().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  // 上拉加载更多
  onReachBottom() {
    // TODO: 实现加载更多新闻
    wx.showToast({
      title: '加载更多...',
      icon: 'loading'
    })
  }
}) 