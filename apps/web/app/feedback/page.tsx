import Link from 'next/link';
import { SiteFooter } from '../../components/site-footer';
import { SiteNav } from '../../components/site-nav';
import { FeedbackForm } from '../../components/feedback-form';

export default function FeedbackPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <section className="site-container page-hero">
        <div className="eyebrow">Community feedback</div>
        <h1>Share the outcome you are proud of.</h1>
        <p>Tell the community what changed after a course, skill, project, or mentoring session. Your story is published immediately only when you explicitly give public consent.</p>
        <Link href="/#community-feedback" className="text-link" style={{ display: 'inline-block', marginTop: 20, color: '#0f766e', fontWeight: 900 }}>← See the community wall</Link>
      </section>
      <section className="site-container section-tight">
        <div className="feedback-layout">
          <div className="content-card">
            <div className="eyebrow">A thoughtful note</div>
            <h2>Make it useful for the next builder.</h2>
            <p>Describe the result, the context, and the support that helped. Please do not include private offer letters, phone numbers, or confidential employer information.</p>
            <ul className="check-list"><li>Use your own experience or submit with the subject’s permission.</li><li>Add a public profile photo only if you have permission to share it.</li><li>You can remove your own published story later by contacting the marketplace team.</li></ul>
          </div>
          <FeedbackForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
