const express = require('express');

// Make sure this path matches the file name EXACTLY
const authController = require('../controllers/authController');

const router = express.Router();

// Debug check: If this logs "undefined", the import is broken
console.log("Auth Controller Loaded:", authController);

router.post('/', authController.signup);
router.post('/login', authController.login);

module.exports = router;