// DEPENDENCIES
var express = require("express");
var http = require("http");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var User = require('./src/models/User');
var socketIo = require("socket.io");
var cors = require('cors');
var axios = require('axios');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var router = express.Router();

// ROUTES
var api= require('./src/routes/index');

// APP
var app = express();

// PORT
var port = process.env.PORT || 5000;

// SERVER
const server = http.createServer(app);



// const io = socketIo(server)
// io.on('connection', socket => {
//     console.log("User connected")

//     socket.on('change color', (color) => {
//         console.log("Color Changed to: " + color)
//         io.sockets.emit('change color', color)
//     })

//     socket.on('disconnect', () => {
//         console.log("User disconnected")
//     })
// })

// SERVER LISTENING
server.listen(port, () => console.log(`Listening on port ${port}`));


// SOCKET IO
// io.path('/socket.io');

// // Defines Express session middleware
// const session = expressSession({
//     secret: 'seeeeecrrrrrettttt',
//     resave: true,
//     saveUninitialized: true
// });

// // Defines Socket.io namespace middleware that uses above middleware to generate session object
// const ioSession = (socket, next) => {
//     const req = socket.request;
//     const res = socket.request.res;
//     session(req, res, (err) => {
//         next(err);
//         req.session.save();
//     });
// }

// // Namespaces
// const dash = io.of('/');
// //const login = io.of('login');
// //const logout = io.of('/logout');

// // Include above session middleware in Express
// app.use(session)

// // Use session middleware in /home namespace. Check every new socket to see if user is logged in. Otherwise forbid.
// dash.use(ioSession);
// dash.use((socket, next) => {
//     const {session} = socket.request;
//     if(session.isLogged){
//         next();
//     }
// });

// // Emit welcome event after successful login
// dash.on('connection', (socket) => {
//     const {username} = socket.request.session;
//     socket.emit('welcome', `Welcome ${username}, you are logged in.`);
// });

// // Listen for connections and attatch socket server
// io.attach(app.listen(7777, () => {
//     console.log('HTTP server and Socket.IO running on port 7777');
// }));




// VARIOUS
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());




// USAGE OF ROUTES
app.use(api);

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
    return next();
});


var mongoDB = 'mongodb://hhuser:dk7asAhey2hWH@ds123499.mlab.com:23499/hh'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



