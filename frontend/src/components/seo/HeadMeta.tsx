import { useEffect } from 'react';

interface HeadMetaProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  robots?: string;
  // Open Graph (homepage only)
  ogSiteName?: string;
  ogUrl?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  // Twitter (homepage only)
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

const SITE_ORIGIN = 'https://ascendqe.com';

function upsertMetaTag(selector: string, attributes: Record<string, string>, content: string) {
  const matches = Array.from(document.head.querySelectorAll<HTMLMetaElement>(selector));
  const meta = matches[0] ?? document.createElement('meta');

  matches.slice(1).forEach((duplicate) => duplicate.remove());
  Object.entries(attributes).forEach(([name, value]) => meta.setAttribute(name, value));
  meta.content = content;

  if (matches.length === 0) {
    document.head.appendChild(meta);
  }
}

export function HeadMeta({
  title,
  description,
  canonicalPath,
  robots = 'index, follow',
  ogSiteName,
  ogUrl,
  ogDescription,
  ogType,
  ogImage,
  twitterCard,
  twitterSite,
  twitterCreator,
  twitterTitle,
  twitterDescription,
  twitterImage,
}: HeadMetaProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      upsertMetaTag('meta[name="description"]', { name: 'description' }, description);
    }

    // Robots — common on every path
    upsertMetaTag('meta[name="robots"]', { name: 'robots' }, robots);

    if (canonicalPath) {
      const canonicals = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
      const linkCanonical = canonicals[0] ?? document.createElement('link');
      canonicals.slice(1).forEach((duplicate) => duplicate.remove());
      linkCanonical.href = canonicalPath.startsWith('http')
        ? canonicalPath
        : `${SITE_ORIGIN}${canonicalPath === '/' ? '/' : canonicalPath.replace(/\/$/, '')}`;
      if (canonicals.length === 0) {
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      upsertMetaTag(
        'meta[property="og:url"]',
        { property: 'og:url' },
        canonicalPath.startsWith('http')
          ? canonicalPath
          : `${SITE_ORIGIN}${canonicalPath === '/' ? '/' : canonicalPath.replace(/\/$/, '')}`
      );
    }

    // Update provided social tags without removing unrelated document metadata.
    const ogTags: Record<string, string | undefined> = {
      'og:site_name': ogSiteName,
      'og:url': ogUrl,
      'og:description': ogDescription,
      'og:type': ogType,
      'og:image': ogImage,
    };
    Object.entries(ogTags).forEach(([property, value]) => {
      if (value !== undefined) {
        upsertMetaTag(`meta[property="${property}"]`, { property }, value);
      }
    });

    const twitterTags: Record<string, string | undefined> = {
      'twitter:card': twitterCard,
      'twitter:site': twitterSite,
      'twitter:creator': twitterCreator,
      'twitter:title': twitterTitle,
      'twitter:description': twitterDescription,
      'twitter:image': twitterImage,
    };
    Object.entries(twitterTags).forEach(([name, value]) => {
      if (value !== undefined) {
        upsertMetaTag(`meta[name="${name}"]`, { name }, value);
      }
    });
  }, [
    title,
    description,
    canonicalPath,
    robots,
    ogSiteName,
    ogUrl,
    ogDescription,
    ogType,
    ogImage,
    twitterCard,
    twitterSite,
    twitterCreator,
    twitterTitle,
    twitterDescription,
    twitterImage,
  ]);

  return null;
}
