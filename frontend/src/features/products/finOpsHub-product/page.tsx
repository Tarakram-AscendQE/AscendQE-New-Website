import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  PlugZap,
  TrendingUp,
  FileText,
  Lock,
  BookOpen,
  X,
} from 'lucide-react';
import finOpsHubLogo from '@/assets/finOpsHub-assets/finopshub-logo.webp';
import {
  CAPABILITIES,
  WORKFLOW_STEPS,
  WORKFLOW_OUTPUTS,
  CONNECTOR_CATEGORIES,
  USER_ROLES,
  SECURITY_FEATURES,
  SAMPLE_RECONCILIATION,
} from './finOpsHub-data';

export const FinOpsHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f7fd] text-[#0f1b33] selection:bg-[#1257f0]/20 selection:text-[#1257f0]">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-10 sm:pt-14 lg:pt-16 pb-16 lg:pb-24 overflow-hidden border-b border-[#dde5f2] w-full block">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3f7fd] via-[#eaf0fc] to-[#e6eefb] pointer-events-none" />

        <div className="relative z-10 mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          {/* Breadcrumb & Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#5b6780]">
              <Link to="/" className="hover:text-[#1257f0] transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-[#5b6780]">Platforms</span>
              <span>›</span>
              <span className="text-[#1257f0]">FinOpsHub.Live</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[#12873a] bg-[#e7f7ec] border border-[#bbf7d0]">
              <span className="h-2 w-2 rounded-full bg-[#12873a] animate-pulse" />
              <span>Available on AscendQE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Description & Facts */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Product Logo */}
              <div className="mb-6 p-3 sm:p-4 bg-white rounded-2xl border border-[#dde5f2] shadow-sm inline-block">
                <img
                  src={finOpsHubLogo}
                  alt="FinOpsHub by AscendQE"
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                />
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#0f1b33] tracking-tight leading-[1.08] mb-6">
                Know what your software costs before the invoice does.
              </h1>

              {/* Lead Paragraph */}
              <div className="pl-4 border-l-4 border-[#1257f0] mb-8">
                <p className="text-lg sm:text-xl text-[#5b6780] leading-relaxed max-w-3xl">
                  <strong className="text-[#0f1b33] font-bold">FinOpsHub</strong> is AscendQE’s spend-intelligence
                  platform for cloud, AI and SaaS costs. It shows what you spend, who owns it, and whether every invoice
                  adds up.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                <a
                  href="https://finopshub.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#1257f0] hover:bg-[#0b3fc0] shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Sign in to FinOpsHub</span>
                  <ExternalLink className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setShowGuideModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#0f1b33] bg-white hover:bg-slate-50 border border-[#dde5f2] hover:border-[#1257f0] hover:text-[#1257f0] transition-all duration-200"
                >
                  <BookOpen className="h-4 w-4 text-[#1257f0]" />
                  <span>Read the user guide</span>
                </button>

                <Link
                  to="/start"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-[#1257f0] hover:bg-[#eff4ff] transition-colors"
                >
                  <span>Start with 100 free tests</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Facts / Key Metrics List */}
              <div className="pt-6 border-t border-[#dde5f2] w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-extrabold text-[#1257f0] leading-none mb-1.5 flex items-center gap-1.5">
                    <Clock className="h-5 w-5 text-[#1257f0]" />
                    <span>6 hrs</span>
                  </div>
                  <span className="text-xs text-[#5b6780] leading-tight block">
                    sync cycle for costs, invoices and seats
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-extrabold text-[#1257f0] leading-none mb-1.5 flex items-center gap-1.5">
                    <PlugZap className="h-5 w-5 text-[#1257f0]" />
                    <span>27</span>
                  </div>
                  <span className="text-xs text-[#5b6780] leading-tight block">
                    vendor connectors, plus CSV import
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-extrabold text-[#1257f0] leading-none mb-1.5 flex items-center gap-1.5">
                    <TrendingUp className="h-5 w-5 text-[#1257f0]" />
                    <span>80%</span>
                  </div>
                  <span className="text-xs text-[#5b6780] leading-tight block">
                    budget alert point, before the invoice
                  </span>
                </div>
              </div>

              {/* Origin Note */}
              <p className="mt-6 text-xs text-[#5b6780]">
                A product of <strong className="text-[#0f1b33]">AscendQE</strong>, built by the team that uses it to
                run its own cloud, AI and SaaS spend.
              </p>
            </div>

            {/* Right Column: Ledger Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#dde5f2] rounded-3xl p-6 sm:p-8 shadow-[0_18px_50px_rgba(18,87,240,0.12)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#5b6780]">
                    Invoices that add up
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#e8f0ff] text-[#1257f0]">
                    Live Engine
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-[#0f1b33] tracking-tight mb-4">
                  Usage = Invoice = Paid
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#dde5f2] text-xs font-semibold text-[#5b6780]">
                        <th className="py-2.5 px-2">Month</th>
                        <th className="py-2.5 px-2">Usage</th>
                        <th className="py-2.5 px-2">Invoiced</th>
                        <th className="py-2.5 px-2">Paid</th>
                        <th className="py-2.5 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dde5f2]">
                      {SAMPLE_RECONCILIATION.map((row) => {
                        let statusClasses = 'bg-[#e8f0ff] text-[#1257f0]';
                        if (row.variant === 'matched') {
                          statusClasses = 'bg-[#e7f7ec] text-[#12873a]';
                        } else if (row.variant === 'warning') {
                          statusClasses = 'bg-[#fdf0d8] text-[#8a5a00] font-semibold';
                        }

                        return (
                          <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-2 font-bold text-[#0f1b33]">{row.month}</td>
                            <td className="py-3 px-2 font-medium text-[#5b6780]">{row.usage}</td>
                            <td className="py-3 px-2 font-medium text-[#5b6780]">{row.invoiced}</td>
                            <td className="py-3 px-2 font-bold text-[#0f1b33]">{row.paid}</td>
                            <td className="py-3 px-2 text-right">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusClasses}`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-3 border-t border-[#dde5f2] flex items-center justify-between text-xs text-[#5b6780]">
                  <span>Sample figures from a 60-person company.</span>
                  <span className="font-semibold text-[#1257f0]">Automated sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHAT YOUR TEAM GETS (6 CAPABILITIES) ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="max-w-3xl mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f1b33] tracking-tight mb-3">
              What your team gets
            </h2>
            <p className="text-lg text-[#5b6780]">
              Six capabilities, one source of truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap) => {
              const IconComponent = cap.icon;
              return (
                <div
                  key={cap.id}
                  className="group relative bg-[#f8fafc] hover:bg-white border border-[#dde5f2] hover:border-[#1257f0]/40 rounded-2xl p-7 transition-all duration-200 hover:shadow-[0_12px_32px_rgba(18,87,240,0.08)] flex flex-col justify-between"
                >
                  <div>
                    <div className="h-11 w-11 rounded-xl bg-[#e8f0ff] text-[#1257f0] flex items-center justify-center font-extrabold text-base mb-5 group-hover:bg-[#1257f0] group-hover:text-white transition-colors duration-200">
                      {cap.id}
                    </div>
                    <h3 className="text-xl font-bold text-[#0f1b33] mb-2.5">
                      {cap.title}
                    </h3>
                    <p className="text-[15px] text-[#5b6780] leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#dde5f2]/60 flex items-center text-xs font-semibold text-[#1257f0] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore capability</span>
                    <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: FROM SCATTERED BILLS TO ONE ANSWER (FLOW) ── */}
      <section id="how" className="py-20 bg-[#f3f7fd]">
        <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="max-w-3xl mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f1b33] tracking-tight mb-3">
              From scattered bills to one answer
            </h2>
            <p className="text-lg text-[#5b6780]">
              Every connection flows through the same four steps.
            </p>
          </div>

          <div className="bg-white border border-[#dde5f2] rounded-3xl p-8 sm:p-12 shadow-[0_18px_50px_rgba(18,87,240,0.06)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {WORKFLOW_STEPS.map((step, idx) => (
                <div key={step.step} className="relative flex flex-col">
                  {/* Step Number Circle */}
                  <div className="h-9 w-9 rounded-full bg-[#1257f0] text-white font-extrabold flex items-center justify-center text-sm mb-4 z-10 shadow-sm">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#0f1b33] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-[#5b6780] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Outputs Pill Strip */}
            <div className="mt-10 pt-8 border-t border-[#dde5f2] flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold text-[#5b6780] uppercase tracking-wider mr-2">
                Outputs:
              </span>
              {WORKFLOW_OUTPUTS.map((out) => (
                <span
                  key={out}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1257f0] bg-[#e8f0ff] border border-[#dbe6ff]"
                >
                  {out}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: CONNECTORS (27 TOOLS) ── */}
      <section id="connectors" className="py-20 bg-white">
        <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="max-w-3xl mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f1b33] tracking-tight mb-3">
              Connected to the tools you pay for
            </h2>
            <p className="text-lg text-[#5b6780]">
              27 connectors read costs, invoices and seats straight from each vendor. Anything else comes in as a CSV.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONNECTOR_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.title}
                  className={`rounded-2xl p-6 sm:p-7 transition-all ${
                    cat.isDashed
                      ? 'border-2 border-dashed border-[#dde5f2] bg-[#fdfefe]'
                      : 'border border-[#dde5f2] bg-[#f8fafc] hover:bg-white hover:shadow-[0_10px_30px_rgba(18,87,240,0.06)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-xl font-bold text-[#0f1b33]">
                      {cat.title}
                    </h3>
                    <div className="h-8 w-8 rounded-lg bg-[#e8f0ff] text-[#1257f0] flex items-center justify-center">
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="text-xs text-[#5b6780] mb-5 font-medium">
                    {cat.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cat.chips.map((chip) => (
                      <span
                        key={chip}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#0f1b33] bg-white border border-[#dde5f2] shadow-2xs"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: WHO USES IT & DATA PROTECTION ── */}
      <section id="who" className="py-20 bg-[#f3f7fd]">
        <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="max-w-3xl mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f1b33] tracking-tight mb-3">
              Who uses it, and how it is protected
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: User Roles */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#dde5f2] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-6">
              {USER_ROLES.map((role) => {
                const RoleIcon = role.icon;
                return (
                  <div key={role.role} className="pt-4 sm:pt-0 pb-4 sm:pb-0">
                    <div className="h-9 w-9 rounded-xl bg-[#e8f0ff] text-[#1257f0] flex items-center justify-center mb-3">
                      <RoleIcon className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0f1b33] mb-1.5">
                      {role.role}
                    </h3>
                    <p className="text-sm text-[#5b6780] leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right: Dark Security Card */}
            <div className="lg:col-span-5 bg-[#14203a] text-[#eaf0ff] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-[#4ade80]">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Built for company data
                  </h3>
                </div>

                <ul className="divide-y divide-white/10">
                  {SECURITY_FEATURES.map((item) => (
                    <li key={item} className="py-3.5 flex items-start gap-3 text-sm text-[#cfdaf5]">
                      <Check className="h-4 w-4 text-[#4ade80] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#9fb0cf]">
                <span>SOC2 Compliant Architecture</span>
                <span className="font-semibold text-white">Enterprise Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FINAL CTA ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          <div className="bg-[#f8fafc] border border-[#dde5f2] rounded-3xl p-8 sm:p-14 text-center shadow-[0_18px_50px_rgba(18,87,240,0.08)] max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f1b33] tracking-tight mb-4">
              Ready when your invite arrives.
            </h2>
            <p className="text-base sm:text-lg text-[#5b6780] max-w-xl mx-auto mb-8">
              Your administrator creates your account. Sign in with that email, or read the guide first.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* <a
                href="https://finopshub.live"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#1257f0] hover:bg-[#0b3fc0] shadow-md hover:shadow-lg transition-all"
              >
                <span>Sign in</span>
                <ExternalLink className="h-4 w-4" />
              </a> */}

              <button
                type="button"
                onClick={() => setShowGuideModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#0f1b33] bg-white hover:bg-slate-50 border border-[#dde5f2] hover:border-[#1257f0] hover:text-[#1257f0] transition-all"
              >
                <BookOpen className="h-4 w-4 text-[#1257f0]" />
                <span>Read the user guide</span>
              </button>

              <Link
                to="/start"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-xl font-semibold text-[#1257f0] hover:bg-[#eff4ff] transition-colors"
              >
                <span>Start with 100 free tests</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── USER GUIDE MODAL ── */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-[#e8f0ff] text-[#1257f0] flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0f1b33]">FinOpsHub User Guide</h3>
                <p className="text-xs text-[#5b6780]">Quick reference & onboarding manual</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#5b6780] leading-relaxed">
              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#dde5f2]">
                <h4 className="font-bold text-[#0f1b33] mb-1">1. Account Invitation</h4>
                <p>
                  FinOpsHub accounts are provisioned via administrative invitation. When your organization invites
                  you, check your inbox for an activation link. Single sign-on with Google or Microsoft 365 is supported.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#dde5f2]">
                <h4 className="font-bold text-[#0f1b33] mb-1">2. Connecting Vendors</h4>
                <p>
                  Admins can connect cloud providers (AWS, Azure, GCP), AI API keys (OpenAI, Claude, Cursor), and
                  SaaS directories (Slack, Figma, Zoom) using read-only credentials.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#dde5f2]">
                <h4 className="font-bold text-[#0f1b33] mb-1">3. Automated 6-Hour Reconciliations</h4>
                <p>
                  Every 6 hours, the ledger matches current usage against issued invoices and recorded payments,
                  automatically surfacing discrepancies or tax differences.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <a
                href="https://finopshub.live"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-[#1257f0] hover:bg-[#0b3fc0] transition-colors"
              >
                Open FinOpsHub.Live
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

