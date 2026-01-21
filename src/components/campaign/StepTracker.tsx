import { RotateCcw, HelpCircle } from 'lucide-react';

interface StepTrackerProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  onClear: () => void;
  onHelpClick: () => void;
}

const steps = [
  { num: 1, label: 'MEP' },
  { num: 2, label: 'Build' },
  { num: 3, label: 'Personalize' },
  { num: 4, label: 'Copy & Send' },
];

export function StepTracker({
  currentStep,
  onStepClick,
  onClear,
  onHelpClick,
}: StepTrackerProps) {
  return (
    <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-white/10 p-4 mb-6">
      {/* Top row: Help and Start Fresh */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onHelpClick}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-sm font-medium transition-all"
        >
          <HelpCircle size={16} />
          <span>How does this work?</span>
        </button>

        <button
          onClick={onClear}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm font-medium transition-all"
        >
          <RotateCcw size={16} />
          <span>Start fresh</span>
        </button>
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center">
            <button
              onClick={() => onStepClick(step.num)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                ${currentStep === step.num
                  ? 'bg-blue-500 text-white'
                  : currentStep > step.num
                    ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                    : 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/70'
                }
              `}
            >
              <span className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs
                ${currentStep === step.num
                  ? 'bg-white/20'
                  : currentStep > step.num
                    ? 'bg-green-500/30'
                    : 'bg-white/10'
                }
              `}>
                {currentStep > step.num ? '✓' : step.num}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${currentStep > step.num ? 'bg-green-500/50' : 'bg-white/20'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
