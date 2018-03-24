/** webpack打包前端资源 
 * webpack-dev-server用同一个包，但此项用于开发环境的，可实现热加载，保存代码则浏览器自动刷新
 *  "build": "cross-env NODE_ENV=production webpack --config webpack.config.js" //不同的平台都可以执行同一个脚本cross-env
*/
const path = require('path') // 入口文件path
const HTMLPlugin = require('html-webpack-plugin') // 引入后可配置生成html文件
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin') // 将非js的代码单独打包成一个文件，单独将css打包到一个模块

const isDev = process.env.NODE_ENV === 'development'  // process.env 可以读取配置的属性

const config = {
  target: 'web', // webpack-dev-server
  entry: path.join(__dirname, 'src/index.js'), // 入口
  output: { // npm run build 之后产生的文件
    filename: 'bundle.[hash:8].js', // 开发环境使用hash
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [ // 规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: { // 指定参数
          limit: 10000, // 文件小于10000字节，转换成base64编码，写入文件里面
          name: '[name]-aaa.[ext]' // 指定输出文件的名字
        }
      }
    ]
  },
  plugins: [ // 配置生成的html入口文件
    new webpack.DefinePlugin({ // development开发环境用
      'process.env': {
        NODE_ENV : isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) { // 是开发环境
  config.module.rules.push({ // 将规则加进去
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true // 可以直接引用前面的sourceMap，可以提高编译速度
          }
        },
        'stylus-loader'
      ]
  })
  config.devtool = '#cheap-module-eval-source-map' // 在页面上调试代码，进行代码影射
  config.devServer = {
    port: 8000,  // 启动后监听的端口
    host: '0.0.0.0', // 即可用locahost也可用本机ip访问 
    overlay: {
      errors: true, // 将错误显示到网页当中
    },
    hot: true // 按需加载，例：修改组件后，只刷新加载组件
    // open: true  // 自动打开浏览器
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else { // 正式项目环境，filename使用chunkhash
  config.entry ={ // 将类库文件单独打包，因为类库文件稳定性比较高，然后打包后利用浏览器缓存，可提高访问速度
    app: path.join(__dirname, 'src/index.js'), // 文件入口
    vendor: ['vue']  // 类库文件，将单独生成vendor.xxx.js文件
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true // 可以直接引用前面的sourceMap，可以提高编译速度
              }
            },
            'stylus-loader'
          ]
      })
    }
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'), // 指定输出的静态文件名字；根据内容hash得到单独的值
    new webpack.optimize.CommonsChunkPlugin({ // 指定类库文件打包名字，name与上方要相同
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime' // 将webpack相关的代码打包到单独的文件中
      // 在有新的模块加入的时候，webpack会给每一个模块加上id，然后新模块加如后，模块顺序会变化，然后hash则会变化，则使用hash长缓存就会失去效果，然后使用这个方法来规避这个问题
    })
  )
}

module.exports = config
