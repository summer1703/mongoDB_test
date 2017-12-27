var mongoose = require('mongoose');
var Schema = mongoose.Schema({
    username: {
    	type: String,
    	unique: true
    },
    password: {
    	type: String
    }
});
var Model = mongoose.model('managers', Schema);

module.exports = Model;