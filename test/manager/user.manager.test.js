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
var replacedUsersPermissions = ["59b657e6ea1e962270ee9017", "59b65841ea1e962270ee9018", "59b7962636a244187d128e8a"];
var replacedSpecialPermissions = [0,1,2];
var replacedExemptions = [{
    exempt:"59b66e82c9e80b12b17182be",
    description: "some test description replaced"
}];

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

        it('Should return null if there is no username or name', async() => {
            
            // Undefined Case
            let userUndefined = await userManager.create(
                undefined,
                undefined, 
                globalUser.userspermissions, 
                globalUser.specialpermissions, 
                globalUser.exemptions
            );
            except(userUndefined).to.be.null;
            
            // Null Case
            let userNull = await userManager.create(
                null,
                null, 
                globalUser.userspermissions, 
                globalUser.specialpermissions, 
                globalUser.exemptions
            );
            except(userNull).to.be.null;
        });
    });

    describe('Get All Users', () => {
        it('Should be exported', () => {
            except(userManager.getAll).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.getAll();
            except(promise.then).to.be.a('function');
        });

        it('Should return TWO Users that are now inserted', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);
            
            // Create Two Users
            await userManager.create(
                globalUser.username,
                globalUser.name, 
                globalUser.userspermissions, 
                globalUser.specialpermissions, 
                globalUser.exemptions
            );

            await userManager.create(
                globalUser.username + " 2 ",
                globalUser.name + " 2 ",
                globalUser.userspermissions,
                globalUser.specialpermissions,
                globalUser.exemptions
            );

            var users = await userManager.getAll();

            except(users.length).to.equal(2);
            except(users[0]).to.have.property("_id");
            except(users[1]).to.have.property("_id");
        });
    });

    describe('Get User By UserName', () => {
        it('Should be exported', () => {
            except(userManager.getByUserName).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.getByUserName(globalUser.username);
            except(promise.then).to.be.a('function');
        });

        it('Should return the user that is now inserted', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);
            
            // Create Two Users
            await userManager.create(
                globalUser.username,
                globalUser.name, 
                globalUser.userspermissions, 
                globalUser.specialpermissions, 
                globalUser.exemptions
            );

            var user = await userManager.getByUserName(globalUser.username);

            except(user.username).to.deep.equal(globalUser.username);
        });
    });


    describe('Update UserPermission', () => {

        it('Should be exported', () => {
            except(userManager.UpdateUserPermissions).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.UpdateUserPermissions(globalUser.username, replacedUsersPermissions);
            except(promise.then).to.be.a('function');
        });

        it('Should return expected values if updated', async () => {
            
            // Create User
            await userManager.create(
                globalUser.username,
                globalUser.name,
                globalUser.userspermissions,
                globalUser.specialpermissions,
                globalUser.exemptions
            );

            let updated = await userManager.UpdateUserPermissions(globalUser.username, replacedUsersPermissions);
            except(updated.ok).to.be.equal(1);
            except(updated.n).to.be.equal(1);
            except(updated.nModified).to.be.equal(1);
        });
    });


    describe('Update specialPermission', () => {

        it('Should be exported', () => {
            except(userManager.UpdateSpecialPermissions).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.UpdateSpecialPermissions(globalUser.username, replacedSpecialPermissions);
            except(promise.then).to.be.a('function');
        });

        it('Should return expected values if updated', async () => {
            
            // Create User
            await userManager.create(
                globalUser.username,
                globalUser.name,
                globalUser.userspermissions,
                globalUser.specialpermissions,
                globalUser.exemptions
            );

            let updated = await userManager.UpdateSpecialPermissions(globalUser.username, replacedSpecialPermissions);
            except(updated.ok).to.be.equal(1);
            except(updated.n).to.be.equal(1);
            except(updated.nModified).to.be.equal(1);
        });
    });

    describe('Update Exemtions', () => {
        
        it('Should be exported', () => {
            except(userManager.UpdateSpecialPermissions).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.UpdateExemptions(globalUser.username, replacedExemptions);
            except(promise.then).to.be.a('function');
        });

        it('Should return expected values if updated', async () => {
            
            // Create User
            await userManager.create(
                globalUser.username,
                globalUser.name,
                globalUser.userspermissions,
                globalUser.specialpermissions,
                globalUser.exemptions
            );

            let updated = await userManager.UpdateExemptions(globalUser.username, replacedExemptions);
            except(updated.ok).to.be.equal(1);
            except(updated.n).to.be.equal(1);
            except(updated.nModified).to.be.equal(1);
        });
    });

    
});