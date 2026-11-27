import { HeadMeta } from '@/components/seo/HeadMeta';
import { InsightsListContent } from '@/features/insights/InsightsListContent';

export function InsightsPage() {
  return (
    <>
      <HeadMeta
        title="Insights · AscendQE"
        description="Articles from the AscendQE team on quality engineering for the AI era: AI agents, test intelligence and release decisions."
        canonicalPath="/blogs"
      />
      <InsightsListContent />
    </>
  );
}
