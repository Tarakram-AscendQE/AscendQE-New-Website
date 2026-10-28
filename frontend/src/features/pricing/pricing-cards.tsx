import React from 'react';
import { Link } from 'react-router-dom';
import { pricingPlans } from '../../data/pricingPlans';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';

export const PricingCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {pricingPlans.map((plan) => {
        return (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-200 ${
              plan.isPrimary
                ? 'bg-navy text-white border-2 border-blue shadow-xl relative'
                : 'bg-white text-ink border border-surface-border shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge
                  variant={plan.isPrimary ? 'blue' : 'eyebrow'}
                  className={plan.isPrimary ? 'bg-blue/20 text-blue-muted' : ''}
                >
                  {plan.name}
                </Badge>
                {plan.isPrimary && (
                  <span className="text-xs font-bold text-white bg-blue px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}
              </div>

              <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${plan.isPrimary ? 'text-white' : 'text-ink'}`}>
                {plan.tagline}
              </h3>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">
                  {plan.priceFormatted}
                </span>
                {plan.period && (
                  <span className={`text-sm font-semibold ${plan.isPrimary ? 'text-slate-300' : 'text-ink-muted'}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className={`aqe-caption mt-1 font-medium ${plan.isPrimary ? 'text-slate-400' : 'text-ink-muted'}`}>
                {plan.commitmentNote}
              </p>

              {/* Feature List */}
              <ul className="mt-8 space-y-3.5">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`h-5 w-5 shrink-0 mt-0.5 ${
                        plan.isPrimary ? 'text-blue-muted' : 'text-blue'
                      }`}
                    />
                    <span className={plan.isPrimary ? 'text-slate-200' : 'text-ink'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-surface-border/20">
              <Link to={plan.ctaHref}>
                <Button
                  size="lg"
                  variant={plan.isPrimary ? 'primary' : 'secondary'}
                  className="w-full justify-between"
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className={`mt-3 aqe-caption text-center ${plan.isPrimary ? 'text-slate-400' : 'text-ink-muted'}`}>
                {plan.finePrint}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

