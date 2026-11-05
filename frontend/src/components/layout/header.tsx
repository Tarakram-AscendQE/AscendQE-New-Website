import React, { useState, useRef, useEffect } from 'react';
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
    name: 'Connect With Us',
    icon: Mail,
    to: '/contact',
  },
];

const availablePlatformItems: DropdownItem[] = [
  {
    name: 'AscendQE.ai',
    icon: Box,
    to: '/',
  },
  {
    name: 'myDiya.ai',
    icon: Box,
    to: '/mydiya',
  },
  {
    name: 'mySDET.ai',
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
    to: 'https://prcheck.live',
    isExternal: true,
  },
];

const upcomingProductItems: DropdownItem[] = [
  {
    name: 'mySTLC.ai',
    icon: Box,
    to: '/mystlc',
  },
  {
    name: 'myTEVV.ai',
    icon: Box,
    to: '/mytevv',
  },
  {
    name: 'myP95.ai',
    icon: Box,
    to: '/myp95',
  },
  {
    name: 'myUT.ai',
    icon: Box,
    to: '/myut',
  },
  {
    name: 'myTDM.ai',
    icon: Box,
    to: '/mytdm',
  },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false);
  const [isMobileWhoWeAreOpen, setIsMobileWhoWeAreOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsWhoWeAreOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsWhoWeAreOpen(false);
      }
    };

    if (isWhoWeAreOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWhoWeAreOpen]);

  // Close dropdowns on route change
  useEffect(() => {
    setIsWhoWeAreOpen(false);
    setIsOpen(false);
    setIsMobileWhoWeAreOpen(false);
  }, [location.pathname]);

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
        onClick={() => setIsWhoWeAreOpen(false)}
        className={linkClasses}
      >
        {content}
      </a>
    ) : (
      <Link
        key={item.name}
        to={item.to}
        onClick={() => setIsWhoWeAreOpen(false)}
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
      'group flex items-center justify-between px-3 py-2 rounded-xl bg-[#f4fcf6] hover:bg-[#eaf8ee] border border-[#e5f7ea] transition-all duration-150';

    return isExt ? (
      <a
        key={item.name}
        href={item.to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setIsWhoWeAreOpen(false)}
        className={linkClasses}
      >
        {content}
      </a>
    ) : (
      <Link
        key={item.name}
        to={item.to}
        onClick={() => setIsWhoWeAreOpen(false)}
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
        onClick={() => setIsWhoWeAreOpen(false)}
        className={linkClasses}
      >
        {content}
      </a>
    ) : (
      <Link
        key={item.name}
        to={item.to}
        onClick={() => setIsWhoWeAreOpen(false)}
        className={linkClasses}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-all" style={{ backgroundColor: '#ffffff' }}>
        <Link className="brand flex items-center" to="/">
          <img
            src={logoImg}
            alt="AscendQE"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>
        <nav aria-label="Main navigation" className="relative hidden lg:flex items-center gap-7">
          <Link
            to="/"
            {...(currentPath === '/' || currentPath === '/index.html' ? { 'aria-current': 'page' } : {})}
          >
            The platform
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
              ref={triggerRef}
              type="button"
              onClick={() => setIsWhoWeAreOpen((prev) => !prev)}
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
          </div>

          {/* Who We Are Dropdown Panel */}
          {isWhoWeAreOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-[calc(100%+33px)] left-0 w-[840px] max-w-[95vw] bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(11,24,49,0.12)] p-6 z-50 animate-in fade-in zoom-in-95 duration-150"
              style={{
                fontFamily: 'Inter, Arial, sans-serif',
              }}
            >
              <div className="grid grid-cols-[1fr_auto_1.45fr] gap-6 items-stretch">
                {/* Column 1: COMPANY */}
                <div className="flex flex-col gap-1.5">
                  <div className="text-[11px] font-bold tracking-[1.5px] text-[#69758a] uppercase px-3 py-1 mb-1">
                    COMPANY
                  </div>
                  {companyItems.map(renderCompanyItem)}
                </div>

                {/* Vertical Divider Line */}
                <div className="w-[1px] bg-[#eceef5] my-1" aria-hidden="true" />

                {/* Column 2: PLATFORMS */}
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] font-bold tracking-[1.5px] text-[#69758a] uppercase px-3 py-1 mb-0.5">
                    PLATFORMS
                  </div>

                  {/* Available Platforms */}
                  <div className="flex flex-col gap-1.5">
                    {availablePlatformItems.map(renderAvailableItem)}
                  </div>

                  {/* Upcoming Products Card */}
                  <div className="mt-2 rounded-2xl border border-[#dbe6fe] bg-[#f4f7fe] overflow-hidden">
                    <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#e4eeff] border-b border-[#dbe6fe]/80">
                      <Rocket className="h-4 w-4 text-[#1763ff]" />
                      <span className="text-[13px] font-bold text-[#1763ff]">
                        Upcoming Products
                      </span>
                    </div>
                    <div className="p-1.5 flex flex-col gap-0.5">
                      {upcomingProductItems.map(renderUpcomingItem)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
      <div id="mobile-menu" hidden={!isOpen}>
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
            onClick={() => setIsMobileWhoWeAreOpen((prev) => !prev)}
            className="flex items-center justify-between w-full py-2 px-3 text-[14px] font-semibold text-[#0b1831]"
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
              {companyItems.map((item) =>
                item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 text-[13px] text-[#0b1831] hover:text-[#1763ff]"
                  >
                    <item.icon className="h-4 w-4 text-[#1763ff]" />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 text-[13px] text-[#0b1831] hover:text-[#1763ff]"
                  >
                    <item.icon className="h-4 w-4 text-[#1763ff]" />
                    <span>{item.name}</span>
                  </Link>
                )
              )}

              <div className="aqe-caption text-[12px] font-bold tracking-wider text-[#69758a] uppercase px-2 pt-3">
                PLATFORMS
              </div>
              <div className="flex flex-col gap-1.5 mt-1">
                {availablePlatformItems.map((item) => {
                  const IconComponent = item.icon;
                  const isExt = Boolean(
                    item.isExternal ||
                    item.to.startsWith('http://') ||
                    item.to.startsWith('https://') ||
                    item.to.startsWith('//')
                  );
                  const inner = (
                    <div className="flex items-center justify-between w-full py-2 px-2.5 rounded-lg bg-[#f4fcf6] border border-[#e5f7ea] text-[13px] text-[#0b1831]">
                      <div className="flex items-center gap-2 min-w-0">
                        <IconComponent className="h-4 w-4 text-[#1763ff] shrink-0" />
                        <span className="font-semibold text-[#0b1831] truncate">{item.name}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#15803d] bg-[#dcfce7] border border-[#bbf7d0] shrink-0">
                        <CheckCircle2 className="h-3 w-3 fill-[#16a34a] text-white" />
                        <span>Available</span>
                      </span>
                    </div>
                  );
                  return isExt ? (
                    <a
                      key={item.name}
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                    >
                      {inner}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Upcoming Products */}
              <div className="mt-2.5 rounded-xl border border-[#dbe6fe] bg-[#f4f7fe] overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#e4eeff] border-b border-[#dbe6fe]/80">
                  <Rocket className="h-3.5 w-3.5 text-[#1763ff]" />
                  <span className="text-[12px] font-bold text-[#1763ff]">Upcoming Products</span>
                </div>
                <div className="p-1 flex flex-col gap-0.5">
                  {upcomingProductItems.map((item) => {
                    const IconComponent = item.icon;
                    const inner = (
                      <div className="flex items-center justify-between w-full py-1.5 px-2 text-[12px] text-[#0b1831]">
                        <div className="flex items-center gap-2 min-w-0">
                          <IconComponent className="h-3.5 w-3.5 text-[#1763ff] shrink-0" />
                          <span className="font-medium truncate">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-slate-400 font-normal select-none">-</span>
                          <span className="text-[10px] font-medium text-[#2563eb] bg-[#eef4ff] border border-[#dbe6fe] px-1.5 py-0.5 rounded-full">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    );
                    return (
                      <Link
                        key={item.name}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                      >
                        {inner}
                      </Link>
                    );
                  })}
                </div>
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
