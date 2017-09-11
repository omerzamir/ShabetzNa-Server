var server = require('express')();
var config = require('./config');
var mongoose = require('mongoose');
var apiRouter = require('./router');
var bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

apiRouter(server);

mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName);

server.listen(config.port);