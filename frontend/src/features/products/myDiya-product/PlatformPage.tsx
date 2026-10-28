import { ScrollToTop } from "@/shared/ScrollToTop";
import { Hero, DarkSection } from "./components/Hero";
import { WhySection } from "./components/WhySection";
import { AgentShowcase } from "./components/AgentShowcase";
import { Workflow } from "./components/Workflow";
import { ContextChanges } from "./components/ContextChanges";
import { StructuralDifferences } from "./components/StructuralDifferences";
import { FAQAccordion } from "@/shared/faq's accordians/page";
import { StillHaveQuestionsBanner } from "@/shared/StillHaveQuestionsBanner";
import { MYDIYA_FAQS } from "./myDiya-faqs";
import { FinalCTA } from "./components/FinalCTA";
import { CursorGlow } from "../../../components/ui/shared";



export function PlatformPage() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden text-[#0f172a]">
      <CursorGlow />
      <main className="w-full overflow-x-hidden">
        <DarkSection>
          <Hero />
        </DarkSection>
        <WhySection />
        <AgentShowcase />
        <Workflow />
        <ContextChanges />
        <StructuralDifferences />
        <FAQAccordion items={MYDIYA_FAQS} />
        <StillHaveQuestionsBanner />
        <FinalCTA />
      </main>
    </div>
  );
}
