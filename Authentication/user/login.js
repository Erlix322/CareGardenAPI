var mysql = require('../data/database.js');

function selectCust(res,next){
    next(res);
}

exports.getUser = function(user,next){
    
    console.log(user.name,user.password);
    mysql.connection.query('Select T_ID,Password from Therapeut;', function(err,rows,fields){
       next(rows);
    });  
   
}

exports.handleLogin = function(req,res){
    var user = {  
    name:req.body.username,
    password:req.body.password
    }
    var ret = us.getUser(user,function(rows){
       console.log(rows);
       if(rows[0]['T_ID']==user.name && rows[0]['Password']){
         var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });
       
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token:token
      });
       }else{
         res.send("War wohl nix");
       }
    }); 
}



exports.getUser;
