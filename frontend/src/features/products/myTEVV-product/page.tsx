import { ScrollToTop } from "@/shared/ScrollToTop";
import { useEffect } from "react";
import { Eyebrow, Reveal, SignalBackground, CursorGlow } from "../../../components/ui/shared";
import { ShieldCheck, Shield, FileText, Search, FileCheck, Landmark, ClipboardList, Settings, BarChart, BarChart2, Coins, Users, ArrowRight, Play, Euro, Database, Clock, TrendingUp, Target, Gauge, Wallet, FileSearch, BarChart3, FileBadge, Rocket } from "lucide-react";
import myTEVVLogo from "../../../assets/myTEVV-assets/myTEVV-logo.webp";
import customShieldIcon from "../../../assets/myTEVV-assets/shield-icon.webp";
import myTEVVFlow from "../../../assets/myTEVV-assets/myTEVV-flow.webp";
import effortSavingImage from "../../../assets/myTEVV-assets/effort-saving-image.webp";
import financialImpactImage from "../../../assets/myTEVV-assets/financial-impact-image.webp";
import { motion } from "motion/react";
import { FAQAccordion } from "@/shared/faq's accordians/page";
import { StillHaveQuestionsBanner } from "@/shared/StillHaveQuestionsBanner";
import { MYTEVV_FAQS } from "./myTEVV-faqs";
import { InteractivePlatformFlow } from "@/shared/flows/InteractivePlatformFlow";
import { MYTEVV_FLOW_CONFIG } from "@/shared/flows/flowConfigs";

function MetricCard({ value, title, source }: { value: string; title: string; source: string }) {
  return (
    <Reveal className="h-full">
      <div className="flex h-full flex-col justify-center rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm transition-all hover:border-[rgba(0,229,192,0.4)] hover:shadow-[0_12px_32px_-12px_rgba(0,229,192,0.15)]">
        <div className="aqe-cyan-text font-black" style={{ fontSize: "2.8rem", lineHeight: 1 }}>{value}</div>
        <div className="mt-4 font-bold italic text-[#111827]" style={{ fontSize: "1.05rem", lineHeight: 1.4 }}>{title}</div>
        <div className="mt-auto pt-6 text-xs font-medium italic text-[#64748b]">{source}</div>
      </div>
    </Reveal>
  );
}

function DarkSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pb-8 pt-8 sm:pt-9 lg:pb-10 lg:pt-10 border-b border-[#DCE5F5] overflow-hidden w-full">
      <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

function LightSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative bg-[#f9fafb] py-16 sm:py-20 lg:py-32 overflow-hidden w-full">
      <div className="mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

export function MyTEVVPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0f172a]">
      <CursorGlow />
      <main className="w-full">

        {/* ── SECTION 1: HERO (DARK) ── */}
        <DarkSection>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center relative z-10">

            {/* Left Column: Copy */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6 text-left">
                {/* Breadcrumb */}
                <p className="text-xs text-[#64748B]">
                  <a href="/" className="hover:text-[#145BFF] transition-colors">Home</a>
                  <span className="mx-1.5">›</span>
                  <a href="/products" className="hover:text-[#145BFF] transition-colors">Products</a>
                  <span className="mx-1.5">›</span>
                  <span className="text-[#145BFF] font-medium">myTEVV</span>
                </p>

                {/* Logo & Subtitle */}
                <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                  <img src={myTEVVLogo} alt="myTEVV Logo" className="h-14 sm:h-16 md:h-20 lg:h-[84px] w-auto object-contain shrink-0" />
                  <div className="flex flex-col border-l border-[#DCE5F5] pl-4 sm:pl-5 md:pl-6 py-1">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1638] leading-none mb-1.5">myTEVV</h2>
                    <p className="text-[#64748B] text-[12px] md:text-[13px] font-medium tracking-[0.1em] uppercase">AI Evaluation · Verification · Validation</p>
                  </div>
                </div>

                <h1 className="aqe-hero-heading text-[#0B1638]">
                  AI Testing, Evaluation, Verification & Validation with <span className="text-[#145BFF]">myTEVV</span>
                </h1>

                <h2 className="aqe-sub-heading text-[#0B1638] mt-2">
                  Purpose-built for AI assurance.
                </h2>

                <p className="aqe-intro text-[#263653] leading-relaxed max-w-xl">
                  Evaluation, verification and validation of AI systems — with the strongest governance, evaluation and regulatory capability in the suite.
                </p>

                <p className="aqe-paragraph text-[#64748B] leading-relaxed italic max-w-xl">
                  Built for regulatory expectations — evidence, governance and decisions on the record.
                </p>

                <div className="flex flex-wrap items-center gap-5 mt-6">
                  <a href="/contact" className="aqe-btn-text flex items-center justify-center gap-2 bg-[#145BFF] hover:bg-[#0B49D6] text-white px-8 py-3.5 rounded-xl font-bold transition-transform hover:scale-105 shadow-[0_12px_24px_-10px_rgba(20,91,255,0.4)]">
                    Request a Demo <ArrowRight className="w-5 h-5" />
                  </a>
                  <button className="aqe-btn-text flex items-center justify-center gap-2 bg-white border border-[#DCE5F5] text-[#0B1638] px-8 py-3.5 rounded-xl font-medium transition-colors hover:bg-[#EAF1FF] shadow-sm">
                    <Play className="w-5 h-5 text-[#145BFF] fill-[#145BFF]" /> Watch Video
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Interactive Shield Visual */}
            <Reveal delay={0.3} className="w-full min-w-0 flex items-center justify-center">
              <div className="relative mx-auto flex w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[620px] h-[460px] xs:h-[480px] sm:h-[520px] md:h-[560px] lg:h-[600px] items-center justify-center mt-12 lg:mt-0">

                {/* Glowing Background Elements */}
                <div className="absolute inset-0 bg-[#145BFF]/6 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

                {/* Glowing Base Platform Pedestal */}
                <div className="absolute bottom-[2%] sm:bottom-[4%] md:bottom-[5%] inset-x-0 flex flex-col items-center pointer-events-none z-10">
                  <div className="w-[110%] sm:w-[120%] max-w-[540px] h-20 sm:h-24 md:h-28 rounded-[100%] border-t-[2px] border-[#145BFF]/30 shadow-[0_-10px_35px_rgba(20,91,255,0.15)] bg-gradient-to-b from-[#145BFF]/15 via-[#145BFF]/5 to-transparent relative -mb-6 sm:-mb-7 pointer-events-none" />

                  {/* Small Base Cards */}
                  <div className="relative z-20 flex gap-2 sm:gap-3 md:gap-3.5 whitespace-nowrap pointer-events-auto">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#DCE5F5] rounded-md sm:rounded px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
                      <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#145BFF] shrink-0" />
                      <span className="text-[#0B1638] font-bold aqe-caption uppercase tracking-wider sm:tracking-widest">Evidence</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#DCE5F5] rounded-md sm:rounded px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
                      <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#145BFF] shrink-0" />
                      <span className="text-[#0B1638] font-bold aqe-caption uppercase tracking-wider sm:tracking-widest">Governance</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#DCE5F5] rounded-md sm:rounded px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
                      <ClipboardList className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#145BFF] shrink-0" />
                      <span className="text-[#0B1638] font-bold aqe-caption uppercase tracking-wider sm:tracking-widest">Decisions</span>
                    </div>
                  </div>
                </div>

                {/* Center Shield Element */}
                <div className="relative z-10 flex flex-col items-center justify-center w-36 h-44 sm:w-46 sm:h-54 md:w-54 md:h-64 lg:w-60 lg:h-72 -mt-4 sm:-mt-6">
                  {/* Outer Glowing Shield Layer */}
                  <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      transform: 'scale(1.28)',
                      backgroundColor: '#3b82f6',
                      WebkitMaskImage: `url(${customShieldIcon})`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: `url(${customShieldIcon})`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      filter: 'drop-shadow(0 0 8px #145BFF) drop-shadow(0 0 20px #145BFF) drop-shadow(0 0 45px rgba(20,91,255,0.4))'
                    }}
                  />
                  {/* Inner Solid Shield Layer */}
                  <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      transform: 'scale(1)',
                      backgroundColor: '#145BFF',
                      WebkitMaskImage: `url(${customShieldIcon})`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: `url(${customShieldIcon})`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center p-2 xs:p-2.5 sm:p-3.5 md:p-5 text-center mt-2 sm:mt-3 select-none">
                    <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[34px] font-bold tracking-tight mb-1 sm:mb-1.5 md:mb-2">
                      <span className="text-[#0B1638]">my</span>
                      <span className="text-[#145BFF] font-black">TEVV</span>
                      <sup className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-[#145BFF] relative -top-2 xs:-top-2.5 sm:-top-3 md:-top-3.5">™</sup>
                    </div>
                    <p className="text-[#263653] text-[9.5px] xs:text-[10.5px] sm:text-[12px] md:text-[14px] font-semibold leading-tight sm:leading-snug">
                      Trusted AI.<br />Responsible AI.<br />Compliant AI.
                    </p>
                  </div>
                </div>

                {/* Floating Orbit Cards */}
                {/* 1. Evaluation (Top) */}
                <div className="absolute top-[2%] sm:top-[1%] inset-x-0 z-20 flex justify-center pointer-events-none">
                  <motion.div
                    className="pointer-events-auto flex flex-col items-center justify-center bg-white border border-[#DCE5F5] rounded-xl p-2.5 sm:p-3 md:p-3.5 shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF] min-w-[125px] sm:min-w-[150px] md:min-w-[168px] text-center"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#145BFF] mb-1.5 sm:mb-2 shrink-0" />
                    <h3 className="text-[#0B1638] font-bold aqe-caption tracking-wider uppercase whitespace-nowrap">Evaluation</h3>
                  </motion.div>
                </div>

                {/* 2. Verification (Middle Left) */}
                <div className="absolute top-[34%] sm:top-[35%] md:top-[36%] left-[-5%] sm:left-[-4%] md:left-[-3%] lg:left-[-4%] z-20 pointer-events-none">
                  <motion.div
                    className="pointer-events-auto flex flex-col items-center justify-center bg-white border border-[#DCE5F5] rounded-xl p-2.5 sm:p-3 md:p-3.5 shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF] min-w-[125px] sm:min-w-[150px] md:min-w-[168px] text-center"
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#145BFF] mb-1.5 sm:mb-2 shrink-0" />
                    <h3 className="text-[#0B1638] font-bold aqe-caption tracking-wider uppercase whitespace-nowrap">Verification</h3>
                  </motion.div>
                </div>

                {/* 3. Validation (Middle Right) */}
                <div className="absolute top-[34%] sm:top-[35%] md:top-[36%] right-[-5%] sm:right-[-4%] md:right-[-3%] lg:right-[-4%] z-20 pointer-events-none">
                  <motion.div
                    className="pointer-events-auto flex flex-col items-center justify-center bg-white border border-[#DCE5F5] rounded-xl p-2.5 sm:p-3 md:p-3.5 shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF] min-w-[125px] sm:min-w-[150px] md:min-w-[168px] text-center"
                    animate={{ y: [4, -4, 4] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#145BFF] mb-1.5 sm:mb-2 shrink-0" />
                    <h3 className="text-[#0B1638] font-bold aqe-caption tracking-wider uppercase whitespace-nowrap">Validation</h3>
                  </motion.div>
                </div>

              </div>
            </Reveal>

          </div>

          {/* Bottom Features Bar */}
          <Reveal delay={0.4} className="w-full">
            <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 border-t border-b border-[#DCE5F5] pt-6 pb-6 sm:pt-8 sm:pb-8 text-[#263653] w-full">
              <div className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-[#145BFF] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#0B1638]">Trusted AI Systems</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-[#145BFF] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#0B1638]">Stronger Governance</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[#145BFF] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#0B1638]">Regulatory Compliance</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#145BFF] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#0B1638]">Greater Confidence</span>
              </div>
            </div>
          </Reveal>
        </DarkSection>

        {/* ── SECTION 1.5: THE PLATFORM FLOW (LIGHT) ── */}
        <section className="relative bg-[#f9fafb] py-16 lg:py-20 overflow-hidden border-b border-gray-100 w-full">
          <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
            <InteractivePlatformFlow config={MYTEVV_FLOW_CONFIG} />
          </div>
        </section>

        {/* ── SECTION 2: VALUE MODEL (LIGHT) ── */}
        <section className="relative bg-gradient-to-b from-[#f8faff] via-white to-[#f1f5f9] py-14 lg:py-20 overflow-hidden border-t border-slate-200/80">
          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">

            {/* Top row: eyebrow + chart label */}
            <div className="flex items-start justify-between">
              <Reveal>
                <div className="flex items-center gap-3 mb-4 aqe-label-text">
                  <span className="text-[#145BFF] font-bold">VALUE MODEL</span>
                  <span className="text-slate-400 text-[11px]">·</span>
                  <span className="text-slate-500 font-semibold">TO BE PROVEN IN YOUR PILOT</span>
                </div>
                <h2 className="aqe-section-heading text-[#0B1638]">
                  <span className="text-[#145BFF]">myTEVV</span> — The Value Model
                </h2>
                <p className="aqe-paragraph mt-3 text-[#263653] font-medium">
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
                    <div className="ml-1 text-[#145BFF]" style={{ fontSize: "1.4rem", lineHeight: 1, filter: "drop-shadow(0 0 4px rgba(20,91,255,0.4))" }}>↗</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* 3 Metric cards */}
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  icon: Euro,
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  iconColor: "#145BFF",
                  value: "€35M / 7%",
                  valueColor: "#145BFF",
                  title: "Max fine per EU AI Act violation",
                  source: "EU AI Act, Art. 99",
                  border: "border-[#DCE5F5]",
                },
                {
                  icon: Database,
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  iconColor: "#145BFF",
                  value: "~€52K",
                  valueColor: "#145BFF",
                  title: "Typical annual manual compliance cost",
                  source: "EU compliance cost studies",
                  border: "border-[#DCE5F5]",
                },
                {
                  icon: Clock,
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  iconColor: "#145BFF",
                  value: "80%",
                  valueColor: "#145BFF",
                  title: "Faster evaluation cycles & evidence packs",
                  source: "Weeks of manual TEVV work compressed to days",
                  border: "border-[#DCE5F5]",
                }
              ].map((card, idx) => (
                <Reveal key={idx} delay={0.3 + idx * 0.1} className="h-full">
                  <div className={`flex flex-col h-full rounded-[20px] border ${card.border} bg-white p-6 shadow-sm transition-all hover:border-[#145BFF] hover:shadow-[0_12px_32px_-12px_rgba(20,91,255,0.18)]`}>
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${card.iconBg}`}>
                        <card.icon className="h-5 w-5" style={{ color: card.iconColor }} />
                      </div>
                      <div className="aqe-metric-number" style={{ color: card.valueColor }}>
                        {card.value}
                      </div>
                    </div>

                    <hr className="my-5 border-t border-slate-100" />

                    <h4 className="aqe-card-heading text-[#0B1638] mb-2">{card.title}</h4>
                    <p className="aqe-text-small font-medium italic text-[#64748B]">{card.source}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: EFFORT SAVINGS (LIGHT) ── */}
        <section className="relative bg-[#f9fafb] py-12 lg:py-20 overflow-hidden border-t border-gray-100">
          <div className="mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-12 xl:px-20 2xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-16 items-center">

              {/* Left Column: Image & Floating Labels */}
              <Reveal delay={0.2} className="relative w-full min-w-0 flex justify-center">
                <div className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[540px] xl:max-w-[600px] aspect-[4/3] flex items-center justify-center my-6 sm:my-8 lg:my-0">
                  <img
                    src={effortSavingImage}
                    alt="Effort Savings - Less Manual Effort"
                    className="w-full h-full object-contain object-center scale-100 sm:scale-[1.05]"
                  />

                  {/* Floating Label 1: Faster Audits (Top Left) */}
                  <motion.div
                    className="absolute top-[10%] sm:top-[12%] left-[0%] flex flex-col items-center bg-white backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 md:p-4 shadow-[0_8px_30px_rgba(11,22,56,0.08)] border border-[#DCE5F5]"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EAF1FF] flex items-center justify-center mb-1.5 sm:mb-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#145BFF]" />
                    </div>
                    <span className="text-[#0B1638] text-[9.5px] sm:text-[11px] font-bold text-center leading-tight">Faster<br />Audits</span>
                  </motion.div>

                  {/* Floating Label 2: Continuous Evaluation (Top Center) */}
                  <motion.div
                    className="absolute top-[-8%] sm:top-[-10%] right-[26%] sm:right-[28%] flex flex-col items-center bg-white backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 md:p-4 shadow-[0_8px_30px_rgba(11,22,56,0.08)] border border-[#DCE5F5]"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EAF1FF] flex items-center justify-center mb-1.5 sm:mb-2">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#145BFF]" />
                    </div>
                    <span className="text-[#0B1638] text-[9.5px] sm:text-[11px] font-bold text-center leading-tight">Continuous<br />Evaluation</span>
                  </motion.div>

                  {/* Floating Label 3: Governance Ready (Middle Right) */}
                  <motion.div
                    className="absolute top-[38%] sm:top-[40%] right-[0%] sm:right-[-2%] flex flex-col items-center bg-white backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 md:p-4 shadow-[0_8px_30px_rgba(11,22,56,0.08)] border border-[#DCE5F5]"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EAF1FF] flex items-center justify-center mb-1.5 sm:mb-2">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#145BFF]" />
                    </div>
                    <span className="text-[#0B1638] text-[9.5px] sm:text-[11px] font-bold text-center leading-tight">Governance<br />Ready</span>
                  </motion.div>
                </div>
              </Reveal>

              {/* Right Column: Copy & List */}
              <Reveal delay={0.4} className="w-full min-w-0 flex flex-col justify-center lg:pl-4 xl:pl-8">
                <div className="flex flex-col w-full">
                  <div className="aqe-label-text text-[#145BFF] mb-4">
                    EFFORT SAVINGS
                  </div>
                  <div className="w-12 h-[3px] bg-[#145BFF] mb-8" />

                  <h2 className="aqe-section-heading text-[#0B1638] mb-10 lg:mb-12">
                    More Value.<br />
                    <span className="text-[#145BFF]">Less Manual Effort.</span>
                  </h2>

                  <div className="flex flex-col gap-7 sm:gap-9 w-full">
                    {/* Item 1 */}
                    <div className="flex items-center gap-4 sm:gap-6 w-full">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#EAF1FF] flex items-center justify-center shadow-[0_0_15px_rgba(20,91,255,0.1)]">
                        <FileText className="w-6 h-6 text-[#145BFF]" />
                      </div>
                      <p className="aqe-paragraph text-[#263653] leading-relaxed">
                        <span className="font-bold text-[#0B1638]">Continuous automated evaluation</span> replaces quarterly manual assessment campaigns.
                      </p>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-4 sm:gap-6 w-full">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#EAF1FF] flex items-center justify-center shadow-[0_0_15px_rgba(20,91,255,0.1)]">
                        <Clock className="w-6 h-6 text-[#145BFF]" />
                      </div>
                      <p className="aqe-paragraph text-[#263653] leading-relaxed">
                        <span className="font-bold text-[#0B1638]">Audit preparation drops from weeks to days</span> — evidence, governance and decisions already on the record.
                      </p>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center gap-4 sm:gap-6 w-full">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#EAF1FF] flex items-center justify-center shadow-[0_0_15px_rgba(20,91,255,0.1)]">
                        <Users className="w-6 h-6 text-[#145BFF]" />
                      </div>
                      <p className="aqe-paragraph text-[#263653] leading-relaxed">
                        <span className="font-bold text-[#0B1638]">Bias, drift and groundedness monitored by agents</span> — no dedicated headcount required.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: FINANCIAL IMPACT (LIGHT) ── */}
        <section className="relative bg-[#F5F8FF] py-14 lg:py-20 overflow-hidden border-t border-[#DCE5F5]">
          <div className="mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-12 xl:px-20 2xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-14 items-center mb-16">

              {/* Left Column: Copy & List */}
              <Reveal delay={0.2} className="w-full min-w-0 flex flex-col justify-center order-2 lg:order-1">
                <div className="aqe-label-text text-[#B45309] font-bold mb-4">
                  FINANCIAL IMPACT
                </div>
                <div className="w-12 h-[3px] bg-[#B45309] mb-8" />

                <h2 className="aqe-section-heading text-[#0B1638] mb-4">
                  Lower Costs.<br />
                  <span className="text-[#145BFF]">Higher Returns.</span>
                </h2>
                <p className="aqe-paragraph text-[#263653] mb-10 font-medium">
                  Real financial impact through governed AI automation.
                </p>

                <div className="flex flex-col gap-6 w-full">
                  {/* Item 1 */}
                  <div className="flex items-center gap-5 sm:gap-6 border-b border-[#DCE5F5] pb-6 w-full">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full border border-amber-300 bg-amber-50/80 flex items-center justify-center shadow-sm">
                      <BarChart2 className="w-6 h-6 text-[#B45309]" />
                    </div>
                    <p className="aqe-paragraph text-[#263653] leading-relaxed font-normal">
                      A single avoided enforcement action can exceed a decade of platform investment.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-5 sm:gap-6 border-b border-[#DCE5F5] pb-6 w-full">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full border border-amber-300 bg-amber-50/80 flex items-center justify-center shadow-sm">
                      <Coins className="w-6 h-6 text-[#B45309]" />
                    </div>
                    <p className="aqe-paragraph text-[#263653] leading-relaxed font-normal">
                      Security-AI and automation correlate with ~$1.9M lower breach costs and 80 days faster containment.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-5 sm:gap-6 pb-2 w-full">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full border border-amber-300 bg-amber-50/80 flex items-center justify-center shadow-sm">
                      <Shield className="w-6 h-6 text-[#B45309]" />
                    </div>
                    <p className="aqe-paragraph text-[#263653] leading-relaxed font-normal">
                      Mature governance cuts external advisory spend by ~30%.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Image & Floating Labels */}
              <Reveal delay={0.4} className="relative w-full min-w-0 h-full flex flex-col justify-center order-1 lg:order-2 items-center lg:items-end">
                <div className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[560px] xl:max-w-[640px] aspect-[4/3] flex items-center justify-center mt-8 lg:mt-0">
                  <img
                    src={financialImpactImage}
                    alt="Financial Impact - Lower Costs, Higher Returns"
                    className="w-full h-full object-contain object-center scale-105 sm:scale-[1.12]"
                  />

                  {/* Floating Card 1: Avoided Enforcement Risk (Top Right) */}
                  <motion.div
                    className="absolute top-[-10%] right-[0%] flex items-center gap-4 bg-white backdrop-blur-md rounded-xl p-3 px-5 shadow-[0_8px_24px_rgba(11,22,56,0.08)] border border-[#DCE5F5]"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FileCheck className="w-7 h-7 text-[#145BFF]" strokeWidth={1.5} />
                    <div className="flex flex-col">
                      <span className="text-[#64748B] text-[11px] font-medium leading-tight mb-1">Avoided<br />Enforcement Risk</span>
                      <span className="text-[#0B1638] text-[12px] font-bold leading-tight">10+ Years</span>
                      <span className="text-[#64748B] aqe-caption">of Investment Value</span>
                    </div>
                  </motion.div>

                  {/* Floating Card 2: Lower Breach Costs (Top Left) */}
                  <motion.div
                    className="absolute top-[10%] left-[5%] flex items-center gap-4 bg-white backdrop-blur-md rounded-xl p-3 px-5 shadow-[0_8px_24px_rgba(11,22,56,0.08)] border border-[#DCE5F5]"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <ShieldCheck className="w-7 h-7 text-[#145BFF]" strokeWidth={1.5} />
                    <div className="flex flex-col">
                      <span className="text-[#64748B] text-[11px] font-medium leading-tight mb-1">Lower<br />Breach Costs</span>
                      <span className="text-[#145BFF] text-[14px] font-bold leading-tight">~$1.9M <span className="text-[10px]">↓</span></span>
                    </div>
                  </motion.div>

                  {/* Floating Card 3: Faster Containment (Middle Left) */}
                  <motion.div
                    className="absolute top-[50%] left-[0%] flex items-center gap-4 bg-white backdrop-blur-md rounded-xl p-3 px-5 shadow-[0_8px_24px_rgba(11,22,56,0.08)] border border-[#DCE5F5]"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Clock className="w-7 h-7 text-[#145BFF]" strokeWidth={1.5} />
                    <div className="flex flex-col">
                      <span className="text-[#64748B] text-[11px] font-medium leading-tight mb-1">Faster<br />Containment</span>
                      <span className="text-[#145BFF] text-[14px] font-bold leading-tight">80 Days <span className="text-[10px]">↓</span></span>
                    </div>
                  </motion.div>

                  {/* Floating Card 4: Reduced Advisory Spend (Middle Right) */}
                  <motion.div
                    className="absolute top-[40%] right-[-5%] flex items-center gap-4 bg-white backdrop-blur-md rounded-xl p-3 px-5 shadow-[0_8px_24px_rgba(11,22,56,0.08)] border border-[#DCE5F5]"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  >
                    <Users className="w-7 h-7 text-[#145BFF]" strokeWidth={1.5} />
                    <div className="flex flex-col">
                      <span className="text-[#64748B] text-[11px] font-medium leading-tight mb-1">Reduced<br />Advisory Spend</span>
                      <span className="text-[#145BFF] text-[14px] font-bold leading-tight">~30% <span className="text-[10px]">↓</span></span>
                    </div>
                  </motion.div>

                </div>
              </Reveal>
            </div>

            {/* Bottom Bar: 4 highlights */}
            <Reveal delay={0.6} className="w-full">
              <div className="mt-16 lg:mt-20 border-t border-[#DCE5F5] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 w-full">
                <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#145BFF] shrink-0" />
                  <span className="text-[#0B1638] text-[13px] sm:text-[14px] font-semibold">Lower Total Cost of Risk</span>
                </div>

                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
                  <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-[#145BFF] shrink-0" />
                  <span className="text-[#0B1638] text-[13px] sm:text-[14px] font-semibold">Faster Time to Value</span>
                </div>

                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-[#145BFF] shrink-0" />
                  <span className="text-[#0B1638] text-[13px] sm:text-[14px] font-semibold">Higher ROI</span>
                </div>

                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#145BFF] shrink-0" />
                  <span className="text-[#0B1638] text-[13px] sm:text-[14px] font-semibold">Stronger Business Resilience</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── SECTION 5: TRUSTED INSIGHTS / HIGHLIGHT (LIGHT) ── */}
        <section className="relative bg-white py-16 lg:py-24 overflow-hidden border-t border-gray-100">
          {/* Background subtle glowing meshes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#e0f2fe]/60 rounded-full blur-[100px] opacity-70" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#e0f2fe]/60 rounded-full blur-[100px] opacity-70" />
          </div>

          <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-8 md:px-[88px] lg:px-24 flex flex-col items-center">

            {/* Top Arch Nodes */}
            <Reveal className="w-full relative mb-24 mt-8">
              {/* Connecting Curved Line (SVG) */}
              <div className="absolute top-[56px] left-[6%] w-[88%] h-[72px] -z-10 hidden md:block">
                <svg width="100%" height="100%" viewBox="0 0 100 72" preserveAspectRatio="none" className="overflow-visible">
                  <path d="M0,72 Q50,0 100,72" fill="none" stroke="#145BFF" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
                  {/* Glowing dots on the path */}
                  <circle cx="0" cy="72" r="3" fill="#145BFF" className="animate-pulse" />
                  <circle cx="25" cy="30" r="3" fill="#145BFF" className="animate-pulse" />
                  <circle cx="50" cy="0" r="3" fill="#145BFF" className="animate-pulse" />
                  <circle cx="75" cy="30" r="3" fill="#145BFF" className="animate-pulse" />
                  <circle cx="100" cy="72" r="3" fill="#145BFF" className="animate-pulse" />
                </svg>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4 relative z-10">
                {/* Node 1: Industry Benchmarks */}
                <div className="flex flex-col items-center gap-3 md:mt-24 group">
                  <div className="w-16 h-16 rounded-full bg-[#EAF1FF] border-2 border-[#DCE5F5] flex items-center justify-center shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
                    <FileSearch className="w-7 h-7 text-[#145BFF]" />
                  </div>
                  <span className="text-[#0B1638] text-[11px] font-bold text-center leading-tight tracking-wide">Industry<br />Benchmarks</span>
                </div>

                {/* Node 2: Validated Data */}
                <div className="flex flex-col items-center gap-3 md:mt-10 group">
                  <div className="w-16 h-16 rounded-full bg-[#EAF1FF] border-2 border-[#DCE5F5] flex items-center justify-center shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
                    <BarChart3 className="w-7 h-7 text-[#145BFF]" />
                  </div>
                  <span className="text-[#0B1638] text-[11px] font-bold text-center leading-tight tracking-wide">Validated<br />Data</span>
                </div>

                {/* Node 3: Center Shield */}
                <div className="flex flex-col items-center gap-5 z-20">
                  <div className="relative flex items-center justify-center w-28 h-28">
                    <div className="absolute inset-0 rounded-full bg-[#145BFF]/10 animate-ping opacity-20" />
                    <div className="absolute inset-2 rounded-full bg-[#145BFF]/20 blur-md" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-[#145BFF] to-[#0B49D6] flex items-center justify-center shadow-[0_0_30px_rgba(20,91,255,0.3)] border border-[#145BFF]/50">
                      <ShieldCheck className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[#0B1638] text-[12px] font-bold tracking-[0.2em] uppercase mb-1">Trusted Insights</span>
                    <span className="text-[#64748B] text-[12px] font-bold tracking-[0.2em] uppercase">Real Results</span>
                  </div>
                </div>

                {/* Node 4: Client Engagement */}
                <div className="flex flex-col items-center gap-3 md:mt-10 group">
                  <div className="w-16 h-16 rounded-full bg-[#EAF1FF] border-2 border-[#DCE5F5] flex items-center justify-center shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
                    <Users className="w-7 h-7 text-[#145BFF]" />
                  </div>
                  <span className="text-[#0B1638] text-[11px] font-bold text-center leading-tight tracking-wide">Client<br />Engagement</span>
                </div>

                {/* Node 5: Regulatory Standards */}
                <div className="flex flex-col items-center gap-3 md:mt-24 group">
                  <div className="w-16 h-16 rounded-full bg-[#EAF1FF] border-2 border-[#DCE5F5] flex items-center justify-center shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
                    <FileBadge className="w-7 h-7 text-[#145BFF]" />
                  </div>
                  <span className="text-[#0B1638] text-[11px] font-bold text-center leading-tight tracking-wide">Regulatory<br />Standards</span>
                </div>
              </div>
            </Reveal>

            {/* Middle Golden Box */}
            <Reveal delay={0.3} className="w-full">
              <div className="w-fit mx-auto rounded-xl bg-amber-50 border border-amber-200 px-6 py-5 shadow-sm flex flex-col md:flex-row items-center gap-4 transition-transform hover:scale-[1.01] duration-500">
                <div className="flex-shrink-0">
                  <Target className="w-10 h-10 md:w-10 md:h-10 text-[#B45309]" strokeWidth={2} />
                </div>
                <p className="text-center md:text-left text-[1rem] md:text-[1.15rem] leading-[1.4] font-semibold italic xl:whitespace-nowrap">
                  <span className="text-[#B45309] font-bold">One avoided finding funds myTEVV for years — </span>
                  <span className="text-[#0B1638]">compliance becomes a by-product of the pipeline, not a project.</span>
                </p>
              </div>
            </Reveal>

            {/* Bottom Disclaimer */}
            <Reveal delay={0.5} className="mt-8 md:mt-10">
              <p className="text-center text-[13.5px] font-medium italic text-[#64748B] max-w-4xl leading-relaxed">
                Directional estimates drawn from published industry benchmarks (ITIC, IDC/Microsoft, Capgemini World Quality Report, CISQ, EU AI Act, autonomous-testing benchmarks) — validated with client data per engagement.
              </p>
            </Reveal>

          </div>
        </section>

        {/* ── SECTION: FAQS ── */}
        <FAQAccordion items={MYTEVV_FAQS} />
        <StillHaveQuestionsBanner />

        {/* ── SECTION 6: FINAL CTA (LIGHT) ── */}
        <section className="relative bg-[#F5F8FF] pt-20 pb-28 lg:pt-24 lg:pb-32 overflow-hidden text-center border-t border-[#DCE5F5]">
          <SignalBackground className="opacity-15" />

          {/* Bottom glowing arc line */}
          <div className="absolute -bottom-[650px] left-1/2 -translate-x-1/2 w-[200%] md:w-[130%] h-[800px] rounded-[100%] border-t-[2px] border-[#145BFF]/30 shadow-[0_-20px_60px_rgba(20,91,255,0.12)] pointer-events-none" />

          {/* Left/Right subtle light streams */}
          <div className="absolute top-[30%] -left-[10%] w-[40%] h-[2px] bg-gradient-to-r from-transparent via-[#145BFF]/20 to-transparent rotate-[-20deg] blur-[2px] pointer-events-none" />
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[2px] bg-gradient-to-r from-transparent via-[#145BFF]/20 to-transparent rotate-[20deg] blur-[2px] pointer-events-none" />

          {/* Left Side Curved Line & Nodes */}
          <div className="absolute top-[10%] left-[2%] w-[20%] h-[70%] hidden lg:block pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 200" preserveAspectRatio="none" className="absolute inset-0">
              <path d="M100,0 Q-30,100 100,200" fill="none" stroke="#145BFF" strokeWidth="1" strokeOpacity="0.35" />
              <circle cx="76" cy="20" r="3" fill="#145BFF" className="animate-pulse" />
              <circle cx="15" cy="110" r="3" fill="#145BFF" className="animate-pulse" />
            </svg>
            <div className="absolute top-[7%] left-[60%] flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full border-2 border-[#DCE5F5] bg-white flex items-center justify-center backdrop-blur-md shadow-[0_4px_20px_rgba(20,91,255,0.15)]">
                <ShieldCheck className="w-7 h-7 text-[#145BFF]" />
              </div>
              <span className="text-[#263653] text-[12px] font-semibold text-center leading-tight">Validate<br />with Confidence</span>
            </div>
            <div className="absolute top-[50%] left-[25%] flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full border-2 border-[#DCE5F5] bg-white flex items-center justify-center backdrop-blur-md shadow-[0_4px_20px_rgba(20,91,255,0.15)]">
                <BarChart className="w-7 h-7 text-[#145BFF]" />
              </div>
              <span className="text-[#263653] text-[12px] font-semibold text-center leading-tight">Reduce Risk</span>
            </div>
          </div>

          {/* Right Side Curved Line & Nodes */}
          <div className="absolute top-[10%] right-[2%] w-[20%] h-[70%] hidden lg:block pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 200" preserveAspectRatio="none" className="absolute inset-0">
              <path d="M0,0 Q130,100 0,200" fill="none" stroke="#145BFF" strokeWidth="1" strokeOpacity="0.35" />
              <circle cx="24" cy="20" r="3" fill="#145BFF" className="animate-pulse" />
              <circle cx="85" cy="110" r="3" fill="#145BFF" className="animate-pulse" />
            </svg>
            <div className="absolute top-[5%] right-[65%] flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full border-2 border-[#DCE5F5] bg-white flex items-center justify-center backdrop-blur-md shadow-[0_4px_20px_rgba(20,91,255,0.15)]">
                <Rocket className="w-7 h-7 text-[#145BFF]" />
              </div>
              <span className="text-[#263653] text-[12px] font-semibold text-center leading-tight">Faster<br />Adoption</span>
            </div>
            <div className="absolute top-[50%] right-[25%] flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full border-2 border-[#DCE5F5] bg-white flex items-center justify-center backdrop-blur-md shadow-[0_4px_20px_rgba(20,91,255,0.15)]">
                <Users className="w-7 h-7 text-[#145BFF]" />
              </div>
              <span className="text-[#263653] text-[12px] font-semibold text-center leading-tight">Greater<br />Business Value</span>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full px-6 md:px-12 max-w-4xl pt-8">
            <Reveal>
              {/* Eyebrow */}
              <div className="flex flex-col items-center justify-center mb-10">
                <p className="aqe-label-text text-[#263653] font-semibold tracking-wider">
                  READY TO <span className="text-[#145BFF]">TRANSFORM YOUR AI ASSURANCE</span>?
                </p>
                {/* Glowing underline */}
                <div className="mt-4 h-[2px] w-64 md:w-[350px] bg-gradient-to-r from-transparent via-[#145BFF] to-transparent shadow-[0_0_15px_rgba(20,91,255,0.4)]" />
              </div>

              {/* Headings */}
              <h2 className="aqe-hero-heading text-[#0B1638] mb-4">
                See myTEVV in Action.
              </h2>
              <h3 className="aqe-sub-heading text-[#145BFF]">
                Turn AI Assurance Into Real Confidence.
              </h3>
            </Reveal>

            <Reveal delay={0.1}>
              {/* CTA Button */}
              <div className="mt-12 flex justify-center relative z-20 pointer-events-auto">
                <a
                  href="/contact"
                  className="aqe-btn-text group relative inline-flex items-center gap-2 rounded-2xl bg-[#145BFF] hover:bg-[#0B49D6] px-10 py-4 text-white font-bold shadow-[0_8px_24px_rgba(20,91,255,0.3)] transition-all hover:scale-[1.03] active:scale-95 hover:shadow-[0_12px_28px_rgba(20,91,255,0.4)]"
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
              <p className="aqe-paragraph text-[#263653] font-medium tracking-wide drop-shadow-sm">
                Experience end-to-end AI assurance. Governed validation. Trusted outcomes.
              </p>
            </Reveal>
          </div>
        </section>

      </main>
    </div>
  );
}
