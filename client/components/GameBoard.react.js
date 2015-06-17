var React = require('react');
var d3 = require('d3');

var Socket = require('./../socket');

var GameBoard = React.createClass({
  componentDidMount: function() {
    initGameSvg();
  },
  render: function() {
    return (
      <div>
        <h2>Game</h2>
        <svg id='game-board'></svg>
      </div>
    );
  }
});

module.exports = GameBoard;

// d3 logic
function initGameSvg() {
  // start at center
  var mousePosition = [300,200];
  d3.select('#game-board')
    .on('mousemove', function(event) {
      mousePosition = d3.mouse(this);
    });

  setInterval(function() {
    Socket.sendPosition(mousePosition);
  }, 100);
}
