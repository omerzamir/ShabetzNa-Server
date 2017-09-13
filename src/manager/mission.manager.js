var objectId = require('mongoose').Types.ObjectId;
var Mission = require('../models/mission.model');
var MissionValidation = require('./validations/mission.validator');

function create(type, startDate, endDate, status, participents){
    if(MissionValidation.dateRangeValidity(startDate, endDate)){
        
        var newMission = new Mission({
            type: MissionValidation.typeValidity(type),
            startDate: MissionValidation.dateValidity(startDate),
            endDate: MissionValidation.dateValidity(endDate),
            status: MissionValidation.statusValidity(status),
            participents: MissionValidation.participentsValidity(participents)
        });

        return newMission.save();
    }
    return null;
}

function getAll(){
    return Mission.find({});
}

function getByDateRange(fromDate, toDate) {
    //If the input is valid => Search
    if(MissionValidation.dateValidity(fromDate) && 
        MissionValidation.dateValidity(toDate)&&
        MissionValidation.dateRangeValidity(startDate, endDate)) {
        
        return Mission.find({startDate: {'$gte': fromDate, '$lte': toDate}});
    }

    return null;
}

function getFromDate(fromDate) {
    //If the input is valid => Search
    if(MissionValidation.dateValidity(fromDate)) {
        return Mission.find({startDate: {'$gte': fromDate}});
    }
    return null;
}

function getByUser(user) {
    return Mission.find({
        participents: {
            $elemMatch: {'$eq': user}
        }
    });
}

function getByUserDateRange(user, fromDate, toDate) {
    return Mission.find({
        participents: {
            $elemMatch: {'$eq': user}
        },
        startDate: {'$gte': fromDate, '$lte': toDate}
    });
}

function getByUserFromDate(user, fromDate) {
    if(MissionValidation.dateValidity(fromDate)){
        return Mission.find({
            participents: {
                $elemMatch: {'$eq': user}
            },
            startDate: {'$gte': fromDate}
        });
    }
}

function updateDates(id, startDate, endDate) {
    if(MissionValidation.dateValidity(startDate) &&
        MissionValidation.dateValidity(endDate) &&
        MissionValidation.dateRangeValidity(startDate, endDate)){
        
        // Find the wanted mission.
        var mission = Mission.findById(id);

        // If something has changed update it, else put the previous data.
        mission.startDate = startDate ? startDate : mission.startDate;
        mission.endDate = endDate ? endDate : mission.endDate;
        
        // Save it & return.
        return mission.save();
    }
    return null;
}

function changeStatus(id, status){
    var mission = Mission.findById(id);

    mission.status = MissionValidation.statusValidity(status)

    return mission.save();    
}

function addParticipent(id, participent) {
    var mission = Mission.findById(id);

    mission.participent.push(MissionValidation.typeValidity(participent));

    return mission.save();
}

function Delete(id) {
    var id = objectId.isValid(id) ? objectId(id) : null;
    
    return Mission.remove({_id:id});
}

module.exports = {
    create,
    getAll,
    getByDateRange,
    getFromDate,
    getByUser,
    getByUserDateRange,
    getByUserFromDate,
    Delete,
    updateDates,
    changeStatus,
    addParticipent
};