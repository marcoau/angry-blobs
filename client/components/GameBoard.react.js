var React = require('react');
var Reflux = require('reflux');
var d3 = require('d3');

var SocketApi = require('./../socket').api;
var Socket = require('./../socket').io;

var GameBoardStore = require('./../stores/GameBoardStore');

var GameBoard = React.createClass({
  mixins: [Reflux.connect(GameBoardStore)],
  componentDidMount: function() {
    initGameSvg();
  },

  getInitialState: function() {
    return {
      mePosition: [400,200],
      opponentPosition: [300,200],
      myEnemyPositions: [],
      opponentEnemyPositions: []
    };
  },
  render: function() {
    var myEnemies = this.state.myEnemyPositions.map(p => (
      <circle r='3' className='my-enemies' cx={p[0]} cy={p[1]} />
    ));
    var opponentEnemies = this.state.opponentEnemyPositions.map(p => (
      <circle r='3' className='opponent-enemies' cx={p[0]} cy={p[1]} />
    ));
    return (
      <div>
        <svg id='game-board'>
          <circle r='10' className='me'
            cx={this.state.mePosition[0]}
            cy={this.state.mePosition[1]} />
          <circle r='10' className='opponent'
            cx={this.state.opponentPosition[0]}
            cy={this.state.opponentPosition[1]} />
          {myEnemies}
          {opponentEnemies}
        </svg>
      </div>
    );
  }
});

module.exports = GameBoard;

// d3 logic
function initGameSvg() {
  // start at center
  var mousePosition = [300,200];
  var board = d3.select('#game-board');

  board.on('mousemove', function(event) {
    mousePosition = d3.mouse(this);
  });

  setInterval(function() {
    SocketApi.sendPosition(mousePosition);
  }, 15);
}
