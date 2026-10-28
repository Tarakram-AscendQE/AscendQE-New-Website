import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
export { StillHaveQuestionsBanner, default as StillHaveQuestionsBannerComponent } from "@/shared/StillHaveQuestionsBanner";

export interface FAQItem {
  id?: string | number;
  question: string;
  answer: React.ReactNode;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  title?: React.ReactNode;
  highlightTitle?: string;
  subtitle?: string;
  badge?: string;
  defaultOpenIndex?: number | null;
  allowMultiple?: boolean;
  className?: string;
}

export function FAQAccordion({
  items = [],
  title,
  highlightTitle,
  subtitle,
  badge = "FREQUENTLY ASKED QUESTIONS",
  defaultOpenIndex = null,
  allowMultiple = false,
  className = "",
}: FAQAccordionProps) {
  // State for single-open or multi-open mode
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    defaultOpenIndex !== null ? new Set([defaultOpenIndex]) : new Set()
  );

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    } else {
      setOpenIndex((prev) => (prev === index ? null : index));
    }
  };

  const isItemOpen = (index: number) => {
    return allowMultiple ? openIndices.has(index) : openIndex === index;
  };

  return (
    <section className={`relative w-full bg-gradient-to-b from-[#F8FAFF] via-[#F4F7FE] to-[#F8FAFF] py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-[#DCE5F5] ${className}`}>
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#145BFF]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          {badge && (
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase bg-[#EAF1FF] text-[#145BFF] border border-[#DCE5F5] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#145BFF]" />
                <span>{badge}</span>
              </div>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0B1638] leading-[1.2]">
            {title ? (
              title
            ) : (
              <>
                Everything you need to know about{" "}
                <span className="text-[#145BFF]">
                  {highlightTitle || "AI-Powered"}
                </span>
                <span className="block text-[#145BFF] mt-1">
                  Quality Engineering for Modern Enterprises
                </span>
              </>
            )}
          </h2>

          {subtitle && (
            <p className="mt-4 text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {items.map((item, index) => {
            const isOpen = isItemOpen(index);
            const qNumber = `Q${String(index + 1).padStart(2, "0")}`;

            return (
              <div
                key={item.id ?? index}
                className={`group relative overflow-hidden rounded-2xl bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-2 border-[#145BFF] shadow-[0_12px_32px_rgba(20,91,255,0.12)]"
                    : "border border-[#E2E8F0] shadow-[0_4px_16px_rgba(11,22,56,0.04)] hover:border-[#145BFF]/60 hover:shadow-[0_8px_25px_rgba(20,91,255,0.08)] hover:-translate-y-0.5"
                }`}
              >
                {/* ── Left Indicator Accent Bar (Hover & Open) ── */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[4px] bg-[#145BFF] rounded-r origin-top transition-all duration-300 ease-out pointer-events-none ${
                    isOpen
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100"
                  }`}
                />

                {/* Accordion Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between py-4.5 sm:py-5 px-5 sm:px-7 text-left bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/40 rounded-2xl select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 pr-3">
                    <span
                      className={`text-xs sm:text-[13px] font-bold tracking-wider shrink-0 px-2.5 py-1 rounded-lg transition-all duration-200 ${
                        isOpen
                          ? "bg-[#145BFF] text-white shadow-xs"
                          : "bg-[#F1F5F9] text-[#475569] group-hover:bg-[#EAF1FF] group-hover:text-[#145BFF]"
                      }`}
                    >
                      {qNumber}
                    </span>
                    <h3
                      className={`text-[15px] sm:text-base md:text-[17px] font-bold tracking-tight leading-snug transition-colors duration-200 ${
                        isOpen
                          ? "text-[#145BFF]"
                          : "text-[#0B1638] group-hover:text-[#145BFF]"
                      }`}
                    >
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-out ${
                      isOpen
                        ? "bg-[#145BFF] text-white rotate-180 shadow-[0_4px_12px_rgba(20,91,255,0.3)]"
                        : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] group-hover:bg-[#EAF1FF] group-hover:text-[#145BFF] group-hover:border-[#145BFF]/30"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2.5]" />
                  </div>
                </button>

                {/* Collapsible Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-0">
                        {/* Divider Line */}
                        <div className="h-[1px] w-full bg-[#E2E8F0] mb-4" />
                        
                        <div className="text-[#334155] text-sm sm:text-[15px] leading-relaxed font-normal whitespace-pre-line pl-0 sm:pl-1">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FAQAccordion;
