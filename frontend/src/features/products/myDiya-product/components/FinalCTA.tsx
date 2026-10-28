import { ArrowRight, Rocket, ShieldCheck, Users, BarChart3 } from "lucide-react";

interface ValueBadge {
  icon: typeof Rocket;
  title: string;
  subtitle: string;
  iconBorder: string;
  iconBg: string;
}

const VALUE_BADGES: ValueBadge[] = [
  {
    icon: Rocket,
    title: "Accelerate",
    subtitle: "Quality Outcomes",
    iconBorder: "border-[#DCE5F5]",
    iconBg: "bg-[#EAF1FF] text-[#145BFF]",
  },
  {
    icon: ShieldCheck,
    title: "Operate with",
    subtitle: "Governance",
    iconBorder: "border-cyan-200",
    iconBg: "bg-cyan-50 text-[#0284c7]",
  },
  {
    icon: Users,
    title: "Scale with",
    subtitle: "Confidence",
    iconBorder: "border-indigo-200",
    iconBg: "bg-indigo-50 text-[#4f46e5]",
  },
  {
    icon: BarChart3,
    title: "Drive Measurable",
    subtitle: "Business Impact",
    iconBorder: "border-purple-200",
    iconBg: "bg-purple-50 text-[#7c3aed]",
  },
];

export function FinalCTA() {
  return (
    <section
      id="demo"
      className="relative w-full overflow-hidden bg-[#F5F8FF] py-20 sm:py-28 text-center text-[#0B1638] border-t border-[#DCE5F5]"
    >
      {/* Background Ambient Glows & Cybernetic Particle Wave */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blue ambient glow (left) */}
        <div className="absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full bg-[#145BFF]/5 blur-[120px]" />
        {/* Sky ambient glow (right) */}
        <div className="absolute -right-32 top-1/3 h-[480px] w-[480px] rounded-full bg-sky-500/5 blur-[120px]" />

        {/* Ambient dot matrix grid overlay */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(11,22,56,0.08) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-16 xl:px-24">
        {/* Eyebrow Header */}
        <div className="inline-block">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#64748B]">
            READY TO TRANSFORM{" "}
            <span className="font-bold text-[#145BFF]">
              QUALITY ENGINEERING?
            </span>
          </p>
          <div className="mx-auto mt-2 h-[1.5px] w-20 rounded-full bg-gradient-to-r from-[#145BFF] via-[#0284c7] to-[#7c3aed]" />
        </div>

        {/* Display Headline */}
        <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.15]">
          <span className="block text-[#0B1638]">
            Build What&apos;s Next with myDiya.
          </span>
          <span
            className="mt-2 block"
            style={{
              background: "linear-gradient(90deg, #145BFF 0%, #0284c7 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "#145BFF",
            }}
          >
            Enterprise Quality. Amplified by AI.
          </span>
        </h2>

        {/* Center Pill CTA Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#145BFF] hover:bg-[#0B49D6] px-8 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-bold text-white shadow-[0_8px_24px_rgba(20,91,255,0.3)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(20,91,255,0.4)] hover:scale-105 active:scale-95"
          >
            <span>Book an Enterprise Demo</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-white" />
          </a>
        </div>

        {/* Luminous Cybernetic Horizon Spline Beam */}
        <div className="relative my-8 sm:my-12 flex w-full items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 1440 60"
            className="h-10 sm:h-14 w-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="cta-beam-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#145BFF" stopOpacity="0" />
                <stop offset="25%" stopColor="#0284c7" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#145BFF" stopOpacity="0.8" />
                <stop offset="75%" stopColor="#7c3aed" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#145BFF" stopOpacity="0" />
              </linearGradient>
              <filter
                id="cta-beam-glow"
                x="-10%"
                y="-50%"
                width="120%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3.5" result="glow" />
                <feComposite
                  in="SourceGraphic"
                  in2="glow"
                  operator="over"
                />
              </filter>
            </defs>
            {/* Ambient outer beam glow */}
            <path
              d="M0 35 C 380 5, 740 55, 1440 20"
              stroke="url(#cta-beam-gradient)"
              strokeWidth="3"
              filter="url(#cta-beam-glow)"
            />
            {/* Core laser path */}
            <path
              d="M0 35 C 380 5, 740 55, 1440 20"
              stroke="#145BFF"
              strokeWidth="1.2"
              strokeOpacity="0.75"
            />
          </svg>
        </div>

        {/* Bottom 4 Badges */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 items-center justify-between">
          {VALUE_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="group relative flex items-center justify-center gap-3 sm:gap-3.5"
              >
                <div
                  className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110 ${badge.iconBorder} ${badge.iconBg}`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-left">
                  <div className="text-sm sm:text-[15px] font-bold leading-tight text-[#0f172a]">
                    {badge.title}
                  </div>
                  <div className="mt-0.5 text-xs sm:text-[13px] leading-tight text-slate-500">
                    {badge.subtitle}
                  </div>
                </div>

                {/* Subtle vertical divider on desktop */}
                {idx < VALUE_BADGES.length - 1 && (
                  <div className="absolute -right-3 sm:-right-4 hidden h-8 w-[1px] bg-slate-200 md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
