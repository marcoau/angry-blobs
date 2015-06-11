var React = require('react');
var Reflux = require('reflux');

var Lobby = require('./components/Lobby.react');
var GameBoard = require('./components/GameBoard.react');

var Socket = require('./socket');

var AppStore = require('./stores/AppStore');

var App = React.createClass({
  mixins: [Reflux.connect(AppStore)],
  getInitialState: function() {
    return { isPlaying: false };
  },
  render: function() {

    var mainScreen = this.state.isPlaying ?
      (<GameBoard />) : (<Lobby />);

    return (
      <div>
        <h1>Angry Blobs (with React!)</h1>
        {mainScreen}
      </div>
    );
  }
});

React.render(<App />, document.body);
