const express = require('express');
const { isLoggedIn, isAuthenticated, isAdmin } = require('../controller/auth');
const { createDifficulty } = require('../controller/difficulty');
const { getUserById } = require('../controller/user');
const router = express.Router();

router.param('userId',getUserById);
router.post('/difficulty/create/:userId',isLoggedIn,isAuthenticated,isAdmin,createDifficulty);


module.exports = router;