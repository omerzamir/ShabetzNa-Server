var userManager = require('../manager/user.manager');

var User = require('../models/user.model');

function createUser(
    username, 
    name, 
    email,
    job,
    userspermissions, 
    specialpermissions, 
    exemptions
) {
    try{
        return userManager.create(username, name,email, job, userspermissions, specialpermissions, exemptions);
    } catch(ex){
        throw ex;
    }
}

function getUserByUsername(username) {
    try{
        return userManager.getByUserName(username); 
    }
    catch(ex){
        throw ex;
    }
}

function getAllUsers() {
    try {
        return userManager.getAll();
    }
    catch(ex){
        throw ex;
    }
}

function updateAllUserPermission(username, userspermissions) {
    try {
        return userManager.UpdateUserPermissions(username, userspermissions);
    }
    catch(ex){
        throw ex;
    }
}

function updateAllSpecialPermissions(username, specialpermissions) {
    try {
        return userManager.UpdateSpecialPermissions(username, specialpermissions);
    }
    catch(ex){
        throw ex;
    }
}

function updateAllExemptions(username, exemptions) {
    try {
        return userManager.UpdateExemptions(username, exemptions);
    }
    catch(ex){
        throw ex;
    }
}

async function addUserPermission(username, usernameToAddName) {
    try {
        var userToAdd = await getUserByUsername(usernameToAddName);

        return userManager.addUserPermission(username, userToAdd._id);
    }
    catch(ex){
        throw ex;
    }
}

function addSpecialPermission(username, specialPermission) {
    try {
        return userManager.addSpecialPermission(username, specialPermission);
    }
    catch(ex){
        throw ex;
    }
}

function addExemption(username, exemption) {
    try {
        return userManager.addExempt(username, exemption);
    }
    catch(ex){
        throw ex;
    }
}

function DeleteUser(username) {
    try {
        return userManager.Delete(username);
    }    
    catch(ex){
        throw ex;
    }
}

function removeOneExempt(username, exempt) {
    try {
        return userManager.removeExempt(username, exempt);
    }
    catch(ex){
        throw ex;
    }
}

function removeOneSpecialPermission(username, specialPermission) {
    try {
        return userManager.removespecialPermission(username, specialPermission);
    }
    catch(ex){
        throw ex;
    }
}

async function removeOneUserPermission(username, usernameToRemove){
    try {
        var userToRemove = await getUserByUsername(usernameToRemove);
        return userManager.removeUserPermission(username, userToRemove._id);  
    }
    catch(ex){
        throw ex;
    }
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