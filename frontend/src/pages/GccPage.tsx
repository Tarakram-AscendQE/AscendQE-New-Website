import { HeadMeta } from '@/components/seo/HeadMeta';
import { GccContent } from '@/features/gcc/GccContent';
import pageSeo from '@/data/pageSeo.json';

export function GccPage() {
  return (
    <>
      <HeadMeta
        {...pageSeo['/gcc']}
        ogDescription={pageSeo['/gcc'].description}
        twitterDescription={pageSeo['/gcc'].description}
      />
      <GccContent />
    </>
  );
}
