import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MODES } from './data';

export const AiModesSection: React.FC = () => {
  const [mode, setMode] = useState<'qe' | 'ai'>('qe');

  return (
    <section id="ai" className="ai-section section-pad">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="mono eyebrow">03 / BOTH SIDES OF THE AI EQUATION</div>
            <h2>
              AI for QE.<br />
              <span>QE for AI.</span>
            </h2>
          </div>
          <p>
            Use AI to run quality engineering. Bring quality engineering to the AI applications your
            teams are shipping.
          </p>
        </div>

        {/* Mode Switch Tablist */}
        <div className="mode-switch" role="tablist" aria-label="Explore AI and QE">
          <button
            id="mode-qe"
            type="button"
            role="tab"
            aria-selected={mode === 'qe'}
            aria-controls="ai-panel"
            tabIndex={mode === 'qe' ? 0 : -1}
            data-mode="qe"
            onClick={() => setMode('qe')}
            onKeyDown={(e) => {
              if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                e.preventDefault();
                setMode(e.key === 'Home' ? 'qe' : e.key === 'End' ? 'ai' : mode === 'qe' ? 'ai' : 'qe');
              }
            }}
          >
            AI for QE
          </button>
          <button
            id="mode-ai"
            type="button"
            role="tab"
            aria-selected={mode === 'ai'}
            aria-controls="ai-panel"
            tabIndex={mode === 'ai' ? 0 : -1}
            data-mode="ai"
            onClick={() => setMode('ai')}
            onKeyDown={(e) => {
              if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                e.preventDefault();
                setMode(e.key === 'Home' ? 'qe' : e.key === 'End' ? 'ai' : mode === 'qe' ? 'ai' : 'qe');
              }
            }}
          >
            QE for AI
          </button>
        </div>

        {/* Active Mode Panel */}
        <div id="ai-panel" className="ai-layout" role="tabpanel" aria-labelledby={`mode-${mode}`}>
          <div className="ai-copy">
            <h3 id="ai-title">{MODES[mode].title}</h3>
            <p id="ai-description">{MODES[mode].description}</p>
            <ul className="checks" id="ai-checks">
              {MODES[mode].checks.map((chk, i) => (
                <li key={i}>{chk}</li>
              ))}
            </ul>
            <Link className="text-link" to="/start">
              See it on your application <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="ai-console">
            <div className="console-top">
              <span>ASCENDQE / QE WORKSPACE</span>
              <b>CONNECTED</b>
            </div>
            <div className="console-title" id="console-title">
              {MODES[mode].mission}
            </div>
            <div id="console-rows">
              {MODES[mode].rows.map(([label, status], i) => (
                <div key={i} className="console-row">
                  <span />
                  {label}
                  <em>{status}</em>
                </div>
              ))}
            </div>
            <div className="console-footer">Illustrative workflow · Review gates stay visible.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

