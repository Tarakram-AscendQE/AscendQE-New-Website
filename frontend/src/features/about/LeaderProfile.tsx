import type { CSSProperties } from 'react';
import type { LeaderProfileData } from '@/features/about/leadership-data';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

/** Stagger index for the text column (read by about.css as --i). */
const step = (index: number) => ({ '--i': index }) as CSSProperties;

/**
 * One person on the About page: portrait, label, heading, message and signature.
 * On first scroll into view the portrait is unmasked, the text follows, and a rule is drawn before the
 * name, like a signature (see styles/about.css).
 */
export function LeaderProfile({ person, flip = false }: { person: LeaderProfileData; flip?: boolean }) {
  const { ref, state } = useInView<HTMLElement>();

  return (
    <article
      ref={ref}
      id={person.id}
      className={cn('founder leader', flip && 'leader--flip')}
      data-reveal={state}
      aria-labelledby={`${person.id}-heading`}
    >
      <div className="portrait portrait-photo leader-photo">
        <img alt={person.photoAlt} decoding="async" loading="lazy" src={person.photo} />
      </div>
      <div className="leader-text">
        <p className="eyebrow leader-step" style={step(0)}>
          {person.label}
        </p>
        <h2 id={`${person.id}-heading`} className="leader-step" style={step(1)}>
          {person.heading}
        </h2>
        <div className="mt24" style={{ maxWidth: '66ch' }}>
          {person.paragraphs.map((paragraph, index) => (
            <p key={index} className="leader-step" style={step(index + 2)}>
              {paragraph}
            </p>
          ))}
          <div className="leader-sig" style={step(person.paragraphs.length + 2)}>
            <p style={{ fontFamily: 'var(--f-head)', fontWeight: '600' }}>
              {person.name}
              <br />
              <span className="founder-role">{person.role}</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
