import Link from 'next/link';
import { SiteFooter } from '../../components/site-footer';
import { SiteNav } from '../../components/site-nav';
import { courseCatalog } from '../../lib/experience';

export default function CoursesPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <section className="site-container page-hero">
        <div className="eyebrow">AI learning paths</div>
        <h1>Courses built around outcomes, not endless tabs.</h1>
        <p>Choose a focused path for the work you want to do: build a reliable RAG system, ship an agent, become fluent with coding tools, or prepare for your next AI engineering conversation.</p>
        <div className="hero-actions"><Link href="/marketplace" className="button-primary">Browse reusable skills →</Link><Link href="/mentoring" className="button-secondary">Add human guidance</Link></div>
      </section>
      <section className="site-container section-tight"><div className="course-grid">{courseCatalog.map((course) => <article className="course-card" key={course.title}><div className="course-type">{course.type}</div><h3>{course.title}</h3><p>{course.description}</p><div className="course-price">{course.price}</div><div className="card-meta" style={{ marginTop: 12 }}><span>{course.level}</span><span style={{ color: '#0f766e' }}>View path →</span></div></article>)}</div></section>
      <section className="site-container section"><div className="section-heading"><div><div className="eyebrow">How to use the library</div><h2>Pair a course with something you can ship.</h2><p>Use a skill pack as the hands-on layer, then bring the decisions and trade-offs to a focused guidance session.</p></div></div><div className="path-grid"><div className="path-card"><div className="step-number">1</div><h3 style={{ margin: '24px 0 9px', fontSize: 21 }}>Learn the pattern</h3><p>Understand the mental model, vocabulary, and trade-offs.</p></div><div className="path-card"><div className="step-number">2</div><h3 style={{ margin: '24px 0 9px', fontSize: 21 }}>Apply it to a project</h3><p>Use a reusable workflow and capture what worked or failed.</p></div><div className="path-card"><div className="step-number">3</div><h3 style={{ margin: '24px 0 9px', fontSize: 21 }}>Review the next move</h3><p>Get expert feedback on scope, quality, and a realistic delivery plan.</p></div></div></section>
      <section className="site-container section"><div className="cta-panel"><div><div className="eyebrow" style={{ color: '#99f6e4' }}>Not sure where to start?</div><h2>Tell us what you want to build.</h2><p>We’ll help you choose a learning path that matches your current level and the outcome you care about.</p></div><Link href="/mentoring" className="button-light">Get a recommendation</Link></div></section>
      <SiteFooter />
    </main>
  );
}
