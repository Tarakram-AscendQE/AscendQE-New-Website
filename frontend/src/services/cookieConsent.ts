export const COOKIE_CONSENT_POLICY_VERSION = '1.0';
export const COOKIE_CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

const CONSENT_STORAGE_KEY = 'ascendqe.cookie-consent';
const SESSION_REJECTION_KEY = 'ascendqe.cookie-rejection';
const GTM_CONTAINER_ID = 'GTM-PS92RJ6D';

export interface CookieCategories {
  strictlyNecessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentRecord {
  status: 'accepted' | 'customized' | 'rejected';
  categories: CookieCategories;
  timestamp: string;
  policyVersion: string;
}

export interface ConsentReadResult {
  consent: CookieConsentRecord | null;
  error: string | null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const deniedCategories = (): CookieCategories => ({
  strictlyNecessary: true,
  functional: false,
  analytics: false,
  marketing: false,
});

function isConsentRecord(value: unknown): value is CookieConsentRecord {
  if (!value || typeof value !== 'object') return false;
  const record = value as Partial<CookieConsentRecord>;
  const categories = record.categories;
  if (!categories || typeof categories !== 'object') return false;

  const timestamp = Date.parse(record.timestamp ?? '');
  if (
    record.policyVersion !== COOKIE_CONSENT_POLICY_VERSION ||
    !['accepted', 'customized', 'rejected'].includes(record.status ?? '') ||
    !Number.isFinite(timestamp) ||
    timestamp > Date.now() ||
    categories.strictlyNecessary !== true ||
    typeof categories.functional !== 'boolean' ||
    typeof categories.analytics !== 'boolean' ||
    typeof categories.marketing !== 'boolean'
  ) {
    return false;
  }

  if (record.status === 'accepted') {
    return categories.functional && categories.analytics && categories.marketing;
  }
  if (record.status === 'rejected') {
    return !categories.functional && !categories.analytics && !categories.marketing;
  }
  return true;
}

function readStorageRecord(storage: Storage, key: string): CookieConsentRecord | null {
  const raw = storage.getItem(key);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isConsentRecord(parsed)) {
      storage.removeItem(key);
      return null;
    }

    if (
      parsed.status !== 'rejected' &&
      Date.now() - Date.parse(parsed.timestamp) > COOKIE_CONSENT_MAX_AGE_MS
    ) {
      storage.removeItem(key);
      return null;
    }

    return parsed;
  } catch (error) {
    storage.removeItem(key);
    console.error('[Cookie consent] Invalid saved consent was removed:', error);
    return null;
  }
}

export function readCookieConsent(): ConsentReadResult {
  try {
    const persistent = readStorageRecord(window.localStorage, CONSENT_STORAGE_KEY);
    if (persistent && persistent.status !== 'rejected') {
      return { consent: persistent, error: null };
    }
    if (persistent?.status === 'rejected') {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    }

    const session = readStorageRecord(window.sessionStorage, SESSION_REJECTION_KEY);
    return {
      consent: session?.status === 'rejected' ? session : null,
      error: null,
    };
  } catch (error) {
    console.error('[Cookie consent] Unable to read browser storage:', error);
    return {
      consent: null,
      error: 'Your cookie preferences could not be read. Please check your browser storage settings.',
    };
  }
}

function createRecord(
  status: CookieConsentRecord['status'],
  categories: CookieCategories
): CookieConsentRecord {
  return {
    status,
    categories,
    timestamp: new Date().toISOString(),
    policyVersion: COOKIE_CONSENT_POLICY_VERSION,
  };
}

export function savePersistentConsent(
  categories: CookieCategories,
  status: 'accepted' | 'customized'
): CookieConsentRecord {
  const consent = createRecord(status, categories);
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    window.sessionStorage.removeItem(SESSION_REJECTION_KEY);
    return consent;
  } catch (error) {
    console.error('[Cookie consent] Unable to save persistent preferences:', error);
    throw new Error('Your preferences could not be saved. Please enable browser storage and try again.');
  }
}

export function saveSessionRejection(): CookieConsentRecord {
  const consent = createRecord('rejected', deniedCategories());
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    window.sessionStorage.setItem(SESSION_REJECTION_KEY, JSON.stringify(consent));
    return consent;
  } catch (error) {
    console.error('[Cookie consent] Unable to save this-session rejection:', error);
    throw new Error('Your choice could not be saved for this session. Please check your browser storage settings.');
  }
}

export function withdrawCookieConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    window.sessionStorage.removeItem(SESSION_REJECTION_KEY);
  } catch (error) {
    console.error('[Cookie consent] Unable to withdraw saved preferences:', error);
    throw new Error('Your saved choice could not be removed. Please check your browser storage settings.');
  }
}

function pushGtmConsent(consent: CookieConsentRecord | null): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(arguments);
  };

  if (!gtmConsentDefaultsSet) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
      wait_for_update: 500,
    });
    gtmConsentDefaultsSet = true;
  }

  const granted = consent?.categories;
  window.gtag('consent', 'update', {
    analytics_storage: granted?.analytics ? 'granted' : 'denied',
    ad_storage: granted?.marketing ? 'granted' : 'denied',
    ad_user_data: granted?.marketing ? 'granted' : 'denied',
    ad_personalization: granted?.marketing ? 'granted' : 'denied',
    functionality_storage: granted?.functional ? 'granted' : 'denied',
    personalization_storage: granted?.functional ? 'granted' : 'denied',
    security_storage: 'granted',
  });
}

let gtmLoadStarted = false;
let gtmConsentDefaultsSet = false;
let gtmStartEventQueued = false;

function loadGoogleTagManager(): void {
  if (gtmLoadStarted || document.getElementById('ascendqe-gtm')) return;
  gtmLoadStarted = true;

  const script = document.createElement('script');
  script.id = 'ascendqe-gtm';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  if (!gtmStartEventQueued) {
    window.dataLayer?.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    gtmStartEventQueued = true;
  }
  script.onerror = () => {
    gtmLoadStarted = false;
    script.remove();
    console.error('[Cookie consent] Google Tag Manager failed to load.');
  };
  document.head.appendChild(script);
}

const trackingCookieCategories: Array<{ pattern: RegExp; category: keyof CookieCategories }> = [
  { pattern: /^(_ga|_gid|_gat|_gac|_clck|_clsk|_hj)/i, category: 'analytics' },
  { pattern: /^(_gcl_|_fbp|_fbc|IDE$|test_cookie$|__gads|__gpi)/i, category: 'marketing' },
];

function removeCookiesForCategory(category: keyof CookieCategories): void {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) =>
      trackingCookieCategories.some(
        (item) => item.category === category && item.pattern.test(name)
      )
    );

  const paths = new Set(['/']);
  const currentPathParts = window.location.pathname.split('/').filter(Boolean);
  while (currentPathParts.length) {
    paths.add(`/${currentPathParts.join('/')}`);
    currentPathParts.pop();
  }

  const domains = new Set<string | undefined>([undefined, window.location.hostname]);
  if (window.location.hostname === 'ascendqe.com' || window.location.hostname.endsWith('.ascendqe.com')) {
    domains.add('.ascendqe.com');
  }

  for (const name of names) {
    for (const path of paths) {
      for (const domain of domains) {
        const domainAttribute = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=${path}${domainAttribute}`;
      }
    }
  }
}

export function applyCookieConsent(consent: CookieConsentRecord | null): void {
  pushGtmConsent(consent);

  if (!consent?.categories.analytics) {
    removeCookiesForCategory('analytics');
  }
  if (!consent?.categories.marketing) {
    removeCookiesForCategory('marketing');
  }

  if (consent?.categories.analytics || consent?.categories.marketing) {
    loadGoogleTagManager();
  }
}

export function createOpenCookieSettingsEvent(): Event {
  return new Event('ascendqe:open-cookie-settings');
}

export function getDeniedCookieCategories(): CookieCategories {
  return deniedCategories();
}
