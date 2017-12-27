var mongoose = require('mongoose');
var Schema = mongoose.Schema({
    shopId: {
    	type: String
    },
    imgURL: {
    	type: String
    }
});
var Model = mongoose.model('swiperimgs', Schema);

module.exports = Model;