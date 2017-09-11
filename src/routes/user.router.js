var router          = require('express').Router();
var userController  = require('../controller/user.controller');


router.get('/',async function(req,res) {
    res.json(await userController.getAllUsers());
});

router.get('/user/:userName', async function(req, res) {
    res.json(await userController.getUserByUsername(req.params.userName));
});

router.post('/user', async function(req, res) {
    res.json(await userController.createUser(
        req.body.username, 
        req.body.name, 
        req.body.userspermissions,
        req.body.specialpermissions,
        req.body.exemptions
    ));
});

router.put('/user/permissions/user', async function(req, res) {
    res.json(await userController.updateAllUserPermission(
        req.body.username,
        req.body.userspermissions
    ));
});


router.put('/user/permissions/special', async function(req, res) {
    res.json(await userController.updateAllSpecialPermissions(
        req.body.username,
        req.body.specialpermissions
    ));
});

router.put('/user/exemptions', async function(req, res) {
    res.json(await userController.updateAllExemptions(
        req.body.username,
        req.body.exemptions
    ));
});

router.put('/user/permission/user', async function(req, res) {
    res.json(await userController.addUserPermission(
        req.body.username,
        req.body.usernameToAddName
    ));
});

router.put('/user/permission/special', async function(req, res) {
    res.json(await userController.addSpecialPermission(
        req.body.username,
        req.body.specialPermission
    ));
});

router.put('/user/exemption', async function(req, res) {
    res.json(await userController.addExemption(
        req.body.username,
        req.body.exemption
    ));
});

router.delete('/user', async function(req, res) {
    res.json(await userController.DeleteUser(
        req.body.username
    ));
});

router.delete('/user/exemption', async function(req, res) {
    res.json(await userController.removeOneExempt(
        req.body.username,
        req.body.exemption
    ));
});

router.delete('/user/permission/special', async function(req, res) {
    res.json(await userController.removeOneSpecialPermission(
        req.body.username,
        req.body.specialPermission
    ));
});

router.delete('/user/permission/user', async function(req, res) {
    res.json(await userController.removeOneUserPermission(
        req.body.username,
        req.body.usernameToRemove
    ));
});

module.exports = router;