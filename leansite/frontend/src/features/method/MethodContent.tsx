import { Link } from 'react-router-dom';
import { ProofLevelCheck } from '@/features/method/ProofLevelCheck';

export function MethodContent() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="grid">
            <div>
              <p className="eyebrow">How we decide</p>
              <h1>Three answers. Ship, fix or stop.</h1>
              <p className="lede">
                Every engagement ends in one signed decision. Here is how we reach it. Try the ten-question check to see
                where one of your systems stands today.
              </p>
              <p className="small faint mt24">No sign-up. Nothing is stored.</p>
            </div>
            <div>
              <ProofLevelCheck />
            </div>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">The three answers</p>
            <h2>Every decision is one of three.</h2>
          </div>
          <div className="g3">
            {' '}
            <div className="card">
              <p className="word mono c-ship" style={{ fontSize: '34px' }}>
                [Ship]
              </p>
              <h3 className="mt8">Ready</h3>
              <p>Every must-pass check is met. Release it, and we keep watching anything still open.</p>
            </div>{' '}
            <div className="card">
              <p className="word mono c-fix" style={{ fontSize: '34px' }}>
                [Fix]
              </p>
              <h3 className="mt8">Not yet</h3>
              <p>Something must change first. Each gap has a specific fix, and we re-test against the same limits.</p>
            </div>{' '}
            <div className="card">
              <p className="word mono c-stop" style={{ fontSize: '34px' }}>
                [Stop]
              </p>
              <h3 className="mt8">Don’t release</h3>
              <p>A behaviour that must never happen, or not enough evidence to judge. Rethink before re-testing.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="split mid">
            <div>
              <p className="eyebrow">What a decision looks like</p>
              <h2>One page. Four things on it.</h2>{' '}
              <ul className="mt24">
                <li>
                  <b>The answer</b>, and the release or system it covers.
                </li>
                <li>
                  <b>Each must-pass check</b>, its limit and the result, with a link to the proof.
                </li>
                <li>
                  <b>What wasn’t tested</b>, stated plainly.
                </li>
                <li>
                  <b>Who signed it, and when it expires</b>. A decision lasts until the next change.
                </li>
              </ul>
            </div>
            <figure className="sv" style={{ margin: '0' }} aria-label="Example release decision">
              {' '}
              <div className="top">
                <span>Release decision · Claims assistant · release 4.12</span>
                <span>Example</span>
              </div>{' '}
              <p className="word c-fix">[Fix]</p>
              <p className="sub">Three things to fix before launch. Then re-test, and ship.</p>{' '}
              <ul>
                <li>
                  <i style={{ background: 'var(--fix)' }}></i>
                  <span>Stays within policy</span>
                  <span className="r">3.1% errors · limit 1%</span>
                </li>
                <li>
                  <i style={{ background: 'var(--fix)' }}></i>
                  <span>Resists hidden instructions in documents</span>
                  <span className="r">7 of 40 got through</span>
                </li>
                <li>
                  <i style={{ background: 'var(--fix)' }}></i>
                  <span>Hands off to a person when unsure</span>
                  <span className="r">0 of 25</span>
                </li>
                <li>
                  <i style={{ background: 'var(--ship)' }}></i>
                  <span>Routes claims to the right team</span>
                  <span className="r">98.6% · limit 97%</span>
                </li>
              </ul>{' '}
              <div className="sig">
                <span>Signed by an independent reviewer</span>
                <span>18 Nov 2026</span>
              </div>
            </figure>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="head">
            <h2>Four rules we never break.</h2>
          </div>
          <div className="g4">
            <div className="rule">
              <h3>Ready is defined first</h3>
              <p>We agree what “ready to ship” means before we see any results.</p>
            </div>
            <div className="rule">
              <h3>Every claim has proof</h3>
              <p>Anyone can trace a result to its record and run it again.</p>
            </div>
            <div className="rule">
              <h3>The signer didn’t test</h3>
              <p>The person who signs never did the testing. That includes our own work.</p>
            </div>
            <div className="rule">
              <h3>Proof continues after launch</h3>
              <p>Systems, models and data change. Live behaviour is part of the proof.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="split mid">
            <div>
              <p className="eyebrow">Published openly</p>
              <h2>Our method is an open standard.</h2>{' '}
              <p className="lede mt16">
                We wrote down how we decide as PS-1, the Proof Standard, and published it for anyone to use, free. The
                standard describes how to define readiness, verify evidence and reach an independently signed decision.
              </p>{' '}
              <div className="actions">
                <Link className="btn ghost" to="/standard">
                  Read the full standard
                </Link>
              </div>
            </div>{' '}
            <div className="card">
              <p className="lab">PROOF LEVELS</p>
              <div
                role="img"
                aria-label="Proof Levels 0 to 5: Unproven, Activity, Coverage, Evidence, Verdict, Continuous"
              >
                <div className="stairs">
                  <i style={{ height: '16%', background: 'var(--line2)' }}></i>
                  <i style={{ height: '30%', background: 'var(--line2)' }}></i>
                  <i style={{ height: '46%', background: 'var(--tint2)' }}></i>
                  <i style={{ height: '62%', background: '#8EA2FF' }}></i>
                  <i style={{ height: '80%', background: '#5576FF' }}></i>
                  <i style={{ height: '100%', background: 'var(--accent)' }}></i>
                </div>
                <div className="stairs-l" aria-hidden="true">
                  <span>
                    0<span className="nm"> Unproven</span>
                  </span>
                  <span>
                    1<span className="nm"> Activity</span>
                  </span>
                  <span>
                    2<span className="nm"> Coverage</span>
                  </span>
                  <span>
                    3<span className="nm"> Evidence</span>
                  </span>
                  <span>
                    4<span className="nm"> Verdict</span>
                  </span>
                  <span>
                    5<span className="nm"> Continuous</span>
                  </span>
                </div>
              </div>
              <p className="small muted mt16">From Level 0, unproven, to Level 5, proof that continues after launch.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="band cobalt">
        <div className="wrap">
          <div className="split mid wide-l">
            <div>
              <h2>Find out what one system needs.</h2>
              <p className="lede mt16">
                A Proof Sprint gives one system a signed decision and a plan, within 15 working days.
              </p>
            </div>{' '}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
              <Link className="btn" to="/start">
                Start a Proof Sprint
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
