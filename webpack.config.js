const path = require('path');

module.exports = {
 mode:'production', // 配置环境，消除警告
  // mode:'development', // 配置环境，消除警告
  entry:{
    main:'./src/index.js'
  },
  // 打包一个模块，不知道怎么办的时候配置一个规则告诉它(js默认有配置)
  module:{
    rules:[
      {
        test:/\.jpg$/,
        use:{
          loader:'file-loader'
        }
      }
    ]
  },
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  }
}
