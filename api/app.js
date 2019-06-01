var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

const CONFIG = require('./config');
var publicThings = require(__dirname + '/routes/publicThings.js');
var protectedThings = require(__dirname + '/routes/protectedThings.js');
var users = require(__dirname + '/routes/users.js');
var logins = require(__dirname + '/routes/logins.js');
var auth = require(__dirname + '/routes/auth.js');
var item = require(__dirname + '/routes/item.js');
var event = require(__dirname + '/routes/event.js');
var api = require(__dirname + '/routes/api.js');
var task = require(__dirname + '/routes/task.js');

var app;
var router;
var port = CONFIG.port;

app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router = express.Router();

router.get('/api', api.get);
router.get('/public_things', publicThings.get);
router.get('/protected_things',  protectedThings.get);
router.get('/getItems',  auth(),item.getItems);
router.get('/getEvents', auth(),event.getEvents);
router.post('/users', users.post);
router.post('/addItem', auth(), item.addItem);
router.post('/login', logins.post);
router.post('/updateItem',  auth(),item.updateItem)
router.post('/addEvent', auth(), event.addEvent)
router.post('/addTask', auth(), task.addTask)
router.post('/currentTask', auth(), task.currentTask)


app.use('/api',  router);

app.listen(port, 'localhost', function () {

    console.log('Web server listening on localhost:' + port);

});

module.exports = app;
