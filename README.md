# AI Marketplace

A subscription-based AI marketplace monorepo for selling reusable skill packs, workflows, templates, and plugin bundles for tools like GitHub Copilot, Claude Code, Cursor, and custom AI agents.

## Stack

- Frontend: Next.js on Vercel
- API: Node.js/Express on Render or Railway
- Database: Supabase PostgreSQL (recommended free option)
- Auth: Supabase Auth or GitHub OAuth
- Storage: Supabase Storage
- Payments: Stripe Checkout + Webhooks
- Email: Resend

## Recommended free database

Supabase is the best default choice for this project because it includes:

- PostgreSQL database
- built-in authentication
- storage buckets
- row-level security
- easy API generation
- free tier adequate for MVP use

This makes it a stronger fit than MongoDB Atlas for a marketplace that needs strict relational data, subscriptions, and licensing.

## Recommended monorepo structure

```text
ai-marketplace/
├── apps/
│   ├── web/                # Next.js storefront
│   └── api/                # Express API
├── packages/
│   ├── shared/             # shared data/types
│   └── ui/                 # reusable design system (planned)
├── docs/
│   ├── architecture.md
│   ├── database.md
│   └── deployment.md
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## MVP goals

1. Marketplace landing page and catalog
2. Product detail pages
3. Pricing and checkout flow
4. Seller dashboard for publishing products
5. License and subscription records
6. Review and moderation flows
7. Vercel + Supabase deployment

## Product model

Each product should represent a sellable digital asset:

- title
- slug
- description
- category
- pricing plan
- supported AI tools
- version history
- doc and install links
- screenshots or demo videos
- seller and moderation status

## Deployment recommendation

- Web front-end: Vercel (free)
- API backend: Render or Railway (free-tier friendly)
- Database/auth/storage: Supabase (free)
- Payments: Stripe (test mode for MVP)

## Next steps

- Configure Supabase project and schema
- Add Stripe checkout and webhook endpoint
- Add seller onboarding and product publish flow
- Add product search and filters
- Add auth and session handling
- Deploy the web app

This repository is intentionally scaffolded as a monorepo foundation so you can grow from MVP to a production marketplace without reworking the project structure.
