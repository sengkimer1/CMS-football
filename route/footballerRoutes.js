const express = require('express');
const router = express.Router();
const { 
  getAllFootballers, 
  getFootballerById, 
  addFootballer, 
  updateFootballer, 
  deleteFootballer 
} = require('../controllers/footballerController');
const authMiddleware = require('../Modelware/authmodelware');
const roleMiddleware = require('../Modelware/roleMiddleware');

// Routes
router.get('/footballers', authMiddleware, getAllFootballers);
router.get('/footballers/:id', authMiddleware, getFootballerById);
router.post('/footballers', authMiddleware, roleMiddleware('admin'), addFootballer);
router.put('/footballers/:id', authMiddleware, roleMiddleware('admin'), updateFootballer);
router.delete('/footballers/:id', authMiddleware, roleMiddleware('admin'), deleteFootballer);

module.exports = router;
