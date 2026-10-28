import { Reveal } from '@/shared';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0b1831]">
      {/* ── 1. Hero Section (Light, matching all other AscendQE pages) ── */}
      <section className="relative overflow-hidden bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#DCE5F5]">
        <div className="relative mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          {/* Breadcrumb */}
          <p className="mb-6 aqe-caption text-[#69758a]">
            <a href="/" className="hover:text-[#1763ff] transition-colors">Home</a>
            <span className="mx-1.5 text-[#cbd5e1]">›</span>
            <span className="text-[#69758a]">Legal</span>
            <span className="mx-1.5 text-[#cbd5e1]">›</span>
            <span className="text-[#1763ff] font-semibold">Privacy Policy</span>
          </p>

          <Reveal>
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1763ff]" />
              <span className="aqe-label-text text-[#1763ff]">LEGAL COMPLIANCE</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="aqe-hero-heading text-[#0B1638] tracking-tight leading-[1.08]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.25rem)" }}
            >
              Privacy Policy
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#5c6780]">
              <ShieldCheck className="w-4 h-4 text-[#1763ff]" />
              <span>Last updated: October 2026</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Content Section ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-12">
          <Reveal delay={0.1}>
            <div className="space-y-10 text-[#475569] leading-relaxed text-[15px] sm:text-[16px]">
              
              {/* Introduction */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">1. Introduction</h2>
                <p className="text-[#475569] leading-relaxed">
                  AscendQE ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our enterprise quality engineering platform and services.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">2. Information We Collect</h2>
                
                <h3 className="text-base sm:text-lg font-semibold text-[#1763ff] mb-3 mt-4">Personal Information</h3>
                <p className="mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-[#475569]">
                  <li>Register for an account or trial</li>
                  <li>Request a platform demo or technical proof of concept</li>
                  <li>Subscribe to our newsletters or research updates</li>
                  <li>Contact our engineering team for technical support</li>
                  <li>Apply for a job opening through our careers page</li>
                </ul>
                <p>
                  This information may include your name, business email address, phone number, company name, job title, and any other relevant project context you choose to share.
                </p>

                <h3 className="text-base sm:text-lg font-semibold text-[#1763ff] mb-3 mt-6">Automatically Collected Information</h3>
                <p>
                  When you visit our website, we automatically collect certain technical data regarding your device, including web browser details, IP address, device type, operating system, and interaction metrics across our pages.
                </p>
              </section>

              {/* How We Use Your Information */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">
                  We process collected information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#475569]">
                  <li>Provide, operate, calibrate, and maintain our quality engineering platform</li>
                  <li>Improve, personalize, and expand our platform capabilities and user workflows</li>
                  <li>Analyze usage trends and optimize system performance</li>
                  <li>Develop new AI testing models, integrations, and automation features</li>
                  <li>Communicate with you for customer support, service updates, and enterprise notices</li>
                  <li>Process commercial engagements, onboarding agreements, and billing arrangements</li>
                  <li>Protect against fraudulent, abusive, or unauthorized activity</li>
                </ul>
              </section>

              {/* Sharing Your Information */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">4. Sharing Your Information</h2>
                <p className="mb-4">
                  We do not sell your personal data. We may share information under strictly governed conditions:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-[#475569]">
                  <li>
                    <strong className="text-[#0B1638] font-semibold">Service Providers:</strong> Trusted third-party vendors who assist with cloud infrastructure, hosting, secure communication, and operational analytics under strict data confidentiality agreements.
                  </li>
                  <li>
                    <strong className="text-[#0B1638] font-semibold">Business Transfers:</strong> In connection with or during negotiation of any merger, acquisition, financing, or asset transaction involving AscendQE.
                  </li>
                  <li>
                    <strong className="text-[#0B1638] font-semibold">Legal Requirements:</strong> Where required by applicable law, court order, or official governmental request to comply with legal compliance obligations.
                  </li>
                  <li>
                    <strong className="text-[#0B1638] font-semibold">With Your Explicit Consent:</strong> For any other circumstance where you give explicit authorization.
                  </li>
                </ul>
              </section>

              {/* Data Security */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">5. Data Security</h2>
                <p>
                  We implement robust technical and organizational security controls, including encryption in transit and at rest, role-based access management, and continuous infrastructure auditing to safeguard your data. While no digital platform can guarantee absolute security, we continuously review and reinforce our safeguards.
                </p>
              </section>

              {/* Your Rights */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">6. Your Rights</h2>
                <p className="mb-4">
                  Depending on your geographic location and local data protection regulations, you may possess the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#475569]">
                  <li>Right to access personal data we hold about you</li>
                  <li>Right to request rectification of inaccurate or outdated information</li>
                  <li>Right to request erasure of your data under applicable conditions</li>
                  <li>Right to restrict or object to certain processing activities</li>
                  <li>Right to data portability in a machine-readable format</li>
                  <li>Right to withdraw previously given consent at any time</li>
                </ul>
              </section>

              {/* Cookies and Tracking */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">7. Cookies and Tracking Technologies</h2>
                <p>
                  We utilize standard session and analytical cookies to remember user preferences and measure overall site engagement. You can configure your browser preferences to reject or prompt for cookies, though some platform features may operate with reduced functionality as a result.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">8. Children's Privacy</h2>
                <p>
                  AscendQE services are designed exclusively for business enterprises and software development professionals. We do not knowingly collect personal details from anyone under 13 years of age. If you believe a minor has submitted personal data to us, please notify us immediately.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">9. Changes to This Privacy Policy</h2>
                <p>
                  We may periodically revise this Privacy Policy to reflect updates to our operational practices or statutory requirements. When revisions occur, the updated policy will be posted on this page with a revised effective date.
                </p>
              </section>

              {/* Contact Us */}
              <section className="rounded-2xl border border-[#DCE5F5] bg-[#f7f9fd] p-6 sm:p-8 shadow-[0_4px_24px_rgba(20,91,255,0.04)]">
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
                        +91 93925 76186
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
              </section>

            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
