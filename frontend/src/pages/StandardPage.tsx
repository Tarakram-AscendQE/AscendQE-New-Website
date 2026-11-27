import { HeadMeta } from '@/components/seo/HeadMeta';
import { StandardContent } from '@/features/standard/StandardContent';
import pageSeo from '@/data/pageSeo.json';

export function StandardPage() {
  return (
    <>
      <HeadMeta
        {...pageSeo['/standard']}
        ogDescription={pageSeo['/standard'].description}
        twitterDescription={pageSeo['/standard'].description}
      />
      <StandardContent />
    </>
  );
}
