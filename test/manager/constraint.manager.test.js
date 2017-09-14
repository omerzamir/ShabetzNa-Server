const mongoose = require('mongoose');
const constraintManager = require('../../src/manager/constraint.manager');
const userManager = require('../../src/manager/user.manager');
const except = require('chai').expect;
const config = require('../../src/config');

var collectionName = 'constraints';

describe('Mission Manager', () => {
    before(async function() {
        await mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName, {useMongoClient: true });
        await mongoose.connection.db.dropDatabase(config.dbName);
    });

    
});