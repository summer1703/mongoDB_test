var express = require('express');
var router = express.Router();
var model = require('./model');

router.get('/', function(req, res) {
  res.send('managers');
});
// 注册添加
router.post('/add', function(req, res) {
	var { username, password } = req.body;
	model.count({
		username
	},function(err, data){
		if(data >= 1){
			res.send({
				code: 1,
				message: '用户名重复！'
			})
			return;
		}
		model.create({
	  		username,
	  		password
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
//登录查询
router.post('/login',function(req, res){
	var { username, password } = req.body;
	model
	.count({
		username,
		password
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
		res.send({
			code: 0,
			message: '登陆成功，即将跳转至主页面！'
		});
	})
})
module.exports = router;