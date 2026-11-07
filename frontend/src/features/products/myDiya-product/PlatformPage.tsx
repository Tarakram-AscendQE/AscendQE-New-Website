import { ScrollToTop } from "@/shared/ScrollToTop";
import { HeadMeta } from "@/components/seo/HeadMeta";
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
        <HeadMeta
          title="myDiya Quality Engineering Platform | AI-Powered Testing"
          description="Discover myDiya, an AI-powered quality engineering platform for Agentic test automation, intelligent testing, analytics, governance, and enterprise QA at scale."
          canonicalPath="/mydiya"
        />
        {/*<h1 className="aqe-hero-heading text-[#0B1638]">myDiya – AI-Powered Quality Engineering Platform</h1> */}
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
