var Reflux = require('reflux');

var GameBoardActions = Reflux.createActions([
  'updatePlayerPositions',
  'updateEnemyPositions',
  'updateBlows',
  'winGame',
  'loseGame'
]);

module.exports = GameBoardActions;
