import { Link } from 'react-router-dom';
import { DriftChart } from '@/features/services/DriftChart';

export function ServicesContent() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div style={{ maxWidth: '900px' }}>
            <div>
              <p className="eyebrow">What we do</p>
              <h1>Three services. One way of deciding.</h1>
              <p className="lede">
                Whether we’re automating tests, checking an AI agent or training your team, the work ends the same way:
                proof you can check, and a clear decision.
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
          </div>
        </div>
      </section>
      <section className="band white" id="automation">
        <div className="wrap">
          <div className="split mid">
            <div>
              <p className="eyebrow">Test automation at AI speed</p>
              <h2>Testing that keeps up with AI-speed delivery.</h2>
              <p className="lede mt16">
                AI tools mean more changes every day. Test suites get slower and noisier, and most vendors respond by
                adding testers.
              </p>{' '}
              <h3 className="mt32" style={{ fontSize: '19px' }}>
                What we do
              </h3>
              <ul className="mt8">
                <li>Agree your critical customer journeys with you</li>
                <li>AI agents write and maintain the tests; a senior engineer approves each one</li>
                <li>Check every code change, human or AI-written, before it merges</li>
              </ul>{' '}
              <h3 className="mt24" style={{ fontSize: '19px' }}>
                What you get
              </h3>
              <ul className="mt8">
                <li>Tests in your own repositories, on open-source tools</li>
                <li>A one-page report every month: coverage, speed, defects</li>
              </ul>{' '}
              <div className="card sunk mt24">
                <p className="small" style={{ color: 'var(--ink)' }}>
                  <b>Our guarantee.</b> Full regression in under 30 minutes, or 10% of that month’s fee comes back.
                </p>
              </div>
            </div>{' '}
            <div>
              <figure className="drawing" style={{ margin: '0' }}>
                <p className="cap">JOURNEY MAP · AGREED SCENARIOS COVERED · ILLUSTRATIVE</p>{' '}
                <div
                  role="img"
                  aria-label="Quote 48 of 48 scenarios covered, Onboard 36 of 36, File claim 41 of 51, Pay out 22 of 22, Renew not yet agreed."
                >
                  <div className="jrow">
                    <span>Quote</span>
                    <span className="bar">
                      <i className="ok" style={{ flex: '48' }}></i>
                    </span>
                    <span className="r">
                      <span className="c-ship">[48/48]</span>
                    </span>
                  </div>
                  <div className="jrow">
                    <span>Onboard</span>
                    <span className="bar">
                      <i className="ok" style={{ flex: '36' }}></i>
                    </span>
                    <span className="r">
                      <span className="c-ship">[36/36]</span>
                    </span>
                  </div>
                  <div className="jrow">
                    <span>File claim</span>
                    <span className="bar">
                      <i className="ok" style={{ flex: '41' }}></i>
                      <i className="gap" style={{ flex: '10' }}></i>
                    </span>
                    <span className="r">
                      <span className="c-fix">[41/51]</span>
                    </span>
                  </div>
                  <div className="jrow">
                    <span>Pay out</span>
                    <span className="bar">
                      <i className="ok" style={{ flex: '22' }}></i>
                    </span>
                    <span className="r">
                      <span className="c-ship">[22/22]</span>
                    </span>
                  </div>
                  <div className="jrow">
                    <span>Renew</span>
                    <span className="bar">
                      <i className="none" style={{ flex: '1' }}></i>
                    </span>
                    <span className="r">
                      <span className="faint">not agreed</span>
                    </span>
                  </div>
                </div>{' '}
                <p className="title">Ten claim scenarios are not covered yet, and the gap is shown, not hidden.</p>{' '}
                <p className="note">Coverage is counted against scenarios you signed off, never against test counts.</p>
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="band" id="ai">
        <div className="wrap">
          <div className="split mid">
            <div>
              <p className="eyebrow">AI and agent assurance</p>
              <h2>Know if your AI is safe to launch, and keep knowing.</h2>
              <p className="lede mt16">
                A good demo isn’t evidence. AI fails in new ways: made-up answers, hidden-instruction attacks, unsafe
                actions, and slow drift after launch.
              </p>{' '}
              <h3 className="mt32" style={{ fontSize: '19px' }}>
                What we do
              </h3>
              <ul className="mt8">
                <li>Agree limits with you before any testing</li>
                <li>Test accuracy, safety and attacks, then sign a go-live decision</li>
                <li>After launch, score live answers daily and confirm serious alerts within four hours</li>
              </ul>{' '}
              <h3 className="mt24" style={{ fontSize: '19px' }}>
                What you get
              </h3>
              <ul className="mt8">
                <li>A signed decision before each launch</li>
                <li>An evidence pack per AI system, for your auditors and your board</li>
              </ul>{' '}
              <div className="card sunk mt24">
                <p className="small" style={{ color: 'var(--ink)' }}>
                  <b>Our guarantee.</b> A decision on the agreed date, or the fee drops 20%.
                </p>
              </div>
            </div>{' '}
            <div>
              <figure className="drawing" style={{ margin: '0' }}>
                <p className="cap">DRIFT LINE · DAILY QUALITY SCORE · ILLUSTRATIVE</p> <DriftChart />{' '}
                <p className="title">A provider model update on day 19 pulled quality below the limit by day 21.</p>{' '}
                <p className="note">
                  Sentinel confirmed the alert within four hours, re-scored the system and turned the failures into new
                  tests.
                </p>
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="band white" id="skills">
        <div className="wrap">
          <div className="split mid">
            <div>
              <p className="eyebrow">AI quality skills for your team</p>
              <h2>Engineers who can test what AI builds.</h2>
              <p className="lede mt16">
                Your engineers learned to test code that people wrote. Now AI writes much of it, and agents run in
                production.
              </p>{' '}
              <h3 className="mt32" style={{ fontSize: '19px' }}>
                What we do
              </h3>
              <ul className="mt8">
                <li>Six weeks, six labs, all on your own systems</li>
                <li>Up to 20 engineers per cohort, led by the method’s author</li>
                <li>Certification on shipped work, not a quiz</li>
              </ul>{' '}
              <h3 className="mt24" style={{ fontSize: '19px' }}>
                What you get
              </h3>
              <ul className="mt8">
                <li>Certified AI quality engineers</li>
                <li>Six working assets in your repositories</li>
                <li>A before-and-after capability score for the sponsor</li>
              </ul>{' '}
              <div className="card sunk mt24">
                <p className="small" style={{ color: 'var(--ink)' }}>
                  <b>Our guarantee.</b> Your team’s capability score rises 30 points, or a repeat lab week is free.
                </p>
              </div>
            </div>{' '}
            <div>
              <div className="drawing">
                <p className="cap">SIX WEEKS · SIX LABS ON YOUR SYSTEMS</p>
                <div className="labs">
                  <div className="lab-w">
                    <span className="wk">Week 1</span>
                    <div>
                      <h4>Quality in the AI era</h4>
                    </div>
                  </div>
                  <div className="lab-w">
                    <span className="wk">Week 2</span>
                    <div>
                      <h4>Testing AI-written code</h4>
                    </div>
                  </div>
                  <div className="lab-w">
                    <span className="wk">Week 3</span>
                    <div>
                      <h4>Working with test agents</h4>
                    </div>
                  </div>
                  <div className="lab-w">
                    <span className="wk">Week 4</span>
                    <div>
                      <h4>Evaluating LLM features</h4>
                    </div>
                  </div>
                  <div className="lab-w">
                    <span className="wk">Week 5</span>
                    <div>
                      <h4>Validating agents</h4>
                    </div>
                  </div>
                  <div className="lab-w">
                    <span className="wk">Week 6</span>
                    <div>
                      <h4>Evidence and release decisions</h4>
                    </div>
                  </div>
                </div>
                <p className="title">Each week ends with something your team ships.</p>
                <p className="note">The founder opens and closes every cohort.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">How we’re paid</p>
            <h2>Priced per result, never per hour.</h2>
            <p className="lede">
              Per journey covered, per AI system, per cohort. Every service starts with a fixed-price Proof Sprint, and
              your proposal shows the exact price before you commit.
            </p>
          </div>
          <div className="actions">
            <Link className="btn" to="/start">
              See the Proof Sprint
            </Link>
          </div>
        </div>
      </section>
      <section className="band cobalt">
        <div className="wrap">
          <div className="split mid wide-l">
            <div>
              <h2>Not sure which fits?</h2>
              <p className="lede mt16">
                Start with one system. The Proof Sprint tells you what it needs, and what it would cost.
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
