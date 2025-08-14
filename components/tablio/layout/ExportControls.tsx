import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Trash2, FileSpreadsheet, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ExportFormat } from "@/types/tablio";

interface ExportControlsProps {
  fileName: string;
  setFileName: (name: string) => void;
  format: ExportFormat;
  setFormat: (format: ExportFormat) => void;
  onClear: () => void;
  onDownload: () => void;
  onGoogleSheetsExport: () => void;
  isDownloading: boolean;
  showMobileControls: boolean;
}

export function ExportControls({
  fileName,
  setFileName,
  format,
  setFormat,
  onClear,
  onDownload,
  onGoogleSheetsExport,
  isDownloading,
  showMobileControls,
}: ExportControlsProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={`${showMobileControls ? "block" : "hidden"} sm:block`}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium text-foreground">
            Dosya Adı
          </label>
          <Input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="tablio-file"
            className="bg-input transition-all duration-200 focus:scale-[1.02] w-full"
          />
        </div>
        <div className="w-full sm:w-auto space-y-2">
          <label className="text-sm font-medium text-foreground">
            Format
          </label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="w-full sm:w-40 bg-input transition-all duration-200 hover:bg-input/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF </SelectItem>
              <SelectItem value="html">HTML Tablo</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onClear}
            className="gap-2 bg-transparent transition-all duration-200 hover:scale-105 flex-1 sm:flex-none"
            size={isMobile === true ? "sm" : "default"}
          >
            <Trash2 className="w-4 h-4" />
            <span className="sm:inline">Temizle</span>
          </Button>
          <Button
            variant="outline"
            onClick={onGoogleSheetsExport}
            className="gap-2 bg-transparent transition-all duration-200 hover:scale-105 flex-1 sm:flex-none border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
            size={isMobile === true ? "sm" : "default"}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Google Sheets</span>
            <span className="sm:hidden">Sheets</span>
          </Button>
          <Button
            onClick={onDownload}
            disabled={isDownloading}
            className="gap-2 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 disabled:scale-100 flex-1 sm:flex-none"
            size={isMobile === true ? "sm" : "default"}
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isDownloading ? "İndiriliyor..." : "İndir"}
          </Button>
        </div>
      </div>
    </div>
  );
}