const express = require('express');
const {bookTicket,getAllBookings,getBookingById,updateBooking,getTicketsByMatch,getMatchRevenue} = require('../controllers/bookingControllers')

const authMiddleware = require('../Modelware/authmodelware')
const router = express.Router();

router.post("/booking", authMiddleware,bookTicket);
router.get("/booking",getAllBookings);
router.get("/booking/:id",getBookingById);
router.put("/booking/:id",authMiddleware,updateBooking);

router.get("/ticket/seats/:matchId",getTicketsByMatch);
router.get("/ticket/revenue/:matchId",getMatchRevenue);



module.exports = router; 
