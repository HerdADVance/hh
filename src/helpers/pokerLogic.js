var Hand = require('pokersolver').Hand

const pokerLogic = {

	compare: function(board, hands){
		var hand1 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Kc', 'Kd'])
		var hand2 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd'])
		var winner = Hand.winners([hand1, hand2])
	}

}

module.exports = pokerLogic
