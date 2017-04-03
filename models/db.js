var mongoose = require('mongoose');
var config = require('../config');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');
// native promises
mongoose.Promise = global.Promise;mongoose.connect('mongodb://'+config.user+':'+config.secret+'@'+config.dbhost+'/'+config.dbname);
// mongoose.connect('mongodb://localhost/notifer');
module.exports = mongoose;