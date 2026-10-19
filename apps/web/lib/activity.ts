'use client';

import { getStoredAccessToken, getSupabaseConfig } from './supabase-auth';

export type ActivityEventType =
  | 'login'
  | 'account_created'
  | 'course_view'
  | 'course_activation'
  | 'skill_view'
  | 'skill_purchase'
  | 'skill_purchase_intent'
  | 'skill_download'
  | 'profile_update'
  | 'service_request';

export type ActivityEventInput = {
  userId: string;
  eventType: ActivityEventType;
  title: string;
  description?: string;
  resourceType?: string;
  resourceSlug?: string;
  metadata?: Record<string, unknown>;
};

export type ActivityEvent = {
  id: number;
  event_type: ActivityEventType;
  title: string;
  description: string | null;
  resource_type: string | null;
  resource_slug: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export async function trackActivity(input: ActivityEventInput): Promise<boolean> {
  const token = getStoredAccessToken();
  if (!token) return false;

  try {
    const { url, key } = getSupabaseConfig();
    const response = await fetch(`${url}/rest/v1/activity_events`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        user_id: input.userId,
        event_type: input.eventType,
        title: input.title.slice(0, 160),
        description: input.description?.slice(0, 500) || null,
        resource_type: input.resourceType || null,
        resource_slug: input.resourceSlug || null,
        metadata: input.metadata || {},
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function listActivity(userId: string): Promise<ActivityEvent[]> {
  const token = getStoredAccessToken();
  if (!token) return [];
  const { url, key } = getSupabaseConfig();
  const params = new URLSearchParams({
    select: 'id,event_type,title,description,resource_type,resource_slug,metadata,created_at',
    user_id: `eq.${userId}`,
    order: 'created_at.desc',
    limit: '100',
  });
  const response = await fetch(`${url}/rest/v1/activity_events?${params.toString()}`, {
    headers: { apikey: key, Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Could not load your activity history.');
  return await response.json() as ActivityEvent[];
}
