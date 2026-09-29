# AI Marketplace Architecture

## Product direction

This project is a subscription-based marketplace for AI skills, prompts, workflow packs, and reusable plugin assets. The product is designed for tools like GitHub Copilot, Claude Code, Cursor, and custom AI agent workflows.

## Recommended architecture

- Frontend: Next.js + App Router
- Backend: Express API
- Shared package: common types and product catalog data
- Database: Supabase PostgreSQL
- Auth: Supabase Auth
- Storage: Supabase Storage + Vercel Blob
- Payments: Stripe Checkout

## Core data model

### Users
- id
- email
- name
- avatar_url
- role
- created_at

### Products
- id
- seller_id
- slug
- title
- category
- description
- price
- status
- created_at

### Plans
- id
- product_id
- name
- price
- interval
- features

### Subscriptions
- id
- user_id
- product_id
- plan_id
- stripe_subscription_id
- status
- current_period_end

### Licenses
- id
- user_id
- product_id
- license_key
- status
- expires_at

## Deployment architecture

- Web app: Vercel
- API: Render or Railway
- Database: Supabase
- webhook endpoint: Render/Railway app with Stripe webhook

## Free-tier stack

This is the most practical free stack for an MVP:

1. Vercel for the storefront
2. Supabase for database + auth + storage
3. Render or Railway for API
4. Stripe in test mode for subscriptions
5. Resend for email verification
