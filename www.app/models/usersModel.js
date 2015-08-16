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
      var string = 'SELECT * from \"Users\" WHERE username = ' + username + ";";
      console.log(string);
      var result = db.query(string);
      if ((result === null) || (result === 'undefined')) {
        return false;
      }
      return (result.logged_in === 'true');
    },

    isRegistered: function(username, callback) {
      var string = "SELECT * from \"Users\" WHERE username = '" + username + "';";
      console.log("query", string);
          var result = db.query(string, function(result) {
            callback(result);
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