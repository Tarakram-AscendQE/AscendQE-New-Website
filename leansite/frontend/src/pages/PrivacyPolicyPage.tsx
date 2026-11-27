import { LegalDocument } from '@/features/legal/LegalDocument';
import { PRIVACY_POLICY } from '@/features/legal/privacy-content';

/** Privacy Policy page. */
export function PrivacyPolicyPage() {
  return <LegalDocument content={PRIVACY_POLICY} />;
}
