import { notFound } from 'next/navigation';
import { formatPrice } from '@ai-marketplace/shared';
import { getMarketplaceProducts } from '../../../lib/marketplace';

export default async function ProductPage({ params }) {
  const productCatalog = await getMarketplaceProducts();
  const product = productCatalog.find((entry) => entry.slug === params.slug);
  const isImportedSkillPack = params.slug.startsWith('skill-pack-');

  if (!product) {
    notFound();
  }

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: 32 }}>
      <div style={{ background: 'white', borderRadius: 24, border: '1px solid #e5e7eb', padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ background: '#eef2ff', color: '#3730a3', padding: '8px 12px', borderRadius: 999, fontWeight: 700 }}>{product.category}</span>
          <span style={{ fontWeight: 700 }}>{product.rating} ★ ({product.reviews} reviews)</span>
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: 10 }}>{product.title}</h1>
        <p style={{ color: '#4b5563', fontSize: 18, lineHeight: 1.6 }}>{product.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '20px 0' }}>
          {product.tags.map((tag) => (
            <span key={tag} style={{ padding: '8px 10px', borderRadius: 999, background: '#f3f4f6', fontSize: 12 }}>{tag}</span>
          ))}
        </div>

        {isImportedSkillPack && (
          <div style={{ marginTop: 20, padding: 16, borderRadius: 14, background: '#ecfdf5', color: '#065f46', lineHeight: 1.5 }}>
            Read the included skills first. You can download this pack from the reader when you are ready.
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>Starting at</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>{formatPrice(product.price)}</div>
          </div>
          {isImportedSkillPack ? (
            <a href={`/skills/${product.slug}`} style={{ padding: '14px 22px', borderRadius: 14, background: '#111827', color: 'white', textDecoration: 'none', fontWeight: 700 }}>
              Access & read skills
            </a>
          ) : (
            <a href="/pricing" style={{ padding: '14px 22px', borderRadius: 14, background: '#111827', color: 'white', textDecoration: 'none', fontWeight: 700 }}>
              Start free trial
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
