//const User = require('../models/user')
const mongoose = require('mongoose');
const Game = require('../models/game')
const Player = require('../models/player')
const bcrypt = require('bcrypt')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.game_join = function(req, res, next){

	//const userId = req.body.userId
	const userId = '5b5001dbd68f1b70faaaa120'

	Game.findOne().sort({created_at: -1}).exec(function(err, foundGame) {

		if(foundGame && foundGame.status == 'launching'){

			const foundId = foundGame._id

			// Prevent user from joining same game

			const player = new Player()
			player.user = userId
			player.game = foundId

			foundGame.players.push(player)
			const newPlayers = foundGame.players
			const newStatus = 'launching'

			Game.update({ _id: foundId}, {players: newPlayers, status: newStatus}, () => {
				
				// Deal Cards

				// Update View to launch game

				return res.status(200).json({
					message: "2nd player added to Game!"
				})
			});

		} else{

			const game = new Game()

			const player = new Player()
			player.user = userId
			player.game = game._id

			player.save((err, newPlayer) => {
				if(err){
					return res.status(400).json({
						error: "ERROR"
					})
				}

				game.players = [newPlayer]
				game.status = 'waiting'

				game.save((err, newGame) => {
					if(err){
						console.log(err)
						return res.status(400).json({
							error: "ERROR"
						})
					}

					// Update view for waiting user

					return res.status(200).json({
						message: "New game!"
					})
				})
			})
		}
	});

}



