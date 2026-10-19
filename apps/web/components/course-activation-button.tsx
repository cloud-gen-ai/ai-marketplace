'use client';

import Link from 'next/link';
import { useState } from 'react';
import { trackActivity } from '../lib/activity';
import { getCurrentUser } from '../lib/supabase-auth';

export function CourseActivationButton({ slug, title }: { slug: string; title: string }) {
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [error, setError] = useState('');

  async function activate() {
    setActivating(true);
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
        eventType: 'course_activation',
        title: `Activated course: ${title}`,
        description: `Started the learning path for ${title}.`,
        resourceType: 'course',
        resourceSlug: slug,
      });
      setActivated(true);
    } catch {
      setError('Could not save the activation. Please try again.');
    } finally {
      setActivating(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 9 }}>
      <button type="button" onClick={() => { void activate(); }} disabled={activating || activated} className="button-primary" style={{ border: 0, cursor: activating ? 'wait' : 'pointer', opacity: activating ? 0.7 : 1 }}>
        {activating ? 'Activating…' : activated ? 'Course activated ✓' : 'Activate this course'}
      </button>
      {needsLogin && <div style={{ fontSize: 13, color: '#0f766e' }}><Link href={`/account?next=${encodeURIComponent(`/courses/${slug}`)}`} style={{ fontWeight: 900 }}>Sign in to activate →</Link></div>}
      {error && <div role="alert" style={{ fontSize: 13, color: '#b91c1c' }}>{error}</div>}
    </div>
  );
}
