const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  breed:   { type: String, default: 'Unknown' },
  species: { type: String, default: 'Dog' },
  age:     Number,
  weight:  Number,
  gender:  String,
  petCode: { type: String, unique: true },
  owner:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
