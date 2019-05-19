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

async function currentTask(req, res, next) {
    getCurrentTask()
        .then(result => {
            res.status(200).send({ tasks: result });
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ message: 'database error by creating item', error: error })
        })
}

function getCurrentTask() {
    return new Promise(function (resolve, reject) {
        let query = 'SELECT task.task_id, task.finished_at  , task_detail.task_name,task.state'
            + " FROM cleaningplandb.task task join cleaningplandb.task_detail task_detail on task.fk_task_detail_id = task_detail.task_detail_id"
            + " WHERE state != 1 ;"

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
module.exports.currentTask = currentTask;
module.exports.getEvents = getEvents;
module.exports.updateEvent = updateEvent;


