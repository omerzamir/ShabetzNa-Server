var objectId = require('mongoose').Types.ObjectId;
var User = require('../models/user.model');
var UserValidation = require('validations/user.validator');

function create(username, name, userspermissions, specialpermissions, exemptions) {
    if(username && name){

        var newUser = User({
            username: username,
            name: name,
            userspermissions: UserValidation.usersPermissionsVAlidity(userspermissions),
            specialpermissions: UserValidation.specialPermissionsValidity(specialpermissions),
            exemptions: UserValidation.exemptionsValidity(exemptions)
        });

        return newUser.save();
    }

    return null;
}

function getByUserName(username) {
    
    if (username){
        return User.findOne({username:username});        
    }

    return null;
}

function getAll(){
    return User.find();
}

function UpdateUserPermissions(username, userspermissions) {

    return User.update(
        {username: username}, 
        {userspermissions: UserValidation.usersPermissionsVAlidity(userspermissions)}
    );
}

function UpdateSpecialPermissions(username, specialpermissions) {
    
    return User.update(
        {username: username}, 
        {specialpermissions: UserValidation.specialpermissionsVAlidity(specialpermissions)}
    );
}

function UpdateExemptions(username, exemptions) {
    
    return User.update(
        {username: username}, 
        {exemptions: UserValidation.exemptionsValidity(exemptions)}
    );
}

module.exports = {
    create,
    getByUserName,
    getAll,
    UpdateUserPermissions,
    UpdateSpecialPermissions,
    UpdateExemptions
};