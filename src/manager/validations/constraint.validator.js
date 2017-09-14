var objectId = require('mongoose').Types.ObjectId;

function userValidity(user) {
    if(objectId.isValid(user)) {
        return true;
    } else {
        throw TypeError("user is not valid");
    }
}

function dateValidity(date) {
    if(isNaN(Date.parse(date))) {
        throw TypeError("Date is not valid");
    } else {
        return true;
    }
}

module.exports = {
    userValidity,
    dateValidity
};