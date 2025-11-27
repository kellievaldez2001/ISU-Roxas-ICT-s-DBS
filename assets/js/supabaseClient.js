if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
  console.error("Supabase configuration is missing. Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set on window.");
}

if (typeof supabase !== 'undefined') {
  const { createClient } = supabase;
  const client = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  window.supabaseClient = client;
} else {
  console.warn("Supabase library not loaded. Falling back to mock data.");
  window.supabaseClient = null;
}
