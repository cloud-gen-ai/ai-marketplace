'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { adoptRecoverySessionFromUrl, getCurrentUser, requestPasswordReset, signIn, signOut, signUp, updatePassword, updateProfile, type MarketplaceUser } from '../../lib/supabase-auth';

type ProfileForm = {
  display_name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  email_updates: boolean;
  public_profile: boolean;
  compact_mode: boolean;
};

const emptyProfile: ProfileForm = {
  display_name: '', username: '', bio: '', location: '', website: '',
  email_updates: true, public_profile: true, compact_mode: false,
};

function profileFromUser(user: MarketplaceUser): ProfileForm {
  const data = user.user_metadata || {};
  const settings = (data.settings || {}) as Record<string, unknown>;
  return {
    display_name: typeof data.display_name === 'string' ? data.display_name : '',
    username: typeof data.username === 'string' ? data.username : '',
    bio: typeof data.bio === 'string' ? data.bio : '',
    location: typeof data.location === 'string' ? data.location : '',
    website: typeof data.website === 'string' ? data.website : '',
    email_updates: settings.email_updates !== false,
    public_profile: settings.public_profile !== false,
    compact_mode: settings.compact_mode === true,
  };
}

export default function AccountPage() {
  const [user, setUser] = useState<MarketplaceUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [name, setName] = useState('');
  const [profile, setProfile] = useState<ProfileForm>(emptyProfile);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (adoptRecoverySessionFromUrl()) setMode('reset');
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      if (currentUser) setProfile(profileFromUser(currentUser));
    }).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Could not load your account.')).finally(() => setLoading(false));
  }, []);

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);
    try {
      if (mode === 'signup') {
        const result = await signUp(email.trim(), password, { display_name: name.trim(), username: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') });
        if (result.access_token && result.user) {
          setUser(result.user);
          setProfile(profileFromUser(result.user));
          setMessage('Account created. Your profile is ready to customize.');
        } else {
          setMessage('Account created. Check your email to confirm it, then sign in.');
          setMode('signin');
        }
      } else {
        const currentUser = await signIn(email.trim(), password);
        setUser(currentUser);
        setProfile(profileFromUser(currentUser));
        setMessage('Welcome back.');
      }
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Could not authenticate.');
    } finally {
      setSaving(false);
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const updated = await updateProfile({
        display_name: profile.display_name.trim(),
        username: profile.username.trim(),
        bio: profile.bio.trim(),
        location: profile.location.trim(),
        website: profile.website.trim(),
        settings: {
          email_updates: profile.email_updates,
          public_profile: profile.public_profile,
          compact_mode: profile.compact_mode,
        },
      });
      setUser(updated);
      setMessage('Profile and settings saved.');
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Could not save your profile.');
    } finally {
      setSaving(false);
    }
  }

  async function sendResetLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await requestPasswordReset(forgotEmail.trim(), `${window.location.origin}/account?mode=reset`);
      setMessage('If an account exists for that email, a password reset link has been sent. Check your inbox and spam folder.');
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Could not send the reset email.');
    } finally {
      setSaving(false);
    }
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword.length < 6) { setError('Use at least 6 characters for the new password.'); return; }
    if (newPassword !== confirmPassword) { setError('The passwords do not match.'); return; }
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await updatePassword(newPassword);
      await signOut();
      window.history.replaceState({}, '', '/account');
      setMode('signin');
      setNewPassword('');
      setConfirmPassword('');
      setUser(null);
      setMessage('Password updated successfully. Sign in with your new password.');
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Could not update your password.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main style={shell}><div style={card}><p>Loading your account…</p></div></main>;

  if (mode === 'reset') return (
    <main style={shell}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <a href="/marketplace" style={backLink}>← Back to marketplace</a>
        <section style={{ ...card, marginTop: 20 }}>
          <div style={eyebrow}>Password recovery</div>
          <h1 style={{ margin: '10px 0 8px' }}>Choose a new password</h1>
          <p style={muted}>Use a strong password you do not reuse on another service.</p>
          <form onSubmit={resetPassword} style={{ display: 'grid', gap: 14, marginTop: 22 }}>
            <label style={label}>New password<input required minLength={6} type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="At least 6 characters" style={input} /></label>
            <label style={label}>Confirm new password<input required minLength={6} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat your new password" style={input} /></label>
            {error && <div style={errorBox}>{error}</div>}
            <button disabled={saving} style={primary}>{saving ? 'Updating…' : 'Update password'}</button>
          </form>
        </section>
      </div>
    </main>
  );

  if (mode === 'forgot') return (
    <main style={shell}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <a href="/marketplace" style={backLink}>← Back to marketplace</a>
        <section style={{ ...card, marginTop: 20 }}>
          <div style={eyebrow}>Password recovery</div>
          <h1 style={{ margin: '10px 0 8px' }}>Forgot your password?</h1>
          <p style={muted}>Enter the email registered to your marketplace account. We’ll send a secure reset link.</p>
          <form onSubmit={sendResetLink} style={{ display: 'grid', gap: 14, marginTop: 22 }}>
            <label style={label}>Registered email<input required type="email" value={forgotEmail} onChange={(event) => setForgotEmail(event.target.value)} placeholder="you@example.com" style={input} /></label>
            {error && <div style={errorBox}>{error}</div>}
            {message && <div style={successBox}>{message}</div>}
            <button disabled={saving} style={primary}>{saving ? 'Sending…' : 'Send reset link'}</button>
          </form>
          <button type="button" onClick={() => { setMode('signin'); setError(''); setMessage(''); }} style={switchButton}>Back to sign in</button>
        </section>
      </div>
    </main>
  );

  if (!user) return (
    <main style={shell}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <a href="/marketplace" style={backLink}>← Back to marketplace</a>
        <section style={{ ...card, marginTop: 20 }}>
          <div style={eyebrow}>Marketplace account</div>
          <h1 style={{ margin: '10px 0 8px' }}>{mode === 'signin' ? 'Welcome back' : 'Create your profile'}</h1>
          <p style={muted}>{mode === 'signin' ? 'Sign in to manage your profile, user ID, and preferences.' : 'Create an account to publish skills and personalize your marketplace settings.'}</p>
          <form onSubmit={submitAuth} style={{ display: 'grid', gap: 14, marginTop: 22 }}>
            {mode === 'signup' && <label style={label}>Display name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" style={input} /></label>}
            <label style={label}>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" style={input} /></label>
            <label style={label}>Password<input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" style={input} /></label>
            {error && <div style={errorBox}>{error}</div>}
            {message && <div style={successBox}>{message}</div>}
            <button disabled={saving} style={primary}>{saving ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}</button>
          </form>
          {mode === 'signin' && <button type="button" onClick={() => { setMode('forgot'); setForgotEmail(email); setError(''); setMessage(''); }} style={switchButton}>Forgot password?</button>}
          <button type="button" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage(''); }} style={switchButton}>{mode === 'signin' ? 'New here? Create an account' : 'Already have an account? Sign in'}</button>
        </section>
      </div>
    </main>
  );

  return (
    <main style={shell}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div><a href="/marketplace" style={backLink}>← Marketplace</a><div style={{ ...eyebrow, marginTop: 20 }}>Account center</div><h1 style={{ margin: '8px 0 4px' }}>Profile & settings</h1><p style={muted}>Manage the identity and preferences used across your marketplace account.</p></div>
          <button type="button" onClick={() => { void signOut().then(() => { setUser(null); setProfile(emptyProfile); setMessage('Signed out.'); }); }} style={secondary}>Sign out</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, .75fr) minmax(300px, 1.25fr)', gap: 20, marginTop: 24 }}>
          <section style={card}>
            <div style={{ width: 72, height: 72, borderRadius: 24, display: 'grid', placeItems: 'center', background: '#ccfbf1', color: '#0f766e', fontSize: 28, fontWeight: 900 }}>{(profile.display_name || user.email || 'U').charAt(0).toUpperCase()}</div>
            <h2 style={{ margin: '18px 0 4px' }}>{profile.display_name || 'Marketplace user'}</h2>
            <p style={{ ...muted, marginTop: 0 }}>{user.email}</p>
            <div style={{ marginTop: 24, padding: 14, borderRadius: 14, background: '#f8fafc', border: '1px solid #e2e8f0' }}><div style={{ ...eyebrow, fontSize: 10 }}>Your user ID</div><code style={{ display: 'block', marginTop: 8, color: '#0f172a', overflowWrap: 'anywhere' }}>{user.id}</code><button type="button" onClick={() => { void navigator.clipboard?.writeText(user.id); setMessage('User ID copied.'); }} style={{ ...secondary, marginTop: 12, padding: '8px 10px' }}>Copy ID</button></div>
            <a href="/studio" style={{ ...primary, display: 'block', textAlign: 'center', marginTop: 18 }}>Create a skill</a>
          </section>
          <form onSubmit={save} style={card}>
            <h2 style={{ marginTop: 0 }}>Profile details</h2>
            <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
              <label style={label}>Display name<input value={profile.display_name} onChange={(event) => setProfile({ ...profile, display_name: event.target.value })} style={input} /></label>
              <label style={label}>Username<input value={profile.username} onChange={(event) => setProfile({ ...profile, username: event.target.value })} placeholder="your-handle" style={input} /></label>
              <label style={label}>Location<input value={profile.location} onChange={(event) => setProfile({ ...profile, location: event.target.value })} placeholder="Pune, India" style={input} /></label>
              <label style={label}>Website<input value={profile.website} onChange={(event) => setProfile({ ...profile, website: event.target.value })} placeholder="https://…" style={input} /></label>
            </div>
            <label style={{ ...label, marginTop: 14 }}>Bio<textarea rows={4} value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} placeholder="Tell the marketplace about your work" style={{ ...input, resize: 'vertical' }} /></label>
            <h2 style={{ margin: '28px 0 14px' }}>Settings</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {([['email_updates', 'Product and learning updates'], ['public_profile', 'Show my profile to other marketplace users'], ['compact_mode', 'Use compact catalog cards']] as const).map(([key, text]) => <label key={key} style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#334155' }}><input type="checkbox" checked={profile[key]} onChange={(event) => setProfile({ ...profile, [key]: event.target.checked })} />{text}</label>)}
            </div>
            {error && <div style={{ ...errorBox, marginTop: 18 }}>{error}</div>}
            {message && <div style={{ ...successBox, marginTop: 18 }}>{message}</div>}
            <button type="submit" disabled={saving} style={{ ...primary, marginTop: 20 }}>{saving ? 'Saving…' : 'Save profile & settings'}</button>
          </form>
        </div>
      </div>
    </main>
  );
}

const shell = { minHeight: '100vh', background: '#f8fafc', padding: '32px 20px 64px', color: '#0f172a' };
const card = { background: 'white', border: '1px solid #e2e8f0', borderRadius: 24, padding: 24, boxShadow: '0 12px 32px rgba(15, 23, 42, 0.05)' };
const label = { display: 'grid', gap: 7, fontWeight: 700, color: '#334155' };
const input = { width: '100%', boxSizing: 'border-box' as const, border: '1px solid #cbd5e1', borderRadius: 12, padding: '12px 13px', font: 'inherit', color: '#0f172a', background: 'white' };
const primary = { border: 0, borderRadius: 12, padding: '13px 16px', background: '#0f172a', color: 'white', fontWeight: 800, textDecoration: 'none', cursor: 'pointer' };
const secondary = { border: '1px solid #cbd5e1', borderRadius: 12, padding: '10px 14px', background: 'white', color: '#334155', fontWeight: 800, cursor: 'pointer' };
const switchButton = { border: 0, background: 'transparent', color: '#0f766e', fontWeight: 800, cursor: 'pointer', padding: '16px 0 0' };
const backLink = { color: '#475569', textDecoration: 'none', fontWeight: 700 };
const muted = { color: '#64748b', lineHeight: 1.6 };
const eyebrow = { color: '#0f766e', fontWeight: 800, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const };
const errorBox = { background: '#fef2f2', color: '#991b1b', padding: 12, borderRadius: 12, lineHeight: 1.5 };
const successBox = { background: '#ecfdf5', color: '#065f46', padding: 12, borderRadius: 12, lineHeight: 1.5 };
