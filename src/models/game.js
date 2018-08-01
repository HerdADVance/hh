var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Player = require('./player')

var GameSchema = new Schema({
	status:{
		type: String,
		default: 'new'
	},
	deck: [],
	players: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Player', 
		validate: [arrayLimit, '{PATH} exceeds the limit of 2'] 
	}], 
	created: {
		type: Date,
		default: Date.now
	}
});

function arrayLimit(val) {
  return val.length <= 2;
}


GameSchema.pre('save', function(next){
	var game = this

	const deck = [
		{ rank: 2, face: '2', suit: 'C', played: false},
		{ rank: 3, face: '3', suit: 'C', played: false},
		{ rank: 4, face: '4', suit: 'C', played: false},
		{ rank: 5, face: '5', suit: 'C', played: false},
		{ rank: 6, face: '6', suit: 'C', played: false},
		{ rank: 7, face: '7', suit: 'C', played: false},
		{ rank: 8, face: '8', suit: 'C', played: false},
		{ rank: 9, face: '9', suit: 'C', played: false},
		{ rank: 10, face: 'T', suit: 'C', played: false},
		{ rank: 11, face: 'J', suit: 'C', played: false},
		{ rank: 12, face: 'Q', suit: 'C', played: false},
		{ rank: 13, face: 'K', suit: 'C', played: false},
		{ rank: 14, face: 'A', suit: 'C', played: false},
		{ rank: 2, face: '2', suit: 'D', played: false},
		{ rank: 3, face: '3', suit: 'D', played: false},
		{ rank: 4, face: '4', suit: 'D', played: false},
		{ rank: 5, face: '5', suit: 'D', played: false},
		{ rank: 6, face: '6', suit: 'D', played: false},
		{ rank: 7, face: '7', suit: 'D', played: false},
		{ rank: 8, face: '8', suit: 'D', played: false},
		{ rank: 9, face: '9', suit: 'D', played: false},
		{ rank: 10, face: 'T', suit: 'D', played: false},
		{ rank: 11, face: 'J', suit: 'D', played: false},
		{ rank: 12, face: 'Q', suit: 'D', played: false},
		{ rank: 13, face: 'K', suit: 'D', played: false},
		{ rank: 14, face: 'A', suit: 'D', played: false},
		{ rank: 2, face: '2', suit: 'H', played: false},
		{ rank: 3, face: '3', suit: 'H', played: false},
		{ rank: 4, face: '4', suit: 'H', played: false},
		{ rank: 5, face: '5', suit: 'H', played: false},
		{ rank: 6, face: '6', suit: 'H', played: false},
		{ rank: 7, face: '7', suit: 'H', played: false},
		{ rank: 8, face: '8', suit: 'H', played: false},
		{ rank: 9, face: '9', suit: 'H', played: false},
		{ rank: 10, face: 'T', suit: 'H', played: false},
		{ rank: 11, face: 'J', suit: 'H', played: false},
		{ rank: 12, face: 'Q', suit: 'H', played: false},
		{ rank: 13, face: 'K', suit: 'H', played: false},
		{ rank: 14, face: 'A', suit: 'H', played: false},
		{ rank: 2, face: '2', suit: 'S', played: false},
		{ rank: 3, face: '3', suit: 'S', played: false},
		{ rank: 4, face: '4', suit: 'S', played: false},
		{ rank: 5, face: '5', suit: 'S', played: false},
		{ rank: 6, face: '6', suit: 'S', played: false},
		{ rank: 7, face: '7', suit: 'S', played: false},
		{ rank: 8, face: '8', suit: 'S', played: false},
		{ rank: 9, face: '9', suit: 'S', played: false},
		{ rank: 10, face: 'T', suit: 'S', played: false},
		{ rank: 11, face: 'J', suit: 'S', played: false},
		{ rank: 12, face: 'Q', suit: 'S', played: false},
		{ rank: 13, face: 'K', suit: 'S', played: false},
		{ rank: 14, face: 'A', suit: 'S', played: false}
	];

	var currentIndex = deck.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1;
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }

    game.deck = deck

    next()
});

// UserSchema
// .virtual('url')
// .get(function () {
//   	return '/user/' + this._id;
// });

GameSchema.methods = {

	createDeck: () => {
	
	}

}

module.exports = mongoose.model('Game', GameSchema);





