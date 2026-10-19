import { notFound } from 'next/navigation';
import { formatPrice } from '@ai-marketplace/shared';
import { getMarketplaceProducts } from '../../../lib/marketplace';
import { getSkillPack } from '../../../lib/skill-packs';
import { ProtectedDownloadButton } from '../../../components/protected-download-button';
import { SkillPurchaseButton } from '../../../components/skill-purchase-button';

function readableSkillName(value: string): string {
  return value.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function guideForSkill(skill: string, packTitle: string): string[] {
  const name = readableSkillName(skill);
  return [
    `${name} is a reusable workflow inside ${packTitle}.`,
    `Use it to turn a clear ${name.toLowerCase()} objective into structured, reviewable output.`,
    'Start with the context, constraints, and expected format, then validate the result before publishing it.',
  ];
}

export default async function SkillReaderPage({ params, searchParams }) {
  const products = await getMarketplaceProducts({ fresh: true });
  const product = products.find((entry) => entry.slug === params.slug);
  const staticPack = getSkillPack(params.slug);
  const metadataSkills = product?.metadata?.skills?.filter((skill): skill is string => typeof skill === 'string');
  const pack = staticPack || (product && metadataSkills?.length ? {
    slug: product.slug,
    directory: product.slug,
    module: 'skill_package',
    title: product.title,
    category: product.category,
    description: product.description,
    skills: metadataSkills,
  } : undefined);
  if (!product || !pack) notFound();

  const selectedSkill = (searchParams?.skill && pack.skills.includes(searchParams.skill)) ? searchParams.skill : pack.skills[0];
  const selectedSession = product.metadata?.sessions?.find((session) => session.title === selectedSkill);
  const guide = selectedSession ? [selectedSession.content] : guideForSkill(selectedSkill, pack.title);
  const downloadHref = staticPack ? `/downloads/skill-packs/${pack.slug}.zip` : `/api/skills/${pack.slug}/download`;
  const downloadLabel = staticPack ? 'Download this pack' : 'Download reader guide';
  const sourceUrl = typeof product.metadata?.source_url === 'string' ? product.metadata.source_url : undefined;
  const sourceLabel = typeof product.metadata?.source_label === 'string' ? product.metadata.source_label : 'Public reference';

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
            <span style={{ background: '#1e293b', borderRadius: 999, padding: '8px 12px', color: '#e2e8f0' }}>{product.price === 0 ? 'Free' : formatPrice(product.price)}</span>
          </div>
          {sourceUrl && <p style={{ margin: '18px 0 0', color: '#94a3b8', lineHeight: 1.6 }}>Reference: <a href={sourceUrl} target="_blank" rel="noreferrer" style={{ color: '#99f6e4' }}>{sourceLabel} ↗</a></p>}
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginTop: 22 }}>
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 22, padding: 24 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>Included skills</h2>
            <p style={{ color: '#64748b', marginTop: 0 }}>Review what is inside before downloading.</p>
            <div style={{ display: 'grid', gap: 10 }}>
              {pack.skills.map((skill, index) => (
                <a key={skill} href={`/skills/${pack.slug}?skill=${encodeURIComponent(skill)}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 12, background: selectedSkill === skill ? '#ccfbf1' : '#f8fafc', border: selectedSkill === skill ? '1px solid #5eead4' : '1px solid transparent', textDecoration: 'none' }}>
                  <span style={{ width: 26, height: 26, borderRadius: 999, display: 'grid', placeItems: 'center', background: '#ccfbf1', color: '#0f766e', fontWeight: 800, fontSize: 12 }}>{index + 1}</span>
                  <code style={{ color: '#1e293b', flex: 1 }}>{readableSkillName(skill)}</code>
                  <span style={{ color: '#0f766e', fontSize: 12, fontWeight: 800 }}>Read →</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 22, padding: 24 }}>
            <div style={{ color: '#0f766e', fontWeight: 800, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Read mode</div>
            <h2 style={{ margin: '8px 0', fontSize: 22 }}>{readableSkillName(selectedSkill)}</h2>
            <div style={{ display: 'grid', gap: 10, color: '#475569', lineHeight: 1.65 }}>
              {guide.map((paragraph) => <p key={paragraph} style={{ margin: 0 }}>{paragraph}</p>)}
            </div>
            {product.metadata?.sessions && product.metadata.sessions.length > 0 && (
              <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 10px' }}>Learning sessions</h3>
                {product.metadata.sessions.map((session) => (
                  <details key={session.title} style={{ marginBottom: 8 }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 700 }}>{session.title}</summary>
                    <p style={{ color: '#475569', lineHeight: 1.6 }}>{session.content}</p>
                  </details>
                ))}
              </div>
            )}
            <h3 style={{ margin: '24px 0 8px', fontSize: 18 }}>How to use it</h3>
            <ol style={{ color: '#475569', lineHeight: 1.8, paddingLeft: 22 }}>
              <li>Review the skill names and choose the workflows you need.</li>
              <li>Download the pack when you are ready to run it locally.</li>
              <li>Install the requirements and list the available skills.</li>
            </ol>
            <pre style={{ overflowX: 'auto', background: '#0f172a', color: '#dbeafe', borderRadius: 14, padding: 16, fontSize: 13, lineHeight: 1.6 }}>{`python -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\npython -m ${pack.module} --list`}</pre>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start', marginTop: 18 }}>
              <SkillPurchaseButton slug={pack.slug} title={pack.title} isFree={product.price === 0} />
              <ProtectedDownloadButton href={downloadHref} label={downloadLabel} title={pack.title} resourceSlug={pack.slug} returnPath={`/skills/${pack.slug}?skill=${encodeURIComponent(selectedSkill)}`} />
              <a href="/marketplace" style={{ padding: '13px 17px', borderRadius: 12, border: '1px solid #cbd5e1', color: '#334155', textDecoration: 'none', fontWeight: 800 }}>Browse other packs</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
