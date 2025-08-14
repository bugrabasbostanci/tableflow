import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface MobileControlsToggleProps {
  showMobileControls: boolean;
  onToggle: () => void;
}

export function MobileControlsToggle({
  showMobileControls,
  onToggle,
}: MobileControlsToggleProps) {
  return (
    <div className="sm:hidden mb-4">
      <Button
        variant="outline"
        onClick={onToggle}
        className="w-full gap-2 justify-center"
      >
        <Menu className="w-4 h-4" />
        {showMobileControls
          ? "Kontrolleri Gizle"
          : "Kontrolleri Göster"}
      </Button>
    </div>
  );
}