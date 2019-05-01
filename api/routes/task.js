var mysql = require('mysql');
const CONFIG = require(__dirname + '../../config.js');

var connection = mysql.createConnection({
    host: 'localhost',
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name
});

async function addTask(req, res, next) {
    var resultCreateDetailInformation = await createDetailInformation(req.body);
    var resultCreateTask = await createTask(req.body, resultCreateDetailInformation.insertId);
    res.send(resultCreateTask);

}

function createDetailInformation(task) {
    return new Promise(function (resolve, reject) {
        if (task.duration == "day")
            task.duration = 0;
        else if (task.duration == "week")
            task.duration = 1;
        else if (task.duration == "month")
            task.duration = 2;

        var weekdays = task.weekdays;
        var query =
            "INSERT INTO `cleaningplandb`.`task_information` (`duration`,  `monday`,  `tuesday`,  `wednesday`,  `thursday`,  `friday`,  `saturday`,  `sunday`)  VALUES ( " +
            task.duration + ", " + weekdays.monday + ", " + weekdays.tuesday + ", " + weekdays.wednesday + ", " + weekdays.thursday + ", " + weekdays.friday + ", " + weekdays.saturday + ", " + weekdays.sunday + "); ";
        connection.query(query, function (err, results, fields) {
            if (err) {
                console.log(err);
                return reject({ success: false, message: 'database error by creating item', error: err });
            }
            return resolve({ success: true, insertId: results.insertId });
        });
    });
}

function createTask(task, detailInformationId) {
    return new Promise(function (resolve, reject) {
        var query =
            "INSERT INTO `cleaningplandb`.`tasks` ( `task_name`, `task_information_id`,   `user_id`)   VALUES ('" +
            task.taskName + "', " + detailInformationId + "," + task.user_id + ");";
        connection.query(query, function (err, results, fields) {
            if (err) {
                console.log(err);
                return reject({ success: false, message: 'database error by creating item', error: err });
            }
            return resolve({ success: true, insertId: results.insertId });
        });
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