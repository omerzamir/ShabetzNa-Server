userRouter = require('./routes/user.router');

module.exports = (server) => {
    server.use('/api/user', userRouter);
}