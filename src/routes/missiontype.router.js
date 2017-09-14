var router          = require('express').Router();
var missionTypeController  = require('../controller/missiontype.controller');

router.get('/',async function(req,res) {
    try {
        var resp = await missionTypeController.getAllMissionTypes();
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.get('/types/:type', async function(req, res) {
    try {
        var resp = await missionTypeController.getMissionTypesByType(req.params.type);
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.get('/id/:id', async function(req, res) {
    try {
        var resp = await missionTypeController.getMissionTypeById(req.params.id);
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/', async function(req, res) {
    try {
        var resp = await missionTypeController.createMissionType( 
            req.body.name, 
            req.body.description,
            req.body.type
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.put('/', async function(req, res) {
    try {
        var resp = await missionTypeController.updateMissionType( 
            req.body.id, 
            req.body.name, 
            req.body.description,
            req.body.type
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.delete('/', async function(req, res) {
    try {
        var resp = await missionTypeController.DeleteMissionTypeById( 
            req.body.id
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

module.exports = router;