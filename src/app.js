const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Enable CORS for all routes
app.use(cors());

connectDB();

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

module.exports = app;


// Imports:
// express: Imports the Express framework for building the web server and API.
// connectDB: A custom module that connects the app to the database.This function is imported from a separate file(./config/db).
// bookRoutes: The routing module for all book - related routes, handling CRUD operations related to books.It’s imported from./ routes / bookRoutes.
// errorHandler: A custom error - handling middleware function that will catch and respond to errors in a centralized way.It’s imported from./ middleware / errorHandler.


// const app = express();
// App Initialization:
// Initializes an Express application by calling express(), which returns an app object.This object is used to define middleware, routes, and error handling.

// connectDB();
// Database Connection:
// Calls connectDB() to connect to the database as soon as the app starts.This function (defined in db.js) typically establishes a connection to MongoDB or another database and logs a message if the connection is successful or fails.

// app.use(express.json());
// Middleware for Parsing JSON:
// app.use(express.json()) adds middleware that parses incoming JSON request bodies and makes the data available under req.body.This is essential for working with JSON data sent in POST, PUT, and PATCH requests.
  
// app.use('/api/books', bookRoutes);
// Routes:
// Mounts bookRoutes middleware at the / api / books path.All routes defined in bookRoutes will be prefixed with /api/books.
// For example:
// GET / api / books might retrieve a list of books.
// POST / api / books might add a new book.
// GET / api / books /:id might retrieve a specific book by ID.
// bookRoutes contains the route handlers for all book - related endpoints.

// app.use(errorHandler);
// Error Handling Middleware:
// Attaches the errorHandler middleware at the end of the middleware stack, after all other routes.
// errorHandler will catch and process any errors thrown during request handling, providing a standardized error response.This middleware centralizes error handling and improves readability and maintainability.
