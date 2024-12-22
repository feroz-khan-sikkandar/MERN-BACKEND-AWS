const Order = require('../models/order');

const createOrder = (orderData) => Order.create(orderData);

// const getAllBooks = () => Book.find().sort({ createdAt: -1 });

const getOrderByEmailId = (email) => Order.findOne({ email }).sort({ createdAt: -1 }).populate({
  path: 'productIds', // Path to the field containing references
  select: 'title category newPrice' // Fields to include from the Book collection
});
 
// const updateBook = (id, bookData) => Book.findByIdAndUpdate(id, { $set: bookData }, { new: true, runValidators: true });

// const deleteBook = (id) => Book.findByIdAndDelete(id);

module.exports = { createOrder, getOrderByEmailId };
