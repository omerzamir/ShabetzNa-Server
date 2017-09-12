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
    specialPermissions.forEach(function(permission) {   
        checked.push(Number(permission));    
    }, this);

    return checked;
}

function usersPermissionsValidity(usersPermissions){
    // Loop through the array and check it's validity.
    checked = [];
    usersPermissions.forEach(function(userPermission) {
        if(objectId.isValid(userPermission)){
            checked.push(userPermission);
        }  
    }, this);

    return checked;
}

module.exports = {
    exemptionsValidity,
    specialPermissionsValidity,
    usersPermissionsValidity
};