import { HeadMeta } from '@/components/seo/HeadMeta';
import { HomeContent } from '@/features/home/HomeContent';

export function HomePage() {
  return (
    <>
      <HeadMeta
        title={'AscendQE · Proof at the speed of AI'}
        description={
          'AscendQE proves your software and AI systems are ready to ship, and signs the answer: ship, fix or stop.'
        }
        canonicalPath="/"
      />
      <HomeContent />
    </>
  );
}
