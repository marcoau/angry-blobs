var React = require('react');
var Reflux = require('reflux');

var Lobby = require('./components/Lobby.react');
var Socket = require('./socket');

var AppStore = require('./stores/AppStore');

var App = React.createClass({
  mixins: [Reflux.connect(AppStore)],
  getInitialState: function() {
    return { isPlaying: false };
  },
  render: function() {
    return (
      <div>
        <h1>Angry Blobs (with React!)</h1>
        <p>is Playing: {this.state.isPlaying.toString()}</p>
        <Lobby/>
      </div>
    );
  }
});

React.render(<App />, document.body);
