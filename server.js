var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index')
});

app.get('/beacon', function(req, res) {
  console.log('Hello World!');
});

server.listen(process.env.PORT || 9999, function() {
  console.log('server is listening somewhere');
});

module.exports = server;