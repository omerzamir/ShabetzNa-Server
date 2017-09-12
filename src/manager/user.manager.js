var objectId = require('mongoose').Types.ObjectId;
var User = require('../models/user.model');
var UserValidation = require('./validations/user.validator');

function create(username, name, userspermissions, specialpermissions, exemptions) {

    if (username && name) {
        var newUser = User({
            username: username,
            name: name,
            userspermissions: UserValidation.usersPermissionsValidity(userspermissions),
            specialpermissions: UserValidation.specialPermissionsValidity(specialpermissions),
            exemptions: UserValidation.exemptionsValidity(exemptions)
        });

        return newUser.save();
    }

    return null;
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

    return User.update({
        username: username
    }, {
        userspermissions: UserValidation.usersPermissionsValidity(userspermissions)
    });
}

function UpdateSpecialPermissions(username, specialpermissions) {

    return User.update({
        username: username
    }, {
        specialpermissions: UserValidation.specialPermissionsValidity(specialpermissions)
    });
}

function UpdateExemptions(username, exemptions) {

    return User.update({
        username: username
    }, {
        exemptions: UserValidation.exemptionsValidity(exemptions)
    });
}

async function addUserPermission(username, userToAdd) {
    var user = await getByUserName(username);
    if (objectId.isValid(userToAdd)) {
        user.userspermissions.push(userToAdd);
        return await user.save();
    }
    return null;
}

function addSpecialPermission(username, specialPermission) {
    var user = getByUserName(username);

    user.userspermissions.push(specialPermission);

    return user.save();
}

function addExempt(username, exempt) {
    var user = getByUserName(username);

    user.exemptions.push(exempt);

    user.save();
}

function Delete(username) {
    return User.remove({
        username: username
    });
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
    removeUserPermission
};