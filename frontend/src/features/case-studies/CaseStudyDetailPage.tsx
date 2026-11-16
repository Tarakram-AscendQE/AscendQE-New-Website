import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, Quote } from 'lucide-react';
import { getCategory, getStudy, getStudiesByCategory, type Block } from '@/data/caseStudies';
import { StudyCard } from '@/features/case-studies/StudyCard';
import { HeadMeta } from '@/components/seo/HeadMeta';

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-[#0b1831]">{children}</h2>
  );
}

function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case 'text':
      return (
        <section>
          <H>{b.title}</H>
          <p className="text-lg leading-relaxed text-[#64748b]">{b.body}</p>
        </section>
      );

    case 'list':
      return (
        <section>
          <H>{b.title}</H>
          <ul className="space-y-3 list-none p-0 m-0" style={{ listStyle: 'none' }}>
            {b.items.map((it) => (
              <li key={it} className="flex gap-3 text-[#64748b] list-none" style={{ listStyle: 'none' }}>
                <Check className="mt-1 h-5 w-5 shrink-0 text-[#1763ff]" />
                <span className="leading-relaxed">{it}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    case 'quote':
      return (
        <section
          className="rounded-3xl p-8 text-white shadow-[0_20px_50px_-20px_rgba(23,99,255,0.45)] md:p-10"
          style={{
            backgroundImage: 'linear-gradient(135deg, #1763ff, #38bdf8)',
          }}
        >
          <Quote className="h-8 w-8 opacity-70" />
          <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] opacity-80">
            {b.title}
          </p>
          <p className="mt-2 text-xl font-semibold leading-relaxed md:text-2xl">{b.body}</p>
        </section>
      );

    case 'steps':
      return (
        <section>
          <H>{b.title}</H>
          {b.intro && <p className="mb-6 text-[#64748b]">{b.intro}</p>}
          <ol
            className="relative space-y-4 border-l-2 border-[#e8f0ff] ml-5 pl-7 sm:pl-8 list-none"
            style={{ listStyle: 'none' }}
          >
            {b.steps.map((s, i) => (
              <li
                key={i}
                className="relative rounded-2xl border border-[#e8edf5] bg-white p-5 shadow-[0_1px_2px_rgba(11,24,49,0.04),0_12px_32px_-12px_rgba(40,80,180,0.14)] list-none"
                style={{ listStyle: 'none' }}
              >
                <span className="absolute -left-[45px] sm:-left-[49px] top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#1763ff] text-sm font-bold text-white shadow-sm ring-4 ring-white select-none">
                  {i + 1}
                </span>
                <div className="grid gap-3 md:grid-cols-[180px_1fr_1fr] md:items-center">
                  <div>
                    <div className="font-bold text-[#0b1831]">{s.specialist}</div>
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#1763ff]">
                      {s.role}
                    </div>
                  </div>
                  <p className="text-sm text-[#64748b]">{s.action}</p>
                  <p className="rounded-xl bg-[#eff4ff] px-4 py-3 text-sm font-medium text-[#4a6080]">
                    {s.result}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );

    case 'timeline':
      return (
        <section>
          <H>{b.title}</H>
          <div className="grid gap-4 md:grid-cols-4">
            {b.items.map((t) => (
              <div
                key={t.when}
                className="rounded-2xl border border-[#e8edf5] bg-white p-5 shadow-[0_1px_2px_rgba(11,24,49,0.04),0_12px_32px_-12px_rgba(40,80,180,0.14)]"
              >
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#1763ff]">
                  {t.when}
                </div>
                <p className="mt-2 text-sm text-[#64748b]">{t.what}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case 'stats':
      return (
        <section>
          <H>{b.title}</H>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {b.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-[#eff4ff] p-5">
                <div className="text-3xl font-extrabold text-[#1763ff]">{s.value}</div>
                <div className="mt-1 text-xs text-[#4a6080]">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      );

    case 'compare':
      return (
        <section>
          <H>{b.title}</H>
          <div className="overflow-hidden rounded-2xl border border-[#e8edf5] bg-white shadow-[0_1px_2px_rgba(11,24,49,0.04),0_12px_32px_-12px_rgba(40,80,180,0.14)]">
            <div className="grid grid-cols-3 bg-[#eff4ff] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#4a6080]">
              <span>Measure</span>
              <span>Before</span>
              <span>After</span>
            </div>
            {b.rows.map((r) => (
              <div
                key={r.measure}
                className="grid grid-cols-3 gap-4 border-t border-[#e8edf5] px-5 py-4 text-sm"
              >
                <span className="font-semibold text-[#0b1831]">{r.measure}</span>
                <span className="text-[#64748b]">{r.before}</span>
                <span className="font-semibold text-emerald-600">{r.after}</span>
              </div>
            ))}
          </div>
        </section>
      );

    case 'breakdown':
      return (
        <section>
          <H>{b.title}</H>
          <div className="space-y-4 rounded-2xl border border-[#e8edf5] bg-white p-6 shadow-[0_1px_2px_rgba(11,24,49,0.04),0_12px_32px_-12px_rgba(40,80,180,0.14)]">
            {b.items.map((it) => (
              <div key={it.label}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-[#0b1831]">{it.label}</span>
                  <span className="text-[#64748b]">
                    {it.count} · {it.percent}%
                  </span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#f1f5f9]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${it.percent}%`,
                      backgroundImage: 'linear-gradient(135deg, #1763ff, #38bdf8)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    default:
      return null;
  }
}

export function CaseStudyDetailPage() {
  const { category: categorySlug, slug } = useParams<{ category: string; slug: string }>();
  const study = getStudy(categorySlug ?? '', slug ?? '');
  const category = getCategory(categorySlug ?? '');

  if (!study || !category) {
    return <Navigate to="/case-studies" replace />;
  }

  const related = getStudiesByCategory(category.slug).filter((s) => s.slug !== study.slug);

  return (
    <div className="min-h-screen bg-white">
      <HeadMeta
        title={`${study.title} | Case Study | AscendQE`}
        description={study.summary}
        canonicalPath={`/case-studies/${category.slug}/${study.slug}`}
      />

      {/* Hero Section */}
      <section
        className="pt-32 sm:pt-36 pb-12"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(23,99,255,0.08) 0%, transparent 70%)',
        }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <Link
            to={`/case-studies/${category.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748b] hover:text-[#1763ff] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {category.name}
          </Link>

          <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#1763ff]">
            {study.client} · {study.industry}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0b1831] md:text-6xl">
            {study.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[#64748b] leading-relaxed">{study.summary}</p>

          {study.sample && (
            <p className="mt-6 inline-block rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-xs text-[#64748b]">
              Illustrative sample: client, figures and timelines are sample data.
            </p>
          )}

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {study.headlineStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[#e8edf5] bg-white p-5 shadow-[0_1px_2px_rgba(11,24,49,0.04),0_12px_32px_-12px_rgba(40,80,180,0.14)]"
              >
                <div
                  className="text-3xl font-extrabold"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #1763ff, #38bdf8)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {s.value}
                </div>
                <div className="mt-2 text-xs leading-snug text-[#64748b]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Blocks */}
      <main className="mx-auto max-w-5xl space-y-16 px-6 py-16">
        {study.blocks.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </main>

      {/* Related Studies */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <h2 className="text-2xl font-extrabold text-[#0b1831]">More in {category.name}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((s) => (
              <StudyCard key={s.slug} study={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
