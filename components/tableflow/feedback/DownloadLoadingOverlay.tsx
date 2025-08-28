import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface DownloadLoadingOverlayProps {
  message: string;
  progress: number;
}

export function DownloadLoadingOverlay({ 
  message, 
  progress 
}: DownloadLoadingOverlayProps) {
  return (
    <Card className="p-4 border-primary/50 bg-primary/5 animate-in fade-in duration-200">
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {message}
          </p>
          <ProgressBar progress={progress} showSteps={false} className="mt-2" />
        </div>
      </div>
    </Card>
  );
}