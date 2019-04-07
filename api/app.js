var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var publicThings = require(__dirname + '/routes/publicThings.js');
var protectedThings = require(__dirname + '/routes/protectedThings.js');
var users = require(__dirname + '/routes/users.js');
var logins = require(__dirname + '/routes/logins.js');
var auth = require(__dirname + '/routes/auth.js');

var app;
var router;
var port = 3000;

app = express();
app.use(morgan('combined')); 
app.use(bodyParser.json());

router = express.Router();

router.get('/public_things', publicThings.get);
router.get('/protected_things', auth(), protectedThings.get);
router.post('/users', users.post);
router.post('/login', logins.post);
app.use('/api', router);

app.listen(port, function() {

    console.log('Web server listening on localhost:' + port);

});