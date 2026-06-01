const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
  clinicName: { type: String, required: true },
  email:      { type: String, required: true },
  phone:      String,
  city:       String,
  message:    String,
}, { timestamps: true });

module.exports = mongoose.model('Vet', vetSchema);
