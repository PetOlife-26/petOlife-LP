const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: "You're subscribed to PetOlife updates!" });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ success: false, message: 'Already subscribed.' });
    next(err);
  }
};
