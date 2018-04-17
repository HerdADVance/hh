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
const socketIo = require("socket.io");
const axios = require ("axios");
//const async = require("async");

const port = process.env.PORT || 3001;
const index = require('./src/routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", socket => {
	console.log("New client connected");
	if(interval){
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 15000);
	socket.on("disconnect", () => {
		console.log ("Client disconnected");
	});
});

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://api.darksky.net/forecast/2c01f77672a17b368a2e056bfcdb2690/38.4095,-82.2946"
    );
    socket.emit("FromAPI", res.data.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};


server.listen(port, () => console.log(`Listening on port ${port}`));
