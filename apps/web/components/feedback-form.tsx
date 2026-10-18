'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { getCurrentUser, getSupabaseConfig, getStoredAccessToken, type MarketplaceUser } from '../lib/supabase-auth';

export function FeedbackForm() {
  const [user, setUser] = useState<MarketplaceUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ display_name: '', role_label: '', outcome: '', body: '', avatar_url: '', consent_public: false });

  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const metadata = currentUser.user_metadata || {};
        const displayName = typeof metadata.display_name === 'string' ? metadata.display_name : (currentUser.email?.split('@')[0] || '');
        const avatarUrl = typeof metadata.avatar_url === 'string' ? metadata.avatar_url : '';
        setForm((current) => ({ ...current, display_name: displayName, avatar_url: avatarUrl }));
      }
    }).catch(() => setError('Could not load your account.')).finally(() => setLoading(false));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setSaving(true); setError(''); setMessage('');
    try {
      const { url, key } = getSupabaseConfig();
      const token = getStoredAccessToken();
      if (!token) throw new Error('Your session has expired. Please sign in again.');
      const response = await fetch(`${url}/rest/v1/testimonials`, {
        method: 'POST',
        headers: { apikey: key, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ user_id: user.id, display_name: form.display_name.trim(), role_label: form.role_label.trim(), outcome: form.outcome.trim(), body: form.body.trim(), avatar_url: form.avatar_url.trim() || null, consent_public: true, status: 'published' }),
      });
      if (!response.ok) throw new Error('We could not publish this story. Check the fields and try again.');
      setMessage('Published. Your story is now visible in the community section.');
      setForm((current) => ({ ...current, role_label: '', outcome: '', body: '', consent_public: false }));
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'We could not publish this story.');
    } finally { setSaving(false); }
  }

  if (loading) return <div className="content-card feedback-form"><p>Checking your account…</p></div>;
  if (!user) return <div className="content-card feedback-form"><div className="eyebrow">Sign in required</div><h2>Use your account to publish feedback.</h2><p>We attach each submission to its author so people can manage their own story safely.</p><Link href="/account" className="button-primary" style={{ marginTop: 14 }}>Sign in or create an account</Link></div>;

  return <form className="content-card feedback-form" onSubmit={submit}>
    <div className="eyebrow">Publish a story</div><h2>Your feedback</h2>
    <div className="feedback-fields">
      <label>Display name<input required minLength={2} maxLength={80} value={form.display_name} onChange={(event) => setForm({ ...form, display_name: event.target.value })} placeholder="Your name" /></label>
      <label>Role or context<input required minLength={2} maxLength={120} value={form.role_label} onChange={(event) => setForm({ ...form, role_label: event.target.value })} placeholder="AI Engineer / learner / builder" /></label>
      <label className="feedback-full">Outcome headline<input required minLength={2} maxLength={160} value={form.outcome} onChange={(event) => setForm({ ...form, outcome: event.target.value })} placeholder="Received multiple AI engineering offers" /></label>
      <label className="feedback-full">Your story<textarea required minLength={30} maxLength={1200} rows={6} value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} placeholder="What changed, what did you build or learn, and what support helped?" /></label>
      <label className="feedback-full">Profile photo URL <span className="field-hint">optional</span><input type="url" value={form.avatar_url} onChange={(event) => setForm({ ...form, avatar_url: event.target.value })} placeholder="https://…" /></label>
    </div>
    <label className="consent-row"><input required type="checkbox" checked={form.consent_public} onChange={(event) => setForm({ ...form, consent_public: event.target.checked })} /> <span>I have permission to publish this story, name, and photo publicly.</span></label>
    {error && <div className="form-error">{error}</div>}{message && <div className="form-success">{message}</div>}
    <button type="submit" className="button-primary" disabled={saving}>{saving ? 'Publishing…' : 'Publish feedback'}</button>
  </form>;
}
