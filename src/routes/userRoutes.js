const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userControler');

router.post('/', userControler.addUser);


module.exports = router;