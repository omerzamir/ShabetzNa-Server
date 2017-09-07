var objectId = require('mongoose').Types.ObjectId;

function typeValidity(type) {
    return objectId.isValid(type) ? type : null;
}

function dateRangeValidity(startDate, endDate) {
    return (startDate <= endDate);
}

function dateValidity(date) {
    return !isNaN(Date.parse(date)) ? date: new Date();
}

function statusValidity(status) {
    return !isNaN(status) ? status : 0;
}

function participentsValidity(participents) {
    checked = [];

    participents.forEach(function(participent) {
        if(objectId.isValid(participent)) {
            checked.push(participent);
        }
    }, this);

    return checked;
}

module.exports = {
    typeValidity,
    dateRangeValidity,
    dateValidity,
    statusValidity,
    participentsValidity
};