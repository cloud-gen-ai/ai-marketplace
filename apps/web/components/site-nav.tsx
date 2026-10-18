import Link from 'next/link';

export function SiteNav() {
  return (
    <header className="site-container site-nav">
      <Link href="/" className="brand-mark" aria-label="AI Marketplace home">
        <span className="brand-icon">AI</span>
        <span>AI Marketplace</span>
      </Link>
      <nav className="site-nav-links" aria-label="Primary navigation">
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/mentoring">Guidance</Link>
        <Link href="/courses">Courses</Link>
        <Link href="/services">Services</Link>
        <Link href="/mcp-servers">MCP servers</Link>
        <Link href="/insights">Insights</Link>
      </nav>
      <div className="inline-actions">
        <Link href="/connect" className="text-link" style={{ fontSize: 14, fontWeight: 800 }}>Contact</Link>
        <Link href="/account" className="text-link" style={{ fontSize: 14, fontWeight: 800 }}>Sign in</Link>
        <Link href="/studio" className="button-primary" style={{ minHeight: 40, padding: '0 14px' }}>Publish a skill</Link>
      </div>
    </header>
  );
}
