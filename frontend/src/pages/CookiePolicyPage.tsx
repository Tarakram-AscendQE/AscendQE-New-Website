import { LegalDocument } from '@/features/legal/LegalDocument';
import { COOKIE_POLICY } from '@/features/legal/cookie-content';

/** Cookie Policy page. */
export function CookiePolicyPage() {
  return <LegalDocument content={COOKIE_POLICY} />;
}
