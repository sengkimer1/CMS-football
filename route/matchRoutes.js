const express = require('express');
const {
    createMatch,
    getAllMatch,
    getMatchID,
    updateMatch,
    deleteMatch,
    getAvailableSeats
} = require('../controllers/matchController');
const matchRouter = express.Router();
const authMiddleware = require('../Modelware/authmodelware');
const roleMiddleware = require('../Modelware/roleMiddleware');

matchRouter.post('/match',authMiddleware,roleMiddleware('admin'), createMatch);
matchRouter.get('/matchs',getAllMatch)
matchRouter.get('/matchs/:id',getMatchID)
matchRouter.put('/matchs/:id',authMiddleware,roleMiddleware('admin'),updateMatch)
matchRouter.delete('/matchs/:id',authMiddleware,roleMiddleware('admin'),deleteMatch)
matchRouter.get('/matchs/seats/:id',getAvailableSeats)

module.exports = matchRouter;
