var config = {};

config.deployment =  process.env.NODE_ENV || 'dev';

config.dev = {
    port: process.env.SERVER_PORT || 3001,
    dbName: 'sbnDB_dev',
    dbHost: 'localhost'
};

config.prod = {
    port: process.env.SERVER_PORT || 80,
    dbName: 'sbnDB',
    dbHost: 'localhost'
};

config.test = {
    port: process.env.SERVER_PORT || 80,
    dbName: 'sbnDB_test',
    dbHost: 'localhost'
};

module.exports = config[config.deployment];