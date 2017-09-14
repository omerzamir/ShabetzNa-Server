var objectId = require('mongoose').Types.ObjectId;
var Constraint = require('../models/constraint.model');
var ConstraintValidation = require('./validations/constraint.validator');

function create(user, date) {
    try{
        ConstraintValidation.userValidity(user);
        ConstraintValidation.dateValidity(date);

        var newConstraint = new Constraint({
            user: user,
            date: date
        });
    
        return newConstraint.save();
    }
    catch(ex){
        return Promise.reject(ex);
    }
}
function getAll() {
    return Constraint.find();
}

function getByUser(user) {
    try{
        ConstraintValidation.userValidity(user);
        return Constraint.find({user:user});
    }
    catch(ex){
        return Promise.reject(ex);        
    }
}

function getByDateRange(fromDate, toDate) {
    try {
        ConstraintValidation.dateValidity(fromDate);
        ConstraintValidation.dateValidity(toDate);
        return Constraint.find({date: {'$gte': fromDate, '$lte': toDate}});
    }
    catch(ex) {
        return Promise.resolve(ex);
    }
}

function getFromDate(fromDate) {
    try {
        ConstraintValidation.dateValidity(fromDate);
        return Constraint.find({date: {'$gte': fromDate}});
    }
    catch(ex){
        return Promise.resolve(ex);
    }
}

function getByUserDateRange(fromDate, toDate, user) {
    if(ConstraintValidation.dateValidity(fromDate) && 
       ConstraintValidation.dateValidity(toDate)) {
        return Constraint.find({date: {'$gte': fromDate, '$lte': toDate}, user:user});
    }
    return Promise.resolve(null);
}

function getUserFromDate(fromDate, user) {
    if(ConstraintValidation.dateValidity(fromDate)) {
        return Constraint.find({date: {'$gte': fromDate}, user:user});
    }
    return Promise.resolve(null);
}

function getById(id) {
    return Constraint.find({_id: id});
}

function Delete(id) {
    var id = objectId.isValid(id) ? objectId(id) : null;
    
    return Constraint.remove({_id:id});
}

// There is no need for update for this model

module.exports = {
    create,
    getAll,
    getByUser,
    getByDateRange,
    getFromDate,
    getByUserDateRange,
    getUserFromDate,
    getById,
    Delete
};