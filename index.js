const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
  res.send('hello,node web of express')
})

app.listen(port,()=> {
  console.log(`服务端口${port} 运行中`)
  console.log(process)
})