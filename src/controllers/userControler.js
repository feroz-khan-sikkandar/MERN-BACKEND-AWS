const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY

const addUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const { userName, password } = req.body;

    // Check if user exists
    const existingUser = await userService.checkUser(userName);
    if (!existingUser) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Check if the password matches
    const isPasswordValid = userService.checkPassword(existingUser, password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate a token if the user exists and the password is valid
    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = jwt.sign(
      {
        id: existingUser._id, // Embed the user's ID in the token
        userName: existingUser.userName, // Embed the user's username in the token
        role: existingUser.role // Embed the user's role in the token
      },
      JWT_SECRET, // Use the secret key from the environment variables to sign the token
      { expiresIn: '1h' } // Set the token to expire in 1 hour
    );

    // Explanation of why we are embedding these details in the JWT
    // Embedding the user's ID, username, and role in the JWT allows the server to recognize the user
    // and their permissions on subsequent requests without needing to query the database again.
    // This improves performance and scalability by reducing database load and also ensures
    // that the user's identity and permissions are consistently verified across all services
    // that trust the JWT. This is crucial for maintaining security and integrity of the user session.

    return res.status(200).json({
      message: 'User authenticated successfully',
      token,
      user: {
        userName: existingUser.userName,
        role: existingUser.role

      }
    });

    // const user = await userService.addUser(req.body);
    // res.status(201).json({
    //   message: "User added successfully!",
    //   user: user
    // });
  } catch (error) {
    next(error);
  }
};

module.exports = { addUser };