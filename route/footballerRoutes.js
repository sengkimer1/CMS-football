const express = require('express');
const router = express.Router();
const { 
  getAllFootballers, 
  getFootballerById, 
  addFootballer, 
  updateFootballer, 
  deleteFootballer 
} = require('../controllers/footballerController');

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  req.user = { id: 123, role: 'ADMIN' }; // Example user data
  next();
};

// Routes
router.get('/footballers', authenticateUser, getAllFootballers);
router.get('/footballers/:id', authenticateUser, getFootballerById);
router.post('/footballers', authenticateUser, addFootballer);
router.put('/footballers/:id', authenticateUser, updateFootballer);
router.delete('/footballers/:id', authenticateUser, deleteFootballer);

module.exports = router;
