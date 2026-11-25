import { useEffect, useState } from 'react';

const CITATION = 'The Proof Standard (PS-1), version 0.1. AscendQE, 2026. ascendqe.com/standard.';
const DEFAULT_LABEL = 'Copy citation';
const RESET_AFTER_MS = 2400;

/** PS-1 citation with a copy-to-clipboard button. */
export function Citation() {
  const [label, setLabel] = useState(DEFAULT_LABEL);

  useEffect(() => {
    if (label === DEFAULT_LABEL) return;
    const timer = window.setTimeout(() => setLabel(DEFAULT_LABEL), RESET_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [label]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CITATION);
      setLabel('Copied');
    } catch {
      setLabel('Select the text to copy');
    }
  };

  return (
    <div className="cite mt16">
      <code id="citetxt">{CITATION}</code>
      <button type="button" className="btn sm ghost" onClick={copy}>
        {label}
      </button>
    </div>
  );
}
