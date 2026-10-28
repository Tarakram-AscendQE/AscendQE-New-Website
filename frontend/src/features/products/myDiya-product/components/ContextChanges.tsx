import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  BookOpen,
  Box,
  Code2,
  Server,
  Shield,
  BarChart3,
  Database,
  GitBranch,
  Clock,
  Search,
  Lightbulb,
  Settings,
  Play,
  FileCheck2,
  Rocket,
} from "lucide-react";

// Left Context Inputs
const LEFT_INPUTS = [
  { icon: FileText, title: "Requirements", subtitle: "& Documentation" },
  { icon: BookOpen, title: "Project Knowledge", subtitle: "& Domain Info" },
  { icon: Box, title: "Application Behaviour", subtitle: "& Test Assets" },
  { icon: Code2, title: "Repositories", subtitle: "& Source Code" },
  { icon: Server, title: "Environments", subtitle: "& Configurations" },
];

// Right Context Outputs
const RIGHT_OUTPUTS = [
  { icon: Shield, title: "Policies & Governance", subtitle: "" },
  { icon: BarChart3, title: "Previous Evidence", subtitle: "& Test Reports" },
  { icon: Database, title: "Approved Knowledge", subtitle: "Sources (RAG)" },
  { icon: GitBranch, title: "Workflow State", subtitle: "& Approvals" },
  { icon: Clock, title: "Lineage & Audit", subtitle: "Information" },
];

// 9-Step Context-Driven Pipeline
const PIPELINE_STEPS = [
  { icon: FileText, label: "Requirement Context", bg: "bg-sky-50 border-sky-200 text-sky-800" },
  { icon: Search, label: "Discovery", bg: "bg-blue-50 border-blue-200 text-blue-800" },
  { icon: Lightbulb, label: "Test Intelligence", bg: "bg-[#EAF1FF] border-[#DCE5F5] text-[#145BFF]" },
  { icon: Settings, label: "Automation", bg: "bg-emerald-50 border-emerald-200 text-emerald-800" },
  { icon: Play, label: "Execution", bg: "bg-indigo-50 border-indigo-200 text-indigo-800" },
  { icon: Play, label: "Execution", bg: "bg-purple-50 border-purple-200 text-purple-800" },
  { icon: FileCheck2, label: "Evidence", bg: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800" },
  { icon: BarChart3, label: "Evaluation", bg: "bg-pink-50 border-pink-200 text-pink-800" },
  { icon: Rocket, label: "Release Insight", bg: "bg-rose-50 border-rose-200 text-rose-800" },
];

export function ContextChanges() {
  const reduce = useReducedMotion();

  return (
    <section
      id="shared-context"
      className="relative bg-gradient-to-b from-[#f8faff] via-[#ffffff] to-[#f4f7fe] py-20 sm:py-24 lg:py-28 overflow-hidden text-[#0f172a] border-t border-slate-200/80"
    >
      {/* ── Background Subtle Ambient Lighting ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-[15%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(2, 132, 199, 0.05) 0%, rgba(168, 85, 247, 0.04) 45%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-[10%] w-[450px] h-[450px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(13, 148, 136, 0.05) 0%, rgba(2, 132, 199, 0.03) 45%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* ── Main Container: Edge-Aligned Width ── */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-[88px] lg:px-16 xl:px-24">
        
        {/* ════════ TOP SECTION: Headline (Left) & Hub Diagram (Right) ════════ */}
        <div className="grid items-center gap-10 lg:gap-12 xl:gap-14 lg:grid-cols-12">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs sm:text-sm font-bold tracking-[0.24em] text-[#145BFF] uppercase">
                SHARED CONTEXT
              </span>
              <span className="h-[2px] w-14 sm:w-20 bg-gradient-to-r from-[#145BFF] via-[#0284c7] to-transparent rounded-full" />
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[3.1rem] font-extrabold tracking-tight leading-[1.12]"
            >
              <span className="block text-[#0f172a]">Agents Work Better When</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #145BFF 0%, #0284c7 50%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "#145BFF",
                }}
              >
                They Understand the Same
              </span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #145BFF 0%, #0284c7 50%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "#0284c7",
                }}
              >
                Enterprise Reality.
              </span>
            </motion.h2>

            {/* Paragraphs */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-5 aqe-paragraph text-slate-600"
            >
              The real power of a digital QE workforce comes when agents are not operating from
              isolated prompts.
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="mt-3.5 aqe-paragraph text-slate-600"
            >
              myDiya allows agents to operate with{" "}
              <strong className="font-bold text-[#145BFF]">
                shared, governed enterprise context
              </strong>{" "}
              spanning requirements, project knowledge, domain information, application behaviour,
              test assets, repositories, environments, policies, previous evidence and approved
              knowledge sources.
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="mt-3.5 aqe-paragraph text-slate-600"
            >
              That shared context helps one agent build upon the verified output of another instead
              of repeatedly rediscovering the same information.
            </motion.p>
          </div>

          {/* Right Hub Diagram Column */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full max-w-[620px] xl:max-w-[680px] grid grid-cols-12 gap-2 sm:gap-3 items-center select-none">
              
              {/* Left 5 Inputs */}
              <div className="col-span-4 flex flex-col gap-2.5 sm:gap-3 z-10">
                {LEFT_INPUTS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={reduce ? false : { opacity: 0, x: -15 }}
                      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl border border-blue-200/90 bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(20,91,255,0.06)] group hover:border-blue-400 hover:shadow-md transition-all"
                    >
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 border border-blue-200 text-[#145BFF]">
                        <Icon className="h-4 w-4 stroke-[2.2]" />
                      </div>
                      <div className="aqe-caption leading-tight text-[#0f172a] font-semibold text-left">
                        <div>{item.title}</div>
                        {item.subtitle && <div className="text-slate-500 font-normal">{item.subtitle}</div>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center Holographic Shared Context Hub */}
              <div className="col-span-4 flex items-center justify-center relative z-20">
                {/* SVG Circuit Connectors */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" viewBox="0 0 200 320" fill="none">
                  {/* Left lines */}
                  <path d="M 0 35 C 50 35, 60 160, 100 160" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 4" />
                  <path d="M 0 95 C 40 95, 60 160, 100 160" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 4" />
                  <path d="M 0 160 L 100 160" stroke="#0284c7" strokeWidth="1.8" opacity="0.75" />
                  <path d="M 0 225 C 40 225, 60 160, 100 160" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 4" />
                  <path d="M 0 285 C 50 285, 60 160, 100 160" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 4" />
                  {/* Right lines */}
                  <path d="M 100 160 C 140 160, 150 35, 200 35" stroke="#9333ea" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 4" />
                  <path d="M 100 160 C 140 160, 160 95, 200 95" stroke="#9333ea" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 4" />
                  <path d="M 100 160 L 200 160" stroke="#9333ea" strokeWidth="1.8" opacity="0.75" />
                  <path d="M 100 160 C 140 160, 160 225, 200 225" stroke="#9333ea" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 4" />
                  <path d="M 100 160 C 140 160, 150 285, 200 285" stroke="#9333ea" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 4" />
                </svg>

                {/* 3D Stepped Disc Core */}
                <div className="relative flex flex-col items-center">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-blue-300 bg-gradient-to-b from-white via-blue-50/40 to-sky-50 shadow-[0_8px_30px_rgba(20,91,255,0.15),inset_0_0_20px_rgba(20,91,255,0.08)] flex flex-col items-center justify-center p-3 text-center">
                    <Database className="h-6 w-6 sm:h-7 sm:w-7 text-[#145BFF] mb-1" />
                    <span className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Shared</span>
                    <span className="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight">Context</span>
                    <span className="mt-1 text-[7.5px] sm:text-[8.5px] font-medium text-slate-500 tracking-tight leading-tight">
                      Enterprise Knowledge &amp; Intelligence
                    </span>
                  </div>
                  {/* Purple glow bottom tier rim */}
                  <div className="w-36 sm:w-42 h-6 rounded-[100%] bg-gradient-to-b from-purple-200/60 via-indigo-100/40 to-transparent -mt-3.5 -z-10 blur-[2px]" />
                </div>
              </div>

              {/* Right 5 Outputs */}
              <div className="col-span-4 flex flex-col gap-2.5 sm:gap-3 z-10">
                {RIGHT_OUTPUTS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={reduce ? false : { opacity: 0, x: 15 }}
                      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl border border-purple-200/90 bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(147,51,234,0.06)] group hover:border-purple-400 hover:shadow-md transition-all"
                    >
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 border border-purple-200 text-[#9333ea]">
                        <Icon className="h-4 w-4 stroke-[2.2]" />
                      </div>
                      <div className="aqe-caption leading-tight text-[#0f172a] font-semibold text-left">
                        <div>{item.title}</div>
                        {item.subtitle && <div className="text-slate-500 font-normal">{item.subtitle}</div>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* ════════ BOTTOM SECTION: Context-Driven QE Workflow Pipeline ════════ */}
        <div className="mt-14 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-200/90 w-full flex flex-col items-center text-center">
          
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="h-px w-6 sm:w-10 bg-[#145BFF]/40" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#145BFF] uppercase">
              A CONTEXT-DRIVEN QE WORKFLOW
            </span>
            <span className="h-px w-6 sm:w-10 bg-[#145BFF]/40" />
          </div>

          {/* 9-Step Pipeline Chevrons */}
          <div className="mt-6 w-full flex flex-wrap lg:flex-nowrap items-center justify-center gap-1.5 sm:gap-2">
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border ${step.bg} shadow-sm backdrop-blur-md transition-transform duration-200 hover:scale-105 shrink-0`}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-[10.5px] sm:text-xs font-bold whitespace-nowrap">
                      {step.label}
                    </span>
                  </div>
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <span className="hidden lg:inline text-[#145BFF]/60 font-bold text-xs select-none">
                      →
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bottom Narrative Description */}
          <p className="mt-6 sm:mt-7 max-w-4xl text-xs sm:text-[13.5px] lg:text-[14.5px] text-slate-600 leading-relaxed font-normal">
            Project knowledge and agent-specific retrieval can be maintained through governed RAG, while
            documents, workflow artefacts, screenshots, traces, reports and evidence become part of
            the shared technical foundation. The platform also maintains workflow state, policies,
            approvals, lineage and audit information.
          </p>

          {/* Bottom Callout */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg font-bold text-[#7c3aed] tracking-tight">
            One context. Multiple specialists. Continuous Quality Intelligence.
          </p>

        </div>

      </div>
    </section>
  );
}

export default ContextChanges;
