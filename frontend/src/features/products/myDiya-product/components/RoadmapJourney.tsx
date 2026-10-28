import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { MapPin, Check, ChevronRight, Users, Server } from "lucide-react";

const PATH =
  "M 30 175 C 190 175 210 70 370 70 C 530 70 555 180 715 180 C 835 180 905 95 975 95";
const PIN_FRACTIONS = [0.16, 0.5, 0.84];

const STAGES = [
  {
    pill: "Near-Term · 0–6 mo",
    title: "Foundation",
    accent: "#145BFF",
    glow: "rgba(20,91,255,0.6)",
    points: [
      "Agents deployed against existing suites",
      "Self-healing cuts maintenance toil",
      "First continuous risk signals",
    ],
  },
  {
    pill: "Mid-Term · 6–18 mo",
    title: "Acceleration",
    accent: "#4f9dff",
    glow: "rgba(79,157,255,0.6)",
    points: [
      "Coverage expands without headcount",
      "Reasoning-driven generation matures",
      "Data alignment removes drift",
    ],
  },
  {
    pill: "Long-Term · 18+ mo",
    title: "Compounding",
    accent: "#b07bff",
    glow: "rgba(176,123,255,0.6)",
    points: [
      "Quality becomes a system property",
      "Risk models sharpen each cycle",
      "Teams direct agents, not scripts",
    ],
  },
];

const PAYOFF = [
  { title: "Quick wins", body: "Immediate relief from brittle-test maintenance in the first weeks." },
  { title: "Measurable impact", body: "Coverage and risk metrics improve without growing the team." },
  { title: "Lasting transformation", body: "Quality compounds into durable, governed infrastructure." },
];

function StageBullets({ active, points, accent }: { active: boolean; points: string[]; accent: string }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? points.length : 0);
  useEffect(() => {
    if (!active || reduce) {
      if (reduce) setN(points.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= points.length) clearInterval(id);
    }, 400);
    return () => clearInterval(id);
  }, [active, reduce, points.length]);

  return (
    <ul className="mt-4 space-y-2.5">
      {points.map((p, i) => {
        const done = i < n;
        return (
          <li key={p} className="flex items-center gap-2.5">
            <motion.span
              className="flex h-5 w-5 items-center justify-center rounded-full"
              animate={{
                scale: done ? [0.5, 1.25, 1] : 1,
                backgroundColor: done ? accent : "rgba(255,255,255,0.08)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Check className="h-3 w-3" style={{ color: done ? "#06121f" : "transparent" }} strokeWidth={3} />
            </motion.span>
            <span
              className="transition-opacity duration-300"
              style={{ fontSize: "0.88rem", color: "#cdd6e0", opacity: done ? 1 : 0.4 }}
            >
              {p}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function RoadmapJourney() {
  const reduce = useReducedMotion();
  const roadRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pins, setPins] = useState<{ x: number; y: number }[]>([]);
  const [progress, setProgress] = useState(reduce ? 1 : 0);

  const { scrollYProgress } = useScroll({
    target: roadRef,
    offset: ["start 78%", "end 55%"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  // sample pin positions on the path
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPins(
      PIN_FRACTIONS.map((f) => {
        const p = path.getPointAtLength(len * f);
        return { x: p.x, y: p.y };
      })
    );
  }, []);

  // skyline parallax
  const skylineX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -20]);

  const jumpTo = (i: number) => {
    const el = document.getElementById(`roadmap-stage-${i}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const isActive = (i: number) => progress >= PIN_FRACTIONS[i] - 0.02;
  const longReached = progress >= PIN_FRACTIONS[2] + 0.06 || reduce;

  return (
    <div ref={roadRef} className="relative">
      {/* The road */}
      <div className="relative mx-auto h-[240px] max-w-5xl px-6">
        {/* skyline near long-term */}
        <motion.svg
          className="pointer-events-none absolute bottom-6 right-6 h-24 w-48 opacity-50"
          viewBox="0 0 200 90"
          style={{ x: skylineX }}
          aria-hidden
        >
          {[
            [10, 40], [28, 25], [46, 55], [64, 18], [82, 45], [100, 30],
            [118, 50], [136, 22], [154, 42], [172, 35],
          ].map(([x, h], i) => (
            <rect key={i} x={x} y={90 - h} width="14" height={h} fill="rgba(176,123,255,0.25)" rx="1" />
          ))}
          {!reduce &&
            [[20, 55], [70, 40], [110, 60], [142, 38], [165, 50]].map(([x, y], i) => (
              <motion.circle
                key={`tw-${i}`}
                cx={x}
                cy={y}
                r="1.2"
                fill="#d9c4ff"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
        </motion.svg>

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 240"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="roadtrail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#145BFF" />
              <stop offset="50%" stopColor="#4f9dff" />
              <stop offset="100%" stopColor="#b07bff" />
            </linearGradient>
          </defs>
          {/* base road */}
          <path d={PATH} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round" />
          <path d={PATH} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" strokeDasharray="2 14" strokeLinecap="round" />
          {/* glowing progress trail */}
          <motion.path
            ref={pathRef}
            d={PATH}
            fill="none"
            stroke="url(#roadtrail)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : scrollYProgress }}
          />
        </svg>

        {/* pins */}
        {pins.map((pin, i) => {
          const active = isActive(i);
          const s = STAGES[i];
          return (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${(pin.x / 1000) * 100}%`, top: `${pin.y}px` }}
              aria-label={`Go to ${s.title}`}
            >
              <motion.span
                className="flex h-9 w-9 items-center justify-center rounded-full border-2"
                animate={
                  active
                    ? { scale: [1, 1.25, 1], filter: "grayscale(0)" }
                    : { scale: 1, filter: "grayscale(1)" }
                }
                transition={{ duration: 0.35 }}
                style={{
                  borderColor: active ? s.accent : "rgba(255,255,255,0.25)",
                  background: active ? "rgba(10,22,40,0.9)" : "rgba(10,22,40,0.7)",
                  color: active ? s.accent : "#6b7888",
                  boxShadow: active ? `0 0 18px 2px ${s.glow}` : "none",
                }}
              >
                <MapPin className="h-4 w-4" />
              </motion.span>
            </button>
          );
        })}
      </div>

      {/* Stage content + connector chevrons */}
      <div className="relative mx-auto mt-6 grid w-full px-12 md:px-[88px] lg:px-24 gap-5 md:grid-cols-3">
        {STAGES.map((s, i) => {
          const active = isActive(i);
          return (
            <div key={s.title} id={`roadmap-stage-${i}`} className="relative">
              {/* chevrons between cards (desktop) */}
              {i < STAGES.length - 1 && (
                <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex">
                  {[0, 1, 2].map((c) => (
                    <motion.span
                      key={c}
                      animate={reduce ? undefined : { opacity: [0.2, 1, 0.2], x: [0, 3, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: c * 0.2 + i * 0.3 }}
                      style={{ color: active ? s.accent : "#3a4860" }}
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={3} />
                    </motion.span>
                  ))}
                </div>
              )}
              <motion.div
                className="aqe-glass h-full rounded-2xl p-6 transition-all duration-400"
                animate={{ opacity: active ? 1 : 0.5 }}
                style={{
                  borderColor: active ? `${s.accent}88` : "rgba(255,255,255,0.08)",
                  boxShadow: active ? `0 22px 50px -24px ${s.glow}` : "none",
                }}
              >
                <span
                  className="inline-block rounded-full px-2.5 py-0.5"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    color: active ? s.accent : "#8c9bad",
                    background: active ? `${s.accent}1f` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${active ? `${s.accent}55` : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  {s.pill}
                </span>
                <h3 className="aqe-display mt-3 text-white" style={{ fontSize: "1.3rem", fontWeight: 600 }}>
                  {s.title}
                </h3>
                <StageBullets active={active} points={s.points} accent={s.accent} />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* New Comparison Cards */}
      <div className="mx-auto mt-12 grid w-full px-12 md:px-[88px] lg:px-24 gap-6 md:grid-cols-2">
        {/* Traditional QA Firms */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-[#14233a] p-8 shadow-lg border border-[rgba(255,255,255,0.05)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(248,113,113,0.1)] text-red-400">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-[1.15rem] font-bold text-white">Traditional QA Firms</h3>
          </div>
          <div className="mt-6 space-y-4">
            <p className="text-[0.95rem] leading-[1.65] text-[#9fb0c2]">
              Traditional QA firms sell people. Their leverage scales with headcount. They are paid more when projects take longer.
            </p>
            <p className="text-[0.85rem] leading-[1.6] text-[#8c9bad]">
              Services scale linearly. Deliverables end engagements. The economics are inverted relative to the platform model.
            </p>
          </div>
        </motion.div>

        {/* AscendQE Platform */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl bg-[#14233a] p-8 shadow-lg border border-[rgba(255,255,255,0.05)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(20,91,255,0.1)] text-[#145BFF]">
              <Server className="h-5 w-5" />
            </div>
            <h3 className="text-[1.15rem] font-bold text-white">AscendQE Platform</h3>
          </div>
          <div className="mt-6 space-y-4">
            <p className="text-[0.95rem] leading-[1.65] text-[#9fb0c2]">
              AscendQE sells a platform. Our leverage scales with intelligence. We are valued more when verification gets faster.
            </p>
            <p className="text-[0.85rem] leading-[1.6] font-medium text-[#145BFF]">
              Platforms compound with every release. Over a multi-year horizon, the platform model wins — because the work itself is being absorbed by software.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Payoff row — appears after destination reached */}
      <motion.div
        className="mx-auto mt-6 grid w-full px-12 md:px-[88px] lg:px-24 gap-5 sm:grid-cols-3"
        animate={{ opacity: longReached ? 1 : 0, y: longReached ? 0 : 16 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: longReached ? "auto" : "none" }}
      >
        {PAYOFF.map((p) => (
          <div key={p.title} className="rounded-2xl border border-[rgba(20,91,255,0.25)] bg-[rgba(20,91,255,0.05)] p-6">
            <div className="flex items-center gap-2 text-[#145BFF]">
              <Check className="h-4 w-4" strokeWidth={3} />
              <span style={{ fontSize: "1rem", fontWeight: 600 }}>{p.title}</span>
            </div>
            <p className="mt-2 text-[#9fb0c2]" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
              {p.body}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
