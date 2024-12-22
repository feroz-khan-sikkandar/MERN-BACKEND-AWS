const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateBook = require('../validations/bookValidation');
const verifyToken = require('../middleware/verifyToken');

// Route to create a new book, validated by validateBook middleware
router.post('/', verifyToken, validateBook, bookController.createBook);

// Route to retrieve all books
router.get('/', bookController.getAllBooks);

// Route to retrieve a specific book by its ID
router.get('/:id', bookController.getBookById);

// Route to update a specific book by its ID
router.put('/:id', verifyToken, bookController.updateBook);

// Route to delete a specific book by its ID
router.delete('/:id', verifyToken, bookController.deleteBook);

module.exports = router;
