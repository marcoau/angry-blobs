var AppActions = require('./actions/AppActions');
var LobbyActions = require('./actions/LobbyActions');

var socket = io();

socket.on('S_addToLobby', function(data) {
  console.log(data);
  LobbyActions.joinLobby(data.id);
});
socket.on('S_updatePlayers', function(data) {
  console.log(data);
  LobbyActions.updatePlayers(data.ids);
});

socket.on('S_startGame', function(data) {
  AppActions.startGame(data.player);
});
socket.on('S_sendPositions', function(positions) {
  console.log(positions);
});

var socketApi = {
  startGame: function(player) {
    socket.emit('C_startGame', { player: player });
  },
  sendPosition: function(position) {
    socket.emit('C_sendPosition', { position: position });
  }
};

module.exports = {
  api: socketApi,
  io: socket
};
