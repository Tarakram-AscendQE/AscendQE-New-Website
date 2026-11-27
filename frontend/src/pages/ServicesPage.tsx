import { HeadMeta } from '@/components/seo/HeadMeta';
import { ServicesContent } from '@/features/services/ServicesContent';
import pageSeo from '@/data/pageSeo.json';

export function ServicesPage() {
  return (
    <>
      <HeadMeta
        {...pageSeo['/services']}
        ogDescription={pageSeo['/services'].description}
        twitterDescription={pageSeo['/services'].description}
      />
      <ServicesContent />
    </>
  );
}
