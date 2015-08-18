'use strict';

module.exports.controller = function(app) {

	var passport = require('passport');
	var campaign = require('../models/campaignModel.js');

	// Add passport initialization
	app.use(passport.initialize()); 
	app.use(passport.session());


	//
	// Routes
	//

	// GET
	app.get('/campaign/get/:brand_id', function(req, res) {

		if(!req.isAuthenticated()) {
			res.send('Access forbidden.');
			return;
		}

		campaign.get(req.params.brand_id, function(r) {
			res.send(r);
		});
	});

	// // POST
	// app.get('/campaign/post', function(req, res) {

	// 	if(!req.isAuthenticated()) {
	// 		res.send('Access forbidden.');
	// 		return;
	// 	}




	// 	res.send("Post de campañas");
	//   	//res.send(req.isAuthenticated() ? req.user : '0');
	// });
}


