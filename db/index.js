var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/manlaoshi');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('mongodb open ok')
});