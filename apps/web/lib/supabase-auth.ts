'use client';

export type MarketplaceUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

type Session = {
  access_token: string;
  refresh_token?: string;
  user?: MarketplaceUser;
};

const SESSION_KEY = 'ai_marketplace_session';

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase Auth is not configured.');
  return { url, key };
}

export function getSupabaseConfig() {
  return config();
}

function readSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) as Session : null;
  } catch {
    return null;
  }
}

export function getStoredAccessToken(): string | null {
  return readSession()?.access_token || null;
}

function saveSession(session: Session | null) {
  if (typeof window === 'undefined') return;
  if (session) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else window.localStorage.removeItem(SESSION_KEY);
}

export function adoptRecoverySessionFromUrl(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  if (params.get('type') !== 'recovery' || !params.get('access_token')) return false;
  saveSession({
    access_token: params.get('access_token') as string,
    refresh_token: params.get('refresh_token') || undefined,
  });
  return true;
}

async function parseError(response: Response): Promise<string> {
  try {
    const body = await response.json() as { msg?: string; message?: string; error_description?: string };
    return body.error_description || body.msg || body.message || 'Authentication request failed.';
  } catch {
    return 'Authentication request failed.';
  }
}

async function refreshSession(session: Session): Promise<Session | null> {
  if (!session.refresh_token) return null;
  const { url, key } = config();
  const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });
  if (!response.ok) return null;
  const next = await response.json() as Session;
  saveSession(next);
  return next;
}

export async function signIn(email: string, password: string): Promise<MarketplaceUser> {
  const { url, key } = config();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const session = await response.json() as Session;
  saveSession(session);
  if (!session.user) throw new Error('Login succeeded, but the user profile was not returned.');
  return session.user;
}

export async function signUp(email: string, password: string, profile: Record<string, unknown>, redirectTo?: string) {
  const { url, key } = config();
  const redirectQuery = redirectTo ? `?redirect_to=${encodeURIComponent(redirectTo)}` : '';
  const response = await fetch(`${url}/auth/v1/signup${redirectQuery}`, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, data: profile }),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const result = await response.json() as Session & { user?: MarketplaceUser };
  if (result.access_token) saveSession(result);
  return result;
}

export async function requestPasswordReset(email: string, redirectTo: string) {
  const { url, key } = config();
  const response = await fetch(`${url}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error(await parseError(response));
}

export async function getCurrentUser(): Promise<MarketplaceUser | null> {
  let session = readSession();
  if (!session?.access_token) return null;
  const { url, key } = config();
  let response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: key, Authorization: `Bearer ${session.access_token}` },
  });
  if (response.status === 401) {
    session = await refreshSession(session);
    if (!session) {
      saveSession(null);
      return null;
    }
    response = await fetch(`${url}/auth/v1/user`, {
      headers: { apikey: key, Authorization: `Bearer ${session.access_token}` },
    });
  }
  if (!response.ok) return null;
  const user = await response.json() as MarketplaceUser;
  saveSession({ ...session, user });
  return user;
}

export async function updateProfile(profile: Record<string, unknown>): Promise<MarketplaceUser> {
  const session = readSession();
  if (!session?.access_token) throw new Error('Sign in before updating your profile.');
  const { url, key } = config();
  const response = await fetch(`${url}/auth/v1/user`, {
    method: 'PUT',
    headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: profile }),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const user = await response.json() as MarketplaceUser;
  saveSession({ ...session, user });
  return user;
}

export async function updatePassword(password: string): Promise<MarketplaceUser> {
  const session = readSession();
  if (!session?.access_token) throw new Error('Open the password reset link from your email before choosing a new password.');
  const { url, key } = config();
  const response = await fetch(`${url}/auth/v1/user`, {
    method: 'PUT',
    headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) throw new Error(await parseError(response));
  const user = await response.json() as MarketplaceUser;
  saveSession({ ...session, user });
  return user;
}

export async function signOut() {
  const session = readSession();
  if (session?.access_token) {
    const { url, key } = config();
    await fetch(`${url}/auth/v1/logout`, { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${session.access_token}` } }).catch(() => undefined);
  }
  saveSession(null);
}
