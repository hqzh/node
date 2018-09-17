const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();   //定义事件发射器

channel.clients = {};
channel.subscriptions = {};

channel.on('join',function(id,client){    // on方法给事件发射器添加监听器,向加入频道的人做出响应,
  this.clients[id] = client;
  this.subscriptions[id] = (senderId,message)=>{
    if(id !== senderId){
      this.clients[id].write(message)
    }
  };
  this.on('broadcast',this.subscriptions[id]);
})

channel.on('leave', id => {
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, id + ' has left.\n');
});

const server = net.createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  //emitter.emit(eventName[, ...args]),按监听器的注册顺序，同步地调用每个注册到名为 eventName 事件的监听器，并传入提供的参数。如果事件有监听器，则返回 true ，否则返回 false。
  // 也就是说用emit函数发射这个事件
  channel.emit('join', id, client);  
  client.on('data', data => {
    data = data.toString();
    channel.emit('broadcast', id, data);
  });
  client.on('close', () => {
    console.log('Client disconnected:', id);
    channel.emit('leave', id);
  });
});
server.listen(8888);
