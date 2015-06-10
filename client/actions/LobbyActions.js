var Reflux = require('reflux');

var LobbyActions = Reflux.createActions([
  'joinLobby',
  'updatePlayers'
]);

module.exports = LobbyActions;
