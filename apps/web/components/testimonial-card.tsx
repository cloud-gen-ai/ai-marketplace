import type { Testimonial } from '../lib/community';

function initials(name: string) {
  return name.split(/\s+/).map((part) => part[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const hasAvatar = typeof testimonial.avatar_url === 'string' && /^https?:\/\//i.test(testimonial.avatar_url);
  return (
    <article className="testimonial-card">
      <div className="testimonial-outcome">{testimonial.outcome}</div>
      <p className="testimonial-body">“{testimonial.body}”</p>
      <div className="testimonial-person">
        {hasAvatar ? <img className="testimonial-avatar" src={testimonial.avatar_url as string} alt={`${testimonial.display_name} profile`} /> : <div className="testimonial-avatar testimonial-avatar-fallback" aria-hidden="true">{initials(testimonial.display_name)}</div>}
        <div><strong>{testimonial.display_name}</strong><span>{testimonial.role_label}</span></div>
      </div>
    </article>
  );
}
