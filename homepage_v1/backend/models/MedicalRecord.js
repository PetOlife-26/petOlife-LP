const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  pet:         { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  type:        { type: String, required: true },
  description: { type: String, required: true },
  date:        { type: Date, default: Date.now },
  vet:         { type: mongoose.Schema.Types.ObjectId, ref: 'Vet' },
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', recordSchema);
