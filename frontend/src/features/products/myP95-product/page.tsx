import { ScrollToTop } from "@/shared/ScrollToTop";
import { useEffect } from "react";
import { Eyebrow, Reveal, CursorGlow } from "../../../components/ui/shared";
import { Target, BarChart, Play, Activity, Settings, Zap, Clock, Shield, ArrowRight, Database, FileText, Code, Gauge, CheckCircle2, Coins, Cloud, ShieldCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import myP95Logo from "../../../assets/myP95-assets/myP95-logo.webp";
import myP95HeroImage from "../../../assets/myP95-assets/myp95-hero-section-image.webp";
import myP95FlowImage from "../../../assets/myP95-assets/myP95-flow.webp";
import myP95EffortImage from "../../../assets/myP95-assets/effort-saving-image.webp";
import myP95FinancialImage from "../../../assets/myP95-assets/financial-impact-image.webp";
import { FAQAccordion } from "@/shared/faq's accordians/page";
import { StillHaveQuestionsBanner } from "@/shared/StillHaveQuestionsBanner";
import { MYP95_FAQS } from "./myP95-faqs";
import { InteractivePlatformFlow } from "@/shared/flows/InteractivePlatformFlow";
import { MYP95_FLOW_CONFIG } from "@/shared/flows/flowConfigs";

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
    <section className="relative bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pb-8 pt-8 sm:pt-9 lg:pb-10 lg:pt-10 border-b border-[#DCE5F5]">
      <div className="relative z-10 mx-auto w-full px-12 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

function LightSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative bg-[#f9fafb] py-24 lg:py-32">
      <div className="mx-auto w-full px-12 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

export function MyP95Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0f172a]">
      <CursorGlow />
      <main className="w-full">
        
        {/* ── SECTION 1: HERO (LIGHT) ── */}
        <section className="relative bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pb-8 pt-8 sm:pt-9 lg:pb-10 lg:pt-10 overflow-hidden border-b border-[#DCE5F5]">
          <div className="relative z-10 mx-auto w-full px-12 md:px-[88px] lg:px-24">
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-12 items-center">
              
              {/* Left Column */}
              <Reveal className="flex flex-col justify-center text-center lg:text-left">
                {/* Breadcrumb */}
                <p className="mb-4 sm:mb-6 text-xs text-[#64748B] text-center lg:text-left">
                  <a href="/" className="hover:text-[#145BFF] transition-colors">Home</a>
                  <span className="mx-1.5">›</span>
                  <a href="/products" className="hover:text-[#145BFF] transition-colors">Products</a>
                  <span className="mx-1.5">›</span>
                  <span className="text-[#145BFF] font-medium">myP95</span>
                </p>

                <div className="mb-8 flex flex-col items-center lg:items-start">
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <img src={myP95Logo} alt="myP95 Logo" className="h-14 sm:h-16 md:h-20 lg:h-[84px] w-auto object-contain shrink-0" />
                    <span className="font-bold text-[#0B1638] text-3xl sm:text-4xl lg:text-5xl leading-none">myP95</span>
                  </div>
                  <p className="aqe-label-text text-[#64748B] mt-3 lg:ml-1">
                    Plan · Perform · Optimize
                  </p>
                </div>
                
                <h1 className="aqe-hero-heading text-[#0B1638] mb-8 drop-shadow-sm">
                  myP95 – <span className="text-[#145BFF]">AI-Powered</span> Performance Testing & Engineering
                </h1>
                
                <h2 className="aqe-sub-heading text-[#0B1638] mt-2 tracking-wide">
                  Purpose-built for performance engineering.
                </h2>
                
                <p className="aqe-intro mt-8 text-[#263653] max-w-[600px] mx-auto lg:mx-0 font-medium">
                  From performance objectives to workload models, execution, telemetry and optimization — performance as a governed agent mission.
                </p>
                
                <p className="aqe-paragraph mt-6 text-[#64748B] max-w-[600px] mx-auto lg:mx-0 italic font-medium">
                  Specialised facilities behind it: load generators, APM connectors, p95/p99 analytics, capacity modelling.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mt-10">
                  <a href="/contact" className="aqe-btn-text flex items-center justify-center gap-2 bg-[#145BFF] hover:bg-[#0B49D6] text-white px-8 py-3.5 rounded-xl font-bold transition-transform hover:scale-105 shadow-[0_12px_24px_-10px_rgba(20,91,255,0.4)]">
                    Request a Demo
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </a>
                  <button className="aqe-btn-text flex items-center justify-center gap-2 bg-white border border-[#DCE5F5] text-[#0B1638] px-8 py-3.5 rounded-xl font-medium transition-colors hover:bg-[#EAF1FF] shadow-sm">
                    <Play className="w-5 h-5 text-[#145BFF]" fill="currentColor" />
                    Watch Video
                  </button>
                </div>
              </Reveal>

              {/* Right Column: Interactive Diagram */}
              <Reveal delay={0.3} className="relative mt-20 lg:mt-0 h-[450px] md:h-[500px] lg:h-[650px] w-full flex items-center justify-center">
                
                {/* Background connecting arc (SVG) */}
                <svg className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] pointer-events-none opacity-30" viewBox="0 0 1000 600" fill="none">
                  <path d="M50,400 Q500,-100 950,400" stroke="#145BFF" strokeWidth="2" strokeDasharray="4 6" />
                </svg>

                {/* Central Laptop/Server Image */}
                <img 
                  src={myP95HeroImage} 
                  alt="myP95 Platform Dashboard" 
                  className="relative z-10 w-[85%] lg:w-[90%] h-auto object-contain drop-shadow-[0_20px_50px_rgba(20,91,255,0.15)] mt-12" 
                />

                {/* Floating Cards */}
                {/* Top Center: Performance Objectives */}
                <motion.div 
                  className="absolute z-20 flex items-center gap-3 bg-white border border-[#DCE5F5] rounded-xl p-3 pr-5 shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF]"
                  style={{ top: "0%", left: "50%", x: "-50%" }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#EAF1FF] flex items-center justify-center border border-[#DCE5F5]">
                    <Target className="w-5 h-5 text-[#145BFF]" />
                  </div>
                  <div>
                    <p className="text-[#0B1638] aqe-caption font-bold tracking-wider uppercase leading-tight">PERFORMANCE<br/>OBJECTIVES</p>
                  </div>
                </motion.div>

                {/* Top Left: Workload Models */}
                <motion.div 
                  className="absolute z-20 flex items-center gap-3 bg-white border border-[#DCE5F5] rounded-xl p-3 pr-5 shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF]"
                  style={{ top: "15%", left: "0%" }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#EAF1FF] flex items-center justify-center border border-[#DCE5F5]">
                    <BarChart className="w-5 h-5 text-[#145BFF]" />
                  </div>
                  <div>
                    <p className="text-[#0B1638] aqe-caption font-bold tracking-wider uppercase leading-tight">WORKLOAD<br/>MODELS</p>
                  </div>
                </motion.div>

                {/* Bottom Left: Execution */}
                <motion.div 
                  className="absolute z-20 flex items-center gap-3 bg-white border border-[#DCE5F5] rounded-xl p-3 pr-5 shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF]"
                  style={{ top: "45%", left: "-10%" }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#EAF1FF] flex items-center justify-center border border-[#DCE5F5]">
                    <Play className="w-5 h-5 text-[#145BFF]" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[#0B1638] aqe-caption font-bold tracking-wider uppercase leading-tight">EXECUTION</p>
                  </div>
                </motion.div>

                {/* Top Right: Telemetry */}
                <motion.div 
                  className="absolute z-20 flex items-center gap-3 bg-white border border-[#DCE5F5] rounded-xl p-3 pr-5 shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF]"
                  style={{ top: "15%", right: "0%" }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#EAF1FF] flex items-center justify-center border border-[#DCE5F5]">
                    <Activity className="w-5 h-5 text-[#145BFF]" />
                  </div>
                  <div>
                    <p className="text-[#0B1638] aqe-caption font-bold tracking-wider uppercase leading-tight">TELEMETRY</p>
                  </div>
                </motion.div>

                {/* Bottom Right: Optimization */}
                <motion.div 
                  className="absolute z-20 flex items-center gap-3 bg-white border border-[#DCE5F5] rounded-xl p-3 pr-5 shadow-[0_4px_16px_rgba(20,91,255,0.1)] hover:border-[#145BFF]"
                  style={{ top: "45%", right: "-10%" }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#EAF1FF] flex items-center justify-center border border-[#DCE5F5]">
                    <Settings className="w-5 h-5 text-[#145BFF]" />
                  </div>
                  <div>
                    <p className="text-[#0B1638] aqe-caption font-bold tracking-wider uppercase leading-tight">OPTIMIZATION</p>
                  </div>
                </motion.div>

              </Reveal>

            </div>

            {/* Bottom Feature Bar */}
          <Reveal delay={0.5} className="w-full">
            <div className="mt-16 lg:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 border-t border-b border-[#DCE5F5] pt-8 pb-8 text-[#263653] w-full">
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Zap className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="text-sm font-semibold text-[#0B1638]">Faster Insights</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <Clock className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="text-sm font-semibold text-[#0B1638]">Optimized Performance</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <Shield className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="text-sm font-semibold text-[#0B1638]">Lower Risk</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <BarChart className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="text-sm font-semibold text-[#0B1638]">Greater Efficiency</span>
              </div>
            </div>
          </Reveal>
          </div>
        </section>
        {/* ── SECTION 2: THE myP95 PLATFORM (LIGHT) ── */}
        <section className="relative bg-[#f9fafb] py-16 lg:py-24 overflow-hidden border-t border-gray-100">
          
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0ea5e9]/5 rounded-full blur-[100px] opacity-70" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3b82f6]/5 rounded-full blur-[100px] opacity-70" />
            <div className="absolute top-[20%] left-[5%] opacity-30 mask-image-radial-gradient">
              <div className="w-[300px] h-[300px]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
            <InteractivePlatformFlow config={MYP95_FLOW_CONFIG} />
          </div>
        </section>

        {/* ── SECTION 3: VALUE MODEL (LIGHT) ── */}
        <section className="relative bg-gradient-to-b from-[#f8faff] via-white to-[#f1f5f9] py-14 lg:py-20 overflow-hidden border-t border-slate-200/80">
          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            
            {/* Top row: eyebrow + chart label */}
            <div className="flex items-start justify-between">
              <Reveal>
                <div className="flex items-center gap-3 mb-4 aqe-label-text">
                  <span className="text-[#0284c7] font-bold">VALUE MODEL</span>
                  <span className="text-slate-400 text-[11px]">·</span>
                  <span className="text-slate-500 font-semibold">TO BE PROVEN IN YOUR PILOT</span>
                </div>
                <h2 className="aqe-section-heading text-[#0f172a]">
                  <span className="text-[#0284c7]">myP95</span> — The Value Model
                </h2>
                <p className="aqe-paragraph mt-3 text-slate-600 font-medium">
                  Delivering faster, smarter and more reliable performance tests.
                </p>
              </Reveal>

              {/* Right: MEASURE / OPTIMIZE / DELIVER + chart bars */}
              <Reveal delay={0.2}>
                <div className="hidden lg:flex flex-col items-end gap-1">
                  {["MEASURE", "OPTIMIZE", "DELIVER"].map((t, i) => (
                    <span key={i} className="aqe-caption text-[12px] font-bold tracking-[0.2em]" style={{ color: i === 2 ? "#0284c7" : "#64748b" }}>{t}</span>
                  ))}
                  {/* Mini bar chart */}
                  <div className="mt-3 flex items-end gap-1.5" style={{ height: 60 }}>
                    {[30, 50, 70, 90, 110].map((h, i) => (
                      <div
                        key={i}
                        className="w-4 rounded-t-sm"
                        style={{
                          height: h * 0.5,
                          background: i >= 3 ? "linear-gradient(to top, #0284c7, #38bdf8)" : "#cbd5e1",
                          boxShadow: i >= 3 ? "0 -4px 12px rgba(2,132,199,0.3)" : "none",
                        }}
                      />
                    ))}
                    {/* Arrow */}
                    <div className="ml-1 text-[#0284c7]" style={{ fontSize: "1.4rem", lineHeight: 1, filter: "drop-shadow(0 0 4px rgba(2,132,199,0.4))" }}>↗</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* 3 Metric cards */}
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  icon: Coins,
                  iconBg: "bg-sky-50 border-sky-200",
                  iconColor: "#0284c7",
                  value: "$300K+/hr",
                  valueColor: "#0284c7",
                  title: "Downtime cost for 91% of enterprises",
                  source: "ITIC Hourly Cost of Downtime survey",
                  border: "border-sky-200/80",
                },
                {
                  icon: Database,
                  iconBg: "bg-blue-50 border-blue-200",
                  iconColor: "#2563eb",
                  value: "$1M–5M/hr",
                  valueColor: "#2563eb",
                  title: "Downtime cost for 41% of enterprises",
                  source: "ITIC / Uptime Institute data",
                  border: "border-blue-200/80",
                },
                {
                  icon: BarChart,
                  iconBg: "bg-purple-50 border-purple-200",
                  iconColor: "#7c3aed",
                  value: "30–50%",
                  valueColor: "#7c3aed",
                  title: "Infra spend optimisable via capacity modelling",
                  source: "Cloud right-sizing industry benchmarks",
                  border: "border-purple-200/80",
                },
              ].map((card, idx) => (
                <Reveal key={idx} delay={0.3 + idx * 0.1} className="h-full">
                  <div className={`flex flex-col h-full rounded-[20px] border ${card.border} bg-white/95 p-6 backdrop-blur-sm shadow-sm transition-all hover:border-[rgba(2,132,199,0.5)] hover:shadow-[0_12px_32px_-12px_rgba(2,132,199,0.18)]`}>
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${card.iconBg}`}>
                        <card.icon className="h-5 w-5" style={{ color: card.iconColor }} />
                      </div>
                      <div className="aqe-metric-number" style={{ color: card.valueColor }}>
                        {card.value}
                      </div>
                    </div>

                    <hr className="my-5 border-t border-slate-100" />

                    <h4 className="aqe-card-heading text-[#0f172a] mb-2">{card.title}</h4>
                    <p className="aqe-text-small font-medium italic text-slate-500">{card.source}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: EFFORT SAVINGS (LIGHT) ── */}
        <section className="relative bg-[#f9fafb] py-16 lg:py-24 overflow-hidden border-t border-gray-100">
          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            
            <div className="grid grid-cols-1 gap-12 lg:gap-10 xl:gap-14 lg:grid-cols-2 items-center">
              
              {/* Left Column: Interactive Diagram / Image */}
              <Reveal className="relative w-full h-full flex flex-col justify-center items-center lg:items-start order-2 lg:order-1 lg:-ml-2 xl:-ml-4">
                <div className="relative mt-12 lg:mt-8 w-full max-w-[580px] sm:max-w-[640px] lg:max-w-[680px] xl:max-w-[740px]">
                  
                  {/* Base Image */}
                  <img 
                    src={myP95EffortImage} 
                    alt="myP95 Effort Savings Architecture" 
                    className="relative z-10 w-full h-auto object-contain drop-shadow-xl" 
                  />

                  {/* 4 Floating Top Cards with Integrated Centered Connector Arrows */}
                  <div className="absolute -top-8 sm:-top-10 md:-top-12 lg:-top-14 inset-x-0 flex justify-center z-20 pointer-events-none">
                    <motion.div 
                      className="pointer-events-auto w-[94%] sm:w-[92%] max-w-[520px] sm:max-w-[550px] md:max-w-[570px] lg:max-w-[590px]"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="flex items-center justify-between w-full">
                        {/* Step 1: Objective */}
                        <motion.div 
                          className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl w-[70px] h-[70px] sm:w-20 sm:h-20 md:w-24 md:h-24 shadow-[0_12px_28px_-6px_rgba(14,165,233,0.18),0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(14,165,233,0.3)] hover:border-[#0ea5e9]/50 transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -3 }}
                        >
                          <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#0ea5e9] mb-1 drop-shadow-[0_2px_4px_rgba(14,165,233,0.25)]" />
                          <span className="text-[8.5px] sm:text-[9.5px] md:text-[11px] font-bold text-[#0f172a] tracking-tight">Objective</span>
                        </motion.div>

                        {/* Connector Arrow 1 */}
                        <div className="flex-1 flex items-center justify-center px-1 sm:px-2 min-w-[16px] max-w-[56px]">
                          <svg className="w-full h-4 overflow-visible drop-shadow-[0_2px_4px_rgba(14,165,233,0.35)]" viewBox="0 0 44 16" fill="none">
                            <defs>
                              <linearGradient id="p95-arrow-1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="1" />
                              </linearGradient>
                            </defs>
                            <line x1="2" y1="8" x2="34" y2="8" stroke="url(#p95-arrow-1)" strokeWidth="2.5" strokeLinecap="round" />
                            <polygon points="32 3.5, 42 8, 32 12.5" fill="#0ea5e9" />
                          </svg>
                        </div>

                        {/* Step 2: Workload */}
                        <motion.div 
                          className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl w-[70px] h-[70px] sm:w-20 sm:h-20 md:w-24 md:h-24 shadow-[0_12px_28px_-6px_rgba(14,165,233,0.18),0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(14,165,233,0.3)] hover:border-[#0ea5e9]/50 transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -3 }}
                        >
                          <Database className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#0ea5e9] mb-1 drop-shadow-[0_2px_4px_rgba(14,165,233,0.25)]" />
                          <span className="text-[8.5px] sm:text-[9.5px] md:text-[11px] font-bold text-[#0f172a] tracking-tight">Workload</span>
                        </motion.div>

                        {/* Connector Arrow 2 */}
                        <div className="flex-1 flex items-center justify-center px-1 sm:px-2 min-w-[16px] max-w-[56px]">
                          <svg className="w-full h-4 overflow-visible drop-shadow-[0_2px_4px_rgba(14,165,233,0.35)]" viewBox="0 0 44 16" fill="none">
                            <defs>
                              <linearGradient id="p95-arrow-2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="1" />
                              </linearGradient>
                            </defs>
                            <line x1="2" y1="8" x2="34" y2="8" stroke="url(#p95-arrow-2)" strokeWidth="2.5" strokeLinecap="round" />
                            <polygon points="32 3.5, 42 8, 32 12.5" fill="#0ea5e9" />
                          </svg>
                        </div>

                        {/* Step 3: Scripts */}
                        <motion.div 
                          className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl w-[70px] h-[70px] sm:w-20 sm:h-20 md:w-24 md:h-24 shadow-[0_12px_28px_-6px_rgba(14,165,233,0.18),0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(14,165,233,0.3)] hover:border-[#0ea5e9]/50 transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -3 }}
                        >
                          <Code className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#0ea5e9] mb-1 drop-shadow-[0_2px_4px_rgba(14,165,233,0.25)]" />
                          <span className="text-[8.5px] sm:text-[9.5px] md:text-[11px] font-bold text-[#0f172a] tracking-tight">Scripts</span>
                        </motion.div>

                        {/* Connector Arrow 3 */}
                        <div className="flex-1 flex items-center justify-center px-1 sm:px-2 min-w-[16px] max-w-[56px]">
                          <svg className="w-full h-4 overflow-visible drop-shadow-[0_2px_4px_rgba(14,165,233,0.35)]" viewBox="0 0 44 16" fill="none">
                            <defs>
                              <linearGradient id="p95-arrow-3" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="1" />
                              </linearGradient>
                            </defs>
                            <line x1="2" y1="8" x2="34" y2="8" stroke="url(#p95-arrow-3)" strokeWidth="2.5" strokeLinecap="round" />
                            <polygon points="32 3.5, 42 8, 32 12.5" fill="#0ea5e9" />
                          </svg>
                        </div>

                        {/* Step 4: Execute */}
                        <motion.div 
                          className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl w-[70px] h-[70px] sm:w-20 sm:h-20 md:w-24 md:h-24 shadow-[0_12px_28px_-6px_rgba(14,165,233,0.18),0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(14,165,233,0.3)] hover:border-[#0ea5e9]/50 transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -3 }}
                        >
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#0ea5e9] mb-1 drop-shadow-[0_2px_4px_rgba(14,165,233,0.25)]" fill="currentColor" />
                          <span className="text-[8.5px] sm:text-[9.5px] md:text-[11px] font-bold text-[#0f172a] tracking-tight">Execute</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                  
                </div>
              </Reveal>

              {/* Right Column: Copy & List */}
              <Reveal delay={0.2} className="relative w-full h-full flex flex-col justify-center order-1 lg:order-2 lg:pl-6 xl:pl-10 lg:translate-x-8 xl:translate-x-12 2xl:translate-x-16">
                
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-[#0ea5e9] font-bold tracking-[0.2em] uppercase text-xs">
                    EFFORT SAVINGS
                  </h3>
                  <div className="h-px bg-[#0ea5e9]/30 flex-1 max-w-[100px]" />
                </div>

                <h2 className="aqe-section-heading mb-6">
                  <span className="text-[#0f172a] block">More Performance.</span>
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(90deg, #0ea5e9 0%, #3b82f6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "#0ea5e9",
                    }}
                  >
                    Less Manual Effort.
                  </span>
                </h2>

                <p className="aqe-paragraph text-[#64748b] mb-12 font-medium">
                  Let intelligent agents handle the heavy lifting —<br className="hidden md:block" />
                  so your team can focus on what matters.
                </p>

                <div className="flex flex-col gap-8 w-full">
                  {/* Feature 1 */}
                  <div className="flex gap-6 group w-full">
                    <div className="w-14 h-14 rounded-full bg-[#10b981]/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#10b981]/20">
                      <Settings className="w-6 h-6 text-[#10b981]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#0f172a] font-bold text-[17px] mb-1">
                        Objective &rarr; workload &rarr; scripts &rarr; execute
                      </h4>
                      <p className="text-[#64748b] font-medium text-[15px] leading-relaxed">
                        Performance assets generated by agents,<br className="hidden md:block" />
                        not hand-built.
                      </p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gray-200" />

                  {/* Feature 2 */}
                  <div className="flex gap-6 group w-full">
                    <div className="w-14 h-14 rounded-full bg-[#3b82f6]/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#3b82f6]/20">
                      <BarChart className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#0f172a] font-bold text-[17px] mb-1">
                        Bottleneck analysis automated
                      </h4>
                      <p className="text-[#64748b] font-medium text-[15px] leading-relaxed">
                        across telemetry and infrastructure metrics.
                      </p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gray-200" />

                  {/* Feature 3 */}
                  <div className="flex gap-6 group w-full">
                    <div className="w-14 h-14 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#8b5cf6]/20">
                      <Gauge className="w-6 h-6 text-[#8b5cf6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#0f172a] font-bold text-[17px] mb-1">
                        Baselines and p95/p99 analytics run
                      </h4>
                      <p className="text-[#64748b] font-medium text-[15px] leading-relaxed">
                        continuously — no dedicated tuning sprints.
                      </p>
                    </div>
                  </div>
                </div>

              </Reveal>

            </div>
          </div>
        </section>

        {/* ── SECTION 5: FINANCIAL IMPACT (LIGHT) ── */}
        <section className="relative bg-gradient-to-b from-[#f8faff] via-white to-[#f1f5f9] py-16 lg:py-24 overflow-hidden border-t border-slate-200/80">
          <div className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] xl:grid-cols-[1.15fr_1fr] gap-12 lg:gap-8 xl:gap-12 items-center mb-16">
              
              {/* Left Column: Copy & List */}
              <Reveal className="w-full flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-[#b45309] font-bold tracking-[0.2em] uppercase text-xs">
                    FINANCIAL IMPACT
                  </h3>
                  <div className="h-px bg-[#d97706]/40 flex-1 max-w-[100px]" />
                </div>

                <h2 className="aqe-section-heading mb-10">
                  <span className="text-[#0f172a] block">Lower Risk.</span>
                  <span className="text-[#0284c7] block">Higher Returns.</span>
                </h2>

                <div className="flex flex-col gap-8 w-full">
                  {/* Item 1 */}
                  <div className="flex gap-4 items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-amber-100/90 rounded-full p-1 border-2 border-amber-300 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-amber-700" fill="#fef3c7" stroke="#b45309" strokeWidth={2.5} />
                      </div>
                    </div>
                    <p className="aqe-paragraph text-slate-700 font-normal leading-relaxed">
                      Preventing one peak-hour incident is worth{" "}
                      <span className="text-[#b45309] font-bold">$300K–$5M</span> in avoided losses.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-4 items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-amber-100/90 rounded-full p-1 border-2 border-amber-300 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-amber-700" fill="#fef3c7" stroke="#b45309" strokeWidth={2.5} />
                      </div>
                    </div>
                    <p className="aqe-paragraph text-slate-700 font-normal leading-relaxed">
                      Capacity modelling right-sizes cloud spend release after release.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-4 items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-amber-100/90 rounded-full p-1 border-2 border-amber-300 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-amber-700" fill="#fef3c7" stroke="#b45309" strokeWidth={2.5} />
                      </div>
                    </div>
                    <p className="aqe-paragraph text-slate-700 font-normal leading-relaxed">
                      Performance defects fixed pre-production cost a fraction of production firefighting.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Base Image */}
              <Reveal delay={0.2} className="relative w-full h-full flex flex-col justify-center items-center lg:items-end">
                <div className="relative w-full flex justify-center lg:justify-end lg:-mr-2 xl:-mr-4">
                  <img 
                    src={myP95FinancialImage} 
                    alt="myP95 Financial Impact" 
                    className="relative z-10 w-full max-w-[650px] lg:max-w-[720px] xl:max-w-[780px] h-auto object-contain" 
                  />
                </div>
              </Reveal>

            </div>

            {/* Bottom Bar Segment */}
            <Reveal delay={0.3} className="w-full">
              <div className="mt-12 border-t border-slate-200/80 pt-8 flex flex-col md:flex-row gap-8 md:gap-4 justify-between items-start md:items-center w-full">
                
                <div className="flex items-center gap-4">
                  <Coins className="w-8 h-8 text-[#d97706] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[#0f172a] font-bold text-[15px]">$300K – $5M</span>
                    <span className="text-slate-500 font-medium text-[13px]">in avoided losses</span>
                  </div>
                </div>
                
                <div className="hidden md:block w-px h-10 bg-slate-200" />

                <div className="flex items-center gap-4">
                  <Cloud className="w-8 h-8 text-[#0284c7] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[#0f172a] font-bold text-[15px]">Right-sized</span>
                    <span className="text-slate-500 font-medium text-[13px]">cloud spend</span>
                  </div>
                </div>

                <div className="hidden md:block w-px h-10 bg-slate-200" />

                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-8 h-8 text-[#145BFF] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[#0B1638] font-bold text-[15px]">Lower</span>
                    <span className="text-slate-500 font-medium text-[13px]">production firefighting costs</span>
                  </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-slate-200" />

                <div className="flex flex-col items-start md:items-end text-left md:text-right">
                  <span className="text-slate-400 font-bold tracking-[0.1em] text-[11px] uppercase">EFFICIENCY TODAY</span>
                  <span className="text-[#0284c7] font-bold tracking-[0.1em] text-[12px] uppercase">A STRONGER TOMORROW</span>
                </div>

              </div>
            </Reveal>

          </div>
        </section>

        {/* ── SECTION 6: BUSINESS IMPACT / MARGIN BANNER (LIGHT) ── */}
        <section className="relative bg-gradient-to-b from-white to-[#f0f7ff] py-20 lg:py-32 overflow-hidden border-t border-gray-100 flex justify-center">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

          <div className="relative z-10 w-full max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-8 xl:px-24">
            
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center relative w-full">
              {/* Center Main Box */}
              <Reveal className="w-full max-w-[960px] flex flex-col items-center z-20 relative mx-auto">
                <div className="w-full bg-white/80 backdrop-blur-xl border-[3px] border-[#fbbf24]/60 rounded-3xl lg:rounded-[2rem] py-6 sm:py-8 lg:py-8 px-6 sm:px-10 md:px-12 shadow-[0_0_50px_rgba(251,191,36,0.18)] relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/50 via-white/30 to-yellow-50/30 rounded-3xl lg:rounded-[2rem] pointer-events-none" />
                  
                  <h2 className="relative z-10 text-center font-bold tracking-tight mx-auto">
                    <span className="text-[#d97706] block mb-2 sm:mb-2.5 text-[1.1rem] sm:text-[1.25rem] md:text-[1.35rem] lg:text-[1.45rem] font-bold leading-tight tracking-tight">
                      Prevent a single peak-hour incident and myP95 has paid for itself —
                    </span>
                    <span className="text-[#0f172a] block text-[1.5rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-[2.4rem] font-black leading-tight">
                      everything after is margin.
                    </span>
                  </h2>
                </div>
              </Reveal>
            </div>
            
            <Reveal delay={0.2} className="w-full flex justify-center mt-8">
              <p className="text-center text-[13.5px] font-medium italic text-[#3c4b61] max-w-3xl px-4 leading-relaxed">
                Directional estimates drawn from published industry benchmarks (ITIC, IDC/Microsoft, Capgemini World Quality Report, CISQ, EU AI Act, autonomous-testing benchmarks) — validated with client data per engagement.
              </p>
            </Reveal>
            
          </div>
        </section>

        {/* ── SECTION: FAQS ── */}
        <FAQAccordion items={MYP95_FAQS} />
        <StillHaveQuestionsBanner />

        {/* ── SECTION 7: FINAL CTA (LIGHT) ── */}
        <section className="relative bg-[#F5F8FF] py-24 lg:py-32 overflow-hidden flex flex-col items-center justify-center text-center border-t border-[#DCE5F5]">
          
          {/* Background Lighting Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#145BFF]/5 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Sweeping Light Lines */}
          <svg className="absolute bottom-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 400">
            {/* Center swoop */}
            <path d="M-100,400 Q720,200 1540,400" fill="none" stroke="url(#glow-line-p95)" strokeWidth="3" opacity="0.3" />
            <path d="M-100,400 Q720,150 1540,400" fill="none" stroke="url(#glow-line-p95)" strokeWidth="1.5" opacity="0.2" filter="blur(4px)" />
            {/* Left flare */}
            <path d="M0,0 Q200,200 -100,400" fill="none" stroke="url(#glow-line-p95)" strokeWidth="2" opacity="0.25" filter="blur(2px)" />
            {/* Right flare */}
            <path d="M1440,0 Q1240,200 1540,400" fill="none" stroke="url(#glow-line-p95)" strokeWidth="2" opacity="0.25" filter="blur(2px)" />
            <defs>
              <linearGradient id="glow-line-p95" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#145BFF" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Glow at the bottom center */}
          <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#145BFF]/10 blur-[100px] rounded-[100%] pointer-events-none" />

          <div className="relative z-10 w-full max-w-[1200px] px-12 md:px-[88px] lg:px-24 flex flex-col items-center">
            
            <Reveal delay={0.1} className="flex flex-col items-center">
              {/* Eyebrow */}
              <h3 className="aqe-label-text text-[#263653] font-semibold tracking-wider">
                READY TO <span className="text-[#145BFF]">TRANSFORM?</span>
              </h3>
              
              {/* Glowing Divider */}
              <div className="mt-4 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#145BFF] to-transparent shadow-[0_0_10px_rgba(20,91,255,0.3)]" />
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col items-center mt-10">
              <h2 className="aqe-hero-heading text-[#0B1638] mb-2">
                See myP95 in Action.
              </h2>
              <h3 className="aqe-sub-heading text-[#145BFF]">
                Turn Your Performance Vision into Reality.
              </h3>
            </Reveal>

            <Reveal delay={0.3} className="mt-12">
              <a
                href="/contact"
                className="aqe-btn-text group relative inline-flex items-center gap-3 rounded-full bg-[#145BFF] hover:bg-[#0B49D6] px-10 py-4 text-white font-bold shadow-[0_8px_24px_rgba(20,91,255,0.35)] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_12px_28px_rgba(20,91,255,0.45)]"
              >
                <span className="relative z-10">Request a Demo</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </a>
            </Reveal>

          </div>
          
          <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 w-full px-4 text-center z-20">
            <Reveal delay={0.4}>
              <p className="aqe-paragraph text-[#263653] font-medium tracking-wide drop-shadow-sm">
                Plan <span className="mx-2">&middot;</span> Perform <span className="mx-2">&middot;</span> Optimize <span className="mx-2">&mdash;</span> With Confidence.
              </p>
            </Reveal>
          </div>
        </section>

      </main>
    </div>
  );
}
