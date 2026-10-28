import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  MessageCircle,
  FileSearch,
  FileText,
  Globe,
  Database,
  Code2,
  ClipboardList,
  PlayCircle,
  ClipboardCheck,
  BarChart3,
  GitFork,
  Network,
  UserCheck,
  Plug,
  Bell,
  Infinity as InfinityIcon,
  Users,
} from "lucide-react";

function ApiIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l7.5 4.3v9.4L12 20.2l-7.5-4.5V6.3L12 2z" />
      <text
        x="12"
        y="13.2"
        fontSize="6.2"
        fontWeight="800"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        letterSpacing="0.4"
      >
        API
      </text>
    </svg>
  );
}

interface AgentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  theme: "teal" | "cyan";
}

const AGENTS: AgentItem[] = [
  // ── Row 1 ──
  {
    id: "chat",
    title: "Chat Agent",
    description: "Interacts with users, gathers inputs, asks clarifications and presents results.",
    icon: MessageCircle,
    theme: "teal",
  },
  {
    id: "rag",
    title: "RAG Agent",
    description: "Retrieves project/domain knowledge from approved knowledge sources.",
    icon: FileSearch,
    theme: "cyan",
  },
  {
    id: "doc-intel",
    title: "Document Intelligence Agent",
    description: "Reads requirements, specifications, test documents, policies and evidence.",
    icon: FileText,
    theme: "teal",
  },
  {
    id: "web-discovery",
    title: "Web Discovery Agent",
    description: "Crawls and understands web applications, pages, forms, elements and journeys.",
    icon: Globe,
    theme: "cyan",
  },
  {
    id: "api",
    title: "API Agent",
    description: "Discovers, invokes, validates and chains APIs.",
    icon: ApiIcon,
    theme: "teal",
  },
  {
    id: "database",
    title: "Database Agent",
    description: "Queries and validates databases and data states.",
    icon: Database,
    theme: "cyan",
  },

  // ── Row 2 ──
  {
    id: "code",
    title: "Code Agent",
    description: "Reads, generates, reviews or modifies code within governed repository access.",
    icon: Code2,
    theme: "cyan",
  },
  {
    id: "test-design",
    title: "Test Design Agent",
    description: "Converts requirements/context into scenarios, test cases and validation conditions.",
    icon: ClipboardList,
    theme: "teal",
  },
  {
    id: "test-data",
    title: "Test Data Agent",
    description: "Creates, selects, transforms or validates test data.",
    icon: Database,
    theme: "cyan",
  },
  {
    id: "execution",
    title: "Execution Agent",
    description: "Runs approved tests, jobs, scripts or external execution engines.",
    icon: PlayCircle,
    theme: "teal",
  },
  {
    id: "evaluation",
    title: "Evaluation Agent",
    description: "Scores or evaluates outputs against defined quality criteria.",
    icon: ClipboardCheck,
    theme: "cyan",
  },
  {
    id: "reporting",
    title: "Reporting & Evidence Agent",
    description: "Builds audit-ready evidence, reports, traceability and insights.",
    icon: BarChart3,
    theme: "teal",
  },

  // ── Row 3 ──
  {
    id: "routing",
    title: "Routing Agent",
    description: "Selects the right agent, blueprint or execution path based on intent.",
    icon: GitFork,
    theme: "teal",
  },
  {
    id: "orchestrator",
    title: "Orchestrator Agent",
    description: "Manages state, checkpoints, retries and multi-agent coordination.",
    icon: Network,
    theme: "cyan",
  },
  {
    id: "hitl",
    title: "Human Approval (HITL) Agent",
    description: "Manages human reviews, approvals, overrides and escalations.",
    icon: UserCheck,
    theme: "teal",
  },
  {
    id: "connector",
    title: "Tool Connector Agent",
    description: "Executes approved actions across enterprise systems (ALM, CI/CD, issue trackers, test tools).",
    icon: Plug,
    theme: "cyan",
  },
  {
    id: "notification",
    title: "Notification Agent",
    description: "Sends summaries, alerts, approval requests and execution status to enterprise channels.",
    icon: Bell,
    theme: "teal",
  },
  {
    id: "evaluator",
    title: "Quality Evaluator Agent",
    description: "Continuously assesses release readiness and enforces gating thresholds.",
    icon: ClipboardCheck,
    theme: "cyan",
  },
];

export function AgentShowcase() {
  const reduce = useReducedMotion();

  return (
    <section
      id="our-platform"
      className="relative bg-gradient-to-b from-[#f8faff] via-[#ffffff] to-[#f4f7fe] py-20 sm:py-24 lg:py-28 overflow-hidden text-[#0f172a] border-t border-slate-200/80"
    >
      {/* ── Background Atmosphere & Ambient Lighting ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-[10%] w-[550px] h-[550px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(13, 148, 136, 0.06) 0%, rgba(2, 132, 199, 0.04) 50%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-[8%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(2, 132, 199, 0.05) 0%, rgba(13, 148, 136, 0.03) 50%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-12 md:px-[88px] lg:px-16 xl:px-24">
        {/* ════════ HEADER: Title & Specialized Agents Badge ════════ */}
        <div className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex flex-col items-start text-left max-w-4xl">
            {/* Eyebrow */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs sm:text-sm font-bold tracking-[0.24em] text-[#145BFF] uppercase">
                QE AGENCY
              </span>
              <span className="h-[2px] w-14 sm:w-20 bg-gradient-to-r from-[#145BFF] via-[#0284c7] to-transparent rounded-full" />
            </motion.div>

            {/* Display Headline */}
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-[3.1rem] font-extrabold tracking-tight leading-[1.15] text-[#0f172a]"
            >
              <span>Build Your Digital QE Workforce — </span>
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(90deg, #145BFF 0%, #0284c7 50%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "#145BFF",
                }}
              >
                One Agent at a Time.
              </span>
            </motion.h2>

            {/* Sub-headline */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="aqe-paragraph mt-3.5 sm:mt-4 text-slate-600"
            >
              Pre-built, specialized agents that work together to plan, create, execute and continuously
              improve quality — with governance and control.
            </motion.p>
          </div>

          {/* Top-Right Badge: Specialized Agents */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="hidden sm:inline-flex items-center gap-3.5 self-start lg:self-end rounded-2xl border border-[#DCE5F5] bg-white/95 px-5 py-3 shadow-[0_4px_16px_rgba(15,23,42,0.06)] backdrop-blur-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1FF] text-[#145BFF] border border-[#DCE5F5] shadow-sm">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-[13px] font-bold text-[#0f172a] tracking-wide leading-tight">
                Specialized Agents.
              </span>
              <span className="text-xs sm:text-[13px] font-semibold text-[#145BFF] tracking-wide leading-tight mt-0.5">
                Real QE Outcomes.
              </span>
            </div>
          </motion.div>
        </div>

        {/* ════════ 18 AGENT CARDS GRID (6 Columns, 3 Rows) ════════ */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4.5 lg:gap-4.5 xl:gap-5">
          {AGENTS.map((agent, idx) => {
            const Icon = agent.icon;
            const isTeal = agent.theme === "teal";

            return (
              <motion.div
                key={agent.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.4) }}
                className={`group relative flex flex-col items-center text-center p-4.5 sm:p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.03] backdrop-blur-sm select-none h-full min-h-[210px] sm:min-h-[225px] justify-start bg-white/95 ${
                  isTeal
                    ? "border-[#DCE5F5] hover:border-[#145BFF] shadow-[0_4px_16px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(20,91,255,0.12)]"
                    : "border-slate-200/90 hover:border-sky-400 shadow-[0_4px_16px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.12)]"
                }`}
              >
                {/* Centered Icon Container */}
                <div
                  className={`h-12 w-12 sm:h-13 sm:w-13 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                    isTeal
                      ? "border border-[#DCE5F5] bg-[#EAF1FF] text-[#145BFF]"
                      : "border border-sky-200 bg-sky-50 text-[#0284c7]"
                  }`}
                >
                  <Icon className="h-6 w-6 sm:h-6.5 sm:w-6.5 stroke-[2.2]" />
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-[14.5px] lg:text-[15px] font-bold text-[#0f172a] leading-snug mb-2 sm:mb-2.5 min-h-[36px] sm:min-h-[40px] flex items-center justify-center group-hover:text-[#145BFF] transition-colors">
                  {agent.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[12.5px] lg:text-[13px] leading-relaxed text-slate-600 font-normal">
                  {agent.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ════════ BOTTOM BANNER: Orchestrate. Collaborate. Govern. Deliver. ════════ */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-10 sm:mt-12 rounded-full border border-slate-200/90 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-3.5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left w-full"
        >
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <InfinityIcon className="h-5 w-5 text-[#145BFF] shrink-0" />
              <span className="font-bold text-[#145BFF] tracking-wide">
                Orchestrate. Collaborate. Govern. Deliver.
              </span>
            </div>
            <span className="hidden md:inline-block text-slate-300 font-light">|</span>
            <span className="text-slate-600 font-medium">
              Turn specialized agents into a unified QE workforce with the{" "}
              <span className="text-[#0284c7] font-semibold">myDiya QE Agency</span>.
            </span>
          </div>

          {/* Status Indicator Capsule */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-[#145BFF] animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AgentShowcase;
