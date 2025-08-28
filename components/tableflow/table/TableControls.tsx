import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit3 } from "lucide-react";

interface TableControlsProps {
  onAddRow: () => void;
  onAddColumn: () => void;
}

export function TableControls({ onAddRow, onAddColumn }: TableControlsProps) {
  return (
    <Card className="p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-2">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onAddRow}
            className="gap-2 bg-transparent transition-all duration-200 hover:scale-105 flex-1 sm:flex-none touch-manipulation"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Add Row</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddColumn}
            className="gap-2 bg-transparent transition-all duration-200 hover:scale-105 flex-1 sm:flex-none touch-manipulation"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Add Column</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground justify-center sm:justify-start">
          <Edit3 className="w-4 h-4" />
          <span className="text-center sm:text-left">
            Click on cells to edit them
          </span>
        </div>
      </div>
    </Card>
  );
}