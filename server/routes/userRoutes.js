const express = require('express');
const { updateUserProfile, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/profile')
  .put(protect, updateUserProfile);

router.route('/')
  .get(protect, admin, getUsers);

module.exports = router; 