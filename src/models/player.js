var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var User = require('./user')

var PlayerSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	game: {
		type: Schema.Types.ObjectId,
		ref: 'Game'
	},
	hand: []
});


// PlayerSchema.pre('save', function(next){
// 	var Player = this

//     next()
// });

// UserSchema
// .virtual('url')
// .get(function () {
//   	return '/user/' + this._id;
// });

PlayerSchema.methods = {

	createDeck: () => {
		
	}

}

module.exports = mongoose.model('Player', PlayerSchema);





