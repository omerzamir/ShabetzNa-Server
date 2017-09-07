var missionType = require('../models/missiontype.model');
var validator = require('validations/missionType.validator');

function create(name, description, type) {
    
    // Creating a Valid missionType object.
    var newMissionType = missionType({
        name: validator.nameValidator(name),
        description: validator.descriptionValidator(description),
        type: validator.typeValidator(type)
    });

    return newMissionType.save();
}

function getAll() {
    return missionType.find();
}

function getByType(type) {
    return missionType.find({type: type});
}

module.exports = {
    create,
    getAll,
    getByType
};