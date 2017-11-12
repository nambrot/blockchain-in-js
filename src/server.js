var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket){
  socket.on('channel', function(msg){
    io.emit('channel', msg);
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
