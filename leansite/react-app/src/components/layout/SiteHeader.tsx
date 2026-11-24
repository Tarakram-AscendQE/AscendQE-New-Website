import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SiteLogo } from '@/components/layout/SiteLogo';

/** Above this width the desktop nav is shown and the mobile menu must close (matches site.css). */
const DESKTOP_MIN_WIDTH = 1080;

const MAIN_NAV = [
  { to: '/services', label: 'What we do' },
  { to: '/gcc', label: 'For GCCs' },
  { to: '/method', label: 'How we decide' },
  { to: '/about', label: 'About' },
];

const MOBILE_NAV = [{ to: '/', label: 'Home' }, ...MAIN_NAV, { to: '/standard', label: 'Our published method (PS-1)' }];

// NavLink adds aria-current="page" to the active link (styled in site.css); no extra class is wanted.
const noActiveClass = () => undefined;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d={open ? 'M4 4l12 12M16 4L4 16' : 'M3 6h14M3 10h14M3 14h14'}
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { pathname, hash } = useLocation();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Lock page scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.classList.toggle('locked', menuOpen);
    return () => document.body.classList.remove('locked');
  }, [menuOpen]);

  // Close on navigation, on Escape (returning focus to the button) and when the desktop nav appears.
  useEffect(closeMenu, [pathname, hash, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className="hdr">
        <div className="wrap">
          <Link className="logo" to="/" aria-label="AscendQE home">
            <SiteLogo />
          </Link>
          <nav className="nav" aria-label="Main">
            {MAIN_NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={noActiveClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link className="btn sm cta" to="/start">
            Start a Proof Sprint
          </Link>
          <button
            ref={menuButtonRef}
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mnav"
            aria-label="Menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </header>
      <nav className="mnav" id="mnav" aria-label="Menu" hidden={!menuOpen}>
        {MOBILE_NAV.map((item) => (
          <Link key={item.to} to={item.to} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <Link className="btn" to="/start" onClick={closeMenu}>
          Start a Proof Sprint
        </Link>
      </nav>
    </>
  );
}
