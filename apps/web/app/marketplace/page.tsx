import Link from 'next/link';
import { getMarketplaceProducts } from '../../lib/marketplace';
import { MarketplaceBrowser } from '../../components/marketplace-browser';
import { SiteFooter } from '../../components/site-footer';
import { SiteNav } from '../../components/site-nav';
import { expandedSkillCount } from '../../lib/skills-catalog';

export default async function MarketplacePage() {
  const productCatalog = await getMarketplaceProducts({ fresh: true });

  return (
    <main className="site-shell">
      <SiteNav />
      <section className="site-container page-hero">
        <div className="eyebrow">The skill library</div>
        <h1>Find the next reusable piece of your AI workflow.</h1>
        <p>Browse skill packs, project playbooks, and practical assets for coding agents, RAG, agentic systems, security, and operations. Read first, then decide what fits.</p>
        <div className="catalog-stat"><strong>{expandedSkillCount.toLocaleString()}+</strong><span>free open-reference skill recipes across 17 AI domains</span></div>
        <div className="hero-actions"><Link href="/courses" className="button-primary">Explore learning paths →</Link><Link href="/mentoring" className="button-secondary">Need a recommendation?</Link></div>
      </section>
      <section className="site-container section-tight"><MarketplaceBrowser products={productCatalog} /></section>
      <section className="site-container section"><div className="cta-panel"><div><div className="eyebrow" style={{ color: '#99f6e4' }}>Can’t find the right fit?</div><h2>Bring your project and get a focused recommendation.</h2><p>A short guidance session can help you choose the right architecture, tool, course, or skill pack before you invest more time.</p></div><Link href="/mentoring" className="button-light">Talk to a mentor</Link></div></section>
      <SiteFooter />
    </main>
  );
}
