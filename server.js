var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('view engine', 'ejs');

app.get('/beacon', function(req, res) {
  console.log('Hello World!');
});

server.listen(9999, function() {
  console.log('server is listening on port 9999');
});

module.exports = server;