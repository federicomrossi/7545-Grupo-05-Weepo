'use strict';

module.exports.controller = function(app) {

	var fs = require('fs');
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

		var data = req.body;
		data.brand_id = '1'; // Here we'll replace the hardcoded id with the real brand id.

		campaign.create(data, function(r) {
			res.send(200);
		});
	});

	// POST: /campaign/edit
	app.post('/campaign/edit', function(req, res) {

		if(!req.isAuthenticated()) {
			res.send('Access forbidden.');
			return;
		}

		res.send(200);
	});

	// POST: /campaign/delete:
	app.post('/campaign/delete/:campaign_id', function(req, res) {

		if(!req.isAuthenticated()) {
			res.send('Access forbidden.');
			return;
		}

		campaign.delete(req.params.campaign_id, function(r) {
			res.send(200);
		});
	});

	// POST: /campaign/uploadImage
	app.post('/campaign/uploadImage', function(req, res){

		if(!req.isAuthenticated()) {
			res.send('Access forbidden.');
			return;
		}

		fs.readFile(req.files.images.path, function (err, data) {

			var upload_dir = "/../public/assets/data/campaign/";
			var filename = Math.floor((Math.random() * 10000000000000) + 1) + "." + req.files.images.name.substr(-3);
			var new_path = __dirname + upload_dir + filename;
			var old_image_url = req.body.old_image_url;

		  	fs.writeFile(new_path, data, function (err) {
			  	fs.unlink(req.files.images.path, function() {
		            if (err) {
		            	console.log(err);
		            }
		        });

		        if ((old_image_url !== null) || (old_image_url !== 'undefined')) {
		        	fs.unlink(__dirname + upload_dir + old_image_url, function() {
			            if (err) {
			            	console.log(err);
			            }
			        });
		        }

		  		var image_info = {
		  			image_url: filename,
		  			image_size: req.files.images.size,
		  			image_original_name: req.files.images.name
		  		};

	            res.send(image_info);
		  	});
		});
	});
}


