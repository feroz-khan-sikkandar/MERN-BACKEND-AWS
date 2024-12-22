const bookService = require('../services/bookService');


const createBook = async (req, res, next) => {
  try {
    console.log(req.body)
    const book = await bookService.createBook(req.body);
    res.status(201).json({
      message: "Book added successfully!",
      book: book
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();

    // If no books are found, return an empty array
    if (books.length === 0) {
      return res.status(200).json({ message: "No books available", books: [] });
    }

    // Return the list of books
    res.status(200).json( books );

  } catch (error) {
    next(error);
  }
}

const getBookById = async (req, res, next) => {

  const { id } = req.params

  try {
    const book = await bookService.getBookById(id);

    // If the book is not found, return a 404 erro
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Return the list of books
    res.status(200).json( book );

  } catch (error) {
    next(error);
  }
}

const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);

    // If the book doesn't exist, return a 404
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    

    // Return the updated book details
    res.status(200).json({
      message: 'Book updated successfully',
      book: updatedBook
    });

  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await bookService.deleteBook(req.params.id);

    // If the book is not found, return a 404 error
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Return a success message
    res.status(200).json({
      message: 'Book deleted successfully',
      book: deletedBook
    });
    
  } catch (error) {
    next(error);
  }
};


module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
