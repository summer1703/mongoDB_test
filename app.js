var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cors = require('cors');
var jwt = require('express-jwt');
require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(favicon(__dirname + '/public/favicon.ico'));

var whitelist = ['http://192.168.0.107:3000', 'http://192.168.0.107:3001'];
//ar whitelist = ['http://172.20.10.8:3000', 'http://172.20.10.8:3001'];
app.use(cors({
	origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));

// app.use(jwt({
//   	secret: 'hello world !',
//   	credentialsRequired: false,
//   	getToken: function fromHeaderOrQuerystring (req) {
// 	    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
// 	        return req.headers.authorization.split(' ')[1];
// 	    } else if (req.query && req.query.token) {
// 	      	return req.query.token;
// 	    }
//     	return null;
//   	}
// }));
var users = require('./route/users');
app.use('/users', users);
var managers = require('./route/managers');
app.use('/managers', managers);
var shops = require('./route/shops');
app.use('/shops', shops);
var swiperImgs = require('./route/swiperImgs');
app.use('/swiperImgs', swiperImgs);

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});