const newsContent = {
  '001': require('./news-content/001'),
  '002': require('./news-content/002'),
  '003': require('./news-content/003'),
  '004': require('./news-content/004'),
  '005': require('./news-content/005'),
  '006': require('./news-content/006'),
  '007': require('./news-content/007'),
  '008': require('./news-content/008'),
  '009': require('./news-content/009'),
  '010': require('./news-content/010'),
  '011': require('./news-content/011'),
  '012': require('./news-content/012')
}

Page({
  data: {
    title: '',
    content: '',
    source: '',
    readCount: '',
    time: ''
  },

  onLoad(options) {
    const { id } = options
    this.getNewsDetail(id)
  },

  getNewsDetail(id) {
    // 从页面栈获取新闻数据
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    const newsItem = prevPage.data.newsList.find(item => item.id === id)

    if (!newsItem) {
      wx.showToast({
        title: '新闻不存在',
        icon: 'none'
      })
      return
    }

    try {
      // 从预加载的内容中获取
      const content = newsContent[newsItem.id]
      if (!content) {
        throw new Error('News content not found')
      }

      this.setData({
        title: newsItem.title,
        content,
        source: newsItem.source,
        readCount: newsItem.readCount,
        time: newsItem.time
      })
    } catch (err) {
      console.error('读取新闻失败:', err)
      wx.showToast({
        title: '新闻加载失败',
        icon: 'none'
      })
    }
  }
}) 