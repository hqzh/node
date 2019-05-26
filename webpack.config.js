const path = require('path');

module.exports = {
  mode: 'production', // 配置环境，消除警告
  // mode:'development', // 配置环境，消除警告
  entry: {
    main: './src/index.js'
  },
  // 打包一个模块，不知道怎么办的时候配置一个规则告诉它(js默认有配置)，可通过后缀-loader去npm找
  module: {
    rules: [
      {
        test:/\.(eot|ttf|svg)$/,  //本地字体文件打包
        use:{
          loader:'file-loader',
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {  //额外参数,placeholder占位符
            name: '[name]_[hash].[ext]', //打包后的名字是原名+hash+后缀
            outputPath: 'images/',  // 打包到指定的文件夹
            limit: 2048, // 超过这个大小则打包成文件而不是base64
          }
        }
      },
      {
        test: /\.scss$/,
        // 从下到上，从右到左执行顺序,css-loader处理css文件之间的关系，比如一个css引入另一个css,style-lpader在得到css-loader处理的内容后挂载到head标签,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 在scss或js文件中引入的scss也要走下面的两个，如果不配置，webpack读到引入会往上走
              modules: true, //模块化，命名唯一，不耦合，不冲突
            }
          },
          'sass-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
          }
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
