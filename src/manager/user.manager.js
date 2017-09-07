var objectId = require('mongoose').Types.ObjectId;
var User = require('../models/user.model');
var UserValidation = require('validations/user.validator');

function create(username, name, userspermissions, specialpermissions, exemptions){
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

function getByUserName(username){
    
    if (username){
        return User.findOne({username:username});        
    }

    return null;
}

function getAll(){
    return User.find();
}



module.exports = {
    create,
    getByUserName,
    getAll
};