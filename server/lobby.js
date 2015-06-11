var _ = require('lodash');

var Lobby = {
  updatePlayers: function(io) {
    io.emit('S_updatePlayers', {
      ids: _.map(io.sockets.adapter.rooms.lobby, function(value, id) {
        return id;
      })
    });
  }
};

module.exports = Lobby;
