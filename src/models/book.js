const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    trending: { type: Boolean, required: true },
    coverImage: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
// 'Book': This is the name of the model being created.In this case, the model is named "Book".
// Mongoose will automatically create a collection in the MongoDB database with the pluralized version of this name(i.e., "books").

module.exports = Book;



// This file defines the data model for a book.
// The model specifies the structure of the data that will be stored in the database
// and typically includes things like field types, default values, and other constraints.
// If using MongoDB with Mongoose, the model file would define a schema
// and create a model based on that schema.

