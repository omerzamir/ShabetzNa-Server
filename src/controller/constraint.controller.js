var constraintManager = require('../manager/constraint.manager');
var userController = require('./user.controller');

async function createConstraint(user, date) {
    try {
        var userId = await userController.getUserByUsername(user)._id;

        return constraintManager.create(userId, date);
    } catch (ex) {
        throw ex;
    }
}

function getAllConstraints() {
    try {
        return constraintManager.getAll();
    } catch (ex) {
        throw ex;
    }
}

async function getUserConstraints(user) {
    try {
        var userId = await userController.getUserByUsername(user)._id;

        return constraintManager.getByUser(userId);
    } catch (ex) {
        throw ex;
    }
}

function getConstraintsByDateRange(fromDate, toDate) {
    try {
        return constraintManager.getByDateRange(fromDate, toDate);
    } catch (ex) {
        throw ex;
    }
}

function getConstraintsFromDate(fromDate) {
    try {
        return constraintManager.getFromDate(fromDate);
    } catch (ex) {
        throw ex;
    }
}

async function getUserConstraintsByDateRange(user, fromDate, toDate) {
    try {
        var userId = await userController.getUserByUsername(user)._id;

        return constraintManager.getByUserDateRange(fromDate, toDate, userId);
    } catch (ex) {
        throw ex;
    }

}

async function getUserConstraintsFromDate(user, fromDate) {
    try {
        var userId = await userController.getUserByUsername(user)._id;

        return constraintManager.getUserFromDate(fromDate, userId);
    } catch (ex) {
        throw ex;
    }
}

function getConstraintById(id) {
    try {
        return constraintManager.getById(id);
    } catch (ex) {
        throw ex;
    }
}

function DeleteConstraint(id) {
    try {
        return constraintManager.Delete(id);
    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    createConstraint,
    getAllConstraints,
    getUserConstraints,
    getConstraintsByDateRange,
    getConstraintsFromDate,
    getUserConstraintsByDateRange,
    getUserConstraintsFromDate,
    getConstraintById,
    DeleteConstraint
};