var mysql = require('mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require(__dirname + '../../config.js');

function post(req, res, next) {
    var user = {
        email: req.body.name
    };

    var unhashedPassword = req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(unhashedPassword, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.hashedPassword = hash;

            insertUser(user, function(err, user) {
                var payload;
                if (err) {
                    return next(err);
                }

                payload = {
                    sub: user.email,
                };

                res.status(200).json({
                    user: user,
                    token: jwt.sign(payload, config.jwtSecretKey, config.signOptions)
                   
                });
            });
        });
    });

}

module.exports.post = post;

function insertUser(user, cb) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: config.database.user,
        password: config.database.password,
        database: config.database.databaseName
    });

        connection.connect();
        var query = "INSERT INTO `cleaningplandb`.`user_management`" +
        "(`username`,`password`) " + 
        "VALUES" +"('" + user.email +  "','" + user.hashedPassword +"')";
        console.log(query);
        connection.query(query, function (err, results, fields) {
            if (err)
                console.error(err);

            connection.end();
            cb(err, results);

        });

 



}