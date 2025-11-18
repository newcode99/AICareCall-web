'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const steps = [
  { number: 1, label: '보호자 정보' },
  { number: 2, label: '어르신 정보' },
  { number: 3, label: '통화 설정' },
  { number: 4, label: '통화 내용' },
  { number: 5, label: '최종 확인' },
];

export function ProgressIndicator({
  currentStep,
  onStepClick,
}: ProgressIndicatorProps) {
  const handleStepClick = (stepNumber: number) => {
    if (onStepClick) {
      onStepClick(stepNumber);
    }
  };

  return (
    <div className="w-full mb-8 md:mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                  step.number < currentStep &&
                    'bg-primary text-primary-foreground',
                  step.number === currentStep &&
                    'bg-primary text-primary-foreground ring-4 ring-primary/20',
                  step.number > currentStep && 'bg-muted text-muted-foreground',
                  onStepClick && 'cursor-pointer hover:scale-110'
                )}
                onClick={() => handleStepClick(step.number)}
              >
                {step.number < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              <span
                className={cn(
                  'text-xs md:text-sm text-center whitespace-nowrap transition-colors',
                  step.number <= currentStep
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground',
                  onStepClick && 'cursor-pointer'
                )}
                onClick={() => handleStepClick(step.number)}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-[2px] flex-1 mx-2 transition-colors',
                  step.number < currentStep ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

