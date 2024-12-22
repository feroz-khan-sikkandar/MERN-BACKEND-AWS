const Book = require('../models/book');

const createBook = (bookData) => Book.create(bookData);

const getAllBooks = () => Book.find().sort({ createdAt: -1 });

const getBookById = (id) => Book.findById(id);

const updateBook = (id, bookData) => Book.findByIdAndUpdate(id, { $set: bookData }, { new: true, runValidators: true });

const deleteBook = (id) => Book.findByIdAndDelete(id);

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
