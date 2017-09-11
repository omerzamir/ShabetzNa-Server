var objectId = require('mongoose').Types.ObjectId;
var missionType = require('../models/missiontype.model');
var validator = require('./validations/missionType.validator');

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

function getById(id) {
    var id = objectId.isValid(id) ? objectId(id) : null;

    return missionType.findById(id);
}

function update(id, name, description, type) {

    // Find the wanted missionType.
    var missionType = getById(id);

    // If something has changed update it, else put the previous data.
    missionType.name = name ? name : missionType.name;
    missionType.description = description ? description : missionType.description;
    missionType.type = type ? type : missionType.type;

    // Save it & return.
    return missionType.save();
}

function Delete(id){
    var id = objectId.isValid(id) ? objectId(id) : null;
    
    return missionType.remove({_id:id});
}

module.exports = {
    create,
    getAll,
    getByType,
    getById,
    update,
    Delete
};