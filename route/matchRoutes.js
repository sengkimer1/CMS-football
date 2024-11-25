const express = require('express');
const {
    createMatch,
    getAllMatch,
    getMatchID,
    updateMatch,
    deleteMatch,

} = require('../controllers/matchController');
const matchRouter = express.Router();
const authMiddleware = require('../Modelware/authmodelware');
const roleMiddleware = require('../Modelware/roleMiddleware');

matchRouter.post('/match',authMiddleware,roleMiddleware('admin'), createMatch);
matchRouter.get('/matchs',getAllMatch)
matchRouter.get('/matchs/:id',getMatchID)

matchRouter.put('/matchs/:id',authMiddleware,roleMiddleware('admin'),updateMatch)
matchRouter.delete('/matchs/:id',authMiddleware,roleMiddleware('admin'),deleteMatch)

// Route for getting all matches
// matchRouter.get('/matches', getAllMatches);

// Route for getting a match by ID
// matchRouter.get('/match/:id', getMatchById);

// Route for updating a match (general update)
// matchRouter.put('/match/:id', updateMatch);

// Route for canceling a match
// matchRouter.put('/match/:id/cancel', cancelMatch);


matchRouter.put('/matchs/:id',updateMatch)
matchRouter.delete('/matchs/:id',deleteMatch)

module.exports = matchRouter;
