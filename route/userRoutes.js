
const express = require('express');
const { registerUser, loginUser, getAllUsers, getUserById, updateUser , deleteUser} = require('../controllers/userController');
// const verifyToken  = require('../Modelware/roleMiddleware');
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', getAllUsers);
router.get('/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);


module.exports = router;
