
import { useImportStore } from '@/hooks/use-import-store';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, name: 'Upload' },
  { id: 2, name: 'Map Fields' },
  { id: 3, name: 'Validate' },
  { id: 4, name: 'Import' },
];

const StepIndicator = () => {
  const { currentStep, setCurrentStep } = useImportStore();
  
  return (
    <div className="flex items-center justify-center mb-10">
      <nav className="flex items-center space-x-1" aria-label="Import Steps">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => {
                // Only allow going back to previous steps
                if (step.id < currentStep) {
                  setCurrentStep(step.id);
                }
              }}
              disabled={step.id > currentStep}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all",
                step.id === currentStep 
                  ? "bg-primary text-primary-foreground shadow"
                  : step.id < currentStep
                    ? "bg-primary/20 text-primary cursor-pointer hover:bg-primary/30"
                    : "bg-secondary text-muted-foreground"
              )}
              aria-current={step.id === currentStep ? "step" : undefined}
            >
              {step.id}
            </button>
            
            <span
              className={cn(
                "ml-2 text-sm font-medium",
                step.id === currentStep 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              )}
            >
              {step.name}
            </span>
            
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "ml-2 h-px w-12 bg-border",
                  step.id < currentStep && "bg-primary/50"
                )}
              />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default StepIndicator;
