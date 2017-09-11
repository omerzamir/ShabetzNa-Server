var router          = require('express').Router();
var missionController  = require('../controller/mission.controller');

router.get('/',async function(req,res) {
    res.json(await missionController.getAllMissions());
});

router.post('/',async function(req,res) {
    res.json(await missionController.CreateMission(
        req.body.type, 
        req.body.startDate,
        req.body.endDate,
        req.body.status,
        req.body.participents
    ));
});

router.post('/range', async function(req,res) {
    res.json(await missionController.getMissionByDateRange(
        req.body.from,
        req.body.to
    ));
});

router.get('/from/:from', async function(req,res) {
    res.json(await missionController.getMissionByDateRange(
        req.param.from
    ));
});

router.get('/user/:user', async function(req,res) {
    res.json(await missionController.getUserMissions(
        req.param.user
    ));
});

router.post('/user/range', async function(req,res) {
    res.json(await missionController.getUserMissionsByDateRange(
        req.body.user,
        req.body.from,
        req.body.to
    ));
});

router.post('/user/from', async function(req,res) {
    res.json(await missionController.getUserMissionsFromDate(
        req.body.user,
        req.body.from
    ));
});

router.put('/dates', async function(req,res) {
    res.json(await missionController.ChangeMissionDates(
        req.body.user,
        req.body.from,
        req.body.to
    ));
});

router.put('/status', async function(req,res) {
    res.json(await missionController.ChangeMissionStatus(
        req.body.user,
        req.body.status
    ));
});

router.put('/participent', async function(req,res) {
    res.json(await missionController.AddParticipentToMission(
        req.body.id,
        req.body.participent
    ));
});

router.delete('/', async function(req,res) {
    res.json(await missionController.DeleteMission(
        req.body.mission
    ));
});

module.exports = router;