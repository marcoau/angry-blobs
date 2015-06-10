var Reflux = require('reflux');

var LobbyActions = require('./../actions/LobbyActions');

var LobbyStore = Reflux.createStore({
  listenables: LobbyActions,
  onJoinLobby: function(id) {
    this.trigger({ id: id });
  },
  onUpdatePlayers: function(players) {
    this.trigger({ players: players });
  }
});

module.exports = LobbyStore;
