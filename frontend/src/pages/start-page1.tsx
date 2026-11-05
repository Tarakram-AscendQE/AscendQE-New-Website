import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle,Mail } from 'lucide-react';
import { Reveal } from '@/shared';
import { HeadMeta } from '@/components/seo/HeadMeta';

export const StartPage1: React.FC = () => {
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [application, setApplication] = useState('');
  const [offer, setOffer] = useState('challenge');
  const [scope, setScope] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    lastName?: string;
    workEmail?: string;
    company?: string;
    jobTitle?: string;
    application?: string;
    scope?: string;
  }>({});

  useEffect(() => {
    const offerParam = searchParams.get('offer');
    if (offerParam && ['platform', 'managed', 'challenge'].includes(offerParam)) {
      setOffer(offerParam);
    }
  }, [searchParams]);

  const generateBrief = () => {
    const contactInfo = [
      firstName || lastName ? `Name: ${[firstName, lastName].filter(Boolean).join(' ')}` : '',
      workEmail ? `Email: ${workEmail}` : '',
      company ? `Company: ${company}` : '',
      jobTitle ? `Job Title: ${jobTitle}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `AscendQE — Evaluation enquiry\nCode fast. Test faster.\n\n${
      contactInfo ? `${contactInfo}\n\n` : ''
    }Interest: ${offer}\nApplication: ${application}\n\nTest cases and acceptance criteria:\n${scope}\n\nCommercial context: Private enterprise platform from $25,000/month with a 12-month commitment ($300,000/year), agreed scope and capacity; operating costs additional. Managed services separately scoped. First 100 qualifying test cases automated free, subject to agreed access, scope and acceptance criteria.\n`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setSubmitSuccess(false);

    // Client-side validation: character limits
    if (firstName.length > 30) {
      setFieldErrors({ firstName: 'First Name max 30 characters.'});
      setIsSubmitting(false);
      return;
    }
    
    if (lastName.length > 30) {
      setFieldErrors({ lastName: 'Last Name max 30 characters.' });
      setIsSubmitting(false);
      return;
    }
    if (jobTitle.length > 40) {
      setFieldErrors({ jobTitle: 'Job Title max 40 characters.' });
      setIsSubmitting(false);
      return;
    }
    if (company.length > 40) {
      setFieldErrors({ company: 'Company max 40 characters.' });
      setIsSubmitting(false);
      return;
    }
    if (application.length > 40) {
      setFieldErrors({ application: 'Application max 40 characters.' });
      setIsSubmitting(false);
      return;
    }
    if (scope.length > 200) {
      setFieldErrors({ scope: 'Scope max 200 characters.' });
      setIsSubmitting(false);
      return;
    }

    // Client-side validation: email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(workEmail)) {
      setFieldErrors({ workEmail: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        firstName,
        lastName,
        workEmail,
        company,
        jobTitle,
        application,
        offer,
        scope,
        interest: offer,
        product: application,
        message: `Application or project: ${application}\nInterest: ${offer}\n\nTest cases and acceptance criteria:\n${scope}`,
        formType: 'contact',
      };

      let response: Response;
      try {
        response = await fetch('/api/send-mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.status === 404) {
          response = await fetch('/send-mail.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });
        }
      } catch (fetchErr) {
        response = await fetch('/send-mail.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      let result: any;
      try {
        result = await response.json();
      } catch {
        result = { success: false, message: 'Server error. Please try again.' };
      }

      if (response.ok && result.success) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFieldErrors({});
        setFirstName('');
        setLastName('');
        setWorkEmail('');
        setCompany('');
        setJobTitle('');
        setApplication('');
        setScope('');
        return;
      }

      // Map backend error to specific field
      const message = result.message || 'Submission failed. Please try again.';
      const lowerMsg = message.toLowerCase();

      if (lowerMsg.includes('firstname') || lowerMsg.includes('first name')) {
        setFieldErrors({ firstName: message });
      } else if (lowerMsg.includes('lastname') || lowerMsg.includes('last name')) {
        setFieldErrors({ lastName: message });
      } else if (lowerMsg.includes('email') || lowerMsg.includes('workemail')) {
        setFieldErrors({ workEmail: message });
      } else if (lowerMsg.includes('company')) {
        setFieldErrors({ company: message });
      } else if (lowerMsg.includes('jobtitle') || lowerMsg.includes('job title')) {
        setFieldErrors({ jobTitle: message });
      } else if (lowerMsg.includes('application') || lowerMsg.includes('project')) {
        setFieldErrors({ application: message });
      } else if (lowerMsg.includes('scope') || lowerMsg.includes('test cases')) {
        setFieldErrors({ scope: message });
      } else {
        setFieldErrors({ firstName: message });
      }

      setIsSubmitting(false);
    } catch (err) {
      setFieldErrors({ firstName: 'Unable to reach the email service. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <HeadMeta
        title="Contact AscendQE | AI Quality Engineering & Testing"
        description="Connect with AscendQE to explore AI-powered quality engineering, test automation, GenAI testing, and intelligent software testing solutions."
        canonicalPath="/contact"
      />
      <div className="max-w-[1400px] mx-auto px-6 sm:px-[5.5%] py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">
          <div className="flex flex-col pt-1">
            <div className="eyebrow">START WITH PROOF</div>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-[750] leading-[1.1] tracking-[-1.5px] text-[#0b1831] mt-3 mb-4">
              Your first 100 test cases.<br />
              <span className="text-[#1763ff]">Automated free.</span>
            </h1>
            <p className="text-[17px] sm:text-[18px] text-[#69758a] leading-relaxed mb-8 max-w-lg">
              See the scripts. Run the tests. Measure the difference.
            </p>
            <div className="pt-6 border-t border-[#e0e5ef]">
              <h2 className="text-2xl sm:text-[26px] font-[650] leading-[1.2] tracking-[-0.5px] text-[#0b1831] mb-5">
                Let’s start with your application.
              </h2>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-[750] leading-[1.1] tracking-[-1.5px] text-[#0b1831] mt-3 mb-4"><span className="text-[#1763ff]">Location</span></h1>
        
            <a style={{ fontSize: '18px' }}>
            Manjeera Trinity Corporate <br />
            Ground floor unit no 03, <br />
            eSeva Ln, KPHB Phase 3, Kukatpally <br />
            Hyderabad, Telangana 500072
            </a>
          {/*<div className="mt-12 flex items-center gap-2 text-sm text-[#69758a]">
          <Mail className="h-4 w-4 text-[#1763ff]" />
          <a
            href="mailto:hello@ascendqe.com"
            className="text-[#1763ff] font-medium hover:underline"
          >
             hello@ascendqe.com
          </a>
          </div>*/}
          <div className="mt-12 flex items-center gap-2 text-lg text-[#69758a]">
          <Mail className="h-5 w-5 text-[#1763ff]" />
          <a
          href="mailto:hello@ascendqe.com"
          className="text-lg text-[#1763ff] font-medium hover:underline"
          >
              hello@ascendqe.com
          </a>
          </div>
          </div>

          <div className="flex flex-col">
            <Reveal>
              <form id="brief-form" className="brief-panel !mt-0 !p-6 sm:!p-8" ref={formRef} onSubmit={handleSubmit} noValidate>
                {/* Row 1: First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                      First Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {/* {fieldErrors.firstName && (
                      <p className="text-[10px] text-red-500 mt-1">{fieldErrors.firstName}</p>
                    )} */}
                    {fieldErrors.firstName && (
                  <p style={{ color: '#ff0000', fontSize: '10px', marginTop: '4px' }}>
                    {fieldErrors.firstName}
                  </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                      Last Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {fieldErrors.lastName && (
                  <p style={{ color: '#ff0000', fontSize: '10px', marginTop: '4px' }}>
                    {fieldErrors.lastName}
                  </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Work Email & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                      Work Email <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      name="workEmail"
                      type="text"
                      required
                      placeholder="john@company.com"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                    />
                    {fieldErrors.workEmail && (
                  <p style={{ color: '#ff0000', fontSize: '10px', marginTop: '4px' }}>
                    {fieldErrors.workEmail}
                  </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                      Company <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      name="company"
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                    {fieldErrors.company && (
                      <p style={{ color: '#ff0000', fontSize: '10px', marginTop: '4px' }}>
                        {fieldErrors.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Job Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                      Job Title <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      name="jobTitle"
                      type="text"
                      required
                      placeholder="VP of Quality Engineering"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                    {fieldErrors.jobTitle && (
                      <p style={{ color: '#ff0000', fontSize: '10px', marginTop: '4px' }}>
                        {fieldErrors.jobTitle}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                      Application or project <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      name="application"
                      type="text"
                      required
                      placeholder="Customer checkout"
                      value={application}
                      onChange={(e) => setApplication(e.target.value)}
                    />
                    {fieldErrors.application && (
                      <p style={{ color: '#ff0000', fontSize: '10px', marginTop: '4px' }}>
                        {fieldErrors.application}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interest */}
                {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 tracking-wider sm:gap-4 my-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                      What would help your team?
                    </label>
                    <select
                      name="offer"
                      value={offer}
                      className="!h-50 y-80"
                      onChange={(e) => setOffer(e.target.value)}
                    >
                      <option value="challenge">First 100 free test cases</option>
                      <option value="platform">Private enterprise platform</option>
                      <option value="managed">Managed services</option>
                    </select>
                  </div>

                  <div className="hidden"></div>
                </div>*/}
                <label>
            What would help your team?
            <select
              name="offer"
              value={offer}
              className="!h-15 resize-y"
              onChange={(e) => setOffer(e.target.value)}
            >
              <option value="challenge">First 100 free test cases</option>
              <option value="platform">Private enterprise platform</option>
              <option value="managed">Managed services</option>
            </select>
          </label>
                {/* Scope */}
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                  Test cases and acceptance criteria <span style={{ color: 'red' }}>*</span>
                </label>
                <textarea
                  name="scope"
                  required
                  rows={3}
                  className="!h-35 resize-y"
                  placeholder="What should the automation demonstrate?"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                ></textarea>
                {fieldErrors.scope && (
                  <p style={{ color: '#ff0000', fontSize: '10px', marginTop: '4px' }}>
                    {fieldErrors.scope}
                  </p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    className="button !mt-1 !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending enquiry...' : 'Prepare my enquiry'}
                  </button>
                </div>

                {submitSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 mt-4 animate-in fade-in duration-200">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900">Enquiry sent successfully!</p>
                      <p className="text-emerald-700 aqe-caption mt-0.5">
                        Your enquiry has been delivered to <strong>hello@ascendqe.com</strong>. Our team will review your application and get in touch with you shortly.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
};
