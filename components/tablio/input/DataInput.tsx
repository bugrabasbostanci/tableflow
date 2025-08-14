import { Card } from "@/components/ui/card";
import { Clipboard } from "lucide-react";

interface DataInputProps {
  onPaste: () => void;
}

export function DataInput({ onPaste }: DataInputProps) {
  return (
    <Card
      className="w-full max-w-2xl p-6 sm:p-12 tablio-paste-area cursor-pointer transition-all duration-300 transform hover:scale-[1.02] border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg"
      onClick={onPaste}
    >
      <div className="text-center space-y-4">
        <Clipboard className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/80 mx-auto transition-all duration-300" />
        <h2 className="text-lg sm:text-2xl font-semibold text-foreground">
          Kopyaladığınız tabloyu buraya yapıştırın
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground px-2">
          Excel, Google Sheets veya herhangi bir tablodan kopyaladığınız veriyi
          yapıştırın
        </p>
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground/80 font-mono border border-border/80">
            CTRL
          </kbd>
          <span className="font-bold">+</span>
          <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground/80 font-mono border border-border/80">
            V
          </kbd>
          <span className="hidden sm:inline">veya buraya tıklayın</span>
          <span className="sm:hidden">ya da tıklayın</span>
        </div>
      </div>
    </Card>
  );
}
