import React from 'react';
import { CalculatorOutputs } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Badge } from '../../components/ui/badge';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface CalculatorResultProps {
  results: CalculatorOutputs;
}

export const CalculatorResult: React.FC<CalculatorResultProps> = ({ results }) => {
  return (
    <div className="bg-navy rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-lg" aria-live="polite">
      <div>
        <Badge variant="blue" className="bg-blue/20 text-blue-muted">
          MODELED AUTHORING NET BENEFIT
        </Badge>
        
        <div className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
          {formatCurrency(results.netSaving)}
        </div>
        <div className="text-xs text-slate-400 mt-1">
          {results.isPositive ? 'Potential annual economic gain' : 'Adjusted baseline comparison'}
        </div>

        {/* Comparison Bars */}
        <div className="mt-8 space-y-4">
          <div>
            <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1.5">
              <span className="text-slate-300">Current authoring baseline</span>
              <span className="text-white">{formatCurrency(results.baselineCost)}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-slate-400 rounded-full w-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1.5">
              <span className="text-blue-muted">Platform + modeled operating costs</span>
              <span className="text-white">{formatCurrency(results.deliveredCost)}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, results.deliveredPercent)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-navy-light flex items-center gap-3">
          {results.isPositive ? (
            <>
              <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
              <div>
                <span className="text-emerald-400 font-bold text-lg sm:text-xl">
                  {formatPercent(results.roiPercent)}
                </span>
                <span className="text-slate-300 text-xs sm:text-sm ml-2">
                  lower modeled authoring cost
                </span>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0" />
              <div className="text-xs text-slate-300">
                Modeled platform cost exceeds current baseline. Consider managed services quote.
              </div>
            </>
          )}
        </div>
      </div>

      <p className="mt-8 aqe-caption text-slate-400 leading-relaxed border-t border-navy-light pt-4">
        {results.isPositive
          ? 'Positive modeled authoring benefit at these inputs. Validate the assumptions on your specific application workload.'
          : 'At these inputs, platform cost exceeds authoring baseline. Consider wider lifecycle benefits or tailored scope.'}
      </p>
    </div>
  );
};

