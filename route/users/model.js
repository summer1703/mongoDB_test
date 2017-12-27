var mongoose = require('mongoose');
var Schema = mongoose.Schema({
    username: {
    	type: String,
    	unique: true
    },
    password: {
    	type: String
    },
    phone: {
    	type: String,
    	unique: true
    },
    email: {
    	type: String,
    	unique: true
    },
});
var Model = mongoose.model('users', Schema);

module.exports = Model;