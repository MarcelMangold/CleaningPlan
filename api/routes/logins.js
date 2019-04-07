var mysql = require('mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require(__dirname + '../../config.js');

function post(req, res, next) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: config.database.user,
        password: config.database.password,
        database: config.database.databaseName
    });

        connection.connect();
        var query = "SELECT `user_management`.`id`, `user_management`.`username`, `user_management`.`password`" + 
                    "FROM `cleaningplandb`.`user_management`" + 
                    " WHERE `username` ='" + req.body.name + "'";
        console.log(query);
        connection.query(query, function (err, results, fields) {
            if (err)
                console.error(err);

                user = results[0];
                connection.end();
         
                bcrypt.compare(req.body.password, user.password, function(err, pwMatch) {
                    var payload;
                    if (err) {
                        return next(err);
                    }

                    if (!pwMatch) {
                        res.status(401).send({message: 'Invalid email or password.'});
                        return;
                    }

                    payload = {
                        sub: user.username,
                        role: user.role
                    };

                    res.status(200).json({
                        user: user,
                        token: jwt.sign(payload, config.jwtSecretKey, config.signOptions)
                    });

      


        });
    });
}

module.exports.post = post;