var express = require('express');
var router = express.Router();
var model = require('./model');

// router.use(function(req, res, next) {
//   if(!req.user.username){
//   	res.send({
//   		code: 401,
//   		message: '用户未登录！'
//   	})
//   	return;
//   }
//   next();
// });
// // 增加
// router.post('/add', function(req, res) {
// 	model.count({
// 		username: req.body.username
// 	},function(err, data){
// 		console.log(data)
// 		if(data >= 1){
// 			res.send({
// 				code: 1,
// 				message: '用户名重复！'
// 			})
// 			return;
// 		}
// 		model.count({
// 			phone: req.body.phone
// 		},function(err, data){
// 			if(data >= 1){
// 				res.send({
// 					code: 1,
// 					message: '手机号重复！'
// 				})
// 				return;
// 			}
// 			model.count({
// 				email: req.body.email
// 			},function(err, data){
// 				if(data >= 1){
// 					res.send({
// 						code: 1,
// 						message: '邮箱重复！'
// 					})
// 					return;
// 				}
// 				model.create({
// 			  		username: req.body.username,
// 			  		password: req.body.password,
// 			  		phone: req.body.phone,
// 			  		email: req.body.email
// 			  	},function(err, data){
// 				  	if(err){
// 						res.send({
// 							code: 2,
// 							message: 'error' + err.message
// 						});
// 						return;
// 					}
// 					res.send({
// 						code: 0,
// 						list: data
// 					});
// 				});
// 			})
// 		})
// 	})
// });
// //删除
// router.get('/delete', function(req, res){
// 	model.remove({ _id: { $in: req.query.ids } },function(err, data){
// 		if(err){
// 			res.send('error' + err.message);
// 			return;
// 		}
// 		res.send(data);
// 	})
// });
// //修改
// router.post('/update', function(req, res){
// 	var { username, phone, email, _id } = req.body;
// 	model.findOne({
// 		username
// 	},function(err, data){
// 		if(data && data._id != _id){
// 			res.send({
// 				code: 1,
// 				message: '该用户名已存在，请重新填写！'
// 			})
// 			return;
// 		}
// 		model.findOne({
// 			phone
// 		},function(err, data){
// 			if(data && data._id != _id){
// 				res.send({
// 					code: 1,
// 					message: '该手机号已存在，请重新填写！'
// 				})
// 				return;
// 			}
// 			model.findOne({
// 				email
// 			},function(err, data){
// 				if(data && data._id != _id){
// 					res.send({
// 						code: 1,
// 						message: '该邮箱已存在，请重新填写！'
// 					})
// 					return;
// 				}
// 				model.update({
// 					_id
// 				},{
// 					username,
// 					phone,
// 					email
// 				},function(err, data){
// 					if(err){
// 						res.send('error' + err.message);
// 						return;
// 					}
// 					res.send({
// 						code: 0,
// 						message: '修改成功！'
// 					});
// 				})
// 			})
// 		})
// 	})
// })
//findByPage
router.get('/list', function(req, res){
	var curpage = +req.query.curpage;
	var pagesize = +req.query.pagesize;
	var value = req.query.value;
	var reg = {$regex : new RegExp(value, 'i')};
	model.count({
		$or: [
			{
				name: reg
			},
			{
				price: reg
			},
			{
				tags: reg
			},
			{
				add: reg
			},
		]
	}, function(err, count){
		var total = count;
		model
			.find({
			$or: [
				{
					name: reg
				},
				{
					price: reg
				},
				{
					tags: reg
				},
				{
					add: reg
				},
			]
		})
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
module.exports = router;