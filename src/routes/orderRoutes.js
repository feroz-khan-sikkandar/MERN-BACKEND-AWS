const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


// Route to create a new book, validated by validateBook middleware
router.post('/', orderController.createOrder);

// Route to retrieve a latest order by email id
router.get('/:emailId', orderController.getOrderByEmailId);

module.exports = router;