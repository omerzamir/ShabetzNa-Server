var objectId = require('mongoose').Types.ObjectId;
var Mission = require('../models/mission.model');
var MissionValidation = require('./validations/mission.validator');

function create(type, startDate, endDate, status, participents){
    try{
        if(MissionValidation.dateRangeValidity(startDate, endDate)){
            
            MissionValidation.typeValidity(type);
            MissionValidation.dateValidity(startDate);
            MissionValidation.dateValidity(endDate);
            MissionValidation.statusValidity(status);
            MissionValidation.participentsValidity(participents);

            var newMission = new Mission({
                type: type,
                startDate: startDate,
                endDate: endDate,
                status: status,
                participents: participents
            });
    
            return newMission.save();
        }
        else{
            return Promise.resolve(null);
        }
    }
    catch(ex){
        return Promise.reject(ex);
    }
}

function getAll(){
    return Mission.find({});
}

async function getByDateRange(fromDate, toDate) {
    try{
        MissionValidation.dateValidity(fromDate);
        MissionValidation.dateValidity(toDate);

        //If the input is valid => Search
        if(MissionValidation.dateRangeValidity(fromDate, toDate)) {
            return Mission.find({startDate: {'$gte': fromDate, '$lte': toDate}});
        }
        return Promise.resolve(null);
    }
    catch(ex) {
        return Promise.reject(ex);
    }
}

function getFromDate(fromDate) {
    try{
        //If the input is valid => Search
        MissionValidation.dateValidity(fromDate)
        return Mission.find({startDate: {'$gte': fromDate}});        
    }
    catch(ex) {
        return Promise.reject(ex);        
    }
}

function getByUser(user) {
    return Mission.find({
        participents: {'$in': [user]}
    });
}

function getByUserDateRange(user, fromDate, toDate) {
    return Mission.find({
        participents: { '$in': [user] },
        startDate: { '$gte': fromDate, '$lte': toDate }
    });
}

function getByUserFromDate(user, fromDate) {
    try{
        //If the input is valid => Search
        MissionValidation.dateValidity(fromDate)
        return Mission.find({
            participents: { '$in': [user] },
            startDate: {'$gte': fromDate}
        });    }
    catch(ex) {
        return Promise.reject(ex);        
    }
}

async function updateDates(id, startDate, endDate) {
    try{
        MissionValidation.dateValidity(startDate);
        MissionValidation.dateValidity(endDate);
    
        if(MissionValidation.dateRangeValidity(startDate, endDate)){
            // Find the wanted mission.
            var mission = await Mission.findById(id);
    
            // If something has changed update it, else put the previous data.
            mission.startDate = startDate ? startDate : mission.startDate;
            mission.endDate = endDate ? endDate : mission.endDate;
            
            // Save it & return.
            return await mission.save();
        }
        return Promise.resolve(null);
    }
    catch(ex){
        return Promise.reject(ex);        
    }
}

function changeStatus(id, status){
    var mission = Mission.findById(id);

    mission.status = MissionValidation.statusValidity(status);

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