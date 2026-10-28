import {
  Brain,
  Network,
  Database,
  ShieldCheck,
  Users,
  RefreshCw,
  Lock,
  User,
  ChevronsRight,
} from "lucide-react";
import { Reveal } from "@/shared";

interface DifferenceCard {
  icon: typeof Brain;
  title: string;
  desc: string;
  cardBg: string;
  iconBg: string;
  titleColor: string;
}

const DIFFERENCE_CARDS: DifferenceCard[] = [
  {
    icon: Brain,
    title: "QE-native intelligence",
    desc: "Agents and workflows designed for real QE responsibilities.",
    cardBg: "bg-blue-50/40 border-blue-100/80",
    iconBg: "bg-[#EAF1FF] text-[#145BFF]",
    titleColor: "text-[#145BFF]",
  },
  {
    icon: Network,
    title: "Enterprise Agentic orchestration",
    desc: "Multiple specialized agents collaborating across complete QE missions.",
    cardBg: "bg-emerald-50/30 border-emerald-100/80",
    iconBg: "bg-emerald-100/80 text-emerald-600",
    titleColor: "text-[#145BFF]",
  },
  {
    icon: Database,
    title: "Shared enterprise context",
    desc: "Agents reason using approved project knowledge and evidence.",
    cardBg: "bg-blue-50/40 border-blue-100/80",
    iconBg: "bg-blue-100/80 text-blue-600",
    titleColor: "text-blue-700",
  },
  {
    icon: ShieldCheck,
    title: "Governance by design",
    desc: "Roles, policies, connector controls, approvals and auditability built in.",
    cardBg: "bg-pink-50/40 border-pink-100/80",
    iconBg: "bg-pink-100/80 text-pink-600",
    titleColor: "text-pink-700",
  },
  {
    icon: Users,
    title: "Human accountability",
    desc: "HITL approvals and escalation remain part of critical decisions.",
    cardBg: "bg-indigo-50/40 border-indigo-100/80",
    iconBg: "bg-indigo-100/80 text-indigo-600",
    titleColor: "text-indigo-700",
  },
  {
    icon: RefreshCw,
    title: "Reusable digital workforce",
    desc: "Create governed agents and blueprints once and reuse across tenants and projects.",
    cardBg: "bg-blue-50/40 border-blue-100/80",
    iconBg: "bg-[#EAF1FF] text-[#145BFF]",
    titleColor: "text-[#145BFF]",
  },
];

export function StructuralDifferences() {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 text-slate-900 border-t border-slate-100">
      <div className="w-full px-6 sm:px-12 md:px-[88px] lg:px-16 xl:px-24">
        {/* Top 2-Column Split: Narrative on Left, Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading & Positioning Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#145BFF] uppercase">
                THE DIFFERENCE
              </span>
              <div className="h-[2px] w-16 bg-gradient-to-r from-[#145BFF] via-[#0ea5e9] to-transparent rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-[40px] font-bold text-[#0a1628] leading-[1.2] tracking-tight">
              Not Another AI Agent Builder.{" "}
              <span className="text-[#145BFF]">
                Built Specifically for Enterprise Quality Engineering.
              </span>
            </h2>

            <div className="aqe-paragraph space-y-4 text-slate-600">
              <p>
                myDiya is deliberately designed around{" "}
                <strong className="font-semibold text-slate-900">
                  Quality Engineering
                </strong>
                , testing, assurance and enterprise accountability.
              </p>
              <p>
                It is not an unrestricted agent marketplace, a generic
                productivity chatbot or an ungoverned prompt-and-connector
                playground.
              </p>
            </div>
          </div>

          {/* Right Column: What Makes myDiya Different */}
          <div className="lg:col-span-7 space-y-4">
            <Reveal delay={0.1}>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0a1628]">
                What makes myDiya different?
              </h3>
            </Reveal>

            {/* 6 Grid Cards (3 cols on tablet/desktop, 1 col on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {DIFFERENCE_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <Reveal key={idx} delay={0.1 + idx * 0.08} className="h-full">
                    <div
                      className={`rounded-2xl border p-4 sm:p-4.5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between h-full ${card.cardBg}`}
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl shrink-0 ${card.iconBg}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4
                            className={`font-semibold text-[14px] sm:text-[15px] leading-tight ${card.titleColor}`}
                          >
                            {card.title}
                          </h4>
                        </div>
                        <p className="mt-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Runtime Authorization Card (Full Width) */}
            <Reveal delay={0.3}>
              <div className="rounded-2xl border border-blue-100/90 bg-blue-50/40 p-4 sm:p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="p-2.5 rounded-xl bg-[#EAF1FF] text-[#145BFF] shrink-0 w-fit">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[15px] text-[#0a1628]">
                      Runtime authorization through myHelm
                    </h4>
                    <p className="mt-1 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      The workflow defines what should happen;{" "}
                      <strong className="font-semibold text-[#145BFF]">
                        myHelm determines what is actually permitted to happen
                      </strong>{" "}
                      based on project, role, data, model, tool and approval
                      policies.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Full-Width "The Difference is Simple" Comparison Card */}
        <Reveal delay={0.2}>
          <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#F8FAFF] via-white to-[#F0F5FF] border border-[#DCE5F5] p-6 sm:p-7 lg:p-8 shadow-[0_12px_36px_rgba(20,91,255,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_16px_44px_rgba(20,91,255,0.09)]">
          {/* Subtle decorative background ambient glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#145BFF]/[0.05] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#0ea5e9]/[0.05] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 sm:gap-8">
            {/* Left Kicker / Badge */}
            <div className="xl:border-r xl:border-[#DCE5F5] xl:pr-8 shrink-0 flex items-center xl:block">
              <div className="inline-flex xl:flex flex-col items-start gap-1">
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#145BFF]">
                  THE DIFFERENCE
                </span>
                <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0B1638]">
                  IS SIMPLE:
                </span>
              </div>
            </div>

            {/* Comparison Flow: Old Way -> Arrow -> myDiya Way */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_1.25fr] items-center gap-4 sm:gap-5 lg:gap-6">
              {/* Left Side: Conventional AI Tools */}
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all hover:border-slate-300 hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#0B1638] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <User className="w-6 h-6 text-slate-100" />
                </div>
                <div>
                  <span className="aqe-caption font-bold tracking-wider uppercase text-slate-400 block mb-0.5">
                    Traditional AI Tools
                  </span>
                  <p className="text-sm sm:text-[15px] font-semibold text-[#0B1638] leading-snug">
                    Most AI tools help a tester perform a task.
                  </p>
                </div>
              </div>

              {/* Center Transformation Node */}
              <div className="flex items-center justify-center py-1 md:py-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EAF1FF] border border-[#DCE5F5] text-[#145BFF] flex items-center justify-center shadow-sm transition-transform hover:scale-110">
                  <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 md:rotate-0 rotate-90" />
                </div>
              </div>

              {/* Right Side: myDiya Autonomous Platform */}
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#145BFF]/[0.08] via-[#145BFF]/[0.04] to-white border border-[#145BFF]/30 shadow-sm transition-all hover:border-[#145BFF]/50 hover:shadow-[0_8px_24px_rgba(20,91,255,0.12)]">
                {/* White small card with clearly visible group icon */}
                <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE5F5] shadow-sm flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#145BFF] stroke-[2.2]" />
                </div>
                <div>
                  <span className="aqe-caption font-extrabold tracking-wider uppercase text-[#145BFF] block mb-0.5">
                    myDiya Enterprise Platform
                  </span>
                  <p className="text-sm sm:text-[15px] text-[#263653] leading-snug">
                    myDiya helps an enterprise build and govern{" "}
                    <span className="font-bold text-[#145BFF]">
                      a digital Quality Engineering workforce.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
