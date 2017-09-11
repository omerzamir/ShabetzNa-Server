var router               = require('express').Router();
var constraintController = require('../controller/constraint.controller');

router.get('/',async function(req,res) {
    res.json(await constraintController.getAllConstraints());
});

router.post('/',async function(req,res) {
    res.json(await constraintController.createConstraint(
        req.body.user, 
        req.body.date
    ));
});

router.get('/user/:user',async function(req,res) {
    res.json(await constraintController.getUserConstraints(
        req.param.username
    ));
});

router.post('/range',async function(req,res) {
    res.json(await constraintController.getConstraintsByDateRange(
        req.body.from,
        req.body.to
    ));
});

router.get('/from/:from',async function(req,res) {
    res.json(await constraintController.getConstraintsFromDate(
        req.body.from
    ));
});

router.post('/user/range',async function(req,res) {
    res.json(await constraintController.getUserConstraintsByDateRange(
        req.body.username,
        req.body.from,
        req.body.to
    ));
});

router.post('/user/from',async function(req,res) {
    res.json(await constraintController.getUserConstraintsFromDate(
        req.body.username,
        req.body.from
    ));
});

router.get('/:id',async function(req,res) {
    res.json(await constraintController.getConstraintById(
        req.param.id
    ));
});

router.delete('/',async function(req,res) {
    res.json(await constraintController.DeleteConstraint(
        req.body.id
    ));
});

module.exports = router;