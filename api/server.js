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
var server = app.listen(3003,  "192.168.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

/**********Create HTML**********/

app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='http://192.168.0.1:3000/empl'  method='post' name='form1'>";
  html += "Name:</p><input type= 'text' name='name'>";
  html += "Email:</p><input type='text' name='address'>";
  html += "address:</p><input type='text' name='email'>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='hidden'  value='reset'>";
  html += "</form>";
  html += "</body>";
  
  var mysql = require('mysql');

var con = mysql.createConnection({
  host: "engagementcontentdb.cvhqqq1spqfb.us-east-2.rds.amazonaws.com",
  user: "geemodeuser",
  password: "qJK8$,aDJH8",
  database: "engagementcontentdb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM jobseeker_basic_details where jobseeker_id= 6", function (err, result, fields) {
    if (err) throw err;
	var total_rc= result.length;
	if(total_rc > 0) {
		var seekers= result;
		var output= [ {"success":"1", "id":"[integer]", "location":"1,1", seekers}
						]
					
		res.json(output);
			}
		});
	});
});

//rest api to create a new record into mysql database
 app.post('/empl',urlencodedParser, function (req, res) {
   var name  =req.body.name;
   var address  =req.body.address;
   var email  =req.body.email;
  
connection.query("Insert into task (name,address,email) VALUES ('"+name+"','"+address+"','"+email+"')", function (error, results, fields) {
	  if (error) throw error;
	 // res.end(JSON.stringify(results));
	});
});