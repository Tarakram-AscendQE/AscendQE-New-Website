import { ScrollToTop } from "@/shared/ScrollToTop";
import { useEffect } from "react";
import {
  ShieldCheck,
  Settings,
  Users,
  BarChart3,
  Target,
  FileText,
  Wrench,
  Clock,
  AlertTriangle,
  Brain,
  Gauge,
  Share2,
  ChevronRight,
  ChevronDown,
  Code2,
  Cloud,
  FileSearch,
  Award,
  BookOpen,
  GraduationCap,
  Rocket,
  Boxes,
  ArrowRight,
  Quote,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/shared";
import aqShortLogo from "@/assets/about-page-images/AQ-short-logo.webp";
import aboutBelieveImage from "@/assets/about-page-images/AscendQE-about-page.webp";
import nagFounderImage from "@/assets/about-page-images/Nag-image-2.webp";
import nagAvatarImage from "@/assets/about-page-images/Nag.webp";

const HERO_ORBIT_CARDS = [
  { icon: Users, label: "Intelligent\nPlatforms", left: "50%", top: "11.56%", accent: "#1763ff" },
  { icon: BarChart3, label: "Greater\nConfidence", left: "86.56%", top: "38.12%", accent: "#38bdf8" },
  { icon: Target, label: "Future-Ready\nQE", left: "72.59%", top: "81.09%", accent: "#1763ff" },
  { icon: ShieldCheck, label: "Enterprise\nGovernance", left: "27.41%", top: "81.09%", accent: "#00b6b4" },
  { icon: Settings, label: "Agentic\nCapabilities", left: "13.44%", top: "38.12%", accent: "#38bdf8" },
];

const FRAGMENTED_ITEMS = [
  { icon: FileText, label: "Manual Processes", offset: "2xl:translate-x-5 3xl:translate-x-7" },
  { icon: Wrench, label: "Fragmented Tools", offset: "2xl:-translate-x-4 3xl:-translate-x-6" },
  { icon: Users, label: "Siloed Teams", offset: "2xl:translate-x-6 3xl:translate-x-8" },
  { icon: BarChart3, label: "Limited Visibility", offset: "2xl:-translate-x-6 3xl:-translate-x-8" },
  { icon: Clock, label: "Slow Releases", offset: "2xl:translate-x-5 3xl:translate-x-7" },
  { icon: AlertTriangle, label: "Higher Risk", offset: "2xl:-translate-x-3 3xl:-translate-x-5" },
];

const INTELLIGENT_LEFT_CARDS = [
  { icon: Gauge, label: "Faster\nDelivery", color: "#1763ff", bg: "bg-[#eff4ff]" },
  { icon: BarChart3, label: "Unified\nVisibility", color: "#00b6b4", bg: "bg-[#e6faf8]" },
];

const INTELLIGENT_RIGHT_CARDS = [
  { icon: Settings, label: "Adaptive\nQuality Engineering", color: "#1763ff", bg: "bg-[#eff4ff]" },
  { icon: Share2, label: "Connected\nEcosystem", color: "#00b6b4", bg: "bg-[#e6faf8]" },
  { icon: ShieldCheck, label: "Greater\nConfidence", color: "#1763ff", bg: "bg-[#eff4ff]" },
];

const BELIEVE_FLOATING_WINDOWS = [
  { icon: Code2, left: "9%", top: "13%", rotate: "-8deg", delay: 0 },
  { icon: Cloud, left: "5%", top: "40%", rotate: "-6deg", delay: 0.4 },
  { icon: BarChart3, left: "73%", top: "15%", rotate: "8deg", delay: 0.2 },
  { icon: ShieldCheck, left: "77%", top: "41%", rotate: "6deg", delay: 0.6 },
];

const BELIEVE_CARDS = [
  {
    icon: Settings,
    title: "Engineering before hype",
    desc: "Technology should solve real QE problems.",
    titleColor: "text-[#0b1831]",
    cardStyle: "bg-white border-[#e0e5ef] hover:border-[#1763ff]",
    iconStyle: "bg-[#eff4ff] text-[#1763ff] border-[#dbe6ff]",
  },
  {
    icon: Users,
    title: "Autonomy with accountability",
    desc: "AI can accelerate work, while humans remain responsible for key decisions.",
    titleColor: "text-[#0b1831]",
    cardStyle: "bg-white border-[#e0e5ef] hover:border-[#00b6b4]",
    iconStyle: "bg-[#e6faf8] text-[#00b6b4] border-[#b2f1ec]",
  },
  {
    icon: FileSearch,
    title: "Evidence before assumptions",
    desc: "Quality decisions should be traceable and supported by engineering evidence.",
    titleColor: "text-[#0b1831]",
    cardStyle: "bg-white border-[#e0e5ef] hover:border-[#1763ff]",
    iconStyle: "bg-[#eff4ff] text-[#1763ff] border-[#dbe6ff]",
  },
  {
    icon: ShieldCheck,
    title: "Customer control",
    desc: "Enterprises should retain control of their tools, environments, assets, and quality outcomes.",
    titleColor: "text-[#0b1831]",
    cardStyle: "bg-white border-[#e0e5ef] hover:border-[#00b6b4]",
    iconStyle: "bg-[#e6faf8] text-[#00b6b4] border-[#b2f1ec]",
  },
];

const LEADERSHIP_BADGES = [
  {
    icon: Award,
    title: "25+",
    subtitle: "Years of Experience",
    iconColor: "text-[#1763ff]",
    iconBg: "bg-[#eff4ff] border-[#dbe6ff]",
  },
  {
    icon: Settings,
    title: "Quality Engineering",
    subtitle: "Testing & Automation",
    iconColor: "text-[#00b6b4]",
    iconBg: "bg-[#e6faf8] border-[#b2f1ec]",
  },
  {
    icon: Target,
    title: "Transformation",
    subtitle: "Enterprise QE",
    iconColor: "text-[#1763ff]",
    iconBg: "bg-[#eff4ff] border-[#dbe6ff]",
  },
  {
    icon: BookOpen,
    title: "Author & Mentor",
    subtitle: "Community Impact",
    iconColor: "text-[#00b6b4]",
    iconBg: "bg-[#e6faf8] border-[#b2f1ec]",
  },
];

const STORY_TIMELINE = [
  {
    year: "2001",
    title: "Journey begins",
    desc: "Started training software testing professionals in Hyderabad.",
    icon: GraduationCap,
    accent: "text-[#1763ff]",
    ringBorder: "border-[#1763ff]/50 shadow-[0_4px_14px_rgba(23,99,255,0.18)]",
  },
  {
    year: "2005",
    title: "Movement grows",
    desc: "70,000+ professionals mentored across India and globally.",
    icon: Users,
    accent: "text-[#00b6b4]",
    ringBorder: "border-[#00b6b4]/50 shadow-[0_4px_14px_rgba(0,182,180,0.18)]",
  },
  {
    year: "2010s",
    title: "Books published",
    desc: "University-designated reference texts by Wiley India & Dreamtech.",
    icon: BookOpen,
    accent: "text-[#1763ff]",
    ringBorder: "border-[#1763ff]/50 shadow-[0_4px_14px_rgba(23,99,255,0.18)]",
  },
  {
    year: "2026",
    title: "AscendQE platforms",
    desc: "Launched myDiya (QE Agency) and a suite of 6 specialized platforms for Quality Engineering.",
    icon: Rocket,
    accent: "text-[#00b6b4]",
    ringBorder: "border-[#00b6b4]/50 shadow-[0_4px_14px_rgba(0,182,180,0.18)]",
  },
];

const DIRECTION_PILLARS = [
  {
    icon: Users,
    label: "Human\nexpertise",
    cardBg: "bg-[#eff4ff] border-[#dbe6ff] hover:border-[#1763ff]",
    iconColor: "text-[#1763ff]",
  },
  {
    icon: Brain,
    label: "Specialized\nAI agents",
    cardBg: "bg-[#e6faf8] border-[#b2f1ec] hover:border-[#00b6b4]",
    iconColor: "text-[#00b6b4]",
  },
  {
    icon: FileSearch,
    label: "Engineering\nevidence",
    cardBg: "bg-[#eff4ff] border-[#dbe6ff] hover:border-[#1763ff]",
    iconColor: "text-[#1763ff]",
  },
  {
    icon: ShieldCheck,
    label: "Governance",
    cardBg: "bg-[#e6faf8] border-[#b2f1ec] hover:border-[#00b6b4]",
    iconColor: "text-[#00b6b4]",
  },
  {
    icon: BarChart3,
    label: "Continuous\nlearning",
    cardBg: "bg-[#eff4ff] border-[#dbe6ff] hover:border-[#1763ff]",
    iconColor: "text-[#1763ff]",
  },
];

export function AboutUsPage() {
  useEffect(() => {
    if (window.location.hash.includes("founder")) {
      setTimeout(() => {
        document.getElementById("founder")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (window.location.hash.includes("vision")) {
      setTimeout(() => {
        document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white text-[#0b1831] font-sans overflow-x-hidden selection:bg-[#1763ff]/20 selection:text-[#1763ff]">
      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1: ABOUT ASCENDQE HERO (Light Theme matching other pages)
         ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#DCE5F5]"
      >
        <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            {/* ── Left Column: Brand Story & Belief Callout (7 cols) ── */}
            <Reveal delay={0.1} className="w-full min-w-0 lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
              {/* Breadcrumb */}
              <p className="mb-6 text-xs text-[#69758a]">
                <a href="/" className="hover:text-[#1763ff] transition-colors">Home</a>
                <span className="mx-1.5 text-[#cbd5e1]">›</span>
                <span className="text-[#1763ff] font-semibold">About Us</span>
              </p>

              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1763ff]" />
                <span className="aqe-label-text text-[#1763ff]">ABOUT ASCENDQE</span>
              </div>

              <h1
                className="aqe-hero-heading text-[#0B1638] leading-[1.12] mb-6 font-[750] tracking-tight"
                style={{ fontSize: "clamp(2rem, 3.2vw + 0.6rem, 3.5rem)" }}
              >
                <span className="block text-[#0B1638] sm:whitespace-nowrap">
                  Built From{" "}
                  <span className="text-[#1763ff]">
                    Quality Engineering.
                  </span>
                </span>
                <span className="block text-[#0B1638] mt-1">Built for What Comes Next.</span>
              </h1>

              <p className="aqe-intro text-[#263653] max-w-2xl leading-relaxed mb-5">
                AscendQE is a Quality Engineering technology company focused on helping enterprises
                build greater confidence across software and AI systems.
              </p>

              <p className="aqe-paragraph text-[#69758a] mb-3.5">
                We were founded on a simple belief:
              </p>

              <div className="w-full max-w-xl rounded-2xl bg-[#EAF1FF] border border-[#dbe6ff] border-l-4 border-l-[#1763ff] px-6 py-5 mb-6 shadow-sm">
                <p className="aqe-intro font-bold leading-snug">
                  <span className="text-[#0B1638]">Quality Engineering </span>
                  <span className="text-[#1763ff]">
                    must evolve at the same pace as software engineering.
                  </span>
                </p>
              </div>

              <p className="aqe-paragraph text-[#69758a] max-w-2xl leading-relaxed">
                With deep experience in software testing, automation, Quality Engineering, and
                enterprise transformation, AscendQE is building the next generation of intelligent,
                agentic, and governed QE platforms.
              </p>
            </Reveal>

            {/* ── Right Column: AQ Logo + Concentric Rings + 5 Rotating Orbital Cards (5 cols) ── */}
            <Reveal delay={0.25} className="w-full min-w-0 lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
              <div
                className="aq-orbit-wrapper relative w-full max-w-[620px] aspect-square select-none overflow-visible"
                style={{ containerType: "inline-size" }}
              >
                {/* Ambient Center Glow */}
                <div
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    height: "60%",
                    background:
                      "radial-gradient(circle, rgba(23,99,255,0.12) 0%, rgba(56,189,248,0.06) 50%, transparent 70%)",
                    filter: "blur(32px)",
                  }}
                />

                {/* ── Static Background Concentric Rings & Guidelines ── */}
                <svg
                  viewBox="0 0 640 640"
                  className="pointer-events-none absolute inset-0 h-full w-full z-10 overflow-visible"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="siteRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1763ff" stopOpacity="0.45" />
                      <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00b6b4" stopOpacity="0.45" />
                    </linearGradient>
                  </defs>

                  {/* Outer guideline ring with faint dashes */}
                  <circle cx="320" cy="320" r="285" stroke="#dbe6ff" strokeWidth="1" strokeDasharray="5 7" opacity="0.5" />

                  {/* Main Orbit Ring (where the 5 cards travel) */}
                  <circle cx="320" cy="320" r="246" stroke="url(#siteRingGrad)" strokeWidth="1.8" />

                  {/* Mid concentric rings */}
                  <circle cx="320" cy="320" r="200" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="6 8" opacity="0.6" />
                  <circle cx="320" cy="320" r="150" stroke="url(#siteRingGrad)" strokeWidth="1.5" opacity="0.45" />
                  <circle cx="320" cy="320" r="115" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.5" />

                  {/* Accent ring hugging the center AQ badge */}
                  <circle cx="320" cy="320" r="92" stroke="#1763ff" strokeWidth="2" opacity="0.4" />

                  {/* Orbit Node Dots */}
                  <circle cx="320" cy="74" r="3.5" fill="#1763ff" />
                  <circle cx="566" cy="320" r="3.5" fill="#38bdf8" />
                  <circle cx="320" cy="566" r="3.5" fill="#1763ff" />
                  <circle cx="74" cy="320" r="3.5" fill="#00b6b4" />
                  <circle cx="108" cy="190" r="3" fill="#38bdf8" />
                  <circle cx="532" cy="190" r="3" fill="#1763ff" />
                  <circle cx="178" cy="485" r="3" fill="#00b6b4" />
                  <circle cx="462" cy="485" r="3" fill="#38bdf8" />
                </svg>

                {/* ── Stationary Center AQ Logo Badge (Guaranteed 100% Center via inline transform & inset) ── */}
                <div
                  className="absolute z-20 flex items-center justify-center rounded-full bg-white shadow-[0_12px_36px_rgba(23,99,255,0.18)] border-2 border-[#1763ff]/30 select-none"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "25.5%",
                    aspectRatio: "1 / 1",
                  }}
                >
                  <img
                    src={aqShortLogo}
                    alt="AscendQE AQ Logo"
                    className="w-[74%] h-[74%] object-contain"
                    draggable={false}
                  />
                </div>

                {/* ── Rotating Orbital Layer (5 Equidistant Cards revolving around Center) ── */}
                <div className="absolute inset-0 pointer-events-none z-30 aq-orbit-spin">
                  {HERO_ORBIT_CARDS.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={idx}
                        className="absolute z-20 pointer-events-auto"
                        style={{
                          left: card.left,
                          top: card.top,
                          transform: "translate(-50%, -50%)",
                          width: "21.5%",
                          aspectRatio: "1.06 / 1",
                        }}
                      >
                        <div className="w-full h-full aq-orbit-counter">
                          <div
                            className="w-full h-full flex flex-col items-center justify-center text-center rounded-2xl bg-white border border-[#dbe6ff] shadow-[0_8px_24px_rgba(23,99,255,0.12)] hover:border-[#1763ff] hover:shadow-[0_12px_32px_rgba(23,99,255,0.22)] hover:scale-105 transition-all cursor-pointer p-2.5 sm:p-3"
                          >
                            <div
                              className="flex items-center justify-center rounded-full bg-[#eff4ff] border border-[#dbe6ff] mb-2"
                              style={{ width: "36px", height: "36px" }}
                            >
                              <Icon style={{ width: "20px", height: "20px", color: card.accent }} />
                            </div>
                            <span
                              className="font-bold text-[#0B1638] leading-tight whitespace-pre-line"
                              style={{ fontSize: "clamp(8.5px, 2.05cqw, 13px)" }}
                            >
                              {card.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2: WHY WE EXIST (LIGHT — From Fragmented Testing to Intelligent QE)
         ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-[#e0e5ef] text-[#0b1831]">
        <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-8 2xl:gap-10 items-center">
            {/* ── Left Column: Why We Exist Copy ── */}
            <Reveal delay={0.1} className="w-full min-w-0 xl:col-span-4 flex flex-col items-start text-left">
              <div className="h-[3px] w-28 sm:w-32 rounded-full bg-gradient-to-r from-[#1763ff] via-[#38bdf8] to-[#00b6b4] mb-5" />

              <h2 className="aqe-section-heading text-[#0b1831] mb-6 font-[750]">
                Why We{" "}
                <span className="text-[#1763ff]">
                  Exist
                </span>
              </h2>

              <p className="aqe-intro text-[#263653] leading-relaxed mb-5">
                Software delivery is becoming faster, more complex, and increasingly AI-driven.
              </p>

              <p className="aqe-intro font-bold leading-snug text-[#1763ff] mb-5">
                Quality Engineering must become more intelligent, adaptive, and connected.
              </p>

              <p className="aqe-paragraph text-[#69758a] leading-relaxed">
                AscendQE exists to help enterprises move from fragmented testing and manual
                orchestration toward a more intelligent Quality Engineering operating model.
              </p>
            </Reveal>

            {/* ── Right Column: Before vs After Operating Model Comparison ── */}
            <Reveal delay={0.25} className="w-full min-w-0 xl:col-span-8">
              <div className="w-full rounded-3xl bg-[#f8fafc] border border-[#e0e5ef] p-4 sm:p-6 lg:p-7 2xl:p-8 shadow-sm">
                <div className="grid grid-cols-1 2xl:grid-cols-[auto_auto_1fr] gap-6 2xl:gap-4 3xl:gap-6 items-center w-full">
                  {/* 1. LEFT SECTION: From Fragmented Testing */}
                  <div className="w-full 2xl:w-[280px] 3xl:w-[310px] flex flex-col items-center justify-between mx-auto">
                    <div className="relative w-full py-1 sm:py-2 flex flex-col items-center">
                      <div className="relative z-10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 2xl:flex 2xl:flex-col gap-2 sm:gap-2.5 2xl:gap-2.5 w-full items-center py-1 sm:py-2">
                        {FRAGMENTED_ITEMS.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.label}
                              animate={{ y: [0, idx % 2 === 0 ? -2.5 : 2.5, 0] }}
                              transition={{
                                duration: 3.6 + idx * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className={`flex items-center gap-2.5 rounded-xl bg-white border border-[#e0e5ef] px-3 sm:px-3.5 py-2 shadow-sm w-full 2xl:w-auto ${item.offset}`}
                            >
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#f1f5f9] text-[#0b1831]">
                                <Icon className="h-3.5 w-3.5" />
                              </div>
                              <span className="text-[11.5px] sm:text-xs font-semibold text-[#0b1831] whitespace-nowrap">
                                {item.label}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-4 flex flex-col items-center text-center">
                      <div className="rounded-full bg-white border border-[#e0e5ef] px-5 sm:px-6 py-2 sm:py-2.5 shadow-sm">
                        <span className="text-xs sm:text-[13.5px] font-bold text-[#0b1831]">
                          From Fragmented Testing
                        </span>
                      </div>
                      <p className="mt-2 aqe-caption font-semibold text-[#69758a]">
                        Manual. Disconnected. Reactive.
                      </p>
                    </div>
                  </div>

                  {/* 2. MIDDLE TRANSITION ARROWS */}
                  <div className="flex items-center justify-center py-2 2xl:py-0 px-1 sm:px-2 shrink-0">
                    <div className="hidden 2xl:flex items-center -space-x-3.5 3xl:-space-x-4">
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            opacity: [0.25, 1, 0.25],
                            x: [0, 5, 0],
                            scale: [0.92, 1.08, 0.92],
                          }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.18,
                          }}
                          className="text-[#1763ff]"
                        >
                          <ChevronRight className="h-9 w-9 sm:h-10 sm:w-10 3xl:h-11 3xl:w-11 stroke-[2.6]" />
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex 2xl:hidden flex-col items-center -space-y-3 my-2 sm:my-3">
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            opacity: [0.25, 1, 0.25],
                            y: [0, 4, 0],
                            scale: [0.92, 1.08, 0.92],
                          }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.18,
                          }}
                          className="text-[#1763ff]"
                        >
                          <ChevronDown className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2.6]" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* 3. RIGHT SECTION: To an Intelligent QE Operating Model */}
                  <div className="w-full flex-1 min-w-0 flex flex-col items-center justify-between">
                    <div className="relative w-full py-1 sm:py-2 flex flex-col items-center">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-20 mb-3 sm:mb-4 flex items-center gap-2.5 rounded-2xl bg-white border border-[#dbe6ff] px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-sm"
                      >
                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#eff4ff] text-[#1763ff]">
                          <Brain className="h-4 w-4" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-bold text-[#0b1831] leading-tight">
                          AI-Driven Intelligence
                        </span>
                      </motion.div>

                      <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1.1fr] gap-2.5 lg:gap-3 xl:gap-4 items-center w-full max-w-2xl mx-auto">
                        <div className="flex flex-col justify-center gap-2 sm:gap-2.5">
                          {INTELLIGENT_LEFT_CARDS.map((card, i) => {
                            const Icon = card.icon;
                            return (
                              <motion.div
                                key={i}
                                animate={{ y: [0, i % 2 === 0 ? 3 : -3, 0] }}
                                transition={{
                                  duration: 4.2 + i * 0.3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="flex items-center gap-2 sm:gap-2.5 rounded-2xl bg-white border border-[#dbe6ff]/90 px-3 py-2 sm:py-2.5 shadow-sm"
                              >
                                <div
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${card.bg}`}
                                  style={{ color: card.color }}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <span className="text-[11px] sm:text-xs font-bold text-[#0b1831] leading-tight whitespace-pre-line">
                                  {card.label}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Center: AQ Cube */}
                        <div className="relative flex flex-col items-center justify-center my-1 sm:my-0">
                          <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-[#1763ff]/15 via-[#38bdf8]/15 to-transparent blur-xl" />

                          <div className="relative z-20 flex h-24 w-24 sm:h-28 sm:w-28 2xl:h-32 2xl:w-32 items-center justify-center rounded-3xl bg-white border-2 border-[#1763ff]/30 shadow-[0_15px_40px_rgba(23,99,255,0.15)]">
                            <img
                              src={aqShortLogo}
                              alt="AscendQE AQ Core"
                              className="w-[74%] h-[74%] object-contain"
                              draggable={false}
                            />
                          </div>

                          <div className="relative z-10 -mt-2.5 sm:-mt-3 flex flex-col items-center">
                            <div className="h-3.5 sm:h-4 w-24 sm:w-28 2xl:w-32 rounded-xl bg-gradient-to-r from-[#1763ff] via-[#38bdf8] to-[#1763ff] shadow-[0_4px_16px_rgba(23,99,255,0.3)] border border-white/60" />
                            <div className="-mt-1 h-3.5 sm:h-4 w-28 sm:w-34 2xl:w-38 rounded-xl bg-gradient-to-r from-[#0e53e6] via-[#1763ff] to-[#0e53e6] shadow-[0_6px_20px_rgba(23,99,255,0.25)] border border-[#dbe6ff]/50" />
                            <div className="-mt-1 h-3.5 sm:h-4 w-32 sm:w-40 2xl:w-44 rounded-xl bg-gradient-to-r from-[#0b1831] via-[#1763ff] to-[#0b1831] shadow-[0_10px_28px_rgba(11,24,49,0.3)] border border-[#38bdf8]/40" />
                          </div>
                        </div>

                        <div className="flex flex-col justify-center gap-2 sm:gap-2.5">
                          {INTELLIGENT_RIGHT_CARDS.map((card, i) => {
                            const Icon = card.icon;
                            return (
                              <motion.div
                                key={i}
                                animate={{ y: [0, i % 2 === 0 ? -3 : 3, 0] }}
                                transition={{
                                  duration: 4.1 + i * 0.25,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="flex items-center gap-2 sm:gap-2.5 rounded-2xl bg-white border border-[#dbe6ff]/90 px-3 py-2 sm:py-2.5 shadow-sm"
                              >
                                <div
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${card.bg}`}
                                  style={{ color: card.color }}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <span className="text-[11px] sm:text-xs font-bold text-[#0b1831] leading-tight whitespace-pre-line">
                                  {card.label}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mobile Hub */}
                      <div className="flex sm:hidden flex-col items-center w-full">
                        <div className="relative flex flex-col items-center justify-center my-1">
                          <div className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-tr from-[#1763ff]/15 via-[#38bdf8]/15 to-transparent blur-xl" />
                          <div className="relative z-20 flex h-24 w-24 items-center justify-center rounded-2xl bg-white border-2 border-[#1763ff]/30 shadow-md">
                            <img
                              src={aqShortLogo}
                              alt="AscendQE AQ Core"
                              className="w-[74%] h-[74%] object-contain"
                              draggable={false}
                            />
                          </div>
                          <div className="relative z-10 -mt-2 flex flex-col items-center">
                            <div className="h-3 w-24 rounded-lg bg-gradient-to-r from-[#1763ff] via-[#38bdf8] to-[#1763ff] shadow-sm border border-white/60" />
                            <div className="-mt-1 h-3 w-28 rounded-lg bg-gradient-to-r from-[#0e53e6] via-[#1763ff] to-[#0e53e6] shadow-sm border border-[#dbe6ff]/50" />
                            <div className="-mt-1 h-3 w-32 rounded-lg bg-gradient-to-r from-[#0b1831] via-[#1763ff] to-[#0b1831] shadow-sm border border-[#38bdf8]/40" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 w-full mt-4">
                          {[...INTELLIGENT_LEFT_CARDS, ...INTELLIGENT_RIGHT_CARDS].map((card, idx) => {
                            const Icon = card.icon;
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-2.5 rounded-xl bg-white border border-[#dbe6ff]/90 px-3 py-2 shadow-xs"
                              >
                                <div
                                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${card.bg}`}
                                  style={{ color: card.color }}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-[11px] font-bold text-[#0b1831] leading-tight">
                                  {card.label.replace("\n", " ")}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col items-center text-center">
                      <div className="rounded-full bg-white border border-[#dbe6ff] px-5 sm:px-6 py-2 sm:py-2.5 shadow-sm">
                        <span className="text-xs sm:text-[13.5px] font-extrabold text-[#1763ff]">
                          To an Intelligent QE Operating Model
                        </span>
                      </div>
                      <p className="mt-2 aqe-caption font-bold text-[#0b1831]">
                        AI-Powered. Connected. Proactive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3: WHAT WE BELIEVE
         ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#f8fafc] py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-[#e0e5ef] text-[#0b1831]">
        <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
            {/* ── Left Column: 3D Lightbulb Pedestal ── */}
            <Reveal delay={0.15} className="w-full min-w-0 lg:col-span-5 flex justify-center">
              <div
                className="relative w-full max-w-[580px] aspect-[580/500] select-none flex items-center justify-center"
                style={{ containerType: "inline-size" }}
              >
                <img
                  src={aboutBelieveImage}
                  alt="What We Believe — Engineering Innovation & Trust"
                  className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(23,99,255,0.12)]"
                  draggable={false}
                />

                {BELIEVE_FLOATING_WINDOWS.map((win, idx) => {
                  const Icon = win.icon;
                  return (
                    <motion.div
                      key={idx}
                      animate={{ y: [0, idx % 2 === 0 ? -6 : 6, 0] }}
                      transition={{
                        duration: 4 + idx * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: win.delay,
                      }}
                      className="absolute z-20 flex flex-col justify-between rounded-xl bg-white border border-[#dbe6ff] shadow-md backdrop-blur-md"
                      style={{
                        left: win.left,
                        top: win.top,
                        width: "16.5%",
                        aspectRatio: "1.18 / 1",
                        padding: "1.6%",
                        transform: `rotate(${win.rotate})`,
                      }}
                    >
                      <div className="flex items-center gap-[6%] opacity-80">
                        <span className="h-[4px] w-[4px] rounded-full bg-[#1763ff]" />
                        <span className="h-[4px] w-[4px] rounded-full bg-[#38bdf8]" />
                        <span className="h-[4px] w-[4px] rounded-full bg-slate-300" />
                      </div>
                      <div className="flex flex-1 items-center justify-center">
                        <Icon className="text-[#1763ff]" style={{ width: "52%", height: "52%" }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>

            {/* ── Right Column: Heading + 2x2 Grid of 4 Belief Cards ── */}
            <div className="w-full min-w-0 lg:col-span-7 flex flex-col items-start text-left">
              <Reveal delay={0.1}>
                <div className="h-[3px] w-28 sm:w-32 rounded-full bg-gradient-to-r from-[#1763ff] via-[#38bdf8] to-[#00b6b4] mb-5" />

                <h2 className="aqe-section-heading text-[#0b1831] mb-8 font-[750]">
                  What We{" "}
                  <span className="text-[#1763ff]">
                    Believe
                  </span>
                </h2>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                {BELIEVE_CARDS.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <Reveal key={i} delay={0.15 + i * 0.1} className="h-full">
                      <div
                        className={`group rounded-2xl ${card.cardStyle} border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 backdrop-blur-md flex items-start gap-4 h-full`}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${card.iconStyle} transition-transform duration-300 group-hover:scale-105`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className={`text-base sm:text-[17.5px] font-extrabold ${card.titleColor} leading-snug mb-2`}>
                            {card.title}
                          </h3>
                          <p className="aqe-paragraph text-[#69758a] leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4: LEADERSHIP
         ══════════════════════════════════════════════════════════════════ */}
      <section
        id="founder"
        className="relative bg-white pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 overflow-hidden border-b border-[#e0e5ef] text-[#0b1831] scroll-mt-20"
      >
        <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 2xl:gap-14 items-center lg:items-end w-full">
            {/* ── Left Column: 3D Backdrop Frame + Founder Portrait ── */}
            <div className="w-full min-w-0 lg:col-span-6 flex flex-col items-center justify-end order-2 lg:order-1">
              <div
                className="relative w-full max-w-[580px] sm:max-w-[620px] lg:max-w-[660px] xl:max-w-[760px] 2xl:max-w-[840px] select-none flex flex-col items-center justify-end pt-2 sm:pt-3 xl:pt-4"
                style={{ containerType: "inline-size" }}
              >
                <div
                  className="pointer-events-none absolute left-[8%] sm:left-[10%] xl:left-[13%] right-[4%] sm:right-[5%] xl:right-[6%] top-[10%] sm:top-[12%] bottom-[2%] xl:bottom-[3%] rounded-[28px] sm:rounded-[36px] xl:rounded-[38px] border-2 border-slate-200 bg-slate-50/50 shadow-sm backdrop-blur-[2px] z-0"
                  style={{
                    transform: "perspective(950px) rotateY(12deg) skewY(8deg)",
                  }}
                />

                <div
                  className="pointer-events-none absolute left-[6%] sm:left-[8%] xl:left-[10%] right-[6%] sm:right-[7%] xl:right-[8%] top-[16%] sm:top-[18%] xl:top-[19%] bottom-0 rounded-t-[26px] sm:rounded-t-[34px] xl:rounded-t-[36px] bg-gradient-to-br from-[#1763ff] via-[#38bdf8]/85 to-[#00b6b4]/35 border border-white/65 shadow-lg z-10"
                  style={{
                    transform: "perspective(950px) rotateY(12deg) skewY(8deg)",
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-20 w-full flex justify-center items-end"
                >
                  <img
                    src={nagFounderImage}
                    alt="Nageswara Rao Pusuluri — Founder & CEO, AscendQE"
                    className="h-auto w-auto max-w-full max-h-[360px] xs:max-h-[400px] sm:max-h-[460px] md:max-h-[500px] lg:max-h-[540px] xl:max-h-[580px] 2xl:max-h-[620px] object-contain object-bottom drop-shadow-2xl"
                    draggable={false}
                  />
                </motion.div>

                {/* Desktop: 4 Credential Cards Floating */}
                <div className="hidden xl:flex flex-col justify-between absolute left-0 top-[18%] bottom-[4%] 2xl:top-[20%] 2xl:bottom-[4.5%] z-30 w-[190px] 2xl:w-[220px]">
                  {LEADERSHIP_BADGES.map((badge, idx) => {
                    const Icon = badge.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 24, x: -16, scale: 0.92 }}
                        whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.52,
                          delay: 0.5 + idx * 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-3 rounded-2xl bg-white border border-[#e0e5ef] p-3 2xl:p-3.5 shadow-md backdrop-blur-md"
                      >
                        <div
                          className={`flex h-9 w-9 2xl:h-10 2xl:w-10 shrink-0 items-center justify-center rounded-xl border ${badge.iconBg} ${badge.iconColor}`}
                        >
                          <Icon className="h-4.5 w-4.5 2xl:h-5 2xl:w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-extrabold text-[#0b1831] text-xs 2xl:text-[13.5px] leading-tight">
                            {badge.title}
                          </h4>
                          <p className="font-medium text-[#69758a] text-[10.5px] 2xl:text-[11.5px] leading-tight mt-0.5">
                            {badge.subtitle}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Responsive Grid Below Portrait */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-[560px] mx-auto mt-4 sm:mt-5 pb-1 xl:hidden relative z-30">
                {LEADERSHIP_BADGES.map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl bg-white border border-[#e0e5ef] p-3 sm:p-3.5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border ${badge.iconBg} ${badge.iconColor}`}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-[13px] font-extrabold text-[#0b1831] leading-tight">
                          {badge.title}
                        </h4>
                        <p className="text-[10.5px] sm:text-[11.5px] text-[#69758a] leading-tight mt-0.5">
                          {badge.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Right Column: Name, Role & Bio Copy ── */}
            <Reveal
              delay={0.2}
              className="relative w-full min-w-0 lg:col-span-6 flex flex-col items-start justify-end text-left order-1 lg:order-2 z-10 py-2 sm:py-3 lg:py-4 xl:py-4"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -top-3 sm:-top-4 lg:-top-5 left-0 font-black tracking-[0.04em] text-[#1763ff]/[0.05] leading-none whitespace-nowrap"
                style={{ fontSize: "clamp(36px, 5vw, 76px)" }}
              >
                LEADERSHIP
              </span>

              <div className="relative z-10 mb-3 sm:mb-4">
                <span className="block aqe-label-text tracking-[0.28em] text-[#69758a]">
                  LEADERSHIP
                </span>
                <div className="mt-2 h-[3.5px] w-28 sm:w-34 rounded-full bg-gradient-to-r from-[#1763ff] via-[#38bdf8] to-[#00b6b4]" />
              </div>

              <h2 className="relative z-10 text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] 2xl:text-[50px] font-extrabold tracking-tight text-[#0b1831] leading-[1.14]">
                <span>Nageswara </span>
                <span className="text-[#1763ff]">
                  Rao Pusuluri
                </span>
              </h2>

              <h3 className="relative z-10 text-lg xs:text-xl sm:text-2xl lg:text-[23px] xl:text-[25px] font-medium text-[#0b1831] mt-1.5 sm:mt-2 mb-4 sm:mb-5 2xl:mb-6">
                Founder & CEO, AscendQE
              </h3>

              <div className="relative z-10 flex flex-col gap-3.5 sm:gap-4 2xl:gap-5 max-w-2xl">
                <p className="text-[15px] sm:text-[16px] lg:text-[17px] 2xl:text-[18px] text-[#334155] leading-[1.7] sm:leading-[1.75] 2xl:leading-[1.8]">
                  With more than <span className="font-semibold text-[#0b1831]">25 years</span> in
                  software testing, test automation, and{" "}
                  <span className="font-semibold text-[#0b1831]">Quality Engineering</span>, Nageswara
                  Rao Pusuluri has worked across engineering, transformation, authorship, and
                  professional mentoring.
                </p>
                <p className="text-[15px] sm:text-[16px] lg:text-[17px] 2xl:text-[18px] text-[#334155] leading-[1.7] sm:leading-[1.75] 2xl:leading-[1.8] font-medium">
                  AscendQE reflects that experience applied to the next era of{" "}
                  <span className="font-semibold text-[#0b1831]">Quality Engineering</span>.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5: OUR STORY & TIMELINE
         ══════════════════════════════════════════════════════════════════ */}
      <section
        id="vision"
        className="relative bg-[#f8fafc] py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-[#e0e5ef] text-[#0b1831]"
      >
        <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-12 items-start">
            {/* ── Left Column: OUR STORY Copy ── */}
            <Reveal delay={0.1} className="w-full min-w-0 lg:col-span-6 flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-4 aqe-label-text">
                <span className="h-[2px] w-7 bg-[#1763ff]" />
                <span className="text-[#1763ff] font-bold tracking-[0.22em]">OUR STORY</span>
              </div>

              <h2 className="aqe-section-heading text-[#0b1831] leading-[1.14] mb-6 font-[750]">
                <span className="block">
                  A vision born in{" "}
                  <span className="text-[#1763ff]">
                    2001.
                  </span>
                </span>
                <span className="block text-[#0b1831] mt-1">
                  A platform serving the world today.
                </span>
              </h2>

              <div className="flex flex-col gap-4 mb-8">
                <p className="aqe-paragraph text-slate-700 leading-relaxed">
                  <span className="font-bold text-[#0b1831]">AscendQE Pvt Ltd</span> is a Quality
                  Engineering technology <span className="font-bold text-[#0b1831]">company, building</span>{" "}
                  intelligent and governed platforms — myDiya (QE Agency) and a suite of specialized
                  platforms (mySTLC, mySDET, myP95, myUT, myTDM, myTEVV) — to help enterprises
                  engineer quality at scale.
                </p>
                <p className="aqe-paragraph text-slate-600 leading-relaxed">
                  At the helm of this vision is{" "}
                  <span className="font-bold text-[#0b1831]">Mr. Nageswara Rao Pusuluri</span> — a
                  globally recognized Software Testing expert, educator, corporate trainer, and
                  published author, widely known in the industry as “Nag.” His journey in technology
                  and education began in 2001, when he started training the next generation of
                  software testing professionals.
                </p>
                <p className="aqe-paragraph text-slate-600 leading-relaxed">
                  Over more than two decades, this vision grew into a movement that has transformed
                  the careers of 70,000+ professionals across India and globally. Today, AscendQE is
                  bringing that experience to the next era — through myDiya and a connected ecosystem
                  of AI-powered platforms for Quality Engineering.
                </p>
              </div>

              {/* Quote & Founder Avatar Card */}
              <div className="w-full rounded-2xl bg-white border border-[#e0e5ef] p-5 sm:p-6 shadow-sm backdrop-blur-md">
                <div className="flex items-start gap-3.5 mb-4">
                  <Quote className="h-8 w-8 text-[#1763ff] shrink-0 rotate-180 opacity-85" />
                  <p className="aqe-paragraph italic font-semibold text-slate-800 leading-snug">
                    “From a classroom in Hyderabad in 2001 to AI-powered Quality Engineering
                    platforms serving the world — this is AscendQE.”
                  </p>
                </div>

                <div className="flex items-center gap-4 pl-2">
                  <img
                    src={nagAvatarImage}
                    alt="Nageswara Rao Pusuluri"
                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover object-top border-2 border-[#1763ff] shadow-md shrink-0 bg-slate-100"
                    draggable={false}
                  />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0b1831] leading-tight">
                      Nageswara Rao Pusuluri
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#69758a] mt-0.5 font-medium">
                      Founder & CEO, AscendQE
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Right Column: TIMELINE Flow Line ── */}
            <div className="w-full min-w-0 lg:col-span-6 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-6 pl-1 aqe-label-text">
                <span className="text-[#0b1831] font-bold tracking-[0.22em]">TIMELINE</span>
                <span className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[#1763ff] to-[#38bdf8]" />
              </div>

              <div className="relative w-full py-3">
                <div className="pointer-events-none absolute left-[27px] sm:left-[31px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1763ff] via-[#38bdf8] to-[#00b6b4] z-0" />
                <span className="pointer-events-none absolute left-[23px] sm:left-[27px] -top-1 h-2.5 w-2.5 rounded-full bg-white border-2 border-[#1763ff] z-20" />
                <span className="pointer-events-none absolute left-[23px] sm:left-[27px] -bottom-1 h-2.5 w-2.5 rounded-full bg-white border-2 border-[#00b6b4] z-20" />

                <div className="flex flex-col gap-7 sm:gap-8">
                  {STORY_TIMELINE.map((item, idx) => {
                    const Icon = item.icon;
                    const isLast = idx === STORY_TIMELINE.length - 1;

                    return (
                      <div key={item.year} className="relative flex flex-col xl:flex-row xl:items-center gap-3.5">
                        {!isLast && (
                          <span className="pointer-events-none absolute left-[23px] sm:left-[27px] -bottom-[19px] sm:-bottom-[21px] h-2.5 w-2.5 rounded-full bg-white border-2 border-[#38bdf8] z-20" />
                        )}

                        <div className={`flex items-center gap-4 sm:gap-5 ${isLast ? "xl:w-[58%]" : "w-full max-w-[460px]"}`}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.4 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                              duration: 0.45,
                              delay: idx * 0.22,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-white p-1.5 border border-[#e0e5ef] shadow-sm"
                          >
                            <div
                              className={`flex h-full w-full items-center justify-center rounded-full bg-[#eff4ff] border-2 ${item.ringBorder} ${item.accent}`}
                            >
                              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: 32, scale: 0.96 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                              duration: 0.55,
                              delay: 0.14 + idx * 0.22,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="min-w-0 flex-1 rounded-2xl bg-white border border-[#e0e5ef] hover:border-[#1763ff] px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <span className={`block text-sm sm:text-base font-extrabold ${item.accent} leading-none mb-1.5`}>
                              {item.year}
                            </span>
                            <h3 className="text-sm sm:text-[15.5px] font-bold text-[#0b1831] leading-snug mb-1">
                              {item.title}
                            </h3>
                            <p className="text-xs sm:text-[13px] text-[#69758a] leading-relaxed">
                              {item.desc}
                            </p>
                          </motion.div>
                        </div>

                        {isLast && (
                          <motion.div
                            initial={{ opacity: 0, x: 28, scale: 0.96 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                              duration: 0.55,
                              delay: 1.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col xl:flex-row items-start xl:items-center gap-3 pl-[72px] sm:pl-[84px] xl:pl-0 xl:flex-1"
                          >
                            <ArrowRight className="hidden xl:block h-6 w-6 text-[#1763ff] shrink-0" />
                            <div className="w-full rounded-2xl bg-gradient-to-br from-white via-blue-50/50 to-white border border-[#dbe6ff] p-4 sm:p-4.5 shadow-sm flex items-center gap-3.5">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eff4ff] border-2 border-[#1763ff]/50 text-[#1763ff]">
                                <Boxes className="h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm sm:text-[15px] font-extrabold text-[#1763ff] leading-snug mb-1">
                                  myDiya + 6 Platforms
                                </h4>
                                <p className="text-xs sm:text-[12.5px] text-[#69758a] leading-snug">
                                  Autonomous. Intelligent. Governed. Built for what comes next.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6: OUR DIRECTION
         ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-16 sm:py-20 lg:py-28 overflow-hidden text-[#0b1831]">
        <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="max-w-5xl flex flex-col items-start text-left">
            <Reveal delay={0.1}>
              <h2 className="aqe-section-heading text-[#0b1831] leading-[1.12] mb-4 font-[750]">
                <span>Our </span>
                <span className="text-[#1763ff]">
                  Direction
                </span>
              </h2>
              <p className="aqe-intro text-[#263653] font-medium mb-8 sm:mb-10">
                We believe the future of QE will combine:
              </p>
            </Reveal>

            <Reveal delay={0.2} className="w-full mb-10 sm:mb-12">
              <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-2.5 sm:gap-3 lg:gap-4 w-full">
                {DIRECTION_PILLARS.map((item, idx) => {
                  const Icon = item.icon;
                  const isLast = idx === DIRECTION_PILLARS.length - 1;

                  return (
                    <div key={item.label} className="flex items-center gap-2.5 sm:gap-3 lg:gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.45, delay: idx * 0.1 }}
                        className={`group flex flex-col items-center justify-center text-center rounded-2xl border ${item.cardBg} w-[134px] sm:w-[148px] lg:w-[162px] aspect-[1.08/1] p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm`}
                      >
                        <Icon
                          className={`h-8 w-8 sm:h-9 sm:w-9 ${item.iconColor} mb-2.5 transition-transform duration-300 group-hover:scale-110`}
                          strokeWidth={1.8}
                        />
                        <span className="text-xs sm:text-[13.5px] font-bold text-[#0b1831] leading-snug whitespace-pre-line">
                          {item.label}
                        </span>
                      </motion.div>

                      {!isLast && (
                        <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-[#1763ff] shrink-0 stroke-[2.5]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-[#0b1831] leading-[1.3] mb-9 max-w-3xl">
                <span className="block">
                  A future where enterprises do not simply test quality —
                </span>
                <span className="block mt-1">
                  they{" "}
                  <span className="text-[#1763ff]">
                    continuously engineer it
                  </span>
                  .
                </span>
              </h3>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <a
                  href="/mystlc"
                  className="aqe-btn-text group inline-flex items-center gap-3 rounded-full bg-[#1763ff] hover:bg-[#0e53e6] px-8 sm:px-9 py-4 text-white font-bold shadow-[0_8px_24px_-10px_rgba(23,99,255,0.6)] transition-all hover:scale-[1.02] active:scale-95 no-underline"
                >
                  <span>Explore Our Platforms</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="/contact"
                  className="aqe-btn-text group inline-flex items-center gap-3 rounded-full bg-white border-2 border-[#dbe6ff] hover:border-[#1763ff] px-8 sm:px-9 py-4 text-[#0b1831] font-bold shadow-sm transition-all hover:scale-[1.02] hover:bg-[#eff4ff] active:scale-95 no-underline"
                >
                  <span>Talk to AscendQE</span>
                  <ArrowRight className="h-5 w-5 text-[#1763ff] transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

export const AboutPage = AboutUsPage;
export default AboutUsPage;
