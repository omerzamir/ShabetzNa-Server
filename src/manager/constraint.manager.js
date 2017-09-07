var objectId = require('mongoose').Types.ObjectId;
var Constraint = require('../models/constraint.model');
var ConstraintValidation = require('validations/constraint.validator');

function create(user, date) {
    newConstraint = new Constraint({
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

module.exports = {
    create,
    getByUser
};