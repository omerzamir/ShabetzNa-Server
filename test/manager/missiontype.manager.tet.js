const mongoose = require('mongoose');
const missionTypeManager = require('../../src/manager/missiontype.manager');
const except = require('chai').expect;
const config = require('../../src/config');

var collectionName = 'missiontypes';

// Global MissionType
var globalType = {
    name:"בדיקה",
    description: "check test",
    type: 0
};

describe('Mission Type Manager', () => {
    before(async function(){
        await mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName, {useMongoClient: true });
        await mongoose.connection.db.dropDatabase(config.dbName);
    });

    describe('Create a missionType', () => {
        it('should be exported', () => {
            except(missionTypeManager.create).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = missionTypeManager.create(
                globalType.name,
                globalType.description, 
                globalType.type
            );
            except(promise.then).to.be.a('function');
        });

        it('should return a missionType with the inserted values', async () => {
            let missionType = await missionTypeManager.create(
                globalType.name,
                globalType.description, 
                globalType.type
            );

            except(missionType.name).to.be.equal(globalType.name);
            except(missionType.description).to.be.equal(globalType.description);
            except(missionType.type).to.be.equal(globalType.type);            
        });
    });

    describe('Get all missionType', () => {
        it('should be exported', () => {
            except(missionTypeManager.getAll).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = missionTypeManager.getAll(
                globalType.name,
                globalType.description, 
                globalType.type
            );
            except(promise.then).to.be.a('function');
        });

        it('should return Two missionTypes', async () => {
            
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);
            
            await missionTypeManager.create(
                globalType.name,
                globalType.description, 
                globalType.type
            );

            await missionTypeManager.create(
                globalType.name + " Omer",
                globalType.description + " Omer", 
                1
            );
            
            let missionTypes = await missionTypeManager.getAll();

            except(missionTypes.length).to.equal(2);
            except(missionTypes[0]).to.have.property("_id");
            except(missionTypes[1]).to.have.property("_id");
        });
    });

    describe('Get missionType by type', () => {
        it('should be exported', () => {
            except(missionTypeManager.getByType).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = missionTypeManager.getByType(0);
            except(promise.then).to.be.a('function');
        });

        it('should return One missionType of type 0', async () => {            
            let missionType = await missionTypeManager.getByType(0);
            except(missionType.length).to.equal(1);
            except(missionType[0].type).to.be.equal(0);
        });
    });

    describe('Get missionType by ID', () => {      
        it('should be exported', () => {
            except(missionTypeManager.getById).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = missionTypeManager.getById("");
            except(promise.then).to.be.a('function');
        });

        it('should return the missionType created before ', async () => { 
            await mongoose.connection.db.dropCollection(collectionName);
            
            var expectedMissionType = await missionTypeManager.create(
                globalType.name,
                globalType.description, 
                globalType.type
            );

            let missionType = await missionTypeManager.getById(expectedMissionType._id);            
            
            except(missionType.type).to.be.equal(expectedMissionType.type);
            except(missionType.name).to.be.equal(expectedMissionType.name);
            except(missionType.description).to.be.equal(expectedMissionType.description);
        });
    });

    describe('Update missionType by ID', () => {      
        it('should be exported', () => {
            except(missionTypeManager.update).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = missionTypeManager.update("", "", "", 0);
            except(promise.then).to.be.a('function');
        });

        it('should return the missionType created before ', async () => { 
            await mongoose.connection.db.dropCollection(collectionName);
            
            var expectedMissionType = await missionTypeManager.create(
                globalType.name,
                globalType.description, 
                globalType.type
            );

            let missionType = await missionTypeManager.update(
                expectedMissionType._id,
                "Omer", 
                expectedMissionType.description, 
                1
            );            
            
            except(missionType._id).to.be.eql(expectedMissionType._id);
            except(missionType.name).to.be.equal("Omer");
            except(missionType.description).to.be.equal(expectedMissionType.description);
            except(missionType.type).to.be.equal(1);
        });
    });

    describe('Delete missionType by ID', () => {      
        it('should be exported', () => {
            except(missionTypeManager.Delete).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = missionTypeManager.Delete("");
            except(promise.then).to.be.a('function');
        });

        it('should return the missionType created before ', async () => { 
            await mongoose.connection.db.dropCollection(collectionName);
            
            var expectedMissionType = await missionTypeManager.create(
                globalType.name,
                globalType.description, 
                globalType.type
            );

            let res = await missionTypeManager.Delete(expectedMissionType._id);   

            except(res.result.ok).to.be.equal(1);
            except(res.result.n).to.be.equal(1);
        });
    });
});