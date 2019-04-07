var mysql = require('mysql');
var config = require(__dirname + '../../config.js');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : config.database.user,
    password : config.database.password,
    database : config.database.databaseName
  });

var config = require(__dirname + '../../config.js');

function get(req, res, next) {
    connection.connect();
    connection.query('SELECT * FROM cleaningplandb.user_management;',  function(err, results, fields){
            if (err) 
                console.error(err);
            
            res.status(200).json(results);

        });
      
      connection.end();
  }

module.exports.get = get;