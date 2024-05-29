const express = require('express');
const { verifyToken } = require('../controllers/authController');
const router = express.Router();

router.use(verifyToken);

module.exports = router;
