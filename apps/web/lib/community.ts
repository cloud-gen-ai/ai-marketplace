export type Testimonial = {
  id: number;
  display_name: string;
  role_label: string;
  outcome: string;
  body: string;
  avatar_url: string | null;
  created_at: string;
};

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const query = new URLSearchParams({
    select: 'id,display_name,role_label,outcome,body,avatar_url,created_at',
    status: 'eq.published',
    consent_public: 'eq.true',
    order: 'created_at.desc',
    limit: '6',
  });

  try {
    const response = await fetch(`${url}/rest/v1/testimonials?${query.toString()}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    const result = await response.json() as unknown;
    return Array.isArray(result) ? result as Testimonial[] : [];
  } catch {
    return [];
  }
}
