'use client';

import { useState } from 'react';

type SessionDraft = { title: string; content: string };

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default function CreatorStudioPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI Agents');
  const [description, setDescription] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [price, setPrice] = useState('0');
  const [isFree, setIsFree] = useState(true);
  const [sessions, setSessions] = useState<SessionDraft[]>([{ title: 'Introduction', content: '' }]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function updateSession(index: number, field: keyof SessionDraft, value: string) {
    setSessions((current) => current.map((session, sessionIndex) => sessionIndex === index ? { ...session, [field]: value } : session));
  }

  function addSession() {
    setSessions((current) => [...current, { title: `Session ${current.length + 1}`, content: '' }]);
  }

  function removeSession(index: number) {
    setSessions((current) => current.length === 1 ? current : current.filter((_, sessionIndex) => sessionIndex !== index));
  }

  async function publishSkill(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    const skills = skillsText.split(/[\n,]/).map((skill) => skill.trim()).filter(Boolean);
    const slug = slugify(title);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!title.trim() || !description.trim() || !skills.length) {
      setError('Add a title, description, and at least one skill.');
      setSaving(false);
      return;
    }
    if (!supabaseUrl || !supabaseKey) {
      setError('The catalog connection is not configured.');
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/products`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          slug,
          title: title.trim(),
          category,
          short_description: description.trim().slice(0, 180),
          description: description.trim(),
          price: isFree ? 0 : Number(price) || 0,
          is_free: isFree,
          status: 'approved',
          metadata: {
            source_archive: 'creator-studio',
            runtime: 'prompt',
            version: '1.0.0',
            skills,
            sessions: sessions.filter((session) => session.title.trim() && session.content.trim()),
          },
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || 'The catalog rejected this submission.');
      }

      setMessage(`Published successfully. Opening ${title.trim()}…`);
      window.setTimeout(() => { window.location.href = `/skills/${slug}`; }, 700);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Could not publish this skill.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', padding: '28px 20px 64px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <a href="/marketplace" style={{ color: '#475569', textDecoration: 'none', fontWeight: 700 }}>← Back to marketplace</a>
        <section style={{ marginTop: 22, background: '#0f172a', color: 'white', borderRadius: 28, padding: '32px 28px' }}>
          <div style={{ color: '#99f6e4', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Creator studio</div>
          <h1 style={{ margin: '12px 0 8px', fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>Create and publish a skill</h1>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, maxWidth: 720, margin: 0 }}>Add a new skill pack, write learning sessions, preview it in reader mode, and publish it to the marketplace.</p>
        </section>

        <form onSubmit={publishSkill} style={{ display: 'grid', gap: 20, marginTop: 22 }}>
          <section style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 22, padding: 24 }}>
            <h2 style={{ margin: '0 0 18px' }}>1. Skill details</h2>
            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
              <label style={{ display: 'grid', gap: 7, fontWeight: 700 }}>Skill pack name<input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. RAG Evaluation Pack" style={inputStyle} /></label>
              <label style={{ display: 'grid', gap: 7, fontWeight: 700 }}>Category<input required value={category} onChange={(event) => setCategory(event.target.value)} placeholder="AI Agents" style={inputStyle} /></label>
            </div>
            <label style={{ display: 'grid', gap: 7, fontWeight: 700, marginTop: 16 }}>Description<textarea required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What will users learn or build?" rows={4} style={inputStyle} /></label>
            <label style={{ display: 'grid', gap: 7, fontWeight: 700, marginTop: 16 }}>Included skills <span style={{ fontWeight: 400, color: '#64748b' }}>One per line or comma-separated</span><textarea required value={skillsText} onChange={(event) => setSkillsText(event.target.value)} placeholder={'retrieval-evaluation\ngroundedness-checker\ncitation-review'} rows={4} style={inputStyle} /></label>
          </section>

          <section style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 22, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div><h2 style={{ margin: 0 }}>2. Learning sessions</h2><p style={{ color: '#64748b', marginBottom: 0 }}>These sessions appear in reader mode for every visitor.</p></div>
              <button type="button" onClick={addSession} style={secondaryButton}>+ New session</button>
            </div>
            <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
              {sessions.map((session, index) => (
                <div key={`${index}-${session.title}`} style={{ background: '#f8fafc', borderRadius: 16, padding: 16, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><input value={session.title} onChange={(event) => updateSession(index, 'title', event.target.value)} placeholder="Session title" style={{ ...inputStyle, flex: 1 }} /><button type="button" onClick={() => removeSession(index)} style={{ ...secondaryButton, color: '#b91c1c' }}>Remove</button></div>
                  <textarea value={session.content} onChange={(event) => updateSession(index, 'content', event.target.value)} placeholder="Explain the workflow, examples, and expected output." rows={4} style={{ ...inputStyle, marginTop: 10 }} />
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 22, padding: 24 }}>
            <h2 style={{ margin: '0 0 18px' }}>3. Publish settings</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center' }}>
              <label style={{ display: 'flex', gap: 9, alignItems: 'center', fontWeight: 700 }}><input type="checkbox" checked={isFree} onChange={(event) => setIsFree(event.target.checked)} /> Publish free</label>
              {!isFree && <label style={{ display: 'flex', gap: 9, alignItems: 'center', fontWeight: 700 }}>Price ($)<input type="number" min="0" step="1" value={price} onChange={(event) => setPrice(event.target.value)} style={{ ...inputStyle, width: 110 }} /></label>}
            </div>
            <p style={{ color: '#64748b', lineHeight: 1.6 }}>Publishing makes this pack immediately visible in the public catalog. Users can read it in reader mode before downloading.</p>
            {error && <div style={{ background: '#fef2f2', color: '#991b1b', padding: 12, borderRadius: 12 }}>{error}</div>}
            {message && <div style={{ background: '#ecfdf5', color: '#065f46', padding: 12, borderRadius: 12 }}>{message}</div>}
            <button type="submit" disabled={saving} style={{ ...primaryButton, opacity: saving ? 0.65 : 1 }}>{saving ? 'Publishing…' : 'Publish skill pack'}</button>
          </section>
        </form>
      </div>
    </main>
  );
}

const inputStyle = { width: '100%', border: '1px solid #cbd5e1', borderRadius: 12, padding: '12px 13px', font: 'inherit', color: '#0f172a', background: 'white' };
const primaryButton = { border: 0, borderRadius: 12, padding: '13px 18px', background: '#0f172a', color: 'white', fontWeight: 800, cursor: 'pointer' };
const secondaryButton = { border: '1px solid #cbd5e1', borderRadius: 10, padding: '9px 12px', background: 'white', color: '#334155', fontWeight: 800, cursor: 'pointer' };
