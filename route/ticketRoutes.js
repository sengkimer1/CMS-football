const express = require('express');
const { createTicketController, getTicketById, getAllTickets, updateTicketBooking, deleteTicketById} = require ('../controllers/ticketController')
  // ES Module import

const roleMiddleware = require('../Modelware/roleMiddleware')
const authMiddleware = require('../Modelware/authmodelware')
const router = express.Router();


router.post('/ticket', authMiddleware, roleMiddleware('admin'),createTicketController);
router.get('/ticket/:id', authMiddleware, getTicketById);
router.get('/ticket', authMiddleware, getAllTickets);
router.put('/ticket/update/:id', authMiddleware, roleMiddleware('admin'), updateTicketBooking);
router.delete('/ticket/delete/:id', authMiddleware, roleMiddleware('admin'),deleteTicketById);


module.exports = router;
