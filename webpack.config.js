const path = require('path');

module.exports = {
 mode:'production', // 配置环境，消除警告
  // mode:'development', // 配置环境，消除警告
  entry:{
    main:'./src/index.js'
  },
  // 打包一个模块，不知道怎么办的时候配置一个规则告诉它(js默认有配置)，可通过后缀-loader去npm找
  module:{
    rules:[
      {
        test:/\.jpg$/,
        use:{
          loader:'file-loader',
          options:{  //额外参数,placeholder占位符
            name:'[name]_[hash].[ext]', //打包后的名字是原名+hash+后缀
            outputPath:'images/',  // 打包到指定的文件夹
          }
        }
      }
    ]
  },
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  }
}
