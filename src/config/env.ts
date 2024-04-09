export const mode = () => localStorage.getItem('mode') || import.meta.env.VITE_BACKEND_MODE || 'supabase'
