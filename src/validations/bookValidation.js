const { z } = require('zod');


// Define the schema for book validation
const bookSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  trending: z.boolean(),
  coverImage: z.string().nonempty("Cover Image is required"),
  oldPrice: z.number().positive("Price must be a positive number"),
  newPrice: z.number().positive("Price must be a positive number"),
});

const validateBook = (req, res, next) => {
  try {
    // Validate the data in req.body
    bookSchema.parse(req.body);
    next(); // Continue if validation passes
  } catch (error) {
    // Map over all errors and collect their messages
    const errorMessages = error.errors.map((err) => ({
      path: err.path.join('.'), // e.g., 'title' or 'category'
      message: err.message,
    }));

    // Respond with a 400 status and all error messages
    res.status(400).json({ errors: errorMessages });
  }
};

module.exports = validateBook;

// This file defines the validation logic for incoming data, ensuring it meets specified criteria
// before it’s processed by the server or saved to the database. Unlike the model, which defines
// the data structure in the database, this file validates data in HTTP requests (usually in
// POST, PUT, or PATCH requests).

// Using a library like Joi or Zod, you can validate that incoming data is correct before
// performing any operations. Here’s an example using Zod: