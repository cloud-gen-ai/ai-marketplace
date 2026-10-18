import Link from 'next/link';
import { SiteFooter } from '../../components/site-footer';
import { SiteNav } from '../../components/site-nav';
import { insightCatalog, toolGuides } from '../../lib/experience';

export default function InsightsPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <section className="site-container page-hero">
        <div className="eyebrow">Field notes for AI builders</div>
        <h1>Clearer thinking for the fast-moving parts of AI.</h1>
        <p>Short, useful notes about coding agents, RAG, MCP, AI careers, model choices, and the operating habits that make projects more reliable.</p>
        <div className="hero-actions"><Link href="/marketplace" className="button-primary">Explore related skills →</Link><Link href="/courses" className="button-secondary">Learn by doing</Link></div>
      </section>
      <section className="site-container section-tight"><div className="insight-grid">{insightCatalog.map((insight) => <article className="insight-card" key={insight.title}><div className="course-type">{insight.type}</div><h3>{insight.title}</h3><p>{insight.description}</p><a href={insight.href} className="text-link" style={{ display: 'inline-block', marginTop: 22, color: '#0f766e', fontSize: 13, fontWeight: 900 }} target={insight.href.startsWith('http') ? '_blank' : undefined} rel={insight.href.startsWith('http') ? 'noreferrer' : undefined}>Read the guide →</a></article>)}</div></section>
      <section className="site-container section"><div className="content-card"><div className="eyebrow">Start with the tool you use</div><h2 style={{ marginTop: 10 }}>Official references, explained in a practical way.</h2><p>Use the public documentation as the source of truth, then use the marketplace for reusable workflows and human context.</p><div className="tool-strip">{toolGuides.slice(0, 6).map((tool) => <a key={tool.name} href={tool.href} className="tool-pill" target={tool.href.startsWith('http') ? '_blank' : undefined} rel={tool.href.startsWith('http') ? 'noreferrer' : undefined}>{tool.name} ↗</a>)}</div></div></section>
      <section className="site-container section"><div className="cta-panel"><div><div className="eyebrow" style={{ color: '#99f6e4' }}>Want this applied to your project?</div><h2>Turn a note into a working system.</h2><p>Pair a field note with a skill pack or a focused one-to-one session.</p></div><Link href="/mentoring" className="button-light">Find guidance</Link></div></section>
      <SiteFooter />
    </main>
  );
}
