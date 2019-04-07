var jwt = require('jsonwebtoken');
const CONFIG = require(__dirname + '../../config.js');

function auth(role) {
    return function(req, res, next) {
        var token;
        var payload;
        if (!req.headers.authorization) {
            return res.status(401).send({message: 'You are not authorized'});
        }

        token = req.headers.authorization.split(' ')[1];
        try {
            payload = jwt.verify(token, CONFIG.JWT_ENCRYPTION);
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                res.status(401).send({message: 'Token Expired'});
            } else {
                res.status(401).send({message: 'Authentication failed'});
            }

            return;

        }

        if (!role || role === payload.role) {
            //pass some user details through in case they are needed
            req.user = {
                username: payload.sub,
            };
            next();
        } else {
            res.status(401).send({message: 'You are not authorized'});
        }
    }
}

module.exports = auth;