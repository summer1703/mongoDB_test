var mongoose = require('mongoose');
var kittySchema = mongoose.Schema({
    name: {
    	type: String,
    	unique: true
    },
    age: Number
});
var Kitten = mongoose.model('Kitten', kittySchema);

module.exports = Kitten;