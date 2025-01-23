const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

// 创建输出目录
const inputDir = path.join(__dirname, '../images/tabbar')
const outputDir = path.join(__dirname, '../images/tabbar/png')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// 设置转换参数
const config = {
  width: 48,
  height: 48
}

// 获取所有svg文件
const files = fs.readdirSync(inputDir)
  .filter(file => file.endsWith('.svg'))

// 转换函数
async function convertSvgToPng(file) {
  const inputPath = path.join(inputDir, file)
  const outputPath = path.join(outputDir, file.replace('.svg', '.png'))
  
  try {
    await sharp(inputPath)
      .resize(config.width, config.height)
      .png()
      .toFile(outputPath)
    
    console.log(`Converted ${file} to PNG`)
  } catch (err) {
    console.error(`Error converting ${file}:`, err)
  }
}

// 执行转换
async function convertAll() {
  console.log('开始转换SVG文件...')
  
  for (const file of files) {
    await convertSvgToPng(file)
  }
  
  console.log('转换完成!')
}

convertAll() 