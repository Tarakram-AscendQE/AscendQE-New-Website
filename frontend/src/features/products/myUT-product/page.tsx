import { ScrollToTop } from "@/shared/ScrollToTop";
import { useEffect } from "react";
import { Eyebrow, Reveal, CursorGlow } from "../../../components/ui/shared";
import { GitBranch, GitPullRequest, Settings, BarChart, ShieldCheck, Zap, Clock, Shield, ArrowRight, Play, ArrowRight as ArrowRightIcon, Database, Share2, Infinity as InfinityIcon, Users, FileText, Code, Bug, Rocket, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import myUTLogo from "../../../assets/myUT-assets/myUT-logo.webp";
import myUTHeroImage from "../../../assets/myUT-assets/myut-herosection-image.webp";
import myUTFlowImage from "../../../assets/myUT-assets/myUT-flow.webp";
import myUTEffortImage from "../../../assets/myUT-assets/effort-saving-image.webp";
import myUTFinancialImage from "../../../assets/myUT-assets/financial-impact-image.webp";
import { FAQAccordion } from "@/shared/faq's accordians/page";
import { StillHaveQuestionsBanner } from "@/shared/StillHaveQuestionsBanner";
import { MYUT_FAQS } from "./myUT-faqs";
import { InteractivePlatformFlow } from "@/shared/flows/InteractivePlatformFlow";
import { MYUT_FLOW_CONFIG } from "@/shared/flows/flowConfigs";
function MetricCard({ value, title, source }: { value: string; title: string; source: string }) {
  return (
    <Reveal className="h-full">
      <div className="flex h-full flex-col justify-center rounded-2xl border border-[#DCE5F5] bg-white p-8 text-center shadow-sm transition-all hover:border-[#145BFF] hover:shadow-[0_12px_32px_-12px_rgba(20,91,255,0.15)]">
        <div className="aqe-metric-number text-[#145BFF]">{value}</div>
        <div className="aqe-card-heading mt-4 italic text-[#0B1638]">{title}</div>
        <div className="aqe-text-small mt-auto pt-6 italic text-[#64748B]">{source}</div>
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
    <section className="relative bg-[#f9fafb] py-16 lg:py-24 overflow-hidden w-full">
      <div className="mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

export function MyUTPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0f172a]">
      <CursorGlow />
      <main className="w-full">
        
        {/* ── SECTION 1: HERO (LIGHT) ── */}
        <DarkSection>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr] xl:grid-cols-[0.88fr_1.12fr] lg:items-center relative z-10">
            
            {/* Left Column: Copy */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6 text-left">
                {/* Breadcrumb */}
                <p className="text-xs text-[#64748B]">
                  <a href="/" className="hover:text-[#145BFF] transition-colors">Home</a>
                  <span className="mx-1.5">›</span>
                  <a href="/products" className="hover:text-[#145BFF] transition-colors">Products</a>
                  <span className="mx-1.5">›</span>
                  <span className="text-[#145BFF] font-medium">myUT</span>
                </p>

                {/* Logo & Subtitle */}
                <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                  <img src={myUTLogo} alt="myUT Logo" className="h-14 sm:h-16 md:h-20 lg:h-[84px] w-auto object-contain shrink-0" />
                  <div className="flex flex-col border-l border-[#DCE5F5] pl-4 sm:pl-5 md:pl-6 py-1">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1638] leading-none mb-1.5">myUT</h2>
                    <p className="aqe-label-text text-[#64748B]">Unit Testing at the Source</p>
                  </div>
                </div>

                <h1 className="aqe-hero-heading text-[#0B1638]">
                  myUT – <span className="text-[#145BFF]">AI-Powered</span> Unit Testing & Test Generation
                </h1>

                <h2 className="aqe-sub-heading text-[#0B1638] mt-2">
                  Purpose-built for unit testing at the source.
                </h2>

                <p className="aqe-intro text-[#263653] max-w-xl">
                  Wired into repositories and pull requests — change-aware test design, generation, execution and mutation analysis inside the developer workflow.
                </p>

                <p className="aqe-paragraph text-[#64748B] italic max-w-xl">
                  Specialised facilities behind it: repository intelligence, coverage and mutation analysis, test-quality gates.
                </p>

                <div className="flex flex-wrap items-center gap-5 mt-6">
                  <a href="/contact" className="aqe-btn-text flex items-center justify-center gap-2 bg-[#145BFF] hover:bg-[#0B49D6] text-white px-8 py-3.5 rounded-xl font-bold transition-transform hover:scale-105 shadow-[0_12px_24px_-10px_rgba(20,91,255,0.4)]">
                    Request a Demo <ArrowRightIcon className="w-5 h-5" />
                  </a>
                  <button className="aqe-btn-text flex items-center justify-center gap-2 bg-white border border-[#DCE5F5] text-[#0B1638] px-8 py-3.5 rounded-xl font-medium transition-colors hover:bg-[#EAF1FF] shadow-sm">
                    <Play className="w-5 h-5 text-[#145BFF] fill-[#145BFF]" /> Watch Video
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Visual */}
            <Reveal delay={0.3} className="relative w-full min-w-0 mt-8 sm:mt-12 lg:mt-0">
              <div className="relative w-full max-w-[800px] mx-auto flex flex-col items-center">
                
                {/* Top 5 Floating Cards */}
                <div className="relative z-20 w-full flex flex-wrap sm:flex-nowrap items-stretch justify-center sm:justify-between gap-1.5 sm:gap-1 md:gap-1.5 lg:gap-1.5 xl:gap-2 mb-3 sm:mb-4 lg:mb-5">
                  {[
                    { icon: GitBranch, title: "CODE CHANGE" },
                    { icon: GitPullRequest, title: "PULL REQUEST" },
                    { icon: Settings, title: "GENERATE & RUN\nUNIT TESTS" },
                    { icon: BarChart, title: "ANALYSE &\nVALIDATE" },
                    { icon: ShieldCheck, title: "QUALITY GATE" },
                  ].map((card, i) => (
                    <div key={i} className={`flex items-center justify-center ${i < 3 ? "w-[30%] xs:w-[30%] sm:w-auto sm:flex-1" : "w-[44%] xs:w-[42%] sm:w-auto sm:flex-1"} min-w-0`}>
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        className="w-full h-full flex flex-col items-center justify-center bg-white rounded-lg sm:rounded-xl border border-[#DCE5F5] shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF] px-1.5 py-2 xs:p-2 sm:px-1.5 sm:py-2 md:p-2 lg:px-1.5 lg:py-2.5 xl:p-3 text-center min-w-0"
                      >
                        <card.icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-[#145BFF] mb-1 sm:mb-1.5 shrink-0" />
                        <span className="text-[#0B1638] text-[7.5px] xs:text-[8.5px] sm:text-[8.5px] md:text-[9.5px] lg:text-[9px] xl:text-[10.5px] font-bold uppercase tracking-wider leading-tight whitespace-pre-line">
                          {card.title}
                        </span>
                      </motion.div>
                      {i < 4 && (
                        <ArrowRightIcon className={`${i === 2 ? "hidden sm:block" : "block"} w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 text-[#145BFF] opacity-60 shrink-0 mx-0.5`} />
                      )}
                    </div>
                  ))}
                </div>

                <img src={myUTHeroImage} alt="myUT Platform Dashboard" className="relative z-10 w-full h-auto object-contain lg:scale-[1.04] xl:scale-[1.06] origin-top drop-shadow-[0_20px_50px_rgba(20,91,255,0.15)]" />

              </div>
            </Reveal>
          </div>

          {/* Bottom Bar */}
          <Reveal delay={0.5} className="w-full">
            <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 border-t border-b border-[#DCE5F5] pt-8 pb-8 text-[#263653] w-full">
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Zap className="h-5 w-5 text-[#145BFF] fill-[#145BFF] shrink-0" />
                <span className="aqe-text-semibold text-[#0B1638]">Higher Code Quality</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <Clock className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="aqe-text-semibold text-[#0B1638]">Faster Feedback</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <Shield className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="aqe-text-semibold text-[#0B1638]">Lower Risk</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <BarChart className="h-5 w-5 text-[#145BFF] fill-[#145BFF] shrink-0" />
                <span className="aqe-text-semibold text-[#0B1638]">Greater Productivity</span>
              </div>
            </div>
          </Reveal>
        </DarkSection>

        {/* ── SECTION 1.5: PLATFORM FLOW (LIGHT) ── */}
        <section className="relative bg-[#f9fafb] py-16 lg:py-24 overflow-hidden border-t border-gray-100">
          {/* Subtle background dots for texture, matching the design */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          
          <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
            <InteractivePlatformFlow config={MYUT_FLOW_CONFIG} />
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
                  <span className="text-[#145BFF]">myUT</span> — The Value Model
                </h2>
                <p className="aqe-paragraph mt-3 text-[#263653] font-medium">
                  Delivering faster, smarter and more reliable unit tests.
                </p>
              </Reveal>

              {/* Right: DEVELOP / VALIDATE / DELIVER + chart bars */}
              <Reveal delay={0.2}>
                <div className="hidden lg:flex flex-col items-end gap-1">
                  {["DEVELOP", "VALIDATE", "DELIVER"].map((t, i) => (
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
                  icon: Clock,
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  iconColor: "#145BFF",
                  value: "20–50%",
                  valueColor: "#145BFF",
                  title: "Of developer time goes to writing & updating unit tests",
                  source: "Developer-time industry surveys",
                  border: "border-[#DCE5F5]",
                },
                {
                  icon: FileText,
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  iconColor: "#145BFF",
                  value: "95%",
                  valueColor: "#145BFF",
                  title: "Reduction in unit-test writing effort",
                  source: "Autonomous AI unit-test benchmarks",
                  border: "border-[#DCE5F5]",
                },
                {
                  icon: BarChart,
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  iconColor: "#145BFF",
                  value: "24%",
                  valueColor: "#145BFF",
                  title: "Sprint velocity gain measured after AI unit testing",
                  source: "Enterprise adoption case data",
                  border: "border-[#DCE5F5]",
                },
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
            
            {/* Bottom Bar */}
            <Reveal delay={0.5} className="w-full">
              <div className="mt-16 sm:mt-20 border-t border-slate-200/80 pt-8 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-6 md:gap-3 lg:gap-4 w-full">
                {/* Item 1 */}
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#145BFF] fill-[#145BFF] shrink-0" />
                  <span className="aqe-text-semibold text-[#0B1638] tracking-wide whitespace-nowrap">Higher Code Quality</span>
                </div>

                {/* Divider 1 */}
                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                {/* Item 2 */}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#145BFF] shrink-0" />
                  <span className="aqe-text-semibold text-[#0B1638] tracking-wide whitespace-nowrap">Faster Feedback</span>
                </div>

                {/* Divider 2 */}
                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                {/* Item 3 */}
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#145BFF] shrink-0" />
                  <span className="aqe-text-semibold text-[#0B1638] tracking-wide whitespace-nowrap">Lower Risk</span>
                </div>

                {/* Divider 3 */}
                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                {/* Item 4 */}
                <div className="flex items-center gap-3">
                  <BarChart className="w-5 h-5 text-[#145BFF] fill-[#145BFF] shrink-0" />
                  <span className="aqe-text-semibold text-[#0B1638] tracking-wide whitespace-nowrap">Greater Productivity</span>
                </div>

                {/* Divider 4 */}
                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                {/* Item 5 */}
                <div className="flex flex-col text-left md:text-right whitespace-nowrap">
                  <span className="aqe-label-text text-[#64748B]">QUALITY IN EVERY COMMIT</span>
                  <span className="aqe-label-text text-[#145BFF] mt-0.5">A STRONGER TOMORROW</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        {/* ── SECTION 3: EFFORT SAVINGS (LIGHT) ── */}
        <section className="relative bg-[#f9fafb] py-16 lg:py-24 overflow-hidden border-t border-gray-100">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#145BFF]/5 rounded-full blur-[100px] opacity-70" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3b82f6]/5 rounded-full blur-[100px] opacity-70" />
          </div>

          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] xl:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-8 xl:gap-14 items-center">
              
              {/* Left Column: Image */}
              <Reveal className="w-full flex justify-center lg:justify-start items-center lg:-ml-4 xl:-ml-6">
                <img 
                  src={myUTEffortImage} 
                  alt="Effort Savings AI Platform" 
                  className="w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[680px] xl:max-w-[740px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.05)]" 
                />
              </Reveal>

              {/* Right Column: Content */}
              <Reveal delay={0.2} className="w-full flex flex-col justify-center lg:translate-x-2 xl:translate-x-6">
                {/* Header Row */}
                <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10 w-full">
                  <h3 className="aqe-label-text text-[#145BFF] whitespace-nowrap">
                    EFFORT SAVINGS
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#145BFF]/40 to-transparent" />
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-8 sm:gap-10 w-full">
                  {/* Item 1 */}
                  <div className="flex gap-5 sm:gap-6 items-center w-full">
                    <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] shrink-0 rounded-full bg-[#EAF1FF] flex items-center justify-center border border-[#DCE5F5] shadow-sm">
                      <Code className="w-7 h-7 sm:w-8 sm:h-8 text-[#145BFF]" />
                    </div>
                    <p className="aqe-paragraph text-[#263653] leading-relaxed">
                      <span className="font-bold text-[#0B1638]">Tests generated and maintained at PR speed</span> — change-aware, inside the developer workflow.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-5 sm:gap-6 items-center w-full">
                    <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] shrink-0 rounded-full bg-[#EAF1FF] flex items-center justify-center border border-[#DCE5F5] shadow-sm">
                      <BarChart className="w-7 h-7 sm:w-8 sm:h-8 text-[#145BFF]" />
                    </div>
                    <p className="aqe-paragraph text-[#263653] leading-relaxed">
                      <span className="font-bold text-[#0B1638]">Coverage lifts of ~35% on under-tested code,</span> at up to 1000x authoring speed.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-5 sm:gap-6 items-center w-full">
                    <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] shrink-0 rounded-full bg-[#dcfce3] flex items-center justify-center border border-[#bbf7d0] shadow-sm">
                      <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#15803D]" />
                    </div>
                    <p className="aqe-paragraph text-[#263653] leading-relaxed">
                      <span className="font-bold text-[#0B1638]">Mutation analysis and quality gates enforced without manual effort.</span>
                    </p>
                  </div>

                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── SECTION 4: FINANCIAL IMPACT (LIGHT) ── */}
        <section className="relative bg-gradient-to-b from-[#f8faff] via-white to-[#f1f5f9] py-16 lg:py-24 overflow-hidden border-t border-slate-200/80">
          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            
            <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.15fr] xl:grid-cols-[0.85fr_1.2fr] gap-12 lg:gap-6 xl:gap-10 items-center mb-16">
              
              {/* Left Column: Text Content */}
              <Reveal className="w-full flex flex-col justify-center order-2 lg:order-1">
                
                {/* Header Row */}
                <div className="flex items-center gap-6 mb-6">
                  <h3 className="aqe-label-text text-[#b45309] font-bold">
                    FINANCIAL IMPACT
                  </h3>
                  <div className="flex-1 max-w-[150px] h-[1px] bg-gradient-to-r from-[#d97706]/60 to-transparent" />
                </div>
                
                <h2 className="aqe-section-heading text-[#0f172a] mb-12">
                  Real Savings.<br />
                  <span className="text-[#d97706]">Greater Productivity.</span>
                </h2>

                <div className="flex flex-col gap-8 sm:gap-10 w-full">
                  {/* Item 1 */}
                  <div className="flex gap-5 sm:gap-6 items-center">
                    <div className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] shrink-0 rounded-full border-2 border-amber-300 bg-amber-50/80 flex items-center justify-center shadow-sm">
                      <Database className="w-6 h-6 text-[#d97706]" />
                    </div>
                    <div>
                      <p className="aqe-paragraph text-slate-700 leading-relaxed font-normal">
                        Unit testing costs a 45-developer organisation roughly <span className="text-[#b45309] font-bold">£650K per year</span> in developer time today.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-5 sm:gap-6 items-center">
                    <div className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] shrink-0 rounded-full border-2 border-amber-300 bg-amber-50/80 flex items-center justify-center shadow-sm">
                      <Bug className="w-6 h-6 text-[#d97706]" />
                    </div>
                    <div>
                      <p className="aqe-paragraph text-slate-700 leading-relaxed font-normal">
                        Production bugs cost <span className="text-[#b45309] font-bold">15–30x more</span> to fix than defects caught at the unit level.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-5 sm:gap-6 items-center">
                    <div className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] shrink-0 rounded-full border-2 border-amber-300 bg-amber-50/80 flex items-center justify-center shadow-sm">
                      <Clock className="w-6 h-6 text-[#d97706]" />
                    </div>
                    <div>
                      <p className="aqe-paragraph text-slate-700 leading-relaxed font-normal">
                        Rework and debugging consume <span className="text-[#b45309] font-bold">~23% of developer time</span> — attacked at the source.
                      </p>
                    </div>
                  </div>
                </div>
                
              </Reveal>

              {/* Right Column: Visual Component */}
              <Reveal delay={0.2} className="relative w-full min-w-0 h-full flex flex-col justify-center order-1 lg:order-2 items-center lg:items-end">
                <div className="w-full max-w-[680px] lg:max-w-[780px] xl:max-w-[880px] 2xl:max-w-[960px] hidden sm:flex justify-end mb-1 pr-2">
                  <div className="text-right">
                    <span className="aqe-label-text block text-slate-400 leading-relaxed">DEVELOP</span>
                    <span className="aqe-label-text block text-slate-400 leading-relaxed">VALIDATE</span>
                    <span className="aqe-label-text block text-[#d97706] leading-relaxed">DELIVER</span>
                  </div>
                </div>
                
                <div
                  className="relative mt-4 sm:mt-2 w-full max-w-[680px] lg:max-w-[780px] xl:max-w-[880px] 2xl:max-w-[960px] flex items-center justify-start"
                  style={{ containerType: "inline-size" }}
                >
                  <img src={myUTFinancialImage} alt="Financial Impact Data" className="w-[84%] h-auto object-contain block" />
                  
                  {/* Floating 23% Progress UI */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[17%] right-[0%] w-[19%] flex flex-col items-center z-20 pointer-events-none"
                  >
                    <div className="relative w-[78%] aspect-square mb-[6%] drop-shadow-[0_4px_16px_rgba(217,119,6,0.15)]">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        {/* Track Background */}
                        <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#e2e8f0" strokeWidth="8" />
                        {/* Animated Progress (23%) */}
                        <motion.circle 
                          cx="50" cy="50" r="42" 
                          fill="transparent" 
                          stroke="#d97706" 
                          strokeWidth="8" 
                          strokeLinecap="round" 
                          strokeDasharray={263.9}
                          initial={{ strokeDashoffset: 263.9 }}
                          whileInView={{ strokeDashoffset: 263.9 - (263.9 * 0.23) }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="font-black text-[#B45309] leading-none"
                          style={{ fontSize: "clamp(12px, 3.4cqw, 32px)" }}
                        >
                          23%
                        </span>
                      </div>
                    </div>
                    <p
                      className="text-[#0f172a] text-center font-bold tracking-wider uppercase leading-snug"
                      style={{ fontSize: "clamp(6.5px, 1.3cqw, 12.5px)" }}
                    >
                      Developer Time<br/>On Rework &<br/>Debugging
                    </p>
                  </motion.div>
                </div>

              </Reveal>
            </div>

            {/* Bottom Bar */}
            <Reveal delay={0.3} className="w-full">
              <div className="mt-16 lg:mt-20 border-t border-slate-200/80 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 w-full">
                
                {/* Section 1 */}
                <div className="text-left whitespace-nowrap">
                  <p className="aqe-label-text text-slate-500 mb-1">INVEST IN QUALITY.</p>
                  <p className="aqe-label-text text-[#b45309]">SAVE TIME. SAVE COSTS.</p>
                </div>

                {/* Divider 1 */}
                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                {/* Section 2 */}
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <Zap className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span className="aqe-label-text text-slate-700">LOWER COSTS</span>
                </div>

                {/* Divider 2 */}
                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                {/* Section 3 */}
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <Settings className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span className="aqe-label-text text-slate-700">HIGHER PRODUCTIVITY</span>
                </div>

                {/* Divider 3 */}
                <span className="hidden md:inline-block text-slate-300 font-light text-base select-none">|</span>

                {/* Section 4 */}
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <BarChart className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span className="aqe-label-text text-slate-700">STRONGER DELIVERY</span>
                </div>

              </div>
            </Reveal>

          </div>
        </section>

        {/* ── SECTION 5: REAL BUSINESS IMPACT (LIGHT) ── */}
        <section className="relative bg-white py-16 lg:py-24 overflow-hidden border-t border-gray-100">
          
          {/* Subtle dotted background texture */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px)', backgroundSize: '30px 30px' }} />

          <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[88px] lg:px-24 flex flex-col items-center">
            
            {/* Header */}
            <Reveal>
              <div className="flex items-center justify-center gap-6 mb-10 w-full">
                <div className="w-16 md:w-24 h-px bg-gray-300" />
                <h3 className="aqe-label-text text-[#64748b]">
                  REAL BUSINESS IMPACT
                </h3>
                <div className="w-16 md:w-24 h-px bg-gray-300" />
              </div>
            </Reveal>

            {/* Main Headline */}
            <Reveal delay={0.1}>
              <h2 className="aqe-section-heading text-center tracking-tight max-w-[1000px] drop-shadow-sm">
                <span className="text-[#0f172a]">A 100-developer organisation</span><br />
                <span className="text-[#2563eb]">reclaiming even 15% of dev time</span><br />
                <span className="text-[#64748b] font-medium text-[0.85em]">
                  frees <span className="text-[#10b981] font-bold">~$2M+</span> of engineering capacity annually.
                </span>
              </h2>
            </Reveal>

            {/* Bottom Floating Bar */}
            <Reveal delay={0.3} className="w-full mt-16">
              <div className="mx-auto w-full max-w-[1100px] bg-gradient-to-r from-[#f8fafc] via-white to-[#f0f9ff] border border-[#cbd5e1]/60 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-[0_20px_50px_rgba(37,99,235,0.06)] relative overflow-hidden group">
                 {/* Subtle highlight gradient on hover */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3b82f6]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out pointer-events-none" />
                 
                 <div className="w-16 h-16 shrink-0 rounded-full bg-[#dbeafe] flex items-center justify-center border border-[#bfdbfe]">
                   <Users className="w-8 h-8 text-[#2563eb]" />
                 </div>
                 <p className="aqe-intro text-[#0f172a] text-center md:text-left font-bold flex-1">
                   A 100-developer organisation reclaiming even <span className="text-[#2563eb]">15% of dev time</span> frees <span className="text-[#10b981]">~$2M+</span> of engineering capacity annually
                 </p>
              </div>
            </Reveal>

            {/* Disclaimer */}
            <Reveal delay={0.4}>
              <p className="aqe-text-small text-center mt-8 text-[#3d4a5c] italic max-w-[800px] px-4">
                Directional estimates drawn from published industry benchmarks (ITIC, IDC/Microsoft, Capgemini World Quality Report, CISQ, EU AI Act, autonomous-testing benchmarks) — validated with client data per engagement.
              </p>
            </Reveal>

          </div>
        </section>

        {/* ── SECTION: FAQS ── */}
        <FAQAccordion items={MYUT_FAQS} />
        <StillHaveQuestionsBanner />

        {/* ── SECTION 6: FINAL CTA (LIGHT) ── */}
        <section className="relative bg-[#F5F8FF] py-16 lg:py-24 overflow-hidden border-t border-[#DCE5F5]">
          
          {/* Sweeping background wave effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
            <svg viewBox="0 0 1440 800" className="absolute w-full h-[800px] top-[20%] opacity-40" preserveAspectRatio="none">
              <path d="M-100,500 C400,500 700,200 1550,450" fill="none" stroke="#145BFF" strokeWidth="2" opacity="0.25" />
              <path d="M-100,550 C400,550 700,250 1550,500" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.2" />
              <path d="M-100,600 C400,600 700,300 1550,550" fill="none" stroke="#145BFF" strokeWidth="1" strokeDasharray="4 6" opacity="0.15" />
            </svg>
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] bg-[#145BFF]/5 blur-[150px] rounded-full" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-8 md:px-[88px] lg:px-24 flex flex-col items-center text-center">
            
            {/* Eyebrow */}
            <Reveal>
              <h3 className="aqe-label-text text-[#64748B] font-semibold tracking-wider mb-8">
                READY TO SIMPLIFY <span className="text-[#145BFF]">UNIT TESTING?</span>
              </h3>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.1}>
              <h2 className="aqe-hero-heading text-[#0B1638] tracking-tight mb-12 drop-shadow-sm">
                <span className="block mb-2">See myUT in Action.</span>
                <span className="text-[#145BFF] block">Turn Your Unit Testing Vision into Reality.</span>
              </h2>
            </Reveal>

            {/* Button */}
            <Reveal delay={0.2}>
              <a
                href="/contact"
                className="aqe-btn-text group relative inline-flex items-center gap-3 rounded-full bg-[#145BFF] hover:bg-[#0B49D6] px-10 py-4 font-bold text-white shadow-[0_8px_24px_rgba(20,91,255,0.25)] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_12px_28px_rgba(20,91,255,0.35)]"
              >
                <span className="tracking-wide">Request a Demo</span>
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>

            {/* Bottom Features Grid */}
            <Reveal delay={0.3} className="w-full mt-12 sm:mt-16 pt-8 sm:pt-12">
              <div className="w-full max-w-[270px] xs:max-w-[290px] sm:max-w-2xl lg:max-w-none mx-auto flex flex-col items-start sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-center gap-7 sm:gap-x-12 sm:gap-y-8 lg:gap-6 xl:gap-10">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-4 text-left group hover:-translate-y-1 transition-transform w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full border border-[#DCE5F5] bg-white flex items-center justify-center shrink-0 group-hover:border-[#145BFF] shadow-sm group-hover:shadow-[0_4px_16px_rgba(20,91,255,0.15)] transition-all">
                    <Rocket className="w-5 h-5 text-[#145BFF]" />
                  </div>
                  <p className="aqe-text-semibold text-[#263653] leading-tight">
                    Faster<br/>Testing Cycles
                  </p>
                </div>

                <div className="hidden lg:block w-px h-10 bg-[#DCE5F5] shrink-0" />

                {/* Feature 2 */}
                <div className="flex items-center gap-4 text-left group hover:-translate-y-1 transition-transform w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full border border-[#DCE5F5] bg-white flex items-center justify-center shrink-0 group-hover:border-[#145BFF] shadow-sm group-hover:shadow-[0_4px_16px_rgba(20,91,255,0.15)] transition-all">
                    <Shield className="w-5 h-5 text-[#145BFF]" />
                  </div>
                  <p className="aqe-text-semibold text-[#263653] leading-tight">
                    Higher<br/>Code Quality
                  </p>
                </div>

                <div className="hidden lg:block w-px h-10 bg-[#DCE5F5] shrink-0" />

                {/* Feature 3 */}
                <div className="flex items-center gap-4 text-left group hover:-translate-y-1 transition-transform w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full border border-[#DCE5F5] bg-white flex items-center justify-center shrink-0 group-hover:border-[#145BFF] shadow-sm group-hover:shadow-[0_4px_16px_rgba(20,91,255,0.15)] transition-all">
                    <Clock className="w-5 h-5 text-[#145BFF]" />
                  </div>
                  <p className="aqe-text-semibold text-[#263653] leading-tight">
                    Lower<br/>Maintenance Effort
                  </p>
                </div>

                <div className="hidden lg:block w-px h-10 bg-[#DCE5F5] shrink-0" />

                {/* Feature 4 */}
                <div className="flex items-center gap-4 text-left group hover:-translate-y-1 transition-transform w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full border border-[#DCE5F5] bg-white flex items-center justify-center shrink-0 group-hover:border-[#145BFF] shadow-sm group-hover:shadow-[0_4px_16px_rgba(20,91,255,0.15)] transition-all">
                    <BarChart className="w-5 h-5 text-[#145BFF]" />
                  </div>
                  <p className="aqe-text-semibold text-[#263653] leading-tight">
                    Greater<br/>Developer Productivity
                  </p>
                </div>

              </div>
            </Reveal>

          </div>
        </section>

      </main>
    </div>
  );
}
