const express = require('express');
const { createTicketController, getTicketById, getAllTickets, updateTicketBooking, deleteTicketById} = require ('../controllers/ticketController')
  // ES Module import


const router = express.Router();


router.post('/ticket', createTicketController);
router.get('/ticket/:id', getTicketById);
router.get('/ticket', getAllTickets);
router.put('/ticket/update/:id', updateTicketBooking);
router.delete('/ticket/delete/:id', deleteTicketById);


module.exports = router;
