import Link from 'next/link';

export function SiteNav() {
  return (
    <header className="site-container site-nav">
      <Link href="/" className="brand-mark" aria-label="AI Marketplace home">
        <span className="brand-icon">AI</span>
        <span>AI Marketplace</span>
      </Link>
      <nav className="site-nav-links" aria-label="Primary navigation">
        <span className="site-nav-priority-group">
          <Link href="/marketplace" className="site-nav-priority">Marketplace</Link>
          <Link href="/mcp-servers" className="site-nav-priority">MCP servers</Link>
          <Link href="/services" className="site-nav-priority">Services</Link>
        </span>
        <span className="site-nav-divider" aria-hidden="true" />
        <span className="site-nav-secondary-group">
          <Link href="/courses">Courses</Link>
          <Link href="/mentoring">Guidance</Link>
          <Link href="/insights">Insights</Link>
        </span>
      </nav>
      <div className="site-nav-actions">
        <Link href="/connect" className="site-nav-contact">Contact</Link>
        <Link href="/account" className="site-nav-signin">Sign in</Link>
        <Link href="/studio" className="button-primary site-nav-publish">Publish a skill</Link>
      </div>
    </header>
  );
}
