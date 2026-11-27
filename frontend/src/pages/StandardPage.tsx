import { HeadMeta } from '@/components/seo/HeadMeta';
import { StandardContent } from '@/features/standard/StandardContent';

export function StandardPage() {
  return (
    <>
      <HeadMeta
        title={'The Proof Standard (PS-1) · AscendQE'}
        description={"PS-1, AscendQE's published method for proving software and AI are ready to ship."}
        canonicalPath="/standard"
      />
      <StandardContent />
    </>
  );
}
