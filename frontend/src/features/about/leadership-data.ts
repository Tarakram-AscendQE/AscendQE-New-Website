// People on the About page: the founder, then the leadership team (text supplied by AscendQE).
import mahendraPhoto from '@/assets/about/mahendra.webp';
import manojPhoto from '@/assets/about/manoj.webp';
import nagPusuluriPhoto from '@/assets/about/nag-pusuluri.webp';
import swaroopPhoto from '@/assets/about/swaroop.webp';

export interface LeaderProfileData {
  id: string;
  photo: string;
  photoAlt: string;
  /** Small label above the heading ("From the founder"). */
  label: string;
  heading: string;
  paragraphs: string[];
  name: string;
  role: string;
}

export const LEADERS: LeaderProfileData[] = [
  {
    id: 'nag-pusuluri',
    photo: nagPusuluriPhoto,
    photoAlt: 'NAG Pusuluri, Founder and CEO of AscendQE',
    label: 'From the founder',
    heading: 'Why I started AscendQE.',
    paragraphs: [
      'For most of my career I watched teams answer the wrong question. Leaders asked, “Can we ship this?” Teams answered with test counts and dashboards. Neither is a decision.',
      'AI has made that gap impossible to ignore. Code is written faster than anyone can review it, and AI agents now act inside businesses. What closes the gap is proof: a clear definition of ready, evidence anyone can check, and someone independent willing to sign the decision.',
      'That is what we do. Start with one system. I’ll be in the room for the readout.',
    ],
    name: 'NAG Pusuluri',
    role: 'Founder & CEO, AscendQE',
  },
  {
    id: 'naga-swaroop-kothuri',
    photo: swaroopPhoto,
    photoAlt: 'Naga Swaroop Kothuri, CPO and Director at AscendQE',
    label: 'From our leadership team',
    heading: 'Turning vision into excellence through leadership & delivery.',
    paragraphs: [
      'I believe strong leadership, strategic execution, and efficient operations drive organizational success.',
      'At AscendQE, I focus on aligning product vision with delivery, strengthening operations, and enabling sustainable growth.',
    ],
    name: 'Naga Swaroop Kothuri',
    role: 'CPO & Director – Product Delivery & Office Operations, AscendQE',
  },
  {
    id: 'manoj-adapa',
    photo: manojPhoto,
    photoAlt: 'Manoj Adapa, AI Solutions Architect at AscendQE',
    label: 'From our AI solutions team',
    heading: 'Turning AI innovation into intelligent solutions.',
    paragraphs: [
      'I focus on transforming AI innovation into practical, intelligent solutions through AI architecture and product development.',
      'At AscendQE, I contribute to building AI-powered products that solve real-world challenges and advance the future of Quality Engineering.',
    ],
    name: 'Manoj Adapa',
    role: 'AI Solutions Architect · AI Product Development',
  },
  {
    id: 'mahendra-varma',
    photo: mahendraPhoto,
    photoAlt: 'Mahendra Varma, Business Development and Growth Lead at AscendQE',
    label: 'From our growth & GTM team',
    heading: 'Turning technology innovation into business growth.',
    paragraphs: [
      'I focus on transforming technology innovation into business opportunities through strategic growth, enterprise GTM, and meaningful partnerships.',
      'At AscendQE, I work to connect AI-powered Quality Engineering solutions with enterprise needs and accelerate business growth.',
    ],
    name: 'Mahendra Varma',
    role: 'Business Development & Growth Lead, AscendQE',
  },
];
