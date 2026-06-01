const MedicalRecord = require('../models/MedicalRecord');

exports.addRecord = async (req, res, next) => {
  try {
    const { petId, type, description, date } = req.body;
    if (!petId || !type || !description)
      return res.status(400).json({ success: false, message: 'petId, type, and description are required.' });
    const record = await MedicalRecord.create({ pet: petId, type, description, date });
    res.status(201).json({ success: true, message: 'Medical record added.', record });
  } catch (err) { next(err); }
};

exports.getRecordsByPet = async (req, res, next) => {
  try {
    const records = await MedicalRecord.find({ pet: req.params.petId });
    res.json({ success: true, records });
  } catch (err) { next(err); }
};
