/*########################################################
# Json Web token Authentication API for MySQL DB         #
#                                                        #
#                                                        # 
##########################################################
*/

/*##############################
  #                            #
  # Import some Useful things  #
  ##############################*/
  
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');


var jwt    = require('jsonwebtoken'); // handle tokens
var config = require('./config'); // config file


var therapeut = require('./therapeut/therapeut.js');
var us = require('./user/login.js');
var db = require('./data/database.js');


var port = process.env.PORT || 8080; //the port our app listens to

app.set('superSecret', config.secret); // secret variable

//just for loggin stuff
app.use(morgan('dev'));
//body parser gives us information of the post and get headers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/*#################################################################
#       ROUTES                                                    #
#       basic routes(everyone can see the content of these routes)#
#                                                                 #
##################################################################*/
// root route
app.get('/', function(req, res) {
    res.send('Hello API World!!!!');
});


app.set('view engine', 'jade'); //that is needed to render the views (views/*.jade)

//Just a dummy with two links(login/register)
app.get('/index', function(req, res) {
    res.render('index', { user : req.user });
});

//Instance of the router for api
var apiRoutes = express.Router(); 

apiRoutes.get('/login',function(req,res){
  res.render('login');
}); 
//this funtion handles all the query and verifing stuff.
var handleLogin = function(req,res){
    var user = {             //creating a usermodel  
    name:req.body.username,
    password:req.body.password
    }
    var ret = us.getUser(user,function(rows){  //query the database and getting the rows via callback
       console.log(rows);
       if(rows[0]['T_ID']==user.name && rows[0]['Password']){ 
         var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });
        var json = {token:token};  
        res.render('index', { user,token }); //rendering index.jade with given parameters
       }else{
         res.send("War wohl nix");
       }
    }); 
};  

//route to verify the login process
apiRoutes.post('/login',handleLogin);


/*###########################################################################
# That's the start of our MIDDLEWARE                                        #
# since we want wo allow only people with a valid Token to access certain   #
# paths, we have to do the following steps:                                 #
# 1. check if the request contains a token                                  #
# 2. verify the token with our secret                                       #
# ###########################################################################
*/
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    return res.status(403).send({ 
        success: false, 
        message: 'No token was found!' 
    });
    
  }
});

//http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'CareGarden API' });
});

//http://localhost:8080/api/therapists returns a List of all therapists
apiRoutes.get('/therapists', function(req, res) {
  therapeut.getTherapists(res);
});   

//##########################################
//#     End of defining our secured routes #
//##########################################
//adding the routes to our api

app.use('/api', apiRoutes);

console.log('listen to http://localhost:' + port);
app.listen(8080);