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
  console.warn("[PetOlife] VITE_GOOGLE_SCRIPT_URL is not set.");
}

async function postToSheet(payload) {
  if (!GAS_URL) return { success: false, message: "API endpoint not configured." };

  const response = await fetch(GAS_URL, {
    method : "POST",
    headers: { "Content-Type": "text/plain" },
    body   : JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// ── Pet Parent form ─────────────────────────────────────────
export async function submitPetParentForm(data) {
  const { name, mobile, email, city, petType, hasPet, earlyAccess } = data;

  if (!name || name.trim().length < 2)
    return { success: false, message: "Please enter your name." };
  if (!mobile || mobile.trim().length < 6)
    return { success: false, message: "Please enter your mobile number." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, message: "Please enter a valid email." };
  if (!city || city.trim().length < 2)
    return { success: false, message: "Please enter your city." };
  if (!petType)
    return { success: false, message: "Please select a pet type." };

  try {
    const res = await postToSheet({
      type       : "pet-parent",
      name       : name.trim(),
      mobile     : mobile.trim(),
      email      : email.trim(),
      city       : city.trim(),
      extra      : petType,
      hasPet     : hasPet,
      earlyAccess: earlyAccess,
    });
    return {
      success: res.success,
      message: res.success
        ? `Thank you ${name.trim()}! We'll be in touch soon 🐾`
        : res.message || "Something went wrong.",
    };
  } catch (err) {
    console.error("[submitPetParentForm]", err);
    return { success: false, message: "Connection error. Please try again." };
  }
}

// ── Vet form ────────────────────────────────────────────────
export async function submitVetForm(data) {
  const { doctorName, clinicName, mobile, email, city, earlyAccess } = data;

  if (!doctorName || doctorName.trim().length < 2)
    return { success: false, message: "Please enter doctor name." };
  if (!clinicName || clinicName.trim().length < 2)
    return { success: false, message: "Please enter clinic name." };
  if (!mobile || mobile.trim().length < 6)
    return { success: false, message: "Please enter mobile number." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, message: "Please enter a valid email." };
  if (!city || city.trim().length < 2)
    return { success: false, message: "Please enter your city." };

  try {
    const res = await postToSheet({
      type       : "vet",
      name       : doctorName.trim(),
      mobile     : mobile.trim(),
      email      : email.trim(),
      city       : city.trim(),
      extra      : clinicName.trim(),
      earlyAccess: earlyAccess,
    });
    return {
      success: res.success,
      message: res.success
        ? `Thank you Dr. ${doctorName.trim()}! We'll reach out soon 🐾`
        : res.message || "Something went wrong.",
    };
  } catch (err) {
    console.error("[submitVetForm]", err);
    return { success: false, message: "Connection error. Please try again." };
  }
}
