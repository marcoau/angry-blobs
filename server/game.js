var Lobby = require('./lobby');

var Game = {
  startGame: function(io, s1, s2) {
    s1.leave('lobby');
    s2.leave('lobby');
    Lobby.updatePlayers(io);

    s1.emit('S_startGame', { player: s2.id });
    s2.emit('S_startGame', { player: s1.id });
  }
};

module.exports = Game;
