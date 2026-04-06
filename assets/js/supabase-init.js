// Supabase Init - Shared across all pages
const SUPABASE_URL = 'https://wdqaqhtwekgdbhhkpsuo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcWFxaHR3ZWtnZGJoaGtwc3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTM4MDQsImV4cCI6MjA5MTA2OTgwNH0.32rSFGwjk2zZg8DkozntQN8qpgByqRRNpI3NwG5mpPo';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Get current user session
async function getCurrentUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session?.user || null;
}

// Get user profile from profiles table
async function getUserProfile(userId) {
    const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    if (error) return null;
    return data;
}

// Logout
async function logoutUser() {
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
}
