const async = require('async');

async.series([
  callback => {
    setTimeout(() => {
      console.log(123)
      callback();
    }, 1000);
  },
  callback => {
    setTimeout(() => {
      console.log(456)
      callback();
    }, 500);
  },
  callback => {
    setTimeout(() => {
      console.log(789)
      callback();
    }, 100);
  },
])