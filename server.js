const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);   //返回编译器重新打包
const express = require('express');
const app = express();

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
    publicPath:config.output.publicPath
  })
);

app.listen(3000, () => console.log('Example app listening on port 3000!'));