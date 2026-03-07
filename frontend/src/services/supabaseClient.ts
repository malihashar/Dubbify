/**
 * Supabase client for optional persistence. Frontend may use for future features.
 * For the minimal demo, backend handles sessions; this is a placeholder for shared types/config.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseConfig(): { url: string; anonKey: string } | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
}

// Optional: instantiate @supabase/supabase-js client here if frontend needs direct DB access later.
// For the PRD demo path, all data flows through the backend API.
