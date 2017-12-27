var express = require('express');
var router = express.Router();
var model = require('./model');

// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/create', function(req, res) {
	model.count({
		name: req.query.name
	},function(err, data){
		console.log(data)
		if(data >= 1){
			res.send({
				code: 1,
				message: '重复！'
			})
			return;
		}
		model.create({
  		name: req.query.name,
  		age: req.query.age
  	},function(err, data){
		  	if(err){
				res.send({
					code: 2,
					message: 'error' + err.message
				});
				return;
			}
			res.send({
				code: 0,
				list: data
			});
		});
	})
  	
});
router.get('/delete', function(req, res){
	model.remove({
		name: req.query.name
	},function(err, data){
		if(err){
			res.send('error' + err.message);
			return;
		}
		res.send(data);
	})
})

router.get('/update', function(req, res){
	model.update({
		name: req.query.name
	},{
		age: req.query.age
	},function(err, data){
		if(err){
			res.send('error' + err.message);
			return;
		}
		res.send(data);
	})
})
router.get('/list', function(req, res){
	var page = req.query.p;

	model
	.find()
	.select('name age')
	.skip((page - 1) * 10)
	.limit(10)
	.exec(function(err, data){
		if(err){
			res.send('error' + err.message);
			return;
		}
		res.send(data);
	})
});
router.get('/query',function(req, res){
	model
	.findOne({
		name: req.query.name
	})
	.select('name age')
	.exec(function(err, data){
		if(err){
			res.send('error' + err.message);
			return;
		}
		res.send(data);
	})
})
module.exports = router;