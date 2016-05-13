var mysql = require('mysql');
var con = null;

exports.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'harrypotter',
        database:'s72827' 
});
