const koa = require('koa');
const app = koa();

app.use(function *(next) {
  const start = new Date;
  // 这个yield是为了执行下一个app.use,然后走下一个app.use,走完再回来走本次yield next下面的部分;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *(next) {
  console.log(111)
  this.body = 'Hello World';
});

app.listen(3000);