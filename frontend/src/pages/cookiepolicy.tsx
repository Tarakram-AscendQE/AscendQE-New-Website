import { Reveal } from '@/shared';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { HeadMeta } from '@/components/seo/HeadMeta';

export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0b1831]">
      <HeadMeta
        title="Cookie Policy | AscendQE"
        description="Read the AscendQE Cookie Policy to understand how we use cookies and similar technologies, and how you can manage your preferences."
        canonicalPath="/cookie-policy"
      />
      {/* ── 1. Hero Section ── */}
      <section className="relative overflow-hidden bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#DCE5F5]">
        <div className="relative mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          {/* Breadcrumb */}
          <p className="mb-6 aqe-caption text-[#69758a]">
            <a href="/" className="hover:text-[#1763ff] transition-colors">Home</a>
            <span className="mx-1.5 text-[#cbd5e1]">›</span>
            <span className="text-[#1763ff] font-semibold">Cookie Policy</span>
          </p>

          <Reveal>
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1763ff]" />
              <span className="aqe-label-text text-[#1763ff]">TRUST & TRANSPARENCY</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="aqe-hero-heading text-[#0B1638] tracking-tight leading-[1.08]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.25rem)" }}
            >
              Cookie Policy
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#5c6780]">
              <ShieldCheck className="w-4 h-4 text-[#1763ff]" />
              <span>Last updated: 13 November 2026</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Content Section ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-12">
          <Reveal delay={0.1}>
            <div className="space-y-0 text-[#475569] leading-relaxed text-[15px] sm:text-[16px]">
              
              {/* 1. Introduction */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-5 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">1. Introduction</h2>
                <p className="text-[#475569] leading-relaxed">
                  AscendQE ("we", "our", or "us") uses cookies and similar technologies on its website and digital platforms to provide a secure, reliable, and user-friendly experience.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  This Cookie Policy explains what cookies are, how we use them, the types of information they may collect, and the choices available to you when visiting our website or using our services.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  This policy should be read together with our Privacy Policy.
                </p>
              </section>

              {/* 2. What Are Cookies? */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-5 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">2. What Are Cookies?</h2>
                <p className="text-[#475569] leading-relaxed">
                  Cookies are small text files stored on your device when you visit a website. They help websites recognize your browser, remember certain preferences, maintain sessions, and improve functionality.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  Similar technologies, including browser local storage, may also be used to store information on your device and support website or application functionality.
                </p>
              </section>

              {/* 3. How We Use Cookies */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-5 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">3. How We Use Cookies</h2>
                <p className="text-[#475569] leading-relaxed">
                  AscendQE may use cookies and similar technologies for the following purposes:
                </p>

                {/* 3A Strictly Necessary */}
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1763ff] mb-3">A. Strictly Necessary Cookies</h3>
                  <p className="mb-3 text-[#475569] leading-relaxed">
                    These cookies are essential for the proper functioning and security of our website and digital services.
                  </p>
                  <p className="mb-3 text-[#475569] leading-relaxed">They may be used to:</p>
                  <ul className="list-disc pl-6 space-y-1.5 text-[#475569]">
                    <li>Maintain secure user sessions and authentication.</li>
                    <li>Support account access and workspace functionality.</li>
                    <li>Protect our website and services against security threats.</li>
                    <li>Maintain the reliability and availability of our platforms.</li>
                  </ul>
                  <p className="mt-3 text-[#475569] leading-relaxed">
                    These cookies cannot generally be disabled through our website's cookie controls because they are necessary for core functionality.
                  </p>
                </div>

                {/* 3B Functional */}
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1763ff] mb-3">B. Functional Cookies</h3>
                  <p className="mb-3 text-[#475569] leading-relaxed">
                    Functional cookies help remember your preferences and improve your experience.
                  </p>
                  <p className="mb-3 text-[#475569] leading-relaxed">They may be used to:</p>
                  <ul className="list-disc pl-6 space-y-1.5 text-[#475569]">
                    <li>Remember workspace preferences.</li>
                    <li>Store display and user interface preferences.</li>
                    <li>Maintain selected settings between visits.</li>
                    <li>Provide a consistent experience across sessions.</li>
                  </ul>
                </div>

                {/* 3C Analytics */}
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1763ff] mb-3">C. Analytics and Performance Cookies</h3>
                  <p className="mb-3 text-[#475569] leading-relaxed">
                    If enabled on our website, analytics cookies may help us understand how visitors interact with our website.
                  </p>
                  <p className="mb-3 text-[#475569] leading-relaxed">They may collect information such as:</p>
                  <ul className="list-disc pl-6 space-y-1.5 text-[#475569]">
                    <li>Pages visited and time spent on pages.</li>
                    <li>Browser and device information.</li>
                    <li>Website navigation patterns.</li>
                    <li>Traffic sources and general website performance.</li>
                  </ul>
                  <p className="mt-3 text-[#475569] leading-relaxed">
                    This information helps us understand website usage and improve our digital experience. Where required by applicable law, these cookies will only be activated after obtaining your consent.
                  </p>
                </div>

                {/* 3D Marketing */}
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1763ff] mb-3">D. Advertising and Marketing Cookies</h3>
                  <p className="mb-3 text-[#475569] leading-relaxed">
                    AscendQE does not use cookies for advertising within the myDiya AI service, as described in its Privacy Policy.
                  </p>
                  <p className="mt-3 text-[#475569] leading-relaxed">
                    If advertising or marketing cookies are introduced on other AscendQE websites or services, we will provide appropriate information and obtain consent wherever required by applicable law.
                  </p>
                </div>
              </section>

              {/* 4. Cookies and Local Storage in Our Services */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-5 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">4. Cookies and Local Storage in Our Services</h2>
                <p className="text-[#475569] leading-relaxed">
                  Our digital platforms may use cookies and browser local storage to support essential functionality, including:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-[#475569] mt-3">
                  <li>Keeping users signed in.</li>
                  <li>Remembering workspace and display preferences.</li>
                  <li>Maintaining service security.</li>
                  <li>Supporting the operation of our platforms.</li>
                </ul>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  These technologies help provide a consistent and secure experience when users access AscendQE services.
                </p>
              </section>

              {/* 5. Third-Party Cookies */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-5 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">5. Third-Party Cookies</h2>
                <p className="text-[#475569] leading-relaxed">
                  Some website features or services may involve third-party providers, such as analytics, embedded content, or external integrations.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  These providers may use their own cookies or similar technologies, subject to their respective privacy and cookie policies.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  AscendQE does not control cookies placed directly by third-party websites. We encourage users to review the applicable third-party policies.
                </p>
              </section>

              {/* 6. Managing Your Cookie Preferences */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-5 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">6. Managing Your Cookie Preferences</h2>
                <p className="text-[#475569] leading-relaxed">
                  You can manage or restrict cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-[#475569] mt-3">
                  <li>View cookies stored on your device.</li>
                  <li>Delete existing cookies.</li>
                  <li>Block cookies from specific websites.</li>
                  <li>Block all or selected types of cookies.</li>
                  <li>Receive notifications when cookies are being stored.</li>
                </ul>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  Please note that disabling strictly necessary cookies may affect website functionality, account access, or certain platform features.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  Where a cookie consent mechanism is provided, you can use it to manage your preferences for non-essential cookies.
                </p>
              </section>

              {/* 7. Data Retention */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-5 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">7. Data Retention</h2>
                <p className="text-[#475569] leading-relaxed">
                  Cookies may remain on your device for different periods depending on their purpose.
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-[#475569] mt-3">
                  <li>
                    <strong className="text-[#0B1638] font-semibold">Session cookies:</strong> These are generally deleted when you close your browser.
                  </li>
                  <li>
                    <strong className="text-[#0B1638] font-semibold">Persistent cookies:</strong> These remain on your device until they expire or are deleted manually.
                  </li>
                </ul>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  The retention period for information stored through browser local storage may depend on the relevant service functionality and your browser settings.
                </p>
              </section>

              {/* 8. Data Protection and Privacy */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-5 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">8. Data Protection and Privacy</h2>
                <p className="text-[#475569] leading-relaxed">
                  Information collected through cookies and similar technologies is handled in accordance with our Privacy Policy and applicable data protection requirements.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  We take appropriate measures to protect information processed through our website and services.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  For more information about how AscendQE collects, uses, stores, and protects personal information, please refer to our Privacy Policy.
                </p>
              </section>

              {/* 9. Updates to This Cookie Policy */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-3 sm:p-5 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">9. Updates to This Cookie Policy</h2>
                <p className="text-[#475569] leading-relaxed">
                  AscendQE may update this Cookie Policy from time to time to reflect changes in our website, technologies, services, or applicable legal requirements.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  Any updates will be published on this page along with the revised "Last Updated" date.
                </p>
                <p className="mt-3 text-[#475569] leading-relaxed">
                  We encourage visitors to review this page periodically to stay informed about our cookie practices.
                </p>
              </section>

             {/* Contact Us */}
              <section className="rounded-2xl border border-[#DCE5F5] bg-[#f7f9fd] p-3 sm:p-5 shadow-[0_4px_24px_rgba(20,91,255,0.04)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">10. Contact Us</h2>
                <p className="mb-6 text-[#475569]">
                  If you have any questions, inquiries, or privacy-related requests regarding this Privacy Policy, please reach out to us:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#1763ff] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-[#0B1638] text-sm">Email</span>
                      <a href="mailto:hello@ascendqe.com" className="text-[#1763ff] hover:underline font-medium">
                        hello@ascendqe.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#1763ff] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-[#0B1638] text-sm">Phone</span>
                      <a href="tel:+919392576186" className="text-[#1763ff] hover:underline font-medium">
                        +91  70959 70067
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#1763ff] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-[#0B1638] text-sm">Registered Address</span>
                      <p className="text-[#475569] text-sm">
                        Manjeera Trinity Corporate, Ground Floor, Unit No. 03, KPHB PHASE-III, Kukatpally, Hyderabad, Telangana 500072
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[#475569] leading-relaxed">
                  For privacy-related questions, you may also contact us through the channels listed in our Privacy Policy.
                </p>
              </section>

            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default CookiePolicyPage;
