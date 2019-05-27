var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'service_now1'
});

connection.connect(function(err) {
  if (err) console.log("Unable to connect");
  else
  console.log("Connected to database!");
});

module.exports = connection;