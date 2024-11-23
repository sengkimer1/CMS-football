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

// Route for getting all matches
// matchRouter.get('/matches', getAllMatches);

// Route for getting a match by ID
// matchRouter.get('/match/:id', getMatchById);

// Route for updating a match (general update)
// matchRouter.put('/match/:id', updateMatch);

// Route for canceling a match
// matchRouter.put('/match/:id/cancel', cancelMatch);

module.exports = matchRouter;
