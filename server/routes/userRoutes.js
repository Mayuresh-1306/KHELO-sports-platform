const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');

// Route for User Registration
router.post('/', registerUser);

// Route for User Login
router.post('/login', authUser);

module.exports = router;