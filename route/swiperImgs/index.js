var express = require('express');
var router = express.Router();
var model = require('./model');

router.get('/', function(req, res) {
  res.send('swiperImgs');
});
//findByPage
router.get('/list', function(req, res){
	model
	.find({})
	.exec(function(err, data){
		if(err){
			res.send('error' + err.message);
			return;
		}
		res.send(data);
	})
});
module.exports = router;