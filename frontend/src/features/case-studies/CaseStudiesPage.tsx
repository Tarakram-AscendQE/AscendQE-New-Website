import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories, caseStudies, getStudiesByCategory } from '@/data/caseStudies';
import { StudyCard } from '@/features/case-studies/StudyCard';
import { HeadMeta } from '@/components/seo/HeadMeta';


export function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeadMeta
        title="Case Studies | AI Quality Engineering & Test Automation | AscendQE"
        description="See how the AscendQE agentic crew automates regression, heals broken tests, and accelerates release cycles across banking, enterprise, and modern apps."
        canonicalPath="/case-studies"
      />
      

      {/* Hero Section */}
      <section
        className="text-center px-6 pb-16 pt-32 sm:pt-36"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(23,99,255,0.08) 0%, transparent 70%)',
        }}
      >
        
        <div className="mx-auto max-w-4xl -mt-20">
          <nav aria-label="Breadcrumb" className="mb-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6A7E95]" style={{ fontSize: '12px' }}>
  <Link to="/" className="transition-colors hover:text-[#1763ff]">Home</Link>
  <span aria-hidden="true">›</span>
  <span className="text-[#1763ff]" aria-current="page">Case Studies</span>
</nav>

          <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#0b1831]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1763ff]" />
            Case studies
          </p>
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-[#0b1831] md:text-7xl">
            Real missions.
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #1763ff, #38bdf8)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Measured results.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#64748b]">
            See how the crew takes one intent from brief to reviewed, running automation. Pick a
            category to explore.
          </p>
          <div className="mt-8 flex justify-center gap-8 text-sm">
            <span>
              <b className="text-[#0b1831]">{categories.length}</b>{' '}
              <span className="text-[#64748b]">categories</span>
            </span>
            <span>
              <b className="text-[#0b1831]">{caseStudies.length}</b>{' '}
              <span className="text-[#64748b]">case studies</span>
            </span>
          </div>
        </div>
      </section>

      {/* Categories Shelf */}
      <main className="mx-auto max-w-7xl space-y-20 px-4 sm:px-8 md:px-12 lg:px-20 py-16">
        {categories.map((cat) => {
          const studies = getStudiesByCategory(cat.slug);
          return (
            <section key={cat.slug}>
              <div className="flex flex-col justify-between gap-4 border-b border-[#e8edf5] pb-6 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#1763ff]">
                    {studies.length} {studies.length === 1 ? 'CASE STUDY' : 'CASE STUDIES'}
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0b1831]">
                    {cat.name}
                  </h2>
                  <p className="mt-2 text-[#64748b]">{cat.tagline}</p>
                </div>
                <Link
                  to={`/case-studies/${cat.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-5 py-3 text-sm font-semibold text-[#1763ff] shadow-[0_1px_2px_rgba(11,24,49,0.04),0_12px_32px_-12px_rgba(40,80,180,0.14)] transition-all hover:bg-[#eff4ff] hover:border-[#1763ff]/40"
                >
                  View all in {cat.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {studies.slice(0, 3).map((s) => (
                  <StudyCard key={s.slug} study={s} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
