import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/data/caseStudies';
import { getCategory } from '@/data/caseStudies';

export function StudyCard({ study }: { study: CaseStudy }) {
  const cat = getCategory(study.category);
  return (
    <Link
      to={`/case-studies/${study.category}/${study.slug}`}
      className="group flex flex-col rounded-3xl border border-[#e8edf5] bg-white p-7 shadow-[0_1px_2px_rgba(11,24,49,0.04),0_12px_32px_-12px_rgba(40,80,180,0.14)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(23,99,255,0.3)] hover:border-[#1763ff]/30"
    >
      <div className="flex items-center justify-between">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#1763ff]">
          {cat?.name || study.category}
        </span>
        <ArrowUpRight className="h-5 w-5 text-[#9bb0cc] transition-colors group-hover:text-[#1763ff]" />
      </div>
      <h3 className="mt-4 text-xl font-bold leading-snug text-[#0b1831] group-hover:text-[#1763ff] transition-colors">
        {study.title}
      </h3>
      <p className="mt-1 text-sm text-[#64748b]">
        {study.client} · {study.industry}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-[#64748b]">{study.summary}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {study.headlineStats.slice(0, 2).map((s) => (
          <div key={s.label} className="rounded-2xl bg-[#eff4ff] p-4">
            <div className="text-2xl font-extrabold text-[#1763ff]">{s.value}</div>
            <div className="mt-1 text-xs leading-snug text-[#4a6080]">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {study.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[#e8edf5] px-3 py-1 text-xs font-medium text-[#64748b] bg-[#f8fafc]"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
