export const mode = (): string => localStorage.getItem('mode') || import.meta.env.VITE_BACKEND_MODE || 'supabase'
