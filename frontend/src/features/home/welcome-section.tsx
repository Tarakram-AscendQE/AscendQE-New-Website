import React, { useState } from 'react';
import { CREW_BOTS } from './data';
import aqShortLogo from '@/assets/brand-logos/AQ-short-logo.webp';

interface WelcomeSectionProps {
  onOpenTrailer: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onOpenTrailer }) => {
  const [crewMessage, setCrewMessage] = useState('Meet your crew. Then see them work.');

  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <div className="welcome-glow" aria-hidden="true" />
      <div className="welcome-topline">
        <span /> TEN AGENTS. ONE CONNECTED QE TEAM.
      </div>
      <h1 id="welcome-title">
        Your next release.<br />
        <em>Our entire crew.</em>
      </h1>
      <p className="welcome-sub">
        Agentic QE. Humans in the lead. From the first scenario to your next summit.
      </p>

      <div className="welcome-console">
        {/* 10 Crew Agent Avatars */}
        <div className="welcome-crew">
          {CREW_BOTS.map((item) => (
            <button
              key={item.bot}
              type="button"
              className="welcome-bot"
              style={{ ['--i' as any]: item.idx }}
              data-bot={item.bot}
              data-role={item.role}
              aria-label={`Meet ${item.bot}: ${item.role}`}
              onClick={() =>
                setCrewMessage(`${item.bot} · ${item.role} — part of your connected QE crew.`)
              }
            >
              <span className="welcome-portrait">
                <span className={`mascot ${item.className}`} />
              </span>
              <span className="bot-caption">
                {item.bot}
                <small>{item.role}</small>
              </span>
            </button>
          ))}
        </div>

        {/* Welcome Card */}
        <div className="welcome-card">
          <div className="welcome-card-top">
            <span className="welcome-spark">
              <img src={aqShortLogo} alt="AscendQE" className="welcome-spark-img" />
            </span>
            <p>
              Big ambitions?<br />
              <strong>Let’s get your QE moving.</strong>
            </p>
            <span className="crew-count">
              10 agents<br />
              <b>One mission</b>
            </span>
          </div>
          <div className="welcome-card-bottom">
            <span id="crew-message" className="text-[#203148] font-medium text-[13.5px]" aria-live="polite">
              {crewMessage}
            </span>
            <a
              className="welcome-start"
              href="#start"
              onClick={() => {
                document.querySelector('#start')?.setAttribute('tabIndex', '-1');
                (document.querySelector('#start') as HTMLElement)?.focus({ preventScroll: true });
              }}
            >
              Get started <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Under Card Actions */}
        <div className="welcome-below">
          <span>
            Your first 100 qualifying tests. <b>Automated free.</b>
          </span>
          <button id="watch-trailer" type="button" onClick={onOpenTrailer}>
            <span aria-hidden="true">▷</span> Watch the launch film <small>30 sec</small>
          </button>
        </div>
      </div>

      {/* Path Breadcrumb */}
      <div className="welcome-path" aria-hidden="true">
        <span>UNDERSTAND</span>
        <i />
        <span>CREATE</span>
        <i />
        <span>EXECUTE</span>
        <i />
        <span>ADAPT</span>
        <i />
        <span>DECIDE</span>
      </div>

      <a href="#journey" className="welcome-explore">
        Meet your mountain guides <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
};

