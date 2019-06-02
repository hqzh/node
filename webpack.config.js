const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // mode: 'production', // 配置环境，消除警告
  mode: 'development', // 配置环境，消除警告
  devtool: 'source-map',  //配置控制台报错源码详细信息比如行数，而不是打包后的行数报错，是通过在打包后的目录出现一个.map来映射的
  // devtool:'cheap-module-eval-source-map',   开发
  // devtool:'cheap-module-source-map',  生产
  devServer: { //会默认在内存中打包加快速度
    contentBase: path.join(__dirname, 'dist'),  //静态文件根目录
    compress: true,
    port: 9009,
    // 热更新css,html,即不刷新js.
    hot: true,
    hotOnly: true,
    // 请求到 /api/xxx 现在会被代理到请求 http://localhost:3000/api/xxx, 例如 /api/user 现在会被代理到请求 http://localhost:3000/api/user
    proxy: {
      '/api': 'http://localhost:3000'
    },
    compress: true,//服务器返回浏览器的时候是否启动gzip压缩
  },
  entry: {
    main: './src/index.js', //如果下面输出不写死名字就会打包成main.js
    print: './src/print.js', //如果下面输出不写死名字就会打包成main.js
  },
  // 打包一个模块，不知道怎么办的时候配置一个规则告诉它(js默认有配置)，可通过后缀-loader去npm找
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" ,
      },
      {
        test: /\.(eot|ttf|svg)$/,  //本地字体文件打包
        use: {
          loader: 'file-loader',
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
        // 从下到上，从右到左执行顺序,css-loader处理css文件之间的关系，比如一个css引入另一个css,url的路径，style-loader在得到css-loader处理的内容后挂载到head标签,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true,  // 处理为单个style标签
            }
          },
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
        include:path.resolve(__dirname,'src'),  // 限制范围，提高打包速度
        exclude:/node_modules/
      }
    ],
  },
  // puugin 可以在webpack运行到某个时刻的时候做一些事情，类似生命周期函数，带s加的都是数组
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: 'src/index.html'
      }
    ),  // 会在打包结束后的时刻以自己定义的模板自动生成一个html文件，并把打包生成的js自动引入到HTML文件中
    new CleanWebpackPlugin(),//删除上一次打包的内容,打包之前时刻执行
    // 热更新css,html,即不刷新js.
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization:{
    usedExports:true,
  },
  output: {
    // publicPath:'www.cdn.com.cn/', //设置引入js前加一些前缀，比如可以以是cdn
    publicPath: '/',
    filename: '[name].js',  // 设置占位符，上面入口的属性是什么就会打包成什么名字
    path: path.resolve(__dirname, 'dist')
  },
  performance: {  //暴力忽略文件大的警告
    // hints: false,
    // maxEntrypointSize: 512000,
    // maxAssetSize: 512000
  }
}
