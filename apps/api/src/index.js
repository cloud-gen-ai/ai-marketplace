import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { productCatalog, stats, formatPrice } from '@ai-marketplace/shared';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'ai-marketplace-api' });
});

app.get('/api/marketplace/summary', (_, res) => {
  res.json({
    stats,
    featured: productCatalog.slice(0, 4)
  });
});

app.get('/api/marketplace/products', (_, res) => {
  res.json({
    items: productCatalog,
    count: productCatalog.length
  });
});

app.get('/api/marketplace/products/:slug', (req, res) => {
  const product = productCatalog.find((item) => item.slug === req.params.slug);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json({ product });
});

app.get('/api/pricing', (_, res) => {
  res.json({
    plans: [
      { name: 'Starter', price: 0, description: 'Explore free plugins and templates' },
      { name: 'Pro', price: 19, description: 'Full access to premium product packs' },
      { name: 'Team', price: 49, description: 'For product teams and agencies' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`AI Marketplace API listening on http://localhost:${PORT}`);
});
