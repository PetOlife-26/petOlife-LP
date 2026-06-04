// ============================================================
//  PetOlife — Frontend API Layer
//  File    : src/api/endpoints.js
//  Author  : Akash M S  
//  Purpose : All form/email submissions → Google Apps Script
//            No backend server required for prototype phase.
// ============================================================

// ── Resolve the script URL from env (Vite) ─────────────────
const GAS_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

if (!GAS_URL) {
  console.warn(
    "[PetOlife] VITE_GOOGLE_SCRIPT_URL is not set.\n" +
    "Copy .env.example → .env and paste your Google Script URL."
  );
}

// ── Tiny utilities ─────────────────────────────────────────
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim().toLowerCase());

/**
 * Core POST helper.
 * Google Apps Script doesn't support CORS preflight with JSON
 * content-type, so we send as "text/plain" and parse on the
 * script side. This is the documented workaround.
 *
 * @param {object} payload
 * @returns {Promise<{success: boolean, message: string}>}
 */
async function postToSheet(payload) {
  if (!GAS_URL) {
    return { success: false, message: "API endpoint not configured." };
  }

  const response = await fetch(GAS_URL, {
    method : "POST",
    headers: { "Content-Type": "text/plain" }, // required — see note above
    body   : JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

// ──────────────────────────────────────────────────────────
//  1. NEWSLETTER SUBSCRIPTION
//     Used by: Footer email input
//     Saves  : type="newsletter" row in Google Sheet
// ──────────────────────────────────────────────────────────
/**
 * @param {string} email
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function subscribeNewsletter(email) {
  await delay(200);

  if (!email || !isValidEmail(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    const result = await postToSheet({
      type   : "newsletter",
      email  : email.trim(),
      name   : "",
      subject: "",
      message: "Newsletter subscription",
      source : "petolife-footer-newsletter",
    });

    return {
      success: result.success,
      message: result.success
        ? "You're in! We'll keep you updated 🐾"
        : result.message || "Something went wrong. Please try again.",
    };
  } catch (err) {
    console.error("[subscribeNewsletter]", err);
    return {
      success: false,
      message: "Connection error. Please try again later.",
    };
  }
}

// ──────────────────────────────────────────────────────────
//  2. CONTACT FORM SUBMISSION
//     Used by: Contact / Get-in-touch section
//     Saves  : type="contact" row in Google Sheet
//     Triggers: email notification to tech@petolife.com
// ──────────────────────────────────────────────────────────
/**
 * @param {{ name: string, email: string, subject?: string, message: string }} data
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitContactForm(data) {
  await delay(200);

  const { name, email, subject, message } = data || {};

  // Validate
  if (!name || name.trim().length < 2)
    return { success: false, message: "Please enter your name." };
  if (!email || !isValidEmail(email))
    return { success: false, message: "Please enter a valid email address." };
  if (!message || message.trim().length < 10)
    return {
      success: false,
      message: "Message must be at least 10 characters.",
    };

  try {
    const result = await postToSheet({
      type   : "contact",
      name   : name.trim(),
      email  : email.trim(),
      subject: (subject || "General Enquiry").trim(),
      message: message.trim(),
      source : "petolife-contact-form",
    });

    return {
      success: result.success,
      message: result.success
        ? `Got it, ${name.trim()}! We'll reply within 24 hours 🐾`
        : result.message || "Something went wrong. Please try again.",
    };
  } catch (err) {
    console.error("[submitContactForm]", err);
    return {
      success: false,
      message: "Connection error. Please try again later.",
    };
  }
}

// ──────────────────────────────────────────────────────────
//  3. WAITLIST / EARLY ACCESS SIGNUP  (optional, extend later)
//     Used by: Hero CTA or "Join Waitlist" button
// ──────────────────────────────────────────────────────────
/**
 * @param {{ name: string, email: string, role?: string }} data
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function joinWaitlist(data) {
  await delay(200);

  const { name, email, role } = data || {};

  if (!email || !isValidEmail(email))
    return { success: false, message: "Please enter a valid email address." };

  try {
    const result = await postToSheet({
      type   : "waitlist",
      name   : (name || "").trim(),
      email  : email.trim(),
      subject: role || "Early Access",
      message: `Waitlist signup — role: ${role || "not specified"}`,
      source : "petolife-waitlist-cta",
    });

    return {
      success: result.success,
      message: result.success
        ? "You're on the list! We'll reach out soon 🐾"
        : result.message || "Something went wrong. Please try again.",
    };
  } catch (err) {
    console.error("[joinWaitlist]", err);
    return {
      success: false,
      message: "Connection error. Please try again later.",
    };
  }
}
