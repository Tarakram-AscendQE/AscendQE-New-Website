

import React from 'react';
import { CREW_BOTS } from './data';

interface CharacterRowProps {
  onSelectBot?: (bot: string, role: string) => void;
}

export const CharacterRow: React.FC<CharacterRowProps> = ({ onSelectBot }) => {
  return (
    <div className="character-row" aria-label="Meet the 12 QE agents">
      {CREW_BOTS.map((item) => (
        <button
          key={item.bot}
          type="button"
          className="character-item"
          style={{ animationDelay: `${item.idx * -0.36}s` }}
          data-bot={item.bot}
          data-role={item.role}
          aria-label={`Meet ${item.bot}: ${item.role}`}
          onClick={() => onSelectBot?.(item.bot, item.role)}
        >
          <span className="character-portrait">
            <span className={`character-image ${item.className}`} />
          </span>
          <span className="character-caption">
            {item.bot}
            <small>{item.role}</small>
          </span>
        </button>
      ))}
    </div>
  );
};
