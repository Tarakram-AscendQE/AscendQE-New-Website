import React from 'react';
import { ArrowRight, FileCheck, Layers, PlayCircle, ShieldCheck, FileText } from 'lucide-react';

const traceStages = [
  { label: 'Requirement', icon: FileText, desc: 'Agreed business behavior' },
  { label: 'Module', icon: Layers, desc: 'Application component' },
  { label: 'Test case', icon: FileCheck, desc: 'Assertion & parameters' },
  { label: 'Execution', icon: PlayCircle, desc: 'Deterministic run' },
  { label: 'Evidence', icon: ShieldCheck, desc: 'Diagnostic proof & logs' },
];

export const TraceDiagram: React.FC = () => {
  return (
    <div className="bg-surface-subtle border border-surface-border rounded-2xl p-6 sm:p-8 my-8">
      <div className="text-xs font-bold uppercase tracking-wider text-blue mb-4">
        CONNECTED CONTEXT PIPELINE
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {traceStages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <React.Fragment key={stage.label}>
              <div className="flex-1 w-full text-center p-4 bg-white rounded-xl border border-surface-border shadow-xs hover:border-blue transition-colors">
                <div className="h-9 w-9 rounded-lg bg-blue-light text-blue flex items-center justify-center mx-auto mb-2">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="font-bold text-sm text-ink">{stage.label}</div>
                <div className="text-[11px] text-ink-muted mt-0.5">{stage.desc}</div>
              </div>
              {idx < traceStages.length - 1 && (
                <div className="text-ink-muted/40 rotate-90 md:rotate-0">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <p className="mt-6 aqe-caption text-ink-muted text-center">
        Trace relationships across requirements, tests, results and defects. Use change impact and coverage gaps to focus the next round of testing.
      </p>
    </div>
  );
};

