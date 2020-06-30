var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   console.log(users);
   socket.on('setUsername', function(data) {          
   console.log(users.indexOf(data));  
      if(users.indexOf(data) ==-1) {
         console.log("INSIDE");
         users.push(data);
         socket.emit('userSet', {username: data});
      } else {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      }
   })

   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});