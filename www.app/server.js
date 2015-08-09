var config = require('./config.json');
var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var user = require('./public/app/shared/controllers/UsersController.js');

//
//  Define the strategy to be used by PassportJS
//
passport.use(new LocalStrategy(
  function(username, password, done) {

    user.isRegistered(username, function(result) {
        console.log("result:", result);
        if ((result === null) || (result === 'undefined')) {
          return false;
        }
        if (password == result.password) {
          return done(null, {'id': result.user_id, 'username': username, 'name': result.name + " " + result.last_name});    
        } else {
          return done(null, false, { message: 'Incorrect username.' });
        }
    });
}));




passport.use(new GoogleStrategy({
    returnURL: 'http://www.example.com/auth/google/return',
    realm: 'http://www.example.com/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));









// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};



//
//  Main code
//

// Start express application
var app = express();

// all environments
app.set('port', process.env.PORT || config.express.port);
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.cookieParser()); 
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'securedsession' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//
//  Routes
//
app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

app.get('/users', auth, function(req, res){
  res.send([{name: "user1"}, {name: "user2"}]);
});


//
//  Route to test if the user is logged in or not
//
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});


//
// Start de server
//
http.createServer(app).listen(app.get('port'), function(){
  console.log('Weepo server listening on port ' + app.get('port'));
});
