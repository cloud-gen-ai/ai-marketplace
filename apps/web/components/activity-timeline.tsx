'use client';

import { useEffect, useMemo, useState } from 'react';
import { listActivity, type ActivityEvent } from '../lib/activity';

const eventLabels: Record<string, string> = {
  login: 'Login',
  account_created: 'Account created',
  course_view: 'Course viewed',
  course_activation: 'Course activated',
  skill_view: 'Skill viewed',
  skill_purchase: 'Skill added',
  skill_purchase_intent: 'Purchase interest',
  skill_download: 'Skill downloaded',
  profile_update: 'Profile updated',
  service_request: 'Service request',
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export function ActivityTimeline({ userId }: { userId: string }) {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    listActivity(userId).then((items) => {
      if (active) setEvents(items);
    }).catch((reason: unknown) => {
      if (active) setError(reason instanceof Error ? reason.message : 'Could not load activity history.');
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [userId]);

  const summary = useMemo(() => ({
    downloads: events.filter((event) => event.event_type === 'skill_download').length,
    courses: events.filter((event) => event.event_type === 'course_activation').length,
    purchases: events.filter((event) => ['skill_purchase', 'skill_purchase_intent'].includes(event.event_type)).length,
  }), [events]);

  return (
    <section style={{ marginTop: 20, background: 'white', border: '1px solid #e2e8f0', borderRadius: 22, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: '#0f766e', fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Your activity</div>
          <h2 style={{ margin: '8px 0 4px' }}>Learning and marketplace history</h2>
          <p style={{ margin: 0, color: '#64748b', lineHeight: 1.55 }}>Your login, course, skill, and download activity is private to this profile.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {([['Downloads', summary.downloads], ['Courses', summary.courses], ['Purchases', summary.purchases]] as const).map(([label, value]) => <span key={label} style={{ padding: '8px 10px', borderRadius: 999, background: '#f0fdfa', color: '#0f766e', fontSize: 12, fontWeight: 800 }}>{label}: {value}</span>)}
        </div>
      </div>
      {loading && <p style={{ marginBottom: 0, color: '#64748b' }}>Loading activity…</p>}
      {error && <p role="alert" style={{ marginBottom: 0, color: '#b91c1c' }}>{error}</p>}
      {!loading && !error && !events.length && <p style={{ marginBottom: 0, color: '#64748b' }}>Your activity will appear here after you open a course, activate a learning path, add a skill, or download a pack.</p>}
      {!loading && !error && events.length > 0 && <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
        {events.map((event) => <article key={event.id} style={{ display: 'grid', gridTemplateColumns: '10px minmax(0,1fr)', gap: 12, padding: '12px 0', borderTop: '1px solid #eef2f7' }}>
          <span aria-hidden="true" style={{ width: 10, height: 10, marginTop: 5, borderRadius: 999, background: '#14b8a6' }} />
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}><strong style={{ color: '#0f172a' }}>{event.title}</strong><time dateTime={event.created_at} style={{ color: '#64748b', fontSize: 12 }}>{formatDate(event.created_at)}</time></div>
            <div style={{ marginTop: 3, color: '#0f766e', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{eventLabels[event.event_type] || event.event_type.replaceAll('_', ' ')}</div>
            {event.description && <p style={{ margin: '5px 0 0', color: '#64748b', lineHeight: 1.5 }}>{event.description}</p>}
          </div>
        </article>)}
      </div>}
    </section>
  );
}
