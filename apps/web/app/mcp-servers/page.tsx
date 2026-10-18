import Link from 'next/link';
import { SiteFooter } from '../../components/site-footer';
import { SiteNav } from '../../components/site-nav';
import { mcpServers } from '../../lib/mcp-servers';

export const metadata = {
  title: 'Open-source MCP servers | AI Marketplace',
  description: 'A practical directory of open-source MCP servers for files, Git, web research, memory, GitHub, and browser automation.',
};

export default function McpServersPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <section className="site-container page-hero">
        <div className="eyebrow">Open-source tool connections</div>
        <h1>Connect your AI workflow to useful MCP servers.</h1>
        <p>Explore a focused set of openly available servers for files, web research, Git, memory, GitHub, and browser automation. Each card links to the upstream source so you can review the current README, releases, license, and security notes before installing.</p>
        <div className="catalog-stat"><strong>{mcpServers.length}</strong><span>curated servers to start with</span></div>
        <div className="hero-actions"><Link href="/courses/agentic-ai-mcp-project-lab" className="button-primary">Learn MCP safely →</Link><Link href="/connect" className="button-secondary">Get implementation guidance</Link></div>
      </section>

      <section className="site-container section-tight">
        <div className="mcp-grid">
          {mcpServers.map((server) => (
            <article className="mcp-card" key={server.slug}>
              <div className="card-meta"><span className="course-type">{server.category}</span><span>{server.license}</span></div>
              <h2>{server.name}</h2>
              <p className="mcp-maintainer">Maintained by {server.maintainer} · {server.status}</p>
              <p>{server.description}</p>
              <div className="tag-row">{server.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="mcp-use-case"><strong>Good fit for</strong><span>{server.bestFor}</span></div>
              <div className="mcp-install"><div>Quick start</div><code>{server.install}</code></div>
              <div className="mcp-links"><a href={server.sourceUrl} target="_blank" rel="noreferrer">View source ↗</a><a href={server.docsUrl} target="_blank" rel="noreferrer">Read docs ↗</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container section">
        <div className="surface-dark mcp-safety-panel">
          <div><div className="eyebrow" style={{ color: '#99f6e4' }}>Before you connect a server</div><h2>Keep tool access deliberate, scoped, and reviewable.</h2><p>Reference servers are useful learning material, but every integration should be evaluated for the data it can read, the actions it can take, and the credentials it receives.</p></div>
          <ul className="check-list mcp-safety-list"><li>Allow-list directories, repositories, tools, and domains.</li><li>Use least-privilege tokens and store secrets outside client config.</li><li>Start read-only, add approvals for writes, and keep audit logs.</li><li>Pin versions and re-check upstream security guidance before production use.</li></ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
