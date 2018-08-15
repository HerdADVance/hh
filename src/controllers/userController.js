const Player = require('../models/player')
const Game = require('../models/game')

var User = require('../models/User');
var bcrypt = require('bcrypt');
var axios = require('axios');
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')

exports.user_detail = function(req, res){
	res.send(req.params.id);
};

exports.user_login = function(req, res, next){
	User.findOne({
	    "username": req.body.username
	}, (err, user) => {

	    if (err || !user)
	      return res.status('401').json({
	        error: "User not found"
	      })

	  	const doesMatch = user.authenticate(req.body.password).then(function(e){
	  		if(!e){
		  		return res.status('401').send({
					error: "Email and password don't match."
				})
	  		} else{
  				const token = jwt.sign({
  			      _id: user._id
  			    }, 'nibbler')

  			    res.cookie("t", token, {
  			      expire: new Date() + 9999
  			    })

  			    return res.send({
  			    	token: token,
  					user: {_id: user._id}
  				})
	  		}
	  	}).catch(function(error){
	  		console.log("Promise error: " + error)
	  	})
    })
}

exports.user_list = function(req, res, next){

	User.find()
		.sort([['displayName', 'ascending']])
		.exec(function (err, list_users) {
			if(err) {return next(err);}

			res.send({
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

exports.user_games = function(req, res, next){
	console.log("USER ID: " + req.body.userId)

	const userId = req.body.userId

	Player
		.find({user: userId})
		.populate('game')
		.exec(function (err, players){
			for(var player in players){
				
			}
		})

	// Player.find({user: userId})
	// 	//.sort([['displayName', 'ascending']])
	// 	.exec(function (err, players) {
	// 		if(err) {return next(err);}

	// 		const foundGameIds = []

	// 		// Find the Game IDs associated with each Player instance
	// 		for(var player of players){
	// 			foundGameIds.push(player.game)
	// 		}

	// 		// Find more info on the Games based on the Game IDs and send them to the Client
	// 		Game.find({
	// 		    '_id': { $in: foundGameIds}
	// 		}, function(err, games){
	// 		     return res.status(200).json({
	// 				user_games: games
	// 			})
	// 		});
	//	});
}



