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
