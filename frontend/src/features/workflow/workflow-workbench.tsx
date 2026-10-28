import React, { useState } from 'react';
import { workflowSteps } from '../../data/workflowSteps';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Code2, Play, AlertCircle, GitFork, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const icons = [Code2, Play, AlertCircle, GitFork, ArrowUpRight];

export const WorkflowWorkbench: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = workflowSteps[activeStepIndex];
  const StepIcon = icons[activeStepIndex] || Code2;

  return (
    <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-surface-border mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue block">
            EXPLORE THE QUALITY WORKFLOW
          </span>
          <h3 className="text-lg font-bold text-ink">Deterministic 5-Step Assurance Lifecycle</h3>
        </div>
        <span className="text-xs text-ink-muted bg-surface-card px-3 py-1 rounded-full w-fit">
          Illustrative interactive workflow
        </span>
      </div>

      {/* Step Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8" role="tablist">
        {workflowSteps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveStepIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                isActive
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-surface-subtle text-ink-muted border-surface-border hover:bg-surface-card hover:text-ink'
              }`}
            >
              {step.number.split(' / ')[0]} / {step.title}
            </button>
          );
        })}
      </div>

      {/* Active Step Content Card */}
      <Card variant="subtle" className="relative overflow-hidden p-6 sm:p-10 border-blue/20">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-blue text-white flex items-center justify-center shrink-0 shadow-md">
            <StepIcon className="h-6 w-6" />
          </div>
          <div>
            <Badge variant="blue">{currentStep.number}</Badge>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1">
              {currentStep.headline}
            </h4>
          </div>
        </div>

        <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-3xl mt-4">
          {currentStep.description}
        </p>

        {/* Concrete Example Box */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-white border border-surface-border flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-blue shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold uppercase text-ink-muted tracking-wider block mb-1">
              Real-World Workload Example
            </span>
            <p className="text-sm font-medium text-ink">
              {currentStep.example}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

