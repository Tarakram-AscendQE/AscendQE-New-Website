import { HeadMeta } from '@/components/seo/HeadMeta';
import { HomeContent } from '@/features/home/HomeContent';
import pageSeo from '@/data/pageSeo.json';

export function HomePage() {
  return (
    <>
      <HeadMeta
        {...pageSeo['/']}
        ogDescription={pageSeo['/'].description}
        twitterDescription={pageSeo['/'].description}
      />
      <HomeContent />
    </>
  );
}
