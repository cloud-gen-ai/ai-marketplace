import Link from 'next/link';
import { notFound } from 'next/navigation';
import { careerSupport, courseCatalog } from '../../../lib/experience';
import { SiteFooter } from '../../../components/site-footer';
import { SiteNav } from '../../../components/site-nav';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courseCatalog.find((entry) => entry.slug === params.slug);
  if (!course) notFound();

  return (
    <main className="site-shell">
      <SiteNav />
      <section className="site-container page-hero">
        <Link href="/courses" className="text-link" style={{ color: '#0f766e', fontWeight: 900 }}>← All courses</Link>
        <div className="eyebrow" style={{ marginTop: 26 }}>{course.type} · {course.duration}</div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <div className="hero-actions"><Link href="/account" className="button-primary">Create a learning profile →</Link><Link href="/mentoring" className="button-secondary">Add one-to-one guidance</Link></div>
      </section>

      <section className="site-container section-tight course-detail-grid">
        <div className="content-card"><div className="eyebrow">Syllabus</div><h2>What you will work through</h2><ol className="syllabus-list">{course.syllabus.map((module, index) => <li key={module}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{module}</strong><p>Read the concept, apply it to a small task, and capture evidence in your project notes.</p></div></li>)}</ol></div>
        <div className="content-card"><div className="eyebrow">Final outcome</div><h2>What you should be able to do</h2><ul className="check-list">{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul><div className="course-summary"><strong>{course.price}</strong><span>{course.level}</span><span>Reference-led and project-based</span></div></div>
      </section>

      <section className="site-container section-tight"><div className="career-panel"><div><div className="eyebrow" style={{ color: '#99f6e4' }}>Included career accelerator</div><h2>Finish with a stronger professional profile.</h2><p>The course can be paired with practical career support. It is guidance and review, not a promise of employment.</p></div><ul>{careerSupport.map((item) => <li key={item}>{item}</li>)}</ul></div></section>

      <section className="site-container section-tight"><div className="section-heading"><div><div className="eyebrow">Open references</div><h2>Continue with trusted documentation.</h2><p>These links are public references used to frame the learning path. Always check the source terms and current version.</p></div></div><div className="tool-strip">{course.references.map((reference) => <a key={reference.href} className="tool-pill" href={reference.href} target="_blank" rel="noreferrer">{reference.label} ↗</a>)}</div></section>

      <SiteFooter />
    </main>
  );
}
