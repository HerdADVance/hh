const User = require('../models/User')
const Game = require('../models/Game')
const bcrypt = require('bcrypt')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.game_join = function(req, res, next){

	console.log(req.body.userId)

	const game = new Game()
	game.save((err, result) => {
		if(err){
			return res.status(400).json({
				error: "ERROR"
			})
		}
		return res.status(200).json({
			message: "New game!"
		})
	})

}



