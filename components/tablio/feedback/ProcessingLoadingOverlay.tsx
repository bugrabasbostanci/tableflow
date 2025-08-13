import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface ProcessingLoadingOverlayProps {
  message: string;
  progress: number;
}

export function ProcessingLoadingOverlay({ 
  message, 
  progress 
}: ProcessingLoadingOverlayProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto p-6 sm:p-12">
      <div className="text-center space-y-6">
        <div className="relative">
          <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto animate-spin" />
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse"></div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
            Tablo işleniyor...
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground animate-pulse">
            {message}
          </p>
        </div>

        <ProgressBar progress={progress} showSteps={true} />
      </div>
    </Card>
  );
}