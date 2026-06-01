const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,
           { expiresIn: process.env.JWT_EXPIRES_IN });

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    const token = signToken(user);
    res.status(201).json({
      success: true,
      message: `Welcome to PetOlife, ${user.username}!`,
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ success: false, message: 'Username or email already taken.' });
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    const token = signToken(user);
    res.json({
      success: true,
      message: `Welcome back, ${user.username}!`,
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (err) { next(err); }
};
