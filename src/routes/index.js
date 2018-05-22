const express = require("express");
const router = express.Router();

var user_controller = require('../controllers/userController');

router.get('/', (req, res) => {
	//res.send({ response: "I am alive" }).status(200);
})

router.get('/abc', (req, res) => {
	res.send({ response: "I am aliveee" }).status(200);
})

router.get('/users', user_controller.user_list);

router.post('/users/new', user_controller.user_register);

// router.get('/users', function(req, res, next) {
//  	connection.query('SELECT * from users', function (error, results, fields) {
// 		if (error) throw error;
// 		res.send(JSON.stringify(results));
// 	});
// });

module.exports = router;