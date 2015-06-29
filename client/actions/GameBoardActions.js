var Reflux = require('reflux');

var GameBoardActions = Reflux.createActions([
  'updatePlayerPositions',
  'updateEnemyPositions',
  'winGame',
  'loseGame'
]);

module.exports = GameBoardActions;
