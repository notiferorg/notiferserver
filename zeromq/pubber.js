// pubber.js
var zmq = require('zmq')
  , sock = zmq.socket('pub');

sock.bind('tcp://dev.notifer.org:5563');
console.log('Publisher bound to port 8831');

setInterval(function(){
  console.log('sending a multipart message envelope');
  sock.send(['kitty cats', 'meow!']);
}, 3000);

