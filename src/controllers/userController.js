var User = require('../models/User');

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

