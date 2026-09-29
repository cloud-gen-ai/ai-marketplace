import { productCatalog, formatPrice } from '@ai-marketplace/shared';

export default function HomePage() {
  return (
    <main style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b7280' }}>AI Marketplace</div>
            <h1 style={{ margin: '8px 0 0', fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>Sell reusable AI skills, prompts, and plugin packs.</h1>
          </div>
          <button style={{ background: '#111827', color: 'white', border: 'none', borderRadius: 999, padding: '12px 18px', fontWeight: 700 }}>
            Join marketplace
          </button>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18, marginBottom: 40 }}>
          {[
            { label: 'Products', value: '142+' },
            { label: 'Creators', value: '38' },
            { label: 'Subscribers', value: '4.1K' },
            { label: 'Avg rating', value: '4.8/5' }
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 18, padding: 20 }}>
              <div style={{ color: '#6b7280', fontSize: 14 }}>{stat.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 10 }}>{stat.value}</div>
            </div>
          ))}
        </section>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ margin: 0 }}>Featured products</h2>
            <a href="/marketplace" style={{ color: '#111827', fontWeight: 700 }}>Browse all →</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 18 }}>
            {productCatalog.map((product) => (
              <article key={product.id} style={{ border: '1px solid #e5e7eb', borderRadius: 22, padding: 20, background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ background: '#eef2ff', color: '#3730a3', borderRadius: 999, padding: '6px 10px', fontSize: 12, fontWeight: 700 }}>{product.category}</span>
                  <span style={{ fontWeight: 700 }}>{product.rating} ★</span>
                </div>
                <h3 style={{ margin: '0 0 10px', fontSize: 22 }}>{product.title}</h3>
                <p style={{ margin: '0 0 16px', color: '#4b5563', lineHeight: 1.6 }}>{product.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                  {product.tags.map((tag) => (
                    <span key={tag} style={{ background: '#f3f4f6', borderRadius: 999, padding: '6px 10px', fontSize: 12, color: '#374151' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: 26 }}>{formatPrice(product.price)}</strong>
                  <a href={`/products/${product.slug}`} style={{ background: '#111827', color: 'white', borderRadius: 12, padding: '10px 14px', textDecoration: 'none' }}>
                    View product
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
