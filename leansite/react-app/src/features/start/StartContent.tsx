import { ProofSprintForm } from '@/features/start/ProofSprintForm';

export function StartContent() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div style={{ maxWidth: '900px' }}>
            <div>
              <p className="eyebrow">Start a Proof Sprint</p>
              <h1>One system. One signed decision. A fixed price.</h1>
              <p className="lede">
                Pick a release, a product or an AI system. We agree what ready means, test where the risk is, and sign a
                decision with a plan for what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="band ink tight">
        <div className="wrap">
          <div className="promise">
            <div>
              <b>Custom pricing based on scope</b>
              <span>Software: one product or release, 10 working days</span>
            </div>
            <div>
              <b>Custom pricing based on scope</b>
              <span>AI system: one LLM feature or agent, 15 working days</span>
            </div>
            <div>
              <b>Late? Free.</b>
              <span>And half the fee counts toward any follow-on within 60 days</span>
            </div>
          </div>
          <p className="small mt24" style={{ opacity: '.8' }}>
            India GCC proposals are priced based on scope and invoiced in rupees. Prices exclude taxes.
          </p>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="split wide-l">
            <div className="card">
              <ProofSprintForm />{' '}
            </div>{' '}
            <div>
              <p className="eyebrow">What happens next</p>
              <h2 style={{ fontSize: 'clamp(26px,3vw,34px)' }}>From your note to a decision.</h2>{' '}
              <div className="steps mt24">
                {' '}
                <div className="step">
                  <p className="when">Within 1 business day</p>
                  <h3>We reply</h3>
                  <p>A senior reviewer reads your note and proposes a short call.</p>
                </div>{' '}
                <div className="step">
                  <p className="when">Within 48 hours</p>
                  <h3>A one-page proposal</h3>
                  <p>The system, the price, the decision date, and the access we need.</p>
                </div>{' '}
                <div className="step">
                  <p className="when">Days 1–3</p>
                  <h3>We agree what ready means</h3>
                  <p>Limits your team signs off before any testing.</p>
                </div>{' '}
                <div className="step end">
                  <p className="when">Final day</p>
                  <h3>You get the decision</h3>
                  <p>[Ship], [Fix] or [Stop], with the proof and a priced plan. The founder joins the readout.</p>
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="head">
            <h2>Common questions.</h2>
          </div>
          <div className="faq">
            <details>
              <summary>Do you need access to production?</summary>
              <p>
                No. We work in a test environment, or for AI, a non-production endpoint. We only use production data if
                you choose to share an anonymised sample.
              </p>
            </details>
            <details>
              <summary>What if the answer is Stop?</summary>
              <p>
                Then the sprint did its job early. You get the reason, and what would have to change before a re-test.
              </p>
            </details>
            <details>
              <summary>Who signs the decision?</summary>
              <p>
                A senior reviewer who didn’t run the testing. You can also name an internal signer who is independent of
                the team that built it.
              </p>
            </details>
            <details>
              <summary>What do we keep?</summary>
              <p>Everything: the tests, the evidence and the plan, in your own repositories.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
