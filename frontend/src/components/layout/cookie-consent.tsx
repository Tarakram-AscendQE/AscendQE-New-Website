import { useCallback, useEffect, useState } from 'react';
import {
  applyCookieConsent,
  CookieCategories,
  CookieConsentRecord,
  getDeniedCookieCategories,
  readCookieConsent,
  savePersistentConsent,
  saveSessionRejection,
  withdrawCookieConsent,
} from '@/services/cookieConsent';

export function CookieConsent() {
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const synchronizeConsent = useCallback((nextConsent: CookieConsentRecord | null) => {
    setConsent(nextConsent);
    applyCookieConsent(nextConsent);
  }, []);

  const commitConsent = (nextConsent: CookieConsentRecord) => {
    setErrorMessage(null);
    synchronizeConsent(nextConsent);
  };

  const acceptAll = () => {
    try {
      commitConsent(savePersistentConsent({
        strictlyNecessary: true,
        functional: true,
        analytics: true,
        marketing: true,
      }, 'accepted'));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save cookie preferences.');
    }
  };

  const rejectAllForSession = () => {
    try {
      commitConsent(saveSessionRejection());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save cookie preferences.');
    }
  };

  const withdrawConsent = () => {
    try {
      withdrawCookieConsent();
      synchronizeConsent(null);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to withdraw cookie preferences.');
    }
  };

  useEffect(() => {
    const result = readCookieConsent();
    setConsent(result.consent);
    setErrorMessage(result.error);
    applyCookieConsent(result.consent);
    setIsReady(true);

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === null ||
        event.key === 'ascendqe.cookie-consent' ||
        event.key === 'ascendqe.cookie-rejection'
      ) {
        const updated = readCookieConsent();
        setErrorMessage(updated.error);
        synchronizeConsent(updated.consent);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [synchronizeConsent]);

  if (!isReady) return null;

  return (
    <>
      {!consent && (
        <aside
          aria-labelledby="cookie-banner-title"
          /*className="fixed top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 w-[480px] max-w-full max-h-none overflow-visible rounded-2xl border border-[#dce5f5] bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(11,24,49,0.2)] text-center")*/
          className="fixed  top-[57%] right-11 z-[90] -translate-y-1/2 w-[405px] max-w-full max-h-none overflow-visible rounded-2xl border border-[#dce5f5] bg-white p-4 sm:p-6 shadow-[0_20px_60px_rgba(11,24,49,0.2)] text-center"

        >
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-2xl">🍪</span>
              <h2 id="cookie-banner-title" className="m-0 text-xl font-bold text-[#0b1831] sm:text-2xl">
                Cookies Consent
              </h2>
            </div>
            <p className="m-0 text-sm leading-relaxed  text-left text-[#53627a] sm:text-base">
              We use cookies to enhance your browsing experience, analyse website traffic, and improve our services.
              You can manage your cookie preferences at any time.{' '}
              <a href="/cookie-policy" className="font-semibold text-[#1763ff] underline-offset-2 hover:underline">
                Cookies Policy
              </a>
            </p>
            <div className="flex gap-3 justify-center w-full sm:max-w-[360px]">
              <button
                type="button"
                onClick={acceptAll}
                className="flex-1 min-h-11 rounded-lg bg-[#1763ff] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0e53e6]"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={rejectAllForSession}
                className="flex-1 min-h-11 rounded-lg border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1831] transition-colors hover:bg-[#f5f8ff]"
              >
                Reject
              </button>
            </div>
            {errorMessage && (
              <p role="alert" className="m-0 mt-2 text-sm font-medium text-red-700">{errorMessage}</p>
            )}
          </div>
        </aside>
      )}
    </>
  );
}

/*import { useCallback, useEffect, useState } from 'react';
import {
  applyCookieConsent,
  CookieCategories,
  CookieConsentRecord,
  getDeniedCookieCategories,
  readCookieConsent,
  savePersistentConsent,
  saveSessionRejection,
  withdrawCookieConsent,
} from '@/services/cookieConsent';

export function CookieConsent() {
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const synchronizeConsent = useCallback((nextConsent: CookieConsentRecord | null) => {
    setConsent(nextConsent);
    applyCookieConsent(nextConsent);
  }, []);

  const commitConsent = (nextConsent: CookieConsentRecord) => {
    setErrorMessage(null);
    synchronizeConsent(nextConsent);
  };

  const acceptAll = () => {
    try {
      commitConsent(savePersistentConsent({
        strictlyNecessary: true,
        functional: true,
        analytics: true,
        marketing: true,
      }, 'accepted'));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save cookie preferences.');
    }
  };

  const rejectAllForSession = () => {
    try {
      commitConsent(saveSessionRejection());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save cookie preferences.');
    }
  };

  const withdrawConsent = () => {
    try {
      withdrawCookieConsent();
      synchronizeConsent(null);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to withdraw cookie preferences.');
    }
  };

  useEffect(() => {
    const result = readCookieConsent();
    setConsent(result.consent);
    setErrorMessage(result.error);
    applyCookieConsent(result.consent);
    setIsReady(true);

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === null ||
        event.key === 'ascendqe.cookie-consent' ||
        event.key === 'ascendqe.cookie-rejection'
      ) {
        const updated = readCookieConsent();
        setErrorMessage(updated.error);
        synchronizeConsent(updated.consent);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [synchronizeConsent]);

  if (!isReady) return null;

  return (
    <>
      {!consent && (
        <aside
          aria-labelledby="cookie-banner-title"
          
          className="fixed right-1 bottom-1 z-[100] w-auto max-w-lg max-h-none overflow-visible rounded-2xl border border-[#dce5f5] bg-white p-2 sm:p-3 shadow-[0_20px_60px_rgba(11,24,49,0.2)]"


        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 id="cookie-banner-title" className="m-0 text-lg font-bold text-[#0b1831] sm:text-xl">
                We Value Your Privacy
              </h2>
              <p className="m-0 mt-2 text-sm leading-relaxed text-[#53627a]">
                We use cookies to enhance your browsing experience, analyse website traffic, and improve our services.
                You can manage your cookie preferences at any time.{' '}
                <a href="/privacy#cookies" className="font-semibold text-[#1763ff] underline-offset-2 hover:underline">
                  Cookie Policy
                </a>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:min-w-[460px] md:grid-cols-1 lg:grid-cols-3">
              <button
                type="button"
                onClick={acceptAll}
                className="min-h-11 rounded-lg bg-[#1763ff] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0e53e6]"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={rejectAllForSession}
                className="min-h-11 rounded-lg border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1831] transition-colors hover:bg-[#f5f8ff]"
              >
                Reject All
              </button>
            </div>
          </div>
          {errorMessage && (
            <p role="alert" className="m-0 mt-4 text-sm font-medium text-red-700">{errorMessage}</p>
          )}
        </aside>
      )}
    </>
  );
}*/

/*import { useCallback, useEffect, useRef, useState } from 'react';
import {
  applyCookieConsent,
  CookieCategories,
  CookieConsentRecord,
  getDeniedCookieCategories,
  readCookieConsent,
  savePersistentConsent,
  saveSessionRejection,
  withdrawCookieConsent,
} from '@/services/cookieConsent';

const CATEGORY_DETAILS: Array<{
  key: keyof CookieCategories;
  title: string;
  description: string;
}> = [
  {
    key: 'strictlyNecessary',
    title: 'Strictly Necessary',
    description: 'Required for core website functions and security. These are always enabled.',
  },
  {
    key: 'functional',
    title: 'Functional',
    description: 'Remember choices and provide enhanced features.',
  },
  {
    key: 'analytics',
    title: 'Analytics',
    description: 'Help us understand website usage and improve the experience.',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    description: 'Allow advertising and marketing measurement technologies.',
  },
];

export function CookieConsent() {
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<CookieCategories>(getDeniedCookieCategories);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const synchronizeConsent = useCallback((nextConsent: CookieConsentRecord | null) => {
    setConsent(nextConsent);
    applyCookieConsent(nextConsent);
  }, []);

  useEffect(() => {
    const result = readCookieConsent();
    setConsent(result.consent);
    setErrorMessage(result.error);
    applyCookieConsent(result.consent);
    setIsReady(true);

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === null ||
        event.key === 'ascendqe.cookie-consent' ||
        event.key === 'ascendqe.cookie-rejection'
      ) {
        const updated = readCookieConsent();
        setErrorMessage(updated.error);
        synchronizeConsent(updated.consent);
      }
    };

    const handleOpenSettings = () => {
      setDraft(readCookieConsent().consent?.categories ?? getDeniedCookieCategories());
      setErrorMessage(null);
      setIsPreferencesOpen(true);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('ascendqe:open-cookie-settings', handleOpenSettings);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('ascendqe:open-cookie-settings', handleOpenSettings);
    };
  }, [synchronizeConsent]);

  useEffect(() => {
    if (!isPreferencesOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsPreferencesOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isPreferencesOpen]);

  const openPreferences = () => {
    setDraft(consent?.categories ?? getDeniedCookieCategories());
    setErrorMessage(null);
    setIsPreferencesOpen(true);
  };

  const commitConsent = (nextConsent: CookieConsentRecord) => {
    setErrorMessage(null);
    synchronizeConsent(nextConsent);
    setIsPreferencesOpen(false);
  };

  const acceptAll = () => {
    try {
      commitConsent(savePersistentConsent({
        strictlyNecessary: true,
        functional: true,
        analytics: true,
        marketing: true,
      }, 'accepted'));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save cookie preferences.');
    }
  };

  const rejectAllForSession = () => {
    try {
      commitConsent(saveSessionRejection());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save cookie preferences.');
    }
  };

  const savePreferences = () => {
    try {
      commitConsent(savePersistentConsent({ ...draft, strictlyNecessary: true }, 'customized'));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save cookie preferences.');
    }
  };

  const withdrawConsent = () => {
    try {
      withdrawCookieConsent();
      synchronizeConsent(null);
      setErrorMessage(null);
      setIsPreferencesOpen(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to withdraw cookie preferences.');
    }
  };

  if (!isReady) return null;

  return (
    <>
      {!consent && (
        <aside
          aria-labelledby="cookie-banner-title"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-h-[calc(100vh-2rem)] w-auto max-w-5xl overflow-y-auto rounded-2xl border border-[#dce5f5] bg-white p-5 shadow-[0_20px_60px_rgba(11,24,49,0.2)] sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 id="cookie-banner-title" className="m-0 text-lg font-bold text-[#0b1831] sm:text-xl">
                We Value Your Privacy
              </h2>
              <p className="m-0 mt-2 text-sm leading-relaxed text-[#53627a]">
                We use cookies to enhance your browsing experience, analyse website traffic, and improve our services.
                You can manage your cookie preferences at any time.{' '}
                <a href="/privacy#cookies" className="font-semibold text-[#1763ff] underline-offset-2 hover:underline">
                  Cookie Policy
                </a>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:min-w-[460px] md:grid-cols-1 lg:grid-cols-3">
              <button
                type="button"
                onClick={acceptAll}
                className="min-h-11 rounded-lg bg-[#1763ff] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0e53e6]"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={rejectAllForSession}
                className="min-h-11 rounded-lg border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1831] transition-colors hover:bg-[#f5f8ff]"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="min-h-11 rounded-lg border border-[#1763ff] bg-[#eff4ff] px-4 py-2.5 text-sm font-semibold text-[#145bff] transition-colors hover:bg-[#e3edff]"
              >
                Customize Preferences
              </button>
            </div>
          </div>
          {errorMessage && (
            <p role="alert" className="m-0 mt-4 text-sm font-medium text-red-700">{errorMessage}</p>
          )}
        </aside>
      )}

      {isPreferencesOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[#071327]/55 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsPreferencesOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            aria-describedby="cookie-preferences-description"
            className="max-h-[min(90vh,760px)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#dce5f5] bg-white shadow-[0_24px_80px_rgba(7,19,39,0.3)]"
          >
            <div className="flex items-start justify-between gap-5 border-b border-[#e5ebf4] px-5 py-5 sm:px-7">
              <div>
                <p className="m-0 text-xs font-bold uppercase tracking-[0.14em] text-[#1763ff]">Privacy choices</p>
                <h2 id="cookie-preferences-title" className="m-0 mt-2 text-xl font-bold text-[#0b1831] sm:text-2xl">
                  Cookie Preferences
                </h2>
                <p id="cookie-preferences-description" className="m-0 mt-2 text-sm leading-relaxed text-[#53627a]">
                  Choose which optional cookie categories AscendQE may use. Your choices can be changed at any time.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsPreferencesOpen(false)}
                aria-label="Close cookie preferences"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#dce5f5] text-xl leading-none text-[#53627a] transition-colors hover:bg-[#f5f8ff]"
              >
                ×
              </button>
            </div>

            <div className="divide-y divide-[#e8edf5] px-5 sm:px-7">
              {CATEGORY_DETAILS.map((category) => {
                const enabled = draft[category.key];
                const required = category.key === 'strictlyNecessary';
                return (
                  <div key={category.key} className="flex items-center justify-between gap-5 py-4">
                    <div>
                      <h3 className="m-0 text-sm font-semibold text-[#0b1831]">
                        {category.title}
                        {required && <span className="ml-2 text-xs font-medium text-[#64748b]">Always active</span>}
                      </h3>
                      <p className="m-0 mt-1 max-w-lg text-sm leading-relaxed text-[#64748b]">
                        {category.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      aria-label={`${category.title}${required ? ' (always enabled)' : ''}`}
                      disabled={required}
                      onClick={() => {
                        if (!required) {
                          setDraft((current) => ({ ...current, [category.key]: !current[category.key] }));
                        }
                      }}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1763ff] disabled:cursor-not-allowed ${
                        enabled ? 'bg-[#1763ff]' : 'bg-[#cbd5e1]'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-[#e5ebf4] px-5 py-5 sm:px-7">
              {errorMessage && (
                <p role="alert" className="m-0 mb-4 text-sm font-medium text-red-700">{errorMessage}</p>
              )}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={withdrawConsent}
                  className="min-h-11 rounded-lg px-2 py-2 text-left text-sm font-semibold text-[#64748b] underline-offset-2 hover:text-[#b42318] hover:underline"
                >
                  Withdraw saved consent
                </button>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={rejectAllForSession}
                    className="min-h-11 rounded-lg border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1831] transition-colors hover:bg-[#f5f8ff]"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="min-h-11 rounded-lg border border-[#1763ff] bg-[#eff4ff] px-4 py-2.5 text-sm font-semibold text-[#145bff] transition-colors hover:bg-[#e3edff]"
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    onClick={savePreferences}
                    className="min-h-11 rounded-lg bg-[#1763ff] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0e53e6]"
                  >
                    Save My Preferences
                  </button>
                </div>
              </div>
              <p className="m-0 mt-4 text-xs leading-relaxed text-[#64748b]">
                Read our <a href="/privacy#cookies" className="font-semibold text-[#1763ff] hover:underline">Cookie Policy</a>.
              </p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}*/
