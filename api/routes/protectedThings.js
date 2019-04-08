var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var CONFIG = require(__dirname + '../../config.js');
function get(req, res, next) {
 
    
    var connection = mysql.createConnection({
        host: 'localhost',
        user: CONFIG.db_user,
        password: CONFIG.db_password,
        database: CONFIG.db_name
    });

    connection.connect();
    connection.query('SELECT * FROM cleaningplandb.user_management;', function (err, results, fields) {
        if (err)
            console.error(err);
        res.status(200).json(results);

    });

    connection.end();

}

module.exports.get = get;