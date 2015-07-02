var AppActions = require('./actions/AppActions');
var LobbyActions = require('./actions/LobbyActions');
var GameBoardActions = require('./actions/GameBoardActions');

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

socket.on('S_sendPlayerPositions', function(data) {
  GameBoardActions.updatePlayerPositions(data);
});
socket.on('S_sendEnemyPositions', function(data) {
  GameBoardActions.updateEnemyPositions(data);
});

socket.on('S_sendBlowData', function(data) {
  GameBoardActions.updateBlows(data);
});

socket.on('S_sendWinMessage', function() {
  GameBoardActions.winGame();
});
socket.on('S_sendLoseMessage', function() {
  GameBoardActions.loseGame();
});

var socketApi = {
  startGame: function(player) {
    socket.emit('C_startGame', { player: player });
  },
  sendPosition: function(position) {
    socket.emit('C_sendPosition', { position: position });
  },
  blowEnemies: function(position) {
    socket.emit('C_sendBlowPosition', { position: position });
  }
};

module.exports = {
  api: socketApi,
  io: socket
};
