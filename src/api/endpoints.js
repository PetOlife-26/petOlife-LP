// ============================================================
//  PetOlife — Frontend API Layer
//  File    : src/api/endpoints.js
//  Purpose : All form submissions → Supabase only.
// ============================================================

import { supabase } from './supabase';

// ── Pet Parent form ─────────────────────────────────────────
export async function submitPetParentForm(data) {
  const { name, mobile, email, city, petType, petName, hasPet, earlyAccess } = data;

  if (!name || name.trim().length < 2)
    return { success: false, message: 'Please enter your name.' };
  if (!mobile || mobile.trim().length < 6)
    return { success: false, message: 'Please enter your mobile number.' };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, message: 'Please enter a valid email.' };
  if (!city || city.trim().length < 2)
    return { success: false, message: 'Please enter your city.' };
  if (!petType)
    return { success: false, message: 'Please select a pet type.' };

  if (!supabase)
    return { success: false, message: 'Service unavailable. Please try again later.' };

  try {
    const { error } = await supabase
      .from('pet_parents')
      .insert([
        {
          name        : name.trim(),
          mobile      : mobile.trim(),
          email       : email.trim(),
          city        : city.trim(),
          pet_type    : petType,
          pet_name    : petName ? petName.trim() : null,
          has_pet     : hasPet,
          early_access: earlyAccess,
        },
      ]);

    if (error) {
      console.error('[Supabase Error - pet_parents]', error);
      return { success: false, message: 'Something went wrong. Please try again.' };
    }

    return { success: true, message: `Thank you ${name.trim()}! We'll be in touch soon 🐾` };
  } catch (err) {
    console.error('[submitPetParentForm]', err);
    return { success: false, message: 'Connection error. Please try again.' };
  }
}

// ── Vet form ────────────────────────────────────────────────
export async function submitVetForm(data) {
  const { doctorName, clinicName, mobile, email, city, earlyAccess } = data;

  if (!doctorName || doctorName.trim().length < 2)
    return { success: false, message: 'Please enter doctor name.' };
  if (!clinicName || clinicName.trim().length < 2)
    return { success: false, message: 'Please enter clinic name.' };
  if (!mobile || mobile.trim().length < 6)
    return { success: false, message: 'Please enter mobile number.' };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, message: 'Please enter a valid email.' };
  if (!city || city.trim().length < 2)
    return { success: false, message: 'Please enter your city.' };

  if (!supabase)
    return { success: false, message: 'Service unavailable. Please try again later.' };

  try {
    const { error } = await supabase
      .from('vets')
      .insert([
        {
          doctor_name : doctorName.trim(),
          clinic_name : clinicName.trim(),
          mobile      : mobile.trim(),
          email       : email.trim(),
          city        : city.trim(),
          early_access: earlyAccess,
        },
      ]);

    if (error) {
      console.error('[Supabase Error - vets]', error);
      return { success: false, message: 'Something went wrong. Please try again.' };
    }

    return { success: true, message: `Thank you Dr. ${doctorName.trim()}! We'll reach out soon 🐾` };
  } catch (err) {
    console.error('[submitVetForm]', err);
    return { success: false, message: 'Connection error. Please try again.' };
  }
}
