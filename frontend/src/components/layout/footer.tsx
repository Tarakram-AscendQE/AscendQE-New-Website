import { Link } from "react-router-dom";
import logoImg from "@/assets/brand-logos/AscendQE-white-logo.webp";
import linkedinIcon from "@/assets/socialmedia-logos/linkedin-icon.webp";
import xIcon from "@/assets/socialmedia-logos/x-icon.webp";
import youtubeIcon from "@/assets/socialmedia-logos/youtube-icon.webp";
import facebookIcon from "@/assets/socialmedia-logos/facebook-icon.webp";
import instagramIcon from "@/assets/socialmedia-logos/instagram-icon.webp";

const SOCIAL_LINKS = [
  { icon: linkedinIcon, alt: "LinkedIn", href: "https://www.linkedin.com/company/ascendqe/" },
  { icon: xIcon, alt: "X", href: "https://x.com/AscendQE" },
  { icon: youtubeIcon, alt: "YouTube", href: "https://www.youtube.com/@AscendQE" },
  { icon: facebookIcon, alt: "Facebook", href: "https://www.facebook.com/AscendQEAI" },
  { icon: instagramIcon, alt: "Instagram", href: "https://www.instagram.com/ascendqe" },
];

const FOOTER_COLS = [
  {
    title: "Products",
    links: [
      { label: "myDiya", href: "/mydiya" },
      { label: "mySTLC", href: "/mystlc" },
      { label: "mySDET", href: "/mysdet" },
      { label: "myTEVV", href: "/mytevv" },
      { label: "myP95", href: "/myp95" },
      { label: "myUT", href: "/myut" },
      { label: "myTDM", href: "/mytdm" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Insights", href: "/blogs" },
      { label: "Careers", href: "/careers" },
      { label: "Customer Stories", href: "/testimonials" },
      { label: "Connect With Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Platform Overview",
    links: [
      { label: "The Platform", href: "/" },
      { label: "How it works", href: "/proof" },
      { label: "Your options", href: "/pricing" },
      { label: "Your value", href: "/payoff" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="block w-full border-t border-white/10 bg-[#050d18] text-slate-400"
      style={{ display: "block", width: "100%", margin: 0, padding: 0, fontFamily: "Inter, Arial, sans-serif" }}
    >
      {/* Top Section: Brand + Navigation Columns */}
      <div className="w-full px-6 sm:px-[5.5%] pt-14 sm:pt-16 pb-12">
        <div className="flex flex-col md:flex-row flex-wrap items-start gap-12 md:gap-20 lg:gap-24">
          {/* Brand Column */}
          <div className="max-w-[320px]">
            <Link to="/" className="inline-block">
              <img
                src={logoImg}
                alt="AscendQE"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-[#7c8aa0] text-[14px] sm:text-[15px] leading-[1.65]">
              The intelligence layer for quality engineering — a connected system of AI agents for the enterprise.
            </p>
            <div className="mt-6 flex items-center gap-4 sm:gap-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.alt}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.alt}
                  className="opacity-80 hover:opacity-100 transition-all hover:scale-110 flex items-center justify-center"
                >
                  <img src={s.icon} alt={s.alt} className="h-6 sm:h-7 w-auto object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="min-w-[140px]">
              <div className="text-white text-[15px] sm:text-[16px] font-semibold tracking-[0.03em]">
                {col.title}
              </div>
              <ul className="mt-4 space-y-3 p-0 list-none m-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link
                        to={l.href}
                        className="text-[#7c8aa0] transition-colors hover:text-[#00e5c0] text-[14px] sm:text-[15px]"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7c8aa0] transition-colors hover:text-[#00e5c0] text-[14px] sm:text-[15px]"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Divider Line */}
      <div className="w-full border-t border-white/10" />

      {/* Bottom Copyright Notice */}
      <div className="w-full px-6 sm:px-[5.5%] pt-6 pb-10 text-[#5d6b7d] aqe-caption">
        © 2026 AscendQE. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
