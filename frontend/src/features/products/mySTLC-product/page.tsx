import { ScrollToTop } from "@/shared/ScrollToTop";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "motion/react";
import { ArrowRight, Target, ShieldCheck, Zap, BarChart2, PlayCircle, Brain, FileText, Search, Database, Play, UserCheck, ClipboardList, Code2, Settings, Link, Image as ImageIcon, Coins, FileSearch } from "lucide-react";
import { Reveal, SignalBackground, CursorGlow, Eyebrow } from "../../../components/ui/shared";
import mystlcLogo from "../../../assets/mySTLC-assets/mySTLC-logo.webp";
import mySTLCFlow from "../../../assets/mySTLC-assets/mySTLC-flow.webp";
import { InteractivePlatformFlow } from "@/shared/flows/InteractivePlatformFlow";
import { MYSTLC_FLOW_CONFIG } from "@/shared/flows/flowConfigs";
import roboGif from "../../../assets/mySTLC-assets/robo-mystlc.gif";
import financialImpactBg from "../../../assets/mySTLC-assets/financial-impact-bg-image.webp";
import industryDataFlow from "../../../assets/mySTLC-assets/industry-data-flow.webp";
import rocketImage from "../../../assets/mySTLC-assets/rocket-image.webp";
import { FAQAccordion } from "@/shared/faq's accordians/page";
import { StillHaveQuestionsBanner } from "@/shared/StillHaveQuestionsBanner";
import { MYSTLC_FAQS } from "./mySTLC-faqs";

const ORBIT_NODES = [
  { Icon: FileText, label: "Requirements" },
  { Icon: Code2, label: "Test Design" },
  { Icon: ShieldCheck, label: "Defects" },
  { Icon: UserCheck, label: "Traceability" },
  { Icon: ClipboardList, label: "Reporting" },
  { Icon: Play, label: "Sign-off" },
  { Icon: Database, label: "Test Execution" },
  { Icon: Search, label: "Discovery" },
] as { Icon: React.ElementType; label: string }[];

function BrainOrbit() {
  const angle = useMotionValue(0);
  const negAngle = useTransform(angle, (v) => -v);
  const lastT = useRef<number | null>(null);

  useAnimationFrame((t) => {
    if (lastT.current === null) { lastT.current = t; return; }
    const delta = t - lastT.current;
    lastT.current = t;
    // 40s per full rotation = 360 / 40000 deg per ms
    angle.set(angle.get() + delta * (360 / 40000));
  });

  // Safe percentage radius: 37% ensures all nodes and their text labels remain inside the box
  const R_PCT = 37;
  // SVG coordinates corresponding to 37% in 600x600 viewBox
  const R_SVG = 600 * (R_PCT / 100); // 222
  const R_MID_SVG = 152;
  const R_INNER_SVG = 82;

  return (
    <div className="relative mx-auto flex w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[580px] xl:max-w-[620px] aspect-square items-center justify-center select-none overflow-visible">

      {/* Static SVG: radial glow + 3 fixed rings scaled via viewBox */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#145BFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#145BFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="285" fill="url(#brainGlow)" />
        <circle cx="300" cy="300" r={R_INNER_SVG} fill="none" stroke="#145BFF" strokeWidth="1.2" strokeOpacity="0.25" />
        <circle cx="300" cy="300" r={R_MID_SVG} fill="none" stroke="#145BFF" strokeWidth="1.2" strokeOpacity="0.18" />
        <circle cx="300" cy="300" r={R_SVG} fill="none" stroke="#145BFF" strokeWidth="1.2" strokeOpacity="0.15" />
      </svg>

      {/* Center Brain — responsive sizing */}
      <div
        className="relative z-20 flex h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 items-center justify-center rounded-full border border-[#DCE5F5] bg-white/95 shadow-[0_10px_30px_rgba(20,91,255,0.14)]"
      >
        <Brain
          className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 text-[#145BFF] drop-shadow-[0_0_12px_rgba(20,91,255,0.5)]"
        />
      </div>

      {/* Rotating wheel — single MotionValue drives both forward + counter rotation */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ rotate: angle, transformOrigin: "50% 50%" }}
      >
        {/* Spokes + mid dots */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
          {Array.from({ length: 8 }, (_, i) => {
            const a = (-90 + i * 45) * Math.PI / 180;
            const x2 = 300 + R_SVG * Math.cos(a);
            const y2 = 300 + R_SVG * Math.sin(a);
            const mx = 300 + R_MID_SVG * Math.cos(a);
            const my = 300 + R_MID_SVG * Math.sin(a);
            return (
              <g key={i}>
                <line x1="300" y1="300" x2={x2} y2={y2} stroke="#145BFF" strokeWidth="0.8" strokeOpacity="0.25" />
                <circle cx={mx} cy={my} r="3" fill="#145BFF" fillOpacity="0.8" />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {ORBIT_NODES.map(({ Icon, label }, i) => {
          const a = (-90 + i * 45) * Math.PI / 180;
          const leftPct = 50 + R_PCT * Math.cos(a);
          const topPct = 50 + R_PCT * Math.sin(a);
          return (
            <div
              key={i}
              className="absolute z-10 pointer-events-auto"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Counter-rotate using the same MotionValue negated — perfectly in sync, never resets */}
              <motion.div
                className="flex flex-col items-center"
                style={{ rotate: negAngle }}
              >
                <div
                  className="flex h-9 w-9 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-15 lg:w-15 items-center justify-center rounded-full border border-[#DCE5F5] bg-white shadow-[0_4px_16px_rgba(20,91,255,0.12)] hover:border-[#145BFF]"
                >
                  <Icon
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-[#145BFF]"
                  />
                </div>
                <span
                  className="mt-1 sm:mt-1.5 md:mt-2 text-[8px] sm:text-[9.5px] md:text-[11px] lg:text-[12px] font-bold text-[#0B1638] text-center tracking-wider uppercase whitespace-nowrap"
                >
                  {label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

    </div>
  );
}

function MetricCard({ value, title, source }: { value: string; title: string; source: string }) {
  return (
    <Reveal className="h-full">
      <div className="flex h-full flex-col justify-center rounded-2xl border border-[#DCE5F5] bg-white p-8 text-center shadow-sm transition-all hover:border-[#145BFF] hover:shadow-[0_12px_32px_-12px_rgba(20,91,255,0.15)]">
        <div className="text-[#145BFF] font-black" style={{ fontSize: "2.8rem", lineHeight: 1 }}>{value}</div>
        <div className="mt-4 font-bold italic text-[#0B1638]" style={{ fontSize: "1.05rem", lineHeight: 1.4 }}>{title}</div>
        <div className="mt-auto pt-6 text-xs font-medium italic text-[#64748B]">{source}</div>
      </div>
    </Reveal>
  );
}

function DarkSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pb-8 pt-8 sm:pt-9 lg:pb-10 lg:pt-10 border-b border-[#DCE5F5] overflow-hidden w-full">
      <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

function LightSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative bg-[#f9fafb] py-16 lg:py-20 overflow-hidden w-full">
      <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

export function MySTLCPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden text-[#0f172a]">
      <CursorGlow />
      <main className="w-full overflow-x-hidden">

        {/* ── SECTION 1: HERO (LIGHT) ── */}
        <DarkSection>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center w-full min-w-0">

            {/* Left: Copy */}
            <div className="flex flex-col min-w-0">
              {/* Breadcrumb */}
              <p className="mb-4 sm:mb-6 text-xs text-[#64748B]">
                <a href="/" className="hover:text-[#145BFF] transition-colors">Home</a>
                <span className="mx-1.5">›</span>
                <a href="/products" className="hover:text-[#145BFF] transition-colors">Products</a>
                <span className="mx-1.5">›</span>
                <span className="text-[#145BFF] font-medium">mySTLC</span>
              </p>

              <Reveal delay={0.1}>
                <div className="mb-4 flex items-center gap-4">
                  <img src={mystlcLogo} alt="mySTLC Logo" className="h-14 sm:h-16 md:h-20 lg:h-[84px] w-auto object-contain shrink-0" />
                  <span className="font-bold text-[#0B1638] text-3xl sm:text-4xl lg:text-5xl leading-none">mySTLC</span>
                </div>

                <Reveal>
                  {/* Eyebrow badge */}
                  <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-4 py-1.5">
                    <span className="aqe-label-text text-[#145BFF]">AI - Powered Manual Testing</span>
                  </div>
                </Reveal>
                <h1 className="aqe-hero-heading text-[#0B1638]">
                  mySTLC – <span style={{ color: "#145BFF" }}>AI-Powered</span> Software Testing Lifecycle
                </h1>
              </Reveal>


              <Reveal delay={0.2}>
                <p className="aqe-intro mt-6 text-[#263653]">
                  AI agents across your entire manual testing lifecycle —<br />
                  requirements to sign-off, in one connected workspace.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="aqe-btn-text inline-flex items-center gap-2 rounded-xl bg-[#145BFF] px-6 py-3 text-white shadow-[0_8px_24px_-10px_rgba(20,91,255,0.6)] transition-all hover:bg-[#0B49D6] hover:scale-[1.03] active:scale-95"
                  >
                    Request a Demo <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    className="aqe-btn-text inline-flex items-center gap-2 rounded-xl border border-[#DCE5F5] bg-white px-6 py-3 text-[#0B1638] shadow-sm transition-all hover:bg-[#EAF1FF] active:scale-95"
                  >
                    <PlayCircle className="h-4 w-4 text-[#145BFF]" /> Watch Video
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right: Brain orbit diagram */}
            <Reveal delay={0.2} className="w-full min-w-0 flex items-center justify-center py-4">
              <div className="w-full max-w-[620px] mx-auto">
                <BrainOrbit />
              </div>
            </Reveal>

          </div>

          {/* Full-width stats bar */}
          <Reveal delay={0.4} className="w-full">
            <div className="mt-16 lg:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 border-t border-b border-[#DCE5F5] pt-8 pb-8 text-[#263653] w-full">
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Target className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="aqe-text-semibold text-[#0B1638]">Smarter Testing</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <ShieldCheck className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="aqe-text-semibold text-[#0B1638]">Higher Quality</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <Zap className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="aqe-text-semibold text-[#0B1638]">Faster Releases</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <BarChart2 className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="aqe-text-semibold text-[#0B1638]">Measurable Results</span>
              </div>
            </div>
          </Reveal>

        </DarkSection>

        {/* ── SECTION 2: PLATFORM FLOW (LIGHT) ── */}
        <LightSection>
          <InteractivePlatformFlow config={MYSTLC_FLOW_CONFIG} />
        </LightSection>

        {/* ── SECTION 3: VALUE MODEL (LIGHT) ── */}
        <section className="relative bg-gradient-to-b from-[#f8faff] via-[#ffffff] to-[#f4f7fe] py-14 lg:py-20 overflow-hidden border-t border-slate-200/80 text-[#0f172a]">
          {/* <SignalBackground style={{ opacity: 0.5 }} /> */}
          <div className="relative z-10 mx-auto w-full px-12 md:px-[88px] lg:px-24">

            {/* Top row: eyebrow + chart label */}
            <div className="flex items-start justify-between">
              <Reveal>
                <div className="flex items-center gap-3 mb-4 aqe-label-text">
                  <span className="text-[#145BFF] text-[11px]">·</span>
                  <span className="text-[#145BFF] font-bold tracking-[0.2em]">TO BE PROVEN IN YOUR PILOT</span>
                </div>
                <h2 className="aqe-section-heading text-[#0B1638]">
                  <span className="text-[#145BFF]">mySTLC</span> — The Value Model
                </h2>
                <p className="aqe-paragraph mt-3 text-[#263653]">
                  Measurable impact. Proven outcomes. Real business value.
                </p>
              </Reveal>

              {/* Right: AUTOMATE / ACCELERATE / ACHIEVE + chart bars */}
              <Reveal delay={0.2}>
                <div className="hidden lg:flex flex-col items-end gap-1">
                  {["AUTOMATE", "ACCELERATE", "ACHIEVE"].map((t, i) => (
                    <span key={i} className="aqe-caption text-[12px] font-bold tracking-[0.2em]" style={{ color: i === 2 ? "#145BFF" : "#64748B" }}>{t}</span>
                  ))}
                  {/* Mini bar chart */}
                  <div className="mt-3 flex items-end gap-1.5" style={{ height: 60 }}>
                    {[30, 50, 70, 90, 110].map((h, i) => (
                      <div
                        key={i}
                        className="w-4 rounded-t-sm"
                        style={{
                          height: h * 0.5,
                          background: i >= 3 ? "linear-gradient(to top, #145BFF, #38bdf8)" : "#DCE5F5",
                          boxShadow: i >= 3 ? "0 -4px 12px rgba(20,91,255,0.3)" : "none",
                        }}
                      />
                    ))}
                    {/* Arrow */}
                    <div className="ml-1 text-[#145BFF]" style={{ fontSize: "1.4rem", lineHeight: 1, filter: "drop-shadow(0 0 6px rgba(20,91,255,0.5))" }}>↗</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* 3 Metric cards */}
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  icon: Zap,
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  iconColor: "#145BFF",
                  value: "40–60%",
                  valueColor: "#145BFF",
                  title: "Faster test design & documentation",
                  source: "GenAI-in-QE productivity benchmarks",
                  border: "border-[#DCE5F5] hover:border-[#145BFF]",
                },
                {
                  icon: Settings,
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  iconColor: "#145BFF",
                  value: "20–25%",
                  valueColor: "#145BFF",
                  title: "More defects found pre-release",
                  source: "AI-assisted defect detection studies",
                  border: "border-[#DCE5F5] hover:border-[#145BFF]",
                },
                {
                  icon: BarChart2,
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  iconColor: "#145BFF",
                  value: "100x",
                  valueColor: "#145BFF",
                  title: "Cheaper to fix defects at requirements vs. production",
                  source: "IBM Systems Sciences Institute",
                  border: "border-[#DCE5F5] hover:border-[#145BFF]",
                },
              ].map((card, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <div className={`flex h-full flex-col rounded-2xl border ${card.border} bg-white p-7 shadow-sm hover:shadow-md transition-all`}>
                    {/* Icon + value row */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${card.iconBg}`}>
                        <card.icon className="h-5 w-5" style={{ color: card.iconColor }} />
                      </div>
                      <span className="aqe-metric-number font-bold" style={{ color: card.valueColor }}>
                        {card.value}
                      </span>
                    </div>
                    {/* Divider */}
                    <div className="mb-4 h-px w-12" style={{ background: card.iconColor, opacity: 0.4 }} />
                    {/* Title */}
                    <h4 className="aqe-card-heading text-[#0B1638]">{card.title}</h4>
                    {/* Source */}
                    <p className="aqe-text-small mt-3 italic text-[#64748B]">{card.source}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ── SECTION 4: EFFORT SAVINGS ── */}
        <section className="relative bg-white py-14 lg:py-20 overflow-hidden">
          <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
            <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">

              {/* Left: Robot GIF + floating labels */}
              <Reveal delay={0.1}>
                <div className="relative mx-auto flex flex-col items-center w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[480px] select-none">
                  
                  {/* Top Visual: Robot + 5 Floating Cards + Curved SVG Flow Arrows */}
                  <div className="relative w-full aspect-[480/340] flex items-center justify-center">
                    {/* Curved SVG Arrows */}
                    <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                          <polygon points="0 0, 6 3, 0 6" fill="#145BFF" />
                        </marker>
                      </defs>
                      <path d="M 16 52 Q 4 36 14 26" fill="none" stroke="#145BFF" strokeWidth="0.5" markerEnd="url(#arrowhead)" />
                      <path d="M 22 16 Q 34 2 44 8" fill="none" stroke="#145BFF" strokeWidth="0.5" markerEnd="url(#arrowhead)" />
                      <path d="M 56 8 Q 66 2 78 16" fill="none" stroke="#145BFF" strokeWidth="0.5" markerEnd="url(#arrowhead)" />
                      <path d="M 86 26 Q 96 36 84 52" fill="none" stroke="#145BFF" strokeWidth="0.5" markerEnd="url(#arrowhead)" />
                    </svg>

                    {/* Floating label cards arranged in clean arch around Robot */}
                    {[
                      { label: "Requirements", icon: FileText, top: "25%", left: "14%" },
                      { label: "Test Design",  icon: Settings, top: "8%", left: "50%" },
                      { label: "RTM",          icon: Link, top: "25%", left: "86%" },
                      { label: "Release Reporting", icon: BarChart2, top: "64%", left: "78%" },
                      { label: "Evidence",     icon: ImageIcon, top: "64%", left: "22%" },
                    ].map(({ label, icon: Icon, top, left }, i) => (
                      <div
                        key={i}
                        className="absolute z-10 pointer-events-auto"
                        style={{ top, left, transform: 'translate(-50%, -50%)' }}
                      >
                        <motion.div
                          className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 rounded-xl sm:rounded-2xl border border-[#DCE5F5] bg-white p-1.5 sm:p-2.5 lg:p-3 shadow-[0_4px_16px_-4px_rgba(11,22,56,0.08)] sm:shadow-[0_8px_20px_-8px_rgba(11,22,56,0.08)] backdrop-blur-md min-w-[62px] sm:min-w-[75px] lg:min-w-[90px]"
                          animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
                          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <div className="flex h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 items-center justify-center">
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-7 lg:w-7 text-[#145BFF]" style={{ filter: "drop-shadow(0 2px 4px rgba(20,91,255,0.25))" }} />
                          </div>
                          <span className="whitespace-nowrap text-[7.5px] sm:text-[9px] lg:text-[10px] font-bold text-[#0B1638]">{label}</span>
                        </motion.div>
                      </div>
                    ))}
                    
                    {/* Robot GIF */}
                    <img
                      src={roboGif}
                      alt="mySTLC Robot"
                      className="relative z-0 w-[54%] sm:w-[58%] object-contain"
                      draggable={false}
                    />
                  </div>

                  {/* ── Bottom Pedestal Card: Higher Productivity Greater Impact (Centered Naturally as Base) ── */}
                  <div className="relative w-full max-w-[440px] sm:max-w-[460px] mt-2 sm:mt-3 z-20">
                    <motion.div
                      className="w-full flex flex-col overflow-hidden rounded-2xl border border-[#DCE5F5] bg-white p-3.5 sm:p-4 lg:p-5 shadow-[0_12px_32px_rgba(11,22,56,0.08)] backdrop-blur-xl pointer-events-auto"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="flex justify-between items-start mb-2.5 sm:mb-3 lg:mb-4">
                        <div className="text-left">
                          <h3 className="text-[11px] sm:text-[12.5px] lg:text-[13.5px] font-black leading-snug text-[#0B1638]">Higher Productivity<br/>Greater Impact</h3>
                        </div>
                        {/* Mini bar chart */}
                        <div className="flex items-end gap-1 sm:gap-1.5 h-6 sm:h-8 lg:h-9">
                          {[30, 45, 60, 80, 100].map((h, j) => (
                            <div key={j} className="w-1.5 sm:w-2 rounded-t-sm bg-gradient-to-t from-[#145BFF] to-[#38bdf8]" style={{ height: `${h}%` }} />
                          ))}
                          {/* Up Arrow for chart */}
                          <div className="text-[#145BFF] text-sm sm:text-base lg:text-lg leading-none font-bold ml-0.5 sm:ml-1 transform -translate-y-0.5 sm:-translate-y-1">↗</div>
                        </div>
                      </div>

                      {/* Footer Stats */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:gap-3">
                        {[
                          { val: "50%", sub: "Effort Saved" },
                          { val: "Faster", sub: "Release Cycles" },
                          { val: "Higher", sub: "Quality" }
                        ].map((stat, k) => (
                          <div key={k} className="flex flex-col items-center justify-center rounded-lg sm:rounded-xl bg-[#F5F8FF] py-1.5 sm:py-2 px-1 shadow-sm border border-[#DCE5F5]">
                            <span className="text-[12px] sm:text-[13.5px] lg:text-[14.5px] font-black text-[#145BFF] leading-tight">{stat.val}</span>
                            <span className="text-[8px] sm:text-[8.5px] lg:text-[9.5px] font-bold text-[#64748B] leading-tight text-center mt-0.5">{stat.sub}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Reveal>

              {/* Right: Copy */}
              <div className="flex flex-col">
                <Reveal>
                  <p className="mb-3 text-[11px] font-bold tracking-[0.2em] uppercase text-[#145BFF]">EFFORT SAVINGS</p>
                  <h2 className="aqe-section-heading text-[#0B1638]">
                    Less Effort.{" "}
                    <span className="text-[#145BFF]">Greater Impact.</span>
                  </h2>
                  <p className="aqe-paragraph mt-4 text-[#263653]">
                    AI-driven agent flows help your teams save time, stay organized,<br className="hidden lg:block" />
                    and deliver higher value — automatically.
                  </p>
                </Reveal>

                <ul className="mt-10 flex flex-col gap-7">
                  {[
                    { icon: FileText, title: "Requirements flow straight into generated test design", desc: "RTM and traceability maintained automatically." },
                    { icon: ClipboardList, title: "Evidence and release reporting assembled by agents", desc: "Readiness reports in minutes, not days." },
                    { icon: UserCheck, title: "QE teams already average 19% productivity gains with GenAI", desc: "Fixed agent flows push far beyond." },
                  ].map((item, i) => (
                    <Reveal key={i} delay={0.1 + i * 0.1}>
                      <li className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCE5F5] bg-[#EAF1FF]">
                          <item.icon className="h-4 w-4 text-[#145BFF]" />
                        </div>
                        <div>
                          <p className="font-bold text-[#0B1638]" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>{item.title}</p>
                          <p className="mt-1 text-[#263653]" style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>{item.desc}</p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 5: FINANCIAL IMPACT (LIGHT) ── */}
        <section className="relative bg-gradient-to-b from-[#f8faff] via-white to-[#f4f7fe] py-14 lg:py-20 overflow-hidden border-t border-slate-200/80 text-[#0f172a]">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 mx-auto w-full px-12 md:px-[88px] lg:px-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

              {/* Left Column: Data */}
              <div className="flex flex-col">
                <Reveal>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[12px] font-bold tracking-[0.25em] uppercase text-[#B45309]">FINANCIAL IMPACT</span>
                    <div className="h-px w-24 bg-gradient-to-r from-[#B45309]/60 to-transparent" />
                  </div>
                  
                  <h2 className="aqe-section-heading text-[#0B1638]">
                    Lower Costs.<br />
                    <span className="text-[#145BFF]">
                      Higher Value.
                    </span>
                  </h2>
                  
                  <p className="aqe-paragraph mt-5 text-[#263653]">
                    AI-driven testing delivers measurable savings<br className="hidden lg:block"/>
                    and a stronger ROI for your business.
                  </p>
                </Reveal>

                <div className="mt-10 flex flex-col gap-5">
                  {/* Card 1: Warning / CISQ */}
                  <Reveal delay={0.1}>
                    <div className="flex items-center gap-5 rounded-2xl border border-amber-200/90 bg-white p-5 shadow-sm backdrop-blur-md transition-all hover:shadow-md hover:border-amber-400">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-[#B45309] shadow-sm">
                        <Coins className="h-6 w-6 text-[#B45309]" />
                      </div>
                      <p className="text-[1.05rem] text-[#263653] leading-snug">
                        Poor software quality cost the US economy<br className="hidden xl:block" />
                        an estimated <strong className="text-[#B45309] font-bold">$2.41T</strong> in a single year (CISQ).
                      </p>
                    </div>
                  </Reveal>

                  {/* Card 2: Primary Blue */}
                  <Reveal delay={0.2}>
                    <div className="flex items-center gap-5 rounded-2xl border border-[#DCE5F5] bg-white p-5 shadow-sm backdrop-blur-md transition-all hover:shadow-md hover:border-[#145BFF]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#DCE5F5] bg-[#EAF1FF] text-[#145BFF] shadow-sm">
                        <Settings className="h-6 w-6 text-[#145BFF]" />
                      </div>
                      <p className="text-[1.05rem] text-[#263653] leading-snug">
                        Escaped defects cost <strong className="text-[#145BFF] font-bold">15–30x</strong> more to<br className="hidden xl:block" />
                        resolve than those caught in design.
                      </p>
                    </div>
                  </Reveal>

                  {/* Card 3: Soft Blue Surface */}
                  <Reveal delay={0.3}>
                    <div className="flex items-center gap-5 rounded-2xl border border-[#DCE5F5] bg-white p-5 shadow-sm backdrop-blur-md transition-all hover:shadow-md hover:border-[#145BFF]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#DCE5F5] bg-[#EAF1FF] text-[#145BFF] shadow-sm">
                        <FileSearch className="h-6 w-6 text-[#145BFF]" />
                      </div>
                      <p className="text-[1.05rem] text-[#263653] leading-snug">
                        Traceability and audit effort — a hidden<br className="hidden xl:block" />
                        lifecycle tax — <strong className="text-[#145BFF] font-bold">trends toward zero</strong>.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* Right Column: Background Image Graphic */}
              <Reveal delay={0.3}>
                <div className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:max-w-none lg:justify-end scale-105 transform origin-right">
                  <img
                    src={financialImpactBg}
                    alt="Financial Impact ROI Graphic"
                    className="w-full h-auto object-contain"
                    draggable={false}
                  />
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── SECTION 6: PROVEN BY INDUSTRY DATA (LIGHT) ── */}
        <section className="relative bg-[#f8fafc] py-14 lg:py-20 overflow-hidden border-t border-[#e2e8f0]">
          <div className="mx-auto w-full px-12 md:px-[88px] lg:px-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

              {/* Left Column: Copy & Card */}
              <div className="flex flex-col">
                <Reveal>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-10 bg-[#cbd5e1]" />
                    <div className="h-px w-10 bg-[#cbd5e1]" />
                  </div>
                  
                  <h2 className="aqe-section-heading text-[#0B1638]">
                    Shifting defect discovery<br />
                    <span className="text-[#145BFF]">
                      left by one lifecycle stage pays<br className="hidden lg:block"/>
                      for the platform many times over
                    </span><br/>
                    — production fixes cost up to <span className="text-[#145BFF]">100x</span> more.
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="mt-8 flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                    <div className="mt-1 flex shrink-0">
                      <BarChart2 className="h-6 w-6 text-[#B45309]" />
                    </div>
                    <p className="aqe-intro font-semibold text-[#B45309]">
                      Shifting defect discovery left by one lifecycle stage pays for the platform many times over — production fixes cost up to 100x more.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="aqe-text-small mt-5 italic text-[#64748B]">
                    Directional estimates drawn from published industry benchmarks (ITIC, IDC/Microsoft, Capgemini World Quality Report, CISQ, EU AI Act, autonomous-testing benchmarks) — validated with client data per engagement.
                  </p>
                </Reveal>
              </div>

              {/* Right Column: Chart Graphic & Floating Rocket */}
              <Reveal delay={0.3}>
                <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:max-w-none">
                  <img
                    src={industryDataFlow}
                    alt="Industry Data Defect Cost Curve"
                    className="w-full h-auto object-contain relative z-0"
                    draggable={false}
                  />
                  
                  {/* Floating rocket image overlaid near the top right of the curve */}
                  <motion.img
                    src={rocketImage}
                    alt="Rocket"
                    className="absolute z-10 w-[20%] md:w-[16%] object-contain drop-shadow-xl"
                    style={{ top: "-20%", right: "-10%" }}
                    animate={{ y: [0, -18, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    draggable={false}
                  />
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── SECTION: FAQS ── */}
        <FAQAccordion items={MYSTLC_FAQS} />
        <StillHaveQuestionsBanner />

        {/* ── SECTION 7: FINAL CTA (LIGHT) ── */}
        <section className="relative bg-[#F5F8FF] py-20 lg:py-28 overflow-hidden flex flex-col items-center justify-center text-center border-t border-[#DCE5F5] text-[#0B1638]">
          {/* Background Glows and Arcs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
          </div>
          
          {/* Bottom glowing arc line */}
          <div className="absolute -bottom-[650px] left-1/2 -translate-x-1/2 w-[200%] md:w-[130%] h-[800px] rounded-[100%] border-t-[2px] border-blue-400/30 shadow-[0_-30px_100px_rgba(20,91,255,0.1)] pointer-events-none" />

          {/* Left/Right subtle light streams */}
          <div className="absolute top-[30%] -left-[10%] w-[40%] h-[2px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent rotate-[-20deg] blur-[2px] pointer-events-none" />
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[2px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent rotate-[20deg] blur-[2px] pointer-events-none" />

          <div className="relative z-10 mx-auto w-full px-6 md:px-12 max-w-5xl">
            <Reveal>
              {/* Eyebrow */}
              <div className="flex flex-col items-center justify-center mb-10">
                <p className="aqe-label-text text-[#263653] font-semibold">
                  READY TO <span className="font-bold text-[#145BFF]">TRANSFORM YOUR TESTING</span>?
                </p>
                {/* Glowing underline */}
                <div className="mt-3 h-[2px] w-72 bg-gradient-to-r from-transparent via-[#145BFF] to-transparent shadow-[0_0_8px_rgba(20,91,255,0.4)]" />
              </div>

              {/* Headings */}
              <h2 className="aqe-hero-heading text-[#0B1638] mb-4">
                See mySTLC in Action.
              </h2>
              <h3 className="aqe-sub-heading text-[#145BFF]">
                Turn Your Testing Lifecycle Into Intelligent Automation.
              </h3>
            </Reveal>

            <Reveal delay={0.1}>
              {/* CTA Button */}
              <div className="mt-12 flex justify-center">
                <a
                  href="/contact"
                  className="aqe-btn-text group relative inline-flex items-center gap-2 rounded-2xl bg-[#145BFF] hover:bg-[#0B49D6] px-10 py-4 text-white shadow-[0_8px_24px_rgba(20,91,255,0.3)] transition-all hover:scale-[1.03] active:scale-95 hover:shadow-[0_12px_28px_rgba(20,91,255,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request a Demo <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </Reveal>

          </div>

          <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 w-full px-4 text-center z-20">
            <Reveal delay={0.2}>
              <p className="aqe-paragraph text-[#263653] font-medium tracking-wide">
                Experience fixed internal agents. Governed testing. Actionable quality intelligence.
              </p>
            </Reveal>
          </div>
        </section>

      </main>
    </div>
  );
}
