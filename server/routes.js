const express = require('express');
const router = express.Router();

router.use('/user', require('./user/user.routes'));

module.exports = router;
