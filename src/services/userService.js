const User = require('../models/user');

const addUser = (userData) => User.addUser(userData);

const checkUser = (userName) => User.findOne({ userName });

const checkPassword = (user, password) => user.password === password;


module.exports = { addUser, checkUser, checkPassword };