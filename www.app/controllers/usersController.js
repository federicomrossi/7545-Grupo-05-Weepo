'use strict';

module.exports.controller = function(app) {

	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	var FacebookStrategy = require('passport-facebook').Strategy;
	var TwitterStrategy = require('passport-twitter').Strategy;
	var GoogleStrategy = require('passport-google').Strategy;
	var user = require('../models/usersModel.js');

	//
	//  Define the strategies to be used by PassportJS
	//

	// Local strategy
	passport.use(new LocalStrategy(
	  function(username, password, done) {

	    user.isRegistered(username, function(result) {
	        console.log("result:", result);
	        if ((result === null) || (result === 'undefined')) {
	          return false;
	        }
	        if (password == result.password) {
	          return done(null, {
	          	'id': result.user_id, 
	          	'username': username, 
	          	'name': result.name + " " + result.last_name,
	          	'brand_name': result.brand_name
	          });    
	        } else {
	          return done(null, false, { message: 'Incorrect username.' });
	        }
	    });
	}));

	// Google strategy
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

	// Add passport initialization
	app.use(passport.initialize()); 
	app.use(passport.session());



	//
	// Routes
	//

	// Route to get user
	app.get('/users', auth, function(req, res){
	  res.send([{name: "user1"}, {name: "user2"}]);
	});

	// Route to test if the user is logged in or not
	app.get('/loggedin', function(req, res) {
	  res.send(req.isAuthenticated() ? req.user : '0');
	});

	// Route to log in
	app.post('/login', passport.authenticate('local'), function(req, res) {
	  res.send(req.user);
	});

	// Route to log out
	app.post('/logout', function(req, res){
	  req.logOut();
	  res.send(200);
	});
}














