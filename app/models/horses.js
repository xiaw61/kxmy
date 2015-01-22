

var datastore = require('nedb')
  , db = new datastore({ filename: './data/horses', autoload: true });

module.exports = db;