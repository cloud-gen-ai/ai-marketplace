import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand-mark"><span className="brand-icon">AI</span><span>AI Marketplace</span></Link>
            <p style={{ maxWidth: 270, marginTop: 16 }}>Practical skills, guided learning, and human support for people building with AI.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/marketplace">Skill marketplace</Link>
            <Link href="/courses">AI courses</Link>
            <Link href="/mentoring">One-to-one guidance</Link>
            <Link href="/services">Corporate services</Link>
            <Link href="/connect">Book a free demo</Link>
            <Link href="/insights">AI insights</Link>
            <Link href="/feedback">Community feedback</Link>
          </div>
          <div>
            <h3>For creators</h3>
            <Link href="/studio">Publish a skill</Link>
            <Link href="/account">Create your profile</Link>
            <Link href="/pricing">Membership plans</Link>
          </div>
          <div>
            <h3>Build with confidence</h3>
            <p>Reusable workflows for coding agents, RAG, agentic systems, and AI operations.</p>
            <a href="mailto:nextgenai.soulation@gmail.com">nextgenai.soulation@gmail.com</a>
            <Link href="/connect">Create a profile to connect →</Link>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 AI Marketplace</span><span>Learn openly. Build responsibly. Ship deliberately.</span></div>
      </div>
    </footer>
  );
}
