var mongoose = require('mongoose');
var Schema = mongoose.Schema({
    name: {
    	type: String
    },
    img: {
    	type: String
    },
    price: {
    	type: String
    },
    tags: {
        type: Array
    },
    distance: {
        type: String
    },
    add: {
        type: String
    },
});
var Model = mongoose.model('shops', Schema);

module.exports = Model;