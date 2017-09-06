var server = require('express')();
var config = require('./config');
var mongoose = require('mongoose');
var apiRouter = require('./router');

apiRouter(server);

mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName);

server.listen(config.port);