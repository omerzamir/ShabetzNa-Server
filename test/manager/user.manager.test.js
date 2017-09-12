const mongoose = require('mongoose');
const userManager = require('../../src/manager/user.manager');
const except = require('chai').expect;
const config = require('../../src/config');

var collectionName = 'users';

// Global user mock
var globalUser = {
    username: "OmerZamir",
    name: "Omer Zamir / תכניתן",
    userspermissions: ["59b657e6ea1e962270ee9017","59b65841ea1e962270ee9018"],
    specialpermissions: [0,1],
    exemptions: [{
        exempt:"59b66e82c9e80b12b17182be",
        description: "some test description"
    }]
};

describe('user Manager', () => {
    before(async function(){
        await mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName, {useMongoClient: true });
        await mongoose.connection.db.dropDatabase(config.dbName);
    });

    describe('Create a User', () => {
        it('should be exported', () => {
            except(userManager.create).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = userManager.create(
                globalUser.username,
                globalUser.name, 
                globalUser.userspermissions, 
                globalUser.specialpermissions, 
                globalUser.exemptions
            );
            except(promise.then).to.be.a('function');
        });

        it('should return a user with the inserted values', async () => {
            let user = await userManager.create(
                globalUser.username,
                globalUser.name, 
                globalUser.userspermissions, 
                globalUser.specialpermissions, 
                globalUser.exemptions
            );

            except(user.username).to.be.equal(globalUser.username);
            except(user.name).to.be.equal(globalUser.name);
            except(user.userspermissions.map((id)=>id.toString())).to.be.eql(globalUser.userspermissions);
            except(user.specialpermissions).to.deep.equal(globalUser.specialpermissions);
            let exemtions = user.exemptions.map( (e) => {
                return {
                    exempt: e.exempt.toString(),
                    description: e.description
                }
            });
            except(exemtions).to.deep.equal(globalUser.exemptions);            
        });

        
    });
});