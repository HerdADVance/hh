var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	username: { 
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		require: true
	},
	passwordConfirm: {
		type: String,
		require: true
	},
	displayName: {
		type: String,
		require: true
	}
});

// Authenticate password input against database
// UserSchema.statics.authenticate = function(email, password, cb){
// 	User.findOne({ email: email })
// 		.exec(function(err, user){
// 			if(err){
// 				return cb(err);
// 			} else if (!user){
// 				var err = new Error('User not found.');
// 				err.status = 401;
// 				return cb(err);
// 			}
// 			bcrypt.compare(password, user.password, function(err, result){
// 				if(result === true){
// 					return cb(null, user);
// 				} else{
// 					return cb();
// 				}
// 			})
// 		});
// }

// // Password hashing
// UserSchema.pre('save', function(next){
// 	var user = this;
// 	bcrypt.hash(user.password, 10, function(err, hash){
// 		if(err){
// 			return next(err);
// 		}
// 		user.password = hash;
// 		next();
// 	})
// });

module.exports = mongoose.model('User', UserSchema);