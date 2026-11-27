import { HeadMeta } from '@/components/seo/HeadMeta';
import { MethodContent } from '@/features/method/MethodContent';
import pageSeo from '@/data/pageSeo.json';

export function MethodPage() {
  return (
    <>
      <HeadMeta
        {...pageSeo['/method']}
        ogDescription={pageSeo['/method'].description}
        twitterDescription={pageSeo['/method'].description}
      />
      <MethodContent />
    </>
  );
}
