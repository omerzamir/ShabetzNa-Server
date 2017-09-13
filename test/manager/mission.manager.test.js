const mongoose = require('mongoose');
const missionManager = require('../../src/manager/mission.manager');
const userManager = require('../../src/manager/user.manager');
const missionTypeManager = require('../../src/manager/missiontype.manager');
const except = require('chai').expect;
const config = require('../../src/config');

var collectionName = 'missions';

// Global Mission
var globalMission = {
    type:"",
    startDate: new Date(),
    endDate: new Date(new Date()+5550),
    status: 0,
    participents: []
};

describe('Mission Manager', () => {
    before(async function(){
        await mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName, {useMongoClient: true });
        await mongoose.connection.db.dropDatabase(config.dbName);

        globalMission.type = (await missionTypeManager.create("בדיקה","checktest",0))._id;
        globalMission.participents.push((await userManager.create(
            "OmerZamir",
            "Omer",
            ["59b657e6ea1e962270ee9017","59b65841ea1e962270ee9018"],
            [0,1],
            [{
                exempt:"59b66e82c9e80b12b17182be",
                description: "some test description"
            }]
        ))._id);
    });

    describe('Create a mission', () => {
        it('should be exported', () => {
            except(missionManager.create).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );
            except(promise.then).to.be.a('function');
        });

        it('should return a missionType with the inserted values', async () => {
            let missionType = await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );

            except(globalMission.name).to.be.equal(missionType.name);
            except(globalMission.description).to.be.equal(missionType.description);
            except(globalMission.type).to.be.equal(missionType.type);            
        });
    });

    describe('Get All missions', () => {
        it('Should be exported', () => {
            except(missionManager.getAll).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.getAll();
            except(promise.then).to.be.a('function');
        });

        it('Should return Two missions', async () => {

            await mongoose.connection.db.dropCollection(collectionName);
            
            await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );
            await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );


            let missions = await missionManager.getAll();

            except(missions.length).to.equal(2);
            except(missions[0]).to.have.property("_id");
            except(missions[1]).to.have.property("_id");         
        });
    });

    

});