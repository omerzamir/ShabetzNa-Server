const mongoose = require('mongoose');
const constraintManager = require('../../src/manager/constraint.manager');
const userManager = require('../../src/manager/user.manager');
const except = require('chai').expect;
const config = require('../../src/config');

var collectionName = 'constraints';

//Global constraint
var globalConstraint = {
    user:"",
    date: new Date(2017, 1,1)
};

describe('Constraint Manager', () => {
    before(async function() {
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName, {useMongoClient: true });
        await mongoose.connection.db.dropDatabase(config.dbName);

        globalConstraint.user = ((await userManager.create(
            "OmerZamir",
            "Omer",
            "email@email.com",
            "תפקיד/תפקיד",
            ["59b657e6ea1e962270ee9017","59b65841ea1e962270ee9018"],
            [0,1],
            [{
                exempt:"59b66e82c9e80b12b17182be",
                description: "some test description"
            }]
        ))._id);
    });
    
    describe('Create a Constraint', () => {
        it('should be exported', () => {
            except(constraintManager.create).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            );
            except(promise.then).to.be.a('function');
        });

        it('should return a Constraint with the inserted values', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);

            let Constraint = await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            );

            except(globalConstraint.user).to.deep.equal(Constraint.user);
            except(globalConstraint.date).to.be.equal(Constraint.date);
        });
    });

    describe('Get All Constraints', () => {
        it('should be exported', () => {
            except(constraintManager.getAll).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = constraintManager.getAll();
            except(promise.then).to.be.a('function');
        });

        it('should return a constraint with the inserted values', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);

            await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            );

            await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            );

            let constraints = await constraintManager.getAll();

            except(constraints.length).to.equal(2);
            except(constraints[0]).to.have.property("_id");
            except(constraints[1]).to.have.property("_id");
        });
    });

    describe('Get Constraints By User', () => {
        it('should be exported', () => {
            except(constraintManager.getByUser).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = constraintManager.getByUser(globalConstraint.user);
            except(promise.then).to.be.a('function');
        });

        it('should return a constraint with the inserted values', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);

            await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            );

            let constraints = await constraintManager.getByUser(globalConstraint.user);

            except(constraints.length).to.equal(1);
            except(constraints[0]).to.have.property("_id");
            except(constraints[0].user).to.deep.equal(globalConstraint.user);
        });
    });

    describe('Get Constraints By Date Range', () => {
        it('should be exported', () => {
            except(constraintManager.getByDateRange).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = constraintManager.getByDateRange(new Date(2016, 12, 29), new Date(2017, 2, 1));
            except(promise.then).to.be.a('function');
        });

        it('should return ONE constraint ', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);

            await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            );

            let constraints = await constraintManager.getByDateRange(new Date(2016, 12, 29), new Date(2017, 2, 1));

            except(constraints.length).to.equal(1);
            except(constraints[0]).to.have.property("_id");
            except(constraints[0].user).to.deep.equal(globalConstraint.user);
            except(constraints[0].date).to.deep.equal(globalConstraint.date);
        });
    });

    describe('Get Constraints From Date', () => {
        it('should be exported', () => {
            except(constraintManager.getFromDate).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = constraintManager.getFromDate(new Date(2016, 12, 29));
            except(promise.then).to.be.a('function');
        });

        it('should return ONE constraint', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);

            await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            );

            await constraintManager.create(
                globalConstraint.user,
                new Date(2016,12,1)
            );
            
            let constraints = await constraintManager.getFromDate(new Date(2017,1,1));

            except(constraints.length).to.equal(1);
            except(constraints[0]).to.have.property("_id");
            except(constraints[0].user).to.deep.equal(globalConstraint.user);
            except(constraints[0].date).to.deep.equal(globalConstraint.date);
        });
    });

    describe('Get Constraints By Date Range and User', () => {
        it('should be exported', () => {
            except(constraintManager.getByUserDateRange).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = constraintManager.getByUserDateRange(new Date(2016, 12, 29), new Date(2017, 2, 1), globalConstraint.user);
            except(promise.then).to.be.a('function');
        });

        it('should return ONE constraint ', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);

            await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            );

            let constraints = await constraintManager.getByUserDateRange(new Date(2016, 12, 29), new Date(2017, 2, 1), globalConstraint.user);

            except(constraints.length).to.equal(1);
            except(constraints[0]).to.have.property("_id");
            except(constraints[0].user).to.deep.equal(globalConstraint.user);
            except(constraints[0].date).to.deep.equal(globalConstraint.date);
        });
    });

    describe('Get Constraints From Date and User', () => {
        it('should be exported', () => {
            except(constraintManager.getUserFromDate).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = constraintManager.getUserFromDate(new Date(2016, 12, 29), globalConstraint.user);
            except(promise.then).to.be.a('function');
        });

        it('should return ONE constraint', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);

            await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            );

            await constraintManager.create(
                globalConstraint.user,
                new Date(2016,12,1)
            );
            
            let constraints = await constraintManager.getUserFromDate(new Date(2017,1,1), globalConstraint.user);

            except(constraints.length).to.equal(1);
            except(constraints[0]).to.have.property("_id");
            except(constraints[0].user).to.deep.equal(globalConstraint.user);
            except(constraints[0].date).to.deep.equal(globalConstraint.date);
        });
    });

    describe('Get Constraint By Id', () => {
        it('should be exported', () => {
            except(constraintManager.getById).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = constraintManager.getById(globalConstraint.user);
            except(promise.then).to.be.a('function');
        });

        it('should return ONE constraint', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);

            let id = (await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            ))._id;

            await constraintManager.create(
                globalConstraint.user,
                new Date(2016,12,1)
            );
            
            let constraint = await constraintManager.getById(id);

            except(constraint.length).to.equal(1);
            except(constraint[0]).to.have.property("_id");
            except(constraint[0].user).to.deep.equal(globalConstraint.user);
            except(constraint[0].date).to.deep.equal(globalConstraint.date);
        });
    });

    describe('Delete Constraint', () => {
        it('should be exported', () => {
            except(constraintManager.Delete).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = constraintManager.Delete(globalConstraint.user);
            except(promise.then).to.be.a('function');
        });

        it('should return ONE constraint', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);

            let id = (await constraintManager.create(
                globalConstraint.user,
                globalConstraint.date
            ))._id;
            
            let res = await constraintManager.Delete(id);

            except(res.result.ok).to.be.equal(1);
            except(res.result.n).to.be.equal(1);
        });
    });

});