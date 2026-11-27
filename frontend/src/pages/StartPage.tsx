import { HeadMeta } from '@/components/seo/HeadMeta';
import { StartContent } from '@/features/start/StartContent';
import pageSeo from '@/data/pageSeo.json';

export function StartPage() {
  return (
    <>
      <HeadMeta
        {...pageSeo['/start']}
        ogDescription={pageSeo['/start'].description}
        twitterDescription={pageSeo['/start'].description}
      />
      <StartContent />
    </>
  );
}
