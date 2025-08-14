"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Trash2, FileSpreadsheet, Loader2, Menu } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import type { TableData, ExportFormat } from "@/types/tablio";
import { formatTableData } from "@/utils/export-formatters";
import { getTableStats } from "@/utils/table-operations";
import { SkeletonTable } from "@/components/tablio/feedback/SkeletonTable";
import { ProcessingLoadingOverlay } from "@/components/tablio/feedback/ProcessingLoadingOverlay";
import { DownloadLoadingOverlay } from "@/components/tablio/feedback/DownloadLoadingOverlay";
import { DataInput } from "@/components/tablio/input/DataInput";
import { useDataInput } from "@/hooks/use-data-input";
import { EditableTable } from "@/components/tablio/table/EditableTable";
import { TableControls } from "@/components/tablio/table/TableControls";
import { useTableEditor } from "@/hooks/use-table-editor";

export default function TablioApp() {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [fileName, setFileName] = useState("");
  const [format, setFormat] = useState<ExportFormat>("xlsx");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const isMobile = useIsMobile();

  const processData = useCallback(
    async (parsed: TableData, fileName?: string) => {
      setIsProcessing(true);
      setLoadingProgress(0);

      const stats = getTableStats(parsed);
      const isLargeDataset = stats.isLargeDataset;
      const baseDelay = isLargeDataset ? 150 : 50; // Longer delays for large datasets

      setLoadingMessage("Veri boyutu analiz ediliyor...");
      setLoadingProgress(10);
      await new Promise((resolve) => setTimeout(resolve, baseDelay));

      if (isLargeDataset) {
        setLoadingMessage("Büyük veri seti tespit edildi...");
        setLoadingProgress(20);
        await new Promise((resolve) => setTimeout(resolve, baseDelay));
      }

      setLoadingMessage("Tablo yapısı kontrol ediliyor...");
      setLoadingProgress(isLargeDataset ? 30 : 25);
      await new Promise((resolve) => setTimeout(resolve, baseDelay));

      if (isLargeDataset) {
        const chunkSize = 100;
        const totalChunks = Math.ceil(parsed.rows.length / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
          setLoadingMessage(`Satırlar işleniyor... (${i + 1}/${totalChunks})`);
          setLoadingProgress(30 + (i / totalChunks) * 50);

          // Simulate chunk processing
          await new Promise((resolve) =>
            setTimeout(resolve, Math.min(baseDelay, 100))
          );

          // Allow UI to update
          if (i % 5 === 0) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
          }
        }
      } else {
        setLoadingMessage("Satırlar işleniyor...");
        setLoadingProgress(50);
        await new Promise((resolve) => setTimeout(resolve, baseDelay));
      }

      setLoadingMessage("Sütun tipleri belirleniyor...");
      setLoadingProgress(isLargeDataset ? 85 : 75);
      await new Promise((resolve) => setTimeout(resolve, baseDelay));

      setLoadingMessage("Tablo hazırlanıyor...");
      setLoadingProgress(90);
      await new Promise((resolve) => setTimeout(resolve, baseDelay / 2));

      setTableData(parsed);
      if (fileName) {
        setFileName(fileName);
      }

      setLoadingMessage("Render ediliyor...");
      setLoadingProgress(95);

      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));

      if (isLargeDataset) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setLoadingMessage("Tamamlandı!");
      setLoadingProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsProcessing(false);
      setLoadingProgress(0);
      setLoadingMessage("");

      const finalStats = getTableStats(parsed);
      toast.success(
        `Tablo başarıyla yüklendi! ${finalStats.rows} satır ve ${
          finalStats.columns
        } sütun içeren ${
          finalStats.isLargeDataset ? "büyük " : ""
        }tablo yüklendi.`
      );
    },
    []
  );

  // Data input hook
  const dataInputProps = useDataInput({ onDataLoaded: processData });

  // Table editor hook
  const tableEditorProps = useTableEditor({
    tableData,
    onTableChange: setTableData,
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      dataInputProps.handleKeyDown(e, isProcessing);
    },
    [dataInputProps, isProcessing]
  );

  const handleClear = useCallback(() => {
    setTableData(null);
    setFileName("tablio-file");
    setFormat("xlsx");
    setShowMobileControls(false);
    toast.success("Veriler temizlendi: Yeni bir tablo yapıştırabilirsiniz.");
  }, []);

  const handleDownload = useCallback(async () => {
    if (!tableData) return;

    setIsDownloading(true);
    setLoadingProgress(0);

    const stats = getTableStats(tableData);
    const isLargeDataset = stats.isLargeDataset;
    const isComplexFormat =
      format === "json" || format === "pdf" || format === "html";
    const baseDelay = isLargeDataset
      ? isComplexFormat
        ? 200
        : 150
      : isComplexFormat
      ? 100
      : 50;

    setLoadingMessage("Dosya hazırlığı başlatılıyor...");
    setLoadingProgress(10);
    await new Promise((resolve) => setTimeout(resolve, baseDelay / 2));

    setLoadingMessage(`${format.toUpperCase()} formatına dönüştürülüyor...`);
    setLoadingProgress(30);
    await new Promise((resolve) => setTimeout(resolve, baseDelay));

    if (isLargeDataset) {
      setLoadingMessage("Veri yapısı oluşturuluyor...");
      setLoadingProgress(50);
      await new Promise((resolve) => setTimeout(resolve, baseDelay));
    }

    // Format-specific loading messages
    const formatMessages: Record<ExportFormat, string> = {
      csv: "CSV dosyası oluşturuluyor...",
      xlsx: "Excel dosyası oluşturuluyor...",
      pdf: "PDF raporu hazırlanıyor...",
      html: "HTML tablosu oluşturuluyor...",
      json: "JSON verisi hazırlanıyor...",
    };

    if (isLargeDataset) {
      setLoadingMessage(formatMessages[format]);
      setLoadingProgress(70);
      await new Promise((resolve) => setTimeout(resolve, baseDelay / 2));
    }

    const { content, mimeType, fileExtension } = await formatTableData(
      tableData,
      format
    );

    setLoadingMessage("Dosya oluşturuluyor...");
    setLoadingProgress(85);
    await new Promise((resolve) => setTimeout(resolve, baseDelay / 2));

    const blob = new Blob([content as BlobPart], { type: mimeType });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    setLoadingMessage("İndirme başlatılıyor...");
    setLoadingProgress(95);
    await new Promise((resolve) => setTimeout(resolve, baseDelay / 4));

    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.${fileExtension}`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLoadingProgress(100);
    await new Promise((resolve) => setTimeout(resolve, 100));

    setIsDownloading(false);
    setLoadingProgress(0);
    setLoadingMessage("");

    const fileSizeKB = Math.round(blob.size / 1024);
    toast.success(
      `Dosya indirildi: ${fileName}.${fileExtension} dosyası başarıyla indirildi. (${fileSizeKB} KB)`
    );
  }, [tableData, fileName, format]);

  const handleGoogleSheetsExport = useCallback(() => {
    toast(
      "Yakında gelecek: Google Sheets entegrasyonu üzerinde çalışıyoruz. Çok yakında kullanıma sunulacak."
    );
  }, []);

  useEffect(() => {
    const preventDefaults = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDocumentDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Prevent file from opening in browser if dropped outside drop zone
    };

    // Prevent default drag behaviors on document
    document.addEventListener("dragenter", preventDefaults, false);
    document.addEventListener("dragover", preventDefaults, false);
    document.addEventListener("dragleave", preventDefaults, false);
    document.addEventListener("drop", handleDocumentDrop, false);

    return () => {
      document.removeEventListener("dragenter", preventDefaults, false);
      document.removeEventListener("dragover", preventDefaults, false);
      document.removeEventListener("dragleave", preventDefaults, false);
      document.removeEventListener("drop", handleDocumentDrop, false);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-background transition-all duration-300"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <header className="py-6 sm:py-8 text-center px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <FileSpreadsheet className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
            Tablio
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground px-4">
          Kopyaladığınız tabloları istediğiniz formata dönüştürün
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-6xl">
        {!tableData ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
            {isProcessing ? (
              <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-500">
                <ProcessingLoadingOverlay
                  message={loadingMessage}
                  progress={loadingProgress}
                />
                <SkeletonTable />
              </div>
            ) : (
              <DataInput
                onPaste={dataInputProps.handlePaste}
                onFileUpload={dataInputProps.handleFileUpload}
                isDragOver={dataInputProps.isDragOver}
                onDragEnter={dataInputProps.handleDragEnter}
                onDragOver={dataInputProps.handleDragOver}
                onDragLeave={dataInputProps.handleDragLeave}
                onDrop={dataInputProps.handleDrop}
              />
            )}
          </div>
        ) : (
          /* Active State - Table Preview & Actions */
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
            {/* Mobile Controls Toggle */}
            <div className="sm:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowMobileControls(!showMobileControls)}
                className="w-full gap-2 justify-center"
              >
                <Menu className="w-4 h-4" />
                {showMobileControls
                  ? "Kontrolleri Gizle"
                  : "Kontrolleri Göster"}
              </Button>
            </div>

            {/* Action Controls */}
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
                  <Select
                    value={format}
                    onValueChange={(value: ExportFormat) => setFormat(value)}
                  >
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
                    onClick={handleClear}
                    className="gap-2 bg-transparent transition-all duration-200 hover:scale-105 flex-1 sm:flex-none"
                    size={window.innerWidth < 640 ? "sm" : "default"}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sm:inline">Temizle</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGoogleSheetsExport}
                    className="gap-2 bg-transparent transition-all duration-200 hover:scale-105 flex-1 sm:flex-none border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                    size={isMobile ? "sm" : "default"}
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span className="hidden sm:inline">Google Sheets</span>
                    <span className="sm:hidden">Sheets</span>
                  </Button>
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="gap-2 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 disabled:scale-100 flex-1 sm:flex-none"
                    size={window.innerWidth < 640 ? "sm" : "default"}
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

            {isDownloading && (
              <DownloadLoadingOverlay
                message={loadingMessage}
                progress={loadingProgress}
              />
            )}

            <TableControls
              onAddRow={tableEditorProps.addRow}
              onAddColumn={tableEditorProps.addColumn}
            />

            <EditableTable
              tableData={tableData}
              editingCell={tableEditorProps.editingCell}
              editValue={tableEditorProps.editValue}
              onEditValueChange={tableEditorProps.setEditValue}
              onCellClick={tableEditorProps.handleCellClick}
              onCellSave={tableEditorProps.handleCellSave}
              onCellCancel={tableEditorProps.handleCellCancel}
              onRemoveRow={tableEditorProps.removeRow}
              onRemoveColumn={tableEditorProps.removeColumn}
            />
          </div>
        )}
      </main>

      <footer className="mt-12 sm:mt-16 py-6 sm:py-8 text-center border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200 touch-manipulation"
            >
              Nasıl Kullanılır?
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200 touch-manipulation"
            >
              Hakkında
            </a>
            <span className="hidden sm:inline">•</span>
            <span className="text-center">
              Tablio ile tablolarınızı kolayca dönüştürün
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
