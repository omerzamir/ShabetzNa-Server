var objectId = require('mongoose').Types.ObjectId;

function exemptionsValidity(exemptions){

    // Loop through the array and check it's validity.
    checked = [];
    exemptions.forEach(function(exempt) {
        if(objectId.isValid(exempt.exempt)){
            checked.push(exempt);
        }  
    }, this);

    return checked;
}

function specialPermissionsValidity(specialPermissions){
    
    // Loop through the array and check it's validity.
    checked = [];
    exemptions.forEach(function(specialPermission) {
        if(!isNaN(specialPermissions)){
            checked.push(specialPermissions);
        }  
    }, this);

    return checked;
}

function usersPermissionsVAlidity(usersPermissions){

    // Loop through the array and check it's validity.
    checked = [];
    usersPermissions.forEach(function(usersPermission) {
        if(objectId.isValid(usersPermissions)){
            checked.push(usersPermissions);
        }  
    }, this);

    return checked;
}

module.exports = {
    exemptionsValidity,
    specialPermissionsValidity,
    usersPermissionsVAlidity
};