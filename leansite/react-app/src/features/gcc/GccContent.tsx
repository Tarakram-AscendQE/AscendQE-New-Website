import { Link } from 'react-router-dom';

export function GccContent() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="grid">
            <div>
              <p className="eyebrow">For GCC leaders</p>
              <h1>Make your centre the place where AI‑era software is proven.</h1>
              <p className="lede">
                Headquarters is asking every global capability centre what it will own in the AI era. Proving that
                AI-built software is ready to ship is a strong answer, if your centre can do it, and show it.
              </p>
              <div className="actions">
                <Link className="btn" to="/start">
                  Book a free executive briefing
                </Link>
                <Link className="tlink" to="/services#skills">
                  See the six-week programme →
                </Link>
              </div>
            </div>
            <div>
              <figure className="drawing" style={{ margin: '0' }}>
                <p className="cap">VALUE LEDGER · CLAIMS INTAKE AGENT · Q3 REVIEW · ILLUSTRATIVE</p>{' '}
                <div className="vl-row">
                  <div className="h">
                    <span>Claims handled without a person</span>
                    <span className="mono">[38% → 52%]</span>
                  </div>
                  <div className="vl-bar">
                    <i style={{ width: '52%' }}></i>
                  </div>
                  <p className="tiny faint mt8">target 60%</p>
                </div>
                <div className="vl-row">
                  <div className="h">
                    <span>Average handling time</span>
                    <span className="mono">[9.5 → 6.1 min]</span>
                  </div>
                  <div className="vl-bar">
                    <i style={{ width: '64%' }}></i>
                  </div>
                  <p className="tiny faint mt8">target 6.0 min</p>
                </div>
                <div className="vl-row">
                  <div className="h">
                    <span>Full monthly cost</span>
                    <span className="mono">[Custom pricing based on scope]</span>
                  </div>
                  <p className="tiny faint mt8">compute, oversight, rework</p>
                </div>{' '}
                <div className="vl-dec">
                  <span className="tag hu">Continue</span>
                  <span className="tag fix">Change</span>
                  <span className="tag hu">Retire</span>
                </div>{' '}
                <p className="title">
                  Value is real but short of target. Decision: change, then re-measure next quarter.
                </p>{' '}
                <p className="note">Claimed value, measured value and full cost, each tied to evidence.</p>
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="band ink">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">What headquarters is asking</p>
            <h2>Three questions every GCC head hears now.</h2>
          </div>
          <div className="g3">
            <div className="rule">
              <h3>“Can the centre own AI work, not just deliver tickets?”</h3>
              <p>Testing AI systems is new, high-value work. Few centres can do it yet.</p>
            </div>
            <div className="rule">
              <h3>“Can it prove its value in numbers?”</h3>
              <p>Headcount and hours don’t make the case. Measured outcomes do.</p>
            </div>
            <div className="rule">
              <h3>“Will it keep up as AI changes the work?”</h3>
              <p>Skills built for manual and scripted testing won’t carry the next five years.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">How we work with GCCs</p>
            <h2>Train, prove, then own it.</h2>
          </div>
          <div className="flow">
            {' '}
            <div>
              <p className="k">Train · 6 weeks</p>
              <h3>Build the skills</h3>
              <p>A cohort of up to 20 engineers learns to test AI-written code and AI agents, on your own systems.</p>
            </div>{' '}
            <div>
              <p className="k">Prove · 15 days</p>
              <h3>Win the first proof</h3>
              <p>
                A Proof Sprint on one headquarters system, run with your team, ends in a signed decision HQ can read.
              </p>
            </div>{' '}
            <div>
              <p className="k">Own · ongoing</p>
              <h3>Run it as yours</h3>
              <p>
                Your team runs the method. We add senior review, AI agents and independent sign-off, priced per result.
              </p>
            </div>{' '}
            <div className="dec">
              <p className="k">The result</p>
              <p className="vv" style={{ fontSize: '18px' }}>
                Your centre, proven
              </p>
              <p>New work, owned skills, and a record of value HQ trusts.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="split mid">
            <div>
              <p className="eyebrow">Show your value to headquarters</p>
              <h2>A one-page record HQ can trust.</h2>{' '}
              <p className="lede mt16">
                For every system your centre tests, a short record shows what was promised, what was measured, and what
                it cost. It turns “we did the work” into “here is what it was worth”.
              </p>
            </div>
            <div
              role="img"
              aria-label="Proof Levels 0 to 5: Unproven, Activity, Coverage, Evidence, Verdict, Continuous"
            >
              <div className="stairs">
                <i style={{ height: '16%' }} className="past"></i>
                <i style={{ height: '30%' }} className="past"></i>
                <i style={{ height: '46%' }} className="past"></i>
                <i style={{ height: '62%' }} className="on"></i>
                <i style={{ height: '80%' }} className=""></i>
                <i style={{ height: '100%' }} className=""></i>
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
            <p className="small muted mt16">
              Most centres start at Level 1: tests are counted, not proven. Our work takes one system at a time to Level
              4 or 5.
            </p>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">Working with us in India</p>
            <h2>Local, in rupees, in your time zone.</h2>
          </div>
          <div className="g3">
            <div className="card">
              <h3>Pricing in rupees</h3>
              <p>
                Custom pricing based on scope, invoiced in rupees for India GCC engagements. Up to 20 engineers per
                cohort.
              </p>
            </div>
            <div className="card">
              <h3>Based in Hyderabad</h3>
              <p>Close to the centres we serve, with readouts timed for headquarters in the US and Europe.</p>
            </div>
            <div className="card">
              <h3>Everything stays yours</h3>
              <p>Tests, eval sets and evidence live in your repositories, on open-source tools.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="band cobalt">
        <div className="wrap">
          <div className="split mid wide-l">
            <div>
              <h2>Start with a free briefing for your leadership team.</h2>
              <p className="lede mt16">
                Half a day on what AI changes for your centre, and a one-page readout you can share with HQ.
              </p>
            </div>{' '}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
              <Link className="btn" to="/start">
                Book a free executive briefing
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
