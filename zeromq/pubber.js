var config = require('config'),
    jwt = require('jsonwebtoken'),
    _ = require('underscore');

module.exports = (zmq) => {
    
   var sock = zmq.socket('pub');
    
   sock.bindSync(config.zmq.ZMQ_URL);
   console.log('Publisher bound to port 3000');
    
   setInterval(function(){
     console.log('sending a multipart message envelope');
     sock.send(['CONNECT_CLIENT', 'meow!']);
   }, 500);

}
