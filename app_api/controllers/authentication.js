const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

// Register a new user
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: ''
  });

  user.setPassword(req.body.password);

  try {
    const q = await user.save();
    const token = user.generateJWT();
    return res.status(200).json(token);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Log in an existing user
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
};

// Export both methods
module.exports = {
  register,
  login
};
