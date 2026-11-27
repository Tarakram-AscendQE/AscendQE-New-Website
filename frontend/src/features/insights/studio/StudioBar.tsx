import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SiteLogo } from '@/components/layout/SiteLogo';

interface StudioBarProps {
  /** Left side, after the logo (e.g. "All articles"). */
  lead?: ReactNode;
  /** Right side (actions, user, sign out). */
  children?: ReactNode;
}

/** Sticky studio header in the site header's style. */
export function StudioBar({ lead, children }: StudioBarProps) {
  return (
    <header className="studio-bar">
      <div className="wrap">
        <Link className="logo" to="/" aria-label="AscendQE home">
          <SiteLogo />
        </Link>
        <span className="studio-tag">Studio</span>
        {lead}
        <div className="studio-bar-end">{children}</div>
      </div>
    </header>
  );
}
