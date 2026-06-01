require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
connectDB();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/auth',       require('./routes/auth.routes'));
app.use('/pets',       require('./routes/pet.routes'));
app.use('/records',    require('./routes/record.routes'));
app.use('/reminders',  require('./routes/reminder.routes'));
app.use('/vets',       require('./routes/vet.routes'));
app.use('/newsletter', require('./routes/newsletter.routes'));
app.use('/contact',    require('./routes/contact.routes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
