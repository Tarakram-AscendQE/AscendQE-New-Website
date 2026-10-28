import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", to, className, children, ...props }, ref) => {
  const label = children ?? text;

  const content = (
    <>
      {/* Resting state: blue dot + label */}
      <div className="flex items-center gap-2.5">
        <div className="h-2 w-2 shrink-0 rounded-full bg-[#1763ff] transition-all duration-500 ease-out group-hover:scale-[100]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {label}
        </span>
      </div>

      {/* Hover state: label + ArrowRight sliding in from right */}
      <div className="absolute inset-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{label}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </>
  );

  const baseClassName = cn(
    "group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-full border border-[#1763ff] bg-white px-7 py-3 text-center text-sm sm:text-base font-semibold text-ink shadow-xs transition-all duration-300 hover:shadow-md",
    className,
  );

  if (to) {
    return (
      <Link
        to={to}
        className={baseClassName}
        style={{ border: "1px solid #1763ff" }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={baseClassName}
      style={{ border: "1px solid #1763ff" }}
      {...props}
    >
      {content}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton, type InteractiveHoverButtonProps };
