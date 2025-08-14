"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { useLoading } from "@/hooks/use-loading";
import { AppHeader } from "@/components/tablio/layout/AppHeader";
import { ExportControls } from "@/components/tablio/layout/ExportControls";
import { MobileControlsToggle } from "@/components/tablio/layout/MobileControlsToggle";
import { AppFooter } from "@/components/tablio/layout/AppFooter";
import { toast } from "sonner";
import type { TableData, ExportFormat } from "@/types/tablio";
import { formatTableData } from "@/utils/export-formatters";
import { getTableStats } from "@/utils/table-operations";
import { 
  handleGoogleSheetsExportFlow, 
  validateTableDataForExport,
  generateDefaultSheetTitle,
  sanitizeSheetTitle
} from "@/utils/google-sheets-utils";
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
  const [showMobileControls, setShowMobileControls] = useState(false);
  const { 
    loadingState, 
    startLoading, 
    updateProgress, 
    stopLoading, 
    isProcessing, 
    isDownloading 
  } = useLoading();

  const processData = useCallback(
    async (parsed: TableData, fileName?: string) => {
      startLoading('processing', "Veri analiz ediliyor...");
      updateProgress(20);

      const stats = getTableStats(parsed);
      const isLargeDataset = stats.isLargeDataset;

      if (isLargeDataset) {
        updateProgress(40, "Büyük veri seti işleniyor...");
        
        // For large datasets, allow UI updates during processing
        const chunkSize = 1000;
        const totalChunks = Math.ceil(parsed.rows.length / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
          updateProgress(40 + (i / totalChunks) * 40, `Veriler işleniyor... (${i + 1}/${totalChunks})`);

          // Allow UI to update every few chunks
          if (i % 10 === 0) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
          }
        }
      } else {
        updateProgress(60);
      }

      updateProgress(80, "Tablo hazırlanıyor...");

      setTableData(parsed);
      if (fileName) {
        setFileName(fileName);
      }

      updateProgress(95, "Tamamlanıyor...");

      // Allow final UI update
      await new Promise((resolve) => requestAnimationFrame(resolve));

      updateProgress(100);
      
      // Brief completion state
      setTimeout(() => {
        stopLoading();
      }, 150);

      const finalStats = getTableStats(parsed);
      toast.success(
        `Tablo başarıyla yüklendi! ${finalStats.rows} satır ve ${
          finalStats.columns
        } sütun içeren ${
          finalStats.isLargeDataset ? "büyük " : ""
        }tablo yüklendi.`
      );
    },
    [startLoading, updateProgress, stopLoading]
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

    const stats = getTableStats(tableData);
    const isLargeDataset = stats.isLargeDataset;

    startLoading('downloading', `${format.toUpperCase()} formatına dönüştürülüyor...`);
    updateProgress(25);

    const { content, mimeType, fileExtension } = await formatTableData(
      tableData,
      format
    );

    if (isLargeDataset) {
      updateProgress(60, "Büyük dosya oluşturuluyor...");
      // Allow UI update for large files
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }

    updateProgress(80, "Dosya hazırlanıyor...");

    const blob = new Blob([content as BlobPart], { type: mimeType });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    updateProgress(95, "İndirme başlatılıyor...");

    // Use default name if fileName is empty
    const finalFileName = fileName.trim() || "tablio-export";

    link.setAttribute("href", url);
    link.setAttribute("download", `${finalFileName}.${fileExtension}`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    updateProgress(100);
    
    // Brief completion state
    setTimeout(() => {
      stopLoading();
    }, 150);

    const fileSizeKB = Math.round(blob.size / 1024);
    toast.success(
      `Dosya indirildi: ${finalFileName}.${fileExtension} dosyası başarıyla indirildi. (${fileSizeKB} KB)`
    );
  }, [tableData, fileName, format, startLoading, updateProgress, stopLoading]);

  const handleGoogleSheetsExport = useCallback(async () => {
    if (!tableData) {
      toast.error("Export edilecek tablo verisi bulunamadı.");
      return;
    }

    if (!validateTableDataForExport(tableData)) {
      toast.error("Tablo verisi Google Sheets'e aktarım için uygun değil.");
      return;
    }

    startLoading('downloading', "Google Sheets'e bağlanılıyor...");

    try {
      updateProgress(25, "Google hesabınız doğrulanıyor...");

      // Use user's filename or generate default title
      const userFileName = fileName.trim();
      const sheetTitle = userFileName 
        ? sanitizeSheetTitle(userFileName) 
        : generateDefaultSheetTitle();
      const sheetTabName = userFileName 
        ? sanitizeSheetTitle(userFileName) 
        : "Tablio Verisi";
        
      const result = await handleGoogleSheetsExportFlow(tableData, {
        title: sheetTitle,
        sheetName: sheetTabName,
        makePublic: false,
      });

      updateProgress(75, "Google Sheet oluşturuluyor...");

      if (result.success) {
        updateProgress(100, "Başarıyla tamamlandı!");

        setTimeout(() => {
          stopLoading();
        }, 1000);

        toast.success(
          `Google Sheets'e aktarıldı! Tablonuz "${sheetTitle}" adıyla oluşturuldu.`,
          {
            action: {
              label: "Google Sheets'te Aç",
              onClick: () => window.open(result.spreadsheetUrl, '_blank')
            },
            duration: 8000,
          }
        );
      } else {
        throw new Error(result.message || "Google Sheets export başarısız");
      }
    } catch (error) {
      console.error("Google Sheets export error:", error);
      
      stopLoading();

      let errorMessage = "Google Sheets'e aktarım sırasında bir hata oluştu.";
      
      if (error instanceof Error) {
        if (error.message.includes("OAuth") || error.message.includes("yetkilendirme")) {
          errorMessage = "Google hesabı yetkilendirmesi başarısız. Lütfen tekrar deneyin.";
        } else if (error.message.includes("token")) {
          errorMessage = "Google hesabınıza erişim süresi doldu. Lütfen tekrar giriş yapın.";
        } else if (error.message.includes("network") || error.message.includes("fetch")) {
          errorMessage = "İnternet bağlantınızı kontrol edin ve tekrar deneyin.";
        }
      }

      toast.error(errorMessage, {
        description: "Sorun devam ederse, sayfayı yenileyip tekrar deneyin.",
        duration: 6000,
      });
    }
  }, [tableData, fileName, startLoading, updateProgress, stopLoading]);


  return (
    <div
      className="min-h-screen bg-background transition-all duration-300"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <AppHeader />

      <main className="container mx-auto px-4 max-w-6xl">
        {!tableData ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
            {isProcessing ? (
              <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-500">
                <ProcessingLoadingOverlay
                  message={loadingState.message}
                  progress={loadingState.progress}
                />
                <SkeletonTable />
              </div>
            ) : (
              <DataInput
                onPaste={dataInputProps.handlePaste}
              />
            )}
          </div>
        ) : (
          /* Active State - Table Preview & Actions */
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
            <MobileControlsToggle
              showMobileControls={showMobileControls}
              onToggle={() => setShowMobileControls(!showMobileControls)}
            />

            <ExportControls
              fileName={fileName}
              setFileName={setFileName}
              format={format}
              setFormat={setFormat}
              onClear={handleClear}
              onDownload={handleDownload}
              onGoogleSheetsExport={handleGoogleSheetsExport}
              isDownloading={isDownloading}
              showMobileControls={showMobileControls}
            />

            {isDownloading && (
              <DownloadLoadingOverlay
                message={loadingState.message}
                progress={loadingState.progress}
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
              onHeaderClick={tableEditorProps.handleHeaderClick}
              onCellSave={tableEditorProps.handleCellSave}
              onCellCancel={tableEditorProps.handleCellCancel}
              onRemoveRow={tableEditorProps.removeRow}
              onRemoveColumn={tableEditorProps.removeColumn}
            />
          </div>
        )}
      </main>

      <AppFooter />
    </div>
  );
}
