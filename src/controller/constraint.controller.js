var constraintManager = require('../manager/constraint.manager');
var userController = require('./user.controller');

function createConstraint(user, date) {
    var userId = userController.getUserByUsername(user)._id;

    return constraintManager.create(userId, date);
}

function getAllConstraints() {
    return constraintManager.getAll();
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

function getUserConstraintsByDateRange(user, fromDate, toDate) {
    var userId = userController.getUserByUsername(user)._id;

    return constraintManager.getByUserDateRange(fromDate, toDate, userId);
}

function getUserConstraintsFromDate(user, fromDate) {
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
    getAllConstraints,
    getUserConstraints,
    getConstraintsByDateRange,
    getConstraintsFromDate,
    getUserConstraintsByDateRange,
    getUserConstraintsFromDate,
    getConstraintById,
    DeleteConstraint
};