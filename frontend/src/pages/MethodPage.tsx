import { HeadMeta } from '@/components/seo/HeadMeta';
import { MethodContent } from '@/features/method/MethodContent';

export function MethodPage() {
  return (
    <>
      <HeadMeta
        title={'How we decide · AscendQE'}
        description={
          'How AscendQE decides whether software and AI are ready to ship: ship, fix or stop. Check your Proof Level.'
        }
        canonicalPath="/method"
      />
      <MethodContent />
    </>
  );
}
