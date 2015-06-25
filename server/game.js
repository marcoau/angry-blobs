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

    // temp
    var s1Blob = { position: [300,200], v: [0,0] };
    var s2Blob = { position: [300,200], v: [0,0] };

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

    var renderBlobs = function() {
      // CALCULATE BLOB POSITIONS
      s1Blob.position[0] = Math.max(0, Math.min(BOARD_WIDTH, s1Blob.position[0] + s1Blob.v[0]));
      s1Blob.position[1] = Math.max(0, Math.min(BOARD_HEIGHT, s1Blob.position[1] + s1Blob.v[1]));
      s2Blob.position[0] = Math.max(0, Math.min(BOARD_WIDTH, s2Blob.position[0] + s2Blob.v[0]));
      s2Blob.position[1] = Math.max(0, Math.min(BOARD_HEIGHT, s2Blob.position[1] + s2Blob.v[1]));

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

    var killGame = function() {
      clearInterval(timer);
    };
    s1.on('disconnect', killGame);
    s2.on('disconnect', killGame);
  }
};

module.exports = Game;
