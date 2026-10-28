import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  Search,
  Settings,
  Compass,
  BarChart3,
  ShieldCheck,
  User,
  Link2,
  Code2,
} from "lucide-react";

// 6 Cyclic Steps for Agentic QE (Arranged in Exact Regular Hexagon matching Target UI)
const CYCLE_STEPS = [
  {
    id: "understand",
    title: "Understand",
    subtext: "Requirements & Context",
    icon: FileText,
    pos: { left: "50%", top: "18%" },
    bgClass: "bg-white border-purple-200/90 shadow-[0_4px_20px_rgba(147,51,234,0.08)]",
    iconColor: "text-[#9333ea]",
  },
  {
    id: "discover",
    title: "Discover",
    subtext: "Applications & Systems",
    icon: Search,
    pos: { left: "78%", top: "34%" },
    bgClass: "bg-[#F5F8FF] border-[#DCE5F5] shadow-[0_4px_20px_rgba(20,91,255,0.06)]",
    iconColor: "text-[#145BFF]",
  },
  {
    id: "plan",
    title: "Plan",
    subtext: "Strategy & Test Design",
    icon: Settings,
    pos: { left: "78%", top: "66%" },
    bgClass: "bg-[#f0f7ff] border-blue-200/90 shadow-[0_4px_20px_rgba(37,99,235,0.08)]",
    iconColor: "text-[#2563eb]",
  },
  {
    id: "execute",
    title: "Execute",
    subtext: "Automate & Validate",
    icon: Compass,
    pos: { left: "50%", top: "82%" },
    bgClass: "bg-[#fff1f2] border-rose-200/90 shadow-[0_4px_20px_rgba(225,29,72,0.08)]",
    iconColor: "text-[#e11d48]",
  },
  {
    id: "evaluate",
    title: "Evaluate",
    subtext: "Analyze & Report",
    icon: BarChart3,
    pos: { left: "22%", top: "66%" },
    bgClass: "bg-[#f0fdf4] border-emerald-200/90 shadow-[0_4px_20px_rgba(5,150,105,0.08)]",
    iconColor: "text-[#059669]",
  },
  {
    id: "govern",
    title: "Govern",
    subtext: "Policy, Security & Compliance",
    icon: ShieldCheck,
    pos: { left: "22%", top: "34%" },
    bgClass: "bg-[#f5f3ff] border-indigo-200/90 shadow-[0_4px_20px_rgba(79,70,229,0.08)]",
    iconColor: "text-[#6366f1]",
  },
];

// 4 Corner Boundary Tags (Positioned cleanly within outer container corners)
const CORNER_BADGES = [
  { label1: "PEOPLE", label2: "+", label3: "AGENTS", pos: { left: "14%", top: "14%" } },
  { label1: "TOOLS", label2: "+", label3: "DATA", pos: { left: "86%", top: "14%" } },
  { label1: "GOVERNANCE", label2: "+", label3: "POLICIES", pos: { left: "14%", top: "86%" } },
  { label1: "CONTINUOUS", label2: "", label3: "QUALITY", pos: { left: "86%", top: "86%" } },
];

// 5 Transformation Comparison Columns
const COMPARISON_COLUMNS = [
  {
    id: "comp-1",
    icon: FileText,
    iconColor: "text-[#145BFF]",
    beforeText: "AI-generated outputs",
    arrowColor: "text-[#145BFF]",
    afterText: "Governed QE outcomes",
    afterColor: "text-[#145BFF]",
  },
  {
    id: "comp-2",
    icon: User,
    iconColor: "text-[#0284c7]",
    beforeText: "Individual copilots",
    arrowColor: "text-[#38bdf8]",
    afterText: "Collaborating QE agents",
    afterColor: "text-[#0284c7]",
  },
  {
    id: "comp-3",
    icon: Link2,
    iconColor: "text-[#145BFF]",
    beforeText: "Disconnected automation",
    arrowColor: "text-[#145BFF]",
    afterText: "Orchestrated workflows",
    afterColor: "text-[#145BFF]",
  },
  {
    id: "comp-4",
    icon: Code2,
    iconColor: "text-[#0284c7]",
    beforeText: "Prompt-based execution",
    arrowColor: "text-[#0ea5e9]",
    afterText: "Policy-controlled execution",
    afterColor: "text-[#0284c7]",
  },
  {
    id: "comp-5",
    icon: BarChart3,
    iconColor: "text-[#145BFF]",
    beforeText: "Automation results",
    arrowColor: "text-[#145BFF]",
    afterText: "Evidence-backed quality decisions",
    afterColor: "text-[#145BFF]",
  },
];

export function Workflow() {
  const reduce = useReducedMotion();

  return (
    <section
      id="why-agentic-qe"
      className="relative bg-white py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden text-[#0a1628]"
    >
      {/* ── Background Subtle Ambient Lighting ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-[5%] w-[550px] h-[550px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Main Container: Edge-Aligned Two-Column Layout ── */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-[88px] lg:px-16 xl:px-24">
        <div className="grid items-center gap-12 lg:gap-14 xl:gap-16 lg:grid-cols-12">
          
          {/* ════════ LEFT COLUMN: 3D Agentic QE Cycle Diagram ════════ */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full">
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[540px] xl:max-w-[580px] aspect-square flex items-center justify-center select-none">
              
              {/* SVG Circular Orbit Track & Ambient Glow Rings */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 600 600"
                fill="none"
              >
                <defs>
                  {/* Multi-color gradient for circular track matching target mockup */}
                  <linearGradient id="cycleTrackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="25%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#145BFF" />
                    <stop offset="75%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>

                  {/* Soft radial glow behind center sphere */}
                  <radialGradient id="centerSphereBloom" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Soft ambient bloom */}
                <circle cx="300" cy="300" r="140" fill="url(#centerSphereBloom)" />

                {/* Outer subtle boundary circle */}
                <circle
                  cx="300"
                  cy="300"
                  r="270"
                  stroke="rgba(226, 232, 240, 0.65)"
                  strokeWidth="1"
                />

                {/* Outer dashed circular orbit ring */}
                <circle
                  cx="300"
                  cy="300"
                  r="230"
                  stroke="rgba(56, 189, 248, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                />

                {/* Inner continuous multi-colored circular track ring */}
                <circle
                  cx="300"
                  cy="300"
                  r="185"
                  stroke="url(#cycleTrackGrad)"
                  strokeWidth="2.5"
                />
              </svg>

              {/* ── Center 3D Floating Sphere & Pedestal Base Disc (Dead Center) ── */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <motion.div
                  animate={reduce ? undefined : { y: [-3.5, 3.5, -3.5] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex flex-col items-center justify-center pointer-events-auto"
                >
                  {/* Top Glowing Gradient Sphere matching Image 2 */}
                  <div
                    className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-[3px] border-white shadow-[0_12px_36px_rgba(99,102,241,0.45),inset_0_3px_14px_rgba(255,255,255,0.85),inset_0_-8px_20px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center text-center p-3 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #a855f7 100%)",
                    }}
                  >
                    {/* Top-Center Specular Glare */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-6 sm:h-8 rounded-full bg-gradient-to-b from-white/75 to-transparent pointer-events-none" />

                    {/* Inner subtle glow ring */}
                    <div className="absolute inset-1.5 rounded-full border border-white/20 pointer-events-none" />

                    {/* Typography: Agentic QE */}
                    <div className="relative z-10 flex flex-col items-center justify-center select-none">
                      <span className="text-base sm:text-lg md:text-xl font-black text-[#0a1628] tracking-tight leading-tight drop-shadow-sm">
                        Agentic
                      </span>
                      <span className="text-base sm:text-lg md:text-xl font-black text-[#0a1628] tracking-tight leading-tight drop-shadow-sm mt-0.5">
                        QE
                      </span>
                    </div>
                  </div>

                  {/* 3D Pedestal Shadow & Depth Layers */}
                  <div className="w-28 sm:w-32 md:w-36 h-5 sm:h-6 rounded-[100%] bg-gradient-to-b from-[#475569] via-[#334155] to-[#1e293b] shadow-md -mt-3 sm:-mt-3.5 -z-10" />
                  <div className="w-36 sm:w-42 md:w-48 h-6 sm:h-8 rounded-[100%] bg-gradient-to-b from-[#94a3b8]/40 via-[#cbd5e1]/25 to-transparent blur-[3px] -mt-4.5 sm:-mt-5 -z-20" />
                </motion.div>
              </div>

              {/* ── 6 Cycle Step Cards (Arranged in Perfect Symmetric Hexagon with Guaranteed -50% -50% Center Alignment) ── */}
              {CYCLE_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    style={{
                      left: step.pos.left,
                      top: step.pos.top,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="absolute z-30 pointer-events-auto"
                  >
                    <motion.div
                      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                    >
                      <div
                        className={`group flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl border p-2 sm:p-2.5 xl:p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-default w-26 sm:w-28 md:w-30 lg:w-32 xl:w-34 min-h-[86px] sm:min-h-[92px] md:min-h-[98px] lg:min-h-[104px] ${step.bgClass}`}
                      >
                        <Icon className={`h-5 w-5 sm:h-5.5 sm:w-5.5 lg:h-6 lg:w-6 ${step.iconColor} mb-1 transition-transform duration-200 group-hover:scale-110`} />
                        <h4 className="text-xs sm:text-[13px] lg:text-[13.5px] font-bold text-[#0f172a] leading-tight">
                          {step.title}
                        </h4>
                        <p className="mt-0.5 aqe-caption text-slate-500 leading-tight text-center font-normal max-w-[115px] sm:max-w-[125px]">
                          {step.subtext}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}

              {/* ── 4 Corner Boundary Badges ── */}
              {CORNER_BADGES.map((badge, idx) => (
                <div
                  key={idx}
                  style={{
                    left: badge.pos.left,
                    top: badge.pos.top,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="absolute z-10 flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm px-3 sm:px-3.5 py-1.5 sm:py-2 shadow-[0_4px_16px_rgba(0,0,0,0.05)] min-w-[72px] sm:min-w-[82px] text-center select-none"
                >
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 tracking-wider">
                    {badge.label1}
                  </span>
                  {badge.label2 && (
                    <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 my-0.5">
                      {badge.label2}
                    </span>
                  )}
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 tracking-wider">
                    {badge.label3}
                  </span>
                </div>
              ))}

            </div>
          </div>

          {/* ════════ RIGHT COLUMN: Narrative, Comparisons & Highlight Card ════════ */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow with Gradient Accent Line */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#145BFF] uppercase">
                WHY AGENTIC QE MATTERS
              </span>
              <span className="h-[2px] w-14 sm:w-20 bg-gradient-to-r from-[#145BFF] via-[#0ea5e9] to-transparent rounded-full" />
            </motion.div>

            {/* Display Headline */}
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-[2.45rem] xl:text-[2.9rem] font-extrabold tracking-tight leading-[1.12]"
            >
              <span className="block text-[#0a1628]">
                Quality Engineering Needs More Than AI Assistance.
              </span>
              <span className="block text-[#145BFF] mt-1">
                It Needs Coordinated Intelligence.
              </span>
            </motion.h2>

            {/* Narrative Paragraph */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="aqe-paragraph mt-4 sm:mt-5 text-slate-600"
            >
              Traditional automation executes predefined instructions. Generative AI can produce
              individual outputs. But enterprise QE requires coordinated agents that understand
              context, collaborate, reason and act across the engineering lifecycle.
            </motion.p>

            {/* 5 Transformation Comparison Columns (Before -> After) */}
            <div className="mt-7 sm:mt-8 pt-6 border-t border-slate-100 grid grid-cols-5 gap-2 sm:gap-3 xl:gap-4 w-full">
              {COMPARISON_COLUMNS.map((col, index) => {
                const Icon = col.icon;
                return (
                  <motion.div
                    key={col.id}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
                    className="flex flex-col items-center text-center group cursor-default"
                  >
                    {/* Top Icon */}
                    <div className={`${col.iconColor} mb-1.5 transition-transform duration-200 group-hover:scale-110`}>
                      <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 stroke-[2.2]" />
                    </div>

                    {/* Top 'Before' Text */}
                    <span className="aqe-caption font-semibold text-slate-600 leading-tight">
                      {col.beforeText}
                    </span>

                    {/* Transition Arrow */}
                    <span className={`my-1 text-sm sm:text-base font-bold ${col.arrowColor}`}>
                      ↓
                    </span>

                    {/* Bottom 'After' Text */}
                    <span className={`text-[10.5px] sm:text-[11.5px] xl:text-[12.5px] font-bold ${col.afterColor} leading-tight`}>
                      {col.afterText}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Governance Highlight Box */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="mt-7 sm:mt-8 w-full rounded-2xl border border-[#DCE5F5] bg-[#F5F8FF]/80 p-4 sm:p-5 flex items-start sm:items-center gap-3.5 sm:gap-4 shadow-sm backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FF] border border-[#DCE5F5] text-[#145BFF]">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
              </div>
              <p className="text-xs sm:text-[13px] lg:text-[14px] text-slate-700 leading-relaxed font-normal">
                myDiya enforces confidence thresholds, human approvals, access policies, cost limits,
                retries, timeouts, data rules and audit requirements—so autonomy stays in control.
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Workflow;
