const express = require('express');
const {
    createMatch,
    getAllMatch,
    getMatchID,
    updateMatch,
    deleteMatch,

} = require('../controllers/matchController');
const matchRouter = express.Router();

matchRouter.post('/match', createMatch);
matchRouter.get('/matchs',getAllMatch)
matchRouter.get('/matchs/:id',getMatchID)
matchRouter.put('/matchs/:id',updateMatch)
matchRouter.delete('/matchs/:id',deleteMatch)
module.exports = matchRouter;
