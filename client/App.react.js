var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Angry Blobs (with React!)</h1>
      </div>
    );
  }
});

React.render(<App />, document.body);
