import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('[PetOlife] Failed to initialise Supabase client:', err);
  }
} else {
  console.warn('[PetOlife] Supabase URL or Anon Key is missing — Supabase features disabled.');
}

export { supabase };
