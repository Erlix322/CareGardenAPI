var mysql = require('../data/database.js');

function selectCust(res,next){
    next(res);
}

exports.getTherapists = function(res){
   
    mysql.connection.query('Select * from Therapeut;', function(err,rows,fields){
       res.send(rows);
    });
   
}





exports.getTherapists;