export default function PricingPage() {
  const plans = [
    { name: 'Starter', price: '$0', description: 'Explore public skill packs and free templates.', trial: 'Free forever' },
    { name: 'Pro', price: '$19/mo', description: 'Access premium AI plugins and product packs.', trial: 'First month free' },
    { name: 'Team', price: '$49/mo', description: 'Shared team licensing with workspace features.', trial: 'First month free' }
  ];

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: 32 }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: 12 }}>Simple pricing</h1>
      <p style={{ textAlign: 'center', color: '#4b5563', margin: 0 }}>Start with a 30-day free trial. Cancel anytime before the first paid renewal.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 28 }}>
        {plans.map((plan) => (
          <div key={plan.name} style={{ background: 'white', borderRadius: 22, border: '1px solid #e5e7eb', padding: 24 }}>
            <h2>{plan.name}</h2>
            <div style={{ fontWeight: 800, fontSize: 32, marginBottom: 12 }}>{plan.price}</div>
            <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', borderRadius: 999, padding: '6px 10px', fontSize: 12, fontWeight: 800 }}>{plan.trial}</div>
            <p style={{ color: '#4b5563', lineHeight: 1.6 }}>{plan.description}</p>
            <button style={{ width: '100%', border: 'none', background: '#111827', color: 'white', borderRadius: 12, padding: '12px 16px', fontWeight: 700 }}>Choose plan</button>
          </div>
        ))}
      </div>
    </main>
  );
}
