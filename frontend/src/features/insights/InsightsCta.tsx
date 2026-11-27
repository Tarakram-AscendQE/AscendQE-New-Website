import { Link } from 'react-router-dom';

/** Closing band of the Insights pages (same cobalt band as the About page). */
export function InsightsCta() {
  return (
    <section className="band cobalt">
      <div className="wrap">
        <div className="split mid wide-l">
          <div>
            <h2>Have a release to decide on?</h2>
            <p className="lede mt16">Start with one system. The founder joins the readout of every Proof Sprint.</p>
          </div>
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
  );
}
