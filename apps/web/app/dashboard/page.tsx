export default function DashboardPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div><h1 style={{ marginBottom: 6 }}>Seller dashboard</h1><p style={{ color: '#64748b' }}>Create, teach, and publish reusable skills.</p></div>
        <div style={{ display: 'flex', gap: 10 }}><a href="/account" style={{ border: '1px solid #cbd5e1', color: '#334155', borderRadius: 12, padding: '12px 16px', textDecoration: 'none', fontWeight: 800 }}>Account</a><a href="/studio" style={{ background: '#0f172a', color: 'white', borderRadius: 12, padding: '12px 16px', textDecoration: 'none', fontWeight: 800 }}>+ Create skill</a></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, marginTop: 24 }}>
        {[
          { title: 'Products', value: '12' },
          { title: 'Active subscriptions', value: '2,345' },
          { title: 'Revenue', value: '$16.2K' },
          { title: 'Avg rating', value: '4.9' }
        ].map((item) => (
          <div key={item.title} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
            <div style={{ color: '#6b7280', marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: 32, fontWeight: 800 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
