var router          = require('express').Router();
var userController  = require('../controller/user.controller');


router.get('/', function(req,res) {
    res.json(userController.getAllUsers());
});

router.get('/user/:userName',  function(req, res) {
    res.json( userController.getUserByUsername(req.params.userName));
});

router.post('/user',  function(req, res) {
    res.json( userController.createUser(req.body.username, 
                                        req.body.name, 
                                        req.body.userspermissions,
                                        req.body.specialpermissions,
                                        req.body.exemptions));
});

router.put('/user/permissions/user',  function(req, res) {
    res.json( userController.updateAllUserPermission(
        req.body.username,
        req.body.userspermissions
    ));
});


router.put('/user/permissions/special',  function(req, res) {
    res.json( userController.updateAllSpecialPermissions(
        req.body.username,
        req.body.specialpermissions
    ));
});

router.put('/user/exemptions',  function(req, res) {
    res.json( userController.updateAllExemptions(
        req.body.username,
        req.body.exemptions
    ));
});

router.put('/user/permission/user',  function(req, res) {
    res.json( userController.addUserPermission(
        req.body.username,
        req.body.usernameToAddName
    ));
});

router.put('/user/permission/special',  function(req, res) {
    res.json( userController.addSpecialPermission(
        req.body.username,
        req.body.specialPermission
    ));
});

router.put('/user/exemption',  function(req, res) {
    res.json( userController.addExemption(
        req.body.username,
        req.body.exemption
    ));
});

router.delete('/user',  function(req, res) {
    res.json( userController.DeleteUser(
        req.body.username
    ));
});

router.delete('/user/exemption',  function(req, res) {
    res.json( userController.removeOneExempt(
        req.body.username,
        req.body.exemption
    ));
});

router.delete('/user/permission/special',  function(req, res) {
    res.json( userController.removeOneSpecialPermission(
        req.body.username,
        req.body.specialPermission
    ));
});

router.delete('/user/permission/user',  function(req, res) {
    res.json( userController.removeOneUserPermission(
        req.body.username,
        req.body.usernameToRemove
    ));
});

module.exports = router;