// Company details shared by the footer and the legal pages (from the previous AscendQE site).
import facebookIcon from '@/assets/social-media/facebook-icon.webp';
import instagramIcon from '@/assets/social-media/instagram-icon.webp';
import linkedinIcon from '@/assets/social-media/linkedin-icon.webp';
import xIcon from '@/assets/social-media/x-icon.webp';
import youtubeIcon from '@/assets/social-media/youtube-icon.webp';

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ascendqe/', icon: linkedinIcon },
  { name: 'X', href: 'https://x.com/AscendQE', icon: xIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/@AscendQE', icon: youtubeIcon },
  { name: 'Facebook', href: 'https://www.facebook.com/AscendQEAI', icon: facebookIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/ascendqe', icon: instagramIcon },
];

export const COMPANY_CONTACT = {
  email: 'hello@ascendqe.com',
  // As on the previous site: the dial link and the shown number differ. Confirm which one is correct.
  phoneHref: 'tel:+919392576186',
  phoneLabel: '+91 70959 70067',
  address:
    'Manjeera Trinity Corporate, Ground Floor, Unit No. 03, KPHB PHASE-III, Kukatpally, Hyderabad, Telangana 500072',
};
