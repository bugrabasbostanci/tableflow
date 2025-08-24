import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditableCellProps {
  value: string;
  isEditing: boolean;
  editValue: string;
  onEditValueChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onClick: () => void;
}

export function EditableCell({
  value,
  isEditing,
  editValue,
  onEditValueChange,
  onSave,
  onCancel,
  onClick,
}: EditableCellProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSave();
    if (e.key === "Escape") onCancel();
  };

  if (isEditing) {
    return (
      <div className="flex gap-1 animate-in fade-in duration-200">
        <Input
          value={editValue}
          onChange={(e) => onEditValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-7 sm:h-8 text-xs sm:text-sm min-w-[120px] flex-1"
          autoFocus
        />
        <Button
          size="sm"
          onClick={onSave}
          className="h-7 sm:h-8 px-1 sm:px-2 transition-all duration-200 hover:scale-110 touch-manipulation text-xs"
        >
          ✓
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCancel}
          className="h-7 sm:h-8 px-1 sm:px-2 bg-transparent transition-all duration-200 hover:scale-110 touch-manipulation text-xs"
        >
          ✕
        </Button>
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer hover:bg-muted/50 rounded px-1 sm:px-2 py-1 -mx-1 sm:-mx-2 -my-1 transition-all duration-200 hover:scale-[1.02] touch-manipulation min-h-[32px] sm:min-h-[36px] flex items-center"
      onClick={onClick}
    >
      <span
        className="truncate text-xs sm:text-sm"
        title={value}
      >
        {value || (
          <span className="text-muted-foreground italic">
            Empty
          </span>
        )}
      </span>
    </div>
  );
}