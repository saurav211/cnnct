const express = require('express');
const { login, signup, preferences } = require('./user.controller');
const authenticate = require('../middleware/validator');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/preferences', authenticate, preferences);

module.exports = router;