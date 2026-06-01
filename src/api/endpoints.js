/**
 * PetOlife API Endpoints
 * 
 * Backend Layer — Akash MS (Backend Developer Intern)
 * 
 * Architecture:
 *   - All functions are async and return consistent { success, message, data } shapes
 *   - In-memory store simulates a real database (replace with actual API calls when backend is ready)
 *   - Input validation is handled before any operation
 *   - Each module maps to a future backend service (see BACKEND_MODULES below)
 */

export const API_BASE = ""; // TODO: Set to actual backend URL when ready (e.g. https://api.petolife.com/v1)

// ---------------------------------------------------------------------------
// IN-MEMORY STORE (replaces real DB for prototype phase)
// ---------------------------------------------------------------------------
const store = {
  users: [],        // { id, username, email, password, role, createdAt }
  pets: [],         // { id, name, breed, species, age, weight, gender, ownerId, petCode, createdAt }
  records: [],      // { id, petId, type, description, date, vetId, createdAt }
  reminders: [],    // { id, petId, type, message, dueDate, isComplete, createdAt }
  vets: [],         // { id, name, clinic, license, email, createdAt }
  newsletter: [],   // { id, email, createdAt }
  contacts: [],     // { id, name, email, subject, message, createdAt }
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

/** Generate a unique ID */
function generateId(prefix = "ID") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/** Generate a unique Pet Code like POL-2026-XXXX */
function generatePetCode() {
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `POL-2026-${suffix}`;
}

/** Simulate network delay (makes it feel like a real API) */
function delay(ms = 300) {
  return new Promise((res) => setTimeout(res, ms));
}

/** Basic email format check */
function isValidEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

// ---------------------------------------------------------------------------
// MODULE 1 — AUTH SERVICE
// Maps to future backend: POST /auth/login, POST /auth/register, GET /auth/google
// ---------------------------------------------------------------------------

/**
 * Register a new user
 * @param {object} data - { username, email, password, role }
 * @returns {Promise<{success, message, user}>}
 */
export async function registerUser(data) {
  await delay();
  const { username, email, password, role = "owner" } = data || {};

  // Validation
  if (!username || username.trim().length < 3) {
    return { success: false, message: "Username must be at least 3 characters." };
  }
  if (!password || password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters." };
  }
  if (email && !isValidEmail(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  // Duplicate check
  const exists = store.users.find(
    (u) => u.username === username.trim() || (email && u.email === email.trim())
  );
  if (exists) {
    return { success: false, message: "Username or email already registered." };
  }

  const newUser = {
    id: generateId("USR"),
    username: username.trim(),
    email: email ? email.trim() : null,
    password, // NOTE: In production this must be hashed (bcrypt)
    role,
    createdAt: new Date().toISOString(),
  };

  store.users.push(newUser);
  console.log("[Store] User registered:", newUser.username, "| Total users:", store.users.length);

  const { password: _pw, ...safeUser } = newUser;
  return {
    success: true,
    message: `Welcome to PetOlife, ${newUser.username}! Your account has been created.`,
    user: safeUser,
  };
}

/**
 * Login an existing user
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{success, message, user}>}
 */
export async function loginUser(username, password) {
  await delay();

  if (!username || !password) {
    return { success: false, message: "Please enter both username and password." };
  }

  const user = store.users.find(
    (u) => (u.username === username.trim() || u.email === username.trim()) && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid username or password." };
  }

  console.log("[Store] User logged in:", user.username);
  const { password: _pw, ...safeUser } = user;
  return {
    success: true,
    message: `Welcome back, ${user.username}!`,
    user: safeUser,
  };
}

/**
 * Authenticate via Google OAuth (stub — redirects to OAuth flow in production)
 * @returns {Promise<{success, message, redirectUrl}>}
 */
export async function googleAuth() {
  await delay(200);
  console.log("[Auth] Google OAuth flow initiated");
  return {
    success: true,
    message: "Google Sign-In coming soon! We're setting up secure OAuth. Please use email for now.",
    redirectUrl: null, // TODO: Set to Google OAuth redirect URL
  };
}

// ---------------------------------------------------------------------------
// MODULE 2 — PET IDENTITY SERVICE
// Maps to future backend: POST /pets, GET /pets/:id, GET /pets (by owner)
// ---------------------------------------------------------------------------

/**
 * Create a new Pet Identity
 * @param {object} petData - { name, breed, species, age, weight, gender, ownerId, photo }
 * @returns {Promise<{success, message, pet}>}
 */
export async function createPetID(petData) {
  await delay();
  const { name, breed, species = "Dog", age, weight, gender, ownerId } = petData || {};

  // Validation
  if (!name || name.trim().length < 1) {
    return { success: false, message: "Pet name is required." };
  }

  const newPet = {
    id: generateId("PET"),
    name: name.trim(),
    breed: breed || "Unknown",
    species,
    age: age || null,
    weight: weight || null,
    gender: gender || null,
    ownerId: ownerId || null,
    petCode: generatePetCode(), // Unique QR-linked code like POL-2026-AB3C
    records: [],
    reminders: [],
    createdAt: new Date().toISOString(),
  };

  store.pets.push(newPet);
  console.log("[Store] Pet registered:", newPet.name, "| Pet Code:", newPet.petCode);

  return {
    success: true,
    message: `${newPet.name}'s digital identity has been created! Pet Code: ${newPet.petCode}`,
    pet: newPet,
  };
}

/**
 * Fetch all pets for a given owner
 * @param {string} ownerId
 * @returns {Promise<{success, pets}>}
 */
export async function fetchPetsByOwner(ownerId) {
  await delay();
  if (!ownerId) {
    return { success: false, message: "Owner ID is required.", pets: [] };
  }
  const pets = store.pets.filter((p) => p.ownerId === ownerId);
  return { success: true, pets };
}

// ---------------------------------------------------------------------------
// MODULE 3 — MEDICAL RECORDS SERVICE
// Maps to future backend: POST /records, GET /records/:petId
// ---------------------------------------------------------------------------

/**
 * Add a medical record to a pet
 * @param {object} data - { petId, type, description, date, vetId }
 * @returns {Promise<{success, message, record}>}
 */
export async function addMedicalRecord(data) {
  await delay();
  const { petId, type, description, date, vetId } = data || {};

  if (!petId) return { success: false, message: "Pet ID is required." };
  if (!type) return { success: false, message: "Record type is required (e.g. Vaccination, Checkup)." };
  if (!description) return { success: false, message: "Description is required." };

  const pet = store.pets.find((p) => p.id === petId);
  if (!pet) return { success: false, message: "Pet not found." };

  const newRecord = {
    id: generateId("REC"),
    petId,
    type,       // e.g. "Vaccination", "Prescription", "Checkup", "Surgery"
    description,
    date: date || new Date().toISOString().split("T")[0],
    vetId: vetId || null,
    createdAt: new Date().toISOString(),
  };

  store.records.push(newRecord);
  console.log("[Store] Record added for pet:", petId, "| Type:", type);

  return {
    success: true,
    message: `Medical record (${type}) added successfully for ${pet.name}.`,
    record: newRecord,
  };
}

/**
 * Fetch all medical records for a pet
 * @param {string} petId
 * @returns {Promise<{success, records}>}
 */
export async function fetchPetRecords(petId) {
  await delay();
  if (!petId) return { success: false, message: "Pet ID is required.", records: [] };

  const records = store.records
    .filter((r) => r.petId === petId)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  return { success: true, records };
}

// ---------------------------------------------------------------------------
// MODULE 4 — REMINDER ENGINE
// Maps to future backend: POST /reminders, GET /reminders/:petId, PATCH /reminders/:id
// ---------------------------------------------------------------------------

/**
 * Create a reminder for a pet
 * @param {object} data - { petId, type, message, dueDate }
 * @returns {Promise<{success, message, reminder}>}
 */
export async function createReminder(data) {
  await delay();
  const { petId, type, message, dueDate } = data || {};

  if (!petId) return { success: false, message: "Pet ID is required." };
  if (!type) return { success: false, message: "Reminder type is required (e.g. Vaccination, Grooming)." };
  if (!dueDate) return { success: false, message: "Due date is required." };

  const pet = store.pets.find((p) => p.id === petId);
  if (!pet) return { success: false, message: "Pet not found." };

  const newReminder = {
    id: generateId("REM"),
    petId,
    type,         // e.g. "Vaccination", "Deworming", "Grooming", "Feeding", "Medication"
    message: message || `Time for ${pet.name}'s ${type}!`,
    dueDate,
    isComplete: false,
    createdAt: new Date().toISOString(),
  };

  store.reminders.push(newReminder);
  console.log("[Store] Reminder created for pet:", petId, "| Due:", dueDate);

  return {
    success: true,
    message: `Reminder set: ${newReminder.message} on ${dueDate}`,
    reminder: newReminder,
  };
}

/**
 * Mark a reminder as complete
 * @param {string} reminderId
 * @returns {Promise<{success, message}>}
 */
export async function completeReminder(reminderId) {
  await delay(150);
  const reminder = store.reminders.find((r) => r.id === reminderId);
  if (!reminder) return { success: false, message: "Reminder not found." };

  reminder.isComplete = true;
  console.log("[Store] Reminder completed:", reminderId);
  return { success: true, message: "Reminder marked as complete." };
}

/**
 * Fetch all reminders for a pet
 * @param {string} petId
 * @returns {Promise<{success, reminders}>}
 */
export async function fetchPetReminders(petId) {
  await delay();
  if (!petId) return { success: false, message: "Pet ID is required.", reminders: [] };

  const reminders = store.reminders
    .filter((r) => r.petId === petId)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // soonest first

  return { success: true, reminders };
}

// ---------------------------------------------------------------------------
// MODULE 5 — VET PARTNERSHIP SERVICE
// Maps to future backend: POST /vets/partner, GET /vets/:id
// ---------------------------------------------------------------------------

/**
 * Register as a veterinarian partner
 * @param {object} data - { name, clinic, license, email }
 * @returns {Promise<{success, message, vet}>}
 */
export async function partnerAsVet(data) {
  await delay();
  const { name, clinic, license, email } = data || {};

  if (!name || name.trim().length < 2) {
    return { success: false, message: "Doctor name is required." };
  }
  if (!clinic || clinic.trim().length < 2) {
    return { success: false, message: "Clinic name is required." };
  }
  if (!email || !isValidEmail(email)) {
    return { success: false, message: "A valid email address is required." };
  }

  const exists = store.vets.find((v) => v.email === email.trim() || (license && v.license === license));
  if (exists) {
    return { success: false, message: "A vet with this email or license is already registered." };
  }

  const newVet = {
    id: generateId("VET"),
    name: name.trim(),
    clinic: clinic.trim(),
    license: license || null,
    email: email.trim(),
    status: "pending_verification", // pending_verification | verified | rejected
    createdAt: new Date().toISOString(),
  };

  store.vets.push(newVet);
  console.log("[Store] Vet partner registered:", newVet.name, "@", newVet.clinic);

  return {
    success: true,
    message: `Thank you, Dr. ${newVet.name}! Your partnership application is under review. We'll contact you at ${newVet.email}.`,
    vet: newVet,
  };
}

// ---------------------------------------------------------------------------
// MODULE 6 — NEWSLETTER SERVICE
// Maps to future backend: POST /newsletter/subscribe
// ---------------------------------------------------------------------------

/**
 * Subscribe to newsletter
 * @param {string} email
 * @returns {Promise<{success, message}>}
 */
export async function subscribeNewsletter(email) {
  await delay(200);

  if (!email || !isValidEmail(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const already = store.newsletter.find((n) => n.email === email.trim());
  if (already) {
    return { success: false, message: "This email is already subscribed. Thank you!" };
  }

  store.newsletter.push({
    id: generateId("NWS"),
    email: email.trim(),
    createdAt: new Date().toISOString(),
  });

  console.log("[Store] Newsletter subscribed:", email);
  return {
    success: true,
    message: "You're subscribed! We'll keep you updated on PetOlife's launch.",
  };
}

// ---------------------------------------------------------------------------
// MODULE 7 — CONTACT FORM SERVICE
// Maps to future backend: POST /contact
// ---------------------------------------------------------------------------

/**
 * Submit a contact form enquiry
 * @param {object} data - { name, email, subject, message }
 * @returns {Promise<{success, message}>}
 */
export async function submitContactForm(data) {
  await delay();
  const { name, email, subject, message } = data || {};

  if (!name || name.trim().length < 2) return { success: false, message: "Name is required." };
  if (!email || !isValidEmail(email)) return { success: false, message: "A valid email is required." };
  if (!message || message.trim().length < 10) return { success: false, message: "Message must be at least 10 characters." };

  store.contacts.push({
    id: generateId("CNT"),
    name: name.trim(),
    email: email.trim(),
    subject: subject || "General Enquiry",
    message: message.trim(),
    createdAt: new Date().toISOString(),
  });

  console.log("[Store] Contact form submitted from:", email);
  return {
    success: true,
    message: `Thank you, ${name}! We've received your message and will respond within 24 hours.`,
  };
}

// ---------------------------------------------------------------------------
// DEV UTILITY — inspect store (remove in production)
// ---------------------------------------------------------------------------
export function getStoreSnapshot() {
  return {
    users: store.users.length,
    pets: store.pets.length,
    records: store.records.length,
    reminders: store.reminders.length,
    vets: store.vets.length,
    newsletter: store.newsletter.length,
    contacts: store.contacts.length,
  };
}
