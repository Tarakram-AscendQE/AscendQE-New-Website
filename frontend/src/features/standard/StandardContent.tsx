import { Link } from 'react-router-dom';
import { Citation } from '@/features/standard/Citation';

export function StandardContent() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div style={{ maxWidth: '900px' }}>
            <div>
              <p className="eyebrow">Our published method · PS-1 v0.1 draft</p>
              <h1>The Proof Standard.</h1>
              <p className="lede">
                The full text of how we decide whether software and AI are ready to ship. Free to use, adapt and share
                under CC BY 4.0.
              </p>
              <div className="actions">
                <Link className="btn" to="/method">
                  Back to how we decide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="reader">
            <nav className="toc" aria-label="Contents of PS-1">
              <ol>
                <li>
                  <a href="#foreword">Foreword</a>
                </li>
                <li>
                  <a href="#principles">Principles</a>
                </li>
                <li>
                  <a href="#terms">Terms</a>
                </li>
                <li>
                  <a href="#part-1">Part 1 · Define fit to ship</a>
                </li>
                <li>
                  <a href="#part-2">Part 2 · What counts as evidence</a>
                </li>
                <li>
                  <a href="#part-3">Part 3 · Proof across the lifecycle</a>
                </li>
                <li>
                  <a href="#part-4">Part 4 · The verdict</a>
                </li>
                <li>
                  <a href="#part-5">Part 5 · The record</a>
                </li>
                <li>
                  <a href="#levels">Proof Levels 0–5</a>
                </li>
                <li>
                  <a href="#conformance">Conformance</a>
                </li>
                <li>
                  <a href="#frameworks">Other frameworks</a>
                </li>
              </ol>
            </nav>
            <article className="doc">
              <h2 id="foreword">Foreword</h2>{' '}
              <p className="lead">
                <b>
                  PS-1 rests on one rule: software is fit to ship only when every claim made about it is proven, and the
                  proof can be checked by someone who did not produce it.
                </b>{' '}
                Everything else in this standard explains how to meet that rule for software that AI helps to build and
                run.
              </p>{' '}
              <p className="mt16">
                <b>Why it exists.</b> AI now writes much of the code that companies ship, and AI agents now take actions
                inside their businesses. Testing has not kept pace. Teams report test counts, dashboards and vendor
                assurances, but none of these tells a leader whether a release is fit to ship. PS-1 replaces activity
                with evidence and ends every assessment with a decision.
              </p>{' '}
              <p className="mt16">
                <b>Who it is for.</b>
              </p>{' '}
              <ul>
                <li>
                  <b>Leaders</b> (CIOs, CTOs, GCC heads, chief risk officers) who must decide what ships and defend that
                  decision.
                </li>
                <li>
                  <b>Engineering and quality teams</b> who produce the evidence.
                </li>
                <li>
                  <b>Risk, compliance and audit teams</b> who need to follow a claim back to its proof.
                </li>
                <li>
                  <b>Suppliers</b>, who can state which level of PS-1 their work meets.
                </li>
              </ul>{' '}
              <p className="mt16">
                <b>What it covers.</b> Conventional software, software written with AI coding tools, and AI systems
                themselves: LLM features, retrieval systems and agents. It covers the path from a change being written
                to that change running in production.
              </p>{' '}
              <p className="mt16">
                <b>What it is not.</b> PS-1 is not a law, a certification scheme run by a regulator, or a replacement
                for the frameworks named in its mapping section. It sits underneath them: it says how to produce the
                evidence those frameworks ask for.
              </p>{' '}
              <p className="mt16">
                <b>How to read it.</b> The words MUST, SHOULD and MAY carry their usual meaning in standards: MUST is
                required to conform, SHOULD is expected unless there is a recorded reason not to, and MAY is optional.
                Clauses are cited as PS-1 §part.clause, for example PS-1 §4.2.
              </p>{' '}
              <p className="mt16">
                <b>Status.</b> Version 0.1, a draft for comment, published by AscendQE. PS-1 is maintained and published
                by AscendQE.
              </p>{' '}
              <p className="mt16">
                <b>Licence.</b> PS-1 is open. Anyone may use, adapt and share it, with credit, under the Creative
                Commons Attribution 4.0 licence (CC BY 4.0).
              </p>{' '}
              <p className="mt16">
                <b>How to cite.</b> The Proof Standard (PS-1), version 0.1. AscendQE, 2026. ascendqe.com/standard.
              </p>{' '}
              <h2 id="principles">Principles</h2>{' '}
              <p className="lead">
                <b>Seven principles govern every clause. When a clause is unclear, the principles decide.</b>
              </p>{' '}
              <ol>
                <li>
                  <b>Decide before you test.</b> "Fit to ship" is defined in writing, with thresholds, before any
                  evidence is gathered. A target set after the results is not a target.
                </li>
                <li>
                  <b>Every claim needs a chain.</b> A claim is proven only through an unbroken chain: Risk → Metric →
                  Test → Evidence → Verdict. A missing link means the claim is unproven, not partly proven.
                </li>
                <li>
                  <b>Evidence, not activity.</b> Test counts, hours spent and green dashboards are activity. Only
                  results tied to an agreed threshold are evidence.
                </li>
                <li>
                  <b>Uncertainty is stated, not hidden.</b> AI systems behave probabilistically. Their evidence carries
                  a sample size and a confidence level, and every report states what was not tested.
                </li>
                <li>
                  <b>The decider is independent.</b> The person who signs a verdict did not produce the evidence for it.
                </li>
                <li>
                  <b>Proof does not stop at release.</b> Systems, models and data change after launch. Evidence ages,
                  and live behaviour is part of the proof.
                </li>
                <li>
                  <b>The owner keeps the proof.</b> Evidence lives with the organisation that runs the system, in a form
                  it can read without the supplier who produced it.
                </li>
              </ol>{' '}
              <p className="mt16">
                Parts 1, 2 and 4 follow the chain from risk to verdict; Part 3 gathers the evidence at four points; Part
                5 keeps it all as one record.
              </p>{' '}
              <h2 id="terms">Terms</h2>{' '}
              <p className="lead">
                <b>Eleven terms carry precise meanings in PS-1.</b>
              </p>{' '}
              <div className="tblwrap">
                <table className="tbl stack">
                  <thead>
                    <tr>
                      <th scope="col">Term</th>
                      <th scope="col">Meaning in PS-1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-l="Term">Release</td>
                      <td data-l="Meaning in PS-1">
                        Any change put before users or customers: a software version, a model or prompt change, or a new
                        AI capability
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Term">Claim</td>
                      <td data-l="Meaning in PS-1">
                        A statement that a release meets a requirement, for example "the agent hands off to a human when
                        unsure"
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Term">Behaviour specification</td>
                      <td data-l="Meaning in PS-1">
                        The written definition of how a release must and must not behave, with thresholds (§1)
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Term">Hard gate</td>
                      <td data-l="Meaning in PS-1">A threshold that must be met for a [Ship] verdict</td>
                    </tr>
                    <tr>
                      <td data-l="Term">Watch item</td>
                      <td data-l="Meaning in PS-1">
                        A threshold that is monitored after release but does not block it
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Term">Evidence</td>
                      <td data-l="Meaning in PS-1">
                        A recorded result that shows whether a claim holds, tied to a threshold (§2)
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Term">Evidence ID</td>
                      <td data-l="Meaning in PS-1">A permanent identifier for one item of evidence, such as EV-0142</td>
                    </tr>
                    <tr>
                      <td data-l="Term">Evidence record</td>
                      <td data-l="Meaning in PS-1">
                        The organisation's collection of evidence for a system, kept over time (§5)
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Term">Verdict</td>
                      <td data-l="Meaning in PS-1">The signed decision on a release: [Ship], [Fix] or [Stop] (§4)</td>
                    </tr>
                    <tr>
                      <td data-l="Term">Signer</td>
                      <td data-l="Meaning in PS-1">
                        The accountable person who issues a verdict and was not involved in producing its evidence
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Term">Proof Level</td>
                      <td data-l="Meaning in PS-1">How mature an organisation's or a system's proof is, from 0 to 5</td>
                    </tr>
                  </tbody>
                </table>
              </div>{' '}
              <p className="mt16">
                <b>The bracket convention.</b> In PS-1 documents, a word or number in square brackets is a proven item:
                it links to its evidence. [Ship] is a verdict with evidence behind it; "ship" without brackets is an
                intention.
              </p>{' '}
              <h2 id="part-1">Part 1 · Define fit to ship</h2>{' '}
              <p className="lead">
                <b>
                  Before any testing, the organisation writes down what "fit to ship" means for this release, and who
                  decides.
                </b>{' '}
                Most failed releases were never wrong against a definition; there was no definition.
              </p>{' '}
              <p className="cl">
                <b>§1.1 Risks first.</b> The organisation MUST list the risks that matter for the release before
                choosing tests. Each risk names who could be harmed and how: customers, the business, regulators or the
                public.
              </p>{' '}
              <p className="cl">
                <b>§1.2 Behaviour specification.</b> Each release MUST have a behaviour specification that states:
              </p>{' '}
              <ul>
                <li>the tasks the release must perform;</li>
                <li>the behaviours it must never show;</li>
                <li>when it must hand off to a person;</li>
                <li>the metric and threshold that will decide each of the above.</li>
              </ul>{' '}
              <p className="cl">
                <b>§1.3 Hard gates and watch items.</b> Every threshold MUST be classed as a hard gate or a watch item
                before testing starts. A threshold MUST NOT be moved between the two classes after results are known,
                except through a recorded change approved by the signer.
              </p>{' '}
              <p className="cl">
                <b>§1.4 Quality attributes for AI systems.</b> For an AI system, the behaviour specification SHOULD
                cover seven attributes: reliability, safety, explainability, security, privacy, fairness and policy, and
                human control. An attribute left out MUST be recorded as out of scope, with the reason.
              </p>{' '}
              <p className="cl">
                <b>§1.5 Thresholds with stated confidence.</b> A threshold on probabilistic behaviour MUST state the
                rate allowed, the confidence level, and the minimum number of cases needed to support it. "The agent
                rarely hallucinates" is not a threshold; "invented facts in no more than 1% of cases, at 95% confidence"
                is.
              </p>{' '}
              <p className="cl">
                <b>§1.6 Named decider.</b> The specification MUST name the signer for the release (§4.3) and the
                business owner who accepts the residual risk.
              </p>{' '}
              <p className="cl">
                <b>§1.7 Systems you did not build.</b> When the organisation assesses a system built by a vendor,
                §1.1–§1.6 still apply. The specification describes behaviour in the organisation's context, not the
                vendor's claims.
              </p>{' '}
              <h2 id="part-2">Part 2 · What counts as evidence</h2>{' '}
              <p className="lead">
                <b>Evidence is a recorded result, tied to a threshold, that someone else can trace and reproduce.</b>{' '}
                Anything less is a statement, however confident.
              </p>{' '}
              <p className="cl">
                <b>§2.1 Traceable.</b> Every item of evidence MUST carry a permanent evidence ID and link to the claim,
                metric and threshold it supports. An ID MUST never be reused or deleted.
              </p>{' '}
              <p className="cl">
                <b>§2.2 Reproducible.</b> Evidence MUST record what is needed to rerun it: the inputs or test cases, the
                version of the system, model and prompts, the data snapshot, and the settings used.
              </p>{' '}
              <p className="cl">
                <b>§2.3 Dated and sourced.</b> Evidence MUST record when it was produced, by whom or by which tool, and
                against which version of the release.
              </p>{' '}
              <p className="cl">
                <b>§2.4 Graded by strength.</b> Each item of evidence MUST be graded:
              </p>{' '}
              <div className="tblwrap">
                <table className="tbl stack">
                  <thead>
                    <tr>
                      <th scope="col">Grade</th>
                      <th scope="col">What it is</th>
                      <th scope="col">Can it meet a hard gate?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-l="Grade">A</td>
                      <td data-l="What it is">
                        A direct measurement on this release, under conditions that represent production
                      </td>
                      <td data-l="Can it meet a hard gate?">Yes</td>
                    </tr>
                    <tr>
                      <td data-l="Grade">B</td>
                      <td data-l="What it is">
                        A direct measurement under test conditions that differ from production, or on an earlier version
                        of an unchanged component
                      </td>
                      <td data-l="Can it meet a hard gate?">Yes, with the difference recorded</td>
                    </tr>
                    <tr>
                      <td data-l="Grade">C</td>
                      <td data-l="What it is">An indirect statement: vendor claims, documents, reviews, interviews</td>
                      <td data-l="Can it meet a hard gate?">No, never on its own</td>
                    </tr>
                  </tbody>
                </table>
              </div>{' '}
              <p className="cl">
                <b>§2.5 Statistical evidence.</b> Evidence about probabilistic behaviour MUST report the number of
                cases, the observed rate, and a confidence interval calculated by a stated method. For small failure
                rates an exact method (such as Clopper–Pearson) SHOULD be used. Test cases SHOULD be drawn to represent
                real use, including its rare and hard cases.
              </p>{' '}
              <p className="cl">
                <b>§2.6 Model-graded evidence.</b> When an AI model scores outputs, its agreement with expert human
                reviewers MUST be measured on a sample and reported next to its scores. A judge whose agreement has not
                been measured produces Grade C evidence.
              </p>{' '}
              <p className="cl">
                <b>§2.7 Bad news stays.</b> Failed results MUST be kept in the record. Re-running a test until it
                passes, and keeping only the pass, breaks conformance.
              </p>{' '}
              <p className="cl">
                <b>§2.8 Evidence ages.</b> Evidence is stale once the part of the system it covers has changed. Stale
                evidence MUST NOT support a verdict.
              </p>{' '}
              <h2 id="part-3">Part 3 · Proof across the lifecycle</h2>{' '}
              <p className="lead">
                <b>
                  Proof is gathered at four points: when code is written, when journeys are tested, when AI behaviour is
                  evaluated, and while the system runs.
                </b>{' '}
                Each point feeds the same evidence record.
              </p>{' '}
              <h3>§3.1 Code</h3>{' '}
              <ul>
                <li>
                  <b>§3.1.1</b> Every change MUST pass the same automated checks before it is merged, whether a person
                  or an AI tool wrote it.
                </li>
                <li>
                  <b>§3.1.2</b> Checks SHOULD include static analysis, secret detection, dependency checks and tests on
                  the changed code. Mutation testing SHOULD be used to show the tests can catch faults.
                </li>
                <li>
                  <b>§3.1.3</b> The organisation SHOULD measure the share of changes written with AI assistance and
                  compare their defect and vulnerability rates with other changes.
                </li>
                <li>
                  <b>§3.1.4</b> The false-alarm rate of each check MUST be measured. A check that people routinely
                  ignore produces no evidence.
                </li>
              </ul>{' '}
              <h3>§3.2 Journeys</h3>{' '}
              <ul>
                <li>
                  <b>§3.2.1</b> Business-critical journeys MUST be named, each with an owner and a written list of
                  scenarios.
                </li>
                <li>
                  <b>§3.2.2</b> Coverage MUST be measured against those agreed scenarios, not against lines of code or
                  test counts.
                </li>
                <li>
                  <b>§3.2.3</b> The rate of unreliable (flaky) test results MUST be reported. A suite with a high flaky
                  rate produces Grade C evidence until it is fixed.
                </li>
                <li>
                  <b>§3.2.4</b> Tests written or repaired by AI tools MUST be reviewed and accepted by a named engineer
                  before they count as evidence.
                </li>
              </ul>{' '}
              <h3>§3.3 AI behaviour</h3>{' '}
              <ul>
                <li>
                  <b>§3.3.1</b> Each AI system MUST have an evaluation set built from its behaviour specification,
                  covering normal use, edge cases and known ways it fails.
                </li>
                <li>
                  <b>§3.3.2</b> The system MUST be tested adversarially before release: prompt injection, data leakage,
                  jailbreaks and unsafe actions, using a recognised catalogue such as the OWASP Top 10 for LLM
                  Applications.
                </li>
                <li>
                  <b>§3.3.3</b> Agents MUST be judged on whole task paths, not single answers: the tools they call, the
                  order of steps, the permissions they use, and what they do when a step fails.
                </li>
                <li>
                  <b>§3.3.4</b> Hand-offs to people MUST be tested: the agent recognises when it should stop and passes
                  the case on.
                </li>
                <li>
                  <b>§3.3.5</b> Cost and response-time limits SHOULD be part of the specification, because a runaway
                  agent is a failure even when its answers are right.
                </li>
              </ul>{' '}
              <h3>§3.4 Production</h3>{' '}
              <ul>
                <li>
                  <b>§3.4.1</b> Live behaviour MUST be sampled and scored against the same behaviour specification used
                  before release.
                </li>
                <li>
                  <b>§3.4.2</b> Changes outside the organisation's control, such as a provider's model update, MUST
                  trigger re-scoring.
                </li>
                <li>
                  <b>§3.4.3</b> Every confirmed production failure MUST become a new test or evaluation case.
                </li>
                <li>
                  <b>§3.4.4</b> Data used for monitoring SHOULD stay in the organisation's own environment.
                </li>
              </ul>{' '}
              <h2 id="part-4">Part 4 · The verdict</h2>{' '}
              <p className="lead">
                <b>Every assessment under PS-1 ends in one of three signed decisions: [Ship], [Fix] or [Stop].</b> A
                report without a verdict does not conform.
              </p>{' '}
              <p className="cl">
                <b>§4.1 The three verdicts.</b>
              </p>{' '}
              <div className="tblwrap">
                <table className="tbl stack">
                  <thead>
                    <tr>
                      <th scope="col">Verdict</th>
                      <th scope="col">When it applies</th>
                      <th scope="col">What follows</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-l="Verdict">[Ship]</td>
                      <td data-l="When it applies">
                        Every hard gate is met with Grade A or B evidence. Watch items may stay open.
                      </td>
                      <td data-l="What follows">
                        Release, with each open watch item named as a condition and monitored (§3.4)
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Verdict">[Fix]</td>
                      <td data-l="When it applies">
                        One or more hard gates are not met, and each gap has a specific fix that can be tested
                      </td>
                      <td data-l="What follows">Fix, then re-assess against the same thresholds before release</td>
                    </tr>
                    <tr>
                      <td data-l="Verdict">[Stop]</td>
                      <td data-l="When it applies">
                        A forbidden behaviour is found, a hard gate fails in a way that cannot be fixed in this release,
                        or there is not enough evidence to judge a high-risk hard gate
                      </td>
                      <td data-l="What follows">Do not release; revisit the design or the risk</td>
                    </tr>
                  </tbody>
                </table>
              </div>{' '}
              <p className="cl">
                <b>§4.2 No evidence, no [Ship].</b> Missing or stale evidence on a hard gate MUST lead to [Fix] or
                [Stop], never to [Ship].
              </p>{' '}
              <p className="cl">
                <b>§4.3 The signer.</b> The verdict MUST be signed by a named person who did not produce the evidence
                for it and who is competent in the system's risks. The signer MAY be internal or external, but MUST be
                independent of the team that built and tested the release.
              </p>{' '}
              <p className="cl">
                <b>§4.4 What a verdict contains.</b> A verdict MUST state: the decision; the release and versions
                covered; each hard gate with its result and evidence IDs; the findings; any conditions; what was not
                tested; the signer; the date; and when the verdict expires.
              </p>{' '}
              <p className="cl">
                <b>§4.5 Verdicts expire.</b> A verdict is valid until the next change to the parts it covers, or a
                stated date, whichever comes first.
              </p>{' '}
              <p className="cl">
                <b>§4.6 Overrides are recorded, not rewritten.</b> If the business decides to release despite a [Fix] or
                [Stop], a named executive MUST record that acceptance of risk. The verdict itself MUST stay as issued.
              </p>{' '}
              <p className="mt16">
                Source note: The hard gate and watch item logic follows PS-1 release-decision criteria.*
              </p>{' '}
              <h2 id="part-5">Part 5 · The record</h2>{' '}
              <p className="lead">
                <b>
                  The evidence record lets anyone follow any claim, for any system, back to its proof, today and a year
                  from now.
                </b>{' '}
                It is what an auditor, a regulator or a new leader reads.
              </p>{' '}
              <p className="cl">
                <b>§5.1 One record per system, held by its owner.</b> Each system MUST have one evidence record, held by
                the organisation that runs the system, in formats it can read without the supplier that produced the
                evidence.
              </p>{' '}
              <p className="cl">
                <b>§5.2 System card.</b> The record MUST open with a system card: purpose, business owner, versions in
                use, main risks, the behaviour specification, the current verdict and its expiry, and open watch items.
              </p>{' '}
              <p className="cl">
                <b>§5.3 Kept current.</b> The record MUST be reviewed at every release and at least every quarter. Stale
                evidence (§2.8) MUST be flagged.
              </p>{' '}
              <p className="cl">
                <b>§5.4 Mapped to obligations.</b> Where laws, regulator guidance or contracts apply, the record SHOULD
                include a control map: each requirement, the evidence IDs that meet it, and any gap. PS-1 produces
                evidence; deciding whether an obligation is met remains a matter for the organisation and its advisers.
              </p>{' '}
              <p className="cl">
                <b>§5.5 Register for leadership.</b> The organisation SHOULD keep a register of its AI systems, showing
                for each its owner, Proof Level, current verdict, value status (§5.7) and next review date.
              </p>{' '}
              <p className="cl">
                <b>§5.6 Retention.</b> Evidence MUST be kept for as long as the system is in use, and for any longer
                period that applicable rules require.
              </p>{' '}
              <p className="cl">
                <b>§5.7 Value ledger.</b> For each AI system, the record SHOULD include a value ledger, so the
                organisation can prove not only that a system is safe but that it is worth running. The ledger states:
              </p>{' '}
              <ul>
                <li>the value claimed when the system was approved: the metric, the baseline and the target;</li>
                <li>the value measured in production, with evidence IDs;</li>
                <li>the full cost of running it: compute, human oversight, incidents and rework;</li>
                <li>a decision at each review: continue, change or retire.</li>
              </ul>{' '}
              <p className="mt16">
                Value claims follow the same evidence rules as quality claims (Part 2). A benefit nobody has measured is
                a Grade C claim.
              </p>{' '}
              <h2 id="levels">Proof Levels 0–5</h2>{' '}
              <p className="lead">
                <b>
                  A system's Proof Level is the highest level at which it meets every condition of that level and of all
                  the levels below.
                </b>{' '}
                Most organisations we expect to meet sit at Level 1: they count tests but cannot prove claims.
              </p>{' '}
              <div className="tblwrap">
                <table className="tbl stack">
                  <thead>
                    <tr>
                      <th scope="col">Level</th>
                      <th scope="col">Name</th>
                      <th scope="col">What is true</th>
                      <th scope="col">How you can tell</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-l="Level">0</td>
                      <td data-l="Name">Unproven</td>
                      <td data-l="What is true">No written definition of fit to ship; testing is ad hoc</td>
                      <td data-l="How you can tell">"We tested it" is the only answer</td>
                    </tr>
                    <tr>
                      <td data-l="Level">1</td>
                      <td data-l="Name">Activity</td>
                      <td data-l="What is true">Tests run and are counted, but results are not tied to thresholds</td>
                      <td data-l="How you can tell">Status reports show test counts and pass rates</td>
                    </tr>
                    <tr>
                      <td data-l="Level">2</td>
                      <td data-l="Name">Coverage</td>
                      <td data-l="What is true">
                        Risks and critical journeys are named; a behaviour specification exists; coverage is measured
                        against agreed scenarios (§1, §3.2)
                      </td>
                      <td data-l="How you can tell">Coverage is reported per journey</td>
                    </tr>
                    <tr>
                      <td data-l="Level">3</td>
                      <td data-l="Name">Evidence</td>
                      <td data-l="What is true">
                        Every claim links to graded, reproducible evidence with an ID; AI behaviour is evaluated with
                        stated confidence (§2, §3.3)
                      </td>
                      <td data-l="How you can tell">Any claim can be traced to an evidence ID in minutes</td>
                    </tr>
                    <tr>
                      <td data-l="Level">4</td>
                      <td data-l="Name">Verdict</td>
                      <td data-l="What is true">Every release gets an independent, signed verdict that expires (§4)</td>
                      <td data-l="How you can tell">Releases carry [Ship], [Fix] or [Stop]</td>
                    </tr>
                    <tr>
                      <td data-l="Level">5</td>
                      <td data-l="Name">Continuous proof</td>
                      <td data-l="What is true">
                        Live behaviour is scored against the specification, failures become tests, and the record is
                        current and mapped to obligations (§3.4, §5)
                      </td>
                      <td data-l="How you can tell">Evidence for every live system is less than a quarter old</td>
                    </tr>
                  </tbody>
                </table>
              </div>{' '}
              <p className="mt16">
                <b>Self-check.</b> Answer yes or no for one system. The first "no" sets the level: the system sits at
                the level before that question's level.
              </p>{' '}
              <ul>
                <li>Is "fit to ship" written down, with thresholds, before testing? (Level 2)</li>
                <li>Are critical journeys named, with owners and scenarios? (Level 2)</li>
                <li>Is coverage measured against those scenarios, not against test counts? (Level 2)</li>
                <li>Does every claim in the last release report link to an evidence ID? (Level 3)</li>
                <li>Can each result be rerun from what was recorded? (Level 3)</li>
                <li>Do results on AI behaviour state sample size and confidence? (Level 3)</li>
                <li>Was the last release decided by a signed [Ship], [Fix] or [Stop]? (Level 4)</li>
                <li>Was the signer independent of the team that built and tested it? (Level 4)</li>
                <li>Is live behaviour scored against the same specification? (Level 5)</li>
                <li>Is the evidence record less than a quarter old, and mapped to the rules that apply? (Level 5)</li>
              </ul>{' '}
              <p className="mt16">
                A system that answers "no" to question 1 is at Level 1 if tests are run and counted, and at Level 0 if
                they are not.
              </p>{' '}
              <h2 id="conformance">Conformance</h2>{' '}
              <p className="lead">
                <b>Conformance is claimed per system, at a stated Proof Level, and it expires.</b> There is no such
                thing as a "PS-1 company".
              </p>{' '}
              <p className="cl">
                <b>§6.1 The form of a claim.</b> A conformance claim MUST take this form: "[System name], version [x],
                meets PS-1 v0.1 at Proof Level [n], assessed on [date] by [signer], [self-assessed or independently
                assessed]."
              </p>{' '}
              <p className="cl">
                <b>§6.2 Organisation-wide claims.</b> An organisation MAY state a Proof Level for itself only if every
                system in a stated scope meets it, and it MUST name the scope.
              </p>{' '}
              <p className="cl">
                <b>§6.3 Self-assessment is allowed, and labelled.</b> Anyone may assess a system against PS-1. A claim
                MUST say whether the assessment was made by the organisation itself or by an independent party.
              </p>{' '}
              <p className="cl">
                <b>§6.4 Supplier claims.</b> A supplier MAY state that its work meets named clauses of PS-1. It MUST
                hand the evidence for those clauses to the client (Principle 7).
              </p>{' '}
              <p className="cl">
                <b>§6.5 Claims expire.</b> A claim lapses when its verdicts or evidence expire (§4.5, §2.8), and in any
                case after twelve months.
              </p>{' '}
              <p className="cl">
                <b>§6.6 No one owns conformance.</b> Conformance does not require AscendQE or any other firm. AscendQE
                publishes PS-1 and will publish an assessment checklist, but has no special role in deciding who
                conforms.
              </p>{' '}
              <h2 id="frameworks">How PS-1 relates to other frameworks</h2>{' '}
              <p className="lead">
                <b>Most frameworks say what must be managed; PS-1 says how to prove it was.</b> It is designed to sit
                under them, so one evidence record can serve several.
              </p>{' '}
              <div className="tblwrap">
                <table className="tbl stack">
                  <thead>
                    <tr>
                      <th scope="col">Framework</th>
                      <th scope="col">What it is</th>
                      <th scope="col">Where PS-1 helps</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-l="Framework">NIST AI Risk Management Framework, with its Generative AI Profile</td>
                      <td data-l="What it is">Voluntary US framework organised as Govern, Map, Measure, Manage</td>
                      <td data-l="Where PS-1 helps">
                        Part 1 supports Map; Parts 2–3 supply Measure; Parts 3.4 and 4 support Manage; Part 5 supports
                        Govern
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Framework">ISO/IEC 42001</td>
                      <td data-l="What it is">Certifiable management system standard for AI</td>
                      <td data-l="Where PS-1 helps">
                        PS-1 supplies the operational evidence a 42001 system needs for testing, monitoring and
                        performance review
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Framework">ISO/IEC 25010</td>
                      <td data-l="What it is">Product quality model for software</td>
                      <td data-l="Where PS-1 helps">
                        Its quality characteristics can feed the behaviour specification (§1.2) for conventional
                        software
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Framework">
                        OWASP Top 10 for LLM Applications (2026) and Top 10 for Agentic Applications
                      </td>
                      <td data-l="What it is">Community catalogues of security risks for LLM and agent applications</td>
                      <td data-l="Where PS-1 helps">A recognised catalogue for adversarial testing (§3.3.2, §3.3.3)</td>
                    </tr>
                    <tr>
                      <td data-l="Framework">EU AI Act</td>
                      <td data-l="What it is">
                        EU regulation with obligations for high-risk AI systems, including risk management, technical
                        documentation, record-keeping, accuracy, robustness and human oversight
                      </td>
                      <td data-l="Where PS-1 helps">
                        The evidence record (Part 5) and verdicts (Part 4) can support technical documentation and
                        testing obligations
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Framework">NAIC model bulletin on insurers' use of AI</td>
                      <td data-l="What it is">
                        US insurance regulators' expectations for AI governance, documentation and testing, adopted by
                        many states
                      </td>
                      <td data-l="Where PS-1 helps">Control maps (§5.4) link each expectation to evidence</td>
                    </tr>
                    <tr>
                      <td data-l="Framework">Model risk management guidance for banks, such as US SR 11-7</td>
                      <td data-l="What it is">Expectations for model validation, including independent review</td>
                      <td data-l="Where PS-1 helps">
                        §4.3 independence and Part 2 evidence align with validation practice
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Framework">RBI FREE-AI framework (India, 2025)</td>
                      <td data-l="What it is">
                        The Reserve Bank of India's framework for responsible AI in the financial sector, with seven
                        principles ("Sutras") and 26 recommendations
                      </td>
                      <td data-l="Where PS-1 helps">
                        Evidence for assurance, audit and incident reporting expectations
                      </td>
                    </tr>
                    <tr>
                      <td data-l="Framework">India's Digital Personal Data Protection Act, 2023</td>
                      <td data-l="What it is">India's personal data law</td>
                      <td data-l="Where PS-1 helps">
                        Privacy evidence under §1.4 and monitoring data kept in-house under §3.4.4
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>{' '}
              <p className="mt16">
                PS-1 does not certify compliance with any of these. Each organisation decides, with its advisers,
                whether an obligation is met (§5.4).
              </p>{' '}
              <h2 id="cite">Cite</h2>
              <Citation />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
