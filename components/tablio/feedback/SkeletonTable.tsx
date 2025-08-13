import { Card } from "@/components/ui/card";

export function SkeletonTable() {
  return (
    <Card className="p-3 sm:p-6 animate-pulse">
      <div className="h-4 sm:h-5 bg-muted rounded w-32 mb-4"></div>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 p-3 border-b">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-muted rounded flex-1"></div>
            ))}
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="p-3 border-b last:border-b-0">
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((col) => (
                <div key={col} className="h-3 bg-muted/70 rounded flex-1"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}