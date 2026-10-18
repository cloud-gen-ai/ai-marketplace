'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getCurrentUser } from '../lib/supabase-auth';

export function ProtectedDownloadButton({ href, label, returnPath }: { href: string; label: string; returnPath: string }) {
  const [checking, setChecking] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [message, setMessage] = useState('');

  async function startDownload() {
    setChecking(true);
    setNeedsLogin(false);
    setDownloadReady(false);
    setMessage('');
    try {
      const user = await getCurrentUser();
      if (!user) {
        setNeedsLogin(true);
        return;
      }

      // Fetch first so the browser has a complete file to download. This is
      // more reliable on mobile browsers than clicking a hidden link after an
      // asynchronous session check. The visible fallback below also handles
      // browsers that block programmatic downloads.
      const response = await fetch(href, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(`Download failed (${response.status}).`);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const disposition = response.headers.get('content-disposition') || '';
      const headerName = disposition.match(/filename="?([^";]+)"?/i)?.[1];
      const pathName = href.split('/').pop() || 'ai-marketplace-download';
      const filename = headerName || pathName;
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30_000);
      setDownloadReady(true);
      setMessage('Your download is ready. If it did not appear, tap the download link below.');
    } catch (reason: unknown) {
      setDownloadReady(true);
      setMessage(reason instanceof Error ? reason.message : 'The file could not be prepared. Tap the download link below to try again.');
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
      {downloadReady && <a href={href} download style={{ display: 'inline-flex', justifyContent: 'center', padding: '12px 14px', border: '1px solid #cbd5e1', borderRadius: 12, color: '#0f172a', background: '#fff', fontWeight: 800, textDecoration: 'none' }}>
        Tap here to download the file
      </a>}
    </div>
  );
}
