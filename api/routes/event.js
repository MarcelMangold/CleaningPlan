var mysql = require('mysql');
const CONFIG = require(__dirname + '../../config.js');

var connection = mysql.createConnection({
    host: 'localhost',
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name
});

function addEvent(req, res, next) {

    let event = req.body;
    var query = "INSERT INTO `cleaningplandb`.`events` ( `event_name`, `description`,  `start_time`, `end_time`, `all_day`, `user_id`)" + 
    " VALUES " + 
    "( '"+ event.title + "' , '" + event.desc + "', '" + event.startTime + "' , '" + event.endTime  + "' , " + event.all_day + " , " + event.user_id + " );";
 
    
    connection.query(query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, message: 'database error by creating item', error: err });
            return;
        }
        res.send({ success: true, insertId: results.insertId });
        return;


    });

}

function getEvents(req, res, next) {

    var query = "SELECT * FROM cleaningplandb.shopping_list WHERE finished = false;"
    connection.query(query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, message: 'database error by reading items', error: err });
            return;
        }

        res.send({ results });
        return;
    });

}

function updateEvent(req,res,next)
{
    let item = req.body;
    var query = "UPDATE `cleaningplandb`.`shopping_list`" + 
    " SET " +
    "`finished_by` = '" + item.finished_by + "', " +  
    "`finished_at` ='" + item.finished_at + "', " + 
    "`finished` = " + true + 
    " WHERE `item_id` = " + item.item_id + ";";
    connection.query(query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, message: 'database error by updating itewm', error: err });
            return;
        }
        res.send({ success: true});
        return;


    });

}

module.exports.addEvent = addEvent;
module.exports.getEvents = getEvents;
module.exports.updateEvent = updateEvent;

/* CREATE TABLE `cleaningplandb`.`events` (
    `event_id` INT NOT NULL AUTO_INCREMENT,
    `event_name` VARCHAR(250) NOT NULL,
    `description` VARCHAR(500) NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NULL,
    `all_day` TINYINT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`event_id`),
   FOREIGN KEY (`user_id`) REFERENCES user_management(id)); */