var _ = require('lodash');
var Lobby = require('./lobby');

var Game = {
  startGame: function(io, s1, s2) {
    s1.leave('lobby');
    s2.leave('lobby');
    Lobby.updatePlayers(io);

    var roomName = s1.id + '_' + s2.id;
    s1.join(roomName);
    s2.join(roomName);

    s1.emit('S_startGame', { player: s2.id });
    s2.emit('S_startGame', { player: s1.id });

    // parameters
    var BOARD_WIDTH = 600;
    var BOARD_HEIGHT = 400;
    var SPEED_RATIO = 200;
    var MIN_SPEED = 5;

    // BLOBS!!!
    var s1Blob = { position: [300,200], v: [0,0] };
    var s2Blob = { position: [300,200], v: [0,0] };
    var s1Enemies = [];
    var s2Enemies = [];

    var renderBlobs = function() {
      // CALCULATE BLOB POSITIONS
      s1Blob.position[0] = Math.max(0, Math.min(BOARD_WIDTH, s1Blob.position[0] + s1Blob.v[0]));
      s1Blob.position[1] = Math.max(0, Math.min(BOARD_HEIGHT, s1Blob.position[1] + s1Blob.v[1]));
      s2Blob.position[0] = Math.max(0, Math.min(BOARD_WIDTH, s2Blob.position[0] + s2Blob.v[0]));
      s2Blob.position[1] = Math.max(0, Math.min(BOARD_HEIGHT, s2Blob.position[1] + s2Blob.v[1]));

      // COLLISION DETECTION
      if(s1HasCollided() && s2HasCollided()) {
        s1.emit('S_sendLoseMessage');
        s2.emit('S_sendLoseMessage');
        clearInterval(timer);
      }
      if(s1HasCollided()) {
        s1.emit('S_sendLoseMessage');
        s2.emit('S_sendWinMessage');
        clearInterval(timer);
      }
      if(s2HasCollided()) {
        s2.emit('S_sendLoseMessage');
        s1.emit('S_sendWinMessage');
        clearInterval(timer);
      }

      // SEND BLOB POSITIONS
      s1.emit('S_sendPlayerPositions', {
        me: s1Blob.position,
        opponent: s2Blob.position
      });
      s2.emit('S_sendPlayerPositions', {
        me: s2Blob.position,
        opponent: s1Blob.position
      });
    };
    var timer = setInterval(renderBlobs, 15);

    var createS1EnemyBlob = function() {
      var blob = {
        position: [Math.random() * BOARD_WIDTH, Math.random() * BOARD_HEIGHT]
      };
      s1Enemies.push(blob);
    };
    var createS2EnemyBlob = function() {
      var blob = {
        position: [Math.random() * BOARD_WIDTH, Math.random() * BOARD_HEIGHT]
      };
      s2Enemies.push(blob);
    };
    var createEnemyBlobs = function() {
      if(Math.random() * 10 > 9) {
        createS1EnemyBlob();
        s1.emit('S_sendEnemyPositions', {
          me: s1Enemies,
          opponent: s2Enemies
        });
        s2.emit('S_sendEnemyPositions', {
          me: s2Enemies,
          opponent: s1Enemies
        });
      }
      if(Math.random() * 10 > 9) {
        createS2EnemyBlob();
        s1.emit('S_sendEnemyPositions', {
          me: s1Enemies,
          opponent: s2Enemies
        });
        s2.emit('S_sendEnemyPositions', {
          me: s2Enemies,
          opponent: s1Enemies
        });
      }
    };
    setInterval(createEnemyBlobs, 200);

    // ENEMY COLLISION DETECTION
    var s1HasCollided = function() {
      var collidedS1Enemy = _.find(s1Enemies, function(e) {
        var distance = Math.pow(
          Math.pow(s1Blob.position[0] - e.position[0], 2) + Math.pow(s1Blob.position[1] - e.position[1], 2),
        0.5);
        return distance < 10;
      });
      return !!collidedS1Enemy;
    }
    var s2HasCollided = function() {
      var collidedS2Enemy = _.find(s2Enemies, function(e) {
        var distance = Math.pow(
          Math.pow(s2Blob.position[0] - e.position[0], 2) + Math.pow(s2Blob.position[1] - e.position[1], 2),
        0.5);
        return distance < 10;
      });
      return !!collidedS2Enemy;
    };

    // USER CONTROL INPUT
    s1.on('C_sendPosition', function(data) {
      var vx = data.position[0] - s1Blob.position[0];
      s1Blob.v[0] = vx >= 0 ?
        Math.min(vx, Math.max(MIN_SPEED, vx / SPEED_RATIO)) :
        Math.max(vx, Math.min(-MIN_SPEED, vx / SPEED_RATIO));

      var vy = data.position[1] - s1Blob.position[1];
      s1Blob.v[1] = vy >= 0 ?
        Math.min(vy, Math.max(MIN_SPEED, vy / SPEED_RATIO)) :
        Math.max(vy, Math.min(-MIN_SPEED, vy / SPEED_RATIO));
    });
    s2.on('C_sendPosition', function(data) {
      var vx = data.position[0] - s2Blob.position[0];
      s2Blob.v[0] = vx >= 0 ?
        Math.min(vx, Math.max(MIN_SPEED, vx / SPEED_RATIO)) :
        Math.max(vx, Math.min(-MIN_SPEED, vx / SPEED_RATIO));

      var vy = data.position[1] - s2Blob.position[1];
      s2Blob.v[1] = vy >= 0 ?
        Math.min(vy, Math.max(MIN_SPEED, vy / SPEED_RATIO)) :
        Math.max(vy, Math.min(-MIN_SPEED, vy / SPEED_RATIO));
    });

    var killGame = function() {
      clearInterval(timer);
    };
    s1.on('disconnect', killGame);
    s2.on('disconnect', killGame);
  }
};

module.exports = Game;
