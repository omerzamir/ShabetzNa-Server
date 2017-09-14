var missionTypeManager = require('../manager/missiontype.manager');

function createMissionType(name, description, type) {
    try {
        return missionTypeManager.create(name, description, type);
    } catch (ex) {
        throw ex;
    }
}

function getAllMissionTypes() {
    try {
        return missionTypeManager.getAll();
    } catch (ex) {
        throw ex;
    }
}

function getMissionTypesByType(type) {
    try {
        return missionTypeManager.getByType(type);
    } catch (ex) {
        throw ex;
    }
}

function getMissionTypeById(id) {
    try {
        return missionTypeManager.getById(id);
    } catch (ex) {
        throw ex;
    }
}

function updateMissionType(id, name, description, type) {
    try {
        return missionTypeManager.update(id, name, description, type);
    } catch (ex) {
        throw ex;
    }
}

function DeleteMissionTypeById(id) {
    try {
        return missionTypeManager.Delete(id);
    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    createMissionType,
    getAllMissionTypes,
    getMissionTypesByType,
    getMissionTypeById,
    updateMissionType,
    DeleteMissionTypeById
}