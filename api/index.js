var express = require('express') ;
var app = express();
var http = require("http");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var config = require('./config.json');

//start mysql connection
var connection = mysql.createConnection({
  host            : config.dbhost,
  user            : config.dbuser,
  password        : config.dbpassword,
  database        : config.dbname
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(3000,  "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
});
 
app.post('/employees', function (req, res) {
connection.query('INSERT INTO task SET ?', {name: 'test'},{address: 'test'},{email: 'test'}, function (error, results, fields) {
  if (error) throw error;
  console.log(results.insertId);
})
   console.log(query.sql);
});

app.listen(3000)




