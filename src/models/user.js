const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], required: true }
}

);

// This middleware function is triggered before a User document is saved to the database.
userSchema.pre('save', async function (next) {
  // Check if the password field has been modified. If not, proceed to the next middleware.
  if (!this.isModified('password')) return next();

  // If the password is modified, hash it using bcrypt with a salt round of 10,
  // then replace the original password with the hashed one.
  this.password = await bcrypt.hash(this.password, 10);

  // Continue with the next middleware or save operation.
  next();
});

// Create a Mongoose model named 'User' based on the userSchema defined above.
const User = mongoose.model('User', userSchema);
module.exports = User;

// bcrypt is a popular library for hashing passwords in a secure way.
// It’s commonly used in applications to protect user passwords before storing them in a database.
// When you hash a password using bcrypt, it’s converted into a complex string that is infeasible
// to reverse-engineer back into the original password, even if someone gains access to the database.