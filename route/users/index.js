var express = require('express');
var router = express.Router();
var model = require('./model');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
  res.send('user');
});
// 增加
router.post('/add', function(req, res) {
	model.count({
		username: req.body.username
	},function(err, data){
		console.log(data)
		if(data >= 1){
			res.send({
				code: 1,
				message: '用户名重复！'
			})
			return;
		}
		model.count({
			phone: req.body.phone
		},function(err, data){
			if(data >= 1){
				res.send({
					code: 1,
					message: '手机号重复！'
				})
				return;
			}
			model.count({
				email: req.body.email
			},function(err, data){
				if(data >= 1){
					res.send({
						code: 1,
						message: '邮箱重复！'
					})
					return;
				}
				model.create({
			  		username: req.body.username,
			  		password: req.body.password,
			  		phone: req.body.phone,
			  		email: req.body.email
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
		})
	})
});
//删除
router.get('/delete', function(req, res){
	model.remove({ _id: { $in: req.query.ids } },function(err, data){
		if(err){
			res.send('error' + err.message);
			return;
		}
		res.send(data);
	})
});
//修改
router.post('/update', function(req, res){
	var { username, phone, email, _id } = req.body;
	model.findOne({
		username
	},function(err, data){
		if(data && data._id != _id){
			res.send({
				code: 1,
				message: '该用户名已存在，请重新填写！'
			})
			return;
		}
		model.findOne({
			phone
		},function(err, data){
			if(data && data._id != _id){
				res.send({
					code: 1,
					message: '该手机号已存在，请重新填写！'
				})
				return;
			}
			model.findOne({
				email
			},function(err, data){
				if(data && data._id != _id){
					res.send({
						code: 1,
						message: '该邮箱已存在，请重新填写！'
					})
					return;
				}
				model.update({
					_id
				},{
					username,
					phone,
					email
				},function(err, data){
					if(err){
						res.send('error' + err.message);
						return;
					}
					res.send({
						code: 0,
						message: '修改成功！'
					});
				})
			})
		})
	})
})
//findByPage
router.get('/list', function(req, res){
	var curpage = +req.query.curpage;
	var pagesize = +req.query.pagesize;
	var type = req.query.type;
	var value = req.query.value;
	var reg = {$regex : new RegExp(value, 'i')};
	var condition;
	switch(type){
		case '1': 
			condition = { username: reg };
			break;
		case '2': 
			condition = { phone: reg };
			break;
		case '3': 
			condition = { email: reg };
			break;
	}
	model.count(condition, function(err, count){
		var total = count;
		model
		.find(condition)
		.select('-password')
		.skip((curpage - 1) * pagesize)
		.limit(pagesize)
		.exec(function(err, data){
			if(err){
				res.send('error' + err.message);
				return;
			}
			res.send({
				curpage: curpage,
				pagesize: pagesize,
				maxpage: Math.ceil(total / pagesize),
				rows: data,
				total
			});
		})
	});
});
//查询单个
router.post('/login',function(req, res){
	console.log(req.body.username)
	var username = req.body.username;
	model
	.count({
		$or: [
			{
				username
			},
			{
				phone: username
			},
			{
				email: username
			}
		],
		password: req.body.password
	})
	.exec(function(err, data){
		if(err){
			res.send('error' + err.message);
			return;
		}
		if(data <= 0 ){
			res.send({
				code: 1,
				message: '账号或密码错误，请重新登录！'
			});
			return;
		}
		const token = jwt.sign({
			username
		}, 'hello world !', {
			expiresIn: '1h'
		})
		res.send({
			code: 0,
			message: '登陆成功，即将跳转至主页面！',
			token
		});
	})
})
module.exports = router;