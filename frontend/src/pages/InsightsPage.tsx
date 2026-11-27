import { HeadMeta } from '@/components/seo/HeadMeta';
import { InsightsListContent } from '@/features/insights/InsightsListContent';
import pageSeo from '@/data/pageSeo.json';

export function InsightsPage() {
  return (
    <>
      <HeadMeta
        {...pageSeo['/blogs']}
        ogDescription={pageSeo['/blogs'].description}
        twitterDescription={pageSeo['/blogs'].description}
      />
      <InsightsListContent />
    </>
  );
}
