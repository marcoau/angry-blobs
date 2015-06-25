var Reflux = require('reflux');

var GameBoardActions = Reflux.createActions([
  'updatePlayerPositions',
  'updateEnemyPositions'
]);

module.exports = GameBoardActions;
