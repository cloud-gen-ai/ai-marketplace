import Link from 'next/link';
import { getPublishedTestimonials } from '../lib/community';
import { TestimonialCard } from './testimonial-card';

export async function CommunityFeedback() {
  const testimonials = await getPublishedTestimonials();
  return (
    <section className="site-container section-tight" id="community-feedback">
      <div className="section-heading">
        <div>
          <div className="eyebrow">Community outcomes</div>
          <h2>What builders are achieving with focused support.</h2>
          <p>Real stories from people who choose to share what changed in their work, learning, or career journey.</p>
        </div>
        <Link href="/feedback" className="button-secondary">Share your outcome</Link>
      </div>
      {testimonials.length > 0 ? <div className="testimonial-grid">{testimonials.map((testimonial) => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}</div> : (
        <div className="empty-state feedback-empty"><strong>Your verified outcome can be the first story here.</strong><span>Share only what you are comfortable making public. A name and photo are optional to your story, and nothing is published without your consent.</span><Link href="/feedback" className="text-link">Add community feedback →</Link></div>
      )}
    </section>
  );
}
