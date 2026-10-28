import React from 'react';

interface ScrollProgressLineProps {
  progress: number;
}

export const ScrollProgressLine: React.FC<ScrollProgressLineProps> = ({ progress }) => {
  return (
    <div
      className="scroll-line"
      aria-hidden="true"
      style={{ width: `${progress}%` }}
    />
  );
};

