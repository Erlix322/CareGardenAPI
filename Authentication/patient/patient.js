var mysql = require('../data/database.js');



exports.getPatients = function(res){
   
    mysql.connection.query('Select * from Patient;', function(err,rows,fields){
       res.send(rows);
    });   
}


exports.getPatients;