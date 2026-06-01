const Pet = require('../models/Pet');

function generatePetCode() {
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `POL-2026-${suffix}`;
}

exports.createPet = async (req, res, next) => {
  try {
    const { name, breed, species, age, weight, gender } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Pet name required.' });
    const pet = await Pet.create({
      name, breed, species, age, weight, gender,
      owner: req.user.id,
      petCode: generatePetCode()
    });
    res.status(201).json({ success: true, message: `${pet.name}'s identity created! Code: ${pet.petCode}`, pet });
  } catch (err) { next(err); }
};

exports.getMyPets = async (req, res, next) => {
  try {
    const pets = await Pet.find({ owner: req.user.id });
    res.json({ success: true, pets });
  } catch (err) { next(err); }
};
