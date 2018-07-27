const express = require("express");
const router = express.Router();

var user_controller = require('../controllers/userController');
var game_controller = require('../controllers/gameController');

router.get('/', (req, res) => {
	//res.send({ response: "I am alive" }).status(200);
})

router.get('/abc', (req, res) => {
	res.send({ response: "I am aliveee" }).status(200);
})

router.get('/api/users', user_controller.user_list);

router.get('/api/user/:id', user_controller.user_profile);

router.post('/api/user/login', user_controller.user_login);

router.post('/api/users/new', user_controller.user_register);

router.post('/api/game/join', game_controller.game_join);

// router.get('/users', function(req, res, next) {
//  	connection.query('SELECT * from users', function (error, results, fields) {
// 		if (error) throw error;
// 		res.send(JSON.stringify(results));
// 	});
// });

module.exports = router;