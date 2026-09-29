# AI Marketplace API - Deployment & Operations Guide

## Local Development

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Run with compose
docker-compose up

# Or standalone
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Products (Marketplace)
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/{id}` - Get product details
- `POST /api/v1/products` - Create product (seller/admin only)
- `PATCH /api/v1/products/{id}` - Update product (owner/admin only)

### Search & Discovery
- `GET /api/v1/marketplace/products?q=search&category=dev&page=1` - Search with cache

### Subscriptions & Licensing
- `POST /api/v1/subscriptions` - Create subscription
- `GET /api/v1/licenses/me` - Get my licenses
- `POST /api/v1/checkout/session` - Create Stripe checkout session

### Reviews
- `GET /api/v1/reviews/product/{id}` - Get product reviews
- `POST /api/v1/reviews` - Create review (authenticated)

### Admin
- `GET /api/v1/admin/overview` - Admin dashboard
- `POST /api/v1/marketplace/products/{id}/approve` - Approve product
- `POST /api/v1/marketplace/products/{id}/reject` - Reject product

### Webhooks
- `POST /api/v1/webhooks/stripe` - Stripe webhook handler (signature verified)

## Core Business Flows

### Customer Purchase Flow
1. Buyer creates account: `POST /auth/register`
2. Buyer browses products: `GET /marketplace/products?q=...`
3. Buyer clicks "Get Access": `POST /checkout/session`
4. Stripe checkout → payment
5. Stripe webhook: `POST /webhooks/stripe`
6. System creates subscription + grants license
7. Buyer can access: `GET /licenses/me`

### Seller Publishing Flow
1. Seller creates account as "seller" role
2. Seller publishes product: `POST /products`
3. Product status = "draft"
4. Admin reviews: `POST /marketplace/products/{id}/approve`
5. Product status = "approved" → visible in marketplace
6. Sales appear in seller dashboard

### Deployment (Render/Fly/Railway)

```bash
# Set environment variables
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SECRET_KEY=change-me-in-prod

# Deploy
git push render main  # or fly deploy
```

## Database Schema

Core tables:
- `users` - buyers, sellers, admins
- `products` - marketplace listings
- `subscriptions` - active user subscriptions
- `licenses` - access grants tied to subscriptions
- `reviews` - user ratings and feedback

## Security Checklist

- ✅ JWT auth with token expiration
- ✅ Stripe webhook signature verification
- ✅ Role-based access control (buyer/seller/admin)
- ✅ Ownership checks on product edits
- ✅ License only granted after verified payment
- ✅ Password hashing
- ✅ Environment variable validation

## Next Steps

1. Connect to Supabase or managed Postgres
2. Set up Stripe account and test keys
3. Configure Redis cache
4. Deploy to Render/Fly/Railway
5. Wire frontend to API
6. Launch and monitor
