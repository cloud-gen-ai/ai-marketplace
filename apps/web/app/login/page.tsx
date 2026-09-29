export default function LoginPage() {
  return (
    <main style={{ maxWidth: 520, margin: '80px auto', padding: 24 }}>
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 24, padding: 32 }}>
        <h1 style={{ marginTop: 0 }}>Log in</h1>
        <p style={{ color: '#6b7280' }}>Use GitHub or email to access your marketplace account.</p>
        <button style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: '#111827', color: 'white', border: 'none', fontWeight: 700, marginBottom: 12 }}>Continue with GitHub</button>
        <button style={{ width: '100%', padding: '14px 16px', borderRadius: 12, background: '#f3f4f6', color: '#111827', border: 'none', fontWeight: 700 }}>Continue with email</button>
      </div>
    </main>
  );
}
