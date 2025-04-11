
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
// Using hardcoded values as fallback (this is only for demo purposes)
// In production, these would be set in environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Log for debugging purposes
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key length:', supabaseAnonKey ? supabaseAnonKey.length : 0);

// Ensure we have values before creating the client
if (!supabaseUrl || supabaseUrl === 'https://your-project-url.supabase.co') {
  console.warn('Using demo Supabase URL. Please set VITE_SUPABASE_URL in environment variables for production.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key') {
  console.warn('Using demo Supabase Anon Key. Please set VITE_SUPABASE_ANON_KEY in environment variables for production.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://your-project-url.supabase.co' && 
         supabaseAnonKey !== 'your-anon-key';
};
