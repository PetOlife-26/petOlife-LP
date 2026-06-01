const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  pet:        { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  type:       { type: String, required: true },
  message:    String,
  dueDate:    { type: Date, required: true },
  isComplete: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
