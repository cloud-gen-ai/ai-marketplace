import { NextResponse } from 'next/server';
import { expandedSkillCatalog } from '../../../../../lib/skills-catalog';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const generated = expandedSkillCatalog.find((entry) => entry.slug === params.slug);
  if (generated) {
    const content = [
      `# ${generated.title}`,
      '',
      `Category: ${generated.category}`,
      `Level: ${generated.metadata.level}`,
      '',
      generated.description,
      '',
      '## Read mode',
      '',
      generated.metadata.sessions[0]?.content || '',
      '',
      `## Public reference: ${generated.metadata.source_label}`,
      generated.metadata.source_url,
    ].join('\n');
    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${params.slug}.md"`,
        'Cache-Control': 'public, max-age=300',
      },
    });
  }

  if (!url || !key) return NextResponse.json({ error: 'Catalog is not configured' }, { status: 503 });

  const response = await fetch(`${url}/rest/v1/products?select=title,category,description,metadata&slug=eq.${encodeURIComponent(params.slug)}&status=eq.approved&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: 'no-store',
  });
  if (!response.ok) return NextResponse.json({ error: 'Could not read skill pack' }, { status: 502 });

  const rows = await response.json() as Array<{ title: string; category: string; description: string | null; metadata?: { skills?: string[]; sessions?: Array<{ title: string; content: string }> } }>;
  const product = rows[0];
  if (!product) return NextResponse.json({ error: 'Skill pack not found' }, { status: 404 });

  const skills = product.metadata?.skills || [];
  const sessions = product.metadata?.sessions || [];
  const content = [
    `# ${product.title}`,
    '',
    `Category: ${product.category}`,
    '',
    product.description || '',
    '',
    '## Included skills',
    ...skills.map((skill) => `- ${skill}`),
    '',
    '## Learning sessions',
    ...sessions.flatMap((session) => [`### ${session.title}`, '', session.content, '']),
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${params.slug}.md"`,
      'Cache-Control': 'no-store',
    },
  });
}
