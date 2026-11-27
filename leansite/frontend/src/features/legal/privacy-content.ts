// Privacy Policy text (from the previous AscendQE site, unchanged).
import type { LegalDocumentContent } from '@/features/legal/legal-types';

export const PRIVACY_POLICY: LegalDocumentContent = {
  title: 'Privacy Policy',
  description:
    'Read the AscendQE Privacy Policy to understand how we collect, use, protect, and manage personal information and website data.',
  canonicalPath: '/privacy',
  lastUpdated: 'October 2026',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      blocks: [
        {
          kind: 'p',
          text: 'AscendQE ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our enterprise quality engineering platform and services.',
        },
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      blocks: [
        { kind: 'h3', text: 'Personal Information' },
        { kind: 'p', text: 'We may collect personal information that you voluntarily provide to us when you:' },
        {
          kind: 'list',
          items: [
            'Register for an account or trial',
            'Request a platform demo or technical proof of concept',
            'Subscribe to our newsletters or research updates',
            'Contact our engineering team for technical support',
            'Apply for a job opening through our careers page',
          ],
        },
        {
          kind: 'p',
          text: 'This information may include your name, business email address, phone number, company name, job title, and any other relevant project context you choose to share.',
        },
        { kind: 'h3', text: 'Automatically Collected Information' },
        {
          kind: 'p',
          text: 'When you visit our website, we automatically collect certain technical data regarding your device, including web browser details, IP address, device type, operating system, and interaction metrics across our pages.',
        },
      ],
    },
    {
      id: 'how-we-use-your-information',
      title: 'How We Use Your Information',
      blocks: [
        { kind: 'p', text: 'We process collected information to:' },
        {
          kind: 'list',
          items: [
            'Provide, operate, calibrate, and maintain our quality engineering platform',
            'Improve, personalize, and expand our platform capabilities and user workflows',
            'Analyze usage trends and optimize system performance',
            'Develop new AI testing models, integrations, and automation features',
            'Communicate with you for customer support, service updates, and enterprise notices',
            'Process commercial engagements, onboarding agreements, and billing arrangements',
            'Protect against fraudulent, abusive, or unauthorized activity',
          ],
        },
      ],
    },
    {
      id: 'sharing-your-information',
      title: 'Sharing Your Information',
      blocks: [
        {
          kind: 'p',
          text: 'We do not sell your personal data. We may share information under strictly governed conditions:',
        },
        {
          kind: 'list',
          items: [
            {
              term: 'Service Providers:',
              text: 'Trusted third-party vendors who assist with cloud infrastructure, hosting, secure communication, and operational analytics under strict data confidentiality agreements.',
            },
            {
              term: 'Business Transfers:',
              text: 'In connection with or during negotiation of any merger, acquisition, financing, or asset transaction involving AscendQE.',
            },
            {
              term: 'Legal Requirements:',
              text: 'Where required by applicable law, court order, or official governmental request to comply with legal compliance obligations.',
            },
            {
              term: 'With Your Explicit Consent:',
              text: 'For any other circumstance where you give explicit authorization.',
            },
          ],
        },
      ],
    },
    {
      id: 'data-security',
      title: 'Data Security',
      blocks: [
        {
          kind: 'p',
          text: 'We implement robust technical and organizational security controls, including encryption in transit and at rest, role-based access management, and continuous infrastructure auditing to safeguard your data. While no digital platform can guarantee absolute security, we continuously review and reinforce our safeguards.',
        },
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      blocks: [
        {
          kind: 'p',
          text: 'Depending on your geographic location and local data protection regulations, you may possess the following rights:',
        },
        {
          kind: 'list',
          items: [
            'Right to access personal data we hold about you',
            'Right to request rectification of inaccurate or outdated information',
            'Right to request erasure of your data under applicable conditions',
            'Right to restrict or object to certain processing activities',
            'Right to data portability in a machine-readable format',
            'Right to withdraw previously given consent at any time',
          ],
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      blocks: [
        {
          kind: 'p',
          text: 'Strictly necessary storage supports core site operation and security. Optional functional, analytics, and marketing technologies are disabled unless you choose to allow them in Cookie Settings. Your choice is stored on this device so it can be applied on later visits.',
        },
        {
          kind: 'p',
          text: 'This website uses Google Tag Manager (GTM-PS92RJ6D). The container is not loaded until you allow Analytics or Marketing. Tags in that container must also be configured to respect the consent signals for their category. You can review or withdraw your choice at any time using Cookie Settings in the website footer.',
        },
      ],
    },
    {
      id: 'childrens-privacy',
      title: "Children's Privacy",
      blocks: [
        {
          kind: 'p',
          text: 'AscendQE services are designed exclusively for business enterprises and software development professionals. We do not knowingly collect personal details from anyone under 13 years of age. If you believe a minor has submitted personal data to us, please notify us immediately.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to This Privacy Policy',
      blocks: [
        {
          kind: 'p',
          text: 'We may periodically revise this Privacy Policy to reflect updates to our operational practices or statutory requirements. When revisions occur, the updated policy will be posted on this page with a revised effective date.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact Us',
      blocks: [
        {
          kind: 'p',
          text: 'If you have any questions, inquiries, or privacy-related requests regarding this Privacy Policy, please reach out to us:',
        },
      ],
      contact: true,
    },
  ],
};
