'use client';

import Link from 'next/link';
import { useState } from 'react';
import { trackActivity } from '../lib/activity';
import { getCurrentUser } from '../lib/supabase-auth';

export function SkillPurchaseButton({ slug, title, isFree }: { slug: string; title: string; isFree: boolean }) {
  const [saving, setSaving] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [error, setError] = useState('');

  async function recordAction() {
    setSaving(true);
    setNeedsLogin(false);
    setError('');
    try {
      const user = await getCurrentUser();
      if (!user) {
        setNeedsLogin(true);
        return;
      }
      await trackActivity({
        userId: user.id,
        eventType: isFree ? 'skill_purchase' : 'skill_purchase_intent',
        title: isFree ? `Added skill: ${title}` : `Purchase request: ${title}`,
        description: isFree ? `${title} was added to your marketplace activity.` : `Purchase interest recorded for ${title}; checkout will be connected next.`,
        resourceType: 'skill',
        resourceSlug: slug,
        metadata: { is_free: isFree },
      });
      setRecorded(true);
    } catch {
      setError('Could not save this activity. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 9, justifyItems: 'end' }}>
      <button type="button" onClick={() => { void recordAction(); }} disabled={saving || recorded} style={{ padding: '14px 22px', border: 0, borderRadius: 14, background: '#111827', color: 'white', fontWeight: 700, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.7 : 1 }}>
        {saving ? 'Saving…' : recorded ? 'Saved to activity ✓' : isFree ? 'Add to my library' : 'Record purchase interest'}
      </button>
      {needsLogin && <Link href={`/account?next=${encodeURIComponent(`/products/${slug}`)}`} style={{ color: '#0f766e', fontSize: 13, fontWeight: 800 }}>Sign in to continue →</Link>}
      {error && <div role="alert" style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>}
    </div>
  );
}
