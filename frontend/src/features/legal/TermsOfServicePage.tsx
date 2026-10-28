import { Reveal } from '@/shared';
import { Mail, Phone, MapPin, FileCheck } from 'lucide-react';

export function TermsOfServicePage() {
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
            <span className="text-[#1763ff] font-semibold">Terms of Service</span>
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
              Terms of Service
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#5c6780]">
              <FileCheck className="w-4 h-4 text-[#1763ff]" />
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
              
              {/* 1. Agreement to Terms */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">1. Agreement to Terms</h2>
                <p className="text-[#475569] leading-relaxed">
                  By accessing or using AscendQE's website, platform, software, and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our platform and services.
                </p>
              </section>

              {/* 2. Use License */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">2. Use License</h2>
                <p className="mb-4">
                  Permission is granted to access and use AscendQE's services subject to your agreed commercial subscription and the following restrictions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#475569]">
                  <li>You must not modify, decompile, or copy our underlying proprietary source materials without express authorization</li>
                  <li>You must not use our materials for unauthorized resale or multi-tenant redistribution without an enterprise license</li>
                  <li>You must not attempt to reverse engineer any software, model weights, or agents contained on our platform</li>
                  <li>You must not remove any copyright or proprietary notices from our software or documentation</li>
                  <li>You must not transfer or mirror our platform software on unauthorized servers or infrastructure</li>
                </ul>
              </section>

              {/* 3. Account Registration */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">3. Account Registration</h2>
                <p className="text-[#475569] leading-relaxed">
                  When you register for an enterprise account, you must supply accurate, complete, and current organization information. You are responsible for safeguarding your credential keys, authentication tokens, and SSO access, and for all activities that take place under your tenant account.
                </p>
              </section>

              {/* 4. Acceptable Use */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">4. Acceptable Use</h2>
                <p className="mb-4">
                  You agree not to use our services:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#475569]">
                  <li>In any manner that violates applicable regional, national, or international laws or security guidelines</li>
                  <li>To run unauthorized volumetric denial-of-service tests or security attacks against third-party networks without explicit consent</li>
                  <li>To impersonate AscendQE personnel, another registered user, or any third party entity</li>
                  <li>To introduce malicious payloads, viruses, ransomware, or harmful computer code into the platform</li>
                  <li>To attempt unauthorized access to platform components, private models, databases, or client clusters</li>
                </ul>
              </section>

              {/* 5. Intellectual Property Rights */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">5. Intellectual Property Rights</h2>
                <p className="text-[#475569] leading-relaxed">
                  All platform software, AI agent architectures, user interfaces, branding, patents, and proprietary documentation are the exclusive property of AscendQE and its licensors. Test scripts, test scenarios, and custom datasets generated by the customer through their lawful use of the platform remain the customer's property as governed by the applicable enterprise agreement.
                </p>
              </section>

              {/* 6. Service Availability */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">6. Service Availability</h2>
                <p className="text-[#475569] leading-relaxed">
                  We strive to provide continuous, high-uptime availability of our cloud services in accordance with agreed service level agreements (SLAs). Scheduled maintenance windows, infrastructure updates, and urgent security patches may occasionally require brief downtime, which we announce in advance whenever feasible.
                </p>
              </section>

              {/* 7. Fees and Payment */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">7. Fees and Payment</h2>
                <p className="text-[#475569] leading-relaxed">
                  Access to AscendQE platform tiers is provided subject to commercial terms outlined in your enterprise service order or master services agreement. All fees are invoiced and payable per agreed timelines. Unless otherwise stated in a written commercial agreement, platform fees are non-refundable.
                </p>
              </section>

              {/* 8. Termination */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">8. Termination</h2>
                <p className="text-[#475569] leading-relaxed">
                  We may terminate or suspend access to our platform immediately, without prior notice, if you breach these Terms or your enterprise agreement. Upon termination, your authorization to use the platform services ceases, and you must decommission any locally installed runtime agents or connectors.
                </p>
              </section>

              {/* 9. Limitation of Liability */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">9. Limitation of Liability</h2>
                <p className="text-[#475569] leading-relaxed">
                  To the maximum extent allowed by applicable law, AscendQE and its directors, officers, employees, and licensors shall not be held liable for indirect, incidental, special, punitive, or consequential damages, including loss of revenue, profits, business opportunities, or production outages resulting from your use of or inability to use the platform.
                </p>
              </section>

              {/* 10. Disclaimer */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">10. Disclaimer</h2>
                <p className="text-[#475569] leading-relaxed">
                  AscendQE services are delivered on an "AS IS" and "AS AVAILABLE" basis. Except as expressly provided in an executed master services agreement, AscendQE disclaims all warranties, whether statutory, express, or implied, including merchantability, fitness for a particular use, and non-infringement.
                </p>
              </section>

              {/* 11. Indemnification */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">11. Indemnification</h2>
                <p className="text-[#475569] leading-relaxed">
                  You agree to defend, indemnify, and hold harmless AscendQE, its affiliates, directors, officers, employees, and contractors from and against any claims, losses, liabilities, costs, or reasonable legal expenses arising from your violation of these Terms or unauthorized use of the platform.
                </p>
              </section>

              {/* 12. Governing Law */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">12. Governing Law</h2>
                <p className="text-[#475569] leading-relaxed">
                  These Terms of Service are governed by and construed in accordance with the applicable laws of the jurisdiction specified in your commercial customer agreement, without regard to conflict of law principles.
                </p>
              </section>

              {/* 13. Changes to Terms */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">13. Changes to Terms</h2>
                <p className="text-[#475569] leading-relaxed">
                  We reserve the right to revise or replace these Terms at our discretion. For material changes, reasonable prior notification will be provided via the website or registered account channels. Continued use of our platform after updates indicates your acceptance of revised terms.
                </p>
              </section>

              {/* 14. Severability */}
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,91,255,0.03)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">14. Severability</h2>
                <p className="text-[#475569] leading-relaxed">
                  If any provision of these Terms is found to be invalid or unenforceable under applicable law, such provision will be interpreted to accomplish its objectives to the greatest extent possible, and the remaining provisions will continue in full force and effect.
                </p>
              </section>

              {/* 15. Contact Information */}
              <section className="rounded-2xl border border-[#DCE5F5] bg-[#f7f9fd] p-6 sm:p-8 shadow-[0_4px_24px_rgba(20,91,255,0.04)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1638] mb-4">15. Contact Information</h2>
                <p className="mb-6 text-[#475569]">
                  If you have questions regarding these Terms of Service, please reach out to us:
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

export default TermsOfServicePage;
