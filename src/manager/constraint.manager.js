var objectId = require('mongoose').Types.ObjectId;
var Constraint = require('../models/constraint.model');
var ConstraintValidation = require('validations/constraint.validator');

function create(user, date) {
    var newConstraint = new Constraint({
        user: ConstraintValidation.userValidity(user),
        date: ConstraintValidation.dateValidity(date)        
    });

    return newConstraint.save();
}

function getByUser(user) {
    return ConstraintValidation.userValidity(user) ? Constraint.find({user:user}): null;
}

function getByDateRange(fromDate, toDate) {
    if(ConstraintValidation.dateValidity(fromDate) && 
       ConstraintValidation.dateValidity(toDate)) {
        return Constraint.find({date: {'$gte': fromDate, '$lt': toDate}});
    }
    return null;
}

function getFromDate(fromDate) {
    if(ConstraintValidation.dateValidity(fromDate)) {
        return Constraint.find({date: {'$gte': fromDate}});
    }
    return null;
}

function getByUserDateRange(fromDate, toDate, user) {
    if(ConstraintValidation.dateValidity(fromDate) && 
       ConstraintValidation.dateValidity(toDate)) {
        return Constraint.find({date: {'$gte': fromDate, '$lt': toDate}, user:user});
    }
    return null;
}

function getUserFromDate(fromDate, user) {
    if(ConstraintValidation.dateValidity(fromDate)) {
        return Constraint.find({date: {'$gte': fromDate}, user:user});
    }
    return null;
}

function getById(id) {
    return Constraint.find({_id: id});
}

function Delete(id) {
    var id = objectId.isValid(id) ? objectId(id) : null;
    
    return Constraint.remove({_id:id});
}

module.exports = {
    create,
    getByUser,
    getByDateRange,
    getFromDate,
    getByUserDateRange,
    getUserFromDate,
    getById,
    Delete
};