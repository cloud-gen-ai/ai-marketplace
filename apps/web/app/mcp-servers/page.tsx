import Link from 'next/link';
import { SiteFooter } from '../../components/site-footer';
import { SiteNav } from '../../components/site-nav';
import { aiTopics, mcpClients, mcpServers } from '../../lib/mcp-servers';

export const metadata = {
  title: 'Open-source MCP servers | AI Marketplace',
  description: 'A practical directory of open-source MCP servers, client SDKs, testing tools, and AI delivery topics.',
};

export default function McpServersPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <section className="site-container page-hero">
        <div className="eyebrow">Open-source tool connections</div>
        <h1>Build a safer AI workflow with MCP.</h1>
        <p>Explore open-source servers, client SDKs, testing tools, and practical AI learning paths. Each card links upstream so you can review the current README, releases, license, and security notes before installing.</p>
        <div className="catalog-stat"><strong>{mcpServers.length + mcpClients.length}</strong><span>curated server and client resources</span></div>
        <div className="hero-actions"><Link href="/courses/agentic-ai-mcp-project-lab" className="button-primary">Learn MCP safely →</Link><Link href="/connect" className="button-secondary">Get implementation guidance</Link></div>
      </section>

      <section className="site-container section-tight">
        <div className="section-heading"><div><div className="eyebrow">Open-source MCP servers</div><h2>Start with a focused server.</h2><p>Use these as learning references or pilot integrations. Confirm permissions, versions, and maintenance status before production use.</p></div></div>
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

      <section className="site-container section-tight">
        <div className="section-heading"><div><div className="eyebrow">Clients, SDKs, and testing</div><h2>Choose how you want to connect.</h2><p>Build a client in your preferred language, inspect a server locally, or use an open-source agent that already speaks MCP.</p></div></div>
        <div className="mcp-grid">
          {mcpClients.map((client) => (
            <article className="mcp-card" key={client.slug}>
              <div className="card-meta"><span className="course-type">{client.category}</span><span>{client.license}</span></div>
              <h2>{client.name}</h2>
              <p className="mcp-maintainer">Maintained by {client.maintainer} · {client.status}</p>
              <p>{client.description}</p>
              <div className="tag-row">{client.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="mcp-use-case"><strong>Good fit for</strong><span>{client.bestFor}</span></div>
              <div className="mcp-install"><div>Quick start</div><code>{client.setup}</code></div>
              <div className="mcp-links"><a href={client.sourceUrl} target="_blank" rel="noreferrer">View source ↗</a><a href={client.docsUrl} target="_blank" rel="noreferrer">Read docs ↗</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container section-tight">
        <div className="section-heading"><div><div className="eyebrow">AI topics to learn next</div><h2>Turn a connection into a working system.</h2><p>Short paths for the skills around MCP: retrieval, agents, security, observability, and production delivery.</p></div></div>
        <div className="insight-grid">
          {aiTopics.map((topic) => {
            const local = topic.resourceUrl.startsWith('/');
            return <article className="insight-card" key={topic.slug}>
              <div className="course-type">{topic.category}</div>
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
              <div className="tag-row">{topic.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <p className="mcp-maintainer">Best for: {topic.bestFor}</p>
              <a className="text-link" href={topic.resourceUrl} target={local ? undefined : '_blank'} rel={local ? undefined : 'noreferrer'}>{topic.sourceLabel} →</a>
            </article>;
          })}
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
