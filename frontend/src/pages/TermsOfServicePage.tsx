import { LegalDocument } from '@/features/legal/LegalDocument';
import { TERMS_OF_SERVICE } from '@/features/legal/terms-content';

/** Terms of Service page. */
export function TermsOfServicePage() {
  return <LegalDocument content={TERMS_OF_SERVICE} />;
}
