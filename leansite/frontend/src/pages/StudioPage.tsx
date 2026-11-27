import { Toaster } from 'sonner';
import { HeadMeta } from '@/components/seo/HeadMeta';
import { StudioApp } from '@/features/insights/studio/StudioApp';

/** /studio: the private Insights studio (not linked from the site, not indexed). */
export function StudioPage() {
  return (
    <>
      <HeadMeta title="Studio · AscendQE" robots="noindex, nofollow" />
      <StudioApp />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--surface)',
            color: 'var(--ink)',
            border: '1px solid var(--line)',
            fontFamily: 'var(--f-body)',
            fontSize: '15px',
          },
        }}
      />
    </>
  );
}
