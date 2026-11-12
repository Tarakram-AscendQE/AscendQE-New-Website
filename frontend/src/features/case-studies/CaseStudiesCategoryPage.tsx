import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { categories, getCategory, getStudiesByCategory } from '@/data/caseStudies';
import { StudyCard } from '@/features/case-studies/StudyCard';
import { HeadMeta } from '@/components/seo/HeadMeta';

export function CaseStudiesCategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>();
  const category = getCategory(categorySlug ?? '');

  if (!category) {
    return <Navigate to="/case-studies" replace />;
  }

  const studies = getStudiesByCategory(category.slug);

  return (
    <div className="min-h-screen bg-white">
      <HeadMeta
        title={`${category.name} Case Studies | AscendQE`}
        description={category.description}
        canonicalPath={`/case-studies/${category.slug}`}
      />

      {/* Hero Section */}
      <section
        className="pt-32 sm:pt-36 pb-12"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(23,99,255,0.08) 0%, transparent 70%)',
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748b] hover:text-[#1763ff] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>

          {/* Category filter pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/case-studies/${c.slug}`}
                className={
                  c.slug === category.slug
                    ? 'rounded-full bg-[#1763ff] px-4 py-2 text-sm font-semibold text-white shadow-sm'
                    : 'rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#0b1831] hover:border-[#1763ff] transition-colors'
                }
              >
                {c.name}
              </Link>
            ))}
          </div>

          <h1 className="mt-10 text-4xl font-extrabold tracking-tight text-[#0b1831] md:text-6xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#64748b]">{category.description}</p>
        </div>
      </section>

      {/* Case studies list */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((s) => (
            <StudyCard key={s.slug} study={s} />
          ))}
        </div>
      </main>
    </div>
  );
}
