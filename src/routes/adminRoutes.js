const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, adminController.getAdminStats);

module.exports = router;
