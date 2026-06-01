const Contact = require('../models/Contact');

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ success: true, message: "Thanks for reaching out! We'll respond shortly.", contact });
  } catch (err) { next(err); }
};
