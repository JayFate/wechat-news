const fs = require('fs')
const https = require('https')
const path = require('path')
const { URL } = require('url')

// 创建图片目录
const imageDir = path.join(__dirname, '../images/news')
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true })
}

// 定义新闻类别，使图片更相关
const categories = [
  'business', 'technology', 'city', 'nature', 'industry',
  'computer', 'transport', 'building', 'office', 'people'
]

// 下载图片
function downloadImage(id) {
  const fileName = `${String(id).padStart(3, '0')}.jpg`
  const filePath = path.join(imageDir, fileName)
  
  const category = categories[id % categories.length]
  const baseUrl = 'https://loremflickr.com'
  const initialUrl = `${baseUrl}/300/200/${category}?random=${id}`

  // 处理下载和重定向
  function handleDownload(downloadUrl, baseUrl) {
    // 处理相对URL
    const fullUrl = downloadUrl.startsWith('http') 
      ? downloadUrl 
      : new URL(downloadUrl, baseUrl).toString()

    https.get(fullUrl, (response) => {
      // 处理重定向
      if (response.statusCode === 302) {
        const location = response.headers.location
        console.log(`Redirecting ${fileName} to ${location}`)
        // 传递当前URL作为baseUrl
        handleDownload(location, new URL(fullUrl).origin)
        return
      }

      // 处理其他状态码
      if (response.statusCode !== 200) {
        console.error(`Failed to download ${fileName}: ${response.statusCode}`)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
        return
      }

      // 下载文件
      const fileStream = fs.createWriteStream(filePath)
      response.pipe(fileStream)
      
      fileStream.on('finish', () => {
        console.log(`Downloaded: ${fileName} (${category})`)
        fileStream.close()
      })

      fileStream.on('error', (err) => {
        console.error(`Error writing ${fileName}:`, err)
        fileStream.close()
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      })
    }).on('error', (err) => {
      console.error(`Error downloading ${fileName}:`, err)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    })
  }

  // 开始下载
  handleDownload(initialUrl, baseUrl)
}

// 添加延迟下载，避免并发请求过多
function downloadWithDelay(id, delay) {
  setTimeout(() => {
    downloadImage(id)
  }, delay * 1500) // 增加延迟到1.5秒
}

// 下载15张图片
console.log('开始下载图片...')
for (let i = 1; i <= 15; i++) {
  downloadWithDelay(i, i - 1)
}

// 添加完成提示
setTimeout(() => {
  console.log('所有图片下载任务已启动，请等待下载完成...')
}, 100)