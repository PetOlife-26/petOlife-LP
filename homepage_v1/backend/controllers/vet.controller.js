const Vet = require('../models/Vet');

exports.partnerVet = async (req, res, next) => {
  try {
    const { clinicName, email, phone, city, message } = req.body;
    if (!clinicName || !email)
      return res.status(400).json({ success: false, message: 'Clinic name and email are required.' });
    const vet = await Vet.create({ clinicName, email, phone, city, message });
    res.status(201).json({ success: true, message: `Thank you ${clinicName}, we'll be in touch!`, vet });
  } catch (err) { next(err); }
};
