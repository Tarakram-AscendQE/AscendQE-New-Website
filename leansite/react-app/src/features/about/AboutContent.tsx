import nagPusuluriPhoto from '@/assets/about/nag-pusuluri.webp';
import { Link } from 'react-router-dom';

export function AboutContent() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div style={{ maxWidth: '900px' }}>
            <div>
              <p className="eyebrow">About AscendQE</p>
              <h1>A quality firm that signs its work.</h1>
              <p className="lede">
                AscendQE is a quality engineering firm for the AI era, founded in Hyderabad. We prove that software and
                AI systems are ready to ship, and keep proving it after launch.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="founder">
            <div className="portrait portrait-photo">
              <img
                alt="NAG Pusuluri, Founder and CEO of AscendQE"
                decoding="async"
                loading="lazy"
                src={nagPusuluriPhoto}
              />
            </div>{' '}
            <div>
              <p className="eyebrow">From the founder</p>
              <h2>Why I started AscendQE.</h2>{' '}
              <div className="mt24" style={{ maxWidth: '66ch' }}>
                {' '}
                <p>
                  For most of my career I watched teams answer the wrong question. Leaders asked, “Can we ship this?”
                  Teams answered with test counts and dashboards. Neither is a decision.
                </p>{' '}
                <p>
                  AI has made that gap impossible to ignore. Code is written faster than anyone can review it, and AI
                  agents now act inside businesses. What closes the gap is proof: a clear definition of ready, evidence
                  anyone can check, and someone independent willing to sign the decision.
                </p>{' '}
                <p>That is what we do. Start with one system. I’ll be in the room for the readout.</p>{' '}
                <p className="mt24" style={{ fontFamily: 'var(--f-head)', fontWeight: '600' }}>
                  NAG Pusuluri
                  <br />
                  <span className="founder-role">Founder &amp; CEO, AscendQE</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">What we hold ourselves to</p>
            <h2>Four principles.</h2>
          </div>
          <div className="g4">
            <div className="rule">
              <h3>Independent</h3>
              <p>The person who signs a decision never did the testing.</p>
            </div>
            <div className="rule">
              <h3>Open</h3>
              <p>Our method is published. You can check our work against it.</p>
            </div>
            <div className="rule">
              <h3>Yours</h3>
              <p>Tests and evidence stay in your repositories. Leave us, keep everything.</p>
            </div>
            <div className="rule">
              <h3>Accountable</h3>
              <p>Fixed prices and written guarantees. Never hourly rates.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">How we’re built</p>
            <h2>Senior engineers, AI agents, and an independent reviewer.</h2>
            <p className="lede">
              AI agents do the volume: mapping risk, writing and repairing tests, attacking systems, collecting proof.
              Senior engineers review every test an agent writes. A reviewer who wasn’t involved signs the decision.
            </p>
          </div>
        </div>
      </section>
      <section className="band cobalt">
        <div className="wrap">
          <div className="split mid wide-l">
            <div>
              <h2>Meet us over one system.</h2>
              <p className="lede mt16">The founder joins the readout of every Proof Sprint.</p>
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
