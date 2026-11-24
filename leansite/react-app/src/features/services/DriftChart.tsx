import { useEffect, useRef, useState } from 'react';

/** Illustrative daily quality score over 30 days; dips below the 0.90 limit around day 21–23. */
const DAILY_SCORES = [
  0.93, 0.94, 0.93, 0.95, 0.94, 0.95, 0.94, 0.95, 0.93, 0.94, 0.94, 0.93, 0.94, 0.95, 0.93, 0.94, 0.92, 0.93, 0.91, 0.9,
  0.88, 0.86, 0.85, 0.87, 0.91, 0.93, 0.94, 0.95, 0.94, 0.95,
];
const LIMIT = 0.9;
const ALERT_DAY_INDEX = 22;
const SCALE_LOW = 0.8;
const SCALE_HIGH = 0.98;
/** Below this width the axis labels are dropped and the left padding shrinks. */
const COMPACT_WIDTH = 520;

interface Size {
  width: number;
  height: number;
}

/** Drift line drawn to fit its container (sized by `.fig svg` in site.css). */
export function DriftChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<Size | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const measure = () => setSize({ width: svg.clientWidth, height: svg.clientHeight });
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    measure();
    return () => observer.disconnect();
  }, []);

  let content = null;
  if (size && size.width) {
    const { width: W, height: H } = size;
    const compact = W < COMPACT_WIDTH;
    const pl = compact ? 8 : 40;
    const pr = 8;
    const pt = 12;
    const pb = 26;
    const x = (i: number) => pl + (i * (W - pl - pr)) / (DAILY_SCORES.length - 1);
    const y = (v: number) => pt + ((SCALE_HIGH - v) / (SCALE_HIGH - SCALE_LOW)) * (H - pt - pb);
    const points = DAILY_SCORES.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    const limitY = y(LIMIT);

    content = (
      <>
        <rect x={pl} y={limitY} width={W - pl - pr} height={H - pb - limitY} fill="var(--stop-bg)" />
        <line
          x1={pl}
          x2={W - pr}
          y1={limitY}
          y2={limitY}
          stroke="var(--stop)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text x={pl + 4} y={limitY - 6} fontFamily="IBM Plex Mono" fontSize="12" fill="var(--stop)">
          limit 0.90
        </text>
        <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
        <circle
          cx={x(ALERT_DAY_INDEX)}
          cy={y(DAILY_SCORES[ALERT_DAY_INDEX])}
          r="6"
          fill="var(--stop)"
          stroke="var(--surface)"
          strokeWidth="2"
        />
        <text
          x={x(ALERT_DAY_INDEX)}
          y={H - 6}
          textAnchor="middle"
          fontFamily="IBM Plex Mono"
          fontSize="12"
          fill="var(--stop)"
        >
          [EV-0311] day 23
        </text>
        {!compact && (
          <>
            {[0.85, 0.9, 0.95].map((v) => (
              <text
                key={v}
                x={pl - 6}
                y={y(v) + 4}
                textAnchor="end"
                fontFamily="IBM Plex Mono"
                fontSize="11"
                fill="var(--faint)"
              >
                {v.toFixed(2)}
              </text>
            ))}
            <text x={pl} y={H - 6} fontFamily="IBM Plex Mono" fontSize="11" fill="var(--faint)">
              day 1
            </text>
          </>
        )}
      </>
    );
  }

  return (
    <div className="fig">
      <svg
        ref={svgRef}
        role="img"
        aria-label="Daily quality score stays above the 0.90 limit until day 21, falls to 0.85 on day 23, which raises alert EV-0311, and recovers after the fix."
      >
        {content}
      </svg>
    </div>
  );
}
