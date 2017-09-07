var objectId = require('mongoose').Types.ObjectId;
var Constraint = require('../models/constraint.model');
var ConstraintValidation = require('validations/constraint.validator');

function create(user, startDate, endDate) {
    if(ConstraintValidation.dateRangeValidity(startDate, endDate)) {
        
        newConstraint = new Constraint({
            user: ConstraintValidation.userValidity(user),
            startDate: ConstraintValidation.dateValidity(startDate),
            endDate: ConstraintValidation.dateValidity(endDate)
        });

        return newConstraint.save();
    }
    return null;
}

function getByUser(user) {
    return ConstraintValidation.userValidity(user) ? Constraint.findOne({user:user}): null;
}

module.exports = {
    create,
    getByUser
};