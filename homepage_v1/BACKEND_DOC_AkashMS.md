# PetOlife — Backend Documentation

**Prepared by:** Akash MS (Backend Developer Intern)  
**Date:** June 1, 2026  
**Scope:** Day 1 — Homepage Backend Layer  
**Branch:** `main` | `homepage_v1`

---

## 1. Overview

This document describes the real backend to be built for PetOlife, replacing the current in-memory simulation in `src/api/endpoints.js`. The backend is a Node.js/Express server connected to MongoDB Atlas, secured with JWT authentication, and structured to match the existing Git file layout.

> **What already exists:** `src/api/endpoints.js` defines 7 service modules with correct input validation, ID generation, and response shapes. The backend directly mirrors this logic — same inputs, same response format — so the frontend requires only a one-line `API_BASE` change to switch over.

---

## 2. Architecture

```
React Frontend (Anu's UI)
        |
        ▼
src/api/endpoints.js   ← swapped to real fetch() calls
        |
        ▼
backend/server.js      ← Express + middleware
        |
        ▼
MongoDB Atlas          ← Mongoose models
```

**Stack:**

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT + bcryptjs |
| Google OAuth | Passport.js + passport-google-oauth20 |
| Validation | express-validator |
| Security | helmet, cors, express-rate-limit |
| Email | Nodemailer |
| Environment | dotenv |
| Dev tooling | nodemon, morgan |

---

## 3. Folder Structure

Create this inside the project root alongside the existing frontend:

```
backend/
  server.js                  ← Entry point
  .env                       ← Secrets (never commit)
  .env.example               ← Template with keys, no values
  package.json

  config/
    db.js                    ← MongoDB connection
    passport.js              ← Google OAuth strategy

  models/
    User.js
    Pet.js
    MedicalRecord.js
    Reminder.js
    Vet.js
    Newsletter.js
    Contact.js

  routes/
    auth.routes.js           ← POST /auth/register, /auth/login, /auth/google
    pet.routes.js            ← POST /pets, GET /pets/my
    record.routes.js         ← POST /records, GET /records/:petId
    reminder.routes.js       ← POST /reminders, PATCH /reminders/:id
    vet.routes.js            ← POST /vets/partner
    newsletter.routes.js     ← POST /newsletter/subscribe
    contact.routes.js        ← POST /contact

  controllers/
    auth.controller.js
    pet.controller.js
    record.controller.js
    reminder.controller.js
    vet.controller.js
    newsletter.controller.js
    contact.controller.js

  middleware/
    auth.middleware.js       ← JWT verification
    validate.middleware.js   ← express-validator error handler
    errorHandler.js          ← Global error handler

  utils/
    generatePetCode.js       ← Migrated from endpoints.js
    sendEmail.js             ← Nodemailer wrapper
```

---

## 4. Installation & Setup

```bash
cd backend
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet \
            express-rate-limit morgan express-validator passport \
            passport-google-oauth20 nodemailer
npm install --save-dev nodemon
```

**`.env` file** (never commit — provide `.env.example` instead):
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/petolife
JWT_SECRET=replace_with_long_random_secret_min_32chars
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=from_google_cloud_console
GOOGLE_CLIENT_SECRET=from_google_cloud_console
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=petolife@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
```

**`package.json` scripts:**
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 5. server.js — Entry Point

```js
// backend/server.js
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

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/auth',       require('./routes/auth.routes'));
app.use('/pets',       require('./routes/pet.routes'));
app.use('/records',    require('./routes/record.routes'));
app.use('/reminders',  require('./routes/reminder.routes'));
app.use('/vets',       require('./routes/vet.routes'));
app.use('/newsletter', require('./routes/newsletter.routes'));
app.use('/contact',    require('./routes/contact.routes'));

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 6. Database — config/db.js

```js
// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## 7. Models

### models/User.js
```js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  email:    { type: String, sparse: true, unique: true },
  password: { type: String, minlength: 6 },   // null for Google OAuth users
  role:     { type: String, enum: ['owner', 'vet', 'admin'], default: 'owner' },
  googleId: { type: String, sparse: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### models/Pet.js
```js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  breed:   { type: String, default: 'Unknown' },
  species: { type: String, default: 'Dog' },
  age:     Number,
  weight:  Number,
  gender:  String,
  petCode: { type: String, unique: true },    // POL-2026-XXXX
  owner:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
```

### models/MedicalRecord.js
```js
const mongoose = require('mongoose');
const recordSchema = new mongoose.Schema({
  pet:         { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  type:        { type: String, required: true },  // Vaccination|Prescription|etc
  description: { type: String, required: true },
  date:        { type: Date, default: Date.now },
  vet:         { type: mongoose.Schema.Types.ObjectId, ref: 'Vet' },
}, { timestamps: true });
module.exports = mongoose.model('MedicalRecord', recordSchema);
```

### models/Reminder.js
```js
const mongoose = require('mongoose');
const reminderSchema = new mongoose.Schema({
  pet:        { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  type:       { type: String, required: true },
  message:    String,
  dueDate:    { type: Date, required: true },
  isComplete: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Reminder', reminderSchema);
```

---

## 8. Authentication

### middleware/auth.middleware.js
```js
// backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'No token provided.' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};
```

### controllers/auth.controller.js
```js
// backend/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,
           { expiresIn: process.env.JWT_EXPIRES_IN });

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    const token = signToken(user);
    res.status(201).json({
      success: true,
      message: `Welcome to PetOlife, ${user.username}!`,
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ success: false, message: 'Username or email already taken.' });
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email: username }]  // allow login by email too
    });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    const token = signToken(user);
    res.json({
      success: true,
      message: `Welcome back, ${user.username}!`,
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (err) { next(err); }
};
```

### routes/auth.routes.js
```js
// backend/routes/auth.routes.js
const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller');
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');

router.post('/register',
  body('username').isLength({ min: 3 }).trim(),
  body('password').isLength({ min: 6 }),
  body('email').optional().isEmail().normalizeEmail(),
  validate,
  register
);

router.post('/login',
  body('username').notEmpty(),
  body('password').notEmpty(),
  validate,
  login
);

module.exports = router;
```

---

## 9. Google OAuth — config/passport.js

```js
// backend/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        username: profile.displayName.replace(/\s+/g, '_').toLowerCase(),
        email: profile.emails[0].value,
        role: 'owner'
      });
    }
    done(null, user);
  } catch (err) { done(err, null); }
}));

module.exports = passport;
```

**Add Google routes to `auth.routes.js`:**
```js
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  }
);
```

---

## 10. Pet Identity Routes

Replaces `createPetID()` and `fetchPetsByOwner()` from `endpoints.js`. All routes require a valid JWT.

```js
// backend/routes/pet.routes.js
const router = require('express').Router();
const { createPet, getMyPets } = require('../controllers/pet.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/',   authMiddleware, createPet);
router.get('/my',  authMiddleware, getMyPets);

module.exports = router;
```

```js
// backend/controllers/pet.controller.js
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
    res.status(201).json({
      success: true,
      message: `${pet.name}'s identity created! Code: ${pet.petCode}`,
      pet
    });
  } catch (err) { next(err); }
};

exports.getMyPets = async (req, res, next) => {
  try {
    const pets = await Pet.find({ owner: req.user.id });
    res.json({ success: true, pets });
  } catch (err) { next(err); }
};
```

---

## 11. Shared Middleware

### middleware/validate.middleware.js
```js
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array()
    });
  }
  next();
};
```

### middleware/errorHandler.js
```js
module.exports = (err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
};
```

---

## 12. Security Checklist

> ⚠️ Never store plain-text passwords. Never commit your `.env`. Always validate input before touching the DB. Rate-limit all public endpoints.

| Security Item | How It's Handled |
|---|---|
| Password hashing | `bcrypt.hash` (cost factor 12) in User model pre-save hook |
| JWT secrets | Stored in `.env`, minimum 32 chars, never in code |
| CORS | `cors()` middleware — only allows `CLIENT_URL` origin |
| HTTP headers | `helmet()` sets X-Content-Type, HSTS, XSS filter, etc. |
| Rate limiting | `express-rate-limit`: 100 req / 15 min per IP |
| Input validation | `express-validator` on all POST routes |
| Protected routes | `auth.middleware.js` verifies JWT on all non-public endpoints |
| MongoDB injection | Mongoose parameterizes queries automatically |
| `.env` not committed | Add `.env` to `.gitignore` — provide `.env.example` instead |
| Token expiry | `JWT_EXPIRES_IN=7d` in `.env` |

---

## 13. Connecting Frontend to Backend

Once the backend runs on `localhost:5000`, update `src/api/endpoints.js` with this one change:

```js
// src/api/endpoints.js — change this one line
export const API_BASE = "http://localhost:5000";  // was ""
```

Then replace in-memory functions with real `fetch()` calls:

```js
export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();  // returns { success, message, token, user }
}

// For protected endpoints, include JWT token:
export async function createPetID(petData) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/pets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(petData),
  });
  return res.json();
}
```

---

## 14. Remaining Modules to Build

All follow the exact same pattern as `pet.controller.js` — create, save to DB, return JSON.

| Module | Files to Create |
|---|---|
| Medical Records | `controllers/record.controller.js` + `routes/record.routes.js` |
| Reminders | `controllers/reminder.controller.js` + `routes/reminder.routes.js` |
| Vet Partnership | `controllers/vet.controller.js` + `routes/vet.routes.js` |
| Newsletter | `controllers/newsletter.controller.js` + `routes/newsletter.routes.js` |
| Contact Form | `controllers/contact.controller.js` + `routes/contact.routes.js` |

> 💡 **Reminder Engine tip:** Add a `node-cron` job in `server.js` that runs daily, finds reminders where `dueDate` is tomorrow and `isComplete` is false, and sends an email via `utils/sendEmail.js`.

---

## 15. Quick Start

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env   # then fill in values

# 4. Start in development mode
npm run dev

# 5. Test auth endpoint
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"pass1234"}'

# Expected: { success: true, token: "...", user: {...} }
```

---

## Build Order Recommendation

```
server.js + config/db.js  →  models/  →  auth (register + login)  →  pet routes  →  remaining modules  →  Google OAuth  →  email reminders
```

---

*PetOlife • Confidential • Akash MS — Backend Developer Intern • June 1, 2026*
