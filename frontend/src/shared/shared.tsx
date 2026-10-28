import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import logoDark from "@/assets/logo-images/AscendQE-logo-new-dark-theme.webp";

function motionOK() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** 3D tilt-on-hover. Spread the returned props onto any element. */
export function useTilt(max = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const onMouseMove = (e: React.MouseEvent) => {
    if (!motionOK()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(700px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`,
      transition: "transform 0.06s linear",
    });
  };
  const onMouseLeave = () =>
    setStyle({ transform: "perspective(700px) rotateX(0deg) rotateY(0deg)", transition: "transform 0.4s ease" });
  return { ref, style, onMouseMove, onMouseLeave };
}

/* ── Brand logo ──────────────────────────────────────────── */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoDark}
      alt="AscendQE"
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}

/* ── Scroll-triggered reveal (fade + slight up) ──────────── */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ── Animated number ticker ──────────────────────────────── */
export function CountUp({
  value,
  decimals = 0,
  duration = 1600,
  className = "",
}: {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  );
}

/* ── Cursor-aware radial cyan glow ───────────────────────── */
export function CursorGlow({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      setPos({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
      setActive(true);
    };
    const onLeave = () => setActive(false);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${className}`}
      style={{
        opacity: active ? 1 : 0,
        background: `radial-gradient(440px circle at ${pos.x}% ${pos.y}%, rgba(0,229,192,0.13), transparent 70%)`,
      }}
    />
  );
}

/* ── Animated "signal" network background ────────────────── */
type Node = { x: number; y: number; r: number };
const NET_NODES: Node[] = [
  { x: 8, y: 22, r: 2.2 },
  { x: 22, y: 60, r: 1.6 },
  { x: 35, y: 30, r: 2.6 },
  { x: 48, y: 72, r: 1.8 },
  { x: 60, y: 38, r: 2.2 },
  { x: 72, y: 66, r: 1.6 },
  { x: 84, y: 28, r: 2.4 },
  { x: 92, y: 58, r: 1.8 },
  { x: 16, y: 84, r: 1.4 },
  { x: 66, y: 14, r: 1.4 },
];
const NET_LINKS: [number, number][] = [
  [0, 2], [2, 4], [4, 6], [6, 7], [1, 3], [3, 5], [5, 7],
  [0, 1], [2, 3], [4, 5], [9, 2], [8, 1], [6, 9],
];

export function SignalBackground({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      style={style}
    >
      {NET_LINKS.map(([a, b], i) => (
        <line
          key={`l-${i}`}
          x1={NET_NODES[a].x}
          y1={NET_NODES[a].y}
          x2={NET_NODES[b].x}
          y2={NET_NODES[b].y}
          stroke="rgba(0,229,192,0.18)"
          strokeWidth={0.18}
        />
      ))}
      {NET_NODES.map((n, i) => (
        <g
          key={`n-${i}`}
          style={
            reduce
              ? undefined
              : {
                  animation: `aqe-drift ${9 + (i % 5) * 2}s ease-in-out ${i * 0.4}s infinite`,
                  transformOrigin: `${n.x}px ${n.y}px`,
                }
          }
        >
          <circle cx={n.x} cy={n.y} r={n.r} fill="rgba(0,229,192,0.45)" />
          <circle cx={n.x} cy={n.y} r={n.r * 2.6} fill="rgba(0,229,192,0.08)" />
        </g>
      ))}
    </svg>
  );
}

/* ── Section eyebrow label ───────────────────────────────── */
export function Eyebrow({
  children,
  dark = true,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`aqe-label-text inline-flex items-center gap-2 rounded-full border px-3 py-1 ${
        dark
          ? "border-[rgba(0,229,192,0.25)] bg-[rgba(0,229,192,0.07)] text-[#5fe9d4]"
          : "border-[rgba(10,22,40,0.1)] bg-[rgba(0,229,192,0.08)] text-[#0a8f7c]"
      } ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current aqe-pulse" />
      {children}
    </span>
  );
}

