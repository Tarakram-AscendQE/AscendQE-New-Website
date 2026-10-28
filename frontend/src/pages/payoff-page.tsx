import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/shared';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);

export const PayoffPage: React.FC = () => {
  const [volume, setVolume] = useState(20000);
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(30);
  const [operating, setOperating] = useState(4.99);
  const [extras, setExtras] = useState(0);
  const [years, setYears] = useState(1);

  const calc = useMemo(() => {
    const n = volume;
    const h = Math.max(0.1, hours || 0.1);
    const r = Math.max(1, rate || 1);
    const v = Math.max(0, operating || 0);
    const x = Math.max(0, extras || 0);
    const base = n * h * r * years;
    const cost = (300000 + n * v + x) * years;
    const saving = base - cost;
    const roi = ((1 - cost / base) * 100).toFixed(1) + '%';
    const deliveryBarWidth = Math.min(100, (cost / base) * 100) + '%';
    const isPositive = base >= cost;
    const valueNote = isPositive
      ? 'Positive modeled authoring benefit at these inputs. Validate the assumptions on your workload.'
      : 'At these inputs, modeled platform cost exceeds the current authoring baseline. Consider the wider scope and a managed-service quote.';

    return {
      volumeLabel: n.toLocaleString('en-US'),
      saving: money(saving),
      baseline: money(base),
      delivered: money(cost),
      roi,
      deliveryBarWidth,
      valueNote,
    };
  }, [volume, hours, rate, operating, extras, years]);

  return (
    <main>
      <section className="page-intro">
        <div className="eyebrow">YOUR VALUE</div>
        <h1>
          Your workload.<br />
          <span>Your economics.</span>
        </h1>
        <p>Model the authoring benefit. Establish the wider platform value in your evaluation.</p>
      </section>

      <section className="section value-section">
        <div className="calculator">
          <Reveal delay={0.1} className="w-full">
            <div className="inputs">
              <label htmlFor="volume" className="!text-[#0b1831] !font-semibold">
                New accepted test cases / year <output id="volume-label" className="!text-[#0b1831]">{calc.volumeLabel}</output>
              </label>
              <input
                id="volume"
                type="range"
                min="100"
                max="50000"
                step="100"
                value={volume}
                onChange={(e) => setVolume(+e.target.value)}
              />
              <div className="range-limits !text-[#475569] !font-medium">
                <span>100</span>
                <span>50,000</span>
              </div>
              <div className="number-inputs">
                <label className="!text-[#203148] !font-semibold">
                  Current hours / case
                  <input
                    id="hours"
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={hours}
                    onChange={(e) => setHours(parseFloat(e.target.value) || 0.1)}
                  />
                </label>
                <label className="!text-[#203148] !font-semibold">
                  Engineer cost / hour ($)
                  <input
                    id="rate"
                    type="number"
                    min="1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value) || 1)}
                  />
                </label>
                <label className="!text-[#203148] !font-semibold">
                  Platform operating cost / case ($)
                  <input
                    id="operating"
                    type="number"
                    min="0"
                    step="0.01"
                    value={operating}
                    onChange={(e) => setOperating(parseFloat(e.target.value) || 0)}
                  />
                </label>
                <label className="!text-[#203148] !font-semibold">
                  Other incremental costs / year ($)
                  <input
                    id="extras"
                    type="number"
                    min="0"
                    step="1000"
                    value={extras}
                    onChange={(e) => setExtras(parseFloat(e.target.value) || 0)}
                  />
                </label>
              </div>
              <div className="period" role="group" aria-label="Comparison period">
                <button
                  className={years === 1 ? 'active' : ''}
                  data-years="1"
                  aria-pressed={years === 1 ? 'true' : 'false'}
                  onClick={() => setYears(1)}
                >
                  1 year
                </button>
                <button
                  className={years === 3 ? 'active' : ''}
                  data-years="3"
                  aria-pressed={years === 3 ? 'true' : 'false'}
                  onClick={() => setYears(3)}
                >
                  3 years
                </button>
              </div>
              <p className="fine">
                {' '}$300K annual subscription. $4.99 operating cost is an editable assumption. Free pilot excluded. Other costs default to zero: enter your estimate.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25} className="w-full">
            <div className="results" aria-live="polite">
              <span className="eyebrow !text-[#334155] !font-semibold">MODELED AUTHORING NET BENEFIT</span>
              <strong id="saving">{calc.saving}</strong>
              <div className="bar-label">
                <span className="!text-[#203148] !font-medium">Current authoring baseline</span>
                <b id="baseline">{calc.baseline}</b>
              </div>
              <div className="bar baseline-bar"></div>
              <div className="bar-label">
                <span className="!text-[#203148] !font-medium">Platform + modeled operating costs</span>
                <b id="delivered">{calc.delivered}</b>
              </div>
              <div
                className="bar delivered-bar"
                id="delivery-bar"
                style={{ width: calc.deliveryBarWidth }}
              ></div>
              <div className="result-foot !text-[#334155]">
                <span>
                  <b id="roi">{calc.roi}</b> lower modeled authoring cost
                </span>
              </div>
              <p id="value-note" className="fine !text-[#475569]">
                {calc.valueNote}
              </p>
            </div>
          </Reveal>
        </div>
        <details>
          <summary>What this comparison includes</summary>
          <p>
            New accepted test cases, not repeated executions. Baseline = cases × current effort × hourly cost. Platform = annual subscription + variable operating cost + other incremental costs. Value / cost = baseline ÷ platform cost. Equivalent accepted output is assumed. Savings may represent released capacity. Execution, maintenance, setup and infrastructure must be entered in other costs unless already included in the variable assumption. This is not a measured full-lifecycle ROI claim.
          </p>
        </details>
      </section>

      <section className="closing">
        <div className="eyebrow">START WITH PROOF</div>
        <h2>
          Your first 100 test cases.<br />
          <span>Automated free.</span>
        </h2>
        <p>See the scripts. Run the tests. Measure the difference.</p>
        <Link className="button" to="/start">
          Automate my first 100 test cases
        </Link>
        <p className="fine">
          100 qualifying test cases. Agreed scope, access and acceptance criteria apply.
        </p>
      </section>
    </main>
  );
};
