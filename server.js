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

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// SET VIEW LOCATION AND ENGINE
app.set('views', './src/views')
app.set('view engine', 'pug');

// SERVER
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

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



