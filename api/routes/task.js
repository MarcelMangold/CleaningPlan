var mysql = require('mysql');
const CONFIG = require(__dirname + '../../config.js');

var connection = mysql.createConnection({
    host: 'localhost',
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name
});

async function addTask(req, res, next) {

    addTaskDetail(req.body).then(async result => {
        if (req.body.startDate == null) {
            await addTasktoDatabase(req.body, result.insertId);
            res.status(200).send({ insertId: result.insertId });
        }
        /*  else {
             res.status(200).send({ insertId: result.insertId });
         } */
    }).catch(error => {
        console.log(error)
        res.status(500).send({ message: 'database error by creating item', error: error })
    })
}

function addTaskDetail(task) {
    return new Promise(function (resolve, reject) {

        let query =
            "INSERT INTO `cleaningplandb`.`task_detail` ( `task_name`, `duration`,`time_period`,`finished_on`,`created_on`,`start_date`, `fk_responsibility`,`fk_created_by`)"
            + " VALUES ('" + task.taskName + "', " + task.duration + "," + task.timePeriod + "," + task.finishedOn + ",'" + new Date().toISOString().slice(0, 19).replace('T', ' ')
            + "'," + task.startDate + "," + task.responsibility + "," + task.user_id + ")";
        connection.query(query, function (err, results, fields) {
            if (err) {
                console.log(err);
                reject(error);
            }
            resolve(results)
        });
    });

}

function addTasktoDatabase(task, insertId) {
    return new Promise(function (resolve, reject) {
        var finishedOn = new Date();
        finishedOn.setDate(finishedOn.getDate() + (task.finishedOn + 8 - finishedOn.getDay()) % 7);
        

        let query = "INSERT INTO `cleaningplandb`.`task` (`state`,`finished_at`,`fk_finished_by`,`fk_task_detail_id`)"
            + "VALUES (" + 0 + ",'" + finishedOn.toISOString().slice(0, 19).replace('T', ' ') + "'," + task.responsibility + "," + insertId + ")";

        connection.query(query, function (err, results, fields) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(results)
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