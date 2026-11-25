import { HeadMeta } from '@/components/seo/HeadMeta';
import { GccContent } from '@/features/gcc/GccContent';

export function GccPage() {
  return (
    <>
      <HeadMeta
        title={'For GCC leaders · AscendQE'}
        description={
          'How AscendQE helps global capability centres own the quality of AI-era software: train, prove, own.'
        }
        canonicalPath="/gcc"
      />
      <GccContent />
    </>
  );
}
