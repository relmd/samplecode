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
  html += "<form action='http://192.168.0.1:3003/empl'  method='post' name='form1'>";
  html += "Name:</p><input type= 'text' name='name'>";
  html += "Email:</p><input type='text' name='address'>";
  html += "address:</p><input type='text' name='email'>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='hidden'  value='reset'>";
  html += "</form>";
  html += "</body>";
  
  var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "geemode"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM `gee_job_alert_all` ORDER BY id DESC LIMIT 0,10", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
	res.json(result)
	//res.json('HELL')
  });
});
  
//  res.json('HELL')
//res.send(html);
});


//rest api to create a new record into mysql database
 app.post('/empl',urlencodedParser, function (req, res) {
      /* var name  = 'tesfhgter';
     var address  = 'MOgfhhali';
     var email  = 'Tester@gmail.com'; */
    // var name  = req.param('name');
   var name  =req.body.name;
   var address  =req.body.address;
   var email  =req.body.email;
  // var email  = 'req.body.email'; 
 //  console.log(name);
  // console.log(address);
   //console.log(email);
connection.query("Insert into task (name,address,email) VALUES ('"+name+"','"+address+"','"+email+"')", function (error, results, fields) {
	  if (error) throw error;
	 // res.end(JSON.stringify(results));
	});
});
 
//rest api to update record into mysql database
/* app.put('/employees', function (req, res) {
   connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
 */
//rest api to delete record from mysql database
/* app.delete('/employees', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `task` WHERE `id`=?', [req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
}); */