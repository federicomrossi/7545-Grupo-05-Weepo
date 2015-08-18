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

	// GET: /campaign/get
	app.get('/campaign/get/:brand_id', function(req, res) {

		if(!req.isAuthenticated()) {
			res.send('Access forbidden.');
			return;
		}

		campaign.get(req.params.brand_id, function(r) {
			res.send(r);
		});
	});


	// POST: /campaign/new
	app.post('/campaign/new', function(req, res) {

		if(!req.isAuthenticated()) {
			res.send('Access forbidden.');
			return;
		}

		console.log("DATOS POST:");
		console.log(req.body);

		var data = req.body;
		data.brand_id = '1'; // Here we'll replace the hardcoded id with the real brand id.

		campaign.create(data, function(r) {
			res.send({});
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


