'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser, type MarketplaceUser } from '../lib/supabase-auth';

export function SiteNav() {
  const [user, setUser] = useState<MarketplaceUser | null>(null);

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  const metadata = user?.user_metadata;
  const displayName = typeof metadata?.display_name === 'string'
    ? metadata.display_name
    : typeof metadata?.full_name === 'string'
      ? metadata.full_name
      : '';
  const profileLabel = displayName || user?.email || 'My profile';
  const profileInitial = profileLabel.charAt(0).toUpperCase();
  const avatarUrl = typeof metadata?.avatar_url === 'string' && /^https?:\/\//.test(metadata.avatar_url)
    ? metadata.avatar_url
    : '';

  return (
    <header className="site-container site-nav">
      <Link href="/" className="brand-mark" aria-label="AI Marketplace home">
        <span className="brand-icon">AI</span>
        <span>AI Marketplace</span>
      </Link>
      <nav className="site-nav-links" aria-label="Primary navigation">
        <span className="site-nav-priority-group">
          <Link href="/marketplace" className="site-nav-priority">Marketplace</Link>
          <Link href="/mcp-servers" className="site-nav-priority">MCP servers</Link>
          <Link href="/services" className="site-nav-priority">Services</Link>
        </span>
        <span className="site-nav-divider" aria-hidden="true" />
        <span className="site-nav-secondary-group">
          <Link href="/courses">Courses</Link>
          <Link href="/mentoring">Guidance</Link>
          <Link href="/insights">Insights</Link>
        </span>
      </nav>
      <div className="site-nav-actions">
        <Link href="/connect" className="site-nav-contact">Contact</Link>
        {user ? (
          <Link href="/account" className="site-nav-profile" aria-label="Open my profile" title="My profile">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="site-nav-profile-avatar" />
            ) : (
              <span className="site-nav-profile-avatar site-nav-profile-initial" aria-hidden="true">{profileInitial}</span>
            )}
            <span className="site-nav-profile-name">{profileLabel}</span>
            <span className="site-nav-profile-chevron" aria-hidden="true">⌄</span>
          </Link>
        ) : (
          <Link href="/account" className="site-nav-signin">Sign in</Link>
        )}
        <Link href="/studio" className="button-primary site-nav-publish">Publish a skill</Link>
      </div>
    </header>
  );
}
