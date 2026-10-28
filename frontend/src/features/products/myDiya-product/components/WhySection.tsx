import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Link2,
  Brain,
  Code2,
  Settings,
  Shield,
  Users,
} from "lucide-react";

interface CapabilityCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgClass: string;
  borderClass: string;
  iconColor: string;
  shadowClass: string;
}

const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    id: "connects",
    icon: Link2,
    title: "Connects",
    description: "Tools, teams, data and workflows",
    bgClass: "bg-[#f0f7ff] hover:bg-[#e4f1fe]",
    borderClass: "border-[#dbeafe]",
    iconColor: "text-[#2563eb]",
    shadowClass: "shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.12)]",
  },
  {
    id: "reasons",
    icon: Brain,
    title: "Reasons",
    description: "Across requirements, code, domain knowledge and defects",
    bgClass: "bg-[#ecfeff] hover:bg-[#cffafe]",
    borderClass: "border-[#a5f3fc]",
    iconColor: "text-[#0891b2]",
    shadowClass: "shadow-[0_4px_20px_rgba(8,145,178,0.06)] hover:shadow-[0_8px_25px_rgba(8,145,178,0.12)]",
  },
  {
    id: "generates",
    icon: Code2,
    title: "Generates & Executes",
    description: "Intelligent tests across the lifecycle",
    bgClass: "bg-[#F5F8FF] hover:bg-[#EAF1FF]",
    borderClass: "border-[#DCE5F5]",
    iconColor: "text-[#145BFF]",
    shadowClass: "shadow-[0_4px_20px_rgba(20,91,255,0.06)] hover:shadow-[0_8px_25px_rgba(20,91,255,0.12)]",
  },
  {
    id: "heals",
    icon: Settings,
    title: "Heals & Learns",
    description: "Detects failures, repairs and improves continuously",
    bgClass: "bg-[#fffbeb] hover:bg-[#fef3c7]",
    borderClass: "border-[#fef3c7]",
    iconColor: "text-[#d97706]",
    shadowClass: "shadow-[0_4px_20px_rgba(217,119,6,0.06)] hover:shadow-[0_8px_25px_rgba(217,119,6,0.12)]",
  },
  {
    id: "governs",
    icon: Shield,
    title: "Governs Quality",
    description: "Operate with trust and compliance",
    bgClass: "bg-[#fff1f2] hover:bg-[#ffe4e6]",
    borderClass: "border-[#ffe4e6]",
    iconColor: "text-[#e11d48]",
    shadowClass: "shadow-[0_4px_20px_rgba(225,29,72,0.06)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.12)]",
  },
  {
    id: "oversight",
    icon: Users,
    title: "Human Oversight",
    description: "Review, guide and approve",
    bgClass: "bg-[#f5f3ff] hover:bg-[#ede9fe]",
    borderClass: "border-[#ede9fe]",
    iconColor: "text-[#4f46e5]",
    shadowClass: "shadow-[0_4px_20px_rgba(79,70,229,0.06)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.12)]",
  },
];

export function WhySection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="flagship-platform"
      className="relative bg-white py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden text-[#0a1628]"
    >
      {/* ── Background Subtle Decorative Ambient Glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-[8%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, rgba(6, 182, 212, 0.04) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Main Container: Edge-Aligned Two-Column Layout ── */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-[88px] lg:px-16 xl:px-24">
        <div className="grid items-center gap-8 lg:gap-10 xl:gap-12 lg:grid-cols-12">
          
          {/* ════════ LEFT COLUMN: Copy & Narrative (Starts at Left Border) ════════ */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left">
            {/* Eyebrow with Gradient Accent Line */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#145BFF] uppercase">
                THE FLAGSHIP PLATFORM
              </span>
              <span className="h-[2px] w-14 sm:w-20 bg-gradient-to-r from-[#145BFF] via-[#0ea5e9] to-transparent rounded-full" />
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[3rem] font-extrabold tracking-tight text-[#0a1628] leading-[1.12]"
            >
              <span>my</span><span
                className="inline-block"
                style={{
                  background: "linear-gradient(90deg, #ea580c 0%, #e11d48 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "#ea580c",
                }}
              >
                Diya
              </span>
              <span> — Enterprise Quality Engineering, Reimagined with Agentic AI</span>
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="aqe-paragraph mt-5 text-[#334155]"
            >
              myDiya is AscendQE&apos;s flagship enterprise Quality Engineering platform for building,
              operating and governing intelligent QE capabilities at scale.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="mt-4 text-sm sm:text-base lg:text-[15px] xl:text-[16px] leading-relaxed text-[#334155] font-normal"
            >
              It brings together{" "}
              <strong className="font-bold text-[#145BFF]">
                specialized AI agents, enterprise context, workflow orchestration, human oversight,
                reusable QE intelligence and runtime governance
              </strong>{" "}
              to help organizations transform how quality is engineered across modern software and AI
              ecosystems.
            </motion.p>

            {/* Paragraph 3 */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="mt-4 text-sm sm:text-base lg:text-[15px] xl:text-[16px] leading-relaxed text-[#334155] font-normal"
            >
              With myDiya, enterprises can move beyond isolated AI assistants and point automation
              tools toward a{" "}
              <strong className="font-bold text-[#0a1628]">
                coordinated digital QE workforce
              </strong>
              —one that can understand context, collaborate across responsibilities, execute governed
              workflows, produce evidence and operate within enterprise policies.
            </motion.p>

            {/* Callout Sub-headline */}
            <motion.h3
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.36 }}
              className="mt-6 sm:mt-7 text-lg sm:text-xl lg:text-[1.28rem] xl:text-[1.42rem] font-extrabold text-[#6366f1] tracking-tight leading-snug"
            >
              Build, deploy and govern your enterprise&apos;s digital Quality Engineering workforce.
            </motion.h3>
          </div>

          {/* ════════ RIGHT COLUMN: 6 Capability Cards (Ends cleanly at Right Border) ════════ */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            {/* Subtle Background Glowing Halo Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[92%] sm:w-[88%] aspect-square rounded-full border border-[#DCE5F5] shadow-[0_0_80px_rgba(20,91,255,0.08)] bg-gradient-to-tr from-[#EAF1FF] via-purple-100/20 to-[#F5F8FF] blur-[1px]" />
            </div>

            {/* Capability Cards Grid (2 cols on lg, 3 cols on xl) */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4 xl:gap-4.5 w-full">
              {CAPABILITY_CARDS.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: 0.1 + index * 0.05 }}
                    className={`group relative rounded-2xl sm:rounded-3xl p-4.5 sm:p-5 xl:p-6 border ${card.borderClass} ${card.bgClass} ${card.shadowClass} flex flex-col items-center justify-center text-center min-h-[170px] sm:min-h-[190px] xl:min-h-[205px] transition-all duration-300 hover:-translate-y-1.5 cursor-default`}
                  >
                    {/* Icon */}
                    <div
                      className={`h-11 w-11 sm:h-12 sm:w-12 xl:h-13 xl:w-13 flex items-center justify-center ${card.iconColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7 sm:h-7.5 sm:w-7.5 xl:h-8 xl:w-8 stroke-[2.2]" />
                    </div>

                    {/* Title */}
                    <h4 className="mt-3 text-base sm:text-[17px] xl:text-lg font-bold text-[#0f172a] leading-tight">
                      {card.title}
                    </h4>

                    {/* Description */}
                    <p className="mt-1.5 text-xs sm:text-[13px] xl:text-sm text-slate-600 leading-relaxed text-center font-normal">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhySection;
