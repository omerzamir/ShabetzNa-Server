var objectId = require('mongoose').Types.ObjectId;

function userValidity(user) {
    return objectId.isValid(user) ? user : null;
}

function dateValidity(date) {
    return !isNaN(Date.parse(date)) ? date: new Date();
}

module.exports = {
    userValidity,
    dateValidity
};