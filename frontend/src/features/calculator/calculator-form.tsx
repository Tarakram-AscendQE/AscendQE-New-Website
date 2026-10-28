import React from 'react';
import { CalculatorInputs } from '../../types';
import { Slider } from '../../components/ui/slider';
import { Input } from '../../components/ui/input';
import { formatNumber } from '../../utils/formatters';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onUpdate: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ inputs, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* Test Volume Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="volume-slider" className="text-sm font-bold text-ink">
            New accepted test cases / year
          </label>
          <span className="text-sm font-extrabold text-blue bg-blue-light px-3 py-1 rounded-full">
            {formatNumber(inputs.volume)} cases
          </span>
        </div>
        <Slider
          id="volume-slider"
          value={[inputs.volume]}
          min={100}
          max={50000}
          step={100}
          onValueChange={(vals) => onUpdate('volume', vals[0])}
        />
        <div className="flex justify-between text-xs text-ink-muted">
          <span>100</span>
          <span>50,000</span>
        </div>
      </div>

      {/* Grid of number parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5">
            Current hours / test case
          </label>
          <Input
            type="number"
            min={0.1}
            step={0.5}
            value={inputs.hours}
            onChange={(e) => onUpdate('hours', parseFloat(e.target.value) || 0.1)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5">
            Engineer cost / hour ($)
          </label>
          <Input
            type="number"
            min={1}
            step={1}
            value={inputs.rate}
            onChange={(e) => onUpdate('rate', parseFloat(e.target.value) || 1)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5">
            Platform operating cost / case ($)
          </label>
          <Input
            type="number"
            min={0}
            step={0.01}
            value={inputs.operatingCost}
            onChange={(e) => onUpdate('operatingCost', parseFloat(e.target.value) || 0)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5">
            Other incremental costs / year ($)
          </label>
          <Input
            type="number"
            min={0}
            step={1000}
            value={inputs.extras}
            onChange={(e) => onUpdate('extras', parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Time Horizon Horizon buttons */}
      <div className="pt-2">
        <label className="block text-xs font-semibold text-ink-muted mb-2">
          Comparison Timeframe
        </label>
        <div className="grid grid-cols-2 gap-3" role="group" aria-label="Comparison period">
          <button
            type="button"
            onClick={() => onUpdate('years', 1)}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
              inputs.years === 1
                ? 'bg-blue text-white border-blue shadow-sm'
                : 'bg-white text-ink-muted border-surface-border hover:bg-surface-card'
            }`}
          >
            1 Year
          </button>
          <button
            type="button"
            onClick={() => onUpdate('years', 3)}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
              inputs.years === 3
                ? 'bg-blue text-white border-blue shadow-sm'
                : 'bg-white text-ink-muted border-surface-border hover:bg-surface-card'
            }`}
          >
            3 Years
          </button>
        </div>
      </div>

      <p className="text-xs text-ink-muted leading-relaxed pt-2 border-t border-surface-border">
        $300K annual enterprise subscription. $4.99 variable operating cost is an editable assumption. Free 100 test case pilot excluded.
      </p>
    </div>
  );
};

