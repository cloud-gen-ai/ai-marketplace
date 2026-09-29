# Deployment Guide

## Free-tier deployment stack

### Frontend
- Vercel
- connect GitHub repo
- set build command: `pnpm install && pnpm build`
- output directory: `.next`
- configure environment variables from `.env.example`

### API backend
- Render or Railway
- run the Express API from `apps/api`
- expose env variables such as `PORT`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`

### Database and auth
- Create a new project in Supabase
- create tables from `docs/database.md`
- enable auth providers: GitHub / email
- copy anon and service role keys into env files

### Payments
- create Stripe account and product prices in test mode
- register webhook endpoint for `http://your-render-url/api/webhooks/stripe`
- store `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`

## Production checklist

- set secure env vars in Vercel/Render
- add CORS rules for your domains
- verify webhook events
- enable rate limits and input validation
- add moderation and admin review tools
- ensure license generation is tied to subscription status
