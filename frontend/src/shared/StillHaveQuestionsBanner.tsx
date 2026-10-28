import React from "react";
import { ArrowRight } from "lucide-react";

export interface StillHaveQuestionsBannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

/**
 * "Still have questions?" card banner component that appears after FAQs
 * and redirects to the contact page when clicked.
 */
export function StillHaveQuestionsBanner({
  title = "Still have questions?",
  subtitle = "Our team is happy to walk you through anything specific to your environment or industry.",
  buttonText = "Talk to our team",
  buttonHref = "/contact",
  className = "",
}: StillHaveQuestionsBannerProps) {
  return (
    <section className={`relative w-full bg-gradient-to-b from-[#F8FAFF] to-[#F5F8FF] pt-0 pb-16 sm:pb-20 lg:pb-24 overflow-hidden ${className}`}>
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="relative rounded-[26px] bg-[#EAF1FF] border border-[#DCE5F5] p-7 sm:p-9 md:p-10 shadow-[0_4px_24px_rgba(20,91,255,0.06)]">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B1638] tracking-tight">
            {title}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base text-[#263653] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-6 sm:mt-7">
            <a
              href={buttonHref}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl sm:rounded-2xl bg-[#145BFF] hover:bg-[#0B49D6] text-white text-sm sm:text-[15px] font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Bottom Accent Ring Indicator matching the design */}
          <div
            aria-hidden="true"
            className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#F5F8FF] border border-[#DCE5F5] flex items-center justify-center pointer-events-none shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#145BFF]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default StillHaveQuestionsBanner;
