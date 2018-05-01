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
var server = app.listen(3000, "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

//rest api to create a new record into mysql database
 app.post('/empl',urlencodedParser, function (req, res) {
   var first_name  =req.body.first_name;
   var last_name  =req.body.last_name;
   var password  =req.body.password;
   var confirm  =req.body.confirm;
   var email  =req.body.email;
   var pastal_code  =req.body.pastal_code;
   var mobile_no  =req.body.mobile_no;
   if(password == confirm)
   {
connection.query("Insert into introduction (first_name,last_name,password,email,pastal_code,mobile_no) VALUES ('"+first_name+"','"+last_name+"','"+password+"','"+email+"','"+pastal_code+"','"+mobile_no+"')", function (error, results, fields) {
	  if (error) throw error;
	 // res.end(JSON.stringify(results));
	 res.redirect('http://localhost/hello/signup.html');
	 console.log('Record inserted successfully.');
	});
   }
   else{
	   
	  // res.send(500,'Password not match') 
	   console.log('Password Not Match.');
   }
});
 
 /***********Get Single records***************/
 //rest api to get a single employee data
 app.get('/employe/:id', function (req, res) {
   console.log(req);
   connection.query('select * from Introduction where id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
}); 


app.get('/employees', function (req, res) {
   connection.query('select * from Introduction', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
/*********End code********/

app.post('/login',urlencodedParser, function (req, res) {

	var email  =req.body.email;
	var password  =req.body.password;


connection.query("SELECT * FROM introduction WHERE email = '"+email+"' AND password= '"+password+"' ", function (error, results, fields) {
	if (error) {
	console.log('there are some error with query.');
	}else {
	if(results.length >0) {
		
    if(password==results[0].password) {

res.redirect('http://localhost/hello/success.html');

		} else {
			res.json({
			  status:false,
			  message:"Email and password does not match"
			 });
		}

	} else {
		//Show output in console
        console.log('Email does not exits.');
    }
}
});
});