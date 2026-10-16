import { productCatalog } from '@ai-marketplace/shared';

export type SkillSession = { title: string; content: string };
export type MarketplaceMetadata = {
  skills?: string[];
  sessions?: SkillSession[];
  source_archive?: string;
  runtime?: string;
  version?: string;
  [key: string]: unknown;
};
export type MarketplaceProduct = (typeof productCatalog)[number] & { metadata?: MarketplaceMetadata };

type SupabaseProduct = {
  id: number;
  slug: string;
  title: string;
  category: string;
  short_description: string | null;
  description: string | null;
  price: number | string;
  is_free: boolean;
  metadata?: MarketplaceMetadata | null;
};

function fallbackProducts(): MarketplaceProduct[] {
  return productCatalog;
}

export async function getMarketplaceProducts(options: { fresh?: boolean } = {}): Promise<MarketplaceProduct[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return fallbackProducts();

  try {
    const response = await fetch(
      `${url}/rest/v1/products?select=id,slug,title,category,short_description,description,price,is_free,metadata&status=eq.approved&order=created_at.desc`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        ...(options.fresh ? { cache: 'no-store' as const } : { next: { revalidate: 60 } }),
      },
    );

    if (!response.ok) return fallbackProducts();
    const rows = (await response.json()) as SupabaseProduct[];
    if (!rows.length) return fallbackProducts();

    return rows.map((product) => ({
      id: `supabase_${product.id}`,
      slug: product.slug,
      title: product.title,
      category: product.category,
      price: Number(product.price),
      currency: 'USD',
      rating: 4.8,
      reviews: 0,
      description: product.description || product.short_description || '',
      tags: [product.category.toLowerCase().replaceAll(' ', '-')],
      status: product.is_free ? 'free' : 'approved',
      compatibleWith: ['Claude Code', 'OpenAI', 'Cursor'],
      metadata: product.metadata || undefined,
    }));
  } catch {
    return fallbackProducts();
  }
}
