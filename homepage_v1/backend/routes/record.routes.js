const router = require('express').Router();
const { addRecord, getRecordsByPet } = require('../controllers/record.controller');
const auth = require('../middleware/auth.middleware');

router.post('/',            auth, addRecord);
router.get('/:petId',       auth, getRecordsByPet);

module.exports = router;
