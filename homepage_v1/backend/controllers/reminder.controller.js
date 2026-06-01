const Reminder = require('../models/Reminder');

exports.addReminder = async (req, res, next) => {
  try {
    const { petId, type, message, dueDate } = req.body;
    if (!petId || !type || !dueDate)
      return res.status(400).json({ success: false, message: 'petId, type, and dueDate are required.' });
    const reminder = await Reminder.create({ pet: petId, type, message, dueDate });
    res.status(201).json({ success: true, message: 'Reminder set.', reminder });
  } catch (err) { next(err); }
};

exports.completeReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { isComplete: true },
      { new: true }
    );
    if (!reminder) return res.status(404).json({ success: false, message: 'Reminder not found.' });
    res.json({ success: true, message: 'Reminder marked complete.', reminder });
  } catch (err) { next(err); }
};

exports.getRemindersByPet = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ pet: req.params.petId });
    res.json({ success: true, reminders });
  } catch (err) { next(err); }
};
