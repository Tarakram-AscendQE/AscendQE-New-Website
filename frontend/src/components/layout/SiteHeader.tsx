import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SiteLogo } from '@/components/layout/SiteLogo';

/** Above this width the desktop nav is shown and the mobile menu must close (matches site.css). */
const DESKTOP_MIN_WIDTH = 1080;

const MAIN_NAV = [
  { to: '/services', label: 'What we do' },
  { to: '/gcc', label: 'For GCCs' },
  { to: '/method', label: 'How we decide' },
];

/** Line icons for the Company menu (24px grid, stroke styled in lean.css). */
const BUILDING_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4" />
  </svg>
);
const ARTICLE_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />
  </svg>
);

const MAIL_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

/** "Company" dropdown. */
const COMPANY_NAV = [
  { to: '/about', label: 'About', icon: BUILDING_ICON },
  { to: '/blogs', label: 'Insights', icon: ARTICLE_ICON },
  { to: '/contact', label: 'Contact us', icon: MAIL_ICON },
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

/** Desktop "Company" menu: opens on click, closes on outside click, Escape or navigation. */
function CompanyMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const isActive = COMPANY_NAV.some((item) => pathname === item.to);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      className="dd"
      ref={rootRef}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={isActive ? 'on' : undefined}
        aria-expanded={open}
        aria-controls="company-menu"
        onClick={() => setOpen((value) => !value)}
      >
        Company
      </button>
      <div className="panel company" id="company-menu" hidden={!open}>
        <p className="label">Company</p>
        {COMPANY_NAV.map((item) => (
          <NavLink key={item.to} to={item.to} className={noActiveClass} onClick={() => setOpen(false)}>
            <span className="ico">{item.icon}</span>
            <b>{item.label}</b>
            <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NavLink>
        ))}
      </div>
    </div>
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
            <CompanyMenu />
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
        <h2>Company</h2>
        {COMPANY_NAV.map((item) => (
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
