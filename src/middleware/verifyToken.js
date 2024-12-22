const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyToken = (req, res, next) => {
  // Extract the token from the 'Authorization' header of the request.
  // The 'Authorization' header is expected to contain the token prefixed by 'Bearer ',
  // which is a common convention used in HTTP authentication. The prefix 'Bearer' helps
  // to specify that the type of authentication being used is a bearer token.
  // We split the string by spaces and take the second element ([1]) to get the token itself.
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    // Check if there was an error during the verification of the token
    if (err) {
      // If an error occurred, it typically means the token is invalid or expired
      // Respond with a 403 Forbidden status indicating invalid credentials
      return res.status(403).json({ message: 'Invalid credentials' });
    }
    // If the token is valid, attach the decoded token to the request object
    // This typically includes the user's details encoded in the token

    console.log("decodedToken ----> ", decodedToken)
    req.user = decodedToken;
    // Proceed to the next middleware or route handler
    next();
  });
}

module.exports = verifyToken;