import { useEffect } from 'react'

interface HeadMetaProps {
  title?: string
  description?: string
  canonicalPath?: string
}

export function HeadMeta({ title, description, canonicalPath }: HeadMetaProps) {
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

    if (canonicalPath) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.rel = 'canonical'
        document.head.appendChild(linkCanonical)
      }
      linkCanonical.href = window.location.origin + canonicalPath
    }
  }, [title, description, canonicalPath])

  return null
}

