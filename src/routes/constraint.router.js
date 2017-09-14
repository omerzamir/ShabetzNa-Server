var router               = require('express').Router();
var constraintController = require('../controller/constraint.controller');

router.get('/',async function(req,res) {
    try {
        var resp = await constraintController.getAllConstraints();
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/',async function(req,res) {
    try {
        var resp = await constraintController.createConstraint(
            req.body.user, 
            req.body.date
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.get('/user/:user',async function(req,res) {
    try {
        var resp = await constraintController.getUserConstraints(
            req.param.username
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/range',async function(req,res) {
    try {
        var resp = await constraintController.getConstraintsByDateRange(
            req.body.from,
            req.body.to
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.get('/from/:from',async function(req,res) {
    try {
        var resp = await constraintController.getConstraintsFromDate(
            req.body.from
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/user/range',async function(req,res) {
    try {
        var resp = await constraintController.getUserConstraintsByDateRange(
            req.body.username,
            req.body.from,
            req.body.to
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/user/from',async function(req,res) {
    try {
        var resp = await constraintController.getUserConstraintsFromDate(
            req.body.username,
            req.body.from
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.get('/:id',async function(req,res) {
    try {
        var resp = await constraintController.getConstraintById(
            req.param.id
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.delete('/',async function(req,res) {
    try {
        var resp =await constraintController.DeleteConstraint(
            req.body.id
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

module.exports = router;