import { notFound } from 'next/navigation';
import { formatPrice } from '@ai-marketplace/shared';
import { getMarketplaceProducts } from '../../../lib/marketplace';
import { getSkillPack } from '../../../lib/skill-packs';

export default async function SkillReaderPage({ params }) {
  const pack = getSkillPack(params.slug);
  if (!pack) notFound();

  const products = await getMarketplaceProducts();
  const product = products.find((entry) => entry.slug === params.slug);
  if (!product) notFound();

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', padding: '28px 20px 64px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <a href={`/products/${pack.slug}`} style={{ color: '#475569', textDecoration: 'none', fontWeight: 700 }}>← Back to product</a>

        <section style={{ marginTop: 22, background: '#0f172a', color: 'white', borderRadius: 28, padding: '34px 30px' }}>
          <div style={{ color: '#99f6e4', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Skill reader · {pack.category}</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '12px 0', lineHeight: 1.05 }}>{pack.title}</h1>
          <p style={{ maxWidth: 760, color: '#cbd5e1', fontSize: 18, lineHeight: 1.65, margin: 0 }}>{pack.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
            <span style={{ background: '#1e293b', borderRadius: 999, padding: '8px 12px', color: '#e2e8f0' }}>{pack.skills.length} included skills</span>
            <span style={{ background: '#1e293b', borderRadius: 999, padding: '8px 12px', color: '#e2e8f0' }}>Python package</span>
            <span style={{ background: '#1e293b', borderRadius: 999, padding: '8px 12px', color: '#e2e8f0' }}>{formatPrice(product.price)}</span>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginTop: 22 }}>
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 22, padding: 24 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>Included skills</h2>
            <p style={{ color: '#64748b', marginTop: 0 }}>Review what is inside before downloading.</p>
            <div style={{ display: 'grid', gap: 10 }}>
              {pack.skills.map((skill, index) => (
                <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 12, background: '#f8fafc' }}>
                  <span style={{ width: 26, height: 26, borderRadius: 999, display: 'grid', placeItems: 'center', background: '#ccfbf1', color: '#0f766e', fontWeight: 800, fontSize: 12 }}>{index + 1}</span>
                  <code style={{ color: '#1e293b' }}>{skill}</code>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 22, padding: 24 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>How to use it</h2>
            <ol style={{ color: '#475569', lineHeight: 1.8, paddingLeft: 22 }}>
              <li>Review the skill names and choose the workflows you need.</li>
              <li>Download the pack when you are ready to run it locally.</li>
              <li>Install the requirements and list the available skills.</li>
            </ol>
            <pre style={{ overflowX: 'auto', background: '#0f172a', color: '#dbeafe', borderRadius: 14, padding: 16, fontSize: 13, lineHeight: 1.6 }}>{`python -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\npython -m ${pack.module} --list`}</pre>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 18 }}>
              <a href={`/downloads/skill-packs/${pack.slug}.zip`} download style={{ padding: '13px 17px', borderRadius: 12, background: '#0f172a', color: 'white', textDecoration: 'none', fontWeight: 800 }}>Download this pack</a>
              <a href="/marketplace" style={{ padding: '13px 17px', borderRadius: 12, border: '1px solid #cbd5e1', color: '#334155', textDecoration: 'none', fontWeight: 800 }}>Browse other packs</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
