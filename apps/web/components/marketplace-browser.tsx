'use client';

import { useMemo, useState } from 'react';
import type { MarketplaceProduct } from '../lib/marketplace';
import { ProductCard } from './product-card';

export function MarketplaceBrowser({ products }: { products: MarketplaceProduct[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const categories = useMemo(() => ['All categories', ...Array.from(new Set(products.map((product) => product.category))).sort()], [products]);
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'All categories' || product.category === category;
      const searchable = [product.title, product.category, product.description, ...product.tags].join(' ').toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, products, query]);

  return (
    <>
      <div className="marketplace-toolbar">
        <input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search skills, tools, workflows, or topics" aria-label="Search the marketplace" />
        <select className="select-input" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">{categories.map((option) => <option key={option}>{option}</option>)}</select>
      </div>
      <div className="card-meta" style={{ marginBottom: 16 }}><span>{filteredProducts.length} offerings to explore</span><span>{query || category !== 'All categories' ? 'Filtered results' : 'Curated for practical work'}</span></div>
      {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state">No offerings match that search yet. Try a broader term or explore a course path.</div>}
    </>
  );
}
