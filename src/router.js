userRouter = require('./routes/user.router');
missionTypeRouter = require('./routes/missiontype.router');

module.exports = (server) => {
    server.use('/api/user', userRouter);
    server.use('/api/missiontype', missionTypeRouter);
}