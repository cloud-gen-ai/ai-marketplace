'use client';

import { getStoredAccessToken, getSupabaseConfig } from './supabase-auth';

export type ServiceRequestInput = {
  user_id: string;
  requester_name: string;
  email: string;
  organization?: string;
  service_type: string;
  preferred_date?: string;
  preferred_time?: string;
  timezone?: string;
  meeting_provider?: string;
  message: string;
};

export async function createServiceRequest(input: ServiceRequestInput) {
  const { url, key } = getSupabaseConfig();
  const token = getStoredAccessToken();
  if (!token) throw new Error('Your session has expired. Please sign in again.');

  const response = await fetch(`${url}/rest/v1/service_requests`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      ...input,
      organization: input.organization?.trim() || null,
      preferred_date: input.preferred_date || null,
      preferred_time: input.preferred_time || null,
      timezone: input.timezone || 'Asia/Kolkata',
      meeting_provider: input.meeting_provider || 'Google Meet',
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    if (response.status === 404 || detail.toLowerCase().includes('service_requests')) {
      throw new Error('The request service is being enabled. Please email nextgenai.soulation@gmail.com directly for now.');
    }
    throw new Error(detail || 'Could not submit your request.');
  }
}

export function buildDemoCalendarUrl(input: Pick<ServiceRequestInput, 'service_type' | 'preferred_date' | 'preferred_time' | 'timezone' | 'message'>) {
  const details = [
    `Requested service: ${input.service_type}`,
    `Preferred time: ${input.preferred_date || 'To be confirmed'} ${input.preferred_time || ''} (${input.timezone || 'Asia/Kolkata'})`,
    `Agenda: ${input.message}`,
    'Please add a Google Meet link when confirming this request.',
  ].join('\n');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Free AI Marketplace Demo',
    details,
    location: 'Google Meet (link shared by NextGen AI after confirmation)',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildContactMailto(input: Pick<ServiceRequestInput, 'requester_name' | 'email' | 'organization' | 'service_type' | 'preferred_date' | 'preferred_time' | 'timezone' | 'message'>) {
  const subject = encodeURIComponent(`AI Marketplace request: ${input.service_type}`);
  const body = encodeURIComponent([
    `Name: ${input.requester_name}`,
    `Email: ${input.email}`,
    `Organization: ${input.organization || 'Individual'}`,
    `Service: ${input.service_type}`,
    `Preferred time: ${input.preferred_date || 'To be confirmed'} ${input.preferred_time || ''} (${input.timezone || 'Asia/Kolkata'})`,
    '',
    input.message,
  ].join('\n'));
  return `mailto:nextgenai.soulation@gmail.com?subject=${subject}&body=${body}`;
}
