# PetOlife — Backend Documentation
**Prepared by:** Akash MS (Backend Developer Intern)  
**Date:** June 1, 2026  
**Scope:** Day 1 Prototype — Homepage Backend Layer

---

## 1. Overview

This document describes the backend architecture contributed to the PetOlife Day 1 homepage prototype. The backend layer is implemented as a fully functional in-memory service inside `src/api/endpoints.js`, designed to connect directly to the existing React frontend without requiring a server during the prototype phase.

All functions are async, return consistent response shapes, include input validation, and are ready to be replaced with real API calls when the backend server is deployed.

---

## 2. Architecture Approach

```
React Frontend (Anu's UI)
        |
        ▼
src/api/endpoints.js  ← Akash's Backend Layer
        |
        ▼
In-Memory Store (prototype)
        |
        ▼
[Future: Real REST API + Database]
```

### Design Principles
- **Consistent response shape:** Every function returns `{ success: boolean, message: string, data? }`
- **Input validation:** All inputs validated before processing
- **Simulated async:** `delay()` utility simulates real network latency
- **Production-ready comments:** Every TODO marked clearly for handoff to real backend
- **No breaking changes:** Existing frontend code continues to work without modification

---

## 3. Backend Modules

### Module 1 — Auth Service
**Future endpoint:** `POST /auth/login`, `POST /auth/register`, `GET /auth/google`

| Function | Parameters | Returns |
|----------|-----------|---------|
| `registerUser(data)` | `{ username, email, password, role }` | `{ success, message, user }` |
| `loginUser(username, password)` | `string, string` | `{ success, message, user }` |
| `googleAuth()` | none | `{ success, message, redirectUrl }` |

**Validation rules:**
- Username: minimum 3 characters, unique
- Password: minimum 6 characters
- Email: valid format, unique
- Duplicate users are rejected with a clear message

---

### Module 2 — Pet Identity Service
**Future endpoint:** `POST /pets`, `GET /pets/:id`, `GET /pets?ownerId=`

| Function | Parameters | Returns |
|----------|-----------|---------|
| `createPetID(petData)` | `{ name, breed, species, age, weight, gender, ownerId }` | `{ success, message, pet }` |
| `fetchPetsByOwner(ownerId)` | `string` | `{ success, pets[] }` |

**Key feature:** Each pet gets a unique `petCode` (format: `POL-2026-XXXX`) which will power the QR identity system in future phases.

---

### Module 3 — Medical Records Service
**Future endpoint:** `POST /records`, `GET /records/:petId`

| Function | Parameters | Returns |
|----------|-----------|---------|
| `addMedicalRecord(data)` | `{ petId, type, description, date, vetId }` | `{ success, message, record }` |
| `fetchPetRecords(petId)` | `string` | `{ success, records[] }` |

**Record types supported:** Vaccination, Prescription, Checkup, Surgery, Treatment

Records are returned sorted newest-first by date.

---

### Module 4 — Reminder Engine
**Future endpoint:** `POST /reminders`, `GET /reminders/:petId`, `PATCH /reminders/:id`

| Function | Parameters | Returns |
|----------|-----------|---------|
| `createReminder(data)` | `{ petId, type, message, dueDate }` | `{ success, message, reminder }` |
| `completeReminder(reminderId)` | `string` | `{ success, message }` |
| `fetchPetReminders(petId)` | `string` | `{ success, reminders[] }` |

**Reminder types supported:** Vaccination, Deworming, Grooming, Feeding, Medication, Follow-up

Reminders are returned sorted soonest-first by due date.

---

### Module 5 — Vet Partnership Service
**Future endpoint:** `POST /vets/partner`, `GET /vets/:id`

| Function | Parameters | Returns |
|----------|-----------|---------|
| `partnerAsVet(data)` | `{ name, clinic, license, email }` | `{ success, message, vet }` |

New vet registrations get status: `pending_verification` until approved by admin.

---

### Module 6 — Newsletter Service
**Future endpoint:** `POST /newsletter/subscribe`

| Function | Parameters | Returns |
|----------|-----------|---------|
| `subscribeNewsletter(email)` | `string` | `{ success, message }` |

Duplicate emails are handled gracefully without errors.

---

### Module 7 — Contact Form Service
**Future endpoint:** `POST /contact`

| Function | Parameters | Returns |
|----------|-----------|---------|
| `submitContactForm(data)` | `{ name, email, subject, message }` | `{ success, message }` |

---

## 4. Data Models

### User
```
{
  id: "USR-timestamp-random",
  username: string,
  email: string | null,
  password: string,        // ⚠️ Must be hashed (bcrypt) in production
  role: "owner" | "vet" | "admin",
  createdAt: ISO string
}
```

### Pet
```
{
  id: "PET-timestamp-random",
  name: string,
  breed: string,
  species: string,
  age: number | null,
  weight: number | null,
  gender: string | null,
  ownerId: string | null,
  petCode: "POL-2026-XXXX",   // Unique QR-linked identifier
  createdAt: ISO string
}
```

### Medical Record
```
{
  id: "REC-timestamp-random",
  petId: string,
  type: string,
  description: string,
  date: "YYYY-MM-DD",
  vetId: string | null,
  createdAt: ISO string
}
```

### Reminder
```
{
  id: "REM-timestamp-random",
  petId: string,
  type: string,
  message: string,
  dueDate: string,
  isComplete: boolean,
  createdAt: ISO string
}
```

### Vet
```
{
  id: "VET-timestamp-random",
  name: string,
  clinic: string,
  license: string | null,
  email: string,
  status: "pending_verification" | "verified" | "rejected",
  createdAt: ISO string
}
```

---

## 5. Homepage Feature → Backend Module Mapping

| Homepage Section | UI Element | Backend Module | Future DB Table |
|-----------------|-----------|----------------|-----------------|
| Hero | Login / Register form | Auth Service | `users` |
| Hero | Google Sign-In | Auth Service (OAuth) | `users` |
| Pet Identity | Create Pet ID button | Pet Identity Service | `pets` |
| Pet Identity | Medical Timeline card | Medical Records Service | `records` |
| Pet Identity | Emergency QR Access | Pet Identity Service | `pets` (petCode) |
| Final CTA | Create Pet ID button | Pet Identity Service | `pets` |
| Final CTA | Partner as Vet button | Vet Partnership Service | `vets` |
| Footer | Newsletter subscribe | Newsletter Service | `newsletter` |
| Footer | Contact link | Contact Form Service | `contacts` |

---

## 6. Production Handoff Checklist

When the real backend server is ready, replace each stub with a real `fetch()` call:

```javascript
// Current (prototype)
export async function loginUser(username, password) {
  // in-memory logic
}

// Future (production)
export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return await res.json();
}
```

**Security items for production:**
- [ ] Hash passwords with bcrypt before storing
- [ ] Add JWT token authentication
- [ ] Implement rate limiting on auth endpoints
- [ ] Set up Google OAuth credentials
- [ ] Move API_BASE to environment variable (.env)
- [ ] Add HTTPS enforcement
- [ ] Validate all inputs server-side (not just client-side)

---

## 7. How to Test the Backend (Dev Console)

Open browser DevTools → Console while running `npm run dev`:

```javascript
// Import and test (paste in console)
import { registerUser, createPetID, createReminder } from './src/api/endpoints.js'

// Register a user
registerUser({ username: "testuser", email: "test@gmail.com", password: "123456" })

// Create a pet
createPetID({ name: "Bruno", breed: "Labrador", species: "Dog", ownerId: "USR-xxx" })

// Check store
getStoreSnapshot() // returns counts of all entities
```

All actions are logged to the console with `[Store]` prefix for easy debugging.

---

*Backend Layer — PetOlife Day 1 Prototype*  
*Akash MS | Backend Developer Intern | June 1, 2026*
