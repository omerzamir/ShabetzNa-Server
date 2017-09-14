var objectId = require('mongoose').Types.ObjectId;
var missionType = require('../models/missiontype.model');
var validator = require('./validations/missionType.validator');

function create(name, description, type) {
    try {
        validator.nameValidator(name);
        validator.descriptionValidator(description);
        validator.typeValidator(type);

        // Creating a Valid missionType object.
        var newMissionType = missionType({
            name: name,
            description: description,
            type: type
        });

        return newMissionType.save();
    }
    catch(ex) {
        return Promise.reject(ex);
    }
}

function getAll() {
    return missionType.find();
}

function getByType(type) {
    return missionType.find({type: type});
}

function getById(id) {
    try{
        if(objectId.isValid(id)) 
            return missionType.findById(id);
        throw TypeError("invalid ID");
    }
    catch(ex){
        return Promise.reject(ex);
    }
}

async function update(id, name, description, type) {

    // Find the wanted missionType.
    var missionType = await getById(id);

    if(missionType){
        // If something has changed update it, else put the previous data.
        missionType.name = name ? name : missionType.name;
        missionType.description = description ? description : missionType.description;
        missionType.type = type ? type : missionType.type;
        
        // Save it & return.
        return missionType.save();
    }
    return Promise.resolve(null);
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