import type { ReactNode } from "react";

/** Standard left/right gutters used by product page sections. */
export const PRODUCT_GUTTER = "px-4 sm:px-8 md:px-[88px] lg:px-24";

const HERO_SECTION_BASE =
  "relative bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pb-8 pt-8 sm:pt-9 lg:pb-10 lg:pt-10 border-b border-[#DCE5F5]";

const CONTENT_SECTION_BASE = "relative bg-[#f9fafb]";

interface ProductSectionProps {
  children: ReactNode;
  id?: string;
  /** Extra classes appended to the <section> (overflow, text colour, vertical padding…). */
  className?: string;
  /** Horizontal padding of the inner container. */
  innerClassName?: string;
}

const join = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

/** Hero wrapper shared by all product pages (pale blue background with radial glow). */
export function ProductHeroSection({
  children,
  id,
  className = "overflow-hidden w-full",
  innerClassName = PRODUCT_GUTTER,
}: ProductSectionProps) {
  return (
    <section id={id} className={join(HERO_SECTION_BASE, className)}>
      <div className={join("relative z-10 mx-auto w-full", innerClassName)}>{children}</div>
    </section>
  );
}

/** Light grey content band used below the product hero. */
export function ProductContentSection({
  children,
  id,
  className = "py-16 lg:py-20 overflow-hidden w-full",
  innerClassName = "px-6 sm:px-12 md:px-[88px] lg:px-24",
}: ProductSectionProps) {
  return (
    <section id={id} className={join(CONTENT_SECTION_BASE, className)}>
      <div className={join("mx-auto w-full", innerClassName)}>{children}</div>
    </section>
  );
}
