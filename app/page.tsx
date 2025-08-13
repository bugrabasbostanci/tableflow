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
import { Card } from "@/components/ui/card";
import {
  Download,
  Trash2,
  FileSpreadsheet,
  Plus,
  Minus,
  Edit3,
  Loader2,
  Menu,
} from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import type { TableData, EditingCell, ExportFormat } from "@/types/tablio";
import { formatTableData } from "@/utils/export-formatters";
import {
  addRowToTable,
  removeRowFromTable,
  addColumnToTable,
  removeColumnFromTable,
  updateTableCell,
  getTableStats,
} from "@/utils/table-operations";
import { SkeletonTable } from "@/components/tablio/feedback/SkeletonTable";
import { ProcessingLoadingOverlay } from "@/components/tablio/feedback/ProcessingLoadingOverlay";
import { DownloadLoadingOverlay } from "@/components/tablio/feedback/DownloadLoadingOverlay";
import { DataInput } from "@/components/tablio/input/DataInput";
import { useDataInput } from "@/hooks/use-data-input";

export default function TablioApp() {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [fileName, setFileName] = useState("tablio-export");
  const [format, setFormat] = useState<ExportFormat>("xlsx");
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editValue, setEditValue] = useState("");
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
        } sütun içeren ${finalStats.isLargeDataset ? "büyük " : ""}tablo yüklendi.`
      );
    },
    []
  );

  // Data input hook
  const dataInputProps = useDataInput({ onDataLoaded: processData });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      dataInputProps.handleKeyDown(e, isProcessing);
    },
    [dataInputProps, isProcessing]
  );

  const handleClear = useCallback(() => {
    setTableData(null);
    setFileName("tablio-export");
    setFormat("xlsx");
    setEditingCell(null);
    setShowMobileControls(false);
    toast.success("Veriler temizlendi: Yeni bir tablo yapıştırabilirsiniz.");
  }, []);

  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number, currentValue: string) => {
      setEditingCell({ row: rowIndex, col: colIndex });
      setEditValue(currentValue);
    },
    []
  );

  const handleCellSave = useCallback(() => {
    if (!editingCell || !tableData) return;

    const updatedTableData = updateTableCell(
      tableData,
      editingCell.row,
      editingCell.col,
      editValue
    );
    setTableData(updatedTableData);
    setEditingCell(null);
    setEditValue("");
  }, [editingCell, editValue, tableData]);

  const handleCellCancel = useCallback(() => {
    setEditingCell(null);
    setEditValue("");
  }, []);

  const addRow = useCallback(() => {
    if (!tableData) return;

    const updatedTableData = addRowToTable(tableData);
    setTableData(updatedTableData);
    toast.success("Satır eklendi: Tabloya yeni bir satır eklendi.");
  }, [tableData]);

  const removeRow = useCallback(
    (rowIndex: number) => {
      if (!tableData) return;

      const updatedTableData = removeRowFromTable(tableData, rowIndex);
      if (updatedTableData) {
        setTableData(updatedTableData);
        toast.success("Satır silindi: Seçilen satır tablodan kaldırıldı.");
      }
    },
    [tableData]
  );

  const addColumn = useCallback(() => {
    if (!tableData) return;

    const updatedTableData = addColumnToTable(tableData);
    setTableData(updatedTableData);
    toast.success("Sütun eklendi: Tabloya yeni bir sütun eklendi.");
  }, [tableData]);

  const removeColumn = useCallback(
    (colIndex: number) => {
      if (!tableData) return;

      const updatedTableData = removeColumnFromTable(tableData, colIndex);
      if (updatedTableData) {
        setTableData(updatedTableData);
        toast.success("Sütun silindi: Seçilen sütun tablodan kaldırıldı.");
      }
    },
    [tableData]
  );

  const handleDownload = useCallback(async () => {
    if (!tableData) return;

    setIsDownloading(true);
    setLoadingProgress(0);

    const stats = getTableStats(tableData);
    const isLargeDataset = stats.isLargeDataset;
    const isComplexFormat = format === "json" || format === "xml";
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
      csv: "CSV satırları oluşturuluyor...",
      tsv: "TSV satırları oluşturuluyor...",
      json: "JSON objeleri oluşturuluyor...",
      xml: "XML yapısı oluşturuluyor...",
      xlsx: "Excel formatı hazırlanıyor..."
    };

    if (isLargeDataset) {
      setLoadingMessage(formatMessages[format]);
      setLoadingProgress(70);
      await new Promise((resolve) => setTimeout(resolve, baseDelay / 2));
    }

    const { content, mimeType, fileExtension } = formatTableData(tableData, format);

    setLoadingMessage("Dosya oluşturuluyor...");
    setLoadingProgress(85);
    await new Promise((resolve) => setTimeout(resolve, baseDelay / 2));

    const blob = new Blob([content], { type: mimeType });
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
                    placeholder="tablio-export"
                    className="bg-input transition-all duration-200 focus:scale-[1.02] w-full"
                  />
                </div>
                <div className="w-full sm:w-auto space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Format
                  </label>
                  <Select value={format} onValueChange={(value: ExportFormat) => setFormat(value)}>
                    <SelectTrigger className="w-full sm:w-40 bg-input transition-all duration-200 hover:bg-input/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="tsv">TSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
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

            <Card className="p-4 transition-all duration-200 hover:shadow-md">
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-2">
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addRow}
                    className="gap-2 bg-transparent transition-all duration-200 hover:scale-105 flex-1 sm:flex-none touch-manipulation"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Satır Ekle</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addColumn}
                    className="gap-2 bg-transparent transition-all duration-200 hover:scale-105 flex-1 sm:flex-none touch-manipulation"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Sütun Ekle</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground justify-center sm:justify-start">
                  <Edit3 className="w-4 h-4" />
                  <span className="text-center sm:text-left">
                    Hücrelere tıklayarak düzenleyebilirsiniz
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-6 transition-all duration-200 hover:shadow-md">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                Tablo Önizleme
              </h3>

              {/* Mobile table wrapper with horizontal scroll */}
              <div className="tablio-table border rounded-lg overflow-x-auto -mx-3 sm:mx-0">
                <div className="min-w-max sm:min-w-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        {tableData.headers.map((header, index) => (
                          <th
                            key={index}
                            className="text-left p-2 sm:p-3 font-medium text-foreground relative group min-w-[120px] sm:min-w-0"
                          >
                            <div
                              className="truncate pr-6 sm:pr-8"
                              title={header}
                            >
                              {header}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeColumn(index)}
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-200 w-5 h-5 sm:w-6 sm:h-6 p-0 hover:bg-destructive hover:text-destructive-foreground hover:scale-110 touch-manipulation"
                            >
                              <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                            </Button>
                          </th>
                        ))}
                        <th className="w-8 sm:w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="border-b hover:bg-muted/30 group transition-colors duration-200"
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="p-2 sm:p-3 text-foreground relative min-w-[120px] sm:min-w-0"
                            >
                              {editingCell?.row === rowIndex &&
                              editingCell?.col === cellIndex ? (
                                <div className="flex gap-1 animate-in fade-in duration-200">
                                  <Input
                                    value={editValue}
                                    onChange={(e) =>
                                      setEditValue(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") handleCellSave();
                                      if (e.key === "Escape")
                                        handleCellCancel();
                                    }}
                                    className="h-7 sm:h-8 text-xs sm:text-sm min-w-0"
                                    autoFocus
                                  />
                                  <Button
                                    size="sm"
                                    onClick={handleCellSave}
                                    className="h-7 sm:h-8 px-1 sm:px-2 transition-all duration-200 hover:scale-110 touch-manipulation text-xs"
                                  >
                                    ✓
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleCellCancel}
                                    className="h-7 sm:h-8 px-1 sm:px-2 bg-transparent transition-all duration-200 hover:scale-110 touch-manipulation text-xs"
                                  >
                                    ✕
                                  </Button>
                                </div>
                              ) : (
                                <div
                                  className="cursor-pointer hover:bg-muted/50 rounded px-1 sm:px-2 py-1 -mx-1 sm:-mx-2 -my-1 transition-all duration-200 hover:scale-[1.02] touch-manipulation min-h-[32px] sm:min-h-[36px] flex items-center"
                                  onClick={() =>
                                    handleCellClick(rowIndex, cellIndex, cell)
                                  }
                                >
                                  <span
                                    className="truncate text-xs sm:text-sm"
                                    title={cell}
                                  >
                                    {cell || (
                                      <span className="text-muted-foreground italic">
                                        Boş
                                      </span>
                                    )}
                                  </span>
                                </div>
                              )}
                            </td>
                          ))}
                          <td className="p-2 sm:p-3 w-8 sm:w-10">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRow(rowIndex)}
                              className="opacity-0 group-hover:opacity-100 transition-all duration-200 w-5 h-5 sm:w-6 sm:h-6 p-0 hover:bg-destructive hover:text-destructive-foreground hover:scale-110 touch-manipulation"
                            >
                              <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground mt-3 animate-in fade-in duration-300 text-center sm:text-left">
                {tableData.rows.length} satır, {tableData.headers.length} sütun
              </p>
            </Card>
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
