import { ScrollToTop } from "@/shared/ScrollToTop";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "motion/react";
import { Reveal, CursorGlow } from "../../../components/ui/shared";
import { FileText, Search, Database, Play, Settings, BarChart3, BarChart2, Zap, Clock, Shield, Activity, PlayCircle, ArrowRight, TrendingUp } from "lucide-react";
import mySDETLogo from "../../../assets/mySDET-assets/mySDET-logo.webp";
import mySDETFlow from "../../../assets/mySDET-assets/mySDET-flow.webp";
import robotGif from "../../../assets/mySDET-assets/Robot Waving.gif";
import { AICore } from "../../../components/shared/AICore";
import { FAQAccordion } from "@/shared/faq's accordians/page";
import { StillHaveQuestionsBanner } from "@/shared/StillHaveQuestionsBanner";
import { MYSDET_FAQS } from "./mySDET-faqs";
import { InteractivePlatformFlow } from "@/shared/flows/InteractivePlatformFlow";
import { MYSDET_FLOW_CONFIG } from "@/shared/flows/flowConfigs";

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
    <section className="relative bg-[#f9fafb] py-16 lg:py-20 overflow-hidden w-full">
      <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
        {children}
      </div>
    </section>
  );
}

const CARDS = [
  { label: "TEST\nINTENT", icon: FileText },
  { label: "DISCOVERY", icon: Search },
  { label: "TEST\nDATA", icon: Database },
  { label: "EXECUTION", icon: Play },
  { label: "SELF-HEAL", icon: Settings },
  { label: "BUG\nREPORTING", icon: BarChart3 },
];

const STEPS = 120;
const TIMES = Array.from({ length: STEPS + 1 }, (_, k) => k / STEPS);

function getCirclePoint(t: number, cx: number, cy: number, r: number) {
  const angle = (((t % 1) + 1) % 1) * Math.PI * 2 - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function OrbitAnimation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(480);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect.width);
    });
    ro.observe(el);
    setSize(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  // radius = 44% of container so cards (which extend beyond) still fit
  const CR = size * 0.44;

  const cardDim = size < 360 ? 64 : size < 440 ? 76 : 88;
  const iconDim = size < 360 ? 18 : size < 440 ? 22 : 24;
  const textDim = size < 360 ? 8.5 : size < 440 ? 9.5 : 10.5;

  return (
    <div ref={wrapRef} className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
      {/* Brain */}
      <div className="absolute inset-0 flex items-center justify-center opacity-90">
        <AICore hideBadges />
      </div>

      {/* Center mySDET Text Badge */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center select-none">
        <div className="flex flex-col items-center justify-center rounded-full border border-[#DCE5F5] bg-white/95 px-5 py-3 sm:px-6 sm:py-3.5 backdrop-blur-md shadow-[0_10px_30px_rgba(20,91,255,0.12)]">
          <span className="text-xl sm:text-2xl lg:text-[28px] font-extrabold tracking-tight text-[#0B1638]">
            my<span className="text-[#145BFF]">SDET</span>
          </span>
        </div>
      </div>

      {/* Orbit layer */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Dashed circle track */}
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={cx} cy={cy} r={CR}
            fill="none"
            stroke="rgba(20,91,255,0.25)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />
        </svg>

        {size > 0 && CARDS.map((card, i) => {
          const startT = i / CARDS.length;
          const xs = TIMES.map(k => getCirclePoint(startT + k, cx, cy, CR).x);
          const ys = TIMES.map(k => getCirclePoint(startT + k, cx, cy, CR).y);

          return (
            <motion.div
              key={`${i}-${size}`}
              className="absolute"
              style={{ left: 0, top: 0, x: xs[0], y: ys[0] }}
              animate={{ x: xs, y: ys }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear", times: TIMES }}
            >
              <div
                className="pointer-events-auto flex flex-col items-center justify-center aspect-square rounded-2xl border border-[#DCE5F5] bg-white shadow-[0_4px_16px_rgba(20,91,255,0.1)] cursor-default transition-all duration-300 hover:border-[#145BFF] hover:shadow-[0_8px_24px_rgba(20,91,255,0.2)] p-2 select-none"
                style={{
                  transform: 'translate(-50%, -50%)',
                  width: cardDim,
                  height: cardDim,
                }}
              >
                <card.icon
                  style={{ width: iconDim, height: iconDim }}
                  className="text-[#145BFF] shrink-0 mb-1 sm:mb-1.5"
                />
                <span
                  style={{ fontSize: textDim }}
                  className="font-bold uppercase tracking-wider text-[#0B1638] leading-tight text-center whitespace-pre-line"
                >
                  {card.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const BARS = [
  {
    label: "Lower\nCost",
    pct: 42,
    gradient: "linear-gradient(to top, #145BFF 0%, #38bdf8 100%)",
    glow: "0 -4px 28px 0px rgba(20, 91, 255, 0.4), 0 0 16px rgba(20, 91, 255, 0.25)",
  },
  {
    label: "Higher\nEfficiency",
    pct: 60,
    gradient: "linear-gradient(to top, #0B49D6 0%, #145BFF 100%)",
    glow: "0 -4px 28px 0px rgba(20, 91, 255, 0.4), 0 0 16px rgba(20, 91, 255, 0.25)",
  },
  {
    label: "Fewer\nDefects",
    pct: 78,
    gradient: "linear-gradient(to top, #145BFF 0%, #60a5fa 100%)",
    glow: "0 -4px 28px 0px rgba(20, 91, 255, 0.45), 0 0 16px rgba(20, 91, 255, 0.3)",
  },
  {
    label: "Greater\nROI",
    pct: 100,
    gradient: "linear-gradient(to top, #0B49D6 0%, #38bdf8 100%)",
    glow: "0 -4px 28px 0px rgba(20, 91, 255, 0.5), 0 0 16px rgba(20, 91, 255, 0.35)",
  },
];

function VerticalBars() {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const labelControls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let triggered = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          controls.set({ scaleY: 0 });
          labelControls.set({ opacity: 0 });
          controls.start(i => ({
            scaleY: 1,
            transition: { duration: 0.9, delay: i * 0.15, ease: "easeOut" },
          }));
          labelControls.start(i => ({
            opacity: 1,
            transition: { duration: 0.4, delay: 0.9 + i * 0.15 + 0.5 },
          }));
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [controls, labelControls]);

  return (
    <div ref={ref} className="flex items-end justify-around" style={{ height: 220 }}>
      {BARS.map((bar, i) => (
        <div key={i} className="flex flex-1 flex-col items-center justify-end gap-2" style={{ height: '100%' }}>
          <motion.span
            custom={i}
            animate={labelControls}
            initial={{ opacity: 0 }}
            className="text-center text-[11px] sm:text-xs font-bold text-[#1e293b] whitespace-pre-line leading-tight mb-1"
          >
            {bar.label}
          </motion.span>
          <motion.div
            custom={i}
            animate={controls}
            initial={{ scaleY: 0 }}
            className="w-14 sm:w-16 md:w-[68px] rounded-t-2xl"
            style={{
              background: bar.gradient,
              boxShadow: bar.glow,
              transformOrigin: 'bottom',
              height: `${bar.pct}%`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function MySDETPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden text-[#0f172a]">
      <CursorGlow />
      <main className="w-full overflow-x-hidden">

        {/* ── SECTION 1: HERO (DARK) ── */}
        <DarkSection>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Column: Copy */}
            <Reveal delay={0.1}>
              {/* Breadcrumb */}
              <p className="mb-4 sm:mb-6 text-xs text-[#64748B] text-center lg:text-left">
                <a href="/" className="hover:text-[#145BFF] transition-colors">Home</a>
                <span className="mx-1.5">›</span>
                <a href="/products" className="hover:text-[#145BFF] transition-colors">Products</a>
                <span className="mx-1.5">›</span>
                <span className="text-[#145BFF] font-medium">mySDET</span>
              </p>

              <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:text-left">
                <div className="mb-4 flex items-center gap-4">
                  <img src={mySDETLogo} alt="mySDET Logo" className="h-14 sm:h-16 md:h-20 lg:h-[84px] w-auto object-contain shrink-0" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1638] leading-none">mySDET</h2>
                </div>
              </div>
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-4 py-1.5">
                  <span className="aqe-label-text text-[#145BFF]">AI-POWERED AUTOMATION TESTING</span>
                </div>
              <h1 className="aqe-hero-heading text-[#0B1638] mt-6">
                mySDET – <span className="text-[#145BFF]">AI-Powered</span> Test Automation for Quality Engineers
              </h1>

              <h2 className="aqe-sub-heading mt-8 text-center text-[#0B1638] lg:text-left">
                Purpose-built for automation engineering.
              </h2>

              <p className="aqe-intro mt-4 text-center text-[#263653] lg:text-left">
                UI, dashboards, configuration and workflow are designed specifically around test automation — from platform facilities down to the fixed agent flow.
              </p>

              <p className="aqe-paragraph mt-6 text-center italic tracking-wide text-[#64748B] lg:text-left">
                Fixed internal agents own each lifecycle stage — sequence and contracts designed by AscendQE.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <a href="/contact" className="aqe-btn-text flex items-center gap-2 rounded-xl bg-[#145BFF] hover:bg-[#0B49D6] px-6 py-3.5 text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_12px_24px_-10px_rgba(20,91,255,0.4)]">
                  Request a Demo <ArrowRight className="h-4 w-4" />
                </a>
                <button className="aqe-btn-text flex items-center gap-2 rounded-xl border border-[#DCE5F5] bg-white hover:bg-[#EAF1FF] px-6 py-3.5 text-[#0B1638] transition-all active:scale-95 shadow-sm">
                  <PlayCircle className="h-5 w-5 text-[#145BFF]" /> Watch Video
                </button>
              </div>
            </Reveal>

            {/* Right Column: Orbit Visual */}
            <Reveal delay={0.3}>
              <div className="w-full max-w-[600px] mx-auto">
                <OrbitAnimation />
              </div>
            </Reveal>
          </div>

          {/* Bottom Metrics Bar */}
          <Reveal delay={0.5} className="w-full">
            <div className="mt-16 lg:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 border-t border-b border-[#DCE5F5] pt-8 pb-8 text-[#263653] w-full">
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Zap className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="text-sm font-semibold text-[#0B1638]">Higher Quality</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <Clock className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="text-sm font-semibold text-[#0B1638]">Faster Releases</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <Shield className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="text-sm font-semibold text-[#0B1638]">Lower Risk</span>
              </div>

              <span className="hidden md:inline-block text-[#DCE5F5] font-light text-base select-none">|</span>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <Activity className="h-5 w-5 text-[#145BFF] shrink-0" />
                <span className="text-sm font-semibold text-[#0B1638]">Greater Efficiency</span>
              </div>
            </div>
          </Reveal>
        </DarkSection>

        {/* ── SECTION 2: PLATFORM FLOW (LIGHT) ── */}
        <LightSection>
          <InteractivePlatformFlow config={MYSDET_FLOW_CONFIG} />
        </LightSection>

        {/* ── SECTION 3: VALUE MODEL (LIGHT) ── */}
        <section className="relative bg-[#F5F8FF] py-24 lg:py-32 overflow-hidden border-t border-[#DCE5F5] text-[#0B1638]">
          <div className="relative z-10 mx-auto w-full px-12 md:px-[88px] lg:px-24">

            {/* Header row */}
            <Reveal>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                {/* Left */}
                <div>
                  <div className="flex items-center gap-2 aqe-label-text">
                    <span className="font-bold text-[#145BFF]">VALUE MODEL</span>
                    <span className="text-slate-400">&middot;</span>
                    <span className="font-bold text-[#145BFF]">PROVEN BY RESULTS</span>
                  </div>
                  <h2 className="aqe-section-heading mt-3 text-[#0B1638]">
                    <span className="text-[#145BFF]">mySDET</span> — Real Impact. Measurable Value.
                  </h2>
                  <p className="aqe-paragraph mt-2 text-[#263653]">
                    Delivering faster, smarter and more reliable software releases.
                  </p>
                </div>
                {/* Right: chart graphic */}
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <div className="flex flex-col items-end text-[11px] font-bold tracking-[0.18em] uppercase">
                    <span className="text-slate-400">AUTOMATE</span>
                    <span className="text-slate-400">ACCELERATE</span>
                    <span className="text-[#145BFF]">ACHIEVE</span>
                  </div>
                  <TrendingUp className="h-16 w-16 text-[#145BFF] opacity-80" />
                </div>
              </div>
            </Reveal>

            {/* Metric cards */}
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: Zap,
                  iconColor: "text-[#145BFF]",
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  borderColor: "border-[#DCE5F5] hover:border-[#145BFF]",
                  value: "70–80%",
                  valueColor: "text-[#145BFF]",
                  title: "Faster Automation Creation",
                  source: "AI test-generation industry benchmarks",
                },
                {
                  icon: Settings,
                  iconColor: "text-[#145BFF]",
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  borderColor: "border-[#DCE5F5] hover:border-[#145BFF]",
                  value: "85%",
                  valueColor: "text-[#145BFF]",
                  title: "Less Test Maintenance",
                  source: "Self-healing vs. 60–70% effort spent on upkeep today",
                },
                {
                  icon: Clock,
                  iconColor: "text-[#145BFF]",
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  borderColor: "border-[#DCE5F5] hover:border-[#145BFF]",
                  value: "30–50%",
                  valueColor: "text-[#145BFF]",
                  title: "Shorter Test Cycles",
                  source: "Capgemini World Quality Report / industry data",
                },
                {
                  icon: BarChart2,
                  iconColor: "text-[#145BFF]",
                  iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                  borderColor: "border-[#DCE5F5] hover:border-[#145BFF]",
                  value: "Higher",
                  valueColor: "text-[#145BFF]",
                  title: "Quality & Release Confidence",
                  source: "More coverage. Fewer defects. Happier customers.",
                },
              ].map((m, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`flex h-full flex-col rounded-2xl border ${m.borderColor} bg-white p-6 shadow-sm hover:shadow-md transition-all`}>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${m.iconBg}`}>
                        <m.icon className={`h-5 w-5 ${m.iconColor}`} />
                      </div>
                      <span className={`aqe-metric-number font-black ${m.valueColor}`}>{m.value}</span>
                    </div>
                    <h4 className="aqe-card-heading mt-4 text-[#0B1638]">{m.title}</h4>
                    <p className="aqe-text-small mt-2 text-[#64748B]">{m.source}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ── SECTION 4: EFFORT SAVINGS ── */}
        <section className="relative bg-white py-16 lg:py-28 overflow-hidden">
          <div className="mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">
            <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">

              {/* Left: Robot + floating labels */}
              <Reveal delay={0.1}>
                <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[580px]">
                  {/* Floating label cards */}
                  {[
                    { label: "Auto Generate\nTest Scripts", pos: "top-[12%] sm:top-[14%] left-0 sm:left-[-2%]", icon: "</>", color: "text-[#145BFF]", delay: 0 },
                    { label: "Smart Test Data", pos: "top-[1%] left-[30%] sm:left-[36%]", icon: "🗄", color: "text-[#145BFF]", delay: 0.4 },
                    { label: "Self-Healing", pos: "top-[12%] sm:top-[14%] right-0 sm:right-[1%]", icon: "✔", color: "text-[#145BFF]", delay: 0.8 },
                    { label: "Faster Execution", pos: "bottom-[20%] sm:bottom-[22%] left-0 sm:left-[-4%]", icon: "▶", color: "text-[#145BFF]", delay: 1.2 },
                    { label: "Real-time Insights", pos: "bottom-[20%] sm:bottom-[22%] right-0 sm:right-[0%]", icon: "📊", color: "text-[#145BFF]", delay: 1.6 },
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${f.pos} z-10 flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl border border-[#DCE5F5] bg-white px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-3.5 lg:py-4 whitespace-pre-line text-center shadow-[0_4px_16px_-4px_rgba(11,22,56,0.08)] sm:shadow-[0_4px_20px_-4px_rgba(11,22,56,0.08)]`}
                      animate={{ y: [4, -4, 4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: f.delay }}
                    >
                      <span className={`text-xs sm:text-sm md:text-base ${f.color}`}>{f.icon}</span>
                      <span className="text-[10px] sm:text-[12px] md:text-[13.5px] lg:text-[15px] font-semibold text-[#0B1638] leading-tight whitespace-pre-line">{f.label}</span>
                    </motion.div>
                  ))}

                  {/* Robot GIF */}
                  <motion.img
                    src={robotGif}
                    alt="mySDET Robot"
                    className="relative z-0 w-full"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Bottom pill floating below the robot GIF */}
                  <div className="absolute bottom-2 sm:bottom-4 md:bottom-5 inset-x-0 z-10 flex justify-center pointer-events-none">
                    <motion.div
                      className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 md:gap-3 rounded-full border border-[#DCE5F5] bg-white px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 shadow-[0_4px_20px_-4px_rgba(11,22,56,0.08)] whitespace-nowrap"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                      <span className="text-[11px] sm:text-[13px] md:text-[15px] font-bold text-[#0B1638]">Automate</span>
                      <span className="text-[11px] sm:text-[13px] md:text-[15px] font-black text-[#145BFF]">&middot;</span>
                      <span className="text-[11px] sm:text-[13px] md:text-[15px] font-bold text-[#0B1638]">Heal</span>
                      <span className="text-[11px] sm:text-[13px] md:text-[15px] font-black text-[#145BFF]">&middot;</span>
                      <span className="text-[11px] sm:text-[13px] md:text-[15px] font-bold text-[#0B1638]">Accelerate</span>
                    </motion.div>
                  </div>
                </div>
              </Reveal>

              {/* Right: Copy */}
              <Reveal delay={0.2}>
                <p className="aqe-label-text text-[#145BFF]">EFFORT SAVINGS</p>
                <h2 className="aqe-section-heading mt-3 text-[#0B1638]">
                  More Automation.<br />Less Effort. <span className="text-[#145BFF]">Greater Impact.</span>
                </h2>

                <ul className="mt-10 flex flex-col gap-8">
                  {[
                    {
                      icon: FileText,
                      iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                      iconColor: "text-[#145BFF]",
                      title: "Agents build suites in hours, not sprints",
                      desc: "myGenie generates automation scripts, myNexa supplies the data.",
                    },
                    {
                      icon: Settings,
                      iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                      iconColor: "text-[#145BFF]",
                      title: "Maintenance drops from 60–70% to single digits",
                      desc: "myAstra heals scripts as applications change.",
                    },
                    {
                      icon: Clock,
                      iconBg: "bg-[#EAF1FF] border-[#DCE5F5]",
                      iconColor: "text-[#145BFF]",
                      title: "Failure triage falls from hours to minutes",
                      desc: "myVega's evidence and result intelligence.",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${item.iconBg}`}>
                        <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="aqe-card-heading text-[#0B1638]">{item.title}</h4>
                        <p className="aqe-paragraph mt-1 text-[#263653]">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── SECTION 5: FINANCIAL IMPACT (LIGHT) ── */}
        <section className="relative bg-[#F5F8FF] py-24 lg:py-32 overflow-hidden border-t border-[#DCE5F5] text-[#0B1638]">
          <div className="relative z-10 mx-auto w-full px-12 md:px-[88px] lg:px-24">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">

              {/* Left: Copy */}
              <Reveal delay={0.1}>
                <p className="aqe-label-text font-bold text-[#145BFF]">FINANCIAL IMPACT</p>
                <h2 className="aqe-section-heading mt-4 text-[#0B1638]">
                  Lower Costs.<br />Higher Returns.<br />
                  <span className="text-[#145BFF]">
                    Real Business Impact.
                  </span>
                </h2>
                <p className="aqe-paragraph mt-4 text-[#263653]">
                  AI-native QA automation that delivers measurable value to your bottom line.
                </p>
                <ul className="mt-10 flex flex-col gap-7">
                  {[
                    { icon: Database, iconBg: "bg-[#EAF1FF] border-[#DCE5F5]", iconColor: "text-[#145BFF]", title: "Reclaimed maintenance effort alone", desc: "is worth millions in a mid-size automation organisation." },
                    { icon: BarChart2, iconBg: "bg-[#EAF1FF] border-[#DCE5F5]", iconColor: "text-[#145BFF]", title: "AI-native QA programs report 3–10x ROI", desc: "vs. traditional automation approaches." },
                    { icon: Shield, iconBg: "bg-[#EAF1FF] border-[#DCE5F5]", iconColor: "text-[#145BFF]", title: "Defects caught in-cycle cost 5–10x less", desc: "to fix than production escapes." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${item.iconBg}`}>
                        <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="aqe-card-heading text-[#0B1638]">{item.title}</h4>
                        <p className="aqe-paragraph mt-0.5 text-[#263653]">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Right: Chart visual */}
              <Reveal delay={0.2}>
                <div className="relative flex flex-col">
                  <p className="aqe-sub-heading mb-6 font-black italic text-[#145BFF] leading-tight">Invest Smarter in Quality</p>

                  {/* Badges row */}
                  <div className="mb-8 flex flex-wrap gap-3">
                    {[
                      { icon: Settings, label: "Save Maintenance Costs" },
                      { icon: BarChart2, label: "3–10x ROI" },
                      { icon: Shield, label: "Fix Defects 5–10x Cheaper" },
                      { icon: Zap, label: "More Value Faster" },
                    ].map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 rounded-xl border border-[#DCE5F5] bg-white px-3 py-1.5 shadow-sm">
                        <b.icon className="h-3.5 w-3.5 text-[#145BFF]" />
                        <span className="text-[11px] font-semibold text-[#0B1638]">{b.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Vertical bars */}
                  <VerticalBars />

                  {/* Bottom ticker */}
                  <div className="mt-6 flex items-center justify-center gap-6 border-t border-[#DCE5F5] pt-4">
                    {["AUTOMATE", "OPTIMIZE", "SCALE", "GROW"].map((t, i) => (
                      <span key={i} className="aqe-caption text-[12px] font-bold tracking-widest text-[#64748B]">{t}</span>
                    ))}
                  </div>

                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── SECTION 6: REAL BUSINESS IMPACT ── */}
        <section className="relative bg-[#f9fafb] py-16 sm:py-20 lg:py-28">
          <div className="mx-auto w-full px-4 sm:px-8 md:px-[88px] lg:px-24">

            {/* Eyebrow */}
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
                <div className="h-px w-10 sm:w-16 bg-[#cbd5e1]" />
                <span className="aqe-label-text text-[#64748b] text-center">REAL BUSINESS IMPACT</span>
                <div className="h-px w-10 sm:w-16 bg-[#cbd5e1]" />
              </div>
            </Reveal>

            {/* Main highlight card */}
            <Reveal delay={0.1}>
              <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 sm:px-8 py-4 sm:py-5 shadow-sm max-w-4xl mx-auto">
                <div className="shrink-0">
                  <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-[#B45309]" />
                </div>
                <p className="aqe-intro text-[#0B1638] text-center sm:text-left text-sm sm:text-base md:text-[17px] leading-relaxed">
                  A 50-engineer automation organisation can reclaim{" "}
                  <span className="font-black text-[#B45309]">$2.5M+ of annual capacity</span>{" "}
                  &mdash; redeployed to coverage and quality, not upkeep.
                </p>
              </div>
            </Reveal>

            {/* Disclaimer */}
            <Reveal delay={0.2}>
              <p className="aqe-text-small mx-auto mt-5 sm:mt-6 text-center italic text-[#64748B] max-w-3xl px-2">
                Directional estimates drawn from published industry benchmarks (ITIC, IDC/Microsoft, Capgemini World Quality Report, CISQ, EU AI Act, autonomous-testing benchmarks) &mdash; validated with client data per engagement.
              </p>
            </Reveal>

            {/* 4 stat cards */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
              {[
                { icon: Database, iconBg: "bg-[#EAF1FF] border-[#DCE5F5]", iconColor: "text-[#145BFF]", title: "Reclaim Capacity", sub: "$2.5M+ value" },
                { icon: Shield, iconBg: "bg-[#EAF1FF] border-[#DCE5F5]", iconColor: "text-[#145BFF]", title: "Better Coverage", sub: "Higher quality" },
                { icon: BarChart2, iconBg: "bg-[#EAF1FF] border-[#DCE5F5]", iconColor: "text-[#145BFF]", title: "Optimise Investment", sub: "More impact" },
                { icon: Zap, iconBg: "bg-[#EAF1FF] border-[#DCE5F5]", iconColor: "text-[#145BFF]", title: "Empower Teams", sub: "Focus on innovation" },
              ].map((item, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-[#DCE5F5] bg-white p-4 sm:p-5 shadow-sm transition-all hover:border-[#145BFF] hover:shadow-[0_4px_20px_-8px_rgba(20,91,255,0.2)]">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${item.iconBg}`}>
                      <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="aqe-font-display text-[15px] sm:text-base lg:text-[15px] xl:text-base font-bold text-[#0B1638] leading-tight break-words">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#64748B] mt-0.5 truncate sm:whitespace-normal">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ── SECTION: FAQS ── */}
        <FAQAccordion items={MYSDET_FAQS} />
        <StillHaveQuestionsBanner />

        {/* ── SECTION 7: CTA (LIGHT) ── */}
        <section
          className="relative overflow-hidden border-t border-[#DCE5F5] bg-[#F5F8FF] text-[#0B1638]"
          style={{
            padding: "clamp(3rem, 8vw, 6rem) 1.5rem",
          }}
        >
          {/* subtle arc glow */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
            style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(20,91,255,0.08) 0%, transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="aqe-label-text mb-4 text-[#263653] font-semibold tracking-widest">READY TO TRANSFORM?</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="aqe-section-heading text-[#0B1638]">
                See mySDET in Action.<br />
                <span className="text-[#145BFF]">
                  Turn Your QA Vision into Reality.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <a
                  href="/contact"
                  className="aqe-btn-text inline-flex items-center gap-2 rounded-full bg-[#145BFF] hover:bg-[#0B49D6] px-8 py-4 text-white font-bold shadow-[0_8px_24px_rgba(20,91,255,0.3)] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_12px_28px_rgba(20,91,255,0.4)]"
                >
                  Request a Demo <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </div>
  );
}
