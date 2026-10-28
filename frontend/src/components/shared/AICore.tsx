import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Code2, Check, Eye, Shield, BarChart3, Settings } from "lucide-react";

/* ── deterministic RNG so the brain looks the same every render ── */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = { x: number; y: number; r: number };

function buildBrain() {
  const rng = mulberry32(7);
  const cx = 100;
  const cy = 92;
  const pts: Pt[] = [];

  // lumpy outline → brain silhouette
  const OUT = 26;
  for (let i = 0; i < OUT; i++) {
    const a = (i / OUT) * Math.PI * 2;
    const lobes = 1 + 0.16 * Math.sin(a * 6) + 0.1 * Math.sin(a * 3 + 1);
    const rx = 64 * lobes;
    const ry = 50 * lobes;
    pts.push({
      x: cx + Math.cos(a) * rx,
      y: cy + Math.sin(a) * ry * 0.92,
      r: 1.1 + rng() * 0.9,
    });
  }
  // interior nodes
  for (let i = 0; i < 28; i++) {
    const a = rng() * Math.PI * 2;
    const d = Math.sqrt(rng()) ;
    pts.push({
      x: cx + Math.cos(a) * d * 52,
      y: cy + Math.sin(a) * d * 40,
      r: 1 + rng() * 1.4,
    });
  }

  // edges between near points
  const edges: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      if (dx * dx + dy * dy < 26 * 26) edges.push([i, j]);
    }
  }
  return { pts, edges };
}

const ICONS = [
  { Icon: Code2, top: "4%", left: "18%", dur: 5.5 },
  { Icon: Check, top: "0%", left: "64%", dur: 6.4 },
  { Icon: Eye, top: "34%", left: "90%", dur: 5.0 },
  { Icon: Shield, top: "70%", left: "82%", dur: 7.0 },
  { Icon: BarChart3, top: "78%", left: "8%", dur: 6.0 },
  { Icon: Settings, top: "40%", left: "-2%", dur: 7.6 },
];

export function AICore({ hideBadges = false }: { hideBadges?: boolean } = {}) {
  const reduce = useReducedMotion();
  const { pts, edges } = useMemo(buildBrain, []);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [pop, setPop] = useState(0);

  // pick a few synapse edges to flash
  const synapses = useMemo(() => edges.filter((_, i) => i % 7 === 0).slice(0, 8), [edges]);

  const handlePoke = () => {
    setPop((n) => n + 1);
  };

  useEffect(() => {
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / r.width;
      const py = (e.clientY - (r.top + r.height / 2)) / r.height;
      setTilt({ x: py * -6, y: px * 8 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      onClick={handlePoke}
      data-cursor="hover"
      className="relative mx-auto aspect-square w-full max-w-[460px] cursor-pointer select-none"
      style={{ perspective: 900 }}
    >
      {/* winding road / energy floor */}
      <svg className="absolute inset-x-0 bottom-0 h-1/2 w-full" viewBox="0 0 200 100" aria-hidden>
        <defs>
          <linearGradient id="road" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(20,91,255,0.25)" />
            <stop offset="100%" stopColor="rgba(20,91,255,0)" />
          </linearGradient>
          <radialGradient id="floor" cx="0.5" cy="0.85" r="0.6">
            <stop offset="0%" stopColor="rgba(20,91,255,0.20)" />
            <stop offset="100%" stopColor="rgba(20,91,255,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="92" rx="70" ry="14" fill="url(#floor)" />
        <path id="roadpath" d="M100 96 L112 50 Q108 40 100 38 Q92 40 88 50 Z" fill="url(#road)" opacity="0.45" />
        {!reduce && (
          <circle r="2.2" fill="#145BFF">
            <animateMotion dur="4.5s" repeatCount="indefinite" path="M100 96 L100 38" />
            <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {/* pedestal beam */}
      <div className="absolute bottom-[8%] left-1/2 h-[34%] w-10 -translate-x-1/2 overflow-hidden">
        <div
          className={`mx-auto h-full w-2 rounded-full ${reduce ? "" : "aqe-shimmer"}`}
          style={{ background: "linear-gradient(to top, rgba(20,91,255,0.45), rgba(20,91,255,0))" }}
        />
      </div>
      <div
        className="absolute bottom-[6%] left-1/2 h-3 w-32 -translate-x-1/2 rounded-[100%]"
        style={{ background: "radial-gradient(closest-side, rgba(20,91,255,0.28), transparent)" }}
      />

      {/* the brain */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
       <motion.div
         key={pop}
         className="absolute inset-0"
         initial={pop === 0 ? false : { scale: 1 }}
         animate={pop === 0 ? undefined : { scale: [1, 1.12, 1] }}
         transition={{ duration: 0.5, ease: "easeOut" }}
       >
        {/* aura */}
        <div
          className="absolute left-1/2 top-[42%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(20,91,255,0.12), transparent)" }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 184" aria-hidden>
          <g className={reduce ? "" : "aqe-breathe"}>
            {edges.map(([a, b], i) => (
              <line
                key={`e-${i}`}
                x1={pts[a].x}
                y1={pts[a].y}
                x2={pts[b].x}
                y2={pts[b].y}
                stroke="rgba(20,91,255,0.22)"
                strokeWidth={0.5}
              />
            ))}
            {pts.map((p, i) => (
              <g key={`p-${i}`}>
                <circle cx={p.x} cy={p.y} r={p.r * 2.4} fill="rgba(20,91,255,0.12)" />
                <circle cx={p.x} cy={p.y} r={p.r} fill="#145BFF" />
              </g>
            ))}
          </g>
          {/* firing synapses */}
          {!reduce &&
            synapses.map(([a, b], i) => (
              <motion.line
                key={`s-${i}`}
                x1={pts[a].x}
                y1={pts[a].y}
                x2={pts[b].x}
                y2={pts[b].y}
                stroke="#145BFF"
                strokeWidth={1.2}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2.5 + (i % 5) * 1.3,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
              />
            ))}
        </svg>
       </motion.div>
      </motion.div>

      {/* floating agent badges */}
      {!hideBadges && ICONS.map(({ Icon, top, left, dur }, i) => (
        <motion.div
          key={i}
          className="absolute flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCE5F5] bg-white/90 text-[#145BFF] backdrop-blur"
          style={{ top, left, boxShadow: "0 8px 24px -10px rgba(20,91,255,0.2)" }}
          animate={
            reduce
              ? undefined
              : { y: [0, -10, 0, 8, 0], x: [0, 5, 0, -5, 0] }
          }
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      ))}
    </div>
  );
}
