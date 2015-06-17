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
    var s1Position = [300,200];
    var s2Position = [300,200];
    s1.on('C_sendPosition', function(data) {
      s1Position = data.position;
    });
    s2.on('C_sendPosition', function(data) {
      s2Position = data.position;
    });
    setInterval(function() {
      var positions = {};
      positions[s1.id] = s1Position;
      positions[s2.id] = s2Position;
      io.in(roomName).emit('S_sendPositions', { positions: positions });
    }, 100);
  }
};

module.exports = Game;
