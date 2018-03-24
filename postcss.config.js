const autoprefixer = require('autoprefixer')

// 优化css，各浏览器

module.exports = {
  plugins: [
    autoprefixer() // 加上css前缀，例如-webkit-
  ]
}