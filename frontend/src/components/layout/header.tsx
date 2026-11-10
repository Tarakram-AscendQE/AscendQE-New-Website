import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '@/assets/brand-logos/AscendQE-dark-logo.webp';
import {
  Building2,
  FileText,
  Briefcase,
  MessageSquareQuote,
  Mail,
  Box,
  Layers,
  CheckCircle2,
  Rocket,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface DropdownItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  isExternal?: boolean;
  badge?: string;
  badgeVariant?: 'blue' | 'green';
}

const companyItems: DropdownItem[] = [
  {
    name: 'About AscendQE',
    icon: Building2,
    to: '/about',
  },
  // Leadership omitted per user specification
  {
    name: 'Insights',
    icon: FileText,
    to: '/blogs',
  },
  {
    name: 'Careers',
    icon: Briefcase,
    to: '/careers',
  },
  {
    name: 'Customer Stories',
    icon: MessageSquareQuote,
    to: '/testimonials',
  },
  {
    name: 'Case Studies',
    icon: BookOpen,
    to: '/study.pdf',
    isExternal: true,
  },
  {
    name: 'Connect With Us',
    icon: Mail,
    to: '/contact',
  },
];

const availablePlatformItems: DropdownItem[] = [
  {
    name: 'AscendQE.AI',
    icon: Box,
    to: '/',
  },
  {
    name: 'myDiya.AI',
    icon: Box,
    to: '/mydiya',
  },
  {
    name: 'mySDET.AI',
    icon: Box,
    to: '/mysdet',
  },
  {
    name: 'FinOpsHub.Live',
    icon: Layers,
    to: '/finopshub',
  },
  {
    name: 'PRCheck.Live',
    icon: CheckCircle2,
    to: '/prcheck',
  },
];

const upcomingProductItems: DropdownItem[] = [
  {
    name: 'mySTLC.AI',
    icon: Box,
    to: '/mystlc',
  },
  {
    name: 'myTEVV.AI',
    icon: Box,
    to: '/mytevv',
  },
  {
    name: 'myP95.AI',
    icon: Box,
    to: '/myp95',
  },
  {
    name: 'myUT.AI',
    icon: Box,
    to: '/myut',
  },
  {
    name: 'myTDM.AI',
    icon: Box,
    to: '/mytdm',
  },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false);
  const [isMobileWhoWeAreOpen, setIsMobileWhoWeAreOpen] = useState(false);
  /*const [isOtherPlatformOpen, setIsOtherPlatformOpen] = useState(false);
  const [isUpcomingProductsOpen, setIsUpcomingProductsOpen] = useState(false);
  const [isMobileOtherPlatformOpen, setIsMobileOtherPlatformOpen] = useState(false);
  const [isMobileUpcomingProductsOpen, setIsMobileUpcomingProductsOpen] = useState(false);
  const [upcomingSubmenuPosition, setUpcomingSubmenuPosition] = useState<{ top: number; left: number } | null>(null);*/
  const [isOtherPlatformOpen, setIsOtherPlatformOpen] = useState(false);
  const [isUpcomingProductsOpen, setIsUpcomingProductsOpen] = useState(false);
  const [isMobileOtherPlatformOpen, setIsMobileOtherPlatformOpen] = useState(false);
  const [isMobileUpcomingProductsOpen, setIsMobileUpcomingProductsOpen] = useState(false);
  const [upcomingSubmenuPosition, setUpcomingSubmenuPosition] = useState<{ top: number; left: number } | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const isBlogReadingRoute = currentPath === '/blogs/login'
    || /^\/(blog|blogs|article)\/.+/.test(currentPath);

  const desktopNavRef = useRef<HTMLElement>(null);
  const upcomingTriggerRef = useRef<HTMLButtonElement>(null);
  const upcomingPanelRef = useRef<HTMLDivElement>(null);
  const upcomingCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelUpcomingClose = () => {
    if (upcomingCloseTimeoutRef.current) {
      clearTimeout(upcomingCloseTimeoutRef.current);
      upcomingCloseTimeoutRef.current = null;
    }
  };

  const scheduleUpcomingClose = () => {
    cancelUpcomingClose();
    upcomingCloseTimeoutRef.current = setTimeout(() => {
      setIsUpcomingProductsOpen(false);
      setUpcomingSubmenuPosition(null);
    }, 140);
  };

  const closeDropdowns = () => {
    setIsWhoWeAreOpen(false);
    setIsOtherPlatformOpen(false);
    setIsUpcomingProductsOpen(false);
  };

  // Close navigation dropdowns on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (desktopNavRef.current && !desktopNavRef.current.contains(target)) {
        closeDropdowns();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdowns();
      }
    };

    if (isWhoWeAreOpen || isOtherPlatformOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWhoWeAreOpen, isOtherPlatformOpen]);

  // Close dropdowns on route change
  useEffect(() => {
    setIsWhoWeAreOpen(false);
    setIsOtherPlatformOpen(false);
    setIsUpcomingProductsOpen(false);
    setIsOpen(false);
    setIsMobileWhoWeAreOpen(false);
    setIsMobileOtherPlatformOpen(false);
    setIsMobileUpcomingProductsOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (!isUpcomingProductsOpen) {
      setUpcomingSubmenuPosition(null);
      return;
    }

    const positionSubmenu = () => {
      const trigger = upcomingTriggerRef.current;
      const panel = upcomingPanelRef.current;
      if (!trigger || !panel) return;

      const triggerRect = trigger.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const viewportPadding = 8;
      const gap = 0;
      const fitsRight = triggerRect.right + gap + panelRect.width <= window.innerWidth - viewportPadding;
      const left = fitsRight
        ? triggerRect.right + gap
        : Math.max(viewportPadding, triggerRect.left - panelRect.width - gap);
      const top = Math.min(
        Math.max(viewportPadding, triggerRect.top),
        Math.max(viewportPadding, window.innerHeight - panelRect.height - viewportPadding)
      );

      setUpcomingSubmenuPosition({ top, left });
    };

    positionSubmenu();
    window.addEventListener('resize', positionSubmenu);
    window.addEventListener('scroll', positionSubmenu, true);
    return () => {
      window.removeEventListener('resize', positionSubmenu);
      window.removeEventListener('scroll', positionSubmenu, true);
    };
  }, [isUpcomingProductsOpen]);

  useEffect(() => () => cancelUpcomingClose(), []);

  const renderCompanyItem = (item: DropdownItem) => {
    const IconComponent = item.icon;
    const content = (
      <>
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-[#eff4ff] text-[#1763ff] flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#1763ff] group-hover:text-white">
            <IconComponent className="h-5 w-5 stroke-[1.8]" />
          </div>
          <span className="text-[15px] font-semibold text-[#0b1831] group-hover:text-[#1763ff] transition-colors whitespace-nowrap">
            {item.name}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#1763ff] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
      </>
    );

    const isExt = Boolean(
      item.isExternal ||
      item.to.startsWith('http://') ||
      item.to.startsWith('https://') ||
      item.to.startsWith('//') ||
      item.to.startsWith('mailto:')
    );

    const linkClasses =
      'group flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 hover:bg-[#f2f6ff]';

    return isExt ? (
      <a
        key={item.name}
        href={item.to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeDropdowns}
        className={linkClasses}
      >
        {content}
      </a>
    ) : (
      <Link
        key={item.name}
        to={item.to}
        onClick={closeDropdowns}
        className={linkClasses}
      >
        {content}
      </Link>
    );
  };

  const renderAvailableItem = (item: DropdownItem) => {
    const IconComponent = item.icon;
    const content = (
      <>
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-[#ebf2ff] text-[#1763ff] flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#1763ff] group-hover:text-white">
            <IconComponent className="h-4 w-4 stroke-[1.8]" />
          </div>
          <span className="text-[14px] font-semibold text-[#0b1831] group-hover:text-[#15803d] transition-colors whitespace-nowrap">
            {item.name}
          </span>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#15803d] bg-[#dcfce7] border border-[#bbf7d0]">
            <CheckCircle2 className="h-3 w-3 fill-[#16a34a] text-white" />
            <span>Available</span>
          </span>
          <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#15803d] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
        </div>
      </>
    );

    const isExt = Boolean(
      item.isExternal ||
      item.to.startsWith('http://') ||
      item.to.startsWith('https://') ||
      item.to.startsWith('//')
    );

    const linkClasses =
      'group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#eaf8ee] border border-[#e5f7ea] transition-all duration-150';

    return isExt ? (
      <a
        key={item.name}
        href={item.to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeDropdowns}
        className={linkClasses}
      >
        {content}
      </a>
    ) : (
      <Link
        key={item.name}
        to={item.to}
        onClick={closeDropdowns}
        className={linkClasses}
      >
        {content}
      </Link>
    );
  };

  const renderUpcomingItem = (item: DropdownItem) => {
    const IconComponent = item.icon;
    const content = (
      <>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-7 w-7 rounded-lg bg-[#e0edff] text-[#1763ff] flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#1763ff] group-hover:text-white">
            <IconComponent className="h-3.5 w-3.5 stroke-[1.8]" />
          </div>
          <span className="text-[13.5px] font-semibold text-[#0b1831] group-hover:text-[#1763ff] transition-colors whitespace-nowrap">
            {item.name}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-400 font-normal text-xs select-none">-</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#2563eb] bg-[#eef4ff] border border-[#dbe6fe]">
            Coming Soon
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-[#1763ff] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
        </div>
      </>
    );

    const isExt = Boolean(
      item.isExternal ||
      item.to.startsWith('http://') ||
      item.to.startsWith('https://') ||
      item.to.startsWith('//')
    );

    const linkClasses =
      'group flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-white/80 transition-all duration-150';

    return isExt ? (
      <a
        key={item.name}
        href={item.to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeDropdowns}
        className={linkClasses}
      >
        {content}
      </a>
    ) : (
      <Link
        key={item.name}
        to={item.to}
        onClick={closeDropdowns}
        className={linkClasses}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      <header
        className={`${isBlogReadingRoute ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-all`}
        style={isBlogReadingRoute
          ? { position: 'fixed', top: 0, left: 0, right: 0, width: '100%', backgroundColor: '#ffffff' }
          : { backgroundColor: '#ffffff', width: '100%' }}
      >
        <Link className="brand flex items-center" to="/">
          <img
            src={logoImg}
            alt="AscendQE"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>
        <nav ref={desktopNavRef} aria-label="Main navigation" className="relative hidden lg:flex items-center gap-7">
          <Link
            to="/"
            {...(currentPath === '/' || currentPath === '/index.html' ? { 'aria-current': 'page' } : {})}
          >
            The  core platform
          </Link>
          <Link
            to="/proof"
            {...(currentPath === '/proof' || currentPath === '/proof.html' ? { 'aria-current': 'page' } : {})}
          >
            How it works
          </Link>
          <Link
            to="/pricing"
            {...(currentPath === '/pricing' || currentPath === '/pricing.html' ? { 'aria-current': 'page' } : {})}
          >
            Your options
          </Link>
          <Link
            to="/payoff"
            {...(currentPath === '/payoff' || currentPath === '/payoff.html' ? { 'aria-current': 'page' } : {})}
          >
            Your value
          </Link>

          {/* Who We Are Trigger with Arrow */}
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onClick={() => {
                setIsWhoWeAreOpen((prev) => !prev);
                setIsOtherPlatformOpen(false);
                setIsUpcomingProductsOpen(false);
              }}
              className={`inline-flex items-center gap-1.5 py-1.5 px-0.5 text-[14px] font-[550] transition-colors cursor-pointer border-0 bg-transparent ${
                isWhoWeAreOpen ? 'text-[#1763ff]' : 'text-[#0b1831] hover:text-[#1763ff]'
              }`}
              aria-expanded={isWhoWeAreOpen}
              aria-haspopup="true"
            >
              <span>Who We Are</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isWhoWeAreOpen ? 'rotate-180 text-[#1763ff]' : 'rotate-0 text-slate-500'
                }`}
              />
            </button>

            {/* Active Blue Underline Indicator when dropdown is open */}
            {isWhoWeAreOpen && (
              <span
                className="absolute -bottom-8 left-0 right-0 h-[3px] bg-[#1763ff] rounded-full pointer-events-none"
                aria-hidden="true"
              />
            )}
            {/* Who We Are Dropdown Panel */}
            {isWhoWeAreOpen && (
              <div
                className="absolute top-[calc(100%+33px)] right-0 w-[360px] max-w-[95vw] bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(11,24,49,0.12)] p-6 z-50 animate-in fade-in zoom-in-95 duration-150"
                style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                }}
              >
                <div className="flex flex-col gap-1.5">
                  <div className="text-[11px] font-bold tracking-[1.5px] text-[#69758a] uppercase px-3 py-1 mb-1">
                    COMPANY
                  </div>
                  {companyItems.map(renderCompanyItem)}
                </div>
              </div>
            )}
          </div>

          {/* Other Platform Trigger */}
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onClick={() => {
                setIsOtherPlatformOpen((prev) => !prev);
                setIsWhoWeAreOpen(false);
                setIsUpcomingProductsOpen(false);
              }}
              className={`inline-flex items-center gap-1.5 py-1.5 px-0.5 text-[14px] font-[550] transition-colors cursor-pointer border-0 bg-transparent ${
                isOtherPlatformOpen ? 'text-[#1763ff]' : 'text-[#0b1831] hover:text-[#1763ff]'
              }`}
              aria-expanded={isOtherPlatformOpen}
              aria-haspopup="true"
            >
              <span>Other Platforms</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOtherPlatformOpen ? 'rotate-180 text-[#1763ff]' : 'rotate-0 text-slate-500'
                }`}
              />
            </button>
            {isOtherPlatformOpen && (
              <span
                className="absolute -bottom-8 left-0 right-0 h-[3px] bg-[#1763ff] rounded-full pointer-events-none"
                aria-hidden="true"
              />
            )}
            {/* Other Platform Dropdown Panel */}
            {isOtherPlatformOpen && (
              <div
                className="absolute top-[calc(100%+33px)] right-0 w-[430px] max-w-[95vw] bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(11,24,49,0.12)] p-6 z-50 animate-in fade-in zoom-in-95 duration-150"
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              >
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] font-bold tracking-[1.5px] text-[#69758a] uppercase px-3 py-1 mb-0.5">
                    PLATFORMS
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {availablePlatformItems.map(renderAvailableItem)}
                  </div>

                  <div
                    className="relative mt-2"
                    onMouseEnter={cancelUpcomingClose}
                    onMouseLeave={scheduleUpcomingClose}
                  >
                    <div className="rounded-2xl border border-[#dbe6fe] bg-[#f4f7fe]">
                      <button
                        ref={upcomingTriggerRef}
                        type="button"
                        onMouseEnter={() => {
                          cancelUpcomingClose();
                          setIsUpcomingProductsOpen(true);
                        }}
                        onFocus={() => setIsUpcomingProductsOpen(true)}
                        onClick={() => {
                          cancelUpcomingClose();
                          setIsUpcomingProductsOpen((prev) => !prev);
                        }}
                        aria-expanded={isUpcomingProductsOpen}
                        aria-controls="desktop-upcoming-products"
                        className="flex w-full items-center justify-between gap-2.5 px-3.5 py-2.5 bg-[#e4eeff] text-left rounded-2xl hover:bg-[#dce9ff] transition-colors duration-150"
                      >
                        <span className="flex items-center gap-2.5">
                          <Rocket className="h-4 w-4 text-[#1763ff]" />
                          <span className="text-[13px] font-bold text-[#1763ff]">
                            UPCOMING PRODUCTS
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-[#1763ff] transition-transform duration-200" />
                      </button>
                    </div>
                    {isUpcomingProductsOpen && (
                      <div
                        ref={upcomingPanelRef}
                        id="desktop-upcoming-products"
                        onMouseEnter={cancelUpcomingClose}
                        onMouseLeave={scheduleUpcomingClose}
                        className="fixed z-[60] max-h-[calc(100vh-16px)] w-[280px] max-w-[calc(100vw-16px)] overflow-y-auto rounded-2xl border border-slate-200/90 bg-white p-2 shadow-[0_20px_50px_rgba(11,24,49,0.16)]"
                        style={{
                          top: upcomingSubmenuPosition?.top ?? 0,
                          left: upcomingSubmenuPosition?.left ?? 0,
                          visibility: upcomingSubmenuPosition ? 'visible' : 'hidden',
                          fontFamily: 'Inter, Arial, sans-serif',
                        }}
                      >
                        <div className="flex flex-col gap-0.5">
                          {upcomingProductItems.map(renderUpcomingItem)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        <Link className="button small hidden sm:inline-flex items-center gap-1.5" to="/start">
          <span>Start with 100 free tests</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          id="menu-toggle"
          className="lg:hidden"
          aria-label="Open menu"
          aria-expanded={isOpen ? 'true' : 'false'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          ☰
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-menu"
        className={isBlogReadingRoute ? 'aq-fixed-blog-mobile-menu' : undefined}
        style={isBlogReadingRoute && isOpen ? { position: 'fixed', top: typeof window !== 'undefined' && window.innerWidth <= 1023 ? '70px' : '86px' } : undefined}
        hidden={!isOpen}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>
          The platform
        </Link>
        <Link to="/proof" onClick={() => setIsOpen(false)}>
          How it works
        </Link>
        <Link to="/pricing" onClick={() => setIsOpen(false)}>
          Your options
        </Link>
        <Link to="/payoff" onClick={() => setIsOpen(false)}>
          Your value
        </Link>

        {/* Mobile Who We Are Accordion */}
        <div className="border-t border-slate-100 py-2">
          <button
            type="button"
            onClick={() => {
              setIsMobileWhoWeAreOpen((prev) => !prev);
              setIsMobileOtherPlatformOpen(false);
              setIsMobileUpcomingProductsOpen(false);
            }}
            className="flex items-center justify-between w-full py-2 px-3 text-[14px] font-semibold text-[#0b1831]"
            aria-expanded={isMobileWhoWeAreOpen}
          >
            <span>Who We Are</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isMobileWhoWeAreOpen ? 'rotate-180 text-[#1763ff]' : 'text-slate-500'
              }`}
            />
          </button>

          {isMobileWhoWeAreOpen && (
            <div className="pl-3 pr-2 py-2 flex flex-col gap-1 bg-[#f9fbff] rounded-xl mt-1">
              <div className="aqe-caption text-[12px] font-bold tracking-wider text-[#69758a] uppercase px-2 pt-2">
                COMPANY
              </div>
              {companyItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 text-[13px] text-[#0b1831] hover:text-[#1763ff]"
                  >
                    <IconComponent className="h-4 w-4 text-[#1763ff]" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Other Platform Accordion */}
        <div className="border-t border-slate-100 py-2">
          <button
            type="button"
            onClick={() => {
              setIsMobileOtherPlatformOpen((prev) => !prev);
              setIsMobileWhoWeAreOpen(false);
              setIsMobileUpcomingProductsOpen(false);
            }}
            className="flex items-center justify-between w-full py-2 px-3 text-[14px] font-semibold text-[#0b1831]"
            aria-expanded={isMobileOtherPlatformOpen}
          >
            <span>Other Platform</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isMobileOtherPlatformOpen ? 'rotate-180 text-[#1763ff]' : 'text-slate-500'
              }`}
            />
          </button>

          {isMobileOtherPlatformOpen && (
            <div className="pl-3 pr-2 py-2 flex flex-col gap-1 bg-[#f9fbff] rounded-xl mt-1">
              <div className="aqe-caption text-[12px] font-bold tracking-wider text-[#69758a] uppercase px-2 pt-2">
                PLATFORMS
              </div>
              <div className="flex flex-col gap-1.5 mt-1">
                {availablePlatformItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between w-full py-2 px-2.5 rounded-lg border border-[#e5f7ea] text-[13px] text-[#0b1831]"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <IconComponent className="h-4 w-4 text-[#1763ff] shrink-0" />
                        <span className="font-semibold truncate">{item.name}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#15803d] bg-[#dcfce7] border border-[#bbf7d0] shrink-0">
                        <CheckCircle2 className="h-3 w-3 fill-[#16a34a] text-white" />
                        <span>Available</span>
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-2.5 rounded-xl border border-[#dbe6fe] bg-[#f4f7fe] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileUpcomingProductsOpen((prev) => !prev)}
                  aria-expanded={isMobileUpcomingProductsOpen}
                  aria-controls="mobile-upcoming-products"
                  className="flex w-full items-center justify-between gap-2 px-3 py-2 bg-[#e4eeff] border-b border-[#dbe6fe]/80 text-left"
                >
                  <span className="flex items-center gap-2">
                    <Rocket className="h-3.5 w-3.5 text-[#1763ff]" />
                    <span className="text-[12px] font-bold text-[#1763ff]">UPCOMING PRODUCTS</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#1763ff] transition-transform duration-200 ${
                      isMobileUpcomingProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isMobileUpcomingProductsOpen && (
                  <div id="mobile-upcoming-products" className="p-1 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                    {upcomingProductItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.to}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between w-full py-1.5 px-2 text-[12px] text-[#0b1831]"
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <IconComponent className="h-3.5 w-3.5 text-[#1763ff] shrink-0" />
                            <span className="font-medium truncate">{item.name}</span>
                          </span>
                          <span className="text-[10px] font-medium text-[#2563eb] bg-[#eef4ff] border border-[#dbe6fe] px-1.5 py-0.5 rounded-full shrink-0">
                            Coming Soon
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Technical library omitted to match desktop navigation
        <Link to="/docs" onClick={() => setIsOpen(false)}>
          Technical library
        </Link>
        */}

        {/* Mobile CTA Button */}
        <div className="pt-4 pb-2 px-1">
          <Link
            className="button small w-full flex items-center justify-center gap-2 text-center"
            to="/start"
            onClick={() => setIsOpen(false)}
          >
            <span>Start with 100 free tests</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
};
