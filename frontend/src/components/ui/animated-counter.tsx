import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export interface UseCountUpOptions {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export function useCountUp({
  from = 1,
  to,
  duration = 1400,
  delay = 150,
  once = true,
}: UseCountUpOptions) {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once, margin: "-40px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic ease-out for energetic start and gentle deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(from + (to - from) * easeOut);

        setCount(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, from, to, duration, delay]);

  return { count, ref };
}

export interface AnimatedCounterProps extends UseCountUpOptions {
  className?: string;
  suffix?: React.ReactNode;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 1,
  to,
  duration = 1400,
  delay = 150,
  once = true,
  className,
  suffix,
}) => {
  const { count, ref } = useCountUp({ from, to, duration, delay, once });

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;

