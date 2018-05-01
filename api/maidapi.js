var http = require('http');
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
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
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
//var server = app.listen(3003, "127.0.0.1", function () {
var server = app.listen(3003, "192.168.0.1", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});

/**********Search API************/
app.post('/search',urlencodedParser, function (req, res) {

	var searchtext  =req.body.work_type;
   connection.query('SELECT * FROM worker_type inner join country on country.id=worker_type.id inner join full_or_part_time on full_or_part_time.id=worker_type.id inner join skill on skill.id=worker_type.id inner join user on user.id=worker_type.id where worker_type.work_type like "%'+searchtext+'%" ', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
/**********End of Search API************/


/*******list of Maids API*********/

app.get('/listofmaids', function (req, res) {
	
	var searchtext  =req.body.work_type;
	connection.query('SELECT * FROM worker_type inner join user on worker_type.id=user.type where user.worker_type="1"  ', function (error,results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(results));
 });
}); 
/*******End list of Maids API*********/


/*******Name of maid API*********/
app.get('/employees/:id', function (req, res) {
   console.log(req);
   connection.query('select * from type inner join user on type.id=user.id where user.first_name=?', [req.params.id], function (error, results, fields) {
  if (error) throw error;
  res.end(JSON.stringify(results));
});
})
/*******End Name of maid API*********/