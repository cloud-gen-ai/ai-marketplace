import Link from 'next/link';
import { getMarketplaceProducts } from '../lib/marketplace';
import { SiteFooter } from '../components/site-footer';
import { SiteNav } from '../components/site-nav';
import { ProductCard } from '../components/product-card';
import { corporateServices, insightCatalog, learningPaths, platformFeatures, toolGuides } from '../lib/experience';
import { CommunityFeedback } from '../components/community-feedback';

export default async function HomePage() {
  const productCatalog = await getMarketplaceProducts();
  const featuredProducts = productCatalog.slice(0, 4);

  return (
    <main className="site-shell">
      <SiteNav />

      <section className="site-container hero-section">
        <div>
          <div className="eyebrow">A practical home for AI builders</div>
          <h1 className="hero-title">Learn faster. Build better. Ship with confidence.</h1>
          <p className="hero-copy">Discover reusable AI skills, focused courses, and human guidance for the work that comes after the first demo.</p>
          <div className="hero-actions">
            <Link href="/marketplace" className="button-primary">Explore the marketplace <span aria-hidden="true">→</span></Link>
            <Link href="/mentoring" className="button-secondary">Talk to a mentor</Link>
          </div>
          <div className="hero-note"><span>Real project workflows</span><span>Learn at your pace</span><span>Human support when needed</span></div>
        </div>

        <div className="hero-panel" aria-label="AI Marketplace learning flow">
          <div className="hero-panel-inner">
            <div className="hero-panel-label">Your next AI move</div>
            <h2>One place to go from curious to capable.</h2>
            <p>Start with a reusable asset. Add context from a course. Bring the hard part to a mentor.</p>
            <div className="hero-flow">
              <div className="hero-flow-item"><span className="step-number">1</span><div><strong>Choose a workflow</strong><small>RAG, agents, coding, evaluation</small></div></div>
              <div className="hero-flow-item"><span className="step-number">2</span><div><strong>Make it yours</strong><small>Read, adapt, and apply it to your project</small></div></div>
              <div className="hero-flow-item"><span className="step-number">3</span><div><strong>Get unstuck</strong><small>Ask for focused human guidance</small></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container section-tight">
        <div className="section-heading">
          <div><div className="eyebrow">Everything in one place</div><h2>Useful AI support at every stage of the journey.</h2></div>
          <Link href="/marketplace" className="text-link" style={{ color: '#0f766e', fontWeight: 900 }}>See all offerings →</Link>
        </div>
        <div className="feature-grid">
          {platformFeatures.map((feature) => <Link key={feature.title} href={feature.href} className="feature-card" style={{ textDecoration: 'none' }}><div className="feature-card-icon">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.description}</p></Link>)}
        </div>
      </section>

      <section className="site-container section-tight">
        <div className="section-heading"><div><div className="eyebrow">For teams and companies</div><h2>Practical AI upskilling and delivery support.</h2><p>From workshops to ongoing AI / IT support, connect with us when your team needs a clear path from interest to responsible adoption.</p></div><Link href="/services" className="text-link" style={{ color: '#0f766e', fontWeight: 900 }}>Explore services →</Link></div>
        <div className="service-grid">{corporateServices.map((service) => <article className="content-card service-card" key={service.title}><div className="feature-card-icon">✦</div><h3>{service.title}</h3><p>{service.description}</p><Link href="/connect" className="text-link" style={{ display: 'inline-block', marginTop: 18, color: '#0f766e', fontWeight: 900 }}>Discuss this →</Link></article>)}</div>
      </section>

      <section className="site-container section">
        <div className="section-heading"><div><div className="eyebrow">Curated marketplace</div><h2>Start with a proven building block.</h2><p>Browse practical packs made for real engineering, product, and career workflows. Read the contents before you download.</p></div><Link href="/marketplace" className="button-secondary">Browse all skills</Link></div>
        <div className="product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="site-container section">
        <div className="surface-dark" style={{ padding: '40px 34px' }}>
          <div className="section-heading" style={{ marginBottom: 24 }}><div><div className="eyebrow" style={{ color: '#99f6e4' }}>Work with your stack</div><h2 style={{ color: 'white' }}>Guidance for the tools and patterns you already use.</h2><p style={{ color: '#94a3b8' }}>Learn the workflow, not just the product name. Explore coding agents, model APIs, MCP, RAG, and operations in one connected library.</p></div></div>
          <div className="tool-strip">{toolGuides.map((tool) => <a key={tool.name} href={tool.href} className="tool-pill" target={tool.href.startsWith('http') ? '_blank' : undefined} rel={tool.href.startsWith('http') ? 'noreferrer' : undefined}>{tool.name}<span aria-hidden="true">↗</span></a>)}</div>
        </div>
      </section>

      <section className="site-container section">
        <div className="section-heading"><div><div className="eyebrow">A simple path forward</div><h2>Learn something. Use it. Get better at the work.</h2></div></div>
        <div className="path-grid">{learningPaths.map((path) => <div className="path-card" key={path.number}><div className="step-number">{path.number}</div><h3 style={{ margin: '24px 0 9px', fontSize: 22 }}>{path.title}</h3><p>{path.description}</p></div>)}</div>
      </section>

      <section className="site-container section-tight">
        <div className="section-heading"><div><div className="eyebrow">From the field</div><h2>Ideas to help you make better AI decisions.</h2></div><Link href="/insights" className="text-link" style={{ color: '#0f766e', fontWeight: 900 }}>Read insights →</Link></div>
        <div className="insight-grid">{insightCatalog.slice(0, 3).map((insight) => <article className="insight-card" key={insight.title}><div className="course-type">{insight.type}</div><h3>{insight.title}</h3><p>{insight.description}</p><a href={insight.href} className="text-link" style={{ display: 'inline-block', marginTop: 20, color: '#0f766e', fontSize: 13, fontWeight: 900 }} target={insight.href.startsWith('http') ? '_blank' : undefined} rel={insight.href.startsWith('http') ? 'noreferrer' : undefined}>Read more →</a></article>)}</div>
      </section>

      <CommunityFeedback />

      <section className="site-container section">
        <div className="cta-panel"><div><div className="eyebrow" style={{ color: '#99f6e4' }}>Build your next chapter</div><h2>Have a goal, a project, or a question?</h2><p>Start with the marketplace, explore a course, or book focused guidance. The right next step is usually smaller and more practical than you think.</p></div><div className="inline-actions"><Link href="/courses" className="button-light">Explore courses</Link><Link href="/mentoring" className="button-secondary" style={{ borderColor: '#475569', background: 'transparent', color: 'white' }}>Find guidance</Link></div></div>
      </section>

      <SiteFooter />
    </main>
  );
}
