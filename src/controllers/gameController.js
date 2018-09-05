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
			const waitingPlayer = foundGame.players[0].user
			if(waitingPlayer == userId) return res.status(400).json({error: "Can't join same game"})

			// Create new player instance
			const player = {}
			player.user = userId
					
			// Push new player instance into found game
			foundGame.players.push(player)

			// Deal Cards to players
			const deck = foundGame.deck
			for(var i=0; i<20; i++){
				if(i%2 == 0)
					foundGame.players[0].hand.push(deck[0])
				else
					foundGame.players[1].hand.push(deck[0])
				deck.shift()
			}

			// Deal 1st Board
			const board = []
			for(var i=0; i<5; i++){
				if(i == 0 | i == 3 | i == 4){
					deck.push(deck.shift())
				}
				board.push(deck[0])
				deck.shift()
			}
			foundGame.boards.push(board)

			// Game elements to update
			const newPlayers = foundGame.players
			const newDeck = deck
			const newBoards = foundGame.boards
			const newStatus = 'launching'

			// Update game with 2nd player
			Game.update({ _id: foundId}, {players: newPlayers, deck: newDeck, boards: newBoards, status: newStatus}, () => {
				if(err){
					return res.status(400).json({
						error: "Error updating game"
					})
				}

				// Update View to launch game

				return res.status(200).json({
					modalMessage: "Your game is ready to start!",
					buttonMessage: "Go to game",
					newGameId: foundId
				})
			});

		} else{

			// TO DO: change User's CanStartGame to false

			// Create new game instance
			const game = new Game()

			// Create new player instance
			const player = {}
			player.user = userId

			// Push player into game and change status of game
			game.players = [player]
			game.status = 'waiting'

			// Save game instance
			game.save((err, newPlayer) => {
				if(err){
					return res.status(400).json({
						error: "Error saving game"
					})
				}

				return res.status(200).json({
					modalMessage: "Your game will start as soon as a 2nd player joins.",
					buttonMessage: "Got It"
				})
			})
		}
	});

}

exports.game_info = function(req, res, next){

	var gameId = req.params.id;
	var userId = req.body.userId

	// There should probably be a check here to make sure the userId wasn't spoofed

	Game.findOne({_id: gameId})
		.populate('players.user', 'displayName')
		.exec(function(err, foundGame) {
		if(err){
			return res.status(400).json({
				error: "Game not found"
			})
		}

		// Return empty cards unless belongs to user
		for(var i=0; i<foundGame.players.length; i++){
			var handLength = foundGame.players[i].hand.length
			if(userId != foundGame.players[i].user._id){
				foundGame.players[i].hand = []
				for(var j=0; j<handLength; j++){
					foundGame.players[i].hand.push({})
				}
			}
		}

		console.log(foundGame.players)

		return res.status(200).json({
			status: foundGame.status,
			boards: foundGame.boards,
			players: foundGame.players
		})
	})

}

exports.hand_submit = function(req, res, next){
	const gameId = req.params.id
	const userId = req.body.userId
	const playedHand = req.body.hand

	let foundHand = false
	let opponentHasPlayed = false

	Game.findOne({_id: gameId})
		.exec(function(err, foundGame){
		if(err){
			return res.status(400).json({
				error: "Game not found"
			})
		}

		// Need to make sure user's toPlay is empty

		// Make sure user exists in game and find if opponent has played while we're here
		for(var i=0; i<2; i++){			
			if(foundGame.players[i].user == userId){
				foundHand = foundGame.players[i].hand
			} else{
				if (foundGame.players[i].toPlay){
					opponentHasPlayed = true
				}
			}
		}

		// Throw error if user not found
		if(!foundHand){
			return res.status(400).json({
				error: "User not in game"
			})
		}

		// Make sure player's deck has cards in submitted hand
		for(var i=0; i<2; i++){
			let wasFound = false
			for(var j=0; j<foundHand.length; j++){
				if(JSON.stringify(playedHand[i]) === JSON.stringify(foundHand[j]) ){
					wasFound = true
					foundHand.splice(j,1)
					break
				}
			}
			if(!wasFound){
				return res.status(400).json({
					statusMessage: "Cards played don't match user's hand"
				})
			}
		}

		// Opponent hasn't played so let's save user's hand in game as toPlay
		if(!opponentHasPlayed){
			const newToPlay = foundHand
			Game.update({ _id: gameId}, {players: newPlayers}, () => {
				//
			});
		}

		return res.status(200).json({
			message: "Cards found",
			handAfter: foundHand
		})
	})

}

