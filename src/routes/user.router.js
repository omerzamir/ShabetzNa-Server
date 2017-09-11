var router          = require('express').Router();
var userController  = require('../controller/user.controller');


router.get('/',async function(req,res) {
    res.json(await userController.getAllUsers());
});

router.get('/:userName', async function(req, res) {
    res.json(await userController.getUserByUsername(req.params.userName));
});

router.post('/', async function(req, res) {
    res.json(await userController.createUser(
        req.body.username, 
        req.body.name, 
        req.body.userspermissions,
        req.body.specialpermissions,
        req.body.exemptions
    ));
});

router.put('/permissions/user', async function(req, res) {
    res.json(await userController.updateAllUserPermission(
        req.body.username,
        req.body.userspermissions
    ));
});

router.put('/permissions/special', async function(req, res) {
    res.json(await userController.updateAllSpecialPermissions(
        req.body.username,
        req.body.specialpermissions
    ));
});

router.put('/exemptions', async function(req, res) {
    res.json(await userController.updateAllExemptions(
        req.body.username,
        req.body.exemptions
    ));
});

router.put('/permission/user', async function(req, res) {
    res.json(await userController.addUserPermission(
        req.body.username,
        req.body.usernameToAddName
    ));
});

router.put('/permission/special', async function(req, res) {
    res.json(await userController.addSpecialPermission(
        req.body.username,
        req.body.specialPermission
    ));
});

router.put('/exemption', async function(req, res) {
    res.json(await userController.addExemption(
        req.body.username,
        req.body.exemption
    ));
});

router.delete('/', async function(req, res) {
    res.json(await userController.DeleteUser(
        req.body.username
    ));
});

router.delete('/exemption', async function(req, res) {
    res.json(await userController.removeOneExempt(
        req.body.username,
        req.body.exemption
    ));
});

router.delete('/permission/special', async function(req, res) {
    res.json(await userController.removeOneSpecialPermission(
        req.body.username,
        req.body.specialPermission
    ));
});

router.delete('/permission/user', async function(req, res) {
    res.json(await userController.removeOneUserPermission(
        req.body.username,
        req.body.usernameToRemove
    ));
});

module.exports = router;