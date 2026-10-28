import { ReactNode } from 'react';
import { Reveal } from '../../components/ui/shared';
import { Quote, ArrowRight } from 'lucide-react';
import srinivasanImg from '../../assets/Testimonial-images/srinivasan-desikan.webp';
import sudhakarImg from '../../assets/Testimonial-images/qtp-sudhakar.webp';

export interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  linkedin?: string;
  quote: string;
}

/**
 * Easily scalable testimonials array.
 * To add a new testimonial in the future:
 * Simply add a new object to this array with id, name, title, company, image, linkedin, and quote.
 * Paragraphs inside `quote` can be separated by `\n\n`.
 * Markdown links like `[Label](url)` inside the quote will automatically be rendered as interactive links.
 */
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'srinivasan-desikan',
    name: 'Srinivasan Desikan',
    title: 'Managing Director & Chief Consultant',
    company: 'QualPlayers',
    image: srinivasanImg,
    linkedin: 'https://www.linkedin.com/in/srini123/',
    quote: `Working with the AscendQE team has been a truly valuable experience. Their AI-powered myDiya platform demonstrated an impressive combination of innovation, technical depth, and practical business value.\n\nThe team quickly understood our objectives, engaged with professionalism, and demonstrated how Agentic AI can accelerate Quality Engineering, improve delivery efficiency, and strengthen confidence across the software lifecycle.\n\nWhat stood out most was AscendQE's ability to translate complex Quality Engineering challenges into simple, scalable, and enterprise-ready solutions.\n\nI highly recommend them to organizations seeking next-generation, AI-driven Quality Engineering solutions.`,
  },
  {
    id: 'qtp-sudhakar',
    name: 'Qtp Sudhakar (Sudhakar Kakunuri)',
    title: 'Founder & Quality Engineering Leader',
    company: 'VibeTestQ',
    image: sudhakarImg,
    linkedin: 'https://in.linkedin.com/in/qtpsudhakar',
    quote: `It's a SaaS, multi tenant QE platform with dedicated agents for every stage of the software testing lifecycle. My initial impressions were excellent and it exceeded my expectations.\n\nIt integrates with major project and test management tools to kick off testing, autonomously explores applications, creates test automation with parallel running agents, executes suites, self heals broken tests, and auto maintains them over time.\n\nIt also ships with an agent CLI that integrates directly into AI IDEs, which was genuinely great to see, since that's exactly what makes a platform usable from where development is happening, not just alongside it.\n\nI really enjoyed walking through the end to end execution of a testing project with the team. My suggestions were welcomed and taken seriously, always a good sign.\n\nI've said this before. In the AI era, QA leaders can get the best output from teams. Kudos, [Nag Pusuluri](https://www.linkedin.com/in/nag-pusuluri/), you live up to your name, Testing Nageswara Rao. You've shown what a testing product looks like when it's built and headed by a true QA leader.`,
  },
];

/**
 * Utility to parse markdown links like [Text](url) inside quotes
 */
function renderParagraphWithLinks(text: string): ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [_, linkText, url] = match;
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#1763ff] underline decoration-[#1763ff]/40 underline-offset-2 transition-colors hover:text-[#0e53e6] hover:decoration-[#0e53e6]"
      >
        {linkText}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0b1831]">
      {/* ── 1. Hero Section (Light, matching all other AscendQE pages) ── */}
      <section className="relative overflow-hidden bg-[#f7f9fd] bg-[radial-gradient(ellipse_at_80%_45%,#dceeff66,transparent_50%)] pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#DCE5F5]">
        <div className="relative mx-auto w-full px-6 sm:px-12 md:px-[88px] lg:px-24">
          {/* Breadcrumb */}
          <p className="mb-6 aqe-caption text-[#69758a]">
            <a href="/" className="hover:text-[#1763ff] transition-colors">Home</a>
            <span className="mx-1.5 text-[#cbd5e1]">›</span>
            <span className="text-[#69758a]">Who We Are</span>
            <span className="mx-1.5 text-[#cbd5e1]">›</span>
            <span className="text-[#1763ff] font-semibold">Testimonials</span>
          </p>

          <Reveal>
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE5F5] bg-[#EAF1FF] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1763ff]" />
              <span className="aqe-label-text text-[#1763ff]">CLIENT & LEADER ENDORSEMENTS</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="aqe-hero-heading text-[#0B1638] tracking-tight leading-[1.08]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.25rem)" }}
            >
              What Industry Leaders Say About <br />
              <span className="text-[#1763ff]">AscendQE</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="aqe-intro mt-6 max-w-2xl text-[#263653] leading-relaxed">
              Hear from engineering and testing leaders who have partnered with AscendQE to transform their quality engineering with autonomous AI agent platforms.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Testimonials Cards Section ── */}
      <section className="relative bg-[#f8fafc] py-20 sm:py-28 border-t border-[#DCE5F5]">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12 space-y-12 sm:space-y-16">
          {TESTIMONIALS.map((testimonial, idx) => (
            <Reveal key={testimonial.id} delay={0.1 * idx}>
              <div className="relative rounded-3xl border border-[#e0e5ef] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(20,91,255,0.06)] hover:shadow-[0_16px_40px_rgba(20,91,255,0.1)] hover:border-[#1763ff]/40 transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:gap-10 lg:gap-12">
                  {/* Left Column: Photo & LinkedIn */}
                  <div className="flex flex-col items-center md:items-start shrink-0 w-full md:w-[220px] lg:w-[240px]">
                    <div className="relative w-44 sm:w-52 md:w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-[#DCE5F5] bg-[#EAF1FF] transition-transform duration-300 hover:scale-[1.02]">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* LinkedIn Link */}
                    {testimonial.linkedin && (
                      <a
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-5 inline-flex items-center gap-2.5 text-[#0b1831] hover:text-[#0a66c2] transition-colors"
                      >
                        <svg
                          className="w-5 h-5 fill-[#0a66c2] transition-transform duration-200 group-hover:scale-110"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37z" />
                        </svg>
                        <span className="text-[14px] font-bold tracking-tight text-[#0B1638] group-hover:text-[#0a66c2] transition-colors">
                          LinkedIn Profile
                        </span>
                      </a>
                    )}

                    <div className="w-full h-px bg-[#e0e5ef] mt-4 mb-6 md:mb-0" />
                  </div>

                  {/* Right Column: Name, Title & Testimonial Paragraphs */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1638] tracking-tight">
                          {testimonial.name}
                        </h2>

                        <p className="mt-1.5 mb-6 text-xs sm:text-[13px] font-bold tracking-[0.12em] text-[#64748B] uppercase">
                          {testimonial.title} <span className="text-[#cbd5e1] mx-1.5">•</span>{" "}
                          <span className="text-[#1763ff] font-bold">{testimonial.company}</span>
                        </p>
                      </div>
                      <Quote className="h-8 w-8 text-[#1763ff]/20 shrink-0 hidden sm:block" />
                    </div>

                    <div className="space-y-4 sm:space-y-4.5 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#334155]">
                      {testimonial.quote.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className="aqe-paragraph text-[#334155]">{renderParagraphWithLinks(paragraph)}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 3. Bottom CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFF] to-[#F5F8FF] py-20 lg:py-24 border-t border-[#DCE5F5]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="relative rounded-[26px] bg-[#EAF1FF] border border-[#DCE5F5] p-9 sm:p-12 md:p-14 shadow-[0_4px_24px_rgba(20,91,255,0.06)]">
            <Reveal>
              <h2
                className="aqe-section-heading text-[#0B1638]"
                style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", lineHeight: 1.15, fontWeight: 700 }}
              >
                Experience Autonomous Quality Engineering
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mx-auto mt-4 max-w-xl text-[15px] sm:text-[16px] text-[#263653] leading-relaxed">
                Join forward-thinking engineering teams delivering zero-defect releases with AscendQE's multi-agent platform.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/start"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#1763ff] hover:bg-[#0e53e6] px-8 py-3.5 font-semibold text-white shadow-[0_8px_24px_-10px_rgba(23,99,255,0.6)] transition-all hover:shadow-[0_12px_28px_rgba(23,99,255,0.4)] hover:-translate-y-0.5 active:scale-95"
                >
                  Start Free with 100 Tests <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/proof"
                  className="rounded-xl border border-[#DCE5F5] bg-white px-7 py-3.5 font-semibold text-[#0B1638] shadow-sm transition-all hover:bg-[#EAF1FF] active:scale-95"
                >
                  See How It Works
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
