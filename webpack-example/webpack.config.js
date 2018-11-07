const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/index.jsx',   //入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },   //输出文件
  module: {
    // loaders: [
    //   {
    //     test: /.jsx?$/,     //匹配所有jsx文件
    //     loader: 'babel-loader',
    //     exclude: /node_modules/,
    //     query: {
    //       presets: ['es2015', 'react']   //使用babel es2015 和react插件
    //     }
    //   }
    // ],
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // plugins: [require('@babel/plugin-transform-object-rest-spread')]
          }
        }
      }
    ]
  },
};