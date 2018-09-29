const async = require('async');

async.series(
  // 第一个参数可以是数组,有iterable接口的,对象
  [
    callback => {
      setTimeout(() => {
        console.log(123)
        // 第一个参数是错误参数,第二个是结果参数,如果走完,三个结果0 1 2将会在最后那个收集回调打印出来
        // 假如第一个参数有值,就是错误,将不会往下走callback1,打印结果就是123  1  [0]
        // 这个专业说法叫任务完成后调用一个处理器函数
        callback(null,0);
      }, 1000);
    },
    callback1 => {
      setTimeout(() => {
        console.log(456)
        callback1(null,1);
      }, 500);
    },
    callback2 => {
      setTimeout(() => {
        console.log(789)
        callback2(null,2);
      }, 100);
    },
  ],
  (err, results) => {
    console.log(err);
    console.log(results);
  }
)
