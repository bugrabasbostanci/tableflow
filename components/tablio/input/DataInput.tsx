import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, Upload } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DataInputProps {
  onPaste: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDragOver: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function DataInput({
  onPaste,
  onFileUpload,
  isDragOver,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
}: DataInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={onFileUpload}
        className="hidden"
      />

      <Card
        className={`w-full max-w-2xl p-6 sm:p-12 tablio-paste-area cursor-pointer transition-all duration-300 transform hover:scale-[1.02] border-2 border-dashed ${
          isDragOver
            ? "border-primary border-solid bg-primary/5 scale-[1.02]"
            : "border-gray-300 hover:border-primary hover:bg-primary/5 hover:shadow-lg"
        }`}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onPaste}
      >
        <div className="text-center space-y-4">
          {isDragOver ? (
            <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto animate-bounce" />
          ) : (
            <Clipboard className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto transition-transform duration-200 hover:scale-110" />
          )}
          <h2 className="text-lg sm:text-2xl font-semibold text-foreground">
            {isDragOver
              ? "Dosyayı buraya bırakın"
              : "Kopyaladığınız tabloyu buraya yapıştırın"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground px-2">
            {isDragOver
              ? "CSV dosyanızı bırakın ve otomatik olarak yüklensin"
              : "Excel, Google Sheets veya herhangi bir tablodan kopyaladığınız veriyi yapıştırın"}
          </p>
          {!isDragOver && (
            <>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <kbd className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary font-semibold transition-colors hover:bg-primary/20">
                  CTRL
                </kbd>
                <span className="text-primary font-bold">+</span>
                <kbd className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary font-semibold transition-colors hover:bg-primary/20">
                  V
                </kbd>
                <span className="hidden sm:inline">
                  veya buraya tıklayın
                </span>
                <span className="sm:hidden">ya da tıklayın</span>
              </div>
              <div className="pt-4">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
                  size={isMobile ? "sm" : "default"}
                >
                  <Upload className="w-4 h-4" />
                  CSV Dosyası Yükle
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </>
  );
}