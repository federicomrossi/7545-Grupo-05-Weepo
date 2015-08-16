var config = require('../config.json');
var pg = require('pg');
var connectionString = "postgres://" + config.bd.user + ":" + config.bd.pass
 + "@" + config.bd.host + ":" + config.bd.port + "/" + config.bd.db;


var db = {

  query: function(queryString, callback) {
    var res = {};
    var client = new pg.Client(connectionString);
    client.connect(function(err) {
      if(err) {
        return console.error('Could not connect to Data Base', err);
      }
      client.query(queryString, function(err, result) {
        if(err) {
          return console.error('Error running query', err);
        }
        console.log(result.rows[0]);
        res = result.rows[0];
        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
        client.end();
        callback(res);
      });
    });

  },

};

module.exports = db;
