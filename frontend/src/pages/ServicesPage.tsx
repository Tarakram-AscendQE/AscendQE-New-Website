import { HeadMeta } from '@/components/seo/HeadMeta';
import { ServicesContent } from '@/features/services/ServicesContent';

export function ServicesPage() {
  return (
    <>
      <HeadMeta
        title={'What we do · AscendQE'}
        description={'Test automation at AI speed, AI and agent assurance, and AI quality skills for your team.'}
        canonicalPath="/services"
      />
      <ServicesContent />
    </>
  );
}
