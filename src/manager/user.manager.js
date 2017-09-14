var objectId = require('mongoose').Types.ObjectId;
var User = require('../models/user.model');
var UserValidation = require('./validations/user.validator');

function create(username, name, userspermissions, specialpermissions, exemptions) {
    if (username && name){
        try{
            // Exceptions?
            UserValidation.usersPermissionsValidity(userspermissions)
            UserValidation.specialPermissionsValidity(specialpermissions)
            UserValidation.exemptionsValidity(exemptions)
            
            var newUser = User({
                username: username,
                name: name,
                userspermissions: userspermissions,
                specialpermissions: specialpermissions,
                exemptions: exemptions
            });

            return newUser.save();
        }
        catch(ex) {
            return Promise.reject(ex);
        } 
    }
    return Promise.resolve(null);
}

function getByUserName(username) {
    return User.findOne({
        username: username
    });

}

function getAll() {
    return User.find();
}

function UpdateUserPermissions(username, userspermissions) {
    try{
        UserValidation.usersPermissionsValidity(userspermissions);

        return User.update({
            username: username
        }, {
            userspermissions: userspermissions
        });
    } 
    catch(ex) {
        return Promise.reject(ex);
    }
}

function UpdateSpecialPermissions(username, specialpermissions) {
    try{
        UserValidation.specialPermissionsValidity(specialpermissions);

        return User.update({
            username: username
        }, {
            specialpermissions: specialpermissions
        });
    }
    catch(ex) {
        return Promise.reject(ex);
    }
}

function UpdateExemptions(username, exemptions) {
    try {
        UserValidation.exemptionsValidity(exemptions);
        return User.update({
            username: username
        }, {
            exemptions: exemptions
        });
    }
    catch(ex) {
        return Promise.reject(ex);
    }
}

async function addUserPermission(username, userToAdd) {
    try {
        var user = await getByUserName(username);
        if (objectId.isValid(userToAdd)) {
            user.userspermissions.push(userToAdd);
            return await user.save();
        } else {
            return Promise.reject(TypeError("user Id is not valid"));
        }
    }
    catch(ex) {
        return Promise.reject(ex);
    }
}

async function addSpecialPermission(username, specialPermission) {
    try {
        var user = await getByUserName(username);
        user.specialpermissions.push(specialPermission);
        return await user.save();
    }
    catch(ex){
        return Promise.reject(ex);
    }
}

async function addExempt(username, exempt) {
    try {
        var user = await getByUserName(username);
        user.exemptions.push(exempt);
        return await user.save();
    }
    catch(ex){
        return Promise.reject(ex);
    }
}

function removeExempt(username, exempt) {
    return User.update({
        username: username
    }, {
        $pull: {
            exemptions: {
                '$in': [exempt]
            }
        }
    });
}

function removespecialPermission(username, specialPermission) {
    return User.update({
        username: username
    }, {
        $pull: {
            specialpermissions: {
                '$in': [specialPermission]
            }
        }
    });
}

function removeUserPermission(username, userPermission) {
    return User.update({
        username: username
    }, {
        $pull: {
            userspermissions: {
                '$in': [userPermission]
            }
        }
    });
}

async function Delete(username) {
    return await User.remove({
        username: username
    });
}

module.exports = {
    create,
    getByUserName,
    getAll,
    UpdateUserPermissions,
    UpdateSpecialPermissions,
    UpdateExemptions,
    addUserPermission,
    addSpecialPermission,
    addExempt,
    removeExempt,
    removespecialPermission,
    removeUserPermission,
    Delete
};