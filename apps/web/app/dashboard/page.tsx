export default function DashboardPage() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 32 }}>
      <h1>Seller dashboard</h1>
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
