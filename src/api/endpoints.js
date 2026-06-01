/**
 * PetOlife API Endpoints
 * 
 * All backend-dependent functions are stubbed here.
 * Replace with actual API calls when backend is ready.
 */

export const API_BASE = ""; // TODO: Set when backend is ready

/**
 * Authenticate user with username/password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>}
 */
export async function loginUser(username, password) {
  // TODO: Replace with actual API call
  console.log("[API Stub] loginUser called:", { username, password: "***" });
  return {
    success: true,
    message: "Login endpoint not yet connected.",
    user: { id: null, username },
  };
}

/**
 * Register a new user
 * @param {object} data - { username, email, password, role }
 * @returns {Promise<object>}
 */
export async function registerUser(data) {
  // TODO: Replace with actual API call
  console.log("[API Stub] registerUser called:", { ...data, password: "***" });
  return {
    success: true,
    message: "Registration endpoint not yet connected.",
    user: { id: null, ...data },
  };
}

/**
 * Authenticate via Google OAuth
 * @returns {Promise<object>}
 */
export async function googleAuth() {
  // TODO: Replace with actual Google OAuth flow
  console.log("[API Stub] googleAuth called");
  return {
    success: true,
    message: "Google Auth endpoint not yet connected.",
    redirectUrl: null,
  };
}

/**
 * Create a new Pet Identity
 * @param {object} petData - { name, breed, species, photo, ownerId }
 * @returns {Promise<object>}
 */
export async function createPetID(petData) {
  // TODO: Replace with actual API call
  console.log("[API Stub] createPetID called:", petData);
  return {
    success: true,
    message: "Create Pet ID endpoint not yet connected.",
    petId: null,
  };
}

/**
 * Register as a veterinarian partner
 * @param {object} data - { name, clinic, license, email }
 * @returns {Promise<object>}
 */
export async function partnerAsVet(data) {
  // TODO: Replace with actual API call
  console.log("[API Stub] partnerAsVet called:", data);
  return {
    success: true,
    message: "Vet partnership endpoint not yet connected.",
    partnerId: null,
  };
}

/**
 * Fetch pet records by pet ID
 * @param {string} petId
 * @returns {Promise<object>}
 */
export async function fetchPetRecords(petId) {
  // TODO: Replace with actual API call
  console.log("[API Stub] fetchPetRecords called:", { petId });
  return {
    success: true,
    message: "Fetch records endpoint not yet connected.",
    records: [],
  };
}

/**
 * Subscribe to newsletter
 * @param {string} email
 * @returns {Promise<object>}
 */
export async function subscribeNewsletter(email) {
  // TODO: Replace with actual API call
  console.log("[API Stub] subscribeNewsletter called:", { email });
  return {
    success: true,
    message: "Newsletter subscription endpoint not yet connected.",
  };
}

/**
 * Contact form submission
 * @param {object} data - { name, email, subject, message }
 * @returns {Promise<object>}
 */
export async function submitContactForm(data) {
  // TODO: Replace with actual API call
  console.log("[API Stub] submitContactForm called:", data);
  return {
    success: true,
    message: "Contact form endpoint not yet connected.",
  };
}
