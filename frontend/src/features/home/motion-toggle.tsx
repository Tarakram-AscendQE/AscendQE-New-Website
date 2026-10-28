import React from 'react';

interface MotionToggleProps {
  isPaused: boolean;
  onToggle: () => void;
}

export const MotionToggle: React.FC<MotionToggleProps> = ({ isPaused, onToggle }) => {
  return (
    <button
      id="motion"
      type="button"
      className="motion-toggle"
      aria-pressed={isPaused}
      onClick={onToggle}
    >
      {isPaused ? '▶ Motion paused' : 'Ⅱ Pause motion'}
    </button>
  );
};

