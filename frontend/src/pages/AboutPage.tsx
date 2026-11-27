import { HeadMeta } from '@/components/seo/HeadMeta';
import { AboutContent } from '@/features/about/AboutContent';
import pageSeo from '@/data/pageSeo.json';

export function AboutPage() {
  return (
    <>
      <HeadMeta
        {...pageSeo['/about']}
        ogDescription={pageSeo['/about'].description}
        twitterDescription={pageSeo['/about'].description}
      />
      <AboutContent />
    </>
  );
}
