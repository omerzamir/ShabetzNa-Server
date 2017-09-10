var missionTypeManager = require('../manager/missiontype.manager');

function createMissionType(name, description, type){
    return missionTypeManager.create(name, description, type);
}

function getAllMissionTypes() {
    return missionTypeManager.getAll();
}

function getMissionTypesByType(type) {
    return missionTypeManager.getByType(type);    
}

function getMissionTypeById(id) {
    return missionTypeManager.getById(id);        
}

function updateMissionType(id, name, description, type) {
    return missionTypeManager.update(id, name, description, type);            
}

function DeleteMissionTypeById(id) {
    return missionTypeManager.Delete(id);            
}

module.exports = {
    createMissionType,
    getAllMissionTypes,
    getMissionTypesByType,
    getMissionTypeById,
    updateMissionType,
    DeleteMissionTypeById
}