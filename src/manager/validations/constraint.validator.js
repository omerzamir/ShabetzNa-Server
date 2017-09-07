var objectId = require('mongoose').Types.ObjectId;

function userValidity(user) {
    return objectId.isValid(user) ? user : null;
}

/*function dateRangeValidity(startDate, endDate) {
    return (startDate <= endDate);
}*/

function dateValidity(date) {
    return !isNaN(Date.parse(date)) ? date: new Date();
}

module.exports = {
    userValidity,
    dateValidity
};