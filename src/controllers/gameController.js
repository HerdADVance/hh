//const User = require('../models/user')
const mongoose = require('mongoose');
const Game = require('../models/game')
const Player = require('../models/player')
const bcrypt = require('bcrypt')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.game_join = function(req, res, next){

	const userId = req.body.userId

	// TO DO: change User's CanStartGame to true

	Game.findOne().sort({created: -1}).exec(function(err, foundGame) {

		// Most recently created game has status of "waiting" meaning it should have 1 player and is waiting on a 2nd
		if(foundGame && foundGame.status == 'waiting'){

			const foundId = foundGame._id

			// Make sure there only 2 people can be in game
			const numPlayers = foundGame.players.length
			if(numPlayers > 1) return res.status(400).json({error: "Too many players"})

			// Make sure new player isn't same as waiting player
			const waitingPlayer = foundGame.players[0]
			Player.findOne({_id: waitingPlayer}, function(err, foundPlayer) { 
				
				const foundUser = foundPlayer.user
				if(foundUser == userId) return res.status(400).json({error: "Can't join same game"})

				// Create new player instance
				const player = new Player()
				player.user = userId
				player.game = foundId

				// Save player instance
				player.save((err, newPlayer) => {
					if(err){return res.status(400).json({error: "Error saving player"}) }
					
					// Push new player instance into found game
					foundGame.players.push(player)
					const newPlayers = foundGame.players
					const newStatus = 'launching'

					// Update game with 2nd player
					Game.update({ _id: foundId}, {players: newPlayers, status: newStatus}, () => {
						if(err){
							return res.status(400).json({
								error: "Error updating game"
							})
						}
						// Deal Cards

						// Update View to launch game

						return res.status(200).json({
							message: "2nd player added to Game!"
						})
					});
				})
			})

		} else{

			// TO DO: change User's CanStartGame to false

			// Create new game instance
			const game = new Game()

			// Create new player instance
			const player = new Player()
			player.user = userId
			player.game = game._id

			// Save player instance
			player.save((err, newPlayer) => {
				if(err){
					return res.status(400).json({
						error: "Error saving player"
					})
				}

				// Push new player instance into new game instance
				game.players = [newPlayer]
				game.status = 'waiting'

				// Save new game instance
				game.save((err, newGame) => {
					if(err){
						console.log(err)
						return res.status(400).json({
							error: "Error saving game"
						})
					}

					// Update view for waiting user

					return res.status(200).json({
						message: "Your game will start as soon as a 2nd player joins."
					})
				})
			})
		}
	});

}



