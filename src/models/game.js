var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
	status:{
		type: String
	},
	deck: [{
		card:{
			type: String
		}
	}],
	hands: [{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		cards: [{
			used: Boolean
		}]
	}],
	created: {
		type: Date,
		default: Date.now
	}
});

// // // Password hashing
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

// UserSchema
// .virtual('url')
// .get(function () {
//   	return '/user/' + this._id;
// });

GameSchema.methods = {
	deal: () => {
	  	var user = this;
		return bcrypt.compare(plainText, user.password)
	}
}

module.exports = mongoose.model('Game', GameSchema);





