const router = require('express').Router();
const { addReminder, completeReminder, getRemindersByPet } = require('../controllers/reminder.controller');
const auth = require('../middleware/auth.middleware');

router.post('/',           auth, addReminder);
router.patch('/:id',       auth, completeReminder);
router.get('/:petId',      auth, getRemindersByPet);

module.exports = router;
