import { useState, useMemo } from 'react';
import { CalculatorInputs, CalculatorOutputs } from '../../types';

const defaultInputs: CalculatorInputs = {
  volume: 20000,
  hours: 8,
  rate: 30,
  operatingCost: 4.99,
  extras: 0,
  years: 1,
};

export function useCalculator(initialState?: Partial<CalculatorInputs>) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...defaultInputs,
    ...initialState,
  });

  const updateInput = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results: CalculatorOutputs = useMemo(() => {
    const n = Math.max(1, inputs.volume);
    const h = Math.max(0.1, inputs.hours || 0.1);
    const r = Math.max(1, inputs.rate || 1);
    const v = Math.max(0, inputs.operatingCost || 0);
    const x = Math.max(0, inputs.extras || 0);
    const years = inputs.years;

    const baselineCost = n * h * r * years;
    const deliveredCost = (300000 + n * v + x) * years;
    const netSaving = baselineCost - deliveredCost;
    const deliveredPercent = Math.min(100, Math.max(0, (deliveredCost / baselineCost) * 100));
    const roiPercent = (1 - deliveredCost / baselineCost) * 100;

    return {
      baselineCost,
      deliveredCost,
      netSaving,
      roiPercent,
      deliveredPercent,
      isPositive: baselineCost >= deliveredCost,
    };
  }, [inputs]);

  return {
    inputs,
    updateInput,
    results,
  };
}

