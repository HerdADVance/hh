//const User = require('../models/user')
const Game = require('../models/game')
const Player = require('../models/player')
const bcrypt = require('bcrypt')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.game_join = function(req, res, next){

	const userId = req.body.userId

	const mostRecent = Game.findOne().sort({created_at: -1}).exec(function(err, found) {

		if(res._status == 'waiting'){
			
			// join game

		} else{
			const game = new Game()

			game.save((err, newGame) => {
				if(err){
					return res.status(400).json({
						error: "ERROR"
					})
				}

				const deck = newGame.deck

				const player = new Player()
				player.game = newGame._id

				for(let i=0; i<10; i++){
					player.hand.push(deck[i])
				}

				player.save((err, newPlayer) => {
					if(err){
						return res.status(400).json({
							error: "ERROR"
						})
					}
					console.log(newPlayer)
					return res.status(200).json({
						message: "New game!"
					})
				})

			})
		}
	});

}



