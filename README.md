# YEONU personal archive — O.home-style custom build

This version keeps the original Yeonu pastel-blue/lavender visual direction, but changes the site structure to real pages/routes inspired by O.home's page-oriented architecture.

## Routes
- `/` HOME / PROFILE
- `/chars` CHARACTERS
- `/rels` PAIRS / RELATIONSHIPS
- `/rels/[pair-id]` pair detail + log archive
- `/playlog` all log archive
- `/prompts` prompt archive + COPY
- `/links` links
- `/friends` friend banners
- `/admin` private admin dashboard

## Data features
- Supabase-backed settings, characters, prompts, links, moving image banners, friend banners, pairs, and pair logs
- Admin CRUD, ordering, image URL/upload, pair log backup/restore
- BGM autoplay/loop/on-off
- Moving image banner is separate from friend banners

## Deployment
Keep the existing Vercel project connected to GitHub. Replace the repository files with this project and commit. Vercel will redeploy automatically.

Required environment variables:
`NEXT_PUBLIC_SUPABASE_URL`
`NEXT_PUBLIC_SUPABASE_ANON_KEY`

Run `npm install` and `npm run build` locally if desired.
