const router = require('express').Router();
const { createPet, getMyPets } = require('../controllers/pet.controller');
const auth = require('../middleware/auth.middleware');

router.post('/',    auth, createPet);
router.get('/my',   auth, getMyPets);

module.exports = router;
