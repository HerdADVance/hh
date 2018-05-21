var User = require('../models/User');
var bcrypt = require('bcrypt');

exports.user_detail = function(req, res){
	res.send(req.params.id);
};

exports.user_list = function(req, res, next){

	User.find()
		.sort([['displayName', 'ascending']])
		.exec(function (err, list_users) {
			if(err) {return next(err);}
			//res.render('user_list', {title: 'User List', user_list: list_users});
			res.send({user_list: list_users})
		});
};

exports.user_register = function(req, res){

	var username = req.body.username;
	var password = req.body.password;
	var passwordConfirm = req.body.passwordConfirm;
	var displayName = req.body.displayName;

	User.findOne({ username: username })
		.exec(function(err, user){
			if(err){
				return cb(err);
			} else if (user){
				var err = new Error('Username already exists');
				err.status = 401;
				return cb(err);
			}
			bcrypt.compare(password, passwordConfirm, function(err, result){
				if(result === true){
					return cb(null, user);
				} else{
					return cb();
				}
			})
		});



	res.send("NEW USER DATA: " + req.body.username);
};

