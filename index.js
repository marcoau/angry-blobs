var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

// load server
var app = express();
var server = require('http').Server(app);
var io = exports.io = require('socket.io')(server);

server.listen(4000);

app.use(bodyParser());
app.use(express.static('./client'));
