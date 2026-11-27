import { Cookie } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ALL_CATEGORIES,
  applyCookieConsent,
  CONSENT_STORAGE_KEY,
  OPEN_COOKIE_SETTINGS_EVENT,
  readCookieConsent,
  savePersistentConsent,
  saveSessionRejection,
  SESSION_REJECTION_KEY,
  type CookieConsentRecord,
} from '@/services/cookieConsent';

/**
 * Cookie consent banner (bottom right). Shown until the visitor accepts or rejects; "Cookie settings" in the
 * footer shows it again so the choice can be changed.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);
  const [ready, setReady] = useState(false);
  const [reopened, setReopened] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bannerRef = useRef<HTMLElement>(null);

  const apply = useCallback((next: CookieConsentRecord | null) => {
    setConsent(next);
    applyCookieConsent(next);
  }, []);

  useEffect(() => {
    const result = readCookieConsent();
    setError(result.error);
    apply(result.consent);
    setReady(true);

    // Keep tabs in sync when the choice changes in another tab.
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === CONSENT_STORAGE_KEY || event.key === SESSION_REJECTION_KEY) {
        const updated = readCookieConsent();
        setError(updated.error);
        apply(updated.consent);
      }
    };
    const onOpenSettings = () => {
      setError(null);
      setReopened(true);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    };
  }, [apply]);

  useEffect(() => {
    if (reopened) bannerRef.current?.focus();
  }, [reopened]);

  const choose = (save: () => CookieConsentRecord) => {
    try {
      apply(save());
      setError(null);
      setReopened(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Your cookie preferences could not be saved.');
    }
  };

  if (!ready || (consent && !reopened)) return null;

  const current = consent?.status === 'rejected' ? 'rejected' : consent ? 'accepted' : null;
  return (
    <aside className="cookie" aria-labelledby="cookie-title" tabIndex={-1} ref={bannerRef}>
      <h2 id="cookie-title">
        <Cookie aria-hidden="true" />
        Cookie consent
      </h2>
      <p>
        We use cookies to enhance your browsing experience, analyse website traffic and improve our services. You can
        change your choice at any time. <Link to="/cookie-policy">Cookie Policy</Link>
      </p>
      {current && (
        <p className="cookie-current">
          Current choice: {current === 'accepted' ? 'all cookies accepted' : 'optional cookies rejected'}.
        </p>
      )}
      <div className="cookie-actions">
        <button
          type="button"
          className="btn sm"
          onClick={() => choose(() => savePersistentConsent(ALL_CATEGORIES, 'accepted'))}
        >
          Accept
        </button>
        <button type="button" className="btn sm ghost" onClick={() => choose(saveSessionRejection)}>
          Reject
        </button>
      </div>
      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
    </aside>
  );
}
