var Hand = require('pokersolver').Hand

const pokerLogic = {

	compare: function(board, hands){

		boardCards = []
		for(var i=0; i<5; i++){
			boardCards.push(board[i].face + board[i].suit)
		}
		

		var hand1 = Hand.solve(['AD', 'AS', 'JC', 'Th', '2d', 'Kc', 'Kd'])
		hand1.user = "H1"
		var hand2 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Ks', 'Kh'])
		hand2.user = "H2"
		var winner = Hand.winners([hand1, hand2])
		console.log(winner)
	}

}

module.exports = pokerLogic
