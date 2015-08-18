'use strict';

module.exports =  function() {

  var db = require('../services/databaseService.js');
  var sync = require('synchronize');
  var fiber = sync.fiber;
  var await = sync.await;
  var defer = sync.defer;

  return {

    get: function(brand_id, callback) {
 
      var string = '' +

        ' SELECT ' +
        '  "Campaign".id AS campaign_id, ' +
        '  "Campaign".name AS campaign_name, ' +
        '  "Campaign".description, ' +
        '  "Campaign".image_url, ' +
        '  "Campaign"."dateCreation", ' +
        '  "Campaign"."dateStart", ' +
        '  "Campaign"."dateFinish", ' +
        '  "Campaign".brand_id, ' +
        '  "Campaign".deleted, ' +
        '  "Campaign".state, ' +
        '  "Brand".name AS brand_name, ' +
        '  "Brand".deleted, ' +
        '  "Brand".next_payment, ' +
        '  "Brand".plan_id, ' +
        '  "Brand".email' +
        ' FROM ' +
        '  public."Campaign", ' +
        '  public."Brand"' +
        ' WHERE ' +
        '  "Campaign".deleted = false AND' +
        '  "Brand".deleted = false AND' +
        '  "Campaign".brand_id = "Brand".id AND' +
        '  "Campaign".brand_id = ' + brand_id ;

      db.query(string, function(result) {
        callback(result);
      });
    },

    create: function(data, callback) {
 
      var string = '' +

        ' INSERT ' +
        ' INTO "Campaign"(' +
        '  name, ' +
        '  description, ' +
        '  image_url,' +
        '  "dateCreation",' +
        '  "dateStart",' +
        '  "dateFinish",' +
        '  brand_id,' +
        '  deleted,' +
        '  state)' +
        ' VALUES (' +
        '  \'' + data.name +  '\'' +
        ', \'' + data.description + '\'' +
        ', \'' + data.image_url + '\'' +
        ', \'' + data.dateCreation + '\'' +
        ', \'' + data.dateStart + '\'' +
        ', \'' + data.dateFinish + '\'' +
        ', \'' + data.brand_id + '\'' +
        ', false' + 
        ', true' +
        ')';

    console.log(string);

      db.query(string, function(result) {
        callback(result);
      });
    },

    attributes: {

    }
  };
}();