'use strict';
var mysql = require('mysql');
var cors = require('cors');
var config = require('./config.json');
// Create the connection
var pool  = mysql.createPool({
  host            : config.dbhost,
  user            : config.dbuser,
  password        : config.dbpassword,
  database        : config.dbname
});
exports.handler =  (event, context, callback) => {
  //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    // Use the connection
    connection.query('SELECT * FROM gee_ads', function (error, results, fields) {
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      var JobBoards= results;
		var output= [ {JobBoards} ];
      if (error) callback(error);
      else callback(null,output);
    });
  });
};

