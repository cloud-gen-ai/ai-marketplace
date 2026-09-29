# Database Plan

## Best free choice: Supabase Postgres

Use Supabase Postgres for your MVP because it supports:

- relational data models
- subscription tracking
- licensing and billing records
- auth and user profiles
- file storage for product images, docs, and media

## Suggested tables

```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  avatar_url text,
  role text default 'buyer',
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references users(id),
  slug text unique not null,
  title text not null,
  category text not null,
  description text,
  price numeric(10,2) default 0,
  status text default 'draft',
  created_at timestamptz default now()
);

create table product_versions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  version text not null,
  changelog text,
  compatibility jsonb,
  package_url text,
  created_at timestamptz default now()
);

create table plans (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  name text not null,
  price numeric(10,2) not null,
  interval text not null,
  features jsonb,
  created_at timestamptz default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  product_id uuid references products(id),
  plan_id uuid references plans(id),
  stripe_subscription_id text,
  status text default 'active',
  current_period_end timestamptz,
  created_at timestamptz default now()
);

create table licenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  product_id uuid references products(id),
  license_key text not null,
  status text default 'active',
  expires_at timestamptz,
  created_at timestamptz default now()
);
```

## Additional tables for scale

- reviews
- product_media
- seller_profiles
- orders
- payouts
- moderation_queue

## Why not Firebase first?

Firebase is usable, but for SaaS marketplace logic and SQL-based billing/licensing, Supabase is usually easier to reason about and scale cleanly.
