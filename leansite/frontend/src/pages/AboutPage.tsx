import { HeadMeta } from '@/components/seo/HeadMeta';
import { AboutContent } from '@/features/about/AboutContent';

export function AboutPage() {
  return (
    <>
      <HeadMeta
        title={'About · AscendQE'}
        description={'AscendQE is a quality engineering firm for the AI era, founded in Hyderabad by NAG Pusuluri.'}
        canonicalPath="/about"
      />
      <AboutContent />
    </>
  );
}
