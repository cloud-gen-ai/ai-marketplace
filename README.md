# AI Marketplace

A subscription-based AI marketplace monorepo for selling reusable AI skill packs, plugin bundles, and workflow assets for GitHub Copilot, Claude Code, Cursor, and custom AI agent stacks.

## Stack

- Frontend: Next.js + Vercel
- API: FastAPI + Uvicorn
- Database: Supabase PostgreSQL
- Cache: Redis
- Payments: Stripe
- Auth: JWT / Supabase Auth
- Deployment: Vercel + Render/Fly/Railway

## Why this stack

- FastAPI is ideal for async, high-performance API workloads.
- PostgreSQL is a better long-term fit than document DBs for billing, licenses, and marketplaces.
- Supabase gives a free PostgreSQL tier with auth and storage included.
- Vercel is free-tier friendly and excellent for Next.js frontends.
- Stripe is the best payment system for subscriptions and digital licensing.

## Quick deploy plan

1. Create a Supabase Postgres project.
2. Configure your DB schema.
3. Create a Redis instance (Upstash/free tier or managed).
4. Create a Stripe account and product prices.
5. Deploy the FastAPI backend to Render/Fly/Railway.
6. Deploy the Next.js app to Vercel.
7. Set frontend and backend environment variables.
8. Configure Stripe webhook to your backend endpoint.
9. Launch and test all purchase flows.

## Production repo state

This repository includes the core backend foundation, marketplace APIs, subscription/licensing logic, cache/search, and deployment scaffolding for production.
