import { Link } from 'react-router-dom';

export function HomeContent() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="grid">
            <div>
              <p className="eyebrow">Quality engineering for the AI era</p>
              <h1>Ready to ship? We prove it, and sign the answer.</h1>
              <p className="lede">
                Senior engineers and AI agents test your software and AI systems. Every engagement ends with one clear
                decision, ship, fix or stop, and the proof behind it.
              </p>
              <div className="actions">
                <Link className="btn" to="/start">
                  Start a Proof Sprint
                </Link>
                <Link className="tlink" to="/method">
                  How we decide →
                </Link>
              </div>
            </div>
            <div>
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
        </div>
      </section>
      <section className="band ink tight">
        <div className="wrap">
          <p className="eyebrow">One promise, in writing</p>
          <div className="promise mt24">
            <div>
              <b>15 days</b>
              <span>to a signed decision on one system</span>
            </div>
            <div>
              <b>Fixed price</b>
              <span>Custom pricing based on scope, agreed before we start</span>
            </div>
            <div>
              <b>Late? Free.</b>
              <span>If the decision is late, you don’t pay</span>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">Why now</p>
            <h2>AI changed how software is built. Testing hasn’t caught up.</h2>
          </div>
          <div className="g3">
            <div className="rule">
              <h3>More code, same reviewers</h3>
              <p>AI assistants write a growing share of code. Review and testing didn’t grow with it.</p>
            </div>
            <div className="rule">
              <h3>Software that acts</h3>
              <p>AI agents now answer customers and take actions, and they don’t give the same answer twice.</p>
            </div>
            <div className="rule">
              <h3>Counts aren’t answers</h3>
              <p>Test counts and green dashboards don’t tell a leader whether a release is safe to ship.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">What we do</p>
            <h2>Three ways we help.</h2>
          </div>
          <div className="svc">
            <Link to="/services#automation">
              <span className="for">For engineering leaders</span>
              <h3>Test automation at AI speed</h3>
              <p>
                We cover your critical customer journeys with tests that run in under 30 minutes, and check every code
                change, whoever or whatever wrote it.
              </p>
              <span className="get">
                <b>You get</b>A test suite you own, and fewer defects reaching customers.
              </span>
              <span className="p">Learn more →</span>
            </Link>
            <Link to="/services#ai">
              <span className="for">For AI, risk and product leaders</span>
              <h3>AI and agent assurance</h3>
              <p>
                Before launch, we test your AI for accuracy, safety and attacks. After launch, we check it every day.
                Your auditors get the evidence.
              </p>
              <span className="get">
                <b>You get</b>A signed go-live decision, and evidence your auditors accept.
              </span>
              <span className="p">Learn more →</span>
            </Link>
            <Link to="/services#skills">
              <span className="for">For GCC and engineering heads</span>
              <h3>AI quality skills for your team</h3>
              <p>
                Six weeks that train your engineers on your own systems. Certification needs shipped work, not a quiz.
              </p>
              <span className="get">
                <b>You get</b>Certified engineers, and working tests in your repositories.
              </span>
              <span className="p">Learn more →</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">How we decide</p>
            <h2>Define, prove, decide.</h2>
          </div>
          <div className="flow">
            {' '}
            <div>
              <p className="k">Define</p>
              <h3>Agree what “ready” means</h3>
              <p>Before any testing, we write down what ready to ship means, with limits your team signs off.</p>
            </div>{' '}
            <div>
              <p className="k">Prove</p>
              <h3>Test where the risk is</h3>
              <p>
                Our engineers and AI agents test the riskiest parts. Every result is recorded, so anyone can check it.
              </p>
            </div>{' '}
            <div>
              <p className="k">Decide</p>
              <h3>Weigh proof against limits</h3>
              <p>
                Results are compared with the limits agreed at the start. No moving targets, and every gap gets a
                specific fix.
              </p>
            </div>{' '}
            <div className="dec">
              <p className="k">The answer</p>
              <p className="vv">
                <span className="s">[Ship]</span> <span className="f">[Fix]</span> <span className="x">[Stop]</span>
              </p>
              <p>Signed by a senior reviewer who didn’t do the testing.</p>
            </div>{' '}
          </div>
          <div className="actions">
            <Link className="tlink" to="/method">
              Our method is published openly. See how we decide →
            </Link>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="aud">
            {' '}
            <div className="a1" id="gcc">
              <p className="eyebrow" style={{ color: '#9FB2FF' }}>
                For GCC leaders
              </p>
              <h3>Make your centre the place where AI‑era software is proven.</h3>{' '}
              <ul>
                <li>Train your engineers on your own systems, in six weeks</li>
                <li>Take on AI testing work from headquarters, with a method HQ can check</li>
                <li>Show your centre’s value in numbers HQ trusts</li>
              </ul>{' '}
              <p className="mt24">
                <Link to="/gcc" style={{ fontWeight: '600' }}>
                  How we work with GCCs →
                </Link>
              </p>
            </div>{' '}
            <div className="a2" id="it">
              <p className="eyebrow">For enterprise IT leaders</p>
              <h3>Take a signed decision to the board, not a test count.</h3>{' '}
              <ul>
                <li>Know whether a release or AI agent is safe before it goes live</li>
                <li>Keep testing fast as AI speeds up delivery</li>
                <li>Have evidence ready before the auditor asks</li>
              </ul>{' '}
              <p className="mt24">
                <Link to="/services" style={{ fontWeight: '600' }}>
                  What we do →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">Why AscendQE</p>
            <h2>Three reasons to trust a new firm.</h2>
          </div>
          <div className="g3">
            <div className="rule">
              <h3>We publish our method</h3>
              <p>
                How we decide if software is ready is written down as an open standard. Anyone can use it, or hold us to
                it.
              </p>
            </div>
            <div className="rule">
              <h3>We’re paid for results</h3>
              <p>Fixed prices and written guarantees, with money back when we miss. Never hourly rates.</p>
            </div>
            <div className="rule">
              <h3>We’re founder-led</h3>
              <p>Every engagement is overseen by NAG Pusuluri, Founder &amp; CEO, AscendQE. He joins every readout.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="band cobalt">
        <div className="wrap">
          <div className="split mid wide-l">
            <div>
              <h2>Start with one system.</h2>
              <p className="lede mt16">
                Pick a release or an AI system. Within 15 working days you’ll have a signed decision and a plan.
              </p>
            </div>{' '}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
              <Link className="btn" to="/start">
                Start a Proof Sprint
              </Link>
              <Link to="/method#check" style={{ fontWeight: '600' }}>
                Or check your Proof Level first →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
