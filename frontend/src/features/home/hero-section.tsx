import React from 'react';
import { Link } from 'react-router-dom';
import aqShortLogo from '@/assets/brand-logos/AQ-short-logo.webp';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero" id="start" tabIndex={-1}>
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="mono eyebrow">
              <span className="dot" /> THE QE OPERATING SYSTEM
            </div>
            <h2
              style={{
                fontSize: 'clamp(52px, 6vw, 88px)',
                lineHeight: 0.98,
                letterSpacing: '-4px',
              }}
            >
              Better. Faster.<br />
              <em>Cheaper.</em><br />
              <span>Or free.</span>
            </h2>
            <p className="intro">
              Our challenge: #1 in speed. #1 in cost savings. #1 in quality. Put AscendQE to the
              test on your own application.
            </p>
            <div className="challenge-copy">
              <strong>Find a better solution? Our platform is free.</strong>
              <p className="aqe-caption">
                Compare the same scope, on your application. Agree the benchmark, eligibility and
                free-platform terms with us before the evaluation.
              </p>
            </div>
            <div className="actions">
              <Link className="btn" to="/start">
                See my first 100 tests automated <span className="arrow" aria-hidden="true">↗</span>
              </Link>
              <a className="text-link" href="#journey">
                Meet your mountain guides <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-note aqe-caption">Book a demo. Bring your test cases. See the proof.</p>
          </div>

          {/* Infinity Loop Interactive Graphics */}
          <div
            className="hero-art"
            role="img"
            aria-label="A connected infinity loop: AI for quality engineering and quality engineering for AI, with AscendQE at the centre."
          >
            <svg className="loop-svg" viewBox="0 0 660 410" aria-hidden="true">
              <defs>
                <linearGradient id="loopGradient" x1="0" y1="0" x2="1" y2="0.25">
                  <stop stopColor="#0758ff" />
                  <stop offset="0.45" stopColor="#2695ff" />
                  <stop offset="1" stopColor="#00b6b4" />
                </linearGradient>
              </defs>
              <path
                className="loop-track"
                d="M330 205C255 45 47 49 47 205S256 365 330 205S613 49 613 205S405 365 330 205Z"
              />
              <path
                className="loop-base"
                d="M330 205C250 70 75 70 75 205S250 340 330 205S585 70 585 205S410 340 330 205Z"
              />
              <path
                className="loop-shine"
                d="M330 198C250 63 75 63 75 198S250 333 330 198S585 63 585 198S410 333 330 198Z"
              />
              <path
                className="flow-line"
                d="M330 205C250 70 75 70 75 205S250 340 330 205S585 70 585 205S410 340 330 205Z"
              />
            </svg>
            <div className="core" aria-hidden="true">
              <img src={aqShortLogo} alt="AscendQE logo" className="core-logo" />
            </div>
            <div className="loop-caption mono">
              AI FOR<br />
              <b>QE</b>
            </div>
            <div className="loop-caption right mono">
              QE FOR<br />
              <b>AI</b>
            </div>
            <div className="floating-tag tag1">
              <i>◎</i> Understand the application
            </div>
            <div className="floating-tag tag2">
              <i>↗</i> Create. Execute. Adapt.
            </div>
            <div className="floating-tag tag3">
              <i>✓</i> Connect the evidence
            </div>
            <div className="floating-tag tag4">
              <i>◇</i> Inform the next decision
            </div>
            <div className="art-foot mono">ONE CONNECTED SYSTEM. CONTINUOUS QUALITY.</div>
          </div>
        </div>

        {/* Challenge Rank Strip */}
        <div className="rank-strip" aria-label="The AscendQE challenge">
          <div>
            <strong>#1</strong>
            <span>Speed</span>
          </div>
          <div>
            <strong>#1</strong>
            <span>Cost savings</span>
          </div>
          <div>
            <strong>#1</strong>
            <span>Quality</span>
          </div>
          <p>
            Our claim.<br />
            <b>Your benchmark.</b>
            <a href="#challenge">How the challenge works ↗</a>
          </p>
        </div>

        {/* Coverage Strip */}
        <div className="hero-bottom">
          <div className="mono">QUALITY ENGINEERING FOR EVERYTHING YOU BUILD</div>
          <div className="coverage">
            <span>Web</span>
            <span>Mobile</span>
            <span>API</span>
            <span>Enterprise</span>
            <span>AI systems</span>
          </div>
        </div>
      </div>
    </section>
  );
};

