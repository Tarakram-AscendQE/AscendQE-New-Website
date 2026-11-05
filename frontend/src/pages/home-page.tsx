import React, { useState, useEffect } from 'react';
import './home-page.css';
import { HeadMeta } from '@/components/seo/HeadMeta';
import {
  ScrollProgressLine,
  WelcomeSection,
  HeroSection,
  EvolutionSection,
  JourneySection,
  AiModesSection,
  ControlBoundariesSection,
  CoffeeChallengeSection,
  //ProofFaqSection,
  //ProofFaqSection1,
  FinalCtaSection,
  TrailerDialog,
  MotionToggle,
} from '@/features/home';
import { ProofFaqSection1 } from '@/features/home/proof1';
//import { StartPage1 } from '@/pages/start-page1';



export const HomePage: React.FC = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMotionPaused, setIsMotionPaused] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Sync motion class on body
  useEffect(() => {
    if (isMotionPaused) {
      document.body.classList.add('paused');
      document.body.classList.remove('motion-enabled');
    } else {
      document.body.classList.remove('paused');
      document.body.classList.add('motion-enabled');
    }
  }, [isMotionPaused]);

  // Scroll line progress update & IntersectionObserver for .reveal
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for reveal elements
    const reveals = document.querySelectorAll('.reveal');
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      document.body.classList.add('js-reveals');
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              observer?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      reveals.forEach((el) => observer?.observe(el));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <HeadMeta
        title="AI Powered Test Automation Platform | Quality Engineering"
        description="Explore AscendQE's agentic AI test automation, AI agents for enterprise testing, GenAI testing, and intelligent quality engineering to accelerate releases."
        canonicalPath="/"
        ogSiteName="AscendQE"
        ogUrl="https://ascendqe.com/"
        ogDescription="Transform software quality with AI-powered quality engineering, intelligent test automation, GenAI testing, and enterprise QA solutions from AscendQE."
        ogType="website"
        ogImage="https://ascendqe.com/assets/AscendQE-logo-new-Dk-IobMt.webp"
        twitterCard="summary_large_image"
        twitterSite="@AscendQE"
        twitterCreator="@AscendQE"
        twitterTitle="Enterprise Quality Intelligence for Software & AI | AscendQE"
        twitterDescription="Transform software quality with AI-powered quality engineering, intelligent Agentic test automation, GenAI testing, and enterprise QA solutions from AscendQE."
        twitterImage="https://ascendqe.com/assets/AscendQE-logo-new-Dk-IobMt.webp"
      />
      {/* Scroll Progress Line */}
      <ScrollProgressLine progress={scrollProgress} />

      <main id="main">
        {/* 0. Welcome Section: Crew Bots */}
        <WelcomeSection onOpenTrailer={() => setIsTrailerOpen(true)} />

        {/* 1. Hero Section (#start): Infinity Loop & Value Proposition */}
        <HeroSection />

        {/* 2. The Shift Section (#system): Tools do tasks. AscendQE runs QE. */}
        <EvolutionSection />

        {/* 3. Ascent Journey Section (#journey): Interactive 8-Stage Mountain Ascent */}
        <JourneySection isMotionPaused={isMotionPaused} />

        {/* 4. AI × QE Section (#ai): Dual Mode Switcher */}
        <AiModesSection />

        {/* 5. Control & Boundaries Section */}
        <ControlBoundariesSection />

        {/* 6. Coffee Break Challenge Section (#challenge) */}
        <CoffeeChallengeSection />

        {/* 7. Proof Section (#proof): 100 Test Cases & FAQ */}
        <ProofFaqSection1 />

        {/* 8. Final CTA Section */}
        <FinalCtaSection />
      </main>

      {/* Trailer Video Dialog */}
      <TrailerDialog isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} />

      {/* Motion Pause/Play Toggle Button (commented out per request) */}
      {/* <MotionToggle
        isPaused={isMotionPaused}
        onToggle={() => setIsMotionPaused((prev) => !prev)}
      /> */}
    </>
  );
};

export default HomePage;
