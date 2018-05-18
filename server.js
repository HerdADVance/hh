// const io = require('socket.io')();

// io.on('connection', (client) => {
// 	client.on('subscribeToTimer', (interval) => {
//     	console.log('client is subscribing to timer with interval ', interval);
//     	setInterval(() => {
//     		client.emit('timer', new Date());
//     	}, interval);
//   	});
// });

// const port = 3001;
// io.listen(port);
// console.log("listening on port " + port);


const express = require("express");
const http = require("http");
const mongoose = require('mongoose');
const User = require('./src/models/User');
const socketIo = require("socket.io");
const cors = require('cors');
var router = express.Router();

//var mongojs = require('mongojs');
//const async = require("async");

const axios = require('axios');

const port = process.env.PORT || 5000;
const index = require('./src/routes/index');

const app = express();
app.use(cors());
app.use(index);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.set('views', './src/views')
app.set('view engine', 'pug');

const server = http.createServer(app);

const io = socketIo(server);


// io.on("connection", socket => {
// 	console.log("New client connected");
// 	if(interval){
// 		clearInterval(interval);
// 	}
// 	interval = setInterval(() => getApiAndEmit(socket), 5000);
// 	socket.on("disconnect", () => {
// 		console.log ("Client disconnected");
// 	});
// });

// const getApiAndEmit = async socket => {
//   try {
//     const res = await axios.get(
//       "https://api.darksky.net/forecast/2c01f77672a17b368a2e056bfcdb2690/38.4095,-82.2946"
//     );
//     socket.emit("FromAPI", res.data.currently.temperature);
//   } catch (error) {
//     console.error(`Error: ${error.code}`);
//   }
// };

//var db = mongojs('mongodb://localhost:27017/hh', ['users3']);
server.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

var mongoDB = 'mongodb://hhuser:dk7asAhey2hWH@ds123499.mlab.com:23499/hh'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var newUser = new User({ username: 'herdadvance@gmail.com', password: 'b', passwordConfirm: 'b', displayName: 'BallSoHerd' }).save();
var newerUser = new User({ username: 'avance@bulldogcreative.com', password: 'e', passwordConfirm: 'e', displayName: 'Bulldoggy Dawg' }).save();



