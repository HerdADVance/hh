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
	displayName: {
		type: String,
		require: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	canCreateGame: {
		type: Boolean,
		default: true
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
UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash){
		if(err){
			return next(err);
		}
		user.password = hash;
		next();
	})
});

// UserSchema
// .virtual('url')
// .get(function () {
//   	return '/user/' + this._id;
// });

UserSchema.methods = {
	authenticate: async function(plainText) {
  		var user = this;

		return bcrypt.compare(plainText, user.password)

	}
}

module.exports = mongoose.model('User', UserSchema);





