# AI Marketplace API

This is the Python backend for the AI marketplace. It is built with FastAPI for high-performance async APIs, PostgreSQL for relational data, and Stripe-ready subscription/licensing flows.

## Local setup

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Environment variables

```bash
export APP_ENV=development
export DATABASE_URL=sqlite+aiosqlite:///./marketplace.db
export REDIS_URL=redis://localhost:6379/0
export STRIPE_SECRET_KEY=sk_test_...
export STRIPE_WEBHOOK_SECRET=whsec_...
```

## Why FastAPI?

- async/await performance
- excellent OpenAPI docs
- Python ecosystem compatibility for AI workloads
- scalable for marketplace APIs, subscriptions, and licensing workflows
