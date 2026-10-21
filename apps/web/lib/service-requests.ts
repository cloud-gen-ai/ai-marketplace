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
    `AI Marketplace request: ${input.service_type}`,
    `Preferred time: ${input.preferred_date || 'To be confirmed'} ${input.preferred_time || ''} (${input.timezone || 'Asia/Kolkata'})`,
    `Agenda: ${input.message}`,
    'Team contact: nextgenai.soulation@gmail.com',
    'Open Google Calendar, confirm the time, choose Add Google Meet, then save and send the invite.',
  ].join('\n');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `AI Marketplace — ${input.service_type}`,
    details,
    location: 'Google Meet',
  });
  // Google Calendar opens a pre-addressed event draft. The user confirms the
  // time and selects "Add Google Meet" before saving the invite.
  params.set('add', 'nextgenai.soulation@gmail.com');
  if (input.preferred_date && input.preferred_time) {
    const [hours, minutes] = input.preferred_time.split(':').map(Number);
    if (Number.isInteger(hours) && Number.isInteger(minutes)) {
      const startTotal = hours * 60 + minutes;
      const endTotal = startTotal + 30;
      const startDate = new Date(`${input.preferred_date}T00:00:00Z`);
      const endDate = new Date(startDate);
      endDate.setUTCDate(endDate.getUTCDate() + Math.floor(endTotal / 1440));
      const datePart = (date: Date) => date.toISOString().slice(0, 10).replaceAll('-', '');
      const timePart = (total: number) => `${String(Math.floor((total % 1440) / 60)).padStart(2, '0')}${String(total % 60).padStart(2, '0')}00`;
      params.set('dates', `${datePart(startDate)}T${timePart(startTotal)}/${datePart(endDate)}T${timePart(endTotal)}`);
      params.set('ctz', input.timezone || 'Asia/Kolkata');
    }
  }
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildContactMailto(input: Pick<ServiceRequestInput, 'requester_name' | 'email' | 'organization' | 'service_type' | 'preferred_date' | 'preferred_time' | 'timezone' | 'message'>) {
  const subject = encodeURIComponent(`Session request — ${input.service_type} — ${input.requester_name}`);
  const body = encodeURIComponent([
    'Dear NextGen AI Team,',
    '',
    'I would like to schedule a session through the AI Marketplace. Please review the details below and confirm a suitable time with a Google Meet invitation.',
    '',
    'REQUEST DETAILS',
    `Name: ${input.requester_name}`,
    `Email: ${input.email}`,
    `Organization: ${input.organization || 'Individual'}`,
    `Service: ${input.service_type}`,
    `Preferred date: ${input.preferred_date || 'To be confirmed'}`,
    `Preferred time: ${input.preferred_time || 'To be confirmed'}`,
    `Timezone: ${input.timezone || 'Asia/Kolkata'}`,
    '',
    'DISCUSSION TOPIC',
    input.message,
    '',
    'Please confirm the final time and share the Google Meet link or calendar invitation.',
    '',
    'Kind regards,',
    input.requester_name,
    input.email,
  ].join('\n'));
  return `mailto:nextgenai.soulation@gmail.com?subject=${subject}&body=${body}`;
}
