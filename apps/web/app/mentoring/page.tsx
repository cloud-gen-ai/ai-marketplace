import Link from 'next/link';
import { SiteFooter } from '../../components/site-footer';
import { SiteNav } from '../../components/site-nav';
import { mentoringOffers } from '../../lib/experience';

export default function MentoringPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <section className="site-container page-hero">
        <div className="eyebrow">One-to-one AI guidance</div>
        <h1>Bring the messy part. Leave with a clearer next step.</h1>
        <p>Get practical, focused support for your AI project, career direction, interview preparation, or day-to-day tool decisions.</p>
        <div className="hero-actions"><Link href="/account" className="button-primary">Request a session →</Link><Link href="/account" className="button-secondary">Create your profile</Link></div>
      </section>
      <section className="site-container section-tight"><div className="mentoring-grid">{mentoringOffers.map((offer) => <article className="content-card" key={offer.title}><div className="feature-card-icon">✦</div><h2 style={{ marginTop: 20 }}>{offer.title}</h2><p>{offer.description}</p><ul className="check-list">{offer.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div></section>
      <section className="site-container section"><div className="section-heading"><div><div className="eyebrow">A focused session</div><h2>Simple, structured, and tied to your outcome.</h2><p>Share your context before the session. Use the time for decisions, feedback, and a realistic next action—not a generic lecture.</p></div></div><div className="path-grid"><div className="path-card"><div className="step-number">1</div><h3 style={{ margin: '24px 0 9px', fontSize: 21 }}>Share the context</h3><p>Tell us what you are building, learning, or preparing for.</p></div><div className="path-card"><div className="step-number">2</div><h3 style={{ margin: '24px 0 9px', fontSize: 21 }}>Work the hard part</h3><p>Use the session to challenge assumptions and unblock progress.</p></div><div className="path-card"><div className="step-number">3</div><h3 style={{ margin: '24px 0 9px', fontSize: 21 }}>Leave with a plan</h3><p>Capture the next milestone, resources, and decisions to revisit.</p></div></div></section>
      <section className="site-container section"><div className="cta-panel"><div><div className="eyebrow" style={{ color: '#99f6e4' }}>Start the conversation</div><h2>Your next step does not need to be perfect.</h2><p>Create a profile so your goals and preferences are ready when you connect.</p></div><Link href="/account" className="button-light">Create your profile</Link></div></section>
      <SiteFooter />
    </main>
  );
}
