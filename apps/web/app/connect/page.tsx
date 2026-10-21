'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { createServiceRequest, buildContactMailto, buildDemoCalendarUrl } from '../../lib/service-requests';
import { getCurrentUser, type MarketplaceUser } from '../../lib/supabase-auth';
import { trackActivity } from '../../lib/activity';
import { SiteFooter } from '../../components/site-footer';
import { SiteNav } from '../../components/site-nav';

const services = [
  ['free-demo', 'Free platform demo', 'See the marketplace, learning paths, and the right starting point for your goal.'],
  ['one-to-one-mentoring', 'One-to-one AI mentoring', 'Architecture decisions, RAG, agentic systems, tooling, and delivery planning.'],
  ['career-guidance', 'Career guidance', 'A practical plan for your AI engineering profile, portfolio, and next role.'],
  ['interview-preparation', 'Interview preparation', 'Python, DSA, GenAI system design, project storytelling, and mock rounds.'],
  ['ai-course', 'AI course recommendation', 'Choose a focused path for RAG, agents, coding tools, evaluation, or AI operations.'],
  ['corporate-training', 'Corporate AI upskilling', 'Role-based workshops and hands-on programs for engineering, product, and leadership teams.'],
  ['corporate-ai-it-support', 'Corporate AI / IT support', 'Adoption guidance, coding-agent workflows, RAG enablement, governance, and delivery support.'],
] as const;

const initialForm = {
  requester_name: '',
  email: '',
  organization: '',
  service_type: 'free-demo',
  preferred_date: '',
  preferred_time: '',
  timezone: 'Asia/Kolkata',
  message: 'I would like a free introduction to the AI Marketplace and guidance on the best next step.',
};

export default function ConnectPage() {
  const [user, setUser] = useState<MarketplaceUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const displayName = typeof currentUser.user_metadata?.display_name === 'string' ? currentUser.user_metadata.display_name : '';
        setForm((current) => ({ ...current, requester_name: displayName, email: currentUser.email || '' }));
      }
    }).catch(() => setError('Could not load your account.')).finally(() => setLoading(false));
  }, []);

  const selectedService = useMemo(() => services.find(([value]) => value === form.service_type)?.[1] || 'AI Marketplace request', [form.service_type]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setSaving(true); setError(''); setMessage('');
    try {
      await createServiceRequest({ ...form, user_id: user.id });
      await trackActivity({
        userId: user.id,
        eventType: 'service_request',
        title: `Requested: ${selectedService}`,
        description: 'Submitted a private guidance or demo request.',
        resourceType: 'service',
        resourceSlug: form.service_type,
        metadata: { organization: form.organization || null },
      });
      setMessage('Request received and added to your activity. We will reply from nextgenai.soulation@gmail.com with the confirmed Google Meet invite.');
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Could not submit your request.');
    } finally { setSaving(false); }
  }

  const mailto = buildContactMailto({ ...form, service_type: selectedService });
  const calendarUrl = buildDemoCalendarUrl({ ...form, service_type: selectedService });

  return (
    <main className="site-shell">
      <SiteNav />
      <section className="site-container page-hero">
        <div className="eyebrow">Connect with NextGen AI</div>
        <h1>Bring your goal. We’ll help plan the next move.</h1>
        <p>Request a free demo, one-to-one mentoring, career or interview guidance, AI courses, or a corporate training and AI IT-support conversation.</p>
        <div className="hero-actions"><a href="mailto:nextgenai.soulation@gmail.com" className="button-primary">Email our team →</a><Link href="/marketplace" className="button-secondary">Browse marketplace</Link></div>
      </section>

      <section className="site-container section-tight">
        <div className="service-request-layout">
          <div className="service-request-copy">
            <div className="eyebrow">What can we help with?</div>
            <h2>Practical support for individual builders and teams.</h2>
            <div className="service-list">{services.map(([value, title, description]) => <button type="button" className={`service-choice${form.service_type === value ? ' is-selected' : ''}`} key={value} onClick={() => setForm((current) => ({ ...current, service_type: value }))}><span className="service-choice-icon">✦</span><span><strong>{title}</strong><small>{description}</small></span></button>)}</div>
          </div>

          <div className="content-card service-request-card">
            <div className="eyebrow">Free demo and booking request</div>
            <h2>{user ? 'Choose a time to connect' : 'Sign in to request a session'}</h2>
            <p className="service-request-note">Your request is private and linked to your profile. We’ll confirm the exact Google Meet invite by email.</p>
            {loading ? <p>Checking your account…</p> : !user ? <div className="auth-gate"><p>Sign in to submit a request and track your profile-linked conversation. You can still email us directly without an account.</p><div className="inline-actions"><Link href="/account?next=%2Fconnect" className="button-primary">Sign in or create account</Link><a href="mailto:nextgenai.soulation@gmail.com" className="button-secondary">Email directly</a></div></div> : <form onSubmit={submit} className="service-request-form">
              <div className="feedback-fields"><label>Name<input required minLength={2} maxLength={100} value={form.requester_name} onChange={(event) => setForm({ ...form, requester_name: event.target.value })} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label>Organization <span className="field-hint">optional</span><input value={form.organization} onChange={(event) => setForm({ ...form, organization: event.target.value })} placeholder="Company or individual" /></label><label>Service<select value={form.service_type} onChange={(event) => setForm({ ...form, service_type: event.target.value })}>{services.map(([value, title]) => <option key={value} value={value}>{title}</option>)}</select></label><label>Preferred date <span className="field-hint">optional</span><input type="date" value={form.preferred_date} onChange={(event) => setForm({ ...form, preferred_date: event.target.value })} /></label><label>Preferred time <span className="field-hint">optional</span><input type="time" value={form.preferred_time} onChange={(event) => setForm({ ...form, preferred_time: event.target.value })} /></label><label className="feedback-full">Timezone<select value={form.timezone} onChange={(event) => setForm({ ...form, timezone: event.target.value })}><option>Asia/Kolkata</option><option>Asia/Singapore</option><option>Europe/London</option><option>Europe/Berlin</option><option>America/New_York</option><option>UTC</option></select></label><label className="feedback-full">What would you like to discuss?<textarea required minLength={10} maxLength={2000} rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label></div>
              {error && <div className="form-error">{error}</div>}{message && <div className="form-success">{message}</div>}
              <div className="inline-actions"><button type="submit" className="button-primary" disabled={saving}>{saving ? 'Sending request…' : 'Request free demo'}</button><a href={calendarUrl} className="button-secondary" target="_blank" rel="noreferrer">Schedule Google Meet ↗</a><a href={mailto} className="text-link">Open professional email draft</a></div>
              <p className="service-request-note" style={{ marginBottom: 0 }}>Schedule Google Meet opens Google Calendar with your service, preferred time, agenda, and the NextGen AI email pre-filled. Confirm the event, choose <strong>Add Google Meet</strong>, then save and send the invite.</p>
            </form>}
            <p className="contact-email">Contact: <a href="mailto:nextgenai.soulation@gmail.com">nextgenai.soulation@gmail.com</a></p>
          </div>
        </div>
      </section>

      <section className="site-container section"><div className="cta-panel"><div><div className="eyebrow" style={{ color: '#99f6e4' }}>For companies</div><h2>Upskill your team and make AI adoption practical.</h2><p>We can scope role-based workshops, coding-agent enablement, RAG and agentic AI delivery support, and ongoing corporate AI / IT guidance.</p></div><a href="mailto:nextgenai.soulation@gmail.com?subject=Corporate%20AI%20training%20and%20support" className="button-light">Discuss a company plan</a></div></section>
      <SiteFooter />
    </main>
  );
}
