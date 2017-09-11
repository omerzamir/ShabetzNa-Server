var userManager = require('../manager/user.manager');

function createUser(
    username, 
    name, 
    userspermissions, 
    specialpermissions, 
    exemptions
) {
    return userManager.create(
        username, 
        name, 
        userspermissions, 
        specialpermissions, 
        exemptions
    );
}

function getUserByUsername(username) {
    return userManager.getByUserName(username);
}

function getAllUsers() {
    return userManager.getAll();
}

function updateAllUserPermission(username, userspermissions) {
    return userManager.UpdateUserPermissions(username, userspermissions);
}

function updateAllSpecialPermissions(username, specialpermissions) {
    return userManager.UpdateSpecialPermissions(username, specialpermissions);
}

function updateAllExemptions(username, exemptions) {
    return userManager.UpdateExemptions(username, exemptions);
}

function addUserPermission(username, usernameToAddName) {
    
    var userToAdd = getUserByUsername(usernameToAddName);

    return userManager.addUserPermission(username, userToAdd._id);
}

function addSpecialPermission(username, specialPermission) {
    return userManager.addSpecialPermission(username, specialPermission);
}

function addExemption(username, exemption) {
    return userManager.addExempt(username, exemption);
}

function DeleteUser(username) {
    return userManager.Delete(username);
}

function removeOneExempt(username, exempt) {
    return userManager.removeExempt(username, exempt);
}

function removeOneSpecialPermission(username, specialPermission) {
    return userManager.removespecialPermission(username, specialPermission);
}

function removeOneUserPermission(username, usernameToRemove){
    var userToRemove = getUserByUsername(usernameToRemove);

    return userManager.removeUserPermission(username, userToRemove._id);
}

module.exports = {
    createUser,
    getUserByUsername,
    getAllUsers,
    updateAllUserPermission,
    updateAllSpecialPermissions,
    updateAllExemptions,
    addUserPermission,
    addSpecialPermission,
    addExemption,
    DeleteUser,
    removeOneExempt,
    removeOneSpecialPermission,
    removeOneUserPermission
}