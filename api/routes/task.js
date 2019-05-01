var mysql = require('mysql');
const CONFIG = require(__dirname + '../../config.js');

var connection = mysql.createConnection({
    host: 'localhost',
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name
});

async function addTask(req, res, next) {
    let task = req.body;
    let query =
        "INSERT INTO `cleaningplandb`.`tasks` ( `task_name`, `duration`,  `finished_on`, `time_period`, `timestamp`,  `user_id`)   VALUES ('" +
        task.taskName + "', " + task.duration + "," + task.finishedOn + "," + task.timePeriod + ",'" + new Date().toISOString().slice(0, 19).replace('T', ' ') + "'," + task.user_id + ");";
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

    var query = "SELECT * FROM cleaningplandb.events;"
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

function updateEvent(req, res, next) {
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
        res.send({ success: true });
        return;


    });

}

module.exports.addTask = addTask;
module.exports.getEvents = getEvents;
module.exports.updateEvent = updateEvent;






/* CREATE TABLE `cleaningplandb`.`task_information` (
    `task_information_id` INT NOT NULL,
    `duration` INT NOT NULL,
    `monday` TINYINT NOT NULL,
    `tuesday` TINYINT NOT NULL,
    `wednesday` TINYINT NOT NULL,
    `thursday` TINYINT NOT NULL,
    `friday` TINYINT NOT NULL,
    `saturday` TINYINT NOT NULL,
    `sunday` TINYINT NOT NULL,
    PRIMARY KEY (`task_information_id`));
 */