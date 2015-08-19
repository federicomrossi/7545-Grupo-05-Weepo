'use strict';

module.exports =  function() {

  var db = require('../services/databaseService.js');
  var sync = require('synchronize');
  var fiber = sync.fiber;
  var await = sync.await;
  var defer = sync.defer;

  return {

    create: function(user) {
      var query = "INSERT INTO Users (username, password, user_id, name, last_name, logged_in, email, social_network) VALUES (" + user.username + ", " + user.password + ", " + user.user_id + ", " + user.name + ", " + user.last_name + ", " + user.logged_in + ", " + user.email + ", " + user.social_network + ");";
      db.query(query);
    },

    isLoggedIn: function(username) {
      
      var string = '' +

        ' SELECT ' +
        '   "Users".name, ' +
        '   "Users".logged_in, ' +
        '   "Users".username, ' +
        '   "Users".social_network, ' +
        '   "Users".email, ' +
        '   "Users".last_name, ' +
        '   "Users".user_id, ' +
        '   "Users".password, ' +
        '   "Users".deleted, ' +
        '   "ClientUser".user_id, ' +
        '   "ClientUser".brand_id, ' +
        '   "Brand".name AS brand_name, ' +
        '   "Brand".plan_id AS brand_plan_id, ' +
        '   "Brand".email AS brand_email, ' +
        '   "Brand".id AS brand_id, ' +
        '   "Brand".next_payment AS brand_next_payment, ' +
        '   "Brand".deleted AS brand_deleted' +
        ' FROM ' +
        '   public."Users", ' +
        '   public."ClientUser", ' +
        '   public."Brand"' +
        ' WHERE ' +
        '   "ClientUser".user_id = "Users".user_id  AND' +
        '   "ClientUser".brand_id = "Brand".id AND' +
        '   "Users".deleted = false AND' +
        '   "Brand".deleted = false AND' +
        '   "Users".username = \'' + username + '\'';
      
      console.log(string);

      var result = db.query(string);
      var query_user = result[0];

      if ((query_user === null) || (query_user === 'undefined')) {
        return false;
      }
      return (query_user.logged_in === 'true');
    },

    isRegistered: function(username, callback) {
      var string = '' +

        ' SELECT ' +
        '   "Users".name, ' +
        '   "Users".logged_in, ' +
        '   "Users".username, ' +
        '   "Users".social_network, ' +
        '   "Users".email, ' +
        '   "Users".last_name, ' +
        '   "Users".user_id, ' +
        '   "Users".password, ' +
        '   "Users".deleted, ' +
        '   "ClientUser".user_id, ' +
        '   "ClientUser".brand_id, ' +
        '   "Brand".name AS brand_name, ' +
        '   "Brand".plan_id AS brand_plan_id, ' +
        '   "Brand".email AS brand_email, ' +
        '   "Brand".id AS brand_id, ' +
        '   "Brand".next_payment AS brand_next_payment, ' +
        '   "Brand".deleted AS brand_deleted' +
        ' FROM ' +
        '   public."Users", ' +
        '   public."ClientUser", ' +
        '   public."Brand"' +
        ' WHERE ' +
        '   "ClientUser".user_id = "Users".user_id  AND' +
        '   "ClientUser".brand_id = "Brand".id AND' +
        '   "Users".deleted = false AND' +
        '   "Brand".deleted = false AND' +
        '   "Users".username = \'' + username + '\'';

      console.log("query", string);
      var result = db.query(string, function(result) {
        callback(result[0]);
      });
    },

    attributes: {

      user_id: {
        type: 'integer',
        required: true,
        autoincrement: true,
        primaryKey: true
      },

      username: {
        type: 'string',
        required: true,
        unique: true
      },

      password: {
        type: 'string',
        required: true
      },

      name: {
        type: 'string',
        required: true
      },

      last_name: {
        type: 'string',
        required: true
      },

      logged_in: {
        type: 'boolean',
        required: true
      },

      social_network: {
        type: 'string',
      },

      email: {
        type: 'string',
      }
    }
  };
}();