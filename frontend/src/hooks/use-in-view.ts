import { useLayoutEffect, useRef, useState } from 'react';

/** 'idle' = no reveal (no JS observer yet, or reduced motion): content shows normally. */
export type RevealState = 'idle' | 'pending' | 'shown';

/**
 * Scroll reveal: 'pending' until the element first enters the viewport, then 'shown' (once). An element
 * already on screen at load plays its entrance straight away. Browsers without IntersectionObserver and
 * reduced-motion users stay 'idle', so content is never hidden by a failed or skipped animation.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>('idle');

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Set before the first paint, so an element already in view never flashes before its entrance.
    setState('pending');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState('shown');
        observer.disconnect();
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, state };
}
