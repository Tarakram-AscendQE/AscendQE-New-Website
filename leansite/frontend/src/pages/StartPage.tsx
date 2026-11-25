import { HeadMeta } from '@/components/seo/HeadMeta';
import { StartContent } from '@/features/start/StartContent';

export function StartPage() {
  return (
    <>
      <HeadMeta
        title={'Start a Proof Sprint · AscendQE'}
        description={
          'Start a fixed-price Proof Sprint: one system, one signed decision, from Custom pricing based on scope.'
        }
        canonicalPath="/start"
      />
      <StartContent />
    </>
  );
}
