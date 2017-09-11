var missionManager = require('../manager/mission.manager');
var userController = require('./user.controller');

function CreateMission(type, startDate, endDate, status, participents) {
    var participentsId = [];

    participents.forEach(function(participent) {
        participentsId.push(userController.getUserByUsername(participent)._id);
    }, this);
    
    return missionManager.create(type, startDate, endDate, status, sendParticipents);
}

function getAllMissions() {
    return missionManager.getAll();
}

function getMissionByDateRange(fromDate, toDate) {
    return missionManager.getByDateRange(fromDate, toDate);
}

function getMissionByFromDate(date) {
    return missionManager.getFromDate(date);
}

function getUserMissions(user) {
    var userId = userController.getUserByUsername(user)._id;

    return missionManager.getByUser(userId);
}

function getUserMissionsByDateRange(user, fromDate, toDate) {
    var userId = userController.getUserByUsername(user)._id;

    return missionManager.getByUserDateRange(userId, fromDate, toDate);
}

function getUserMissionsFromDate(user, fromDate) {
    var userId = userController.getUserByUsername(user)._id;

    return missionManager.getByUserFromDate(userId, fromDate);
}

function ChangeMissionDates(id, startDate, endDate) {
    return missionManager.updateDates(id, startDate, endDate);
}

function ChangeMissionStatus(id, status) {
    return missionManager.changeStatus(id, status);
}

function AddParticipentToMission(id, participent) {
    return missionManager.addParticipent(userController.getUserByUsername(participent)._id);
}

function DeleteMission(mission) {
    return missionManager.Delete(mission);
}

module.exports = {
    CreateMission,
    getAllMissions,
    getMissionByDateRange,
    getMissionByFromDate,
    getUserMissions,
    getUserMissionsByDateRange,
    getUserMissionsFromDate,
    ChangeMissionDates,
    ChangeMissionStatus,
    AddParticipentToMission,
    DeleteMission
}