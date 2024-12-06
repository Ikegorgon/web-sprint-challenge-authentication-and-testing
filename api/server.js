const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!
server.use('*', (req, res, next) => {
    res.status(404).json({message: "Error 404: Page not found."});
});
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message || "Unknown Error", stack: err.stack || null})
})

module.exports = server;
