import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "motion/react";
import {
  Rocket,
  ShieldCheck,
  Users,
  BarChart3,
  Play,
  ArrowRight,
  Brain,
  Code2,
  Shield,
  RefreshCw,
  Link2,
  Cloud,
  Check,
  Settings,
} from "lucide-react";
import myDiyaLogo from "../../../../assets/logo-images/myDiya-logo.webp";

// Orbit geometry constants: 37% percentage radius guarantees all nodes and labels stay inside stage
const R_PCT = 37;
const R_SVG = 600 * (R_PCT / 100); // 222 in 600x600 SVG coordinates

// 5 Orbital Capability Nodes positioned at 72° intervals starting at -126° (matching target UI)
const CAPABILITY_NODES = [
  {
    id: "heals",
    title: "Heals & Learns",
    icon: RefreshCw,
    angleOffsetDeg: -126,
    ringColor: "border-[#f59e0b]",
    shadowClass: "shadow-[0_4px_16px_rgba(245,158,11,0.15)]",
    iconColor: "text-[#d97706]",
    badgeBg: "bg-white",
  },
  {
    id: "connects",
    title: "Connects",
    icon: Link2,
    angleOffsetDeg: -54,
    ringColor: "border-[#145BFF]",
    shadowClass: "shadow-[0_4px_16px_rgba(20,91,255,0.15)]",
    iconColor: "text-[#145BFF]",
    badgeBg: "bg-white",
  },
  {
    id: "reasons",
    title: "Reasons",
    icon: Brain,
    angleOffsetDeg: 18,
    ringColor: "border-[#0284c7]",
    shadowClass: "shadow-[0_4px_16px_rgba(2,132,199,0.15)]",
    iconColor: "text-[#0284c7]",
    badgeBg: "bg-white",
  },
  {
    id: "generates",
    title: "Generates & Executes",
    icon: Code2,
    angleOffsetDeg: 90,
    ringColor: "border-[#145BFF]",
    shadowClass: "shadow-[0_4px_16px_rgba(20,91,255,0.15)]",
    iconColor: "text-[#145BFF]",
    badgeBg: "bg-white",
  },
  {
    id: "governs",
    title: "Governs Quality",
    icon: Shield,
    angleOffsetDeg: 162,
    ringColor: "border-[#6366f1]",
    shadowClass: "shadow-[0_4px_16px_rgba(99,102,241,0.15)]",
    iconColor: "text-[#4f46e5]",
    badgeBg: "bg-white",
  },
];

// Full-width Bottom Value Metrics (Aligned with remaining product pages)
const VALUE_METRICS = [
  {
    icon: Rocket,
    label: "Faster Releases",
  },
  {
    icon: ShieldCheck,
    label: "Higher Quality",
  },
  {
    icon: Users,
    label: "Lower Cost",
  },
  {
    icon: BarChart3,
    label: "Enterprise Ready",
  },
];

export function DarkSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id="top"
      className={`relative bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pb-8 pt-8 sm:pt-9 lg:pb-10 lg:pt-10 border-b border-[#DCE5F5] text-[#0B1638] overflow-hidden w-full ${className}`}
    >
      <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const angle = useMotionValue(0);
  const negAngle = useTransform(angle, (v) => -v);
  const lastT = useRef<number | null>(null);

  useAnimationFrame((t) => {
    if (lastT.current === null) {
      lastT.current = t;
      return;
    }
    const delta = t - lastT.current;
    lastT.current = t;
    if (!reduce) {
      // 36 seconds per full revolution
      angle.set((angle.get() + delta * (360 / 36000)) % 360);
    }
  });

  return (
    <div className="relative w-full">
      {/* ── Background Atmosphere & Ambient Lighting ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft blue ambient bloom behind right hologram */}
        <div
          className="absolute top-1/4 right-[5%] sm:right-[12%] w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 91, 255, 0.08) 0%, rgba(20, 91, 255, 0.03) 45%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Subtle Network Constellation Grid Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle connecting lines */}
          <path
            d="M 50 150 Q 200 80 400 140 T 750 90 T 1150 160"
            fill="none"
            stroke="rgba(20, 91, 255, 0.15)"
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />
          <path
            d="M 100 350 Q 300 280 600 340 T 950 290 T 1300 350"
            fill="none"
            stroke="rgba(20, 91, 255, 0.15)"
            strokeWidth="0.8"
            strokeDasharray="3 5"
          />
        </svg>

        {/* Decorative Floating Background Tiles */}
        <div className="absolute top-20 left-[48%] hidden xl:flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE5F5] bg-white/90 shadow-sm opacity-60">
          <BarChart3 className="h-4.5 w-4.5 text-[#145BFF]" />
        </div>
        <div className="absolute top-44 left-[38%] hidden xl:flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE5F5] bg-white/90 shadow-sm opacity-55">
          <Settings className="h-4.5 w-4.5 text-[#145BFF]" />
        </div>
        <div className="absolute top-28 right-[4%] hidden xl:flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE5F5] bg-white/90 shadow-sm opacity-55">
          <Cloud className="h-4.5 w-4.5 text-[#145BFF]" />
        </div>
        <div className="absolute top-64 right-[2%] hidden xl:flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE5F5] bg-white/90 shadow-sm opacity-55">
          <Check className="h-4.5 w-4.5 text-[#145BFF]" />
        </div>
      </div>

      {/* ── Main Container: Edge-Aligned Two-Column Hero ── */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 xl:gap-8">
        {/* ════════ LEFT COLUMN: Copy, CTAs & Value Metrics (Starts from Left Border) ════════ */}
        <div className="w-full lg:w-[50%] xl:w-[50%] flex flex-col items-start text-left shrink-0">
          {/* Breadcrumb */}
          <p className="mb-4 sm:mb-6 text-xs text-[#64748B]">
            <a href="/" className="hover:text-[#145BFF] transition-colors">Home</a>
            <span className="mx-1.5">›</span>
            <a href="/products" className="hover:text-[#145BFF] transition-colors">Products</a>
            <span className="mx-1.5">›</span>
            <span className="text-[#145BFF] font-medium">myDiya</span>
          </p>

          {/* Eyebrow Pill */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-4 py-1.5"
          >
            <span className="aqe-label-text text-[#145BFF]">
              MYDIYA.AI
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="aqe-hero-heading text-[#0B1638]"
          >
            <span className="block text-[#0B1638]">
              Autonomous QE Agents.
            </span>
            <span className="block text-[#145BFF]">
              Continuous Quality.
            </span>
          </motion.h1>

          {/* Sub-headline Narrative (Operating Models) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-5 space-y-4 max-w-xl lg:max-w-2xl text-[#263653]"
          >
            <p className="aqe-intro text-[#0B1638]">
              myDiya provides enterprises with two complementary operating models.
            </p>
            <p className="aqe-paragraph text-[#263653]">
              <strong className="font-bold text-[#0B1638]">Purpose-built QE Platforms</strong>{" "}
              provide defined Quality Engineering flows for established enterprise use cases, while the{" "}
              <strong className="font-semibold text-[#145BFF]">myDiya Digital QE Agency</strong>{" "}
              enables organizations to create their own configurable, multi-agent QE workflows using
              approved agent templates, enterprise knowledge, tools, connectors and governance.
            </p>
            <p className="aqe-paragraph text-[#263653]">
              Underneath both sits a common enterprise foundation for{" "}
              <strong className="font-semibold text-[#0B1638]">
                security, tenancy, governance, storage, connectors, auditability and myHelm runtime
                control
              </strong>
              .
            </p>
          </motion.div>

          {/* Action Buttons (CTAs) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center justify-start gap-4"
          >
            {/* Primary Request Demo Button */}
            <a
              href="/contact"
              className="aqe-btn-text flex items-center gap-2 rounded-xl bg-[#145BFF] hover:bg-[#0B49D6] px-6 py-3.5 text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_12px_24px_-10px_rgba(20,91,255,0.4)]"
            >
              <span>Request a Demo</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Secondary Watch Demo Button */}
            <a
              href="https://www.youtube.com/watch?v=TmwjHxU5tOg"
              target="_blank"
              rel="noopener noreferrer"
              className="aqe-btn-text flex items-center gap-2 rounded-xl border border-[#DCE5F5] bg-white hover:bg-[#EAF1FF] px-6 py-3.5 text-[#0B1638] transition-all active:scale-95 shadow-sm"
            >
              <Play className="h-4 w-4 fill-current text-[#145BFF]" />
              <span>Watch Demo</span>
            </a>
          </motion.div>
        </div>

        {/* ════════ RIGHT COLUMN: Holographic Orbit System & Centered Pedestal Base ════════ */}
        <div className="w-full lg:w-[48%] xl:w-[50%] relative flex flex-col items-center justify-center mt-8 lg:mt-0">
          {/* Orbit Stage Container: Aspect Square guarantees identical SVG & HTML coordinate math */}
          <div className="relative mx-auto flex w-full max-w-[360px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[540px] xl:max-w-[580px] aspect-square items-center justify-center select-none overflow-visible">
            {/* ── Background SVG: Fixed Orbit Rings & Ambient Glow ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 600"
              fill="none"
            >
              <defs>
                <radialGradient id="heroOrbitGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#145BFF" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#145BFF" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Soft radial glow in center */}
              <circle cx="300" cy="300" r={R_SVG} fill="url(#heroOrbitGlow)" />

              {/* Innermost Accent Ring */}
              <circle
                cx="300"
                cy="300"
                r="110"
                stroke="rgba(20, 91, 255, 0.15)"
                strokeWidth="0.8"
                strokeDasharray="2 4"
              />

              {/* Secondary Inner Fine Dashed Orbit Ring */}
              <circle
                cx="300"
                cy="300"
                r="150"
                stroke="rgba(20, 91, 255, 0.20)"
                strokeWidth="1"
                strokeDasharray="3 5"
              />

              {/* Outer Dashed Orbit Track Ring connecting all 5 capability nodes */}
              <circle
                cx="300"
                cy="300"
                r={R_SVG}
                stroke="rgba(20, 91, 255, 0.3)"
                strokeWidth="1.6"
                strokeDasharray="5 7"
              />
            </svg>

            {/* ── Rotating 5 Capability Nodes ── */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ rotate: angle, transformOrigin: "50% 50%" }}
            >
              {/* 5 Rotating Nodes */}
              {CAPABILITY_NODES.map((node) => {
                const a = (node.angleOffsetDeg * Math.PI) / 180;
                const leftPct = 50 + R_PCT * Math.cos(a);
                const topPct = 50 + R_PCT * Math.sin(a);
                const Icon = node.icon;

                return (
                  <div
                    key={node.id}
                    className="absolute z-10 pointer-events-auto"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Counter-rotate each node so icon and title stay upright at all times */}
                    <motion.div
                      className="flex flex-col items-center select-none"
                      style={{ rotate: negAngle }}
                    >
                      <div
                        className={`group relative flex flex-col items-center justify-center text-center rounded-full border-2 ${node.ringColor} ${node.shadowClass} ${node.badgeBg} p-1 sm:p-1.5 transition-all duration-300 hover:scale-115 hover:shadow-[0_8px_24px_rgba(20,91,255,0.22)] cursor-default w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-22 xl:h-22 2xl:w-24 2xl:h-24`}
                      >
                        {/* Inner subtle border */}
                        <div className="absolute inset-1 rounded-full border border-[#DCE5F5] pointer-events-none" />

                        {/* Icon */}
                        <div className={`mb-0.5 sm:mb-1 ${node.iconColor} transition-transform duration-200 group-hover:scale-110`}>
                          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 lg:h-5.5 lg:w-5.5 xl:h-6 xl:w-6 stroke-[2.2]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-[8px] sm:text-[9.5px] md:text-[10.5px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold text-[#0B1638] leading-tight px-1">
                          {node.title}
                        </h3>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* ── Center Core: Luminous MyDiya Orb ── */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <motion.div
                animate={reduce ? undefined : { y: [-3.5, 3.5, -3.5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-auto flex items-center justify-center"
              >
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-52 xl:h-52 rounded-full flex flex-col items-center justify-center p-2.5 sm:p-3 text-center border-2 border-[#DCE5F5] shadow-[0_10px_35px_rgba(20,91,255,0.14),inset_0_0_20px_rgba(20,91,255,0.05)] bg-white/95 backdrop-blur-md overflow-hidden">
                  {/* Concentric Inner Ring */}
                  <div className="absolute inset-1.5 sm:inset-2.5 rounded-full border border-[#DCE5F5] border-dashed pointer-events-none" />

                  {/* MyDiya Flame Logo */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <img
                      src={myDiyaLogo}
                      alt="MyDiya Logo"
                      className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 object-contain select-none pointer-events-none transition-transform duration-300 hover:scale-105"
                    />

                    {/* Brand Name Typography */}
                    <div className="mt-0.5 sm:mt-1 flex items-center justify-center">
                      <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black tracking-tight text-[#0B1638]">
                        myDiya
                      </span>
                    </div>

                    {/* Subtitle */}
                    <p className="mt-0.5 text-[8px] sm:text-[9px] lg:text-[9.5px] xl:text-[10.5px] font-semibold text-[#263653] tracking-wide uppercase">
                      Autonomous QE Agents
                    </p>
                    <p className="text-[7px] sm:text-[8px] lg:text-[8.5px] xl:text-[9.5px] font-bold text-[#145BFF] tracking-wider uppercase">
                      Platform
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Futuristic Pedestal Platform Base (Horizontally Centered Directly Below Orbit) ── */}
          <div className="relative -mt-4 sm:-mt-6 lg:-mt-8 w-full flex flex-col items-center pointer-events-none z-10">
            {/* Pedestal Bottom Base Step Ring */}
            <div className="w-[82%] max-w-[420px] h-7 sm:h-8 lg:h-9 rounded-[100%] bg-gradient-to-b from-white via-[#F5F8FF] to-[#EAF1FF] border border-[#DCE5F5] shadow-[0_8px_24px_rgba(20,91,255,0.1)] flex items-center justify-center px-4">
              <span className="text-[6px] sm:text-[7.5px] md:text-[8.5px] lg:text-[9px] font-bold tracking-[0.14em] sm:tracking-[0.18em] text-[#145BFF] uppercase whitespace-nowrap select-none">
                ONE PLATFORM &nbsp;•&nbsp; MULTIPLE AGENTS &nbsp;•&nbsp; CONTINUOUS QUALITY
              </span>
            </div>

            {/* Radiant Floor Lighting Pool */}
            <div className="w-[88%] max-w-[460px] h-8 sm:h-11 rounded-[100%] bg-[#145BFF]/10 blur-xl -mt-3" />
          </div>
        </div>
      </div>

      {/* ════════ FULL-WIDTH METRICS BAR (Between Left & Right Borders) ════════ */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.44 }}
        className="mt-12 sm:mt-14 lg:mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 border-t border-b border-[#DCE5F5] pt-7 pb-7 sm:pt-8 sm:pb-8 text-[#263653] w-full"
      >
        {VALUE_METRICS.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <React.Fragment key={metric.label}>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Icon className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="text-sm font-semibold text-[#0B1638]">{metric.label}</span>
              </div>
              {idx < VALUE_METRICS.length - 1 && (
                <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">
                  |
                </span>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
}

export default Hero;
