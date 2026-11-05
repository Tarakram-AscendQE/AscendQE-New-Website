import { useEffect } from 'react'

interface HeadMetaProps {
  title?: string
  description?: string
  canonicalPath?: string
  robots?: string
  // Open Graph (homepage only)
  ogSiteName?: string
  ogUrl?: string
  ogDescription?: string
  ogType?: string
  ogImage?: string
  // Twitter (homepage only)
  twitterCard?: string
  twitterSite?: string
  twitterCreator?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
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
      document.title = title
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.content = description
    }

    // Robots — common on every path
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement
    if (!metaRobots) {
      metaRobots = document.createElement('meta')
      metaRobots.name = 'robots'
      document.head.appendChild(metaRobots)
    }
    metaRobots.content = robots

    if (canonicalPath) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.rel = 'canonical'
        document.head.appendChild(linkCanonical)
      }
      linkCanonical.href = window.location.origin + canonicalPath
    }

    // Open Graph tags — set only when provided; remove otherwise (homepage only)
    const ogTags: Record<string, string | undefined> = {
      'og:site_name': ogSiteName,
      'og:url': ogUrl,
      'og:description': ogDescription,
      'og:type': ogType,
      'og:image': ogImage,
    }
    Object.entries(ogTags).forEach(([property, value]) => {
      const el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (value) {
        if (!el) {
          const meta = document.createElement('meta')
          meta.setAttribute('property', property)
          meta.content = value
          document.head.appendChild(meta)
        } else {
          el.content = value
        }
      } else if (el) {
        el.remove()
      }
    })

    // Twitter tags — set only when provided; remove otherwise (homepage only)
    const twitterTags: Record<string, string | undefined> = {
      'twitter:card': twitterCard,
      'twitter:site': twitterSite,
      'twitter:creator': twitterCreator,
      'twitter:title': twitterTitle,
      'twitter:description': twitterDescription,
      'twitter:image': twitterImage,
    }
    Object.entries(twitterTags).forEach(([name, value]) => {
      const el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (value) {
        if (!el) {
          const meta = document.createElement('meta')
          meta.setAttribute('name', name)
          meta.content = value
          document.head.appendChild(meta)
        } else {
          el.content = value
        }
      } else if (el) {
        el.remove()
      }
    })
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
  ])

  return null
}

