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

    // temp
    var s1Blob = { position: [300,200] };
    var s2Blob = { position: [300,200] };

    s1.on('C_sendPosition', function(data) {
      s1Blob.position = data.position;
    });
    s2.on('C_sendPosition', function(data) {
      s2Blob.position = data.position;
    });
    var timer = setInterval(function() {
      s1.emit('S_sendPlayerPositions', {
        me: s1Blob.position,
        opponent: s2Blob.position
      });
      s2.emit('S_sendPlayerPositions', {
        me: s2Blob.position,
        opponent: s1Blob.position
      });
    }, 15);

    var killGame = function() {
      clearInterval(timer);
    };
    s1.on('disconnect', killGame);
    s2.on('disconnect', killGame);
  }
};

module.exports = Game;
