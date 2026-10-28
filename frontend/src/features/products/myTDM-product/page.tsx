import { ScrollToTop } from "@/shared/ScrollToTop";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChevronRight,
  Database,
  AppWindow,
  FileText,
  Network,
  Cloud,
  Server,
  Sparkles,
  ShieldCheck,
  Layers,
  RefreshCw,
  Filter,
  Settings,
  BarChart3,
  Clock,
  CheckCircle2,
  Code2,
  Box,
  Zap,
  TrendingUp,
  HardDrive,
  Wallet,
  Target,
  Gauge,
  Users,
  Shield,
  FileCheck,
  Search,
  Lock,
} from "lucide-react";
import myTDMLogo from "../../../assets/myTDM-assets/myTDM-logo.webp";
import myTDMHeroImage from "../../../assets/myTDM-assets/myTDM-herosection-image.webp";
import myTDMPlatformFlow from "../../../assets/myTDM-assets/myTDM- platform (1).webp";
import myTDMGovernanceImage from "../../../assets/myTDM-assets/myTDM6.webp";
import myTDMOutcomesImage from "../../../assets/myTDM-assets/myTDM-platform3.webp";
import myTDMEffortImage from "../../../assets/myTDM-assets/myTDM-platform4.webp";
import {
  CursorGlow,
  Reveal,
} from "../../../components/ui/shared";
import { FAQAccordion } from "@/shared/faq's accordians/page";
import { StillHaveQuestionsBanner } from "@/shared/StillHaveQuestionsBanner";
import { MYTDM_FAQS } from "./myTDM-faqs";
import { InteractivePlatformFlow } from "@/shared/flows/InteractivePlatformFlow";
import { MYTDM_FLOW_CONFIG } from "@/shared/flows/flowConfigs";

function DarkSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pb-8 pt-8 sm:pt-9 lg:pb-10 lg:pt-10 border-b border-[#DCE5F5] overflow-hidden w-full text-[#0B1638]">
      <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

const LEFT_SOURCE_NODES = [
  { icon: Database, label: "Databases", y: 68, cy: 205, color: "#145BFF" },
  { icon: AppWindow, label: "Applications", y: 158, cy: 225, color: "#38bdf8" },
  { icon: FileText, label: "Files & Documents", y: 248, cy: 245, color: "#145BFF" },
  { icon: Network, label: "APIs & Services", y: 338, cy: 265, color: "#38bdf8" },
  { icon: Cloud, label: "Cloud Systems", y: 428, cy: 285, color: "#145BFF" },
  { icon: Server, label: "Enterprise Sources", y: 518, cy: 305, color: "#38bdf8" },
];

const RIGHT_OUTPUT_NODES = [
  { icon: Sparkles, label: "Synthetic Test Data", y: 80, cy: 210, color: "#145BFF" },
  { icon: ShieldCheck, label: "Masked & Secure Data", y: 186, cy: 232, color: "#38bdf8" },
  { icon: Layers, label: "Subset & On-Demand Data", y: 292, cy: 255, color: "#145BFF" },
  { icon: Database, label: "Provision Ready Datasets", y: 398, cy: 278, color: "#38bdf8" },
  { icon: RefreshCw, label: "Continuous Data Updates", y: 504, cy: 300, color: "#145BFF" },
];

const CHALLENGE_STEPS = [
  {
    icon: Database,
    title: "Environments\nReady",
    description: "Automation and\nenvironments\nare ready",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    borderColor: "rgba(199, 210, 254, 0.8)",
    glow: "0 8px 24px -2px rgba(99, 102, 241, 0.45), 0 0 12px rgba(139, 92, 246, 0.3)",
    cardBorder: "border-indigo-200/80 hover:border-indigo-400",
    cardBg: "linear-gradient(to bottom, #f5f3ff 0%, #ffffff 40%, #ffffff 100%)",
  },
  {
    icon: Settings,
    title: "Tests Ready",
    description: "Test scripts\nand automation\nare ready",
    gradient: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
    borderColor: "rgba(186, 230, 253, 0.8)",
    glow: "0 8px 24px -2px rgba(14, 165, 233, 0.45), 0 0 12px rgba(56, 189, 248, 0.3)",
    cardBorder: "border-sky-200/80 hover:border-sky-400",
    cardBg: "linear-gradient(to bottom, #f0f9ff 0%, #ffffff 40%, #ffffff 100%)",
  },
  {
    icon: Clock,
    title: "But Still Waiting\nfor Usable Data",
    description: "Usable, compliant\nand relevant\ntest data is missing",
    gradient: "linear-gradient(135deg, #145BFF 0%, #38bdf8 100%)",
    borderColor: "rgba(220, 229, 245, 0.8)",
    glow: "0 8px 24px -2px rgba(20, 91, 255, 0.35), 0 0 12px rgba(56, 189, 248, 0.3)",
    cardBorder: "border-[#DCE5F5] hover:border-[#145BFF]",
    cardBg: "linear-gradient(to bottom, #F5F8FF 0%, #ffffff 40%, #ffffff 100%)",
  },
];

const CORE_CAPABILITIES = [
  {
    icon: Database,
    title: "Synthetic\nData Generation",
    description: "Generate realistic, scenario-specific test data.",
    iconBg: "bg-[#eef2ff] border-[#c7d2fe]",
    iconColor: "text-[#6366f1]",
  },
  {
    icon: ShieldCheck,
    title: "Data Masking &\nPrivacy Protection",
    description: "Identify and protect PII and sensitive information.",
    iconBg: "bg-[#e0f2fe] border-[#bae6fd]",
    iconColor: "text-[#0284c7]",
  },
  {
    icon: Filter,
    title: "Intelligent\nData Subsetting",
    description: "Create smaller, relevant datasets from large sources.",
    iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
    iconColor: "text-[#145BFF]",
  },
  {
    icon: Cloud,
    title: "Test Data\nProvisioning",
    description: "Prepare and provision fit-for-purpose data for all test types.",
    iconBg: "bg-[#fef3c7] border-[#fde68a]",
    iconColor: "text-[#d97706]",
  },
  {
    icon: CheckCircle2,
    title: "Data Quality\nValidation",
    description: "Validate completeness, consistency and usability.",
    iconBg: "bg-[#f3e8ff] border-[#e9d5ff]",
    iconColor: "text-[#9333ea]",
  },
  {
    icon: Code2,
    title: "Schema & Change\nIntelligence",
    description: "Detect data and schema changes and adapt datasets.",
    iconBg: "bg-[#dbeafe] border-[#bfdbfe]",
    iconColor: "text-[#2563eb]",
  },
  {
    icon: Box,
    title: "Reusable\nTest Data Assets",
    description: "Build governed and reusable datasets for enterprise use.",
    iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
    iconColor: "text-[#145BFF]",
  },
];

export function MyTDMPage() {
  return (
    <div className="min-h-screen w-full bg-white text-[#0f172a] selection:bg-[#145BFF]/30 selection:text-[#145BFF] overflow-x-hidden">
      <CursorGlow />
      <main className="w-full">
        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1: HERO (DARK) — Exact UX Layout + Site Color System
           ══════════════════════════════════════════════════════════════════ */}
        <DarkSection>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.88fr_1.18fr] xl:grid-cols-[0.84fr_1.22fr] lg:items-center relative z-10 pt-2 pb-4">
            {/* ── Left Column: Brand Header, Headlines, Copy & CTAs ── */}
            <Reveal delay={0.1} className="w-full min-w-0">
              <div className="flex flex-col gap-5 text-left">
                {/* Breadcrumb */}
                <p className="text-xs text-[#64748B]">
                  <a href="/" className="hover:text-[#145BFF] transition-colors">Home</a>
                  <span className="mx-1.5">›</span>
                  <a href="/products" className="hover:text-[#145BFF] transition-colors">Products</a>
                  <span className="mx-1.5">›</span>
                  <span className="text-[#145BFF] font-medium">myTDM</span>
                </p>

                {/* Standardized Logo & Brand Title */}
                <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                  <img
                    src={myTDMLogo}
                    alt="myTDM Logo"
                    className="h-14 sm:h-16 md:h-20 lg:h-[84px] w-auto object-contain shrink-0"
                  />
                  <div className="flex flex-col border-l border-[#DCE5F5] pl-4 sm:pl-5 md:pl-6 py-1">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1638] leading-none mb-1.5">
                      myTDM
                    </h2>
                    <p className="aqe-label-text text-[#64748B]">
                      Intelligent Test Data Management
                    </p>
                  </div>
                </div>

                {/* Accent Line under Logo Block */}
                <div className="h-[2px] w-44 sm:w-56 bg-gradient-to-r from-[#145BFF] via-[#38bdf8] to-transparent opacity-80" />

                {/* Main H1 Heading */}
                <h1 className="aqe-hero-heading text-[#0B1638]">
                  <span className="block text-[#0B1638]">AI-Powered Test Data</span>
                  <span className="block text-[#145BFF]">
                    Management
                  </span>
                </h1>

                {/* Sub-heading */}
                <h2 className="aqe-sub-heading text-[#0B1638] mt-1">
                  Intelligent, Secure and On-Demand Test Data for Modern Quality Engineering
                </h2>

                {/* Standardized Body Paragraphs (.aqe-intro + .aqe-paragraph) */}
                <p className="aqe-intro text-[#263653] max-w-xl leading-relaxed">
                  myTDM transforms Test Data Management from a manual provisioning activity into an
                  intelligent, governed and reusable enterprise capability.
                </p>

                <p className="aqe-paragraph text-[#64748B] max-w-xl leading-relaxed">
                  Generate synthetic data, protect sensitive information, create fit-for-purpose data
                  subsets, provision testing datasets and continuously adapt test data as applications
                  and schemas evolve.
                </p>

                {/* Highlight Tagline */}
                <p className="text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight pt-1 inline-block text-[#145BFF]">
                  Right Data. Right Test. Right Time.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-2">
                  <a
                    href="/contact"
                    className="aqe-btn-text inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#145BFF] hover:bg-[#0B49D6] px-7 sm:px-8 py-3.5 text-white font-bold shadow-[0_12px_24px_-10px_rgba(20,91,255,0.4)] transition-all duration-300 hover:scale-105"
                  >
                    Request a Demo <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="#mytdm-platform"
                    className="aqe-btn-text inline-flex items-center justify-center gap-2.5 rounded-xl bg-white border border-[#DCE5F5] px-7 sm:px-8 py-3.5 text-[#0B1638] font-semibold shadow-sm transition-all duration-300 hover:bg-[#EAF1FF] hover:border-[#145BFF]"
                  >
                    Explore myTDM <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#145BFF]" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* ── Right Column: Responsive Interactive Connected Architecture Visual ── */}
            <Reveal delay={0.25} className="w-full min-w-0 flex items-center justify-center">
              <div
                className="relative w-full max-w-[920px] mx-auto select-none"
                style={{ containerType: "inline-size" }}
              >
                {/* Ambient Center Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#145BFF]/10 via-[#38bdf8]/15 to-[#6366f1]/15 blur-[90px] rounded-full pointer-events-none" />

                {/* ── Responsive Diagram Canvas (1000 x 610 coordinate space) ── */}
                <div className="relative w-full aspect-[1000/610] min-h-[250px]">
                  {/* 1. SVG Connecting Curves & Animated Data Flow Pulses */}
                  <svg
                    viewBox="0 0 1000 610"
                    className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="tdm-left-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#145BFF" stopOpacity="0.85" />
                        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="tdm-right-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.95" />
                        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#145BFF" stopOpacity="0.85" />
                      </linearGradient>
                      <filter id="tdm-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Left 6 Source Curves -> Center Cylinder */}
                    {LEFT_SOURCE_NODES.map((node, i) => {
                      const d = `M 272,${node.y} C 332,${node.y} 342,${node.cy} 395,${node.cy}`;
                      return (
                        <g key={`left-line-${i}`}>
                          <path
                            d={d}
                            fill="none"
                            stroke="url(#tdm-left-grad)"
                            strokeWidth="2.2"
                            filter="url(#tdm-glow)"
                            opacity="0.85"
                          />
                          <circle
                            cx="272"
                            cy={node.y}
                            r="4.5"
                            fill={node.color}
                            filter="url(#tdm-glow)"
                          />
                          <circle
                            cx="395"
                            cy={node.cy}
                            r="3.5"
                            fill="#38bdf8"
                            filter="url(#tdm-glow)"
                          />
                          <circle r="3.5" fill="#145BFF" filter="url(#tdm-glow)">
                            <animateMotion
                              dur={`${2.6 + i * 0.25}s`}
                              repeatCount="indefinite"
                              path={d}
                            />
                          </circle>
                        </g>
                      );
                    })}

                    {/* Center Cylinder -> Right 5 Output Curves */}
                    {RIGHT_OUTPUT_NODES.map((node, i) => {
                      const d = `M 605,${node.cy} C 658,${node.cy} 668,${node.y} 728,${node.y}`;
                      return (
                        <g key={`right-line-${i}`}>
                          <path
                            d={d}
                            fill="none"
                            stroke="url(#tdm-right-grad)"
                            strokeWidth="2.2"
                            filter="url(#tdm-glow)"
                            opacity="0.85"
                          />
                          <circle
                            cx="605"
                            cy={node.cy}
                            r="3.5"
                            fill="#38bdf8"
                            filter="url(#tdm-glow)"
                          />
                          <circle
                            cx="728"
                            cy={node.y}
                            r="4.5"
                            fill={node.color}
                            filter="url(#tdm-glow)"
                          />
                          <circle r="3.5" fill="#38bdf8" filter="url(#tdm-glow)">
                            <animateMotion
                              dur={`${2.8 + i * 0.25}s`}
                              repeatCount="indefinite"
                              path={d}
                            />
                          </circle>
                        </g>
                      );
                    })}
                  </svg>

                  {/* 2. Center 3D myTDM Cylinder Image (`myTDM-herosection-image.webp`) */}
                  <div
                    className="absolute z-10 flex items-center justify-center pointer-events-none"
                    style={{
                      left: "25.5%",
                      width: "49%",
                      top: "3%",
                      height: "92%",
                    }}
                  >
                    <img
                      src={myTDMHeroImage}
                      alt="myTDM Central Engine"
                      className="w-full h-full object-contain drop-shadow-[0_15px_45px_rgba(20,91,255,0.18)]"
                      draggable={false}
                    />
                  </div>

                  {/* 3. Left 6 Source Labels (0% to 26.8% width) */}
                  {LEFT_SOURCE_NODES.map((node, i) => {
                    const Icon = node.icon;
                    const topPct = (node.y / 610) * 100;
                    return (
                      <motion.div
                        key={node.label}
                        animate={{ y: [0, i % 2 === 0 ? -3 : 3, 0] }}
                        transition={{
                          duration: 3.8 + i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute left-0 -translate-y-1/2 z-20 flex items-center gap-[5%] rounded-lg sm:rounded-xl bg-white border border-[#DCE5F5] shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF] transition-colors"
                        style={{
                          top: `${topPct}%`,
                          width: "26.8%",
                          height: "10.5%",
                          paddingLeft: "1.4%",
                          paddingRight: "1.4%",
                        }}
                      >
                        <div
                          className="flex shrink-0 items-center justify-center rounded-md bg-[#EAF1FF] border border-[#DCE5F5] text-[#145BFF]"
                          style={{ width: "18%", aspectRatio: "1 / 1" }}
                        >
                          <Icon style={{ width: "62%", height: "62%" }} />
                        </div>
                        <span
                          className="font-bold text-[#0B1638] leading-tight truncate"
                          style={{ fontSize: "clamp(6.5px, 1.32cqw, 13px)" }}
                        >
                          {node.label}
                        </span>
                      </motion.div>
                    );
                  })}

                  {/* 4. Right 5 Output Labels (73.2% to 100% width) */}
                  {RIGHT_OUTPUT_NODES.map((node, i) => {
                    const Icon = node.icon;
                    const topPct = (node.y / 610) * 100;
                    return (
                      <motion.div
                        key={node.label}
                        animate={{ y: [0, i % 2 === 0 ? 3 : -3, 0] }}
                        transition={{
                          duration: 4 + i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute right-0 -translate-y-1/2 z-20 flex items-center gap-[5%] rounded-lg sm:rounded-xl bg-white border border-[#DCE5F5] shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF] transition-colors"
                        style={{
                          top: `${topPct}%`,
                          width: "26.8%",
                          height: "11.5%",
                          paddingLeft: "1.4%",
                          paddingRight: "1.4%",
                        }}
                      >
                        <div
                          className="flex shrink-0 items-center justify-center rounded-md bg-[#EAF1FF] border border-[#DCE5F5] text-[#145BFF]"
                          style={{ width: "18%", aspectRatio: "1 / 1" }}
                        >
                          <Icon style={{ width: "62%", height: "62%" }} />
                        </div>
                        <span
                          className="font-bold text-[#0B1638] leading-tight truncate"
                          style={{ fontSize: "clamp(6.5px, 1.28cqw, 12.5px)" }}
                        >
                          {node.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Bottom 4 Highlights Bar (Matching UX Hero Footer Strip) ── */}
          <Reveal delay={0.4} className="w-full">
            <div className="mt-12 lg:mt-16 border-t border-b border-[#DCE5F5] py-6 sm:py-7 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 w-full">
              {[
                { icon: ShieldCheck, title: "Secure\n& Compliant" },
                { icon: Database, title: "On-Demand\nTest Data" },
                { icon: Settings, title: "Automate\nProvisioning" },
                { icon: BarChart3, title: "Faster\nTest Cycles" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3.5 sm:gap-4 ${
                      idx > 0 ? "lg:border-l lg:border-[#DCE5F5] lg:pl-8" : ""
                    }`}
                  >
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-[#DCE5F5] bg-[#EAF1FF] shadow-sm">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#145BFF]" />
                    </div>
                    <span className="text-[#0B1638] text-xs sm:text-sm font-semibold leading-snug whitespace-pre-line">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </DarkSection>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2: PLATFORM FLOW (LIGHT)
           ══════════════════════════════════════════════════════════════════ */}
        <section
          id="mytdm-platform"
          className="relative bg-[#f9fafb] py-16 lg:py-24 overflow-hidden border-t border-gray-100"
        >
          <div className="mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            <InteractivePlatformFlow config={MYTDM_FLOW_CONFIG} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3: 02 — THE CHALLENGE & 03 — CORE CAPABILITIES (LIGHT)
            (Exact UX Design from Screenshot + Site Color Palette)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] py-16 lg:py-24 overflow-hidden border-t border-slate-200/80">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#38bdf8]/5 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#145BFF]/5 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            {/* ── PART A: 02 — THE CHALLENGE ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-10 xl:gap-14 items-center pb-16 lg:pb-20 border-b border-slate-200/80">
              {/* Left Column: Challenge Narrative */}
              <Reveal delay={0.1} className="w-full min-w-0">
                <div className="flex flex-col text-left">
                  {/* Eyebrow: 02 — THE CHALLENGE */}
                  <div className="flex items-center gap-3 mb-4 aqe-label-text">
                    <span className="text-[#145BFF] font-semibold">02</span>
                    <span className="h-[1.5px] w-6 bg-[#145BFF]" />
                    <span className="text-[#475569]">THE CHALLENGE</span>
                  </div>

                  {/* Main Heading */}
                  <h2 className="aqe-section-heading text-[#0f172a] mb-6">
                    <span className="block text-[#0f172a]">Testing Is Only as Good</span>
                    <span className="block">
                      as the{" "}
                      <span
                        className="inline-block"
                        style={{
                          background: "linear-gradient(90deg, #145BFF 0%, #0284c7 50%, #6366f1 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          color: "#145BFF",
                        }}
                      >
                        Data Behind It
                      </span>
                    </span>
                  </h2>

                  {/* Standardized Body Paragraphs (.aqe-paragraph) */}
                  <div className="flex flex-col gap-4 max-w-xl">
                    <p className="aqe-paragraph text-[#475569] leading-relaxed">
                      Enterprise QE teams often struggle with incomplete data, unavailable
                      environments, production-data dependencies, privacy restrictions and
                      time-consuming manual preparation.
                    </p>
                    <p className="aqe-paragraph text-[#475569] leading-relaxed">
                      Testers may have automation and environments ready — but still wait for
                      usable data.
                    </p>
                    <p className="aqe-paragraph text-[#334155] leading-relaxed pt-1">
                      <strong className="text-[#0f172a] font-bold">myTDM</strong> brings{" "}
                      <span className="text-[#6366f1] font-semibold">intelligence</span> and{" "}
                      <span className="text-[#145BFF] font-semibold">governance</span> to this
                      critical layer of Quality Engineering.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: 3 Connected Step Cards (Environments Ready -> Tests Ready -> But Still Waiting for Usable Data) */}
              <Reveal delay={0.25} className="w-full min-w-0">
                <div className="relative pt-8 sm:pt-10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-5 lg:gap-6 items-stretch relative">
                    {CHALLENGE_STEPS.map((step, idx) => {
                      const StepIcon = step.icon;
                      return (
                        <div key={idx} className="relative flex flex-col items-center h-full">
                          {/* Dashed Connector & Circular Chevron Between Cards (Desktop/Tablet) */}
                          {idx < 2 && (
                            <div className="hidden sm:flex items-center justify-center absolute top-[24px] -right-[14px] lg:-right-[16px] z-30 pointer-events-none">
                              <div className="w-6 lg:w-8 border-t border-dashed border-[#0ea5e9]/50" />
                              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0f172a] shadow-sm">
                                <ChevronRight className="h-3.5 w-3.5 text-[#145BFF]" />
                              </div>
                            </div>
                          )}

                          {/* Top Overlapping Glowing Icon Circle */}
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 3.8 + idx * 0.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="relative z-20 -mb-7 flex h-14 w-14 sm:h-15 sm:w-15 lg:h-16 lg:w-16 items-center justify-center rounded-full"
                            style={{
                              background: step.gradient,
                              border: `2px solid ${step.borderColor}`,
                              boxShadow: step.glow,
                            }}
                          >
                            <StepIcon className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
                          </motion.div>

                          {/* Card Body */}
                          <div
                            className={`w-full flex-1 flex flex-col items-center justify-center text-center rounded-2xl border ${step.cardBorder} backdrop-blur-md pt-11 pb-6 px-4 sm:px-3 lg:px-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300`}
                            style={{ background: step.cardBg }}
                          >
                            <h3 className="text-[#0f172a] font-bold text-sm sm:text-[13.5px] lg:text-[15px] leading-snug whitespace-pre-line mb-2.5">
                              {step.title}
                            </h3>
                            <p className="text-[#475569] text-xs sm:text-[11.5px] lg:text-xs leading-relaxed whitespace-pre-line">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── PART B: 03 — CORE CAPABILITIES ── */}
            <div className="pt-14 lg:pt-18">
              <Reveal delay={0.1}>
                {/* Eyebrow: 03 — CORE CAPABILITIES */}
                <div className="flex items-center gap-3 mb-4 aqe-label-text">
                  <span className="text-[#145BFF] font-semibold">03</span>
                  <span className="h-[1.5px] w-6 bg-[#145BFF]" />
                  <span className="text-[#475569]">CORE CAPABILITIES</span>
                </div>

                {/* Section Heading */}
                <h2 className="aqe-section-heading text-[#0f172a] mb-10 lg:mb-12">
                  Everything You Need for{" "}
                  <span
                    className="inline-block"
                    style={{
                      background: "linear-gradient(90deg, #145BFF 0%, #0284c7 50%, #6366f1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "#145BFF",
                    }}
                  >
                    Intelligent Test Data Management
                  </span>
                </h2>
              </Reveal>

              {/* 7 White Capability Cards in a Responsive Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 xl:gap-5 items-stretch">
                {CORE_CAPABILITIES.map((cap, i) => {
                  const CapIcon = cap.icon;
                  return (
                    <Reveal key={cap.title} delay={0.06 * i} className="h-full">
                      <div className="group h-full flex flex-col items-center text-center rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#145BFF] hover:shadow-[0_12px_28px_rgba(20,91,255,0.18)]">
                        {/* Circular Icon Badge */}
                        <div
                          className={`mb-4 flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-full border ${cap.iconBg} transition-transform duration-300 group-hover:scale-110`}
                        >
                          <CapIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${cap.iconColor}`} />
                        </div>

                        {/* Title */}
                        <h3 className="text-[#0f172a] font-bold text-[13px] sm:text-[13.5px] leading-snug whitespace-pre-line mb-2">
                          {cap.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#475569] text-[11.5px] sm:text-xs leading-relaxed">
                          {cap.description}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4: 05 — BUILT FOR REAL ENTERPRISE DATA (LIGHT)
            (Connected Across the Testing Ecosystem — Exact UX Design)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#f8fafc] py-16 lg:py-24 overflow-hidden border-t border-slate-200/70">
          {/* Subtle background ambient pastel glows & dot matrix */}
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#e0f2fe]/60 blur-[110px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#eef2ff]/70 blur-[110px] pointer-events-none" />
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-[320px] h-[120px] opacity-25 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#94a3b8 1.5px, transparent 1.5px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-12 xl:px-20 2xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1.14fr_0.86fr] xl:grid-cols-[1.16fr_0.84fr] gap-12 lg:gap-10 xl:gap-14 items-center">
              {/* ── Left Column: Responsive 8-Node Connected Hub around myTDM Cylinder ── */}
              <Reveal delay={0.15} className="w-full min-w-0 flex items-center justify-center">
                <div
                  className="relative w-full max-w-[760px] mx-auto select-none"
                  style={{ containerType: "inline-size" }}
                >
                  <div className="relative w-full aspect-[1000/760]">
                    {/* 1. SVG Dashed Connectors & Hollow Ring Endpoints */}
                    <svg
                      viewBox="0 0 1000 760"
                      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                      preserveAspectRatio="none"
                    >
                      {/* Top-Left (Databases) -> Cylinder */}
                      <path
                        d="M 155,212 C 155,275 290,265 345,300"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2.2"
                        strokeDasharray="5 5"
                      />
                      <circle cx="155" cy="212" r="5.5" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
                      <circle cx="345" cy="300" r="4.5" fill="#6366f1" />

                      {/* Top-Center (Applications) -> Cylinder */}
                      <path
                        d="M 500,178 L 500,245"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2.2"
                        strokeDasharray="5 5"
                      />
                      <circle cx="500" cy="178" r="5.5" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
                      <circle cx="500" cy="245" r="5.5" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />

                      {/* Top-Right (APIs & Services) -> Cylinder */}
                      <path
                        d="M 845,212 C 845,275 710,265 655,300"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2.2"
                        strokeDasharray="5 5"
                      />
                      <circle cx="845" cy="212" r="5.5" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
                      <circle cx="655" cy="300" r="4.5" fill="#0284c7" />

                      {/* Middle-Left (CI/CD Tools) -> Cylinder */}
                      <path
                        d="M 272,380 L 348,380"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.2"
                        strokeDasharray="5 5"
                      />
                      <circle cx="272" cy="380" r="5.5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                      <circle cx="348" cy="380" r="4.5" fill="#10b981" />

                      {/* Middle-Right (Test Automation) -> Cylinder */}
                      <path
                        d="M 728,380 L 652,380"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2.2"
                        strokeDasharray="5 5"
                      />
                      <circle cx="652" cy="380" r="5.5" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
                      <circle cx="728" cy="380" r="4.5" fill="#0284c7" />

                      {/* Bottom-Left (Environment Management) -> Cylinder */}
                      <path
                        d="M 155,548 C 155,485 280,485 335,465"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2.2"
                        strokeDasharray="5 5"
                      />
                      <circle cx="155" cy="548" r="5.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
                      <circle cx="335" cy="465" r="5.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />

                      {/* Bottom-Center (Enterprise Data Platforms) -> Cylinder */}
                      <path
                        d="M 500,582 L 500,520"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2.2"
                        strokeDasharray="5 5"
                      />
                      <circle cx="500" cy="520" r="5.5" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />
                      <circle cx="500" cy="582" r="5.5" fill="#ffffff" stroke="#6366f1" strokeWidth="3" />

                      {/* Bottom-Right (Business Journeys & Integrations) -> Cylinder */}
                      <path
                        d="M 845,548 C 845,485 720,485 665,465"
                        fill="none"
                        stroke="#145BFF"
                        strokeWidth="2.2"
                        strokeDasharray="5 5"
                      />
                      <circle cx="665" cy="465" r="5.5" fill="#ffffff" stroke="#145BFF" strokeWidth="3" />
                      <circle cx="845" cy="548" r="5.5" fill="#ffffff" stroke="#145BFF" strokeWidth="3" />
                    </svg>

                    {/* 2. Central 3D myTDM Cylinder (`myTDM-platform4.webp`) */}
                    <div
                      className="absolute z-10 flex items-center justify-center pointer-events-none"
                      style={{
                        left: "30.5%",
                        width: "39%",
                        top: "23%",
                        height: "52%",
                      }}
                    >
                      <img
                        src={myTDMEffortImage}
                        alt="myTDM Central Data Engine"
                        className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(56,189,248,0.2)]"
                        draggable={false}
                      />
                    </div>

                    {/* 3. Node 1: Top-Left — Databases */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute z-20 flex items-start gap-[5%] rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                      style={{ left: "0%", top: "4%", width: "29.5%", padding: "2.2% 2.4%" }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-full bg-[#f3e8ff] text-[#7c3aed]"
                        style={{ width: "22%", aspectRatio: "1 / 1" }}
                      >
                        <Database style={{ width: "54%", height: "54%" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-[#0f172a] leading-tight mb-1"
                          style={{ fontSize: "clamp(7.5px, 1.55cqw, 14px)" }}
                        >
                          Databases
                        </h4>
                        <p
                          className="text-[#475569] leading-snug"
                          style={{ fontSize: "clamp(6px, 1.18cqw, 11px)" }}
                        >
                          Oracle | SQL Server<br />
                          MySQL | PostgreSQL<br />
                          Snowflake
                        </p>
                      </div>
                    </motion.div>

                    {/* 4. Node 2: Top-Center — Applications */}
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      className="absolute z-20 flex items-start gap-[5%] rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                      style={{ left: "35.25%", top: "1.5%", width: "29.5%", padding: "2.2% 2.4%" }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0284c7]"
                        style={{ width: "22%", aspectRatio: "1 / 1" }}
                      >
                        <AppWindow style={{ width: "54%", height: "54%" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-[#0f172a] leading-tight mb-1"
                          style={{ fontSize: "clamp(7.5px, 1.55cqw, 14px)" }}
                        >
                          Applications
                        </h4>
                        <p
                          className="text-[#475569] leading-snug"
                          style={{ fontSize: "clamp(6px, 1.18cqw, 11px)" }}
                        >
                          Web | Mobile | Legacy<br />
                          Enterprise Systems
                        </p>
                      </div>
                    </motion.div>

                    {/* 5. Node 3: Top-Right — APIs & Services */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                      className="absolute z-20 flex items-start gap-[5%] rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                      style={{ right: "0%", top: "4%", width: "29.5%", padding: "2.2% 2.4%" }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]"
                        style={{ width: "22%", aspectRatio: "1 / 1" }}
                      >
                        <Network style={{ width: "54%", height: "54%" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-[#0f172a] leading-tight mb-1"
                          style={{ fontSize: "clamp(7.5px, 1.55cqw, 14px)" }}
                        >
                          APIs & Services
                        </h4>
                        <p
                          className="text-[#475569] leading-snug"
                          style={{ fontSize: "clamp(6px, 1.18cqw, 11px)" }}
                        >
                          REST | SOAP | GraphQL<br />
                          Microservices
                        </p>
                      </div>
                    </motion.div>

                    {/* 6. Node 4: Middle-Left — CI/CD Tools */}
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="absolute z-20 flex items-start gap-[5%] rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                      style={{ left: "0%", top: "38%", width: "27.2%", padding: "2.2% 2.2%" }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-full bg-[#EAF1FF] text-[#145BFF]"
                        style={{ width: "23%", aspectRatio: "1 / 1" }}
                      >
                        <RefreshCw style={{ width: "54%", height: "54%" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-[#0f172a] leading-tight mb-1"
                          style={{ fontSize: "clamp(7.5px, 1.55cqw, 14px)" }}
                        >
                          CI/CD Tools
                        </h4>
                        <p
                          className="text-[#475569] leading-snug"
                          style={{ fontSize: "clamp(6px, 1.18cqw, 11px)" }}
                        >
                          Jenkins | GitLab<br />
                          Azure DevOps<br />
                          GitHub Actions
                        </p>
                      </div>
                    </motion.div>

                    {/* 7. Node 5: Middle-Right — Test Automation */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute z-20 flex items-start gap-[5%] rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                      style={{ right: "0%", top: "38%", width: "27.2%", padding: "2.2% 2.2%" }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]"
                        style={{ width: "23%", aspectRatio: "1 / 1" }}
                      >
                        <Settings style={{ width: "54%", height: "54%" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-[#0f172a] leading-tight mb-1"
                          style={{ fontSize: "clamp(7.5px, 1.55cqw, 14px)" }}
                        >
                          Test Automation
                        </h4>
                        <p
                          className="text-[#475569] leading-snug"
                          style={{ fontSize: "clamp(6px, 1.18cqw, 11px)" }}
                        >
                          Selenium | Playwright<br />
                          Cypress | UFT<br />
                          API Automation
                        </p>
                      </div>
                    </motion.div>

                    {/* 8. Node 6: Bottom-Left — Environment Management */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                      className="absolute z-20 flex items-start gap-[5%] rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                      style={{ left: "0%", top: "72%", width: "29.5%", padding: "2.2% 2.4%" }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]"
                        style={{ width: "22%", aspectRatio: "1 / 1" }}
                      >
                        <Server style={{ width: "54%", height: "54%" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-[#0f172a] leading-tight mb-1"
                          style={{ fontSize: "clamp(7.5px, 1.5cqw, 13.5px)" }}
                        >
                          Environment<br />Management
                        </h4>
                        <p
                          className="text-[#475569] leading-snug"
                          style={{ fontSize: "clamp(6px, 1.18cqw, 11px)" }}
                        >
                          Dev | Test | Staging<br />
                          Cloud | On-Prem
                        </p>
                      </div>
                    </motion.div>

                    {/* 9. Node 7: Bottom-Center — Enterprise Data Platforms */}
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                      className="absolute z-20 flex items-start gap-[5%] rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                      style={{ left: "35.25%", top: "76.5%", width: "29.5%", padding: "2.2% 2.4%" }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0284c7]"
                        style={{ width: "22%", aspectRatio: "1 / 1" }}
                      >
                        <Cloud style={{ width: "54%", height: "54%" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-[#0f172a] leading-tight mb-1"
                          style={{ fontSize: "clamp(7.5px, 1.5cqw, 13.5px)" }}
                        >
                          Enterprise<br />Data Platforms
                        </h4>
                        <p
                          className="text-[#475569] leading-snug"
                          style={{ fontSize: "clamp(6px, 1.18cqw, 11px)" }}
                        >
                          Data Lake | Data Warehouse<br />
                          Analytics | BI
                        </p>
                      </div>
                    </motion.div>

                    {/* 10. Node 8: Bottom-Right — Business Journeys & Integrations */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                      className="absolute z-20 flex items-start gap-[5%] rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                      style={{ right: "0%", top: "72%", width: "29.5%", padding: "2.2% 2.4%" }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0284c7]"
                        style={{ width: "22%", aspectRatio: "1 / 1" }}
                      >
                        <Layers style={{ width: "54%", height: "54%" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-[#0f172a] leading-tight mb-1"
                          style={{ fontSize: "clamp(7.5px, 1.5cqw, 13.5px)" }}
                        >
                          Business Journeys<br />& Integrations
                        </h4>
                        <p
                          className="text-[#475569] leading-snug"
                          style={{ fontSize: "clamp(6px, 1.18cqw, 11px)" }}
                        >
                          ERP | CRM | Finance<br />
                          Supply Chain | HR
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Reveal>

              {/* ── Right Column: Eyebrow, Heading, Paragraphs & Objective Callout Box ── */}
              <Reveal delay={0.3} className="w-full min-w-0 flex flex-col justify-center">
                {/* Eyebrow: BUILT FOR REAL ENTERPRISE DATA */}
                <div className="flex items-center gap-3 mb-4 aqe-label-text">
                  <span className="text-[#6366f1] font-bold">BUILT FOR REAL ENTERPRISE DATA</span>
                </div>

                {/* Main Heading */}
                <h2 className="aqe-section-heading text-[#0f172a] mb-6">
                  <span className="block text-[#0f172a]">Connected Across the</span>
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(90deg, #145BFF 0%, #38bdf8 50%, #6366f1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "#145BFF",
                    }}
                  >
                    Testing Ecosystem
                  </span>
                </h2>

                {/* Standardized Body Paragraphs (.aqe-paragraph) */}
                <div className="flex flex-col gap-5 mb-8">
                  <p className="aqe-paragraph text-[#475569] leading-relaxed">
                    myTDM is designed to support data requirements across databases, APIs,
                    applications, integrated business journeys and automated testing environments.
                  </p>
                  <p className="aqe-paragraph text-[#475569] leading-relaxed">
                    It can work alongside existing Quality Engineering practices and integrate with
                    test automation, CI/CD, environment management and enterprise data platforms.
                  </p>
                </div>

                {/* Bottom Callout Card: THE OBJECTIVE IS SIMPLE */}
                <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-[0_15px_40px_-15px_rgba(99,102,241,0.14)] flex items-center gap-4 sm:gap-5">
                  <div className="flex h-13 w-13 sm:h-15 sm:w-15 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#eef2ff] to-[#e0f2fe] border border-[#c7d2fe]">
                    <Target className="h-6 w-6 sm:h-7 sm:w-7 text-[#4f46e5]" />
                  </div>
                  <div className="border-l border-slate-200 pl-4 sm:pl-5">
                    <span className="block text-[10.5px] sm:text-xs font-bold tracking-[0.16em] text-[#64748b] uppercase mb-1">
                      THE OBJECTIVE IS SIMPLE:
                    </span>
                    <p
                      className="text-[15px] sm:text-[17px] lg:text-[18.5px] font-extrabold leading-snug"
                      style={{
                        background: "linear-gradient(90deg, #145BFF 0%, #0284c7 50%, #6366f1 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "#145BFF",
                      }}
                    >
                      Make trusted test data available as an engineering service — not a testing
                      bottleneck.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5: 06 — GOVERNED BY DESIGN (LIGHT)
            ("Enterprise Test Data Without Compromising Trust")
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-br from-[#f8faff] via-[#ffffff] to-[#f1f6ff] py-16 sm:py-20 lg:py-28 overflow-hidden border-t border-slate-200/80 w-full">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -top-32 -left-32 h-[380px] w-[380px] rounded-full bg-[#4f46e5]/8 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-[340px] w-[340px] rounded-full bg-[#7c3aed]/6 blur-[110px]" />
          <div className="pointer-events-none absolute top-1/2 right-[8%] -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-[#0ea5e9]/8 blur-[140px]" />

          {/* Full-width site-aligned container starting from left site border to right site border */}
          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 xl:gap-10 items-center w-full">
              {/* ── Left Column: Flush with Left Site Border, Expanded Text Width ── */}
              <Reveal
                delay={0.15}
                className="w-full min-w-0 lg:col-span-5 flex flex-col justify-center items-start text-left"
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5 aqe-label-text">
                  <span className="text-[#0284c7] font-semibold tracking-[0.2em]">GOVERNED BY DESIGN</span>
                </div>

                {/* Main Heading — "Without Compromising" kept on a single line as in UX image */}
                <h2 className="aqe-section-heading text-[#0f172a] mb-7 leading-[1.12] w-full">
                  <span className="block text-[#0f172a]">Enterprise Test Data</span>
                  <span
                    className="block sm:whitespace-nowrap"
                    style={{
                      background: "linear-gradient(90deg, #145BFF 0%, #0284c7 50%, #7c3aed 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "#145BFF",
                    }}
                  >
                    Without Compromising
                  </span>
                  <span className="block text-[#0f172a]">Trust</span>
                </h2>

                {/* Standardized Body Paragraphs (.aqe-paragraph) filling the left/middle space cleanly */}
                <div className="flex flex-col gap-5 w-full max-w-[640px]">
                  <p className="aqe-paragraph text-[#334155] leading-relaxed">
                    myTDM brings governance into the complete Test Data Management lifecycle.
                  </p>
                  <p className="aqe-paragraph text-[#475569] leading-relaxed">
                    Access controls, masking policies, approvals, traceability, dataset lineage and
                    audit evidence help enterprises maintain control over how test data is created,
                    transformed and consumed.
                  </p>
                  <p className="aqe-paragraph text-[#334155] leading-relaxed">
                    Sensitive data remains protected while engineering teams receive the data
                    required to test effectively.
                  </p>
                </div>
              </Reveal>

              {/* ── Right Column: Connected 7-Node Shield Hub Flush with Right Site Border ── */}
              <Reveal
                delay={0.3}
                className="w-full min-w-0 lg:col-span-7 flex justify-center lg:justify-end"
              >
                {/* Mobile Layout (< 640px): Central Shield + Clean 1/2-Col Governance Cards */}
                <div className="w-full flex flex-col items-center gap-6 sm:hidden">
                  <div className="relative w-full max-w-[290px] aspect-square flex items-center justify-center">
                    <div className="pointer-events-none absolute inset-6 rounded-full bg-gradient-to-tr from-[#6366f1]/20 via-[#0ea5e9]/18 to-[#145BFF]/15 blur-2xl" />
                    <img
                      src={myTDMGovernanceImage}
                      alt="myTDM Enterprise Governance Shield"
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_18px_40px_rgba(56,189,248,0.25)]"
                      draggable={false}
                    />
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3.5 w-full">
                    {[
                      {
                        icon: Users,
                        title: "Access Controls",
                        desc: "Role-based access and data permissions",
                        border: "border-purple-200/80",
                        bg: "bg-white",
                        iconBg: "bg-[#f3e8ff] border-[#d8b4fe] text-[#7e22ce]",
                      },
                      {
                        icon: Shield,
                        title: "Masking Policies",
                        desc: "Protect sensitive data with dynamic masking",
                        border: "border-sky-200/80",
                        bg: "bg-white",
                        iconBg: "bg-[#e0f2fe] border-[#bae6fd] text-[#0284c7]",
                      },
                      {
                        icon: Search,
                        title: "Traceability",
                        desc: "End-to-end visibility across the data lifecycle",
                        border: "border-[#DCE5F5]",
                        bg: "bg-white",
                        iconBg: "bg-[#EAF1FF] border-[#DCE5F5] text-[#145BFF]",
                      },
                      {
                        icon: FileCheck,
                        title: "Approvals",
                        desc: "Governed workflows for dataset creation and usage",
                        border: "border-[#DCE5F5]",
                        bg: "bg-white",
                        iconBg: "bg-[#EAF1FF] border-[#DCE5F5] text-[#145BFF]",
                      },
                      {
                        icon: FileText,
                        title: "Audit Evidence",
                        desc: "Complete logs and reports for compliance",
                        border: "border-amber-200/80",
                        bg: "bg-white",
                        iconBg: "bg-[#fef3c7] border-[#fde68a] text-[#d97706]",
                      },
                      {
                        icon: Database,
                        title: "Dataset Lineage",
                        desc: "Track origin, transformations and usage",
                        border: "border-fuchsia-200/80",
                        bg: "bg-white",
                        iconBg: "bg-[#fae8ff] border-[#f0abfc] text-[#a21caf]",
                      },
                      {
                        icon: Lock,
                        title: "Data Protection",
                        desc: "Keep sensitive information secure and compliant",
                        border: "border-sky-200/80",
                        bg: "bg-white",
                        iconBg: "bg-[#e0f2fe] border-[#bae6fd] text-[#0284c7]",
                      },
                    ].map((node, i) => {
                      const Icon = node.icon;
                      return (
                        <div
                          key={i}
                          className={`rounded-2xl ${node.bg} border ${node.border} p-3.5 backdrop-blur-md flex items-start gap-3 shadow-[0_4px_15px_rgba(0,0,0,0.05)]`}
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${node.iconBg}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[13px] font-bold text-[#0f172a] leading-tight mb-0.5">
                              {node.title}
                            </h4>
                            <p className="aqe-caption text-[#475569] leading-snug">{node.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tablet, Laptop & Desktop Diagram (sm and up): Full-bleed up to Right Site Border */}
                <div
                  className="hidden sm:block relative w-full max-w-[1060px] aspect-[880/610] select-none lg:ml-auto"
                  style={{ containerType: "inline-size" }}
                >
                  {/* 1. SVG Layer: Dashed Halo Arcs, Elbow Connector Lines & Glowing Nodes */}
                  <svg
                    viewBox="0 0 880 610"
                    className="pointer-events-none absolute inset-0 h-full w-full z-10"
                    fill="none"
                  >
                    <defs>
                      <filter id="govNodeGlow" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Outer & Inner Dashed Orbital Arcs around the Central Shield */}
                    <path
                      d="M 284 320 A 158 158 0 0 1 596 320"
                      stroke="#38bdf8"
                      strokeWidth="1.3"
                      strokeDasharray="3 6"
                      opacity="0.35"
                    />
                    <path
                      d="M 304 320 A 138 138 0 0 1 576 320"
                      stroke="#a855f7"
                      strokeWidth="1.3"
                      strokeDasharray="2 5"
                      opacity="0.3"
                    />

                    {/* Top-Center (Access Controls) -> Shield Apex */}
                    <path
                      d="M 440 122 L 440 176"
                      stroke="#a855f7"
                      strokeWidth="1.8"
                      opacity="0.9"
                    />
                    <circle cx="440" cy="122" r="5" fill="#d8b4fe" stroke="#a855f7" strokeWidth="2" filter="url(#govNodeGlow)" />
                    <circle cx="440" cy="176" r="3.5" fill="#e9d5ff" filter="url(#govNodeGlow)" />

                    {/* Top-Left (Masking Policies) -> Left Shield Halo */}
                    <path
                      d="M 286 180 L 306 180 L 306 340"
                      stroke="#38bdf8"
                      strokeWidth="1.6"
                      opacity="0.85"
                    />
                    <circle cx="286" cy="180" r="5" fill="#7dd3fc" stroke="#0ea5e9" strokeWidth="2" filter="url(#govNodeGlow)" />
                    <circle cx="306" cy="340" r="3.5" fill="#38bdf8" filter="url(#govNodeGlow)" />

                    {/* Middle-Left (Approvals) -> Left Shield Ring */}
                    <path
                      d="M 264 342 L 290 342 L 290 392"
                      stroke="#145BFF"
                      strokeWidth="1.6"
                      opacity="0.85"
                    />
                    <circle cx="264" cy="342" r="5" fill="#93c5fd" stroke="#145BFF" strokeWidth="2" filter="url(#govNodeGlow)" />
                    <circle cx="290" cy="392" r="3.5" fill="#145BFF" filter="url(#govNodeGlow)" />

                    {/* Bottom-Left (Dataset Lineage) -> Left Shield Base */}
                    <path
                      d="M 272 506 L 302 506 L 318 490"
                      stroke="#c084fc"
                      strokeWidth="1.6"
                      opacity="0.85"
                    />
                    <circle cx="272" cy="506" r="5" fill="#e9d5ff" stroke="#a855f7" strokeWidth="2" filter="url(#govNodeGlow)" />
                    <circle cx="318" cy="490" r="3.5" fill="#c084fc" filter="url(#govNodeGlow)" />

                    {/* Top-Right (Traceability) -> Right Shield Halo */}
                    <path
                      d="M 594 180 L 574 180 L 574 340"
                      stroke="#2dd4bf"
                      strokeWidth="1.6"
                      opacity="0.85"
                    />
                    <circle cx="594" cy="180" r="5" fill="#5eead4" stroke="#14b8a6" strokeWidth="2" filter="url(#govNodeGlow)" />
                    <circle cx="574" cy="340" r="3.5" fill="#2dd4bf" filter="url(#govNodeGlow)" />

                    {/* Middle-Right (Audit Evidence) -> Right Shield Ring */}
                    <path
                      d="M 616 342 L 590 342 L 590 392"
                      stroke="#fbbf24"
                      strokeWidth="1.6"
                      opacity="0.85"
                    />
                    <circle cx="616" cy="342" r="5" fill="#fde68a" stroke="#f59e0b" strokeWidth="2" filter="url(#govNodeGlow)" />
                    <circle cx="590" cy="392" r="3.5" fill="#fbbf24" filter="url(#govNodeGlow)" />

                    {/* Bottom-Right (Data Protection) -> Right Shield Base */}
                    <path
                      d="M 608 506 L 578 506 L 562 490"
                      stroke="#38bdf8"
                      strokeWidth="1.6"
                      opacity="0.85"
                    />
                    <circle cx="608" cy="506" r="5" fill="#7dd3fc" stroke="#0ea5e9" strokeWidth="2" filter="url(#govNodeGlow)" />
                    <circle cx="562" cy="490" r="3.5" fill="#38bdf8" filter="url(#govNodeGlow)" />
                  </svg>

                  {/* 2. Central 3D Shield Hub Image (myTDM6.webp) */}
                  <div
                    className="absolute z-15 flex items-center justify-center pointer-events-none"
                    style={{
                      left: "29%",
                      top: "29%",
                      width: "42%",
                      height: "66%",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-8 rounded-full bg-gradient-to-tr from-[#6366f1]/20 via-[#0ea5e9]/18 to-[#145BFF]/15 blur-2xl" />
                    <img
                      src={myTDMGovernanceImage}
                      alt="myTDM Governed by Design Shield"
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_24px_55px_rgba(56,189,248,0.28)]"
                      draggable={false}
                    />
                  </div>

                  {/* 3. Card 1 (Top-Center): Access Controls */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-white/95 border border-purple-200/90 shadow-[0_8px_25px_rgba(139,92,246,0.12)] backdrop-blur-md"
                    style={{ left: "33%", top: "1.5%", width: "34%", height: "18%", padding: "2.2% 2.6%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#f3e8ff] border border-[#d8b4fe] text-[#7e22ce] shadow-sm"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <Users style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-bold text-[#0f172a] leading-tight mb-1"
                        style={{ fontSize: "clamp(9.5px, 1.72cqw, 16.5px)" }}
                      >
                        Access Controls
                      </h4>
                      <p
                        className="text-[#475569] leading-snug"
                        style={{ fontSize: "clamp(7.5px, 1.3cqw, 12.5px)" }}
                      >
                        Role-based access<br />
                        and data permissions
                      </p>
                    </div>
                  </motion.div>

                  {/* 4. Card 2 (Top-Left): Masking Policies */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-white/95 border border-sky-200/90 shadow-[0_8px_25px_rgba(14,165,233,0.12)] backdrop-blur-md"
                    style={{ left: "1%", top: "19.5%", width: "31%", height: "19%", padding: "2.2% 2.5%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] border border-[#bae6fd] text-[#0284c7] shadow-sm"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <Shield style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-bold text-[#0f172a] leading-tight mb-1"
                        style={{ fontSize: "clamp(9.5px, 1.72cqw, 16.5px)" }}
                      >
                        Masking Policies
                      </h4>
                      <p
                        className="text-[#475569] leading-snug"
                        style={{ fontSize: "clamp(7.5px, 1.3cqw, 12.5px)" }}
                      >
                        Protect sensitive<br />
                        data with dynamic<br />
                        masking
                      </p>
                    </div>
                  </motion.div>

                  {/* 5. Card 3 (Middle-Left): Approvals */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-white/95 border border-[#DCE5F5] shadow-[0_8px_25px_rgba(20,91,255,0.08)] backdrop-blur-md"
                    style={{ left: "0%", top: "45.5%", width: "29.5%", height: "19%", padding: "2.2% 2.4%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#EAF1FF] border border-[#DCE5F5] text-[#145BFF] shadow-sm"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <FileCheck style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-bold text-[#0f172a] leading-tight mb-1"
                        style={{ fontSize: "clamp(9.5px, 1.72cqw, 16.5px)" }}
                      >
                        Approvals
                      </h4>
                      <p
                        className="text-[#475569] leading-snug"
                        style={{ fontSize: "clamp(7.5px, 1.3cqw, 12.5px)" }}
                      >
                        Governed workflows<br />
                        for dataset creation<br />
                        and usage
                      </p>
                    </div>
                  </motion.div>

                  {/* 6. Card 4 (Bottom-Left): Dataset Lineage */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-white/95 border border-purple-200/90 shadow-[0_8px_25px_rgba(168,85,247,0.12)] backdrop-blur-md"
                    style={{ left: "0.5%", top: "72%", width: "30%", height: "19%", padding: "2.2% 2.4%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#fae8ff] border border-[#f0abfc] text-[#a21caf] shadow-sm"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <Database style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-bold text-[#0f172a] leading-tight mb-1"
                        style={{ fontSize: "clamp(9.5px, 1.72cqw, 16.5px)" }}
                      >
                        Dataset Lineage
                      </h4>
                      <p
                        className="text-[#475569] leading-snug"
                        style={{ fontSize: "clamp(7.5px, 1.3cqw, 12.5px)" }}
                      >
                        Track origin,<br />
                        transformations<br />
                        and usage
                      </p>
                    </div>
                  </motion.div>

                  {/* 7. Card 5 (Top-Right): Traceability — Flush near Right Border */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-white/95 border border-[#DCE5F5] shadow-[0_8px_25px_rgba(20,91,255,0.08)] backdrop-blur-md"
                    style={{ right: "1%", top: "19.5%", width: "31%", height: "19%", padding: "2.2% 2.5%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#EAF1FF] border border-[#DCE5F5] text-[#145BFF] shadow-sm"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <Search style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-bold text-[#0f172a] leading-tight mb-1"
                        style={{ fontSize: "clamp(9.5px, 1.72cqw, 16.5px)" }}
                      >
                        Traceability
                      </h4>
                      <p
                        className="text-[#475569] leading-snug"
                        style={{ fontSize: "clamp(7.5px, 1.3cqw, 12.5px)" }}
                      >
                        End-to-end visibility<br />
                        across the data<br />
                        lifecycle
                      </p>
                    </div>
                  </motion.div>

                  {/* 8. Card 6 (Middle-Right): Audit Evidence — Flush with Right Border */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-white/95 border border-amber-200/90 shadow-[0_8px_25px_rgba(245,158,11,0.12)] backdrop-blur-md"
                    style={{ right: "0%", top: "45.5%", width: "29.5%", height: "19%", padding: "2.2% 2.4%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#fef3c7] border border-[#fde68a] text-[#d97706] shadow-sm"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <FileText style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-bold text-[#0f172a] leading-tight mb-1"
                        style={{ fontSize: "clamp(9.5px, 1.72cqw, 16.5px)" }}
                      >
                        Audit Evidence
                      </h4>
                      <p
                        className="text-[#475569] leading-snug"
                        style={{ fontSize: "clamp(7.5px, 1.3cqw, 12.5px)" }}
                      >
                        Complete logs<br />
                        and reports for<br />
                        compliance
                      </p>
                    </div>
                  </motion.div>

                  {/* 9. Card 7 (Bottom-Right): Data Protection — Flush near Right Border */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.85 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-white/95 border border-sky-200/90 shadow-[0_8px_25px_rgba(14,165,233,0.12)] backdrop-blur-md"
                    style={{ right: "0.5%", top: "72%", width: "30%", height: "19%", padding: "2.2% 2.4%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] border border-[#bae6fd] text-[#0284c7] shadow-sm"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <Lock style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-bold text-[#0f172a] leading-tight mb-1"
                        style={{ fontSize: "clamp(9.5px, 1.72cqw, 16.5px)" }}
                      >
                        Data Protection
                      </h4>
                      <p
                        className="text-[#475569] leading-snug"
                        style={{ fontSize: "clamp(7.5px, 1.3cqw, 12.5px)" }}
                      >
                        Keep sensitive<br />
                        information secure<br />
                        and compliant
                      </p>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6: 08 — ENTERPRISE OUTCOMES ("Better Data. Better Testing. Greater Confidence.")
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-br from-[#f8faff] via-[#ffffff] to-[#f1f6ff] py-16 sm:py-20 lg:py-28 overflow-hidden border-t border-slate-200/70">
          {/* Soft Pastel Corner Blobs & Dot Grid matching the UX Design */}
          <div className="pointer-events-none absolute -top-24 -left-20 h-[280px] w-[280px] rounded-full bg-gradient-to-br from-[#e9d5ff]/45 via-[#fbcfe8]/35 to-transparent blur-[65px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-[280px] w-[280px] rounded-full bg-gradient-to-tr from-[#bae6fd]/45 via-[#e9d5ff]/35 to-transparent blur-[65px]" />
          <div className="pointer-events-none absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-[#6366f1]/10 via-[#38bdf8]/12 to-[#145BFF]/10 blur-[100px]" />

          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 xl:gap-10 items-center">
              {/* ── Left Column: 08 — ENTERPRISE OUTCOMES Copy (4 cols on lg) ── */}
              <Reveal delay={0.15} className="w-full min-w-0 lg:col-span-4 flex flex-col justify-center">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5 aqe-label-text">
                  <span className="text-[#4f46e5] font-bold tracking-[0.2em]">ENTERPRISE OUTCOMES</span>
                </div>

                {/* 4-Line Gradient Headline matching UX image */}
                <h2 className="aqe-section-heading text-[#0f172a] leading-[1.14]">
                  <span className="block text-[#0f172a]">Better Data.</span>
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(90deg, #0284c7 0%, #2563eb 50%, #7c3aed 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "#0284c7",
                    }}
                  >
                    Better Testing.
                  </span>
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(90deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "#2563eb",
                    }}
                  >
                    Greater
                  </span>
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #c026d3 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "#4f46e5",
                    }}
                  >
                    Confidence.
                  </span>
                </h2>

                {/* Accent Divider Bar */}
                <div className="h-[3px] w-11 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#9333ea] my-6" />

                {/* Standardized Body Subtitle (.aqe-paragraph) */}
                <p className="aqe-paragraph text-[#475569] font-medium">
                  myTDM helps enterprises:
                </p>
              </Reveal>

              {/* ── Right Column: Connected 8-Card Enterprise Outcomes Diagram (8 cols on lg) ── */}
              <Reveal delay={0.3} className="w-full min-w-0 lg:col-span-8 flex justify-center">
                {/* Mobile Layout (< 640px): Central myTDM Hub + Clean 1/2-Col Outcome Cards */}
                <div className="w-full flex flex-col items-center gap-6 sm:hidden">
                  <div className="relative w-full max-w-[300px] aspect-[4/3] flex items-center justify-center">
                    <div className="pointer-events-none absolute inset-4 rounded-full bg-gradient-to-tr from-[#6366f1]/20 via-[#38bdf8]/20 to-[#145BFF]/15 blur-2xl" />
                    <img
                      src={myTDMOutcomesImage}
                      alt="myTDM Enterprise Outcomes Hub"
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_16px_35px_rgba(79,70,229,0.22)]"
                      draggable={false}
                    />
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3.5 w-full">
                    {[
                      {
                        icon: Database,
                        title: "Reduce",
                        desc: "dependency on production data",
                        cardBg: "bg-[#faf5ff] border-[#e9d5ff]",
                        iconBg: "bg-[#ede9fe] text-[#7c3aed]",
                        titleColor: "text-[#6d28d9]",
                        chevBg: "bg-[#f3e8ff] text-[#7c3aed]",
                      },
                      {
                        icon: Zap,
                        title: "Accelerate",
                        desc: "test-data preparation and provisioning",
                        cardBg: "bg-[#f0f7ff] border-[#bfdbfe]",
                        iconBg: "bg-[#dbeafe] text-[#2563eb]",
                        titleColor: "text-[#1d4ed8]",
                        chevBg: "bg-[#dbeafe] text-[#2563eb]",
                      },
                      {
                        icon: BarChart3,
                        title: "Improve",
                        desc: "positive, negative, boundary and risk-based test coverage",
                        cardBg: "bg-[#f0fdf4] border-[#bbf7d0]",
                        iconBg: "bg-[#d1fae5] text-[#059669]",
                        titleColor: "text-[#047857]",
                        chevBg: "bg-[#d1fae5] text-[#059669]",
                      },
                      {
                        icon: Shield,
                        title: "Protect",
                        desc: "PII and sensitive enterprise information",
                        cardBg: "bg-[#fffbeb] border-[#fde68a]",
                        iconBg: "bg-[#fef3c7] text-[#d97706]",
                        titleColor: "text-[#d97706]",
                        chevBg: "bg-[#fef3c7] text-[#d97706]",
                      },
                      {
                        icon: Settings,
                        title: "Create",
                        desc: "consistent and repeatable testing conditions",
                        cardBg: "bg-[#fff1f2] border-[#fecdd3]",
                        iconBg: "bg-[#ffe4e6] text-[#e11d48]",
                        titleColor: "text-[#dc2626]",
                        chevBg: "bg-[#ffe4e6] text-[#e11d48]",
                      },
                      {
                        icon: Clock,
                        title: "Reduce",
                        desc: "delays caused by unavailable test data",
                        cardBg: "bg-[#f0f9ff] border-[#bae6fd]",
                        iconBg: "bg-[#e0f2fe] text-[#0284c7]",
                        titleColor: "text-[#1d4ed8]",
                        chevBg: "bg-[#e0f2fe] text-[#0284c7]",
                      },
                      {
                        icon: Layers,
                        title: "Reuse",
                        desc: "governed datasets across teams and releases",
                        cardBg: "bg-[#faf5ff] border-[#e9d5ff]",
                        iconBg: "bg-[#ede9fe] text-[#7c3aed]",
                        titleColor: "text-[#6d28d9]",
                        chevBg: "bg-[#f3e8ff] text-[#7c3aed]",
                      },
                      {
                        icon: RefreshCw,
                        title: "Respond",
                        desc: "faster to application and schema changes",
                        cardBg: "bg-[#f0fdf4] border-[#bbf7d0]",
                        iconBg: "bg-[#d1fae5] text-[#059669]",
                        titleColor: "text-[#047857]",
                        chevBg: "bg-[#d1fae5] text-[#059669]",
                      },
                    ].map((node, i) => {
                      const Icon = node.icon;
                      return (
                        <div
                          key={i}
                          className={`relative rounded-2xl border ${node.cardBg} p-4 shadow-sm flex items-start gap-3`}
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${node.iconBg}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 pr-5">
                            <h4 className={`text-[14px] font-extrabold ${node.titleColor} leading-tight mb-1`}>
                              {node.title}
                            </h4>
                            <p className="aqe-caption text-[#334155] leading-snug">{node.desc}</p>
                          </div>
                          <div
                            className={`absolute bottom-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full ${node.chevBg}`}
                          >
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tablet, Laptop & Desktop Diagram (sm and up): 100% Proportional Container-Query Canvas */}
                <div
                  className="hidden sm:block relative w-full max-w-[920px] aspect-[900/640] select-none"
                  style={{ containerType: "inline-size" }}
                >
                  {/* 1. SVG Layer: Dashed Orbital Ring, Dashed Connectors & Hollow Colored Ring-Dots */}
                  <svg
                    viewBox="0 0 900 640"
                    className="pointer-events-none absolute inset-0 h-full w-full z-10"
                    fill="none"
                  >
                    {/* Subtle Dashed Orbital Halo around Center myTDM Hub */}
                    <ellipse
                      cx="450"
                      cy="325"
                      rx="155"
                      ry="112"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                      strokeDasharray="3 6"
                      opacity="0.45"
                    />

                    {/* 1. Top-Left (Reduce) -> Hub Top-Left */}
                    <path
                      d="M 275 182 L 325 224"
                      stroke="#7c3aed"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      opacity="0.75"
                    />
                    <circle cx="275" cy="182" r="4.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.2" />
                    <circle cx="325" cy="224" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />

                    {/* 2. Top-Center (Accelerate) -> Hub Top */}
                    <path
                      d="M 450 145 L 450 205"
                      stroke="#2563eb"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      opacity="0.75"
                    />
                    <circle cx="450" cy="145" r="4.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2.2" />
                    <circle cx="450" cy="205" r="3.5" fill="#ffffff" stroke="#6366f1" strokeWidth="2" />

                    {/* 3. Top-Right (Improve) -> Hub Top-Right */}
                    <path
                      d="M 622 182 L 574 224"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      opacity="0.75"
                    />
                    <circle cx="622" cy="182" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.2" />
                    <circle cx="574" cy="224" r="3.5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />

                    {/* 4. Middle-Left (Protect) -> Hub Left */}
                    <path
                      d="M 244 325 L 294 325"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      opacity="0.8"
                    />
                    <circle cx="244" cy="325" r="4.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.2" />
                    <circle cx="294" cy="325" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />

                    {/* 5. Middle-Right (Create) -> Hub Right */}
                    <path
                      d="M 648 325 L 604 325"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      opacity="0.8"
                    />
                    <circle cx="648" cy="325" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2.2" />
                    <circle cx="604" cy="325" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />

                    {/* 6. Bottom-Left (Reduce Delays) -> Hub Bottom-Left */}
                    <path
                      d="M 272 465 L 318 424"
                      stroke="#0284c7"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      opacity="0.75"
                    />
                    <circle cx="272" cy="465" r="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.2" />
                    <circle cx="318" cy="424" r="3.5" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />

                    {/* 7. Bottom-Center (Reuse) -> Hub Bottom */}
                    <path
                      d="M 450 482 L 450 438"
                      stroke="#7c3aed"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      opacity="0.75"
                    />
                    <circle cx="450" cy="482" r="4.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.2" />
                    <circle cx="450" cy="438" r="3.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />

                    {/* 8. Bottom-Right (Respond) -> Hub Bottom-Right */}
                    <path
                      d="M 622 465 L 578 424"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      opacity="0.75"
                    />
                    <circle cx="622" cy="465" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.2" />
                    <circle cx="578" cy="424" r="3.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
                  </svg>

                  {/* 2. Central 3D Pedestal Hub Image (myTDM-platform3.webp) */}
                  <div
                    className="absolute z-15 flex items-center justify-center pointer-events-none"
                    style={{
                      left: "28.5%",
                      top: "27%",
                      width: "43%",
                      height: "46%",
                    }}
                  >
                    <img
                      src={myTDMOutcomesImage}
                      alt="myTDM Enterprise Outcomes Centerpiece"
                      className="w-full h-full object-contain drop-shadow-[0_22px_45px_rgba(79,70,229,0.2)]"
                      draggable={false}
                    />
                  </div>

                  {/* 3. Card 1 (Top-Left): Reduce dependency on production data */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-[#faf5ff]/95 border border-[#e9d5ff] shadow-[0_10px_28px_rgba(124,58,237,0.08)]"
                    style={{ left: "1%", top: "6%", width: "29%", height: "19%", padding: "2% 2.3%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#ede9fe] text-[#7c3aed]"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <Database style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1 pr-[6%]">
                      <h4
                        className="font-extrabold text-[#6d28d9] leading-tight mb-1"
                        style={{ fontSize: "clamp(8.5px, 1.65cqw, 15.5px)" }}
                      >
                        Reduce
                      </h4>
                      <p
                        className="text-[#334155] leading-snug"
                        style={{ fontSize: "clamp(6.5px, 1.18cqw, 11.5px)" }}
                      >
                        dependency on<br />
                        production data
                      </p>
                    </div>
                    <div
                      className="absolute bottom-[10%] right-[4.5%] flex items-center justify-center rounded-full bg-[#f3e8ff] text-[#7c3aed]"
                      style={{ width: "9%", aspectRatio: "1 / 1" }}
                    >
                      <ChevronRight style={{ width: "62%", height: "62%" }} />
                    </div>
                  </motion.div>

                  {/* 4. Card 2 (Top-Center): Accelerate test-data preparation and provisioning */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-[#f0f7ff]/95 border border-[#bfdbfe] shadow-[0_10px_28px_rgba(37,99,235,0.08)]"
                    style={{ left: "33%", top: "1.5%", width: "31%", height: "19%", padding: "2% 2.3%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]"
                      style={{ width: "21%", aspectRatio: "1 / 1" }}
                    >
                      <Zap style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1 pr-[6%]">
                      <h4
                        className="font-extrabold text-[#1d4ed8] leading-tight mb-1"
                        style={{ fontSize: "clamp(8.5px, 1.65cqw, 15.5px)" }}
                      >
                        Accelerate
                      </h4>
                      <p
                        className="text-[#334155] leading-snug"
                        style={{ fontSize: "clamp(6.5px, 1.18cqw, 11.5px)" }}
                      >
                        test-data preparation<br />
                        and provisioning
                      </p>
                    </div>
                    <div
                      className="absolute bottom-[10%] right-[4.5%] flex items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]"
                      style={{ width: "8.5%", aspectRatio: "1 / 1" }}
                    >
                      <ChevronRight style={{ width: "62%", height: "62%" }} />
                    </div>
                  </motion.div>

                  {/* 5. Card 3 (Top-Right): Improve positive, negative, boundary and risk-based test coverage */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-[#f0fdf4]/95 border border-[#bbf7d0] shadow-[0_10px_28px_rgba(16,185,129,0.08)]"
                    style={{ right: "0%", top: "5.5%", width: "33%", height: "20.5%", padding: "2% 2.3%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#d1fae5] text-[#059669]"
                      style={{ width: "20%", aspectRatio: "1 / 1" }}
                    >
                      <BarChart3 style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1 pr-[6%]">
                      <h4
                        className="font-extrabold text-[#047857] leading-tight mb-1"
                        style={{ fontSize: "clamp(8.5px, 1.65cqw, 15.5px)" }}
                      >
                        Improve
                      </h4>
                      <p
                        className="text-[#334155] leading-snug"
                        style={{ fontSize: "clamp(6px, 1.14cqw, 11px)" }}
                      >
                        positive, negative,<br />
                        boundary and risk-based<br />
                        test coverage
                      </p>
                    </div>
                    <div
                      className="absolute bottom-[10%] right-[4.5%] flex items-center justify-center rounded-full bg-[#d1fae5] text-[#059669]"
                      style={{ width: "8%", aspectRatio: "1 / 1" }}
                    >
                      <ChevronRight style={{ width: "62%", height: "62%" }} />
                    </div>
                  </motion.div>

                  {/* 6. Card 4 (Middle-Left): Protect PII and sensitive enterprise information */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-[#fffbeb]/95 border border-[#fde68a] shadow-[0_10px_28px_rgba(245,158,11,0.08)]"
                    style={{ left: "0%", top: "39.5%", width: "26.5%", height: "20%", padding: "2% 2.2%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]"
                      style={{ width: "23%", aspectRatio: "1 / 1" }}
                    >
                      <Shield style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1 pr-[6%]">
                      <h4
                        className="font-extrabold text-[#d97706] leading-tight mb-1"
                        style={{ fontSize: "clamp(8.5px, 1.65cqw, 15.5px)" }}
                      >
                        Protect
                      </h4>
                      <p
                        className="text-[#334155] leading-snug"
                        style={{ fontSize: "clamp(6px, 1.14cqw, 11px)" }}
                      >
                        PII and sensitive<br />
                        enterprise<br />
                        information
                      </p>
                    </div>
                    <div
                      className="absolute bottom-[10%] right-[4.5%] flex items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]"
                      style={{ width: "9.5%", aspectRatio: "1 / 1" }}
                    >
                      <ChevronRight style={{ width: "62%", height: "62%" }} />
                    </div>
                  </motion.div>

                  {/* 7. Card 5 (Middle-Right): Create consistent and repeatable testing conditions */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-[#fff1f2]/95 border border-[#fecdd3] shadow-[0_10px_28px_rgba(225,29,72,0.08)]"
                    style={{ right: "0%", top: "39.5%", width: "27.5%", height: "20%", padding: "2% 2.2%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#ffe4e6] text-[#e11d48]"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <Settings style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1 pr-[6%]">
                      <h4
                        className="font-extrabold text-[#dc2626] leading-tight mb-1"
                        style={{ fontSize: "clamp(8.5px, 1.65cqw, 15.5px)" }}
                      >
                        Create
                      </h4>
                      <p
                        className="text-[#334155] leading-snug"
                        style={{ fontSize: "clamp(6px, 1.14cqw, 11px)" }}
                      >
                        consistent and<br />
                        repeatable testing<br />
                        conditions
                      </p>
                    </div>
                    <div
                      className="absolute bottom-[10%] right-[4.5%] flex items-center justify-center rounded-full bg-[#ffe4e6] text-[#e11d48]"
                      style={{ width: "9%", aspectRatio: "1 / 1" }}
                    >
                      <ChevronRight style={{ width: "62%", height: "62%" }} />
                    </div>
                  </motion.div>

                  {/* 8. Card 6 (Bottom-Left): Reduce delays caused by unavailable test data */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-[#f0f9ff]/95 border border-[#bae6fd] shadow-[0_10px_28px_rgba(2,132,199,0.08)]"
                    style={{ left: "0.5%", top: "73.5%", width: "29.5%", height: "19.5%", padding: "2% 2.3%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0284c7]"
                      style={{ width: "22%", aspectRatio: "1 / 1" }}
                    >
                      <Clock style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1 pr-[6%]">
                      <h4
                        className="font-extrabold text-[#1d4ed8] leading-tight mb-1"
                        style={{ fontSize: "clamp(8.5px, 1.65cqw, 15.5px)" }}
                      >
                        Reduce
                      </h4>
                      <p
                        className="text-[#334155] leading-snug"
                        style={{ fontSize: "clamp(6.5px, 1.18cqw, 11.5px)" }}
                      >
                        delays caused by<br />
                        unavailable test data
                      </p>
                    </div>
                    <div
                      className="absolute bottom-[10%] right-[4.5%] flex items-center justify-center rounded-full bg-[#e0f2fe] text-[#0284c7]"
                      style={{ width: "8.5%", aspectRatio: "1 / 1" }}
                    >
                      <ChevronRight style={{ width: "62%", height: "62%" }} />
                    </div>
                  </motion.div>

                  {/* 9. Card 7 (Bottom-Center): Reuse governed datasets across teams and releases */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-[#faf5ff]/95 border border-[#e9d5ff] shadow-[0_10px_28px_rgba(124,58,237,0.08)]"
                    style={{ left: "33%", top: "76%", width: "31%", height: "20%", padding: "2% 2.3%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#ede9fe] text-[#7c3aed]"
                      style={{ width: "21%", aspectRatio: "1 / 1" }}
                    >
                      <Layers style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1 pr-[6%]">
                      <h4
                        className="font-extrabold text-[#6d28d9] leading-tight mb-1"
                        style={{ fontSize: "clamp(8.5px, 1.65cqw, 15.5px)" }}
                      >
                        Reuse
                      </h4>
                      <p
                        className="text-[#334155] leading-snug"
                        style={{ fontSize: "clamp(6px, 1.14cqw, 11px)" }}
                      >
                        governed datasets<br />
                        across teams and<br />
                        releases
                      </p>
                    </div>
                    <div
                      className="absolute bottom-[10%] right-[4.5%] flex items-center justify-center rounded-full bg-[#f3e8ff] text-[#7c3aed]"
                      style={{ width: "8.5%", aspectRatio: "1 / 1" }}
                    >
                      <ChevronRight style={{ width: "62%", height: "62%" }} />
                    </div>
                  </motion.div>

                  {/* 10. Card 8 (Bottom-Right): Respond faster to application and schema changes */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                    className="absolute z-20 flex items-center gap-[5%] rounded-2xl bg-[#f0fdf4]/95 border border-[#bbf7d0] shadow-[0_10px_28px_rgba(16,185,129,0.08)]"
                    style={{ right: "0%", top: "73.5%", width: "31%", height: "19.5%", padding: "2% 2.3%" }}
                  >
                    <div
                      className="flex shrink-0 items-center justify-center rounded-full bg-[#d1fae5] text-[#059669]"
                      style={{ width: "21%", aspectRatio: "1 / 1" }}
                    >
                      <RefreshCw style={{ width: "52%", height: "52%" }} />
                    </div>
                    <div className="min-w-0 flex-1 pr-[6%]">
                      <h4
                        className="font-extrabold text-[#047857] leading-tight mb-1"
                        style={{ fontSize: "clamp(8.5px, 1.65cqw, 15.5px)" }}
                      >
                        Respond
                      </h4>
                      <p
                        className="text-[#334155] leading-snug"
                        style={{ fontSize: "clamp(6.5px, 1.18cqw, 11.5px)" }}
                      >
                        faster to application<br />
                        and schema changes
                      </p>
                    </div>
                    <div
                      className="absolute bottom-[10%] right-[4.5%] flex items-center justify-center rounded-full bg-[#d1fae5] text-[#059669]"
                      style={{ width: "8.5%", aspectRatio: "1 / 1" }}
                    >
                      <ChevronRight style={{ width: "62%", height: "62%" }} />
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SECTION: FAQS ── */}
        <FAQAccordion items={MYTDM_FAQS} />
        <StillHaveQuestionsBanner />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 7: FINAL CTA (LIGHT) ("Test Data Should Accelerate Quality — Not Delay It.")
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#F5F8FF] py-20 sm:py-24 lg:py-32 overflow-hidden text-center border-t border-[#DCE5F5]">
          {/* Ambient Top/Center & Corner Glows */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[720px] rounded-full bg-[#145BFF]/8 blur-[140px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[360px] rounded-full bg-[#145BFF]/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-[280px] w-[360px] rounded-full bg-[#38bdf8]/10 blur-[120px]" />

          {/* Sweeping Luminous Waves */}
          <svg
            viewBox="0 0 1440 420"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full z-0"
            fill="none"
          >
            <defs>
              <linearGradient id="ctaWaveTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#145BFF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#145BFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="ctaWaveBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#145BFF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#145BFF" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="ctaWaveFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#145BFF" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Left & Right Sweeping Ribbon Fills */}
            <path
              d="M -40 40 C 110 210, 260 340, 520 395 L -40 420 Z"
              fill="url(#ctaWaveFill)"
            />
            <path
              d="M 1480 95 C 1320 240, 1170 345, 920 395 L 1480 420 Z"
              fill="url(#ctaWaveFill)"
            />

            {/* Luminous Sweeping Ribbon Curves */}
            <path
              d="M -20 25 C 125 205, 295 345, 620 410"
              stroke="url(#ctaWaveBlue)"
              strokeWidth="2.2"
            />
            <path
              d="M -30 250 C 160 315, 340 375, 590 415"
              stroke="url(#ctaWaveTeal)"
              strokeWidth="2.5"
            />
            <path
              d="M 1460 110 C 1310 250, 1145 350, 820 410"
              stroke="url(#ctaWaveBlue)"
              strokeWidth="2"
            />
            <path
              d="M 1470 280 C 1280 340, 1080 390, 840 415"
              stroke="url(#ctaWaveTeal)"
              strokeWidth="2.5"
            />
            {/* Bottom Horizon Arc */}
            <path
              d="M 160 418 Q 720 355 1280 418"
              stroke="url(#ctaWaveTeal)"
              strokeWidth="2"
              opacity="0.8"
            />
          </svg>

          <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-8 md:px-12">
            <Reveal>
              {/* Main 2-Line Headline */}
              <h2 className="aqe-hero-heading text-[#0B1638] mb-6 leading-[1.15]">
                <span className="block text-[#0B1638]">Test Data Should Accelerate</span>
                <span className="block text-[#0B1638] mt-1">
                  Quality —{" "}
                  <span
                    className="inline-block"
                    style={{
                      background: "linear-gradient(90deg, #145BFF 0%, #0284c7 50%, #6366f1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "#145BFF",
                    }}
                  >
                    Not Delay It.
                  </span>
                </span>
              </h2>

              {/* Standardized Body Copy (.aqe-paragraph) */}
              <div className="mx-auto max-w-2xl flex flex-col gap-4 mb-10">
                <p className="aqe-paragraph text-[#64748B] leading-relaxed">
                  Give your Quality Engineering teams intelligent, secure and reusable
                  <br className="hidden sm:inline" /> test data when they need it.
                </p>
                <p className="aqe-paragraph text-[#263653] leading-relaxed">
                  <span className="font-bold text-[#145BFF]">Discover myTDM</span> — AI-Powered Test
                  Data Management from AscendQE.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex justify-center relative z-20">
                <a
                  href="/contact"
                  className="aqe-btn-text group relative inline-flex items-center gap-3 rounded-2xl bg-[#145BFF] hover:bg-[#0B49D6] px-9 sm:px-12 py-4 text-white font-extrabold shadow-[0_10px_25px_rgba(20,91,255,0.35)] transition-all hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(20,91,255,0.45)] active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Schedule a Demo{" "}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
export default MyTDMPage;
