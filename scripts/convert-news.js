const { NodeHtmlMarkdown } = require('node-html-markdown')
const fs = require('fs')
const path = require('path')

const nhm = new NodeHtmlMarkdown()

// 创建目标目录
const outputDir = path.join(__dirname, '../pages/detail/news-content')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// 读取news目录下的所有html文件
const newsDir = path.join(__dirname, '../news')
const files = fs.readdirSync(newsDir)

files.forEach(file => {
  if (file.endsWith('.html')) {
    const htmlContent = fs.readFileSync(path.join(newsDir, file), 'utf8')
    
    // 移除最后一个placeholder div
    const cleanedHtml = htmlContent.replace(/<div class="media-ui-Placeholder.*?<\/div>\s*<\/div>$/s, '</div>')
    
    // 转换为markdown
    const markdown = nhm.translate(cleanedHtml)
    
    // 提取ID
    const id = file.split('-')[0]
    
    // 创建JS模块内容
    const jsContent = `module.exports = ${JSON.stringify(markdown)}`
    
    // 保存为js文件，使用数字ID作为文件名
    const jsFile = `${id}.js`
    fs.writeFileSync(path.join(outputDir, jsFile), jsContent)
    console.log(`Converted ${file} to ${jsFile}`)
  }
}) 