'use client';

import { useEffect, useRef } from 'react';
import { trackActivity, type ActivityEventType } from '../lib/activity';
import { getCurrentUser } from '../lib/supabase-auth';

export function ActivityTracker({
  eventType,
  title,
  description,
  resourceType,
  resourceSlug,
}: {
  eventType: ActivityEventType;
  title: string;
  description?: string;
  resourceType: string;
  resourceSlug: string;
}) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void getCurrentUser().then((user) => {
      if (!user) return;
      return trackActivity({ userId: user.id, eventType, title, description, resourceType, resourceSlug });
    });
  }, [description, eventType, resourceSlug, resourceType, title]);

  return null;
}
