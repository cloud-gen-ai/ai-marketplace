import Link from 'next/link';
import { formatPrice } from '@ai-marketplace/shared';
import type { MarketplaceProduct } from '../lib/marketplace';

export function ProductCard({ product }: { product: MarketplaceProduct }) {
  const isSkillPack = product.slug.startsWith('skill-pack-') || Boolean(product.metadata?.skills?.length) || Boolean(product.metadata?.source_url);
  return (
    <article className="product-card">
      <div className="card-meta"><span className="tag" style={{ background: '#ccfbf1', color: '#0f766e' }}>{product.category}</span><span>{product.rating} ★</span></div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <div className="tag-row">{product.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="product-footer">
        <span className="product-price">{product.price === 0 ? 'Free' : formatPrice(product.price)}</span>
        <Link href={isSkillPack ? `/skills/${product.slug}` : `/products/${product.slug}`} className="button-primary product-card-action">{isSkillPack ? 'Read skills' : 'View details'}</Link>
      </div>
    </article>
  );
}
