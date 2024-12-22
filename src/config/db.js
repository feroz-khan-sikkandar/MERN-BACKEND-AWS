const mongoose = require("mongoose");
require('dotenv').config(); // Ensure dotenv is required to load .env variables
const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};


// // Connect to MongoDB
// mongoose.connect('mongodb+srv://devferozkhan:Smile@247@cluster0.1zbua.mongodb.net/book_store_app', { useNewUrlParser: true }).then((data) => {
//   console.log("connected to MongoDB");
// });


module.exports = connectDB;