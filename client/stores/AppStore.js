var Reflux = require('reflux');

var AppActions = require('./../actions/AppActions');

var AppStore = Reflux.createStore({
  listenables: AppActions,
  onStartGame: function(player) {
    this.trigger({ isPlaying: true, player: player });
  }
});

module.exports = AppStore;
