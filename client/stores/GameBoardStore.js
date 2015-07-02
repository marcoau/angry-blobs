var Reflux = require('reflux');

var GameBoardActions = require('./../actions/GameBoardActions');

var _mePosition;
var _opponentPosition;
var _myEnemyPositions;
var _opponentEnemyPositions;
var _myBlow;
var _opponentBlow;

var GameBoardStore = Reflux.createStore({
  listenables: GameBoardActions,
  onUpdatePlayerPositions: function(data) {
    _mePosition = data.me;
    _opponentPosition = data.opponent;
    this.trigger({ mePosition: _mePosition, opponentPosition: _opponentPosition});
  },
  onUpdateEnemyPositions: function(data) {
    _myEnemyPositions = data.me.map(e => e.position);
    _opponentEnemyPositions = data.opponent.map(e => e.position);
    this.trigger({
      myEnemyPositions: _myEnemyPositions,
      opponentEnemyPositions: _opponentEnemyPositions
    });
  },
  onUpdateBlows: function(data) {
    _myBlow = data.me;
    _opponentBlow = data.opponent;
    this.trigger({
      myBlow: _myBlow,
      opponentBlow: _opponentBlow
    });
  },
  onWinGame: function() {
    console.log('CONGRATZ YOU WON!');
  },
  onLoseGame: function() {
    console.log('YOU LOST BRO.');
  }
});

module.exports = GameBoardStore;
