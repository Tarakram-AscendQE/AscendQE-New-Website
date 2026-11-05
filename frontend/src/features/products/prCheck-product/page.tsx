import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  AlertTriangle,
  GitPullRequest,
  Shield,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  X,
  FileCheck,
  Lock,
  GitCommit,
  Scale,
  Sparkles,
  HelpCircle,
  Clock,
} from 'lucide-react';
import {
  GAP_CARDS,
  WORKFLOW_STEPS,
  FEATURES,
  ROLE_ITEMS,
  EXAMPLE_ROWS,
  INTEGRATION_CHIPS,
  SAFE_ADOPT_POINTS,
  FAQ_ITEMS,
} from './prCheck-data';

export const PRCheckPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#13233A] selection:bg-[#2A4FE0]/20 selection:text-[#2A4FE0]">
      {/* ── HERO SECTION ── */}
      <section
        id="top"
        className="relative pt-10 sm:pt-14 lg:pt-16 pb-16 lg:pb-24 border-b border-[#DFE6EF] overflow-hidden w-full block"
        style={{
          background:
            'radial-gradient(1200px 500px at 85% -10%, #E4EAFF 0%, transparent 60%), linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)',
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Live Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#6A7E95]">
              <Link to="/" className="hover:text-[#2A4FE0] transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-[#6A7E95]">Platforms</span>
              <span>›</span>
              <span className="text-[#2A4FE0]">PRCheck.live</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[#1F7A4D] bg-[#E5F4EC] border border-[#bbf7d0]">
              <span className="h-2 w-2 rounded-full bg-[#1F7A4D] animate-pulse" />
              <span>Active Assurance Gate</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Eyebrow, Heading & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Product Badge / Mark */}
              <div className="flex items-center gap-3 mb-5">
                <span className="h-10 w-10 rounded-xl bg-[#2A4FE0] text-white flex items-center justify-center font-black shadow-md shadow-[#2A4FE0]/20">
                  <Check className="h-5 w-5 stroke-[2.8]" />
                </span>
                <span className="text-2xl font-black tracking-tight text-[#0E2440]">
                  PRCheck<span className="text-[#2A4FE0]">.live</span>
                </span>
              </div>

              <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-[#2A4FE0] mb-3">
                Independent Change Assurance
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#0E2440] tracking-tight leading-[1.08] mb-6">
                Every pull request, checked against the rules that matter.
              </h1>

              <p className="text-lg sm:text-xl text-[#41556E] leading-relaxed max-w-2xl mb-8">
                PRCheck.live verifies each code change against your Finance, Security and Compliance policies, on the
                running build, before it can merge.
              </p>

              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#2A4FE0] hover:bg-[#2142C4] shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Book a demo</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('how')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#13233A] bg-white hover:bg-slate-50 border border-[#DFE6EF] hover:border-[#2A4FE0] hover:text-[#2A4FE0] transition-all duration-200"
                >
                  <span>See how it works</span>
                </button>

                <Link
                  to="/start"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-[#2A4FE0] hover:bg-[#EEF2FE] transition-colors"
                >
                  <span>Start with 100 free tests</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Pull Request Simulator Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#DFE6EF] rounded-2xl p-6 sm:p-7 shadow-[0_12px_36px_rgba(14,36,64,0.08)]">
                {/* PR Head */}
                <div className="flex items-center justify-between text-xs text-[#6A7E95] mb-5 pb-3 border-b border-[#DFE6EF]">
                  <div className="flex items-center gap-2 min-w-0">
                    <GitPullRequest className="h-4 w-4 text-[#2A4FE0] shrink-0" />
                    <b className="text-sm font-bold text-[#13233A] truncate">
                      Pull request · Supplier bank change
                    </b>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                    ae50deb
                  </span>
                </div>

                {/* Checks Container */}
                <div className="space-y-3">
                  {/* Check 1: Team tests passed */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#DFE6EF] bg-[#F7F9FC]">
                    <span className="h-7 w-7 rounded-full bg-[#1F7A4D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      <Check className="h-4 w-4 stroke-[2.6]" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#13233A]">Team tests</div>
                      <small className="text-xs text-[#6A7E95] block">26 of 26 passed</small>
                    </div>
                  </div>

                  {/* Check 2: PRCheck.live NOT READY */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl border border-[#F1C9CA] bg-[#FFF8F8]">
                    <span className="h-7 w-7 rounded-full bg-[#B4272A] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      !
                    </span>
                    <div className="min-w-0">
                      <b className="text-sm font-bold text-[#B4272A] block">
                        prcheck.live / assurance: NOT READY
                      </b>
                      <small className="text-xs text-[#6A7E95] block mt-0.5 leading-snug">
                        FIN-002: scheduled payments are not held after a bank change
                      </small>
                    </div>
                  </div>
                </div>

                {/* Merge Gate Banner */}
                <div className="mt-5 p-3.5 rounded-xl bg-[#F2F4F8] text-[#6A7E95] text-xs sm:text-sm font-bold text-center border border-dashed border-[#DFE6EF] flex items-center justify-center gap-2">
                  <Lock className="h-4 w-4 text-[#B4272A]" />
                  <span>Merging is blocked until the rule is met</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: PROBLEM (GREEN TESTS. BROKEN RULES) ── */}
      <section id="problem" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2440] tracking-tight mb-4">
              Green tests. Broken rules.
            </h2>
            <p className="text-lg text-[#41556E] leading-relaxed">
              Teams test what the story asks for. The rules your business depends on (maker-checker, data masking, audit
              trails, regulatory controls) are rarely in the story. Today they are checked in review meetings, at release,
              or by auditors months later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GAP_CARDS.map((card) => (
              <div
                key={card.title}
                className={`p-7 rounded-2xl border transition-all ${
                  card.isHighlight
                    ? 'border-[#C9D4FB] bg-[#EEF2FE] shadow-[0_10px_30px_rgba(42,79,224,0.08)]'
                    : 'border-[#DFE6EF] bg-white'
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-3 ${
                    card.isHighlight ? 'text-[#2A4FE0]' : 'text-[#0E2440]'
                  }`}
                >
                  {card.title}
                </h3>
                <p className="text-[15px] text-[#41556E] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: HOW IT WORKS (4 STEPS) ── */}
      <section id="how" className="py-20 bg-[#F7F9FC] border-t border-b border-[#DFE6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2440] tracking-tight mb-3">
              How it works
            </h2>
            <p className="text-lg text-[#41556E]">
              Set up once per application. After that, every pull request is checked automatically. Nobody has to start
              anything.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white border border-[#DFE6EF] rounded-2xl p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="h-9 w-9 rounded-xl bg-[#0E2440] text-white font-extrabold flex items-center justify-center text-sm mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#0E2440] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-[#41556E] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHY PRCHECK.LIVE (6 FEATURES) ── */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2440] tracking-tight mb-3">
              Why PRCheck.live
            </h2>
            <p className="text-lg text-[#41556E]">
              Not another test runner. An independent check that every change still obeys the rules your business, your
              auditors and your regulators care about.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat) => {
              const IconComponent = feat.icon;
              return (
                <div
                  key={feat.id}
                  className="bg-white border border-[#DFE6EF] hover:border-[#2A4FE0]/40 rounded-2xl p-7 transition-all duration-200 hover:shadow-[0_12px_32px_rgba(42,79,224,0.06)]"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#EEF2FE] text-[#2A4FE0] flex items-center justify-center mb-4">
                    <IconComponent className="h-5 w-5 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0E2440] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-[15px] text-[#41556E] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: ONE VERDICT, EVERY ROLE (5 ROLES) ── */}
      <section id="roles" className="py-20 bg-[#F7F9FC] border-t border-b border-[#DFE6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2440] tracking-tight mb-3">
              One verdict, every role
            </h2>
            <p className="text-lg text-[#41556E]">
              Each person signs in to a home built for their role, and sees only the applications they work on.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ROLE_ITEMS.map((item) => {
              const RoleIcon = item.icon;
              return (
                <div
                  key={item.role}
                  className="bg-white border border-[#DFE6EF] rounded-xl p-5 hover:border-[#2A4FE0]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-8 w-8 rounded-lg bg-[#EEF2FE] text-[#2A4FE0] flex items-center justify-center mb-3">
                      <RoleIcon className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#2A4FE0] mb-2">
                      {item.role}
                    </h3>
                    <p className="text-sm text-[#41556E] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: EXAMPLE COMPARISON (PAYMENTS APPLICATION) ── */}
      <section id="example" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2440] tracking-tight mb-3">
              See the difference on one pull request
            </h2>
            <p className="text-lg text-[#41556E]">
              A supplier bank-account change in a payments application. Six policies, fourteen rules.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto border border-[#DFE6EF] rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[#F4F7FB] border-b border-[#DFE6EF] text-xs font-bold uppercase tracking-wider text-[#6A7E95]">
                  <th className="py-3.5 px-5">Push</th>
                  <th className="py-3.5 px-5">Team tests</th>
                  <th className="py-3.5 px-5">PRCheck.live</th>
                  <th className="py-3.5 px-5">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE6EF]">
                {EXAMPLE_ROWS.map((row) => (
                  <tr key={row.commit} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-bold text-[#0E2440]">{row.commit}</td>
                    <td className="py-4 px-5">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#E5F4EC] text-[#1F7A4D]">
                        {row.teamTests}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      {row.prCheckStatus === 'READY' ? (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#E5F4EC] text-[#1F7A4D]">
                          READY
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FCEBEB] text-[#B4272A]">
                          NOT READY
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-[#41556E] leading-relaxed">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm font-bold text-[#0E2440]">
            The team’s tests were green every time. Only PRCheck.live told the commits apart.
          </p>
        </div>
      </section>

      {/* ── SECTION 6: WORKFLOW FIT & SAFE TO ADOPT ── */}
      <section className="py-20 bg-[#F7F9FC] border-t border-b border-[#DFE6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Column 1: Integrations */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E2440] tracking-tight mb-4">
                Fits the way you already work
              </h2>
              <div className="flex flex-wrap gap-2.5 my-4">
                {INTEGRATION_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="px-4 py-2 rounded-full border border-[#DFE6EF] bg-white text-sm font-semibold text-[#13233A] shadow-2xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <p className="text-[#41556E] leading-relaxed">
                Developers keep their workflow: push code, read the verdict on the pull request.
              </p>
            </div>

            {/* Column 2: Safe to Adopt Checklist */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E2440] tracking-tight mb-4">
                Safe to adopt
              </h2>
              <ul className="space-y-3">
                {SAFE_ADOPT_POINTS.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[#41556E] text-[15px]">
                    <span className="h-5 w-5 rounded-full bg-[#E5F4EC] text-[#1F7A4D] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 stroke-[2.6]" />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FAQ ── */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2440] tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#41556E]">
              Clear answers on how independent change assurance operates.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.question}
                  className="bg-white border border-[#DFE6EF] rounded-2xl p-5 sm:p-6 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left font-bold text-[#0E2440] text-base sm:text-lg focus:outline-hidden"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`h-7 w-7 rounded-full bg-[#EEF2FE] text-[#2A4FE0] flex items-center justify-center text-lg font-bold shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-[#DFE6EF] text-[#41556E] text-[15px] leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: BOOK A DEMO CTA ── */}
      <section id="demo" className="py-12 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0E2440] text-white rounded-3xl p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                See PRCheck.live on your own pull request.
              </h2>
              <p className="text-base sm:text-lg text-[#BFCCE0] leading-relaxed">
                A 30-minute walkthrough with one of your applications and a handful of its rules.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="px-7 py-3.5 rounded-xl font-bold text-[#0E2440] bg-white hover:bg-slate-100 transition-all shadow-md"
              >
                Book a demo
              </button>

              <Link
                to="/start"
                className="px-6 py-3.5 rounded-xl font-bold text-white bg-[#2A4FE0] hover:bg-[#2142C4] transition-all"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK A DEMO MODAL ── */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowDemoModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-[#EEF2FE] text-[#2A4FE0] flex items-center justify-center">
                <GitPullRequest className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0E2440]">Book a PRCheck.live Demo</h3>
                <p className="text-xs text-[#6A7E95]">30-minute walkthrough on your application</p>
              </div>
            </div>

            <p className="text-sm text-[#41556E] mb-6 leading-relaxed">
              Experience independent change assurance with your repositories, Jira, and policies. Select how you’d
              like to connect with our QE specialists:
            </p>

            <div className="space-y-3">
              <Link
                to="/start"
                onClick={() => setShowDemoModal(false)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#DFE6EF] hover:border-[#2A4FE0] hover:bg-[#EEF2FE]/40 transition-colors group"
              >
                <div className="text-left">
                  <b className="text-sm font-bold text-[#0E2440] group-hover:text-[#2A4FE0] transition-colors">
                    Start with 100 Free Tests
                  </b>
                  <p className="text-xs text-[#6A7E95]">Get started immediately via the AscendQE portal</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#2A4FE0]" />
              </Link>

              <a
                href="mailto:contact@ascendqe.com?subject=PRCheck.live%20Demo%20Request"
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#DFE6EF] hover:border-[#2A4FE0] hover:bg-[#EEF2FE]/40 transition-colors group"
              >
                <div className="text-left">
                  <b className="text-sm font-bold text-[#0E2440] group-hover:text-[#2A4FE0] transition-colors">
                    Schedule via Email
                  </b>
                  <p className="text-xs text-[#6A7E95]">Email contact@ascendqe.com directly</p>
                </div>
                <ExternalLink className="h-4 w-4 text-[#2A4FE0]" />
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-center">
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

