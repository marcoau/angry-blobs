var React = require('react');

var Lobby = require('./components/Lobby.react');
var Socket = require('./socket');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Angry Blobs (with React!)</h1>
        <Lobby />
      </div>
    );
  }
});

React.render(<App />, document.body);
