interface ProgressBarProps {
  progress: number;
  showSteps?: boolean;
  className?: string;
}

const PROGRESS_STEPS = [
  { threshold: 10, label: "Size Analysis" },
  { threshold: 20, label: "Detection" },
  { threshold: 30, label: "Validation" },
  { threshold: 50, label: "Preparation" },
  { threshold: 75, label: "Type Detection" },
  { threshold: 95, label: "Preparing" },
  { threshold: 100, label: "Completed" },
];

export function ProgressBar({ 
  progress, 
  showSteps = false, 
  className = "" 
}: ProgressBarProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
      
      {showSteps && (
        <div className="flex justify-between text-xs text-muted-foreground">
          {PROGRESS_STEPS.map((step) => (
            <span
              key={step.threshold}
              className={progress >= step.threshold ? "text-primary" : ""}
            >
              {step.label}
            </span>
          ))}
        </div>
      )}
      
      {!showSteps && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Processing...</span>
          <span>{progress}%</span>
        </div>
      )}
    </div>
  );
}