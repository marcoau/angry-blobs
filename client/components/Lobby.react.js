var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var Socket = require('./../socket');

var LobbyStore = require('./../stores/LobbyStore');

var Lobby = React.createClass({
  mixins: [Reflux.connect(LobbyStore)],
  startGame: function(player) {
    Socket.startGame(player);
  },

  getInitialState: function() {
    return {
      id: '?',
      players: []
    };
  },
  render: function() {
    var that = this;
    var otherPlayers = _.filter(this.state.players, (player) => player !== this.state.id);
    var playerButtons = _.map(otherPlayers, function(player) {
      return (
        <button ref={player} onClick={that.startGame.bind(this, player)}>{player}</button>
      );
    });

    return (
      <div>
        <h2>Lobby</h2>
        <p>Your ID is {this.state.id}. Click On a Player to Start Battle!</p>
        {playerButtons}
      </div>
    );
  }
});

module.exports = Lobby;
