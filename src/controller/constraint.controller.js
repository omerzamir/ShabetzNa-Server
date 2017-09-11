var constraintManager = require('../manager/constraint.manager');
var userController = require('./user.controller');

function createConstraint(user, date) {
    var userId = userController.getUserByUsername(user)._id;

    return constraintManager.create(userId, date);
}

function getUserConstraints(user) {
    var userId = userController.getUserByUsername(user)._id;
    
    return constraintManager.getByUser(userId);
}

function getConstraintsByDateRange(fromDate, toDate) {
    return constraintManager.getByDateRange(fromDate, toDate);
}

function getConstraintsFromDate(fromDate) {
    return constraintManager.getFromDate(fromDate);
}

function getUserConstraintsByDateRange(fromDate, toDate, user) {
    var userId = userController.getUserByUsername(user)._id;

    return constraintManager.getByUserDateRange(fromDate, toDate, userId);
}

function getUserConstraintsFromDate(fromDate, user) {
    var userId = userController.getUserByUsername(user)._id;

    return constraintManager.getUserFromDate(fromDate, userId);
}

function getConstraintById(id) {
    return constraintManager.getById(id);
}

function DeleteConstraint(id) {
    return constraintManager.Delete(id);
}

module.exports = {
    createConstraint,
    getUserConstraints,
    getConstraintsByDateRange,
    getConstraintsFromDate,
    getUserConstraintsByDateRange,
    getUserConstraintsFromDate,
    getConstraintById,
    DeleteConstraint
};