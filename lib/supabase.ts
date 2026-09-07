import { createBrowserClient } from '@supabase/ssr'

// During `next build`, Vercel can prerender client components before
// runtime environment variables are available. Use harmless placeholders
// so the app can build; real values supplied in Vercel env vars take priority.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export function supabase() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
