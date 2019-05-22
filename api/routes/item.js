var mysql = require('mysql');
const CONFIG = require(__dirname + '../../config.js');

var connection = mysql.createConnection({
    host: 'localhost',
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name
});

function addItem(req, res, next) {
    console.log(req.body)
    
    let item = req.body;
    var query = "INSERT INTO `cleaningplandb`.`shopping_list`"
        + "( `item_name`,  `created_by`, `created_at`, `finished`)" +
        "VALUES" + "( '" + item.item_name + "', '" + item.created_by + "' , '" + item.created_at + "', " + item.finished + " );"
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

function getItems(req, res, next) {
    var query = "SELECT * FROM cleaningplandb.shopping_list WHERE finished = false;"
    connection.query(query, function (err, results, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, message: 'database error by reading items', error: err });
            return;
        }
        console.log(results)
        res.send({ results });
        return;
    });

}

function updateItem(req,res,next)
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

module.exports.addItem = addItem;
module.exports.getItems = getItems;
module.exports.updateItem = updateItem;


