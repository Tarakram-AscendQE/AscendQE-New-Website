import { HeadMeta } from '@/components/seo/HeadMeta';
import { ContactContent } from '@/features/contact/ContactContent';

export function ContactPage() {
  return (
    <>
      <HeadMeta
        title="Contact AscendQE | AI Quality Engineering & Testing"
        description="Connect with AscendQE to explore AI-powered quality engineering, test automation, GenAI testing, and intelligent software testing solutions."
        canonicalPath="/contact"
      />
      <ContactContent />
    </>
  );
}
