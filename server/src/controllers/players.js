const express = require('express');
const playerController = require('../controllers/playerController');
const authController = require('../controllers/authController');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Public routes
router.get('/', playerController.getAllPlayers);
router.get('/search', playerController.searchPlayers);
router.get('/nearby', playerController.getNearbyPlayers);
router.get('/:id', playerController.getPlayer);

// Protected routes
router.use(authController.protect);

router.post('/', playerController.createPlayer);
router.patch('/:id', playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);

// Stats routes
router.get('/:id/stats', playerController.getPlayerStats);
router.patch('/:id/stats', authController.restrictTo('admin', 'coach'), playerController.updatePlayerStats);

// Upload routes
router.post(
  '/:id/avatar',
  uploadController.uploadPlayerPhoto,
  uploadController.resizePlayerPhoto,
  playerController.uploadPlayerAvatar
);

module.exports = router;