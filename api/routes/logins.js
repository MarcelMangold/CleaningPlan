var mysql = require('mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var CONFIG = require(__dirname + '../../config.js');

function post(req, res, next) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: CONFIG.db_user,
        password: CONFIG.db_password,
        database: CONFIG.db_name
    });

    connection.connect();
  

    var query = "SELECT `user_management`.`id`, `user_management`.`username`, `user_management`.`password`" +
        "FROM `cleaningplandb`.`user_management`" +
        " WHERE `username` ='" + req.body.username + "'";

    connection.query(query, function (err, results, fields) {
        if (err)
            console.error(err);

        if (results[0] == undefined) {
            res.status(401).send({ message: 'Benutzername ist ungültig' });
            return;
        }
        
        user = results[0];
        connection.end();
  

        bcrypt.compare(req.body.password, user.password, function (err, pwMatch) {
            var payload;
            if (err) {
                return next(err);
            }

            if (!pwMatch) {
                res.status(401).send({ message: 'Benutzer oder Passwort sind ungültig' });
                return;
            }

            payload = {
                sub: user.username,
                role: user.role
            };
            var token = jwt.sign(payload, CONFIG.jwt_encryption, CONFIG.signOptions);
            console.log(token);
            res.status(200).json({
                user: user,
                token: token
            });




        });
    });
}

module.exports.post = post;