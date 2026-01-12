const express = require('express');
const playerController = require('../controllers/playerController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public Route: Anyone can see the list of players
router.get('/', playerController.getAllPlayers);

// Protected Routes: You must be logged in to do these
router.use(authController.protect); // This protects all routes below it

router.post('/', playerController.createProfile); // Create or Update
router.get('/me', playerController.getMyProfile); // Get my own profile

module.exports = router;