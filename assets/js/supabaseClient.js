const { createClient } = supabase;
window.supabaseClient = createClient(window.supabaseConfig.url, window.supabaseConfig.anonKey);
