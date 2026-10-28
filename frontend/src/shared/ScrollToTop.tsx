import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;

      // Enable and display button whenever user has scrolled past 250px from top
      if (currentScrollY > 250) {
        setVisible(true);
      } else {
        // At or near top of the page
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount in case user loads midway through page
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#145BFF] text-white shadow-[0_8px_24px_rgba(20,91,255,0.4)] border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#0B49D6] hover:shadow-[0_12px_32px_rgba(20,91,255,0.6)] active:scale-95 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#145BFF]/60"
        >
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:-translate-y-0.5 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
