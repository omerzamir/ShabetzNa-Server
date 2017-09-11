var router          = require('express').Router();
var missionTypeController  = require('../controller/missiontype.controller');

router.get('/',async function(req,res) {
    res.json(await missionTypeController.getAllMissionTypes());
});

router.get('/types/:type', async function(req, res) {
    res.json(await missionTypeController.getMissionTypesByType(req.params.type));
});

router.get('/id/:id', async function(req, res) {
    res.json(await missionTypeController.getMissionTypeById(req.params.id));
});

router.post('/', async function(req, res) {
    res.json(await missionTypeController.createMissionType( 
        req.body.name, 
        req.body.description,
        req.body.type
    ));
});

router.put('/', async function(req, res) {
    res.json(await missionTypeController.updateMissionType( 
        req.body.id, 
        req.body.name, 
        req.body.description,
        req.body.type
    ));
});

router.delete('/', async function(req, res) {
    res.json(await missionTypeController.DeleteMissionTypeById( 
        req.body.id
    ));
});

module.exports = router;