var Reflux = require('reflux');

var GameBoardActions = require('./../actions/GameBoardActions');

var _mePosition;
var _opponentPosition;

var GameBoardStore = Reflux.createStore({
  listenables: GameBoardActions,
  onUpdatePlayerPositions: function(data) {
    _mePosition = data.me;
    _opponentPosition = data.opponent;
    this.trigger({ mePosition: _mePosition, opponentPosition: _opponentPosition});
  }
});

module.exports = GameBoardStore;
