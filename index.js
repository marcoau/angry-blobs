var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

// load server
var app = express();
var server = require('http').Server(app);
var io = exports.io = require('socket.io')(server);

server.listen(4000);

app.use(bodyParser());
app.use(express.static('./client'));

io.on('connection', function(socket) {
  socket.join('lobby');
  socket.emit('S_addToLobby', { id: socket.id });
  io.emit('S_updatePlayers', {
    ids: _.map(io.sockets.adapter.rooms.lobby, function(value, id) {
      return id;
    })
  });

  socket.on('disconnect', function() {
    io.emit('S_updatePlayers', {
      ids: _.map(io.sockets.adapter.rooms.lobby, function(value, id) {
        return id;
      })
    });
  });
});
