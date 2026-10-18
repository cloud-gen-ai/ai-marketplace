export default function LoginPage() {
  return (
    <main style={{ maxWidth: 520, margin: '80px auto', padding: 24 }}>
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 24, padding: 32 }}>
        <h1 style={{ marginTop: 0 }}>Marketplace account</h1>
        <p style={{ color: '#6b7280' }}>Create or access your profile, user ID, and settings.</p>
        <a href="/account" style={{ display: 'block', textAlign: 'center', padding: '14px 16px', borderRadius: 12, background: '#111827', color: 'white', textDecoration: 'none', fontWeight: 700 }}>Open account</a>
      </div>
    </main>
  );
}
