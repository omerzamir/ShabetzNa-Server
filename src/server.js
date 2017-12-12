var server = require('express')();
var static = require('express').static;
var config = require('./config');
var mongoose = require('mongoose');
var apiRouter = require('./router');
var bodyParser = require('body-parser');
var cors = require('cors');

server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', static(__dirname + '/public'));
apiRouter(server);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName, {useMongoClient: true});

server.listen(config.port, "0.0.0.0",function() {
    console.log(`Server running on port ${config.port}`)
});
