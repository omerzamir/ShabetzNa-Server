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



module.exports = {
    createUser,
    getUserByUsername,
    getAllUsers,
    
}