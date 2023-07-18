"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compression = require("compression");
var cors = require("cors");
var mongoose = require("mongoose");
var app = express();
app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
var server = http.createServer(app);
server.listen(8080, function () {
    console.log('server running on http://localhost:8080/');
});
var MONGO_URL = 'mongodb+srv://muchirimark2:Lhi6vavKcPy6fmt8@cluster0.phvqsi8.mongodb.net/?retryWrites=true&w=majority';
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', function (error) { return console.error(error); });
