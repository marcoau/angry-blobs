var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var Lobby = require('./server/lobby');
var Game = require('./server/game');

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
  Lobby.updatePlayers(io);

  // update player list for everyone when someone quits
  socket.on('disconnect', function() {
    Lobby.updatePlayers(io);
  });

  socket.on('C_startGame', function(data) {
    Game.startGame(io, socket, io.sockets.connected[data.player]);
  });
});
