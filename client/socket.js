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

var socketApi = {
  startGame: function(player) {
    socket.emit('C_startGame', { player: player });
  }
};

module.exports = socketApi;
