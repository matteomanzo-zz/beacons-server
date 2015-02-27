var express = require('express');
var app = express();
var server = require('http').createServer(app);
var http = require('http');
var util = require('util');
var url = require('url');
var DB_PATH = 'https://turnup-tunein.herokuapp.com';
var SERVER_PATH = 'https://fierce-dawn-6227.herokuapp.com';
var request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');
var SPOTIFY_MOC = 'http://localhost:9999/song';

app.set('view engine', 'ejs');
app.set("jsonp callback", true);

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

// app.use(bodyParser.urlencoded({'extended':'true'}));
// app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('/song', function(req, res){
  console.log('hitting songs');
  res.json({spotify_id:7,spotify_ids:8});
});

app.get('/', function(req, res) {
  res.render('index');
  console.log("homepage")
});

function jsonCall(object, path, callback) {
  console.log("trying to hit Matteo");
  request.get(path, object, function (error, response, body){
    if (!error && response.statusCode == 200) {
      console.log("Sent To Matteo");
      console.log("Matteo said:"+response);
      console.log("Matteo said:"+JSON.parse(response.body).spotify_id);
      callback(JSON.parse(response.body));
    } else
    {
      console.log(error);
    }
  });
};

function spotifyAdd(json) {
  console.log(json);
};

app.get('/in', function(req, res) {
  console.log("Device In Range Of Beacon")
  query = (url.parse(req.url, true));
  params = query.query;
  console.log(params.email);
  res.jsonp({ "my": "Jack" });
  // those params are a json object that should go to blue
  jsonCall(params, SPOTIFY_MOC, function(json){
      console.log("get songs from db");
      console.log('now need to contact spotify with ' + json.spotify_id);
      res.jsonp(json);
  }); 
});

app.get('/in_callback', function() {

});



app.get('/out', function(req, res) {
  console.log("Device Disconected From Beacon");
  console.log(req.toString());
  res.jsonp({ "my": "object" });
});

app.get('/qry', function(req, res) {
  console.log("Query is hit");
    query = (url.parse(req.url, true));
  // console.log(res.query);
  params = query.query;
  console.log(params.email);
  res.jsonp({ "beacon_major": "9999", "beacon_minor": "1111" });
});

server.listen(process.env.PORT || 9999, function() {
  console.log('server is watching you...');
});

module.exports = server;       