var jwt = require('jsonwebtoken');
const CONFIG = require(__dirname + '../../config.js');

function auth(role) {
    return function(req, res, next) {
        var token;
        var payload;
    
        if (!req.headers.authorization) {
            return res.status(401).send({message: 'Du bist dafür nicht authentifiziert'});
        }

        token = req.headers.authorization.split(' ')[1];
        try {
            payload = jwt.verify(token, CONFIG.jwt_encryption);
            console.log(payload);
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                res.status(401).send({message: 'Token Expired'});
            } else {
                res.status(401).send({message: 'Authentifizierung gescheitert'});
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
            res.status(401).send({message: 'Du bist dafür nicht authentifiziert'});
        }
    }
}

module.exports = auth;