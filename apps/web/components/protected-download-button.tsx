'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getCurrentUser } from '../lib/supabase-auth';

export function ProtectedDownloadButton({ href, label, returnPath }: { href: string; label: string; returnPath: string }) {
  const [checking, setChecking] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [message, setMessage] = useState('');

  async function startDownload() {
    setChecking(true);
    setNeedsLogin(false);
    setMessage('');
    try {
      const user = await getCurrentUser();
      if (!user) {
        setNeedsLogin(true);
        return;
      }
      const link = document.createElement('a');
      link.href = href;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage('Download started.');
    } catch {
      setNeedsLogin(true);
    } finally {
      setChecking(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <button type="button" onClick={() => { void startDownload(); }} disabled={checking} style={{ padding: '13px 17px', border: 0, borderRadius: 12, background: '#0f172a', color: 'white', fontWeight: 800, cursor: checking ? 'wait' : 'pointer', opacity: checking ? 0.7 : 1 }}>
        {checking ? 'Checking account…' : label}
      </button>
      {needsLogin && <div role="alert" style={{ padding: 12, borderRadius: 12, background: '#fef3c7', color: '#92400e', fontSize: 13, lineHeight: 1.5 }}>
        Sign in or create a free account to download this skill pack. <Link href={`/account?next=${encodeURIComponent(returnPath)}`} style={{ color: '#0f766e', fontWeight: 900 }}>Continue to sign in →</Link>
      </div>}
      {message && <div role="status" style={{ color: '#0f766e', fontSize: 13, fontWeight: 800 }}>{message}</div>}
    </div>
  );
}
