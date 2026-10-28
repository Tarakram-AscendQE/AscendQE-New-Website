import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { STEPS, MAP_NODES, titleCase } from './data';

interface JourneySectionProps {
  isMotionPaused: boolean;
}

function Portrait({ name }: { name: string }) {
  const title = titleCase(name);
  return (
    <figure className="portrait">
      <div className="portrait-frame">
        <div className={`mascot ${name}`} role="img" aria-label={`${title} mascot`} />
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}

export const JourneySection: React.FC<JourneySectionProps> = ({ isMotionPaused }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAutoPlayedRef = useRef(false);

  // Auto-play on first scroll into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasAutoPlayedRef.current) return;

    if (!('IntersectionObserver' in window)) {
      if (!isMotionPaused) {
        setIsPlaying(true);
        hasAutoPlayedRef.current = true;
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAutoPlayedRef.current) {
          hasAutoPlayedRef.current = true;
          if (!isMotionPaused) {
            setIsPlaying(true);
          }
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [isMotionPaused]);

  // Autoplay timer for ascent (faster transition: 1.8s)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying && !isMotionPaused) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= 7) {
            setIsPlaying(false);
            return 7;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, isMotionPaused]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (activeStep === 7) {
      setActiveStep(0);
    }
    setIsPlaying(true);
  };

  return (
    <section id="journey" ref={sectionRef} className="journey section-pad">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="mono eyebrow">02 / ASCEND WITH YOUR QE CREW</div>
            <h2>
              QE maturity is a climb.<br />
              <span>Meet your guides.</span>
            </h2>
          </div>
          <p>
            Our innovative agent crew helps you ascend, one connected handoff at a time. From the
            first testing brief to the next release decision.
          </p>
        </div>

        {/* Ascent Map Visual */}
        <div
          className="ascent-map"
          role="img"
          aria-label="Eight connected checkpoints ascend a mountain, from the testing brief to continuous improvement. This is a workflow metaphor, not a maturity certification."
        >
          <div className="map-caption mono">
            THE QE ASCENT <span id="altitude">{STEPS[activeStep].checkpoint}</span>
          </div>
          <svg viewBox="0 0 1120 230" aria-hidden="true">
            <defs>
              <linearGradient id="mountainFill" x1="0" y1="1" x2="0.7" y2="0">
                <stop stopColor="#dceaff" />
                <stop offset="1" stopColor="#f5faff" />
              </linearGradient>
              <linearGradient id="routeColor">
                <stop stopColor="#0758ff" />
                <stop offset="1" stopColor="#00aead" />
              </linearGradient>
            </defs>
            <path
              d="M0 230L175 125 250 165 435 48 525 150 650 92 735 142 960 10 1120 180V230Z"
              fill="url(#mountainFill)"
            />
            <path d="M650 230L960 10 1000 95 1022 74 1120 180V230Z" fill="#d9e8f7" />
            <path d="M873 69L960 10 1000 95 966 71 945 80 934 57Z" fill="white" />
            <path d="M295 126L435 48 525 150 451 116 429 95 411 110 397 94Z" fill="white" />
            <path
              d="M65 204L201 180 337 169 473 143 609 129 745 102 881 74 1017 40"
              stroke="#c4d8ef"
              strokeWidth={3}
              fill="none"
            />
            <path
              id="ascent-route"
              d="M65 204L201 180 337 169 473 143 609 129 745 102 881 74 1017 40"
              pathLength={100}
              stroke="url(#routeColor)"
              strokeWidth={4}
              fill="none"
              strokeDasharray="100"
              style={{ strokeDashoffset: 100 - (activeStep / 7) * 100 }}
            />
            {MAP_NODES.map((node, j) => (
              <g
                key={j}
                className={`map-node ${j < activeStep ? 'passed' : ''} ${
                  j === activeStep ? 'current' : ''
                }`}
                data-node={j}
              >
                <circle cx={node.cx} cy={node.cy} r={8} />
                <text x={node.textX ?? node.cx} y={node.textY} textAnchor="middle">
                  {node.label}
                </text>
              </g>
            ))}
            <path
              d="M1017 40V7L1047 14 1017 22"
              stroke="#009ead"
              fill="#009ead"
              strokeWidth={2}
            />
          </svg>
          <div className="map-footer">
            <span>FROM FRAGMENTED WORK</span>
            <span>TO CONNECTED QUALITY ENGINEERING ↗</span>
          </div>
        </div>

        {/* Toolbar & Play/Pause */}
        <div className="journey-toolbar">
          <div className="mono">ONE CHECKOUT JOURNEY / TEN GUIDES / EIGHT HANDOFFS</div>
          <button
            id="play"
            type="button"
            className="play-btn"
            aria-pressed={isPlaying}
            onClick={togglePlay}
          >
            <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span>{' '}
            {isPlaying
              ? 'Pause ascent'
              : activeStep === 7
              ? 'Replay the ascent'
              : 'Play the ascent'}
          </button>
        </div>

        {/* Step Tabs */}
        <div className="steps" role="tablist" aria-label="QE ascent checkpoints">
          {STEPS.map((s, idx) => (
            <button
              key={idx}
              id={`step-${idx}`}
              type="button"
              className="step"
              role="tab"
              aria-selected={activeStep === idx}
              aria-controls="mission-panel"
              tabIndex={activeStep === idx ? 0 : -1}
              data-step={idx}
              onClick={() => {
                setIsPlaying(false);
                setActiveStep(idx);
              }}
              onKeyDown={(e) => {
                let n;
                if (e.key === 'ArrowRight') n = (idx + 1) % 8;
                if (e.key === 'ArrowLeft') n = (idx + 7) % 8;
                if (e.key === 'Home') n = 0;
                if (e.key === 'End') n = 7;
                if (n !== undefined) {
                  e.preventDefault();
                  setIsPlaying(false);
                  setActiveStep(n);
                }
              }}
            >
              <span>{String(idx + 1).padStart(2, '0')}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Mission Panel */}
        <div
          id="mission-panel"
          className="mission"
          role="tabpanel"
          aria-labelledby={`step-${activeStep}`}
          tabIndex={0}
        >
          <div className="mission-visual">
            <div className="mono handshake-title">THE HANDSHAKE / CONTEXT INCLUDED</div>
            <div className="handoff-scene">
              <div id="senders" className="guide-group">
                {STEPS[activeStep].actors.map((name) => (
                  <Portrait key={name} name={name} />
                ))}
              </div>
              <div className="transfer" aria-hidden="true">
                <div className="transfer-line" />
                <div className="parcel">▤</div>
                <span>→</span>
              </div>
              <div id="receivers" className="guide-group">
                {STEPS[activeStep].next.map((name) => (
                  <Portrait key={name} name={name} />
                ))}
              </div>
            </div>
            <div id="parcel-label" className="parcel-label">
              {STEPS[activeStep].parcel}
            </div>
            <p id="guide-direction" className="guide-direction">
              {STEPS[activeStep].actors.map(titleCase).join(' + ')} →{' '}
              {STEPS[activeStep].next.map(titleCase).join(' + ')}
            </p>
          </div>

          <div className="mission-content">
            <div className="mono mission-label" id="mission-label">
              {String(activeStep + 1).padStart(2, '0')} / {STEPS[activeStep].label.toUpperCase()}
            </div>
            <h3 id="mission-title">{STEPS[activeStep].title}</h3>
            <p id="mission-description">{STEPS[activeStep].description}</p>
            <div className="evidence">
              <span className="evidence-icon" aria-hidden="true">
                ↗
              </span>
              <span id="mission-evidence">{STEPS[activeStep].branch}</span>
            </div>
            <div className="handoff">
              <button
                id="previous"
                type="button"
                className="stage-nav"
                disabled={activeStep === 0}
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStep((prev) => Math.max(0, prev - 1));
                }}
              >
                ← Previous
              </button>
              <span id="mission-count">{String(activeStep + 1).padStart(2, '0')} / 08</span>
              <button
                id="next"
                type="button"
                className="stage-nav"
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStep((prev) => (prev + 1) % 8);
                }}
              >
                {activeStep === 7 ? 'Back to base camp ↻' : 'Next handoff →'}
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mission-progress" aria-hidden="true">
          <div id="progress" style={{ width: `${((activeStep + 1) / 8) * 100}%` }} />
        </div>

        <p className="journey-note">
          Illustrated agent roles and example workflow, not a live execution or a maturity
          certification. Your team retains the release decision.
        </p>

        <div className="memory-strip reveal">
          <div className="memory-icon" aria-hidden="true">
            ⌘
          </div>
          <div>
            <strong>Every handoff carries the context. Every climb builds on the last.</strong>
            <p>
              AIME, the AscendQE Intelligence and Memory Engine, connects application
              knowledge, test evidence and change intelligence.
            </p>
          </div>
          <span className="mono">SHARED CONTEXT / CONNECTED QE</span>
        </div>

        <div className="journey-demo">
          <p>
            <strong>Now imagine this crew working on your application.</strong>
            <br />
            See how your first 100 test cases can be automated.
          </p>
          <Link className="btn" to="/start">
            Book my 100-test demo <span className="arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

