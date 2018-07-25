var User = require('../models/User');
var bcrypt = require('bcrypt');
var axios = require('axios');
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')

exports.user_detail = function(req, res){
	res.send(req.params.id);
};

exports.user_list = function(req, res, next){

	User.find()
		.sort([['displayName', 'ascending']])
		.exec(function (err, list_users) {
			if(err) {return next(err);}
			
			const token = jwt.sign({
		      _id: 'fakeid'
		    }, 'nibbler')

		    res.cookie("t", token, {
		      expire: new Date() + 9999
		    })

			res.send({
				token: token,
				user_list: list_users
			})
		});


};

exports.user_profile = function(req, res, next){

	var userId = req.params.id;

	console.log(userId);

	User.findById(userId)
		.exec(function(err, user){
			if(err){
				return next(err);
			} else if (user){
				return res.send({
					user: {
						username: user.username,
						displayName: user.displayName
					}
				});
			} else{
				var err = new Error('User not found');
				err.status = 401;
				return next(err);
			}
		});
}

exports.user_register = function(req, res, next){

	var username = req.body.username;
	var password = req.body.password;
	var passwordConfirm = req.body.passwordConfirm;
	var displayName = req.body.displayName;

	if(req.body.username && req.body.password && req.body.passwordConfirm && req.body.displayName){
	
		var userData = {
			username: username,
			password: password,
			displayName: displayName
		}

		User.findOne({ username: username })
			.exec(function(err, user){
				if(err){
					return next(err);
				} else if (user){
					var err = new Error('Username already exists');
					err.status = 401;
					return next(err);
				}
				if(password === passwordConfirm){
					User.create(userData, function (err, user) {
					    if (err) {
					     	return next(err);
					    } else {
					    	console.log("User created");
					    	return res.send({
					    		userId: user.id
					    	});
					    }
					});
				} else{
					var err = new Error('Passwords don\'t match');
					err.status = 401;
					return next(err);
				}
			});

	} else{
		var err = new Error('User data missing at least one field');
		err.status = 401;
		return next(err);
	}

};



