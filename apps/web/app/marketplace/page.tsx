import { productCatalog, formatPrice } from '@ai-marketplace/shared';

export default function MarketplacePage() {
  return (
    <main style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.4rem', marginBottom: 24 }}>Marketplace</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
        {productCatalog.map((product) => (
          <article key={product.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 22, padding: 20, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ background: '#ecfeff', color: '#0f766e', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{product.category}</span>
              <span>{product.rating} ★</span>
            </div>
            <h2 style={{ margin: '16px 0 12px', fontSize: 24 }}>{product.title}</h2>
            <p style={{ color: '#4b5563', lineHeight: 1.6 }}>{product.description}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {product.tags.map((tag) => (
                <span key={tag} style={{ background: '#f3f4f6', padding: '6px 10px', borderRadius: 999, fontSize: 12 }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 26 }}>{formatPrice(product.price)}</strong>
              <a href={`/products/${product.slug}`} style={{ textDecoration: 'none', background: '#111827', color: 'white', padding: '10px 14px', borderRadius: 12 }}>View details</a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
