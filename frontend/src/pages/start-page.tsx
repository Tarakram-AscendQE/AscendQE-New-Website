import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Reveal } from '@/shared';

export const StartPage: React.FC = () => {
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
  const [submitError, setSubmitError] = useState('');

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
    setSubmitError('');
    setSubmitSuccess(false);

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

      const response = await fetch('/send-mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSubmitSuccess(true);
        // Reset form fields
        setFirstName('');
        setLastName('');
        setWorkEmail('');
        setCompany('');
        setJobTitle('');
        setApplication('');
        setScope('');
      } else {
        const errorMsg =
          result?.message ||
          'Failed to send enquiry. Please try again or contact hello@ascendqe.com directly.';
        setSubmitError(errorMsg);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(
        'Unable to reach the email service. Please try again or contact hello@ascendqe.com directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-[5.5%] py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Headings & Value Proposition */}
          <Reveal delay={0.1} className="flex flex-col pt-1">
            <div className="eyebrow">START WITH PROOF</div>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-[750] leading-[1.1] tracking-[-1.5px] text-[#0b1831] mt-3 mb-4">
              Your first 100 test cases.<br />
              <span className="text-[#1763ff]">Automated free.</span>
            </h1>
            <p className="text-[17px] sm:text-[18px] text-[#69758a] leading-relaxed mb-8 max-w-lg">
              See the scripts. Run the tests. Measure the difference.
            </p>

            <div className="pt-6 border-t border-[#e0e5ef]">
              <h2 className="text-2xl sm:text-[26px] font-[650] leading-[1.2] tracking-[-0.8px] text-[#0b1831] mb-4">
                Your application.<br />
                Your acceptance criteria.
              </h2>
              <ol className="start-list !my-4 !pl-5">
                <li>Bring real business test cases.</li>
                <li>Agree access, scope and success criteria.</li>
                <li>Review working automation and evidence.</li>
              </ol>
              <p className="lead !my-4 text-[17px] !text-[#0b1831]">
                Then decide how you want to scale.
              </p>
              <p className="fine text-[12px] text-[#69758a] leading-relaxed max-w-md">
                100 qualifying test cases. Eligibility, scope and acceptance criteria agreed before work begins.
              </p>
            </div>
          </Reveal>

          {/* Right Column: Form starting from the top */}
          <Reveal delay={0.2} className="w-full">
            <form id="brief-form" className="brief-panel !mt-0 !p-6 sm:!p-8" ref={formRef} onSubmit={handleSubmit}>
              <h3 className="text-[22px] sm:text-[24px] font-[650] tracking-[-0.5px] text-[#0b1831] mb-5">
                Let’s start with your application.
              </h3>

          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 my-5">
            <label className="!my-0">
              First Name
              <input
                name="firstName"
                required
                placeholder="e.g. John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="!my-0">
              Last Name
              <input
                name="lastName"
                required
                placeholder="e.g. Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          {/* Row 2: Work Email & Company */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 my-5">
            <label className="!my-0">
              Work Email
              <input
                type="email"
                name="workEmail"
                required
                placeholder="e.g. john@company.com"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
              />
            </label>
            <label className="!my-0">
              Company
              <input
                name="company"
                required
                placeholder="e.g. Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
          </div>

          {/* Row 3: Job Title */}
          <label>
            Job Title
            <input
              name="jobTitle"
              required
              placeholder="e.g. VP of Quality Engineering"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </label>

          <label>
            Application or project
            <input
              name="application"
              required
              placeholder="e.g. Customer checkout"
              value={application}
              onChange={(e) => setApplication(e.target.value)}
            />
          </label>
          <label>
            What would help your team?
            <select
              name="offer"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            >
              <option value="challenge">First 100 free test cases</option>
              <option value="platform">Private enterprise platform</option>
              <option value="managed">Managed services</option>
            </select>
          </label>
          <label className="!mb-3">
            Test cases and acceptance criteria
            <textarea
              name="scope"
              required
              rows={3}
              className="!h-20 resize-y"
              placeholder="What should the automation demonstrate?"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            ></textarea>
          </label>
          <button
            className="button !mt-1 !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending enquiry...' : 'Prepare my enquiry'}
          </button>

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

          {submitError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 mt-4 animate-in fade-in duration-200">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-900">Submission Notice</p>
                <p className="text-rose-700 aqe-caption mt-0.5">{submitError}</p>
                <a
                  href={`mailto:hello@ascendqe.com?subject=${encodeURIComponent('AscendQE — Evaluation Enquiry')}&body=${encodeURIComponent(generateBrief())}`}
                  className="inline-block text-xs font-semibold text-[#1763ff] underline mt-2"
                >
                  Click here to email hello@ascendqe.com directly
                </a>
              </div>
            </div>
          )}
        </form>
        </Reveal>
      </div>
    </div>
  </main>
);
};
