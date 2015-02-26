var express = require('express');
var app = express();
var server = require('http').createServer(app);
var util = require('util');

app.set('view engine', 'ejs');
app.set("jsonp callback", true);

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res) {
  res.render('index');
  console.log("homepage")
});

app.get('/in', function(req, res) {
 console.log("in"+req);
 console.log(util.inspect(req));
 // res.header("Access-Control-Allow-Origin", "*");
 // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
 // res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
 res.jsonp({ "my": "object" });
});

app.get('/out', function(req, res) {
  console.log("out"+req);
  console.log(req.toString());
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
  res.jsonp({ "my": "object" });
});

server.listen(process.env.PORT || 9999, function() {
  console.log('server is watching you...');
});

module.exports = server;       