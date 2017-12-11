var fs = require('fs');
var router = require('express').Router();

userRouter = require('./routes/user.router');
missionTypeRouter = require('./routes/missiontype.router');
missionRouter = require('./routes/mission.router');
constraintRouter = require('./routes/constraint.router');

router.get('/IsAlive', function(req, res){
    res.status(200).send('Server Is Up.');
});

router.get('/adfs', function(req, res){
    res.set('Content-Type', 'application/samlmetadata+xml').send(
        fs.readFileSync('./adfs.xml'));
});

module.exports = (server) => {
    server.use('/', router);        
    server.use('/api/user', userRouter);
    server.use('/api/missiontype', missionTypeRouter);
    server.use('/api/mission', missionRouter);
    server.use('/api/constraint', constraintRouter);    
}